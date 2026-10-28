/* ==============================================================================
   LOCALCARE INFINITY - Automated End-to-End API Integration Test Suite
   Validates REST endpoints, search filtering, double-booking prevention,
   quote acceptance to booking conversion, review posting, and admin operations.
   ============================================================================== */

const http = require('http');
const assert = require('assert');
const { server } = require('../server.js');

const TEST_PORT = 3099;

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = http.request({
      hostname: '127.0.0.1',
      port: TEST_PORT,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(payload ? { 'Content-Length': Buffer.byteLength(payload) } : {})
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('----------------------------------------------------');
  console.log('  STARTING LOCALCARE INFINITY INTEGRATION TESTS');
  console.log('----------------------------------------------------');

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

  // Start test server
  await new Promise(resolve => server.listen(TEST_PORT, '127.0.0.1', resolve));

  try {
    // Test 1: Health check
    await test('GET /api/health returns healthy status and counts', async () => {
      const res = await request('GET', '/api/health');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, 'healthy');
      assert.strictEqual(res.body.platform, 'LocalCare Infinity');
      assert(res.body.counts.businesses > 0);
    });

    // Test 2: Categories endpoint
    await test('GET /api/categories returns 12 core categories', async () => {
      const res = await request('GET', '/api/categories');
      assert.strictEqual(res.status, 200);
      assert(Array.isArray(res.body));
      assert(res.body.length >= 12);
    });

    // Test 3: Businesses query by city and category
    await test('GET /api/businesses filters accurately by city and category', async () => {
      const res = await request('GET', '/api/businesses?city=Bengaluru&category=health');
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 0);
      for (const b of res.body.businesses) {
        assert.strictEqual(b.city.toLowerCase(), 'bengaluru');
        assert.strictEqual(b.category, 'health');
      }
    });

    // Test 4: Natural language keyword search
    await test('GET /api/businesses?q=dentist returns dental clinics', async () => {
      const res = await request('GET', '/api/businesses?q=dentist');
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 0);
      assert(res.body.businesses.some(b => b.name.toLowerCase().includes('dental') || b.subcategory.toLowerCase().includes('dentist')));
    });

    // Test 5: Register new business
    let registeredBizId = null;
    const testPhone = '+91 98450 ' + Math.floor(10000 + Math.random() * 90000);
    await test('POST /api/businesses registers new business with unverified status', async () => {
      const payload = {
        name: 'Apex Robotics & Laptop Lab',
        category: 'tech',
        city: 'Bengaluru',
        locality: 'Koramangala 5th Block',
        phone: testPhone,
        startingPrice: 599,
        primaryService: 'Motherboard & Screen Diagnostics'
      };
      const res = await request('POST', '/api/businesses', payload);
      assert.strictEqual(res.status, 201);
      assert(res.body.business);
      assert.strictEqual(res.body.business.verified, false);
      registeredBizId = res.body.business.id;
    });

    // Test 6: Duplicate business detection
    await test('POST /api/businesses rejects duplicate business with same phone and city', async () => {
      const payload = {
        name: 'Duplicate Apex Lab',
        category: 'tech',
        city: 'Bengaluru',
        locality: 'Koramangala',
        phone: testPhone
      };
      const res = await request('POST', '/api/businesses', payload);
      assert.strictEqual(res.status, 409);
    });

    // Test 7: Admin verification of business
    await test('PATCH /api/businesses/:id/verify grants verified status and increases trust score', async () => {
      assert(registeredBizId);
      const res = await request('PATCH', `/api/businesses/${registeredBizId}/verify`);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.business.verified, true);
      assert(res.body.business.trustScore >= 95);
    });

    // Test 8: Booking creation workflow
    let createdBookingId = null;
    await test('POST /api/bookings successfully creates confirmed appointment with OTP', async () => {
      const payload = {
        businessId: 'b-101',
        customerName: 'Chethan B K',
        customerPhone: '+91 98451 98765',
        customerAddress: '42, 5th Cross, Koramangala, Bengaluru',
        date: 'Tomorrow',
        timeSlot: '11:00 AM - 12:00 PM',
        price: 499
      };
      const res = await request('POST', '/api/bookings', payload);
      assert.strictEqual(res.status, 201);
      assert(res.body.booking);
      assert(res.body.booking.id.startsWith('LC-BK-'));
      assert(res.body.booking.otp);
      createdBookingId = res.body.booking.id;
    });

    // Test 9: Double-booking prevention
    await test('POST /api/bookings prevents double-booking for same phone, business and slot', async () => {
      const payload = {
        businessId: 'b-101',
        customerName: 'Chethan B K',
        customerPhone: '+91 98451 98765',
        customerAddress: '42, 5th Cross, Koramangala',
        date: 'Tomorrow',
        timeSlot: '11:00 AM - 12:00 PM'
      };
      const res = await request('POST', '/api/bookings', payload);
      assert.strictEqual(res.status, 409);
      assert(res.body.error.includes('Double-booking prevention'));
    });

    // Test 10: Cancel booking
    await test('PATCH /api/bookings/:id can cancel an active booking', async () => {
      assert(createdBookingId);
      const res = await request('PATCH', `/api/bookings/${createdBookingId}`, { action: 'cancel' });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.booking.status, 'Cancelled');
    });

    // Test 11: Quote broadcast & Bids generation
    let createdQuoteId = null;
    let firstBidId = null;
    await test('POST /api/quotes broadcasts requirement and generates bids from nearby pros', async () => {
      const payload = {
        category: 'home',
        locality: 'Valachil, Mangaluru',
        phone: '+91 98451 12345',
        description: 'Urgent burst pipe repair under kitchen sink',
        urgency: 'Immediate (Next 30 mins)',
        budget: 'Under ₹600'
      };
      const res = await request('POST', '/api/quotes', payload);
      assert.strictEqual(res.status, 201);
      assert(res.body.quote);
      assert(res.body.quote.bids.length > 0);
      createdQuoteId = res.body.quote.id;
      firstBidId = res.body.quote.bids[0].id;
    });

    // Test 12: Accept quote bid and convert to confirmed booking
    await test('POST /api/quotes/:id/accept converts accepted bid into a live booking', async () => {
      assert(createdQuoteId);
      assert(firstBidId);
      const res = await request('POST', `/api/quotes/${createdQuoteId}/accept`, {
        bidId: firstBidId,
        customerName: 'Chethan B K'
      });
      assert.strictEqual(res.status, 201);
      assert(res.body.booking);
      assert(res.body.booking.id.startsWith('LC-BK-'));
      assert.strictEqual(res.body.booking.quoteId, createdQuoteId);
    });

    // Test 13: Submit review and update business rating
    await test('POST /api/reviews updates business rating and reviews count', async () => {
      const payload = {
        businessId: 'b-101',
        author: 'Priya Sharma',
        rating: 5,
        comment: 'Outstanding painless dental cleaning. Very hygienic!'
      };
      const res = await request('POST', '/api/reviews', payload);
      assert.strictEqual(res.status, 201);
      assert(res.body.businessRating >= 4.5);
      assert(res.body.reviewsCount > 0);
    });

    // Test 14: Newsletter subscription
    await test('POST /api/newsletter accepts valid email address', async () => {
      const res = await request('POST', '/api/newsletter', { email: 'subscriber@example.com' });
      assert.strictEqual(res.status, 200);
    });

    // Test 15: Natural language query - "Dentist near me under ₹500"
    await test('GET /api/businesses?q=Dentist near me under ₹500 returns dentists within budget', async () => {
      const res = await request('GET', '/api/businesses?q=' + encodeURIComponent('Dentist near me under ₹500'));
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 0);
      for (const b of res.body.businesses) {
        assert.strictEqual(b.category, 'health');
        assert(b.startingPrice <= 500 || b.services.some(s => s.price <= 500));
      }
    });

    // Test 16: Natural language query - "AC repair in Valachil today"
    await test('GET /api/businesses?q=AC repair in Valachil today returns Valachil AC services', async () => {
      const res = await request('GET', '/api/businesses?q=' + encodeURIComponent('AC repair in Valachil today'));
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 0);
      for (const b of res.body.businesses) {
        assert.strictEqual(b.category, 'electrical');
        assert.strictEqual(b.city.toLowerCase(), 'mangaluru');
        assert(b.locality.toLowerCase().includes('valachil'));
        assert.strictEqual(b.availableToday, true);
      }
    });

    // Test 17: Natural language query - "Laptop repair under ₹1000"
    await test('GET /api/businesses?q=Laptop repair under ₹1000 returns tech repair within budget', async () => {
      const res = await request('GET', '/api/businesses?q=' + encodeURIComponent('Laptop repair under ₹1000'));
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 0);
      for (const b of res.body.businesses) {
        assert.strictEqual(b.category, 'tech');
        assert(b.startingPrice <= 1000 || b.services.some(s => s.price <= 1000));
      }
    });

    // Test 18: Natural language query - "Best vegetarian restaurants in Mysuru"
    await test('GET /api/businesses?q=Best vegetarian restaurants in Mysuru returns top-rated veg food in Mysuru', async () => {
      const res = await request('GET', '/api/businesses?q=' + encodeURIComponent('Best vegetarian restaurants in Mysuru'));
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 0);
      for (const b of res.body.businesses) {
        assert.strictEqual(b.category, 'food');
        assert.strictEqual(b.city.toLowerCase(), 'mysuru');
        assert(b.rating >= 4.5);
        assert(b.isVeg || (b.subcategory || '').toLowerCase().includes('veg'));
      }
    });

    // Test 19: Natural language query - "Compare highly rated plumbers"
    await test('GET /api/businesses?q=Compare highly rated plumbers returns 4.5+ plumbers', async () => {
      const res = await request('GET', '/api/businesses?q=' + encodeURIComponent('Compare highly rated plumbers'));
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 0);
      for (const b of res.body.businesses) {
        assert.strictEqual(b.category, 'home');
        assert(b.rating >= 4.5);
      }
    });

    // Test 20: Sorting verification
    await test('GET /api/businesses?sortBy=price_low returns listings in ascending starting price order', async () => {
      const res = await request('GET', '/api/businesses?sortBy=price_low');
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 1);
      for (let i = 0; i < res.body.businesses.length - 1; i++) {
        assert((res.body.businesses[i].startingPrice || 0) <= (res.body.businesses[i + 1].startingPrice || 0));
      }
    });

    // Test 21: Pagination verification
    await test('GET /api/businesses?page=1&limit=2 returns paginated metadata and slice', async () => {
      const res1 = await request('GET', '/api/businesses?page=1&limit=2');
      assert.strictEqual(res1.status, 200);
      assert.strictEqual(res1.body.page, 1);
      assert.strictEqual(res1.body.limit, 2);
      assert.strictEqual(res1.body.businesses.length, 2);

      const res2 = await request('GET', '/api/businesses?page=2&limit=2');
      assert.strictEqual(res2.status, 200);
      assert.strictEqual(res2.body.page, 2);
      assert.strictEqual(res2.body.businesses.length, 2);
      assert.notStrictEqual(res1.body.businesses[0].id, res2.body.businesses[0].id);
    });

    // Test 22: Distance sorting where location data is available
    await test('GET /api/businesses?lat=12.9716&lng=77.5946&sortBy=distance orders businesses by nearest distance', async () => {
      const res = await request('GET', '/api/businesses?lat=12.9716&lng=77.5946&sortBy=distance&city=Bengaluru');
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 1);
      for (let i = 0; i < res.body.businesses.length - 1; i++) {
        const d1 = parseFloat(res.body.businesses[i].distance || 999);
        const d2 = parseFloat(res.body.businesses[i + 1].distance || 999);
        assert(d1 <= d2, `Expected distance ${d1} <= ${d2}`);
      }
    });

    // Test 23: 1000x Massive Database Scale & Multi-City Expansion
    await test('Database scale contains over 150 verified businesses across 12 Indian cities', async () => {
      const healthRes = await request('GET', '/api/health');
      assert.strictEqual(healthRes.status, 200);
      assert(healthRes.body.counts.businesses >= 150, `Expected >= 150 businesses, got ${healthRes.body.counts.businesses}`);
      assert(healthRes.body.counts.cities >= 12, `Expected >= 12 cities, got ${healthRes.body.counts.cities}`);
    });

    // Test 24: Live Reverse-Bidding Arena API
    await test('POST /api/quotes/arena launches real-time competitive bidding war', async () => {
      const payload = {
        category: 'electrical',
        locality: 'Koramangala, Bengaluru',
        budget: 500,
        service: 'Split AC Power Jet & Gas Refill'
      };
      const res = await request('POST', '/api/quotes/arena', payload);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.status, 'active');
      assert(res.body.arenaId.startsWith('LC-AR-'));
      assert(res.body.bidsCount > 0);
      assert(Array.isArray(res.body.bids));
      assert(res.body.bids.some(b => b.price < 500));
    });

    // Test 25: New Metro Cities Coverage (Chennai, Hyderabad, Kolkata, Jaipur)
    await test('GET /api/businesses retrieves listings across newly expanded metropolitan hubs', async () => {
      const chennaiRes = await request('GET', '/api/businesses?city=Chennai');
      assert.strictEqual(chennaiRes.status, 200);
      assert(chennaiRes.body.businesses.length > 0, 'Expected Chennai businesses');

      const hydRes = await request('GET', '/api/businesses?city=Hyderabad');
      assert.strictEqual(hydRes.status, 200);
      assert(hydRes.body.businesses.length > 0, 'Expected Hyderabad businesses');

      const kolkataRes = await request('GET', '/api/businesses?city=Kolkata');
      assert.strictEqual(kolkataRes.status, 200);
      assert(kolkataRes.body.businesses.length > 0, 'Expected Kolkata businesses');

      const jaipurRes = await request('GET', '/api/businesses?city=Jaipur');
      assert.strictEqual(jaipurRes.status, 200);
      assert(jaipurRes.body.businesses.length > 0, 'Expected Jaipur businesses');
    });

    // Test 26: Expanded Category System Verification
    await test('GET /api/categories contains 18 categories including shopping, pro, daily, and travel', async () => {
      const res = await request('GET', '/api/categories');
      assert.strictEqual(res.status, 200);
      assert(Array.isArray(res.body));
      assert(res.body.length >= 18, `Expected >= 18 categories, got ${res.body.length}`);
      const catIds = res.body.map(c => c.id);
      assert(catIds.includes('shopping'), 'Expected shopping category');
      assert(catIds.includes('pro'), 'Expected pro category');
      assert(catIds.includes('daily'), 'Expected daily category');
      assert(catIds.includes('travel'), 'Expected travel category');
    });

    // Test 27: Single Business Profile Deep-Link Lookup
    await test('GET /api/businesses/:id returns dedicated business profile details', async () => {
      const res = await request('GET', '/api/businesses/b-101');
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.id, 'b-101');
      assert(res.body.name);
      assert(res.body.services && res.body.services.length > 0);
      assert(res.body.reviews && res.body.reviews.length > 0);
      assert(typeof res.body.trustScore === 'number');
    });

    // Test 28: Admin Category Management Endpoint
    await test('POST /api/categories dynamically creates a new category and logs audit', async () => {
      const testCatId = 'petcare_' + Math.floor(1000 + Math.random() * 9000);
      const payload = {
        id: testCatId,
        title: 'Pet Care & Veterinary',
        icon: '🐾',
        subcategories: ['Vets', 'Pet Grooming', 'Pet Boarding']
      };
      const res = await request('POST', '/api/categories', payload);
      assert.strictEqual(res.status, 201);
      assert.strictEqual(res.body.id, testCatId);
      assert.strictEqual(res.body.title, 'Pet Care & Veterinary');
    });

    // Test 29: System Audit Trail Inspection
    await test('GET /api/audit-logs returns administrative audit trail entries', async () => {
      const res = await request('GET', '/api/audit-logs');
      assert.strictEqual(res.status, 200);
      assert(Array.isArray(res.body));
      assert(res.body.length > 0);
      assert(res.body[0].action);
      assert(res.body[0].timestamp);
    });

    // Test 30: AI Semantic Natural Language Search on New Categories
    await test('GET /api/businesses?q=lawyer in Bengaluru maps to legal professionals', async () => {
      const res = await request('GET', '/api/businesses?q=' + encodeURIComponent('lawyer in Bengaluru'));
      assert.strictEqual(res.status, 200);
      assert(res.body.businesses.length > 0);
      for (const b of res.body.businesses) {
        assert.strictEqual(b.category, 'pro');
        assert.strictEqual(b.city.toLowerCase(), 'bengaluru');
      }
    });

  } finally {
    server.close();
  }

  console.log('----------------------------------------------------');
  console.log(`  TEST RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log('----------------------------------------------------');
  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
