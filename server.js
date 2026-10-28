/* ==============================================================================
   LOCALCARE INFINITY - Production-Oriented REST API & Application Server
   Every Local Need. One Intelligent Platform.
   ============================================================================== */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'db.json');

// Import AI Natural Language Search Engine
let AISearchEngine = null;
try {
  AISearchEngine = require('./js/modules/aiSearch.js');
} catch (e) {
  console.warn('[Server] AISearchEngine module not loaded:', e.message);
}

// MIME types dictionary
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

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory Database with JSON File Persistence
let db = {
  businesses: [],
  categories: [],
  cities: [],
  deals: [],
  bookings: [],
  quotes: [],
  subscribers: [],
  auditLogs: []
};

// Initialize DB from db.json or seed from js/data.js
function initDatabase() {
  if (fs.existsSync(DB_PATH)) {
    try {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      db = JSON.parse(raw);
      console.log(`[DB] Loaded persistent database from ${DB_PATH} with ${db.businesses?.length || 0} businesses.`);
      return;
    } catch (err) {
      console.error('[DB] Error parsing db.json, falling back to seed:', err);
    }
  }

  // Load seeds from js/data.js using vm/eval
  try {
    const dataJsContent = fs.readFileSync(path.join(__dirname, 'js', 'data.js'), 'utf-8');
    const vm = require('vm');
    const sandbox = {};
    vm.createContext(sandbox);
    // Replace const with var so variables attach to sandbox
    const modCode = dataJsContent.replace(/\bconst\s+/g, 'var ').replace(/\blet\s+/g, 'var ');
    vm.runInContext(modCode, sandbox);

    db.cities = sandbox.CITIES || [];
    db.categories = sandbox.CATEGORIES || [];
    db.businesses = sandbox.INITIAL_BUSINESSES || [];
    db.deals = sandbox.PLATFORM_DEALS || [];
    db.bookings = sandbox.INITIAL_BOOKINGS || [];
    db.quotes = sandbox.INITIAL_QUOTES || [];
    db.auditLogs = [
      { id: 'log-1', timestamp: new Date().toISOString(), action: 'SYSTEM_BOOT', details: 'LocalCare Infinity platform initialized' }
    ];

    saveDatabase();
    console.log(`[DB] Initialized fresh database with ${db.businesses.length} businesses and ${db.categories.length} categories.`);
  } catch (err) {
    console.error('[DB] Failed to load seed data from js/data.js:', err);
  }
}

function saveDatabase() {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('[DB] Failed to persist database to file:', err);
  }
}

// Helper to log administrative audit trail
function logAudit(action, details, user = 'admin') {
  const entry = {
    id: 'log-' + Date.now(),
    timestamp: new Date().toISOString(),
    user,
    action,
    details
  };
  db.auditLogs.unshift(entry);
  if (db.auditLogs.length > 200) db.auditLogs.pop();
  saveDatabase();
}

// Request Body Parser Helper
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 2 * 1024 * 1024) { // 2MB max
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        resolve({ raw: body });
      }
    });
    req.on('error', reject);
  });
}

// JSON Response Helper
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Content-Type-Options': 'nosniff'
  });
  res.end(JSON.stringify(data));
}

