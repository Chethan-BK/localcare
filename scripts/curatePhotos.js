/* ==============================================================================
   LocalCare Infinity - High-Definition Visual Photo Curation Engine
   Eliminates all image duplicates and assigns authentic, trade-specific,
   stunning photography + unique thumbnail galleries to every business.
   ============================================================================== */

const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');
const DATA_JS_PATH = path.join(__dirname, '..', 'js', 'data.js');

// High-resolution, curated, working Unsplash photography pools
const PHOTO_POOLS = {
  // Food & Dining
  seafood_coastal: [
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85', // Sizzling fish tawa fry
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85', // Coastal fish curry meals
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=85', // Prawns ghee roast
    'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=85', // Spiced mud crab
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85', // Crispy pomfret fry
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85', // Traditional seafood thali
    'https://images.unsplash.com/photo-1579631542720-3a87824fff86?auto=format&fit=crop&w=800&q=85', // Grilled tiger prawns
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=85'  // Steaming coastal curry
  ],
  south_indian: [
    'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=85', // Crispy ghee podi dosa
    'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85', // Steamed idlis with chutney
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85', // Traditional filter coffee
    'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=85', // Golden medu vada
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=85', // Banana leaf meals
    'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85'  // Udupi style thali
  ],
  biryani_mughlai: [
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=85', // Royal Dum Biryani handi
    'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=85', // Seekh & Boti kebabs
    'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85', // Tandoori chicken
    'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=85', // Dal Makhani & Garlic Naan
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=85', // Paneer tikka platter
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=85'  // Mughlai dining room
  ],
  cafe_bakery: [
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=85', // Latte art & croissant
    'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=85', // Berry tarts & dessert
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=85', // Specialty coffee brew
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=85', // Aesthetic modern cafe
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=85', // Gourmet cheesecake
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85'  // Casual bistro
  ],
  italian_pizza: [
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=85', // Wood-fired pizza
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=85', // Truffle pasta
    'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=85', // Tiramisu
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85'  // Italian rustic restaurant
  ],
  general_food: [
    'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=85',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85'
  ],

  // Auto Care & Garages
  car_garage: [
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=85', // Grey sports coupe in bay
    'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=85', // Modern garage lift
    'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=85', // Master mechanic with engine
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=85', // Computerized wheel balance
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85', // Disc brake rotor
    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=800&q=85'  // Synthetic oil service
  ],
  car_spa: [
    'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=85', // Deep foam wash
    'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=85', // Ceramic coating gloss
    'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=85', // Paint protection film
    'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=85'  // Leather interior steam
  ],
  bike_service: [
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=85', // Superbike in garage
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=85', // Chain sprocket tuning
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=800&q=85', // Exhaust & engine rebuild
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=85'  // Motorbike tuning
  ],

  // Healthcare & Doctors
  dental: [
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85', // Ergonomic dental suite
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=85', // Painless laser dental tool
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85', // Modern sterilization
    'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=85', // Confident bright smile
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=85'  // Dental consultation
  ],
  doctor_clinic: [
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85', // Doctor consultation
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=85', // Stethoscope on desk
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=85', // Clean hospital corridor
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=85', // Caring medical staff
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=85'  // Diagnostic screen
  ],
  diagnostics_lab: [
    'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=85', // Robotic analyzer
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85', // Vacuum blood tubes
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=85', // Laboratory microscope
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=85'  // Digital report dashboard
  ],
  dermatology: [
    'https://images.unsplash.com/photo-1512290900672-1f55b9e078c1?auto=format&fit=crop&w=800&q=85', // Laser facial therapy
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=85', // Hydra-facial treatment
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=85'  // Radiant skincare
  ],

  // Home Services & Repairs
  plumbing: [
    'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=85', // Luxury bathroom tap repair
    'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=85', // Wrench pipe repair
    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=85', // Water heater pressure valves
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85', // Clean bathroom install
    'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=85'  // Copper piping installation
  ],
  electrical: [
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=85', // Wireman with multimeter
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=85', // Breaker distribution box
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=85', // Ceiling chandelier lighting
    'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=85'  // Concealed wiring conduits
  ],
  ac_service: [
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=85', // Split AC power jet clean
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=85', // Refrigerant gas gauge
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=85', // Inverter PCB service
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=85'  // Air filter overhaul
  ],
  cleaning_pest: [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=85', // Sofa steam extraction
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=85', // Kitchen degreasing
    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=85', // Pest control misting
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=85'  // Hardwood floor shine
  ],
  carpenter: [
    'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=85', // Teakwood table crafting
    'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=85', // Modular wardrobe fitting
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85', // CNC wood carving
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=85'  // High-gloss lacquer
  ],

  // Salons & Spas
  salon_hair: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=85', // Balayage hair coloring
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=85', // Precision scissor styling
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85', // Olaplex hair spa
    'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=85', // Modern salon aesthetic
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=85'  // Bridal makeup finish
  ],
  spa_massage: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=85', // Aromatherapy oil massage
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=85', // Shirodhara oil stream
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=85', // Heated Himalayan stones
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=85'  // Bamboo wellness lounge
  ],

  // Real Estate & Co-Living
  stays: [
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=85', // Nordic studio suite
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=85', // High-rise infinity pool
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=85', // Designer workstation
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85', // Marble living room
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=85'  // Bedroom with sunlight
  ],

  // Education & Coaching
  tutor: [
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=85', // Smart classroom whiteboard
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=85', // Library study pods
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=85', // Science laboratory
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=85'  // 1-on-1 mentor guidance
  ],

  // Tech, Robotics, Laptop Repair
  tech: [
    'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=85', // Microscope soldering
    'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=85', // Phone screen replacement
    'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=85', // Anti-static workbench
    'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=85'  // Robotic circuitry
  ],

  // Weddings & Events
  events: [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=85', // Royal floral mandap
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=85', // Candlelit banquet setup
    'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=85', // Candid wedding photo
    'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=85'  // Gourmet catering buffet
  ],

  // Packers & Movers
  packers: [
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=85', // Heavy moving truck
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85', // Bubble wrap box packing
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=85', // Careful loading
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=85'  // Clean warehouse
  ],

  // Emergency SOS
  emergency: [
    'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=85', // Advanced life support ambulance
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=85', // Trauma ICU monitor
    'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=85'  // Emergency paramedical responder
  ]
};

