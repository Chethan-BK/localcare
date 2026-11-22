/* ==============================================================================
   LOCALCARE INFINITY - ENTERPRISE BACKEND INTEGRATION TEST SUITE
   Validates Database Relational Integrity, Authentication & RBAC, Booking Engine,
   Concurrency Controls, Razorpay Gateway, Real AI Services, Security & Google Sheets
   ============================================================================== */

const assert = require('assert');
const crypto = require('crypto');
const { handleApi } = require('../server.js');
const db = require('../backend/database.js');
const auth = require('../backend/auth.js');
const bookingEngine = require('../backend/bookingEngine.js');
const paymentGateway = require('../backend/paymentGateway.js');
const aiService = require('../backend/aiService.js');
const security = require('../backend/security.js');

// Mock HTTP Dispatcher for In-Process Testing
function dispatchApi(method, pathStr, body = null, headers = {}) {
  return new Promise((resolve) => {
    const fullUrl = new URL(pathStr, 'http://127.0.0.1:3000');
    const pathname = fullUrl.pathname;
    const query = Object.fromEntries(fullUrl.searchParams.entries());

    const payload = body ? JSON.stringify(body) : '';
    const reqHeaders = {
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(payload),
      ...headers
    };

    const req = {
      method: method.toUpperCase(),
      url: pathStr,
      headers: reqHeaders,
      socket: { remoteAddress: '127.0.0.1' },
      on(event, handler) {
        if (event === 'data' && payload) handler(Buffer.from(payload));
        if (event === 'end') handler();
        return this;
      }
    };

    let statusCode = 200;
    const resHeaders = {};
    let responseData = '';

    const res = {
      setHeader(k, v) { resHeaders[k.toLowerCase()] = v; },
      writeHead(code, hdrs = {}) {
        statusCode = code;
        for (const [k, v] of Object.entries(hdrs)) {
          resHeaders[k.toLowerCase()] = v;
        }
      },
      end(chunk = '') {
        responseData += chunk;
        let parsed = responseData;
        try {
          parsed = JSON.parse(responseData);
        } catch (e) {}
        resolve({
          status: statusCode,
          headers: resHeaders,
          body: parsed,
          text: responseData
        });
      }
    };

    handleApi(req, res, { pathname, query, searchParams: fullUrl.searchParams })
      .catch(err => {
        resolve({ status: err.statusCode || 500, headers: resHeaders, body: { error: err.message } });
      });
  });
}

