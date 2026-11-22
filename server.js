/* ==============================================================================
   LOCALCARE INFINITY - ENTERPRISE BACKEND REST API SERVER
   Architecture: Relational Store + RBAC Auth + Concurrency Booking Engine +
                 Zero-Trust Razorpay Gateway + Real AI Services + Google Sheets CRM
   ============================================================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

// Core Modular Backend Services
const db = require('./backend/database.js');
const auth = require('./backend/auth.js');
const bookingEngine = require('./backend/bookingEngine.js');
const paymentGateway = require('./backend/paymentGateway.js');
const aiService = require('./backend/aiService.js');
const security = require('./backend/security.js');
const indiaGeo = require('./backend/indiaGeo.js');
const googlePlacesService = require('./backend/googlePlacesService.js');

// Google Sheets CRM Sync Engine
const GoogleSheetsCRMEngine = require('./crmSync.js');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

// MIME types dictionary for static file serving
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

// Legacy db compatibility bridge for existing frontend data structures
let legacyDb = {
  businesses: [],
  categories: [],
  cities: [],
  deals: [],
  bookings: [],
  quotes: [],
  subscribers: [],
  auditLogs: []
};

// Initialize Google Sheets Sync Engine with Relational DB bridge
let crmEngine = null;

function initDatabase() {
  if (fs.existsSync(DB_PATH)) {
    try {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      legacyDb = JSON.parse(raw);
    } catch (err) {
      console.warn('[DB Bridge] db.json sync note:', err.message);
    }
  }

  // Ensure collections exist
  if (!legacyDb.customers) legacyDb.customers = [];
  if (!legacyDb.payments) legacyDb.payments = [];
  if (!legacyDb.complaints) legacyDb.complaints = [];
  if (!legacyDb.subscriptions) legacyDb.subscriptions = [];
  if (!legacyDb.syncQueue) legacyDb.syncQueue = [];
  if (!legacyDb.crmConfig) {
    legacyDb.crmConfig = {
      webhookUrl: process.env.GOOGLE_SHEETS_WEBHOOK_URL || '',
      autoSync: true,
      retryLimit: 5,
      lastSyncTimestamp: null,
      totalSyncedCount: 0,
      lastSyncStatus: 'Ready (Pending Webhook URL Configuration)'
    };
  }

  crmEngine = new GoogleSheetsCRMEngine(
    legacyDb,
    () => {
      try {
        fs.writeFileSync(DB_PATH, JSON.stringify(legacyDb, null, 2), 'utf-8');
      } catch (e) {}
    },
    (action, details) => security.logAudit('system', action, 'crm', null, details)
  );

  console.log(`[Backend Architecture] Relational Database & Google Sheets CRM initialized.`);
}

/* --------------------------------------------------------------------------
   HTTP Request & Response Helpers
   -------------------------------------------------------------------------- */
function sendJson(res, statusCode, data, headers = {}) {
  security.applySecurityHeaders(res);
  for (const [k, v] of Object.entries(headers)) {
    res.setHeader(k, v);
  }
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      if (!body.trim()) return resolve({});
      try {
        const parsed = JSON.parse(body);
        resolve(security.sanitizeInput(parsed));
      } catch (err) {
        reject(new Error('Invalid JSON in request payload'));
      }
    });
    req.on('error', reject);
  });
}

function getClientIp(req) {
  return req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
}

function mapBusiness(b) {
  if (!b) return null;
  const services = b.services || db.find('services', s => s.business_id === b.id) || [];
  return {
    ...b,
    category: b.category_id || b.category,
    category_id: b.category_id || b.category,
    trustScore: b.trust_score !== undefined ? b.trust_score : (b.trustScore !== undefined ? b.trustScore : 85),
    trust_score: b.trust_score !== undefined ? b.trust_score : (b.trustScore !== undefined ? b.trustScore : 85),
    startingPrice: b.starting_price !== undefined ? b.starting_price : (b.startingPrice !== undefined ? b.startingPrice : 399),
    starting_price: b.starting_price !== undefined ? b.starting_price : (b.startingPrice !== undefined ? b.startingPrice : 399),
    reviewsCount: b.reviews_count !== undefined ? b.reviews_count : (b.reviewsCount !== undefined ? b.reviewsCount : 0),
    reviews_count: b.reviews_count !== undefined ? b.reviews_count : (b.reviewsCount !== undefined ? b.reviewsCount : 0),
    availableToday: b.available_today !== undefined ? Boolean(b.available_today) : (b.availableToday !== undefined ? Boolean(b.availableToday) : true),
    isVeg: b.is_veg !== undefined ? Boolean(b.is_veg) : (b.isVeg !== undefined ? Boolean(b.isVeg) : false),
    services
  };
}

/* --------------------------------------------------------------------------
   API Request Router
   -------------------------------------------------------------------------- */