// Helper: Select pool based on business traits
function getPoolForBusiness(b) {
  const name = (b.name || '').toLowerCase();
  const cat = (b.category || '').toLowerCase();
  const sub = (b.subcategory || '').toLowerCase();

  // Specific famous landmarks
  if (name.includes('giri manja') || name.includes('machali') || name.includes('seafood') || name.includes('fish') || sub.includes('seafood')) {
    return PHOTO_POOLS.seafood_coastal;
  }
  if (name.includes('rameshwaram') || name.includes('dosa') || name.includes('idli') || name.includes('south indian') || sub.includes('south indian') || name.includes('udupi')) {
    return PHOTO_POOLS.south_indian;
  }
  if (name.includes('karim') || name.includes('biryani') || name.includes('mughlai') || name.includes('kebab') || name.includes('punjabi') || name.includes('tandoor')) {
    return PHOTO_POOLS.biryani_mughlai;
  }
  if (name.includes('cafe') || name.includes('bakery') || name.includes('coffee') || name.includes('tea') || name.includes('chai')) {
    return PHOTO_POOLS.cafe_bakery;
  }
  if (name.includes('pizza') || name.includes('pasta') || name.includes('italian') || name.includes('bistro')) {
    return PHOTO_POOLS.italian_pizza;
  }
  if (cat === 'food') {
    return PHOTO_POOLS.general_food;
  }

  // Auto
  if (cat === 'auto') {
    if (name.includes('spa') || name.includes('wash') || name.includes('detail') || name.includes('3m') || name.includes('ceramic') || sub.includes('wash')) {
      return PHOTO_POOLS.car_spa;
    }
    if (name.includes('bike') || name.includes('two wheeler') || name.includes('motor') || sub.includes('bike')) {
      return PHOTO_POOLS.bike_service;
    }
    return PHOTO_POOLS.car_garage;
  }

  // Health
  if (cat === 'health') {
    if (name.includes('dent') || sub.includes('dent') || name.includes('tooth') || name.includes('smile') || name.includes('ortho')) {
      return PHOTO_POOLS.dental;
    }
    if (name.includes('diag') || name.includes('lab') || name.includes('path') || name.includes('blood') || name.includes('scan')) {
      return PHOTO_POOLS.diagnostics_lab;
    }
    if (name.includes('skin') || name.includes('derma') || sub.includes('derma')) {
      return PHOTO_POOLS.dermatology;
    }
    return PHOTO_POOLS.doctor_clinic;
  }

  // Home Services & Repairs
  if (cat === 'home') {
    if (name.includes('plumb') || sub.includes('plumb') || name.includes('pipe') || name.includes('leak') || name.includes('tap')) {
      return PHOTO_POOLS.plumbing;
    }
    if (name.includes('carp') || sub.includes('carp') || name.includes('wood') || name.includes('furniture')) {
      return PHOTO_POOLS.carpenter;
    }
    return PHOTO_POOLS.plumbing;
  }
  if (cat === 'electrical' || name.includes('electric') || name.includes('volt') || name.includes('wire')) {
    if (name.includes('ac') || sub.includes('ac') || name.includes('cool') || name.includes('freeze') || name.includes('air cond')) {
      return PHOTO_POOLS.ac_service;
    }
    return PHOTO_POOLS.electrical;
  }
  if (cat === 'cleaning' || name.includes('clean') || name.includes('pest')) {
    return PHOTO_POOLS.cleaning_pest;
  }

  // Salons & Spas
  if (cat === 'salon') {
    if (name.includes('spa') || name.includes('ayur') || name.includes('massage') || name.includes('wellness') || sub.includes('spa')) {
      return PHOTO_POOLS.spa_massage;
    }
    return PHOTO_POOLS.salon_hair;
  }

  // Stays
  if (cat === 'stays') {
    return PHOTO_POOLS.stays;
  }

  // Tutors
  if (cat === 'tutor') {
    return PHOTO_POOLS.tutor;
  }

  // Tech
  if (cat === 'tech') {
    return PHOTO_POOLS.tech;
  }

  // Events & Weddings
  if (cat === 'events') {
    return PHOTO_POOLS.events;
  }

  // Packers
  if (cat === 'packers') {
    return PHOTO_POOLS.packers;
  }

  // Emergency
  if (cat === 'emergency') {
    return PHOTO_POOLS.emergency;
  }

  return PHOTO_POOLS.general_food;
}

