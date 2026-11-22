/* ==============================================================================
   LOCALCARE INFINITY - SECURE AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC)
   Password Hashing (scrypt), Cryptographic Tokens (HMAC-SHA256),
   Role Permissions (Customer, Business Owner, Admin), and OTP Verifier
   ============================================================================== */

const crypto = require('crypto');
const db = require('./database.js');

const JWT_SECRET = process.env.JWT_SECRET || 'localcare_super_secret_jwt_hmac_key_2026';
const TOKEN_TTL_SECONDS = 7 * 24 * 3600; // 7 days

// In-Memory OTP Store with 5-minute TTL
const otpStore = new Map();

class AuthService {
  /* --------------------------------------------------------------------------
     Password Hashing & Constant-Time Verification
     -------------------------------------------------------------------------- */
  hashPassword(password) {
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return { salt, hash };
  }

  verifyPassword(password, storedHash, salt) {
    try {
      const derivedHash = crypto.scryptSync(password, salt, 64).toString('hex');
      const bufA = Buffer.from(derivedHash, 'hex');
      const bufB = Buffer.from(storedHash, 'hex');
      if (bufA.length !== bufB.length) return false;
      return crypto.timingSafeEqual(bufA, bufB);
    } catch (err) {
      return false;
    }
  }

  /* --------------------------------------------------------------------------
     Cryptographic Signed Token Generation (HMAC-SHA256 JWT)
     -------------------------------------------------------------------------- */
  generateToken(user) {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const now = Math.floor(Date.now() / 1000);
    const payload = Buffer.from(JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      phone: user.phone,
      iat: now,
      exp: now + TOKEN_TTL_SECONDS
    })).toString('base64url');

    const signature = crypto.createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    return `${header}.${payload}.${signature}`;
  }

  verifyToken(token) {
    if (!token || typeof token !== 'string') return null;
    const parts = token.trim().split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64url');

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSig);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    try {
      const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8'));
      const now = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < now) {
        return null; // Expired
      }
      return decoded;
    } catch (err) {
      return null;
    }
  }

  /* --------------------------------------------------------------------------
     User Registration with Relational Integrity
     -------------------------------------------------------------------------- */
  async register(params) {
    const { email, password, role = 'customer', phone, fullName, city = 'Bengaluru', locality = '' } = params;

    if (!email || !email.includes('@')) throw new Error('Valid email address is required');
    if (!phone || phone.replace(/\D/g, '').length < 10) throw new Error('Valid 10-digit mobile number is required');
    if (!['customer', 'business_owner', 'admin'].includes(role)) {
      throw new Error('Invalid role specified');
    }

    // Check duplicate email / phone
    const existingEmail = db.findOne('users', u => u.email.toLowerCase() === email.toLowerCase());
    if (existingEmail) throw new Error(`An account with email "${email}" already exists`);

    const existingPhone = db.findOne('users', u => u.phone.replace(/\D/g, '') === phone.replace(/\D/g, ''));
    if (existingPhone) throw new Error(`An account with mobile number "${phone}" already exists`);

    const { salt, hash } = this.hashPassword(password);
    const userId = `usr_${crypto.randomUUID()}`;

    return await db.transaction(async (tx) => {
      const newUser = tx.insert('users', {
        id: userId,
        email: email.toLowerCase().trim(),
        password_hash: hash,
        salt: salt,
        role: role,
        phone: phone.trim(),
        is_verified: false
      });

      let profile = null;
      if (role === 'customer') {
        profile = tx.insert('customer_profiles', {
          id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
          user_id: newUser.id,
          full_name: fullName || email.split('@')[0],
          mobile: phone,
          city: city,
          locality: locality,
          account_status: 'Active',
          ltv_spend: 0,
          bookings_count: 0
        });
      } else if (role === 'business_owner') {
        profile = tx.insert('business_owners', {
          id: `own_${crypto.randomUUID()}`,
          user_id: newUser.id,
          kyc_status: 'Pending',
          kyc_submitted_at: new Date().toISOString()
        });
      }

      const token = this.generateToken(newUser);
      return {
        user: { id: newUser.id, email: newUser.email, role: newUser.role, phone: newUser.phone },
        profile,
        token
      };
    });
  }

  /* --------------------------------------------------------------------------
     User Login
     -------------------------------------------------------------------------- */
  async login(identifier, password) {
    if (!identifier || !password) throw new Error('Email/phone and password are required');

    const cleanId = identifier.trim().toLowerCase();
    const user = db.findOne('users', u => u.email.toLowerCase() === cleanId || u.phone.replace(/\D/g, '') === cleanId.replace(/\D/g, ''));
    if (!user) {
      throw new Error('Invalid credentials: User not found');
    }

    const isValid = this.verifyPassword(password, user.password_hash, user.salt);
    if (!isValid) {
      throw new Error('Invalid credentials: Password incorrect');
    }

    const token = this.generateToken(user);
    let profile = null;
    if (user.role === 'customer') {
      profile = db.findOne('customer_profiles', c => c.user_id === user.id);
    } else if (user.role === 'business_owner') {
      profile = db.findOne('business_owners', b => b.user_id === user.id);
    }

    return {
      user: { id: user.id, email: user.email, role: user.role, phone: user.phone },
      profile,
      token
    };
  }

  /* --------------------------------------------------------------------------
     OTP Generation & Verification
     -------------------------------------------------------------------------- */
  sendOtp(phone) {
    if (!phone) throw new Error('Phone number is required');
    const cleanPhone = phone.replace(/\D/g, '');
    const otpCode = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 min TTL

    otpStore.set(cleanPhone, {
      code: otpCode,
      expiresAt: expiresAt,
      attempts: 0
    });

    console.log(`[SMS Gateway Simulator] Secure OTP for ${phone} is: ${otpCode} (Expires in 5 mins)`);
    return {
      success: true,
      message: `6-digit verification OTP dispatched to ${phone}`,
      expiresInSeconds: 300
    };
  }

  verifyOtp(phone, inputOtp) {
    const cleanPhone = phone.replace(/\D/g, '');
    const record = otpStore.get(cleanPhone);
    if (!record) {
      throw new Error('OTP has expired or was not requested. Please request a new OTP.');
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(cleanPhone);
      throw new Error('OTP has expired. Please request a fresh OTP.');
    }

    record.attempts++;
    if (record.attempts > 4) {
      otpStore.delete(cleanPhone);
      throw new Error('Too many failed OTP attempts. Account locked for 10 minutes.');
    }

    if (record.code !== String(inputOtp).trim()) {
      throw new Error('Incorrect OTP entered. Please try again.');
    }

    otpStore.delete(cleanPhone);
    return { verified: true };
  }

  /* --------------------------------------------------------------------------
     Authentication & RBAC Middleware Helper
     -------------------------------------------------------------------------- */
  authenticate(req) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7).trim();
    } else if (req.headers.cookie) {
      const match = req.headers.cookie.match(/localcare_token=([^;]+)/);
      if (match) token = match[1];
    }

    if (!token) return null;
    return this.verifyToken(token);
  }

  requireAuth(req, allowedRoles = []) {
    const userPayload = this.authenticate(req);
    if (!userPayload) {
      const err = new Error('Authentication required. Missing or invalid Bearer token.');
      err.statusCode = 401;
      throw err;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userPayload.role)) {
      const err = new Error(`Forbidden: Role "${userPayload.role}" does not have required permissions.`);
      err.statusCode = 403;
      throw err;
    }

    return userPayload;
  }
}

module.exports = new AuthService();