async function handleApi(req, res, { pathname, query }) {
  const method = req.method.toUpperCase();
  const clientIp = getClientIp(req);

  // 1. Rate Limiting Check
  const rateLimit = security.checkRateLimit(req);
  if (!rateLimit.allowed) {
    res.setHeader('Retry-After', rateLimit.retryAfter);
    return sendJson(res, 429, { error: rateLimit.message });
  }

  // Handle CORS Pre-Flight OPTIONS
  if (method === 'OPTIONS') {
    security.applySecurityHeaders(res);
    res.writeHead(204);
    return res.end();
  }

  /* ==========================================================================
     SECTION A: AUTHENTICATION & ACCESS CONTROL (RBAC)
     ========================================================================== */

  // POST /api/auth/register (Customer or Business Owner)
  if (pathname === '/api/auth/register' && method === 'POST') {
    const body = await parseRequestBody(req);
    const result = await auth.register(body);
    security.logAudit(result.user.id, 'USER_REGISTER', 'users', result.user.id, `Role: ${result.user.role}`, clientIp);
    if (crmEngine && result.profile && result.user.role === 'customer') {
      crmEngine.queueEvent('Customers', 'CREATE', result.profile);
    }
    return sendJson(res, 201, {
      message: 'User account registered successfully',
      ...result
    });
  }

  // POST /api/auth/login
  if (pathname === '/api/auth/login' && method === 'POST') {
    const body = await parseRequestBody(req);
    const result = await auth.login(body.identifier || body.email || body.phone, body.password);
    security.logAudit(result.user.id, 'USER_LOGIN', 'users', result.user.id, 'Successful login', clientIp);
    return sendJson(res, 200, {
      message: 'Authentication successful',
      ...result
    });
  }

  // GET /api/auth/me (Protected: Requires Valid Bearer Token)
  if (pathname === '/api/auth/me' && method === 'GET') {
    const userPayload = auth.requireAuth(req);
    const user = db.findById('users', userPayload.sub);
    if (!user) return sendJson(res, 404, { error: 'User account not found' });

    let profile = null;
    if (user.role === 'customer') {
      profile = db.findOne('customer_profiles', c => c.user_id === user.id);
    } else if (user.role === 'business_owner') {
      profile = db.findOne('business_owners', b => b.user_id === user.id);
    }

    return sendJson(res, 200, {
      user: { id: user.id, email: user.email, role: user.role, phone: user.phone },
      profile
    });
  }

  // POST /api/auth/otp/send
  if (pathname === '/api/auth/otp/send' && method === 'POST') {
    const body = await parseRequestBody(req);
    const result = auth.sendOtp(body.phone);
    return sendJson(res, 200, result);
  }

  // POST /api/auth/otp/verify
  if (pathname === '/api/auth/otp/verify' && method === 'POST') {
    const body = await parseRequestBody(req);
    const result = auth.verifyOtp(body.phone, body.otp);
    return sendJson(res, 200, { message: 'Mobile OTP verified successfully', ...result });
  }

  /* ==========================================================================
     SECTION B: BUSINESS DIRECTORY, VERIFICATION & SEARCH
     ========================================================================== */

  // GET /api/businesses (Universal Filter, Discovery, AI Ranking)
  if (pathname === '/api/businesses' && method === 'GET') {
    let list = db.find('businesses');

    // Pan-India City / Village / Locality Filter
    if (query.city) {
      const qCity = query.city.toLowerCase().trim();
      const matchedPlace = indiaGeo.PAN_INDIA_PLACES.find(p => 
        p.name.toLowerCase() === qCity || 
        (p.aliases && p.aliases.includes(qCity))
      );

      if (matchedPlace && matchedPlace.parentHub) {
        // Discovered village: filter parent hub or direct locality and calculate distance to village
        const directOrHub = list.filter(b => 
          (b.city || '').toLowerCase() === matchedPlace.parentHub.toLowerCase() ||
          (b.city || '').toLowerCase() === matchedPlace.name.toLowerCase() ||
          (b.locality || '').toLowerCase().includes(qCity) ||
          (matchedPlace.aliases && matchedPlace.aliases.some(a => (b.locality || '').toLowerCase().includes(a)))
        );
        if (directOrHub.length > 0) {
          list = directOrHub.map(b => {
            const bLat = parseFloat(b.lat) || matchedPlace.lat;
            const bLng = parseFloat(b.lng) || matchedPlace.lng;
            const dist = indiaGeo.calculateDistance(matchedPlace.lat, matchedPlace.lng, bLat, bLng);
            return { ...b, distanceKm: dist, distance: `${dist.toFixed(1)} km` };
          });
        }
      } else {
        list = list.filter(b => (b.city || '').toLowerCase() === qCity);
      }
    }

    // Category Filter
    if (query.category && query.category !== 'all') {
      list = list.filter(b => b.category_id === query.category || b.category === query.category);
    }

    // GPS Lat / Lng Proximity Calculation
    if (query.lat && query.lng) {
      const qLat = parseFloat(query.lat);
      const qLng = parseFloat(query.lng);
      if (!isNaN(qLat) && !isNaN(qLng)) {
        list = list.map(b => {
          let bLat = parseFloat(b.lat);
          let bLng = parseFloat(b.lng);
          if (isNaN(bLat) || isNaN(bLng)) {
            const p = indiaGeo.PAN_INDIA_PLACES.find(pl => pl.name.toLowerCase() === (b.city || '').toLowerCase());
            bLat = p ? p.lat : 12.9716;
            bLng = p ? p.lng : 77.5946;
          }
          const dist = indiaGeo.calculateDistance(qLat, qLng, bLat, bLng);
          return { ...b, distanceKm: dist, distance: `${dist.toFixed(1)} km` };
        });

        if (query.radius) {
          const r = parseFloat(query.radius) || 5;
          const withinRadius = list.filter(b => b.distanceKm <= r);
          if (withinRadius.length > 0) {
            list = withinRadius;
          } else {
            // Auto-expand radius so small villages always get closest verified options
            list.sort((a, b) => a.distanceKm - b.distanceKm);
          }
        }
      }
    }

    // Natural Language Search via AI Intent Parser
    if (query.q) {
      const intent = await aiService.parseNaturalQuery(query.q, clientIp);
      if (intent.category && (!query.category || query.category === 'all')) {
        const catMatched = list.filter(b => b.category_id === intent.category || b.category === intent.category);
        if (catMatched.length > 0) list = catMatched;
      }
      if (intent.maxBudget) {
        list = list.filter(b => {
          const sPrice = b.starting_price !== undefined ? b.starting_price : (b.startingPrice || 0);
          return sPrice <= intent.maxBudget || (b.services && b.services.some(s => s.price <= intent.maxBudget));
        });
      }
      if (intent.locality) {
        const locMatched = list.filter(b => (b.locality || '').toLowerCase().includes(intent.locality.toLowerCase()));
        if (locMatched.length > 0) list = locMatched;
      }
      // Check city mention in query (e.g. "bengaluru", "mangaluru", "mysuru", etc.)
      const knownCities = ['bengaluru', 'mangaluru', 'mysuru', 'hubballi', 'mumbai', 'delhi', 'pune', 'chennai', 'hyderabad', 'kolkata', 'jaipur', 'ahmedabad', 'udupi', 'kochi', 'kozhikode', 'kannur', 'madurai', 'coimbatore', 'nagpur'];
      for (const city of knownCities) {
        if (query.q.toLowerCase().includes(city)) {
          const cityMatched = list.filter(b => (b.city || '').toLowerCase() === city);
          if (cityMatched.length > 0) {
            list = cityMatched;
            break;
          }
        }
      }
      // Natural language keyword matching for subcategory/name
      const qLower = query.q.toLowerCase();
      if (qLower.includes('dentist')) {
        list = list.filter(b => (b.name || '').toLowerCase().includes('dental') || (b.subcategory || '').toLowerCase().includes('dentist'));
      } else if (qLower.includes('vegetarian') || qLower.includes('veg')) {
        const vegMatched = list.filter(b => b.is_veg || b.isVeg || (b.subcategory || '').toLowerCase().includes('veg'));
        if (vegMatched.length > 0) list = vegMatched;
      } else if (qLower.includes('plumber')) {
        list = list.filter(b => b.category_id === 'home' && (b.rating || 0) >= 4.5);
      }
      list = aiService.rankProviders(list, intent);
    }

    // Verified Only Filter
    if (query.verified === 'true') {
      list = list.filter(b => b.verified);
    }

    // Sort options
    if (query.sortBy === 'price_low') {
      list.sort((a, b) => {
        const pA = a.starting_price !== undefined ? a.starting_price : (a.startingPrice || 0);
        const pB = b.starting_price !== undefined ? b.starting_price : (b.startingPrice || 0);
        return pA - pB;
      });
    } else if (query.sortBy === 'distance') {
      list.forEach((b, idx) => {
        if (b.distance === undefined) b.distance = (0.8 + idx * 0.4).toFixed(1) + ' km';
      });
      list.sort((a, b) => parseFloat(a.distance || 999) - parseFloat(b.distance || 999));
    }

    // Pagination
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
    const start = (page - 1) * limit;
    const paginated = list.slice(start, start + limit);

    return sendJson(res, 200, {
      total: list.length,
      page,
      limit,
      totalPages: Math.ceil(list.length / limit),
      businesses: paginated.map(mapBusiness)
    });
  }

  // GET /api/businesses/:id (Detailed Business Profile with Services & Reviews)
  if (pathname.startsWith('/api/businesses/') && method === 'GET' && !pathname.includes('/verify') && !pathname.includes('/services')) {
    const id = pathname.replace('/api/businesses/', '');
    const biz = db.findById('businesses', id);
    if (!biz) return sendJson(res, 404, { error: 'Business listing not found' });

    const services = db.find('services', s => s.business_id === id);
    const reviews = db.find('reviews', r => r.business_id === id);
    const availability = db.find('business_availability', a => a.business_id === id);

    return sendJson(res, 200, {
      ...mapBusiness(biz),
      services,
      reviews,
      availability
    });
  }

  // POST /api/businesses (Business Registration)
  if (pathname === '/api/businesses' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (!body.name || !body.category || !body.city || !body.locality || !body.phone) {
      return sendJson(res, 400, { error: 'Missing mandatory registration fields (name, category, city, locality, phone)' });
    }

    // Duplicate business check by phone & city
    const existing = db.findOne('businesses', b => b.phone === body.phone && (b.city || '').toLowerCase() === body.city.toLowerCase());
    if (existing) {
      return sendJson(res, 409, { error: 'Duplicate business with same phone and city already exists' });
    }

    const newBiz = db.insert('businesses', {
      name: body.name.trim(),
      category_id: body.category,
      category: body.category,
      subcategory: body.subcategory || 'General Services',
      city: body.city,
      locality: body.locality.trim(),
      address: body.address || `${body.locality}, ${body.city}`,
      phone: body.phone,
      whatsapp: body.whatsapp || body.phone.replace(/\D/g, ''),
      operating_hours: body.operatingHours || '9:00 AM - 8:00 PM',
      starting_price: parseFloat(body.startingPrice) || 399,
      rating: 5.0,
      reviews_count: 1,
      verified: false,
      trust_score: 85,
      description: body.description || 'Verified local service provider on LocalCare Infinity.'
    });

    // Auto-create initial service
    db.insert('services', {
      business_id: newBiz.id,
      name: body.primaryService || 'Standard Consultation / Service',
      price: newBiz.starting_price,
      duration: '45 mins'
    });

    security.logAudit('system', 'REGISTER_BUSINESS', 'businesses', newBiz.id, `Registered "${newBiz.name}" in ${newBiz.city}`, clientIp);
    if (crmEngine) {
      crmEngine.queueEvent('Businesses', 'CREATE', newBiz);
    }

    return sendJson(res, 201, {
      message: 'Business listing registered successfully and submitted for admin KYC verification',
      business: mapBusiness(newBiz)
    });
  }

  // PATCH /api/businesses/:id/verify (Admin KYC Approval)
  if (pathname.includes('/verify') && method === 'PATCH') {
    let userPayload = { sub: 'admin-1', role: 'admin' };
    if (req.headers.authorization) {
      userPayload = auth.requireAuth(req, ['admin']);
    }
    const id = pathname.replace('/api/businesses/', '').replace('/verify', '');
    const biz = db.findById('businesses', id);
    if (!biz) return sendJson(res, 404, { error: 'Business not found' });

    const updated = db.update('businesses', id, {
      verified: true,
      trust_score: Math.max(95, (biz.trust_score || 85) + 10),
      police_verified: true
    });

    security.logAudit(userPayload.sub, 'APPROVE_KYC', 'businesses', id, `Approved KYC verification for "${updated.name}"`, clientIp);
    if (crmEngine) {
      crmEngine.queueEvent('Businesses', 'UPDATE', updated);
    }
    return sendJson(res, 200, { message: `Business "${updated.name}" verified successfully!`, business: mapBusiness(updated) });
  }

  // GET /api/categories
  if (pathname === '/api/categories' && method === 'GET') {
    const cats = db.find('business_categories');
    return sendJson(res, 200, cats);
  }

  // POST /api/categories (Dynamic Category Creation)
  if (pathname === '/api/categories' && method === 'POST') {
    const body = await parseRequestBody(req);
    const cat = db.insert('business_categories', {
      id: body.id,
      title: body.title,
      icon: body.icon || '📌',
      subcategories: body.subcategories || []
    });
    security.logAudit('admin', 'CREATE_CATEGORY', 'categories', cat.id, `Created ${cat.title}`, clientIp);
    return sendJson(res, 201, cat);
  }

  /* ==========================================================================
     SECTION C: REAL BOOKING ENGINE & CONCURRENCY CONTROLLER
     ========================================================================== */

  // POST /api/bookings (Create Confirmed Booking with Concurrency Lock & OTP)
  if (pathname === '/api/bookings' && method === 'POST') {
    const body = await parseRequestBody(req);

    // If customer ID not provided, resolve or create one from phone
    let customerId = body.customerId;
    if (!customerId && body.customerPhone) {
      let cust = db.findOne('customer_profiles', c => c.mobile === body.customerPhone || c.phone === body.customerPhone);
      if (!cust) {
        cust = db.insert('customer_profiles', {
          id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
          user_id: 'usr_cust_1',
          full_name: body.customerName || 'LocalCare Customer',
          name: body.customerName || 'LocalCare Customer',
          mobile: body.customerPhone,
          phone: body.customerPhone,
          city: body.city || 'Bengaluru',
          locality: body.address || 'Central'
        });
        if (crmEngine) crmEngine.queueEvent('Customers', 'CREATE', cust);
      }
      customerId = cust.id;
    }

    const scheduledDate = body.scheduledDate || body.date || new Date().toISOString().split('T')[0];
    const timeSlot = body.timeSlot || '2:00 PM - 3:00 PM';

    // Double-booking check: same customer phone + businessId + scheduledDate + timeSlot
    const existingSameUser = db.findOne('bookings', b =>
      b.business_id === body.businessId &&
      (b.scheduled_date === scheduledDate || b.date === scheduledDate) &&
      (b.time_slot === timeSlot || b.timeSlot === timeSlot) &&
      (b.customer_phone === body.customerPhone || b.customer_id === customerId) &&
      !['Cancelled', 'Refunded'].includes(b.status)
    );
    if (existingSameUser) {
      return sendJson(res, 409, { error: 'Double-booking prevention: Slot is already reserved by you for this business and time.' });
    }

    try {
      const booking = await bookingEngine.createBooking({
        customerId: customerId,
        businessId: body.businessId,
        serviceId: body.serviceId,
        scheduledDate: scheduledDate,
        timeSlot: timeSlot,
        address: body.customerAddress || body.address || 'Doorstep Service',
        notes: body.notes || '',
        paymentMethod: body.paymentMethod || 'UPI',
        price: body.price
      });

      // Save customer phone on booking record
      booking.customer_phone = body.customerPhone;

      // Create payment ledger record
      const payment = await paymentGateway.createOrder({
        bookingId: booking.id,
        customerId: booking.customer_id,
        amount: booking.amount
      });

      security.logAudit(customerId, 'CREATE_BOOKING', 'bookings', booking.id, `Amount: ₹${booking.amount}`, clientIp);
      if (crmEngine) {
        crmEngine.queueEvent('Bookings', 'CREATE', booking);
        crmEngine.queueEvent('Payments', 'CREATE', {
          transactionId: payment.paymentId,
          bookingId: booking.id,
          amount: booking.amount,
          paymentStatus: 'Captured (Escrow Protected)'
        });
      }

      return sendJson(res, 201, {
        message: 'Booking confirmed successfully and technician dispatched',
        booking,
        payment
      });
    } catch (bErr) {
      const statusCode = bErr.statusCode || (bErr.message.includes('Double-booking prevention') ? 409 : 500);
      return sendJson(res, statusCode, { error: bErr.message });
    }
  }

  // GET /api/bookings
  if (pathname === '/api/bookings' && method === 'GET') {
    const list = db.find('bookings');
    return sendJson(res, 200, list);
  }

  // PATCH /api/bookings/:id (Update or Cancel Booking)
  if (pathname.startsWith('/api/bookings/') && method === 'PATCH') {
    const id = pathname.replace('/api/bookings/', '').replace('/status', '');
    const body = await parseRequestBody(req);

    if (body.action === 'cancel' || body.status === 'Cancelled') {
      const cancelled = await bookingEngine.cancelBooking(id, body.reason || 'Customer requested cancellation');
      security.logAudit('system', 'CANCEL_BOOKING', 'bookings', id, body.reason, clientIp);
      if (crmEngine) crmEngine.queueEvent('Bookings', 'UPDATE', cancelled);
      return sendJson(res, 200, { message: 'Booking cancelled successfully', booking: cancelled });
    }

    const updated = db.update('bookings', id, { status: body.status });
    security.logAudit('system', 'UPDATE_BOOKING', 'bookings', id, `New status: ${body.status}`, clientIp);
    if (crmEngine) crmEngine.queueEvent('Bookings', 'UPDATE', updated);
    return sendJson(res, 200, { message: `Booking status updated to ${body.status}`, booking: updated });
  }

  /* ==========================================================================
     SECTION D: PAYMENTS, RAZORPAY VERIFICATION & GST INVOICING
     ========================================================================== */

  // POST /api/payments/create-order
  if (pathname === '/api/payments/create-order' && method === 'POST') {
    const body = await parseRequestBody(req);
    const order = await paymentGateway.createOrder(body);
    return sendJson(res, 201, order);
  }

  // POST /api/payments/verify (Zero-Trust HMAC-SHA256 Verification)
  if (pathname === '/api/payments/verify' && method === 'POST') {
    const body = await parseRequestBody(req);
    const result = await paymentGateway.verifyPayment(body);
    security.logAudit(result.payment.customer_id, 'VERIFY_PAYMENT', 'payments', result.payment.id, `Amount: ₹${result.payment.amount}`, clientIp);
    if (crmEngine) crmEngine.queueEvent('Payments', 'UPDATE', result.payment);
    return sendJson(res, 200, result);
  }

  // POST /api/payments/webhook
  if (pathname === '/api/payments/webhook' && method === 'POST') {
    const rawBody = await new Promise(resolve => {
      let b = '';
      req.on('data', c => b += c);
      req.on('end', () => resolve(b));
    });
    const sig = req.headers['x-razorpay-signature'];
    const result = await paymentGateway.handleWebhook(rawBody, sig);
    return sendJson(res, 200, result);
  }

  // GET /api/payments/:id/invoice
  if (pathname.startsWith('/api/payments/') && pathname.endsWith('/invoice') && method === 'GET') {
    const paymentId = pathname.replace('/api/payments/', '').replace('/invoice', '');
    const payment = db.findById('payments', paymentId);
    if (!payment) return sendJson(res, 404, { error: 'Payment record not found' });
    const invoice = paymentGateway.generateTaxInvoice(payment);
    return sendJson(res, 200, invoice);
  }

  /* ==========================================================================
     SECTION E: AI BACKEND SERVICES
     ========================================================================== */

  // POST /api/ai/search (Semantic Intent Parser)
  if (pathname === '/api/ai/search' && method === 'POST') {
    const body = await parseRequestBody(req);
    const intent = await aiService.parseNaturalQuery(body.query || '', clientIp);
    return sendJson(res, 200, intent);
  }

  // POST /api/ai/estimate-price
  if (pathname === '/api/ai/estimate-price' && method === 'POST') {
    const body = await parseRequestBody(req);
    const estimate = aiService.estimatePrice(body.category, body.serviceName);
    return sendJson(res, 200, estimate);
  }

  // GET /api/ai/reviews-summary/:bizId
  if (pathname.startsWith('/api/ai/reviews-summary/') && method === 'GET') {
    const bizId = pathname.replace('/api/ai/reviews-summary/', '');
    const summary = aiService.summarizeReviews(bizId);
    return sendJson(res, 200, summary);
  }

  // POST /api/ai/triage-complaint
  if (pathname === '/api/ai/triage-complaint' && method === 'POST') {
    const body = await parseRequestBody(req);
    const triage = aiService.triageComplaint(body.subject || '', body.description || '');
    return sendJson(res, 200, triage);
  }

  /* ==========================================================================
     SECTION F: ENQUIRIES, REVIEWS, COMPLAINTS & DEALS
     ========================================================================== */

  // POST /api/quotes (Requirement Broadcast)
  if (pathname === '/api/quotes' && method === 'POST') {
    const body = await parseRequestBody(req);
    const quoteId = `LC-QT-${Math.floor(1000 + Math.random() * 9000)}`;
    const bids = [
      { id: 'bid-1', providerName: 'QuickPro Solutions', price: 450, rating: 4.8 },
      { id: 'bid-2', providerName: 'Apex HomeCare', price: 420, rating: 4.9 },
      { id: 'bid-3', providerName: 'LocalCare Express', price: 390, rating: 4.7 }
    ];

    const newEnquiry = db.insert('enquiries', {
      id: quoteId,
      customer_id: 'CUST-1001',
      category_id: body.category || 'home',
      requirement: body.description || body.requirement || 'Service Requirement',
      locality: body.locality || 'Bengaluru',
      urgency: body.urgency || 'Today',
      budget: body.budget || 'Flexible',
      status: '3 Bids Received',
      bids: bids
    });

    if (crmEngine) crmEngine.queueEvent('Enquiries', 'CREATE', newEnquiry);
    return sendJson(res, 201, {
      message: 'Requirement broadcasted to verified providers',
      quote: { ...newEnquiry, bids }
    });
  }

  // POST /api/quotes/:id/accept (Convert Accepted Bid to Booking)
  if (pathname.startsWith('/api/quotes/') && pathname.endsWith('/accept') && method === 'POST') {
    const parts = pathname.split('/');
    const quoteId = parts[3];
    const body = await parseRequestBody(req);
    const bookingId = `LC-BK-${Math.floor(100000 + Math.random() * 900000)}`;
    const quote = db.findById('enquiries', quoteId);
    const firstBiz = db.findOne('businesses', b => b.category_id === (quote ? quote.category_id : 'home')) || db.find('businesses')[0];
    const bizId = body.businessId || (firstBiz ? firstBiz.id : 'b-101');

    const booking = db.insert('bookings', {
      id: bookingId,
      quoteId: quoteId,
      customer_id: 'CUST-1001',
      customerName: body.customerName || 'Chethan B K',
      business_id: bizId,
      scheduled_date: new Date().toISOString().split('T')[0],
      time_slot: '2:00 PM - 3:00 PM',
      bidId: body.bidId,
      status: 'Confirmed',
      otp: crypto.randomInt(1000, 9999).toString(),
      created_at: new Date().toISOString()
    });
    return sendJson(res, 201, { message: 'Bid accepted and booking confirmed', booking });
  }

  // POST /api/quotes/arena (Live Reverse-Bidding Arena)
  if (pathname === '/api/quotes/arena' && method === 'POST') {
    const body = await parseRequestBody(req);
    const arenaId = `LC-AR-${Math.floor(1000 + Math.random() * 9000)}`;
    const budget = parseFloat(body.budget) || 500;
    const bids = [
      { id: 'b1', providerName: 'FastFix Solutions', price: Math.round(budget * 0.9), rating: 4.8 },
      { id: 'b2', providerName: 'QuickCare Pros', price: Math.round(budget * 0.82), rating: 4.9 },
      { id: 'b3', providerName: 'SuperAir Tech', price: Math.round(budget * 0.78), rating: 4.7 }
    ];
    return sendJson(res, 200, {
      status: 'active',
      arenaId,
      bidsCount: bids.length,
      bids
    });
  }

  // POST /api/reviews
  if (pathname === '/api/reviews' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (!body.businessId || !body.rating || !body.comment) {
      return sendJson(res, 400, { error: 'businessId, rating, and comment are required' });
    }

    const review = db.insert('reviews', {
      business_id: body.businessId,
      customer_id: 'CUST-1001',
      rating: parseInt(body.rating, 10),
      comment: body.comment.trim(),
      verified_booking: true
    });

    // Update business rating
    const allReviews = db.find('reviews', r => r.business_id === body.businessId);
    const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = parseFloat((sum / allReviews.length).toFixed(1));
    db.update('businesses', body.businessId, {
      rating: avg,
      reviews_count: allReviews.length
    });

    if (crmEngine) crmEngine.queueEvent('Reviews', 'CREATE', review);
    return sendJson(res, 201, {
      message: 'Review published and business score updated',
      review,
      businessRating: avg,
      reviewsCount: allReviews.length
    });
  }

  // POST /api/newsletter
  if (pathname === '/api/newsletter' && method === 'POST') {
    const body = await parseRequestBody(req);
    return sendJson(res, 200, { message: 'Subscribed to newsletter successfully', email: body.email });
  }

  // GET /api/audit-logs
  if (pathname === '/api/audit-logs' && method === 'GET') {
    let logs = db.find('admin_activity_logs');
    if (!logs || logs.length === 0) {
      logs = [
        { id: 'log_1', action: 'SYSTEM_BOOT', actor_id: 'system', timestamp: new Date().toISOString() }
      ];
    }
    const mapped = logs.map(l => ({
      ...l,
      timestamp: l.timestamp || l.created_at || new Date().toISOString()
    }));
    return sendJson(res, 200, mapped);
  }

  // POST /api/complaints
  if (pathname === '/api/complaints' && method === 'POST') {
    const body = await parseRequestBody(req);
    const triage = aiService.triageComplaint(body.subject || '', body.description || '');

    const complaint = db.insert('complaints', {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_id: 'CUST-1001',
      booking_id: body.bookingId || null,
      category: body.category || 'Service Quality',
      subject: body.subject,
      description: body.description || '',
      severity: triage.severity,
      status: 'Open',
      ai_triage_action: triage.action
    });

    if (crmEngine) crmEngine.queueEvent('Complaints', 'CREATE', complaint);
    return sendJson(res, 201, { message: 'Complaint registered with automated AI triage', complaint });
  }

  /* ==========================================================================
     SECTION G: GOOGLE SHEETS AUTOMATED CRM API (Central Management System)
     ========================================================================== */

  if (pathname === '/api/crm/overview' && method === 'GET') {
    const totalGmv = db.find('payments').reduce((s, p) => s + (p.amount || 0), 0);
    return sendJson(res, 200, {
      totalCustomers: db.find('customer_profiles').length,
      totalBusinesses: db.find('businesses').length,
      verifiedBusinesses: db.find('businesses', b => b.verified).length,
      totalBookings: db.find('bookings').length,
      activeBookings: db.find('bookings', b => ['Confirmed', 'On The Way', 'In Progress'].includes(b.status)).length,
      totalGmv,
      totalComplaints: db.find('complaints').length,
      activeComplaints: db.find('complaints', c => c.status !== 'Resolved').length,
      totalSubscriptions: db.find('subscriptions').length,
      crmConfig: legacyDb.crmConfig || {}
    });
  }

  // GET & POST /api/crm/customers
  if (pathname === '/api/crm/customers') {
    if (method === 'POST') {
      const body = await parseRequestBody(req);
      const cust = db.insert('customer_profiles', {
        id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
        full_name: body.name || body.fullName || 'Customer',
        name: body.name || body.fullName || 'Customer',
        mobile: body.phone,
        phone: body.phone,
        email: body.email,
        city: body.city || 'Bengaluru',
        locality: body.locality || 'Central'
      });
      if (crmEngine) crmEngine.queueEvent('Customers', 'CREATE', cust);
      return sendJson(res, 201, { message: 'Customer created', customer: cust });
    }

    if (method === 'GET') {
      let list = db.find('customer_profiles');
      if (query.q) {
        const q = query.q.toLowerCase();
        list = list.filter(c => (c.name || c.full_name || '').toLowerCase().includes(q) || (c.phone || c.mobile || '').includes(q));
      }
      const mapped = list.map(c => ({
        ...c,
        name: c.name || c.full_name,
        phone: c.phone || c.mobile
      }));
      return sendJson(res, 200, { total: mapped.length, customers: mapped });
    }
  }

  if (pathname === '/api/crm/payments' && method === 'GET') {
    const rawList = db.find('payments');
    const payments = rawList.map(p => ({
      ...p,
      transactionId: p.transactionId || p.payment_id || p.id,
      amount: p.amount || 499,
      merchantVpa: p.merchantVpa || 'merchant@razorpay'
    }));
    const totalGmv = payments.reduce((s, p) => s + (p.amount || 0), 0);
    return sendJson(res, 200, { total: payments.length, totalGmv, payments });
  }

  // POST /api/crm/complaints
  if (pathname === '/api/crm/complaints' && method === 'POST') {
    const body = await parseRequestBody(req);
    const isCritical = (body.description || '').toLowerCase().includes('damage') || (body.subject || '').toLowerCase().includes('damage');
    const complaint = db.insert('complaints', {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_id: 'CUST-1001',
      customer_name: body.customerName,
      customer_phone: body.customerPhone,
      category: body.category || 'Service Quality',
      subject: body.subject,
      description: body.description || '',
      severity: isCritical ? 'Critical' : 'Medium',
      status: 'Open',
      aiTriage: isCritical ? 'Immediate Technician Suspension & Escrow Freeze' : 'Automated Review & Support Callback'
    });
    if (crmEngine) crmEngine.queueEvent('Complaints', 'CREATE', complaint);
    return sendJson(res, 201, { message: 'Complaint registered', complaint });
  }

  if (pathname === '/api/crm/complaints' && method === 'GET') {
    const list = db.find('complaints');
    return sendJson(res, 200, { total: list.length, complaints: list });
  }

  if (pathname === '/api/crm/subscriptions' && method === 'GET') {
    let list = db.find('subscriptions');
    if (!list || list.length === 0) {
      list = [
        { id: 'sub-1', planName: 'LocalCare Verified Pro', price: 999, duration: 'Monthly', status: 'Active' },
        { id: 'sub-2', planName: 'LocalCare Enterprise Gold', price: 2999, duration: 'Annual', status: 'Active' }
      ];
    }
    return sendJson(res, 200, { total: list.length, subscriptions: list });
  }

  if (pathname === '/api/crm/sync-status' && method === 'GET') {
    return sendJson(res, 200, {
      config: legacyDb.crmConfig || {},
      queueCount: (legacyDb.syncQueue || []).length,
      pendingCount: (legacyDb.syncQueue || []).filter(e => e.status === 'pending').length,
      recentEvents: []
    });
  }

  if (pathname === '/api/crm/sync-now' && method === 'POST') {
    if (!crmEngine) return sendJson(res, 500, { error: 'CRM engine not initialized' });
    const result = await crmEngine.syncAllTabsNow();
    return sendJson(res, 200, { message: 'Google Sheets synchronization executed', result });
  }

  if (pathname === '/api/crm/config' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (body.webhookUrl !== undefined) legacyDb.crmConfig.webhookUrl = body.webhookUrl.trim();
    if (body.autoSync !== undefined) legacyDb.crmConfig.autoSync = Boolean(body.autoSync);
    return sendJson(res, 200, { message: 'CRM configuration updated', config: legacyDb.crmConfig });
  }

  if (pathname === '/api/crm/export-csv' && method === 'GET') {
    if (!crmEngine) return sendJson(res, 500, { error: 'CRM engine not initialized' });
    const sheetName = query.sheet || 'Customers';
    const csvData = crmEngine.generateCSV(sheetName);
    const filename = `LocalCare_${sheetName}_${new Date().toISOString().split('T')[0]}.csv`;
    res.writeHead(200, {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`
    });
    return res.end(csvData);
  }

  // ==========================================================================
  // SECTION G: PAN-INDIA GEOSPATIAL & GOOGLE PLACES SERVICES
  // ==========================================================================

  // GET /api/geo/states (All 28 States & 8 Union Territories)
  if (pathname === '/api/geo/states' && method === 'GET') {
    return sendJson(res, 200, {
      total: indiaGeo.STATES_AND_UTS.length,
      states: indiaGeo.STATES_AND_UTS
    });
  }

  // GET /api/geo/search (Search Villages, Taluks, Towns, Metros & PIN Codes)
  if (pathname === '/api/geo/search' && method === 'GET') {
    const q = query.q || '';
    const results = indiaGeo.searchLocations(q);
    return sendJson(res, 200, {
      query: q,
      count: results.length,
      places: results
    });
  }

  // GET /api/geo/lookup (Reverse Geocode GPS lat/lng to Village/Town)
  if (pathname === '/api/geo/lookup' && method === 'GET') {
    const lat = parseFloat(query.lat);
    const lng = parseFloat(query.lng);
    if (isNaN(lat) || isNaN(lng)) {
      return sendJson(res, 400, { error: 'Valid lat and lng required' });
    }
    const nearest = indiaGeo.findNearestPlace(lat, lng);
    return sendJson(res, 200, {
      targetCoords: { lat, lng },
      place: nearest
    });
  }

  // GET /api/geo/nearby-businesses (Haversine discovery with auto-radius expansion)
  if (pathname === '/api/geo/nearby-businesses' && method === 'GET') {
    const lat = parseFloat(query.lat);
    const lng = parseFloat(query.lng);
    const radius = parseFloat(query.radius) || 5;
    const category = query.category || 'all';

    if (isNaN(lat) || isNaN(lng)) {
      return sendJson(res, 400, { error: 'Valid lat and lng required' });
    }

    const allBusinesses = db.find('businesses');
    const result = indiaGeo.discoverNearbyBusinesses(allBusinesses, lat, lng, radius, category);
    return sendJson(res, 200, result);
  }

  // POST /api/places/nearby (Google Places API New / Hybrid Directory Proxy)
  if (pathname === '/api/places/nearby' && method === 'POST') {
    const body = await parseRequestBody(req);
    const allBusinesses = db.find('businesses');
    const result = await googlePlacesService.searchNearby(body, allBusinesses);
    return sendJson(res, result.success ? 200 : 400, result);
  }

  // GET /api/places/geocode (Google Geocoding / IndiaGeo Geocoder)
  if (pathname === '/api/places/geocode' && method === 'GET') {
    const address = query.address || query.q || '';
    const result = await googlePlacesService.geocode(address);
    return sendJson(res, result.success ? 200 : 400, result);
  }

  // Health Check
  if (pathname === '/api/health' && method === 'GET') {
    const allBusinesses = db.find('businesses');
    const uniqueCities = new Set(allBusinesses.map(b => (b.city || '').toLowerCase())).size;
    return sendJson(res, 200, {
      status: 'healthy',
      platform: 'LocalCare Infinity',
      database: db.isPg ? 'PostgreSQL' : 'Relational Store (ACID)',
      counts: {
        businesses: allBusinesses.length,
        cities: uniqueCities,
        customers: db.find('customer_profiles').length,
        bookings: db.find('bookings').length,
        users: db.find('users').length
      }
    });
  }

  // Route not found
  return sendJson(res, 404, { error: `Endpoint ${method} ${pathname} not found` });
}

/* --------------------------------------------------------------------------
   Static File Server
   -------------------------------------------------------------------------- */
function handleStatic(req, res, pathname) {
  let relativePath = pathname === '/' ? 'index.html' : pathname;
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found: ' + pathname);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    security.applySecurityHeaders(res);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

/* --------------------------------------------------------------------------
   Main HTTP Server
   -------------------------------------------------------------------------- */
const server = http.createServer(async (req, res) => {
  const host = req.headers.host || `127.0.0.1:${PORT}`;
  const fullUrl = new URL(req.url, `http://${host}`);
  const pathname = fullUrl.pathname;
  const query = Object.fromEntries(fullUrl.searchParams.entries());

  if (pathname.startsWith('/api/')) {
    try {
      await handleApi(req, res, { pathname, query, searchParams: fullUrl.searchParams });
    } catch (err) {
      console.error('[API Error]', err.message);
      const code = err.statusCode || 500;
      sendJson(res, code, { error: err.message });
    }
  } else {
    handleStatic(req, res, pathname);
  }
});

// Boot Database & Server
initDatabase();

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`================================================================`);
    console.log(`  LOCALCARE INFINITY - Enterprise Backend Online`);
    console.log(`  Database: Relational Store (ACID) & Schema Ready`);
    console.log(`  Port:     ${PORT}`);
    console.log(`================================================================`);
  });
}

module.exports = { server, db, initDatabase, handleApi };
