const fs = require('fs');

const NEW_CATEGORIES = [
  {
    id: 'shopping',
    title: 'Shopping & Stores',
    icon: '🛍️',
    badgeClass: 'cat-shopping',
    count: '3,800+ stores',
    subcategories: ['Electronics', 'Clothing & Fashion', 'Furniture', 'Grocery Stores', 'Supermarkets', 'Mobile Shops']
  },
  {
    id: 'pro',
    title: 'Professional Services',
    icon: '⚖️',
    badgeClass: 'cat-pro',
    count: '1,650+ experts',
    subcategories: ['Lawyers & Advocates', 'Chartered Accountants (CA)', 'Consultants', 'Photographers', 'Event Planners']
  },
  {
    id: 'daily',
    title: 'Daily Needs',
    icon: '🧺',
    badgeClass: 'cat-daily',
    count: '2,400+ services',
    subcategories: ['Laundry & Dry Cleaning', 'Courier Services', 'Grocery Delivery', 'Repair Shops', 'Local Utility Services']
  },
  {
    id: 'travel',
    title: 'Travel & Hospitality',
    icon: '✈️',
    badgeClass: 'cat-travel',
    count: '1,920+ listings',
    subcategories: ['Hotels & Resorts', 'Travel Agencies', 'Tour Operators', 'Car Rentals', 'Bus & Flight Bookings']
  }
];