// Haversine Distance Helper in Kilometers
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// API Route Handlers
async function handleApi(req, res, parsedUrl) {
  const { pathname, query } = parsedUrl;
  const method = req.method;

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // 1. Health check
  if (pathname === '/api/health' && method === 'GET') {
    return sendJson(res, 200, {
      status: 'healthy',
      platform: 'LocalCare Infinity',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      counts: {
        businesses: db.businesses.length,
        categories: db.categories.length,
        cities: (db.cities && db.cities.length) || 12,
        bookings: db.bookings.length,
        quotes: db.quotes.length,
        deals: db.deals.length
      }
    });
  }

  // 2. GET /api/categories
  if (pathname === '/api/categories' && method === 'GET') {
    return sendJson(res, 200, db.categories);
  }

  // 3. POST /api/categories (Admin)
  if (pathname === '/api/categories' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (!body.id || !body.title) {
      return sendJson(res, 400, { error: 'Category id and title are required' });
    }
    const existing = db.categories.find(c => c.id === body.id);
    if (existing) {
      return sendJson(res, 409, { error: 'Category with this id already exists' });
    }
    const newCat = {
      id: body.id,
      title: body.title,
      icon: body.icon || '🏷️',
      badgeClass: `cat-${body.id}`,
      count: '0 listings',
      subcategories: body.subcategories || []
    };
    db.categories.push(newCat);
    logAudit('CREATE_CATEGORY', `Created category "${newCat.title}"`);
    saveDatabase();
    return sendJson(res, 201, newCat);
  }

  // 4. GET /api/cities
  if (pathname === '/api/cities' && method === 'GET') {
    return sendJson(res, 200, db.cities);
  }

  // 5. GET /api/businesses (Natural Language Search, Filter, Sort, Pagination)
  if (pathname === '/api/businesses' && method === 'GET') {
    let results = [...db.businesses];
    let parsedAI = null;

    // Natural Language Search via AISearchEngine
    if (query.q && query.q.trim()) {
      if (AISearchEngine && AISearchEngine.parseQuery) {
        parsedAI = AISearchEngine.parseQuery(query.q, query.city || 'all');

        // Apply semantic AI filtering
        results = results.filter(b => {
          return AISearchEngine.matchesBusiness(b, parsedAI, query.city || parsedAI.city || 'all');
        });

        // Relevance scoring
        results.sort((a, b) => {
          return AISearchEngine.scoreRelevance(b, parsedAI) - AISearchEngine.scoreRelevance(a, parsedAI);
        });
      } else {
        const qLower = query.q.toLowerCase().trim();
        results = results.filter(b => {
          const inName = (b.name || '').toLowerCase().includes(qLower);
          const inLocality = (b.locality || '').toLowerCase().includes(qLower);
          const inSubcat = (b.subcategory || '').toLowerCase().includes(qLower);
          const inServices = (b.services || []).some(s => s.name.toLowerCase().includes(qLower));
          const inDesc = (b.description || '').toLowerCase().includes(qLower);
          return inName || inLocality || inSubcat || inServices || inDesc;
        });
      }
    }

    // Explicit Filter: City
    if (query.city && query.city !== 'all') {
      results = results.filter(b => b.city.toLowerCase() === query.city.toLowerCase());
    }

    // Explicit Filter: Category
    if (query.category && query.category !== 'all') {
      results = results.filter(b => b.category.toLowerCase() === query.category.toLowerCase());
    }

    // Explicit Filter: Subcategory
    if (query.subcategory) {
      results = results.filter(b => (b.subcategory || '').toLowerCase().includes(query.subcategory.toLowerCase()));
    }

    // Explicit Filter: Locality
    if (query.locality) {
      results = results.filter(b => (b.locality || '').toLowerCase().includes(query.locality.toLowerCase()));
    }

    // Explicit Filter: Verified Only
    if (query.verified === 'true') {
      results = results.filter(b => b.verified === true);
    }

    // Explicit Filter: Open Now
    if (query.openNow === 'true') {
      results = results.filter(b => b.openNow === true);
    }

    // Explicit Filter: Available Today
    if (query.availableToday === 'true') {
      results = results.filter(b => b.availableToday === true);
    }

    // Explicit Filter: Min Rating
    if (query.minRating) {
      const minR = parseFloat(query.minRating);
      results = results.filter(b => (b.rating || 0) >= minR);
    }

    // Explicit Filter: Max Price
    if (query.maxPrice) {
      const maxP = parseFloat(query.maxPrice);
      results = results.filter(b => (b.startingPrice || 0) <= maxP);
    }

    // Explicit Filter: Dietary (Pure Veg)
    if (query.isVeg === 'true') {
      results = results.filter(b => b.isVeg === true || (b.subcategory || '').toLowerCase().includes('veg'));
    }

    // Distance calculation where location data is available
    if (query.lat && query.lng) {
      const uLat = parseFloat(query.lat);
      const uLng = parseFloat(query.lng);
      if (!isNaN(uLat) && !isNaN(uLng)) {
        results = results.map(b => {
          if (b.lat && b.lng) {
            const distKm = calculateDistanceKm(uLat, uLng, b.lat, b.lng);
            return { ...b, distance: `${distKm} km`, distanceKm: distKm };
          }
          return b;
        });
      }
    }

    // Sorting
    const sortBy = query.sortBy || (parsedAI && parsedAI.sortBy) || 'rating';
    if (sortBy === 'rating') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviewsCount || 0) - (a.reviewsCount || 0));
    } else if (sortBy === 'reviews') {
      results.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    } else if (sortBy === 'distance') {
      results.sort((a, b) => parseFloat(a.distance || 999) - parseFloat(b.distance || 999));
    } else if (sortBy === 'price_low') {
      results.sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0));
    } else if (sortBy === 'price_high') {
      results.sort((a, b) => (b.startingPrice || 0) - (a.startingPrice || 0));
    } else if (sortBy === 'response') {
      results.sort((a, b) => parseInt(a.responseTime || '99') - parseInt(b.responseTime || '99'));
    }

    // Pagination
    const total = results.length;
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const hasPagination = !!query.page || !!query.limit;
    const limit = hasPagination ? Math.max(1, parseInt(query.limit, 10) || 6) : total;
    const totalPages = Math.max(1, Math.ceil(total / (limit || 1)));
    const paginated = hasPagination ? results.slice((page - 1) * limit, page * limit) : results;

    return sendJson(res, 200, {
      total,
      page,
      limit,
      totalPages,
      city: query.city || (parsedAI && parsedAI.city) || 'all',
      category: query.category || (parsedAI && parsedAI.category) || 'all',
      parsedAI: parsedAI && parsedAI.isAI ? parsedAI : null,
      businesses: paginated
    });
  }

  // 6. GET /api/businesses/:id
  if (pathname.startsWith('/api/businesses/') && method === 'GET') {
    const id = pathname.replace('/api/businesses/', '');
    const found = db.businesses.find(b => b.id === id);
    if (!found) {
      return sendJson(res, 404, { error: 'Business listing not found' });
    }
    return sendJson(res, 200, found);
  }

  // 7. POST /api/businesses (Registration Wizard)
  if (pathname === '/api/businesses' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (!body.name || !body.category || !body.city || !body.locality || !body.phone) {
      return sendJson(res, 400, { error: 'Missing mandatory registration fields (name, category, city, locality, phone)' });
    }

    // Duplicate listing check by phone and city
    const dup = db.businesses.find(b => b.phone === body.phone && b.city.toLowerCase() === body.city.toLowerCase());
    if (dup) {
      return sendJson(res, 409, { error: 'A business listing with this phone number already exists in ' + body.city });
    }

    const newId = 'b-' + Date.now();
    const newBusiness = {
      id: newId,
      name: body.name.trim(),
      category: body.category,
      subcategory: body.subcategory || body.services?.[0]?.name || 'General Services',
      city: body.city,
      locality: body.locality.trim(),
      rating: 5.0,
      reviewsCount: 1,
      verified: false, // Must be approved by admin
      superSeller: false,
      openNow: true,
      availableToday: true,
      operatingHours: body.operatingHours || '9:00 AM - 8:00 PM',
      startingPrice: parseFloat(body.startingPrice) || 399,
      priceRange: '₹₹',
      responseTime: '~15 min',
      trustScore: 85,
      trustVerification: {
        phoneVerified: true,
        businessRegistration: false,
        addressInspected: false,
        policeBackgroundChecked: false,
        verifiedCustomerReviews: 1
      },
      phone: body.phone,
      whatsapp: body.whatsapp || body.phone.replace(/\D/g, ''),
      address: body.address || `${body.locality}, ${body.city}`,
      image: body.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80',
      description: body.description || 'Verified local service provider on LocalCare Infinity.',
      services: body.services && body.services.length > 0 ? body.services : [
        { id: 's-1', name: body.primaryService || 'Standard Consultation / Service', price: parseFloat(body.startingPrice) || 399, duration: '45 mins' }
      ],
      reviews: [
        { author: 'Verified Customer', rating: 5, date: 'Today', verifiedBooking: true, comment: 'Punctual and highly professional service.' }
      ]
    };

    db.businesses.unshift(newBusiness);
    logAudit('REGISTER_BUSINESS', `Registered new business "${newBusiness.name}" in ${newBusiness.city}`);
    saveDatabase();
    return sendJson(res, 201, {
      message: 'Business listing registered successfully and submitted for admin KYC verification',
      business: newBusiness
    });
  }

  // 8. PATCH /api/businesses/:id/verify (Admin approval)
  if (pathname.includes('/verify') && method === 'PATCH') {
    const id = pathname.replace('/api/businesses/', '').replace('/verify', '');
    const b = db.businesses.find(item => item.id === id);
    if (!b) return sendJson(res, 404, { error: 'Business not found' });

    b.verified = true;
    b.trustScore = Math.min(99, b.trustScore + 10);
    b.trustVerification.businessRegistration = true;
    b.trustVerification.policeBackgroundChecked = true;
    logAudit('APPROVE_VERIFICATION', `Approved verification for "${b.name}"`);
    saveDatabase();
    return sendJson(res, 200, { message: `Business "${b.name}" verified successfully!`, business: b });
  }

  // 9. GET /api/bookings
  if (pathname === '/api/bookings' && method === 'GET') {
    return sendJson(res, 200, db.bookings);
  }

  // 10. POST /api/bookings (Create appointment with double-booking prevention)
  if (pathname === '/api/bookings' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (!body.businessId || !body.customerName || !body.customerPhone || !body.customerAddress) {
      return sendJson(res, 400, { error: 'Mandatory booking details missing' });
    }

    const business = db.businesses.find(b => b.id === body.businessId);
    if (!business) {
      return sendJson(res, 404, { error: 'Business listing not found' });
    }

    // Double-booking check: prevent duplicate active booking for same phone, business, and slot
    const slot = body.timeSlot || '2:00 PM - 3:00 PM';
    const date = body.date || 'Today';
    const conflict = db.bookings.find(bk => 
      bk.customerPhone === body.customerPhone &&
      bk.businessId === body.businessId &&
      bk.date === date &&
      bk.timeSlot === slot &&
      !['Cancelled', 'Rejected', 'Completed'].includes(bk.status)
    );

    if (conflict) {
      return sendJson(res, 409, {
        error: `Double-booking prevention: You already have an active booking (${conflict.id}) for this time slot.`
      });
    }

    const bookingId = 'LC-BK-' + Math.floor(1000 + Math.random() * 9000);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking = {
      id: bookingId,
      businessId: business.id,
      businessName: business.name,
      businessImage: business.image,
      serviceName: body.serviceName || (business.services?.[0]?.name) || 'Standard Service',
      price: parseFloat(body.price) || business.startingPrice || 399,
      date: date,
      timeSlot: slot,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      address: body.customerAddress,
      notes: body.notes || '',
      paymentMethod: body.paymentMethod || 'UPI',
      status: 'On The Way',
      otp: otp,
      createdAt: new Date().toISOString(),
      technician: {
        name: 'Suresh Gowda',
        phone: business.phone,
        rating: 4.9,
        vehicle: 'KA-01-EA-4921 (Hero Splendor)',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        etaMinutes: 14
      }
    };

    db.bookings.unshift(newBooking);
    logAudit('CREATE_BOOKING', `Booking ${bookingId} confirmed for ${business.name}`);
    saveDatabase();
    return sendJson(res, 201, {
      message: 'Booking confirmed successfully',
      booking: newBooking
    });
  }

  // 11. PATCH /api/bookings/:id (Cancel or Reschedule)
  if (pathname.startsWith('/api/bookings/') && method === 'PATCH') {
    const id = pathname.replace('/api/bookings/', '');
    const booking = db.bookings.find(b => b.id === id);
    if (!booking) return sendJson(res, 404, { error: 'Booking not found' });

    const body = await parseRequestBody(req);
    if (body.action === 'cancel') {
      booking.status = 'Cancelled';
      logAudit('CANCEL_BOOKING', `Booking ${id} was cancelled`);
    } else if (body.action === 'reschedule') {
      if (body.date) booking.date = body.date;
      if (body.timeSlot) booking.timeSlot = body.timeSlot;
      booking.status = 'Rescheduled';
      logAudit('RESCHEDULE_BOOKING', `Booking ${id} rescheduled to ${booking.date} (${booking.timeSlot})`);
    }
    saveDatabase();
    return sendJson(res, 200, { message: 'Booking updated', booking });
  }

  // 12. GET /api/quotes
  if (pathname === '/api/quotes' && method === 'GET') {
    return sendJson(res, 200, db.quotes);
  }

  // 12b. POST /api/quotes/arena (Live Reverse Bidding Arena)
  if (pathname === '/api/quotes/arena' && method === 'POST') {
    const body = await parseRequestBody(req);
    const category = body.category || 'home';
    const locality = body.locality || 'Koramangala, Bengaluru';
    const budget = Number(body.budget) || 500;

    const matching = db.businesses.filter(b => b.category === category && b.verified).slice(0, 5);
    const arenaBids = matching.map((b, idx) => ({
      id: `arena-bid-${idx + 1}`,
      businessId: b.id,
      proName: b.name,
      rating: b.rating,
      reviews: b.reviewsCount,
      avatar: b.image,
      eta: `Arrives in ${15 + idx * 5} min`,
      price: Math.max(199, Math.round(budget * (1 - (idx + 1) * 0.08))),
      badge: idx === 0 ? '⚡ Fastest Dispatch' : (idx === 1 ? '💰 Best Deal' : '🏆 Top Rated Master'),
      perk: b.offer || 'LocalCare ₹10,000 Quality Shield Guarantee'
    }));

    return sendJson(res, 200, {
      status: 'active',
      arenaId: 'LC-AR-' + Math.floor(10000 + Math.random() * 90000),
      service: body.service || 'Doorstep Service',
      locality,
      bidsCount: arenaBids.length,
      bids: arenaBids
    });
  }

  // 13. POST /api/quotes (Broadcast Requirement)
  if (pathname === '/api/quotes' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (!body.category || !body.locality || !body.phone || !body.description) {
      return sendJson(res, 400, { error: 'Category, locality, phone, and description are required' });
    }

    const quoteId = 'LC-QT-' + Math.floor(1000 + Math.random() * 9000);
    // Find up to 3 nearby providers matching category
    const matchingPros = db.businesses.filter(b => b.category === body.category).slice(0, 3);
    const sampleBids = matchingPros.map((pro, idx) => ({
      id: `bid-${quoteId}-${idx + 1}`,
      businessId: pro.id,
      proName: pro.name,
      rating: pro.rating,
      reviews: pro.reviewsCount,
      price: pro.startingPrice ? pro.startingPrice + (idx * 50) : 450 + (idx * 50),
      eta: idx === 0 ? 'Arrives in 20 min' : (idx === 1 ? 'Available in 45 min' : 'Slot available today 4:00 PM'),
      phone: pro.phone,
      warranty: '30-Day Workmanship Warranty'
    }));

    const newQuote = {
      id: quoteId,
      category: body.category,
      title: body.description.slice(0, 45) + '...',
      locality: body.locality,
      urgency: body.urgency || 'Today anytime',
      budget: body.budget || 'Flexible',
      customerPhone: body.phone,
      status: `${sampleBids.length} Bids Received`,
      createdAt: new Date().toISOString(),
      bids: sampleBids
    };

    db.quotes.unshift(newQuote);
    logAudit('BROADCAST_QUOTE', `Quote broadcast ${quoteId} in ${body.locality}`);
    saveDatabase();
    return sendJson(res, 201, {
      message: 'Requirement broadcasted to local verified professionals',
      quote: newQuote
    });
  }

  // 14. POST /api/quotes/:id/accept (Convert quote to booking)
  if (pathname.includes('/accept') && method === 'POST') {
    const quoteId = pathname.replace('/api/quotes/', '').replace('/accept', '');
    const quote = db.quotes.find(q => q.id === quoteId);
    if (!quote) return sendJson(res, 404, { error: 'Quote request not found' });

    const body = await parseRequestBody(req);
    const selectedBid = quote.bids.find(b => b.id === body.bidId) || quote.bids[0];
    if (!selectedBid) return sendJson(res, 400, { error: 'Bid not found' });

    quote.status = 'Accepted & Booked';
    const bookingId = 'LC-BK-' + Math.floor(1000 + Math.random() * 9000);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking = {
      id: bookingId,
      quoteId: quote.id,
      businessId: selectedBid.businessId || 'b-103',
      businessName: selectedBid.proName,
      serviceName: quote.title,
      price: selectedBid.price,
      date: 'Today',
      timeSlot: selectedBid.eta,
      customerName: body.customerName || 'Chethan B K',
      customerPhone: quote.customerPhone,
      address: quote.locality,
      status: 'On The Way',
      otp: otp,
      createdAt: new Date().toISOString(),
      technician: {
        name: selectedBid.proName,
        phone: selectedBid.phone,
        rating: selectedBid.rating,
        vehicle: 'Verified Service Fleet',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        etaMinutes: 18
      }
    };

    db.bookings.unshift(newBooking);
    logAudit('ACCEPT_QUOTE_BID', `Accepted bid from ${selectedBid.proName} for quote ${quote.id}`);
    saveDatabase();
    return sendJson(res, 201, {
      message: `Quote accepted! Booking ${bookingId} confirmed and technician dispatched.`,
      booking: newBooking
    });
  }

  // 15. POST /api/reviews (Submit verified review)
  if (pathname === '/api/reviews' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (!body.businessId || !body.rating || !body.comment) {
      return sendJson(res, 400, { error: 'businessId, rating, and comment are required' });
    }

    const business = db.businesses.find(b => b.id === body.businessId);
    if (!business) return sendJson(res, 404, { error: 'Business not found' });

    const newReview = {
      id: 'rev-' + Date.now(),
      author: body.author || 'Chethan B K',
      rating: Math.min(5, Math.max(1, parseInt(body.rating, 10))),
      date: 'Today',
      verifiedBooking: true,
      comment: body.comment.trim(),
      aspectTags: body.aspectTags || []
    };

    if (!business.reviews) business.reviews = [];
    business.reviews.unshift(newReview);
    business.reviewsCount = (business.reviewsCount || 0) + 1;

    // Recalculate average rating
    const sum = business.reviews.reduce((acc, r) => acc + (r.rating || 5), 0);
    business.rating = parseFloat((sum / business.reviews.length).toFixed(1));

    logAudit('POST_REVIEW', `New review for ${business.name}: ${newReview.rating}★`);
    saveDatabase();
    return sendJson(res, 201, {
      message: 'Review published successfully and business score updated',
      businessRating: business.rating,
      reviewsCount: business.reviewsCount,
      review: newReview
    });
  }

  // 16. GET /api/deals
  if (pathname === '/api/deals' && method === 'GET') {
    return sendJson(res, 200, db.deals);
  }

  // 17. POST /api/newsletter
  if (pathname === '/api/newsletter' && method === 'POST') {
    const body = await parseRequestBody(req);
    if (!body.email || !body.email.includes('@')) {
      return sendJson(res, 400, { error: 'Valid email address required' });
    }
    if (!db.subscribers.includes(body.email)) {
      db.subscribers.push(body.email);
      saveDatabase();
    }
    return sendJson(res, 200, { message: 'Subscribed to LocalCare Infinity deals and alerts!' });
  }

  // 18. GET /api/audit-logs (Admin)
  if (pathname === '/api/audit-logs' && method === 'GET') {
    return sendJson(res, 200, db.auditLogs);
  }

  // Route not found
  return sendJson(res, 404, { error: `Endpoint ${method} ${pathname} not found` });
}