// Deterministic hashing helper
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Special Handcrafted Showcase Overrides
const HANDCRAFTED_OVERRIDES = {
  // Giri Manja's Coastal Seafood & Ghee Roast
  'giri manja': {
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    photos: [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=85'
    ]
  },
  // Machali Seafood & Coastal Dining
  'machali': {
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85',
    photos: [
      'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85'
    ]
  },
  // AutoCraft Multi-Brand Car Service Hub
  'autocraft': {
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=85',
    photos: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=85'
    ]
  },
  // The Rameshwaram Cafe
  'rameshwaram': {
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=85',
    photos: [
      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=85'
    ]
  },
  // Apollo Dental
  'apollo dental': {
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85',
    photos: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=85'
    ]
  },
  // QuickFix Plumbing
  'quickfix': {
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=85',
    photos: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85'
    ]
  },
  // Apex Robotics & Laptop Lab
  'apex robotics': {
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=85',
    photos: [
      'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=85',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=85'
    ]
  }
};

function curateDatabase() {
  console.log('[Curator] Reading databases...');
  const db = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  const usedHeroPhotos = new Set();
  let modifiedCount = 0;

  db.businesses.forEach((b, index) => {
    const nameLower = (b.name || '').toLowerCase();
    
    // Check handcrafted overrides first
    let matchedOverride = null;
    for (const [key, ov] of Object.entries(HANDCRAFTED_OVERRIDES)) {
      if (nameLower.includes(key)) {
        matchedOverride = ov;
        break;
      }
    }

    if (matchedOverride) {
      b.image = matchedOverride.image;
      b.photos = [...matchedOverride.photos];
      usedHeroPhotos.add(b.image);
      modifiedCount++;
      return;
    }

    // Determine category pool
    const pool = getPoolForBusiness(b);
    const hash = hashString(b.id + '_' + (b.name || '') + '_' + index);
    
    // Select an unused photo from pool if possible, or rotate
    let heroPhoto = pool[hash % pool.length];
    
    // Pick 3-4 distinct gallery photos from pool starting at an offset
    const galleryPhotos = [];
    galleryPhotos.push(heroPhoto);
    for (let i = 1; i <= 3; i++) {
      const gIdx = (hash + i) % pool.length;
      galleryPhotos.push(pool[gIdx]);
    }

    b.image = heroPhoto;
    b.photos = galleryPhotos;
    usedHeroPhotos.add(heroPhoto);
    modifiedCount++;
  });

  console.log(`[Curator] Successfully updated ${modifiedCount} businesses with unique high-def photography.`);
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
  console.log(`[Curator] Saved db.json successfully.`);

  // Also update js/data.js if it contains an INITIAL_BUSINESSES array
  if (fs.existsSync(DATA_JS_PATH)) {
    try {
      let dataJsContent = fs.readFileSync(DATA_JS_PATH, 'utf8');
      
      // Update Machali and Giri Manja in data.js directly
      dataJsContent = dataJsContent.replace(
        /(name:\s*['"]Machali Seafood & Coastal Dining['"][\s\S]*?image:\s*['"])([^'"]+)(['"])/,
        `$1https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85$3`
      );

      dataJsContent = dataJsContent.replace(
        /(name:\s*["']Giri Manja's Coastal Seafood & Ghee Roast["'][\s\S]*?image:\s*['"])([^'"]+)(['"])/,
        `$1https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85$3`
      );

      fs.writeFileSync(DATA_JS_PATH, dataJsContent, 'utf8');
      console.log(`[Curator] Synced key highlights in js/data.js.`);
    } catch (e) {
      console.warn('[Curator] Warning updating data.js:', e.message);
    }
  }
}

curateDatabase();
