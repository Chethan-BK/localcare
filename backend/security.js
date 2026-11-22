/* ==============================================================================
   LOCALCARE INFINITY - SECURITY, SANITIZATION & PERFORMANCE HARDENING LAYER
   XSS Sanitization, SQL Injection Defense, Rate Limiter, Secure Headers, and Audit Logger
   ============================================================================== */

const crypto = require('crypto');
const db = require('./database.js');

// Rate Limit Buckets
const rateLimitBuckets = new Map();
const AUTH_RATE_LIMIT_MAX = 15; // Max 15 auth calls per 5 minutes
const API_RATE_LIMIT_MAX = 250;  // Max 250 general API calls per 5 minutes
const WINDOW_MS = 5 * 60 * 1000;

class SecurityLayer {
  /* --------------------------------------------------------------------------
     1. Input Sanitization & Threat Neutralization
     -------------------------------------------------------------------------- */
  sanitizeInput(val) {
    if (val === null || val === undefined) return val;
    if (typeof val === 'number' || typeof val === 'boolean') return val;
    if (Array.isArray(val)) return val.map(item => this.sanitizeInput(item));
    if (typeof val === 'object') {
      const cleanObj = {};
      for (const [k, v] of Object.entries(val)) {
        cleanObj[this.sanitizeString(k)] = this.sanitizeInput(v);
      }
      return cleanObj;
    }
    if (typeof val === 'string') {
      return this.sanitizeString(val);
    }
    return val;
  }

  sanitizeString(str) {
    if (!str) return '';
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script tags
      .replace(/javascript:[^"']*/gi, '') // Neutralize javascript: pseudo-protocols
      .replace(/on\w+\s*=/gi, '') // Strip inline event handlers (onload, onerror)
      .replace(/['";\\]/g, char => { // Escape SQL quote characters
        switch (char) {
          case "'": return "''";
          case '"': return '&quot;';
          case ';': return '';
          case '\\': return '';
          default: return char;
        }
      })
      .trim();
  }

  /* --------------------------------------------------------------------------
     2. Rate Limiting Middleware
     -------------------------------------------------------------------------- */
  checkRateLimit(req) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const isAuth = req.url && req.url.includes('/api/auth');
    const limit = isAuth ? AUTH_RATE_LIMIT_MAX : API_RATE_LIMIT_MAX;
    const bucketKey = `${ip}_${isAuth ? 'auth' : 'api'}`;

    const now = Date.now();
    const bucket = rateLimitBuckets.get(bucketKey) || { count: 0, resetAt: now + WINDOW_MS };

    if (now > bucket.resetAt) {
      bucket.count = 1;
      bucket.resetAt = now + WINDOW_MS;
      rateLimitBuckets.set(bucketKey, bucket);
      return { allowed: true };
    }

    bucket.count++;
    rateLimitBuckets.set(bucketKey, bucket);

    if (bucket.count > limit) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      return {
        allowed: false,
        retryAfter,
        message: `Too Many Requests: Rate limit exceeded. Retry in ${retryAfter} seconds.`
      };
    }

    return { allowed: true };
  }

  /* --------------------------------------------------------------------------
     3. Enterprise Secure HTTP Headers (Helmet Equivalent)
     -------------------------------------------------------------------------- */
  applySecurityHeaders(res) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: data: blob:;");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  }

  /* --------------------------------------------------------------------------
     4. Admin Activity Audit Logger
     -------------------------------------------------------------------------- */
  logAudit(adminUserId, action, targetType, targetId, details, ip = '127.0.0.1') {
    try {
      db.insert('admin_activity_logs', {
        id: `aud_${crypto.randomUUID()}`,
        admin_user_id: adminUserId || 'system',
        action: action,
        target_type: targetType,
        target_id: targetId,
        details: typeof details === 'object' ? JSON.stringify(details) : String(details),
        ip_address: ip
      });
    } catch (err) {
      console.warn('[Security Audit] Log notice:', err.message);
    }
  }
}

module.exports = new SecurityLayer();