const NEW_BUSINESSES = [
  // Bengaluru
  {
    id: 'b-shop-101',
    name: 'Croma Megastore Electronics',
    category: 'shopping',
    subcategory: 'Electronics',
    city: 'Bengaluru',
    locality: 'Koramangala 5th Block',
    rating: 4.8,
    reviewsCount: 310,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: '10:00 AM - 9:30 PM',
    startingPrice: 499,
    priceRange: '₹₹₹',
    responseTime: '~10 min',
    trustScore: 97,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 310
    },
    phone: '+91 80 4123 4567',
    whatsapp: '918041234567',
    address: '80 Feet Road, Koramangala 5th Block, Bengaluru',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=700&q=80',
    description: 'Premier electronic retail superstore featuring laptops, home appliances, smartphones, smart TVs, and certified gadget repair with official brand warranties.',
    services: [
      { id: 's-sh-1', name: 'Electronics Inspection & Gadget Diagnostics', price: 499, duration: '30 mins' },
      { id: 's-sh-2', name: 'Home Appliance Delivery & Setup', price: 899, duration: '60 mins' },
      { id: 's-sh-3', name: 'Extended Warranty & Shield Coverage', price: 1299, duration: 'Instant' }
    ],
    features: ['Official Brand Warranty', 'GST Invoicing', 'Zero-Cost EMI', 'Same Day Delivery'],
    reviews: [
      { author: 'Vikram Mehta', rating: 5, date: '2 days ago', verifiedBooking: true, comment: 'Purchased an OLED TV with doorstep setup within 3 hours. Outstanding service.' }
    ],
    lat: 12.9352,
    lng: 77.6245
  },
  {
    id: 'b-pro-101',
    name: 'Apex Legal Chambers & Advocates',
    category: 'pro',
    subcategory: 'Lawyers & Advocates',
    city: 'Bengaluru',
    locality: 'Koramangala 4th Block',
    rating: 4.9,
    reviewsCount: 142,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: '9:30 AM - 7:30 PM',
    startingPrice: 999,
    priceRange: '₹₹₹',
    responseTime: '~15 min',
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 142
    },
    phone: '+91 80 2552 9876',
    whatsapp: '918025529876',
    address: 'Near Sony World Junction, Koramangala 4th Block, Bengaluru',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=700&q=80',
    description: 'Senior High Court advocates and corporate legal consultants specializing in property title verification, agreement drafting, startup advisory, and civil litigation.',
    services: [
      { id: 's-pro-1', name: 'Legal Consultation (In-person / Video)', price: 999, duration: '45 mins' },
      { id: 's-pro-2', name: 'Property Document Legal Verification', price: 2999, duration: '24 hours' },
      { id: 's-pro-3', name: 'Commercial Agreement & NDA Drafting', price: 3499, duration: '48 hours' }
    ],
    features: ['Bar Council Verified', 'Strict Confidentiality', 'Transparent Legal Fee', 'High Court Advocates'],
    reviews: [
      { author: 'Meera Nambiar', rating: 5, date: '1 week ago', verifiedBooking: true, comment: 'Helped verify property documents before purchase. Prevented a major litigation dispute.' }
    ],
    lat: 12.9340,
    lng: 77.6290
  },
  {
    id: 'b-daily-101',
    name: 'Spin & Sparkle Express Laundry',
    category: 'daily',
    subcategory: 'Laundry & Dry Cleaning',
    city: 'Bengaluru',
    locality: 'HSR Layout Sector 2',
    rating: 4.9,
    reviewsCount: 228,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: '8:00 AM - 9:00 PM',
    startingPrice: 199,
    priceRange: '₹',
    responseTime: '~12 min',
    trustScore: 96,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 228
    },
    phone: '+91 80 4912 3456',
    whatsapp: '918049123456',
    address: '17th Cross, HSR Layout Sector 2, Bengaluru',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=700&q=80',
    description: 'Eco-friendly doorstep laundry, Italian dry cleaning, organic stain removal, and steam pressing with free pickup and drop within 24 hours.',
    services: [
      { id: 's-dl-1', name: 'Wash & Steam Iron (per kg)', price: 199, duration: '24 hours' },
      { id: 's-dl-2', name: 'Blazer & Suit Dry Cleaning', price: 349, duration: '24 hours' },
      { id: 's-dl-3', name: 'Blanket & Quilt Sanitized Wash', price: 449, duration: '48 hours' }
    ],
    features: ['Free Doorstep Pickup', '24-Hour Turnaround', 'Antiseptic Wash', 'Steam Press'],
    reviews: [
      { author: 'Karan Joshi', rating: 5, date: '3 days ago', verifiedBooking: true, comment: 'Punctual pickup and returned suits spotless and crisp in protective garment bags.' }
    ],
    lat: 12.9112,
    lng: 77.6480
  },
  {
    id: 'b-travel-101',
    name: 'The Grand Orchid Luxury Hotel',
    category: 'travel',
    subcategory: 'Hotels & Resorts',
    city: 'Bengaluru',
    locality: 'Indiranagar 100ft Road',
    rating: 4.9,
    reviewsCount: 450,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: '24 Hours Open',
    startingPrice: 2499,
    priceRange: '₹₹₹₹',
    responseTime: '~5 min',
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 450
    },
    phone: '+91 80 4999 8888',
    whatsapp: '918049998888',
    address: '100 Feet Road, Indiranagar, Bengaluru',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80',
    description: 'Award-winning boutique hotel featuring luxury suites, high-speed Wi-Fi, rooftop swimming pool, fine-dining restaurants, and airport express transfers.',
    services: [
      { id: 's-tr-1', name: 'Deluxe Suite Booking (Night)', price: 2499, duration: 'Per Night' },
      { id: 's-tr-2', name: 'Executive Suite with Buffet Breakfast', price: 3499, duration: 'Per Night' },
      { id: 's-tr-3', name: 'Airport Express Chauffeur Transfer', price: 1299, duration: '60 mins' }
    ],
    features: ['24/7 Concierge', 'Complimentary Breakfast', 'Swimming Pool & Spa', 'Airport Cab Transfer'],
    reviews: [
      { author: 'Deepa Hegde', rating: 5, date: 'Yesterday', verifiedBooking: true, comment: 'Exceptional hospitality, quiet rooms right in the heart of Indiranagar.' }
    ],
    lat: 12.9784,
    lng: 77.6408
  },

  // Mumbai
  {
    id: 'b-shop-201',
    name: 'Reliance Digital Megastore',
    category: 'shopping',
    subcategory: 'Electronics',
    city: 'Mumbai',
    locality: 'Bandra West',
    rating: 4.8,
    reviewsCount: 295,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: '10:00 AM - 10:00 PM',
    startingPrice: 499,
    priceRange: '₹₹₹',
    responseTime: '~10 min',
    trustScore: 97,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 295
    },
    phone: '+91 22 2640 1234',
    whatsapp: '912226401234',
    address: 'Hill Road, Bandra West, Mumbai',
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=700&q=80',
    description: 'Consumer electronics, Apple products, gaming consoles, home audio systems, and gadget support with genuine manufacturer warranty.',
    services: [
      { id: 's-sh-201', name: 'Device Health Check & Screen Guard Installation', price: 499, duration: '30 mins' },
      { id: 's-sh-202', name: 'Home Audio & Home Theatre Calibration', price: 1199, duration: '60 mins' }
    ],
    features: ['Official Warranty', 'Bandra Express Delivery', 'GST Invoicing', 'Expert Demo'],
    reviews: [
      { author: 'Farhan Merchant', rating: 5, date: '4 days ago', verifiedBooking: true, comment: 'Great range of high-end audio and quick express billing.' }
    ],
    lat: 19.0596,
    lng: 72.8295
  },
  {
    id: 'b-pro-201',
    name: 'Bombay Legal Associates & Solicitors',
    category: 'pro',
    subcategory: 'Lawyers & Advocates',
    city: 'Mumbai',
    locality: 'Colaba',
    rating: 4.9,
    reviewsCount: 160,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: '9:00 AM - 7:00 PM',
    startingPrice: 1500,
    priceRange: '₹₹₹₹',
    responseTime: '~15 min',
    trustScore: 98,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 160
    },
    phone: '+91 22 2285 4567',
    whatsapp: '912222854567',
    address: 'Fort & Colaba Chambers, Mumbai',
    image: 'https://images.unsplash.com/photo-1453733197781-704fa5988299?auto=format&fit=crop&w=700&q=80',
    description: 'Prominent High Court solicitors specializing in corporate advisory, maritime law, property due diligence, and estate planning.',
    services: [
      { id: 's-pro-201', name: 'Senior Solicitor Legal Advisory', price: 1500, duration: '60 mins' },
      { id: 's-pro-202', name: 'Property Search & Title Certification', price: 4500, duration: '48 hours' }
    ],
    features: ['Bombay High Court Enrolled', '30+ Years Legacy', 'Corporate & Civil Advisory'],
    reviews: [
      { author: 'Aditya Godrej', rating: 5, date: '1 week ago', verifiedBooking: true, comment: 'Handled our commercial lease contract with precision and clarity.' }
    ],
    lat: 18.9220,
    lng: 72.8347
  },
  {
    id: 'b-daily-201',
    name: 'Mumbai Express Courier & Dabbawala Logistics',
    category: 'daily',
    subcategory: 'Courier Services',
    city: 'Mumbai',
    locality: 'Andheri East',
    rating: 4.9,
    reviewsCount: 380,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: '7:30 AM - 9:30 PM',
    startingPrice: 149,
    priceRange: '₹',
    responseTime: '~8 min',
    trustScore: 99,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 380
    },
    phone: '+91 22 2836 7890',
    whatsapp: '912228367890',
    address: 'JB Nagar, Andheri East, Mumbai',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80',
    description: 'Same-day intra-city parcel delivery, verified document courier, and cold-chain parcel logistics across Mumbai, Thane and Navi Mumbai.',
    services: [
      { id: 's-dl-201', name: 'Intra-City Express Parcel (Under 2kg)', price: 149, duration: '3 hours' },
      { id: 's-dl-202', name: 'Urgent Document & Passport Courier', price: 249, duration: '2 hours' }
    ],
    features: ['Real-time GPS Tracking', 'Direct Signature Proof', 'Same Day Delivery'],
    reviews: [
      { author: 'Pooja Bhatt', rating: 5, date: '2 days ago', verifiedBooking: true, comment: 'Delivered urgent legal documents from Andheri to Nariman Point in under 2 hours!' }
    ],
    lat: 19.1136,
    lng: 72.8697
  },
  {
    id: 'b-travel-201',
    name: 'ZoomWheels Self-Drive Luxury Rentals',
    category: 'travel',
    subcategory: 'Car Rentals',
    city: 'Mumbai',
    locality: 'Powai',
    rating: 4.8,
    reviewsCount: 210,
    verified: true,
    superSeller: true,
    openNow: true,
    availableToday: true,
    operatingHours: '24 Hours Open',
    startingPrice: 1299,
    priceRange: '₹₹₹',
    responseTime: '~10 min',
    trustScore: 97,
    trustVerification: {
      phoneVerified: true,
      businessRegistration: true,
      addressInspected: true,
      policeBackgroundChecked: true,
      verifiedCustomerReviews: 210
    },
    phone: '+91 22 4111 2233',
    whatsapp: '912241112233',
    address: 'Hiranandani Gardens, Powai, Mumbai',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80',
    description: 'Self-drive car rentals with zero security deposit, unlimited kilometers, sanitized fleet of SUVs and luxury sedans with roadside assistance.',
    services: [
      { id: 's-tr-201', name: 'Compact SUV (Creta/Brezza) Daily Rental', price: 1299, duration: '24 hours' },
      { id: 's-tr-202', name: 'Luxury Sedan (Camry/Octavia) Daily Rental', price: 2999, duration: '24 hours' }
    ],
    features: ['Zero Deposit Option', 'Doorstep Car Delivery', 'Comprehensive Insurance', '24/7 Roadside Assistance'],
    reviews: [
      { author: 'Nikhil Rathi', rating: 5, date: '5 days ago', verifiedBooking: true, comment: 'Rented an SUV for a Lonavala weekend trip. Clean car delivered on time.' }
    ],
    lat: 19.1197,
    lng: 72.9051
  }
];

// Update data/db.json
const dbPath = 'data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. Add categories
for (const cat of NEW_CATEGORIES) {
  if (!db.categories.some(c => c.id === cat.id)) {
    db.categories.push(cat);
    console.log(`Added category: ${cat.title} (${cat.id})`);
  }
}

// 2. Add businesses
for (const biz of NEW_BUSINESSES) {
  if (!db.businesses.some(b => b.id === biz.id)) {
    db.businesses.push(biz);
    console.log(`Added business: ${biz.name} in ${biz.city}`);
  }
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`Successfully updated ${dbPath}. Total businesses: ${db.businesses.length}, Categories: ${db.categories.length}`);