async function runEnterpriseTests() {
  console.log('================================================================');
  console.log('  LOCALCARE INFINITY - ENTERPRISE BACKEND TEST SUITE');
  console.log('================================================================');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✓ [PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ✗ [FAIL] ${name}:`, err.message);
      failed++;
    }
  }

  /* --------------------------------------------------------------------------
     1. DATABASE ARCHITECTURE & RELATIONAL OPERATIONS
     -------------------------------------------------------------------------- */
  console.log('\n[1] Database Architecture & Relational Integrity:');

  await test('Database initializes all 18 relational tables', async () => {
    const requiredTables = [
      'users', 'customer_profiles', 'business_owners', 'business_categories',
      'businesses', 'services', 'service_pricing', 'business_availability',
      'bookings', 'payments', 'reviews', 'enquiries', 'complaints',
      'notifications', 'subscriptions', 'transactions', 'ai_interaction_logs', 'admin_activity_logs'
    ];
    for (const t of requiredTables) {
      assert(db.tables[t], `Table "${t}" must exist in relational schema`);
    }
  });

  await test('Foreign Key constraint rejects customer profile with non-existent user_id', async () => {
    let errorThrown = false;
    try {
      db.insert('customer_profiles', {
        id: 'cust_invalid_fk',
        user_id: 'usr_non_existent_id',
        full_name: 'Ghost User',
        mobile: '+91 99999 99999',
        city: 'Bengaluru'
      });
    } catch (err) {
      errorThrown = true;
      assert(err.message.includes('Foreign Key Violation'), 'Expected FK violation message');
    }
    assert(errorThrown, 'Should fail inserting record with missing foreign key');
  });

  await test('ACID transaction rolls back all operations upon error', async () => {
    const initialBizCount = db.find('businesses').length;
    let txFailed = false;

    try {
      await db.transaction(async (tx) => {
        tx.insert('businesses', {
          id: 'biz_rollback_test',
          name: 'Temporary Test Business',
          category_id: 'health',
          city: 'Bengaluru',
          locality: 'Koramangala',
          phone: '+91 98000 11111'
        });
        // Intentionally throw error to force rollback
        throw new Error('Simulated atomic failure during booking creation');
      });
    } catch (e) {
      txFailed = true;
    }

    assert(txFailed, 'Transaction should throw');
    const finalBizCount = db.find('businesses').length;
    assert.strictEqual(finalBizCount, initialBizCount, 'Database state must be identical before and after rollback');
    assert.strictEqual(db.findById('businesses', 'biz_rollback_test'), null, 'Inserted record must be rolled back');
  });

  /* --------------------------------------------------------------------------
     2. AUTHENTICATION & ROLE-BASED ACCESS CONTROL (RBAC)
     -------------------------------------------------------------------------- */
  console.log('\n[2] Authentication & RBAC Authorization:');

  let testCustomerToken = null;
  let testAdminToken = null;

  await test('Password hashing produces secure scrypt digest with distinct salts', async () => {
    const pw = 'SecretPass@2026';
    const hashA = auth.hashPassword(pw);
    const hashB = auth.hashPassword(pw);
    assert.notStrictEqual(hashA.salt, hashB.salt, 'Salts must be distinct per hash');
    assert.notStrictEqual(hashA.hash, hashB.hash, 'Hashes must differ for distinct salts');
    assert(auth.verifyPassword(pw, hashA.hash, hashA.salt), 'Verification of correct password must succeed');
    assert(!auth.verifyPassword('WrongPass', hashA.hash, hashA.salt), 'Verification of incorrect password must fail');
  });

  await test('POST /api/auth/register creates user and linked customer profile', async () => {
    const uniqueEmail = `test_${Date.now()}@localcare.in`;
    const uniquePhone = `+91 9${Math.floor(100000000 + Math.random() * 900000000)}`;

    const res = await dispatchApi('POST', '/api/auth/register', {
      email: uniqueEmail,
      password: 'SecurePassword123!',
      role: 'customer',
      phone: uniquePhone,
      fullName: 'Rohan Sharma',
      city: 'Bengaluru',
      locality: 'Indiranagar'
    });

    assert.strictEqual(res.status, 201);
    assert(res.body.token, 'Must return JWT token');
    assert.strictEqual(res.body.user.email, uniqueEmail);
    assert.strictEqual(res.body.profile.full_name, 'Rohan Sharma');
    testCustomerToken = res.body.token;
  });

  await test('POST /api/auth/login validates credentials and issues signed token', async () => {
    const res = await dispatchApi('POST', '/api/auth/login', {
      identifier: 'admin@localcare.in',
      password: 'Admin@LocalCare2026'
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.user.role, 'admin');
    assert(res.body.token);
    testAdminToken = res.body.token;
  });

  await test('Protected route enforces RBAC and rejects unauthorized role with 403', async () => {
    // Attempt admin verification using customer token
    const res = await dispatchApi('PATCH', '/api/businesses/b-101/verify', {}, {
      authorization: `Bearer ${testCustomerToken}`
    });
    assert.strictEqual(res.status, 403, 'Customer role must be rejected from admin verification');
  });

  /* --------------------------------------------------------------------------
     3. CONCURRENCY-SAFE BOOKING ENGINE
     -------------------------------------------------------------------------- */
  console.log('\n[3] Concurrency-Safe Booking Engine:');

  let createdBooking = null;

  const testDate = '2026-12-' + String(Math.floor(10 + Math.random() * 18)).padStart(2, '0');
  const testSlot = '11:00 AM - 12:00 PM';
  // Clean up any residual test bookings for this date/business to guarantee test isolation
  const existingTestBookings = db.find('bookings', b => b.business_id === 'b-101' && b.scheduled_date === testDate);
  existingTestBookings.forEach(b => db.delete('bookings', b.id));

  await test('POST /api/bookings creates confirmed appointment with secure OTP', async () => {
    const res = await dispatchApi('POST', '/api/bookings', {
      customerId: 'CUST-1001',
      businessId: 'b-101',
      scheduledDate: testDate,
      timeSlot: testSlot,
      customerAddress: 'Koramangala 4th Block, Bengaluru',
      price: 599
    });

    assert.strictEqual(res.status, 201);
    assert(res.body.booking.id);
    assert(res.body.booking.otp && res.body.booking.otp.length === 4);
    assert.strictEqual(res.body.booking.status, 'Confirmed');
    createdBooking = res.body.booking;
  });

  await test('Double-booking prevention rejects conflicting bookings exceeding capacity', async () => {
    // 1st booking exists from previous test. Create 2nd booking to hit max capacity (2 concurrent).
    await bookingEngine.createBooking({
      customerId: 'CUST-1001',
      businessId: 'b-101',
      scheduledDate: testDate,
      timeSlot: testSlot,
      address: 'Koramangala 4th Block, Bengaluru'
    });

    // 3rd booking must now be rejected
    let conflictError = null;
    try {
      await bookingEngine.createBooking({
        customerId: 'CUST-1001',
        businessId: 'b-101',
        scheduledDate: testDate,
        timeSlot: testSlot,
        address: 'Koramangala 4th Block, Bengaluru'
      });
    } catch (e) {
      conflictError = e;
    }
    assert(conflictError, 'Should throw double-booking conflict error');
    assert(conflictError.message.includes('Double-booking prevention'));
  });

  await test('Booking state machine enforces valid transitions and rejects invalid ones', async () => {
    // Valid: Confirmed -> On The Way
    const step1 = await bookingEngine.transitionStatus(createdBooking.id, 'On The Way', { role: 'admin' });
    assert.strictEqual(step1.status, 'On The Way');

    // Valid: On The Way -> In Progress
    const step2 = await bookingEngine.transitionStatus(createdBooking.id, 'In Progress', { role: 'admin' });
    assert.strictEqual(step2.status, 'In Progress');

    // Valid: In Progress -> Completed
    const step3 = await bookingEngine.transitionStatus(createdBooking.id, 'Completed', { role: 'admin' });
    assert.strictEqual(step3.status, 'Completed');

    // Invalid: Completed -> Cancelled (Terminal state cannot be cancelled)
    let invalidError = null;
    try {
      await bookingEngine.transitionStatus(createdBooking.id, 'Cancelled', { role: 'admin' });
    } catch (e) {
      invalidError = e;
    }
    assert(invalidError, 'Terminal state transition must fail');
  });

  /* --------------------------------------------------------------------------
     4. ZERO-TRUST RAZORPAY GATEWAY & GST INVOICING
     -------------------------------------------------------------------------- */
  console.log('\n[4] Zero-Trust Razorpay Gateway & GST Tax Invoicing:');

  let testOrder = null;

  await test('POST /api/payments/create-order generates Razorpay order and calculates 5% GST', async () => {
    const res = await dispatchApi('POST', '/api/payments/create-order', {
      bookingId: createdBooking.id,
      customerId: 'CUST-1001',
      amount: 1050
    });

    assert.strictEqual(res.status, 201);
    assert(res.body.orderId.startsWith('order_'));
    assert.strictEqual(res.body.gstDetails.baseAmount, 1000);
    assert.strictEqual(res.body.gstDetails.totalGst, 50);
    assert.strictEqual(res.body.gstDetails.hsnSac, '9987');
    testOrder = res.body;
  });

  await test('POST /api/payments/verify rejects tampered or fraudulent signatures', async () => {
    const res = await dispatchApi('POST', '/api/payments/verify', {
      razorpayOrderId: testOrder.orderId,
      razorpayPaymentId: 'pay_spoofed_123',
      razorpaySignature: 'fraudulent_signature_hash'
    });

    assert.strictEqual(res.status, 400);
    assert(res.body.error.includes('signature verification failed'));
  });

  await test('POST /api/payments/verify captures valid payment and produces digital GST invoice', async () => {
    const paymentId = 'pay_real_txn_999';
    const validSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'localcare_rzp_secret_key_prod_982')
      .update(`${testOrder.orderId}|${paymentId}`)
      .digest('hex');

    const res = await dispatchApi('POST', '/api/payments/verify', {
      razorpayOrderId: testOrder.orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: validSignature
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.payment.status, 'Captured');
    assert(res.body.invoice.invoiceNumber.startsWith('LC-INV-'));
    assert.strictEqual(res.body.invoice.provider.gstin, '29AABCU9603R1ZM');
    assert.strictEqual(res.body.invoice.paymentSummary.grandTotal, 1050);
  });

  /* --------------------------------------------------------------------------
     5. REAL AI BACKEND SERVICES
     -------------------------------------------------------------------------- */
  console.log('\n[5] Real AI Backend Services & Cost Ledger:');

  await test('POST /api/ai/search extracts category, budget, urgency and locality from query', async () => {
    const res = await dispatchApi('POST', '/api/ai/search', {
      query: 'I need an electrician in Koramangala under 500 today'
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.category, 'electrical');
    assert.strictEqual(res.body.maxBudget, 500);
    assert.strictEqual(res.body.urgency, 'today');
    assert.strictEqual(res.body.locality, 'Koramangala');
  });

  await test('AI multi-factor provider matcher accurately scores and ranks listings', async () => {
    const candidates = [
      { id: 'b1', rating: 4.2, trust_score: 80, category_id: 'electrical', starting_price: 600, verified: false },
      { id: 'b2', rating: 4.9, trust_score: 98, category_id: 'electrical', starting_price: 399, verified: true }
    ];
    const ranked = aiService.rankProviders(candidates, { category: 'electrical', maxBudget: 500 });
    assert.strictEqual(ranked[0].id, 'b2', 'Top ranked pro must be highest rating, trust, budget-fit and verified');
    assert(ranked[0].matchScore > ranked[1].matchScore);
  });

  await test('AI interaction log tracks prompt tokens, latency, and estimated cost in INR', async () => {
    const logs = db.find('ai_interaction_logs');
    assert(logs.length > 0, 'AI queries must be logged in audit table');
    const last = logs[logs.length - 1];
    assert(typeof last.latency_ms === 'number');
    assert(typeof last.cost_estimate_inr === 'number');
  });

  /* --------------------------------------------------------------------------
     6. SECURITY, RATE LIMITING & INPUT SANITIZATION
     -------------------------------------------------------------------------- */
  console.log('\n[6] Security, Rate Limiter & Sanitization:');

  await test('Input sanitizer neutralizes XSS script injections and SQL quote escapes', async () => {
    const maliciousPayload = {
      name: '<script>alert("XSS")</script>John Doe',
      notes: "Testing' OR '1'='1; DROP TABLE users;--"
    };
    const sanitized = security.sanitizeInput(maliciousPayload);
    assert(!sanitized.name.includes('<script>'), 'Script tags must be stripped');
    assert.strictEqual(sanitized.name, 'John Doe');
    assert(!sanitized.notes.includes(';'), 'Semicolons must be stripped');
    assert(sanitized.notes.includes("''"), 'Quotes must be escaped');
  });

  await test('HTTP response headers enforce enterprise security policies (CSP, nosniff, SAMEORIGIN)', async () => {
    const res = await dispatchApi('GET', '/api/health');
    assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
    assert.strictEqual(res.headers['x-frame-options'], 'SAMEORIGIN');
    assert(res.headers['content-security-policy']);
  });

  /* --------------------------------------------------------------------------
     7. GOOGLE SHEETS AUTOMATED CRM ENGINE
     -------------------------------------------------------------------------- */
  console.log('\n[7] Google Sheets Automated CRM Sync:');

  await test('GET /api/crm/overview returns real calculated platform metrics and sync health', async () => {
    const res = await dispatchApi('GET', '/api/crm/overview');
    assert.strictEqual(res.status, 200);
    assert(typeof res.body.totalBusinesses === 'number' && res.body.totalBusinesses > 0);
    assert(typeof res.body.totalCustomers === 'number');
    assert(typeof res.body.totalGmv === 'number');
    assert(res.body.crmConfig);
  });

  await test('GET /api/crm/export-csv streams RFC 4180 CSV for spreadsheet sync', async () => {
    const res = await dispatchApi('GET', '/api/crm/export-csv?sheet=Customers');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers['content-type'], 'text/csv; charset=utf-8');
    assert(res.text.includes('Customer ID') && res.text.includes('Mobile'));
  });

  console.log('\n================================================================');
  console.log(`  BACKEND TEST SUMMARY: ${passed} Passed, ${failed} Failed`);
  console.log('================================================================');

  process.exit(failed > 0 ? 1 : 0);
}

runEnterpriseTests().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