// Static File Server
function handleStatic(req, res, pathname) {
  let relativePath = pathname === '/' ? 'index.html' : pathname;
  // Prevent directory traversal attacks
  const safePath = path.normalize(relativePath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found: ' + pathname);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

// Main HTTP Server
const server = http.createServer(async (req, res) => {
  const host = req.headers.host || `127.0.0.1:${PORT}`;
  const fullUrl = new URL(req.url, `http://${host}`);
  const pathname = fullUrl.pathname;
  const query = Object.fromEntries(fullUrl.searchParams.entries());

  // Route API vs Static
  if (pathname.startsWith('/api/')) {
    try {
      await handleApi(req, res, { pathname, query, searchParams: fullUrl.searchParams });
    } catch (err) {
      console.error('[API Error]', err);
      sendJson(res, 500, { error: 'Internal Server Error', message: err.message });
    }
  } else {
    handleStatic(req, res, pathname);
  }
});

// Boot Server
initDatabase();

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`================================================================`);
    console.log(`  LOCALCARE INFINITY - Server Online`);
    console.log(`  Every Local Need. One Intelligent Platform.`);
    console.log(`  Local URL:   http://localhost:${PORT} or http://127.0.0.1:${PORT}`);
    console.log(`  Network URL: http://172.28.23.134:${PORT}`);
    console.log(`  REST API Root: http://127.0.0.1:${PORT}/api/health`);
    console.log(`================================================================`);
  });
}

module.exports = { server, db, initDatabase };
