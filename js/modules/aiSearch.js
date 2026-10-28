/* ==========================================================================
   Local Care - AI Natural Language Search Engine & Semantic Query Parser
   Extracts intent, categories, subcategories, price ceilings, availability,
   ratings, locality, cities, dietary preferences, and proximity.
   ========================================================================== */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AISearchEngine = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // Comprehensive Category & Subcategory Keyword Mappings
  const CATEGORY_MAP = {
    health: {
      id: 'health',
      name: 'Doctors & Clinics',
      keywords: ['doctor', 'clinic', 'dentist', 'dental', 'teeth', 'tooth', 'orthodontics', 'derma', 'dermatologist', 'skin', 'pediatrician', 'physician', 'physio', 'physiotherapy', 'hospital', 'diagnostics', 'lab', 'cardiologist', 'scan', 'xray'],
      subcategories: {
        'Dentists': ['dentist', 'dental', 'teeth', 'tooth', 'root canal', 'braces', 'orthodontics', 'cavity'],
        'Dermatologists': ['derma', 'dermatologist', 'skin', 'acne', 'hairfall'],
        'General Physicians': ['physician', 'general doctor', 'fever', 'cold', 'clinic'],
        'Pediatricians': ['pediatrician', 'child specialist', 'baby doctor'],
        'Diagnostics & Labs': ['diagnostic', 'blood test', 'lab', 'scan', 'mri', 'xray']
      }
    },
    electrical: {
      id: 'electrical',
      name: 'AC & Electricians',
      keywords: ['ac', 'air conditioner', 'cooling', 'fridge', 'refrigerator', 'electrician', 'wiring', 'fan', 'inverter', 'voltage', 'short circuit', 'mcb', 'geyser', 'water heater', 'power', 'jet service', 'gas refill'],
      subcategories: {
        'AC Repair & Gas Refill': ['ac', 'air conditioner', 'ac repair', 'gas refill', 'jet service', 'cooling fix', 'split ac', 'inverter ac'],
        'Electricians': ['electrician', 'wiring', 'fan installation', 'switchboard', 'mcb', 'inverter service']
      }
    },
    home: {
      id: 'home',
      name: 'Plumbers & Repairs',
      keywords: ['plumber', 'plumbing', 'pipe', 'leak', 'leakage', 'drain', 'drainage', 'tap', 'faucet', 'seepage', 'tank', 'carpenter', 'furniture', 'water tank', 'borewell', 'water heater repair', 'basin', 'commode', 'flush'],
      subcategories: {
        'Plumbers': ['plumber', 'plumbing', 'pipe', 'leak', 'leakage', 'drain', 'tap', 'seepage', 'borewell', 'tank cleaning'],
        'Carpenters': ['carpenter', 'furniture', 'wood work', 'door lock', 'cupboard']
      }
    },
    food: {
      id: 'food',
      name: 'Restaurants & Dining',
      keywords: ['restaurant', 'dining', 'food', 'biryani', 'dinner', 'lunch', 'breakfast', 'cafe', 'veg', 'vegetarian', 'pure veg', 'non-veg', 'seafood', 'fish', 'meals', 'pub', 'dosa', 'thali', 'coffee', 'bakery', 'tiffin'],
      subcategories: {
        'Pure Veg': ['pure veg', 'vegetarian', 'veg thali', 'dosa', 'jain', 'south indian meals', 'tiffin'],
        'Biryani & North Indian': ['biryani', 'north indian', 'roti', 'curry'],
        'Casual Dining': ['seafood', 'continental', 'family restaurant', 'cafe']
      }
    },
    cleaning: {
      id: 'cleaning',
      name: 'Cleaning & Pest',
      keywords: ['cleaning', 'clean', 'deep clean', 'sanitize', 'pest', 'pest control', 'cockroach', 'termite', 'sofa clean', 'housekeeping', 'bathroom cleaning', 'kitchen deep clean'],
      subcategories: {
        'Deep Home Cleaning': ['deep clean', 'deep home cleaning', 'housekeeping'],
        'Pest Control': ['pest', 'pest control', 'termite', 'cockroach', 'bed bug']
      }
    },
    tech: {
      id: 'tech',
      name: 'Computer & Mobile',
      keywords: ['laptop', 'computer', 'pc', 'macbook', 'screen replacement', 'keyboard', 'motherboard', 'mobile repair', 'cctv', 'ssd', 'ram upgrade', 'virus removal', 'os installation', 'thermal paste', 'overheating'],
      subcategories: {
        'Laptop & Mobile Repair': ['laptop', 'macbook', 'laptop repair', 'computer repair', 'pc repair', 'mobile repair', 'screen replacement', 'motherboard']
      }
    },
    auto: {
      id: 'auto',
      name: 'Car & Bike Services',
      keywords: ['car', 'bike', 'garage', 'mechanic', 'towing', 'breakdown', 'tyre', 'puncture', 'wash', 'detailing', 'battery', 'roadside assistance', 'car wash', 'service station'],
      subcategories: {
        'Car Wash & Detailing': ['car wash', 'detailing', 'coating'],
        'Multi-brand Garages': ['garage', 'mechanic', 'car service', 'bike service'],
        '24/7 Roadside Towing': ['towing', 'breakdown', 'puncture', 'jumpstart', 'roadside']
      }
    },
    salon: {
      id: 'salon',
      name: 'Salons & Wellness',
      keywords: ['salon', 'haircut', 'spa', 'massage', 'facial', 'parlour', 'grooming', 'makeup', 'keratin', 'pedicure', 'manicure', 'waxing'],
      subcategories: {
        'Unisex Salons': ['haircut', 'salon', 'hair spa', 'keratin', 'beard grooming'],
        'Spa & Massages': ['spa', 'massage', 'deep tissue']
      }
    },
    tutor: {
      id: 'tutor',
      name: 'Education & Tutors',
      keywords: ['tutor', 'tuition', 'coaching', 'classes', 'teacher', 'neet', 'jee', 'maths', 'science', 'cbse', 'icse', 'coding'],
      subcategories: {
        'Home Tutors (CBSE/ICSE)': ['tutor', 'tuition', 'home tutor', 'maths tutor'],
        'IIT-JEE/NEET Coaching': ['jee', 'neet', 'coaching', 'iit']
      }
    },
    emergency: {
      id: 'emergency',
      name: 'Emergency Services',
      keywords: ['ambulance', 'emergency', '108', 'er', 'icu', 'trauma', 'accident', 'sos', 'casualty', 'blood bank'],
      subcategories: {
        '24/7 Ambulance (108)': ['ambulance', 'emergency', '108', 'icu ambulance']
      }
    },
    stays: {
      id: 'stays',
      name: 'PGs & Real Estate',
      keywords: ['pg', 'hostel', 'flat', 'rent', 'rental', '1bhk', '2bhk', '3bhk', 'apartment', 'broker', 'co-living', 'gated society'],
      subcategories: {
        'Co-living PGs': ['pg', 'hostel', 'co-living', 'paying guest'],
        'Flat Rentals': ['flat', 'apartment', '1bhk', '2bhk', 'rent']
      }
    },
    events: {
      id: 'events',
      name: 'Weddings & Events',
      keywords: ['wedding', 'banquet', 'event', 'photographer', 'caterer', 'party', 'decorator', 'florist', 'hall', 'catering'],
      subcategories: {
        'Event Planners': ['event planner', 'decorator'],
        'Wedding Photographers': ['photographer', 'wedding photo']
      }
    },
    shopping: {
      id: 'shopping',
      name: 'Shopping & Stores',
      keywords: ['shopping', 'store', 'shop', 'electronics', 'clothing', 'clothes', 'fashion', 'furniture', 'grocery', 'supermarket', 'mobile shop', 'gadget', 'apparel', 'retail'],
      subcategories: {
        'Electronics': ['electronics', 'croma', 'reliance digital', 'tv', 'gadget', 'laptop store'],
        'Clothing & Fashion': ['clothing', 'clothes', 'fashion', 'apparel', 'fabindia', 'textile'],
        'Furniture': ['furniture', 'sofa', 'table', 'chair', 'bed', 'wardrobe', 'urban ladder'],
        'Supermarkets': ['grocery', 'supermarket', 'provisions', 'daily store', 'dmart']
      }
    },
    pro: {
      id: 'pro',
      name: 'Professional Services',
      keywords: ['lawyer', 'advocate', 'legal', 'court', 'chartered accountant', 'ca', 'tax', 'accountant', 'consultant', 'audit', 'notary', 'gst filing', 'tax audit'],
      subcategories: {
        'Lawyers & Advocates': ['lawyer', 'advocate', 'legal', 'court', 'notary', 'litigation'],
        'Chartered Accountants (CA)': ['ca', 'chartered accountant', 'tax', 'gst filing', 'audit', 'tax return', 'itr']
      }
    },
    daily: {
      id: 'daily',
      name: 'Daily Needs',
      keywords: ['laundry', 'dry clean', 'dry cleaning', 'ironing', 'courier', 'parcel', 'bluedart', 'dhl', 'package', 'grocery delivery', 'key maker', 'locksmith', 'utility', 'repair shop'],
      subcategories: {
        'Laundry & Dry Cleaning': ['laundry', 'dry clean', 'wash and fold', 'ironing', 'steam press'],
        'Courier Services': ['courier', 'parcel', 'postal', 'dispatch', 'dhl', 'bluedart', 'speed post']
      }
    },
    travel: {
      id: 'travel',
      name: 'Travel & Hospitality',
      keywords: ['hotel', 'resort', 'stay', 'room', 'lodging', 'travel agency', 'tour', 'car rental', 'self-drive', 'cab', 'taxi', 'flight booking', 'vacation'],
      subcategories: {
        'Hotels & Resorts': ['hotel', 'resort', 'room booking', 'luxury stay', 'suite'],
        'Car Rentals': ['car rental', 'self-drive', 'zoomcar', 'rental car', 'cab booking']
      }
    }
  };

  // 10 Indian Hubs and their Localities
  const CITY_LOCALITY_MAP = {
    'bengaluru': {
      name: 'Bengaluru',
      aliases: ['bengaluru', 'bangalore', 'blr'],
      areas: ['koramangala', 'indiranagar', 'hsr layout', 'whitefield', 'jayanagar', 'marathahalli', 'electronic city', 'bellandur', 'btm layout', 'hebbal']
    },
    'mangaluru': {
      name: 'Mangaluru',
      aliases: ['mangaluru', 'mangalore', 'mlore'],
      areas: ['valachil', 'kadri', 'hampankatta', 'bejai', 'surathkal', 'falnir', 'kankanady', 'derlakatte', 'kavoor']
    },
    'mysuru': {
      name: 'Mysuru',
      aliases: ['mysuru', 'mysore'],
      areas: ['gokulam', 'jayalakshmipuram', 'vijayanagar', 'kuvempunagar', 'nazarbad', 'chamundipuram', 'saraswathipuram', 'vv mohalla']
    },
    'mumbai': {
      name: 'Mumbai',
      aliases: ['mumbai', 'bombay'],
      areas: ['bandra west', 'bandra', 'andheri east', 'andheri west', 'andheri', 'powai', 'juhu', 'colaba', 'thane west', 'thane', 'dadar']
    },
    'delhi': {
      name: 'Delhi NCR',
      aliases: ['delhi', 'delhi ncr', 'new delhi', 'gurgaon', 'gurugram', 'noida'],
      areas: ['connaught place', 'cp', 'hauz khas', 'saket', 'cyber hub', 'cyber hub gurgaon', 'noida sector 18', 'noida', 'dwarka']
    },
    'hyderabad': {
      name: 'Hyderabad',
      aliases: ['hyderabad', 'hyd'],
      areas: ['gachibowli', 'hitec city', 'banjara hills', 'jubilee hills', 'madhapur', 'kondapur', 'kukatpally']
    },
    'pune': {
      name: 'Pune',
      aliases: ['pune', 'poona'],
      areas: ['koregaon park', 'kothrud', 'viman nagar', 'baner', 'hinjewadi', 'wakad', 'aundh', 'magarpatta']
    },
    'chennai': {
      name: 'Chennai',
      aliases: ['chennai', 'madras'],
      areas: ['t nagar', 'adyar', 'anna nagar', 'velachery', 'nungambakkam', 'mylapore', 'omr']
    },
    'kochi': {
      name: 'Kochi',
      aliases: ['kochi', 'cochin'],
      areas: ['panampilly nagar', 'kakkanad', 'fort kochi', 'marine drive', 'edapally', 'aluva']
    },
    'ahmedabad': {
      name: 'Ahmedabad',
      aliases: ['ahmedabad', 'amdavad'],
      areas: ['satellite', 'bodakdev', 'sg highway', 'navrangpura', 'prahlad nagar', 'vastrapur']
    }
  };

  function parseQuery(rawQuery, currentCity = 'Bengaluru') {
    if (!rawQuery || typeof rawQuery !== 'string' || !rawQuery.trim()) {
      return {
        isAI: false,
        originalQuery: '',
        cleanKeywords: [],
        category: null,
        subcategory: null,
        maxBudget: null,
        locality: null,
        city: currentCity,
        availableToday: false,
        openNow: false,
        minRating: 0,
        isVeg: false,
        nearMe: false,
        intentAction: null,
        sortBy: null,
        confidence: 0,
        aiSummary: ''
      };
    }

    const original = rawQuery.trim();
    let q = original.toLowerCase();

    const parsed = {
      isAI: false,
      originalQuery: original,
      cleanKeywords: [],
      category: null,
      subcategory: null,
      maxBudget: null,
      locality: null,
      city: currentCity,
      autoSwitchCity: false,
      availableToday: false,
      openNow: false,
      minRating: 0,
      isVeg: false,
      nearMe: false,
      intentAction: null,
      sortBy: null,
      confidence: 0,
      aiSummary: ''
    };

    let confidencePoints = 0;
    const extractedTokens = new Set();

    // 1. Detect Explicit City Mentions
    for (const [key, cityInfo] of Object.entries(CITY_LOCALITY_MAP)) {
      for (const alias of cityInfo.aliases) {
        // Regex word boundary matching for city names (e.g. "in mysuru", "mysore", "bangalore")
        const cityRegex = new RegExp(`(?:\\bin\\s+|\\bat\\s+|\\bfor\\s+)?\\b${alias}\\b`, 'i');
        if (cityRegex.test(q)) {
          parsed.city = cityInfo.name;
          if (cityInfo.name.toLowerCase() !== currentCity.toLowerCase()) {
            parsed.autoSwitchCity = true;
          }
          parsed.isAI = true;
          confidencePoints += 25;
          extractedTokens.add(alias);
          break;
        }
      }
    }

    // 2. Detect Locality Mentions across all cities
    for (const [cityKey, cityInfo] of Object.entries(CITY_LOCALITY_MAP)) {
      for (const area of cityInfo.areas) {
        const areaRegex = new RegExp(`\\b${area}\\b`, 'i');
        if (areaRegex.test(q)) {
          // Capitalize locality nicely
          const formattedArea = area.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          parsed.locality = formattedArea;
          // If city wasn't explicitly mentioned, infer from locality's parent city
          if (!parsed.autoSwitchCity && parsed.city.toLowerCase() !== cityInfo.name.toLowerCase()) {
            parsed.city = cityInfo.name;
            parsed.autoSwitchCity = true;
          }
          parsed.isAI = true;
          confidencePoints += 30;
          extractedTokens.add(area);
          break;
        }
      }
      if (parsed.locality) break;
    }

    // 3. Detect Budget & Pricing ("under 500", "under ₹500", "below 1000", "< 2000", "budget 800", "upto ₹1000")
    const budgetMatch = q.match(/(?:under|below|less than|within|budget of|<|upto|max|starting from)\s*(?:rs\.?|inr|₹)?\s*(\d{2,6})/i);
    if (budgetMatch) {
      parsed.maxBudget = parseInt(budgetMatch[1], 10);
      parsed.isAI = true;
      confidencePoints += 25;
      extractedTokens.add(budgetMatch[0]);
    }

    // 4. Detect Timing & Availability
    if (/\b(?:today|this evening|tonight|available today)\b/i.test(q)) {
      parsed.availableToday = true;
      parsed.isAI = true;
      confidencePoints += 15;
      extractedTokens.add('today');
    }
    if (/\b(?:open now|now|immediately|urgent|emergency|24\/7|24x7|sos)\b/i.test(q)) {
      parsed.openNow = true;
      parsed.isAI = true;
      confidencePoints += 15;
      extractedTokens.add('now');
      if (/\b(?:emergency|108|urgent|sos)\b/i.test(q)) {
        parsed.category = 'emergency';
      }
    }

    // 5. Detect Quality / Ratings ("best", "top rated", "highly rated", "5 star", "highest rated")
    if (/\b(?:best|top rated|highest rated|top|highly rated|5 star|five star)\b/i.test(q)) {
      parsed.minRating = 4.5;
      parsed.sortBy = 'rating';
      parsed.isAI = true;
      confidencePoints += 20;
      extractedTokens.add('best');
      extractedTokens.add('highly rated');
      extractedTokens.add('top rated');
    }

    // 6. Detect Dietary Preferences (Pure Veg / Vegetarian)
    if (/\b(?:pure veg|vegetarian|veg only|veg)\b/i.test(q) && !q.includes('non-veg')) {
      parsed.isVeg = true;
      if (!parsed.category) parsed.category = 'food';
      parsed.isAI = true;
      confidencePoints += 20;
      extractedTokens.add('vegetarian');
      extractedTokens.add('pure veg');
      extractedTokens.add('veg');
    }

    // 7. Detect Proximity / "near me"
    if (/\b(?:near me|nearby|closest|around me|nearest)\b/i.test(q)) {
      parsed.nearMe = true;
      parsed.sortBy = 'distance';
      parsed.isAI = true;
      confidencePoints += 20;
      extractedTokens.add('near me');
      extractedTokens.add('nearby');
    }

    // 8. Detect Intent Actions ("compare", "vs", "versus")
    if (/\b(?:compare|comparison|versus|vs)\b/i.test(q)) {
      parsed.intentAction = 'compare';
      parsed.isAI = true;
      confidencePoints += 20;
      extractedTokens.add('compare');
    }

    // 9. Match Category & Subcategory via comprehensive lexicon
    let highestCatScore = 0;
    let bestCat = null;
    let bestSubcat = null;

    for (const [catId, catObj] of Object.entries(CATEGORY_MAP)) {
      let catScore = 0;

      // Check main category keywords (supporting plurals like plumbers, dentists, doctors)
      for (const kw of catObj.keywords) {
        const kwRegex = new RegExp(`\\b${kw}(?:s|es)?\\b`, 'i');
        if (kwRegex.test(q)) {
          // Weight specific terms more heavily
          if (['dentist', 'ac repair', 'plumber', 'laptop', 'macbook', 'ambulance', 'biryani', 'salon'].includes(kw)) {
            catScore += 8;
          } else {
            catScore += 4;
          }
        }
      }

      // Check subcategories
      if (catObj.subcategories) {
        for (const [subName, subKeywords] of Object.entries(catObj.subcategories)) {
          for (const subKw of subKeywords) {
            const subRegex = new RegExp(`\\b${subKw}(?:s|es)?\\b`, 'i');
            if (subRegex.test(q)) {
              catScore += 6;
              bestSubcat = subName;
              break;
            }
          }
        }
      }

      if (catScore > highestCatScore) {
        highestCatScore = catScore;
        bestCat = catId;
      }
    }

    if (bestCat) {
      parsed.category = bestCat;
      parsed.subcategory = bestSubcat;
      parsed.isAI = true;
      confidencePoints += Math.min(35, highestCatScore * 5);
    }

    // 10. Extract Clean Keywords (strip extracted noise terms for semantic matching)
    let cleanStr = q;
    // Remove extracted budget strings
    if (budgetMatch) {
      cleanStr = cleanStr.replace(budgetMatch[0], ' ');
    }
    // Remove common stop words and intent fillers
    const noiseWords = [
      'near me', 'nearby', 'closest', 'under', 'below', 'less than', 'within', 'budget', 'upto',
      'in', 'at', 'for', 'of', 'and', 'the', 'a', 'an', 'to', 'with', 'today', 'now', 'tonight',
      'best', 'top', 'rated', 'highly', 'highly rated', 'top rated', 'compare', 'comparison', 'versus', 'vs',
      'find', 'search', 'show me', 'please', 'service', 'services', 'repair', 'repairs', 'center', 'centre'
    ];

    // Remove noise words
    for (const nw of noiseWords) {
      const nwRegex = new RegExp(`\\b${nw}\\b`, 'gi');
      cleanStr = cleanStr.replace(nwRegex, ' ');
    }

    // Remove city and locality names if extracted
    if (parsed.locality) {
      cleanStr = cleanStr.replace(new RegExp(`\\b${parsed.locality}\\b`, 'gi'), ' ');
    }
    for (const [k, c] of Object.entries(CITY_LOCALITY_MAP)) {
      for (const a of c.aliases) {
        cleanStr = cleanStr.replace(new RegExp(`\\b${a}\\b`, 'gi'), ' ');
      }
    }

    // Tokenize remaining terms
    parsed.cleanKeywords = cleanStr
      .split(/[\s,]+/g)
      .map(t => t.trim())
      .filter(t => t.length > 1 && !/^\d+$/.test(t));

    // Calculate final confidence
    parsed.confidence = Math.min(99, Math.max(parsed.isAI ? 70 : 0, confidencePoints));

    // 11. Compose Human-Friendly CareAI Explanation Banner
    if (parsed.isAI) {
      const tags = [];
      if (parsed.category) {
        const catTitle = CATEGORY_MAP[parsed.category] ? CATEGORY_MAP[parsed.category].name : parsed.category;
        tags.push(`Category: <strong>${catTitle}</strong>`);
      }
      if (parsed.locality) {
        tags.push(`Locality: <strong>${parsed.locality}</strong>`);
      }
      if (parsed.city) {
        tags.push(`City: <strong>${parsed.city}</strong>`);
      }
      if (parsed.maxBudget) {
        tags.push(`Max Budget: <strong>₹${parsed.maxBudget.toLocaleString('en-IN')}</strong>`);
      }
      if (parsed.availableToday) {
        tags.push(`Availability: <strong>⚡ Today</strong>`);
      }
      if (parsed.openNow) {
        tags.push(`Status: <strong>🟢 Open Now</strong>`);
      }
      if (parsed.minRating > 0) {
        tags.push(`Rating: <strong>★ ${parsed.minRating}+</strong>`);
      }
      if (parsed.isVeg) {
        tags.push(`Preference: <strong>Pure Veg 🟢</strong>`);
      }
      if (parsed.nearMe) {
        tags.push(`Proximity: <strong>📍 Closest First</strong>`);
      }
      if (parsed.intentAction === 'compare') {
        tags.push(`Action: <strong>⚖️ Pro Comparison Mode</strong>`);
      }

      parsed.aiSummary = `✨ <strong>CareAI Search:</strong> Understood requirements — ${tags.join(' • ')}`;
    }

    return parsed;
  }

  /**
   * Evaluates if a business record matches parsed search criteria
   */
  function matchesBusiness(business, parsed, userCity = 'Bengaluru') {
    if (!business) return false;

    // 1. City Filter
    const targetCity = parsed.city || userCity;
    if (targetCity && targetCity.toLowerCase() !== 'all' && business.city && business.city.toLowerCase() !== targetCity.toLowerCase()) {
      return false;
    }

    // 2. Locality Filter (if extracted)
    if (parsed.locality) {
      const bLoc = (business.locality || '').toLowerCase();
      const pLoc = parsed.locality.toLowerCase();
      if (!bLoc.includes(pLoc) && !pLoc.includes(bLoc)) {
        return false;
      }
    }

    // 3. Category Filter
    if (parsed.category && parsed.category !== 'all') {
      if (business.category !== parsed.category) {
        return false;
      }
    }

    // 4. Subcategory Filter (soft match)
    if (parsed.subcategory) {
      const bSub = (business.subcategory || '').toLowerCase();
      const pSub = parsed.subcategory.toLowerCase();
      const bDesc = (business.description || '').toLowerCase();
      const hasSubInServices = (business.services || []).some(s => s.name.toLowerCase().includes(pSub));
      if (!bSub.includes(pSub) && !hasSubInServices && !bDesc.includes(pSub)) {
        // Soft match: if category matches firmly, don't strictly drop unless keywords contradict
      }
    }

    // 5. Budget Filter (Under ₹X)
    if (parsed.maxBudget) {
      const startingPrice = business.startingPrice || 0;
      const minServicePrice = (business.services && business.services.length > 0)
        ? Math.min(...business.services.map(s => s.price || 99999))
        : startingPrice;

      // Business matches if startingPrice is within budget OR at least one service is within budget
      if (startingPrice > parsed.maxBudget && minServicePrice > parsed.maxBudget) {
        return false;
      }
    }

    // 6. Availability & Urgency
    if (parsed.availableToday && !business.availableToday) {
      return false;
    }
    if (parsed.openNow && !business.openNow) {
      return false;
    }

    // 7. Rating Criteria
    if (parsed.minRating > 0) {
      if ((business.rating || 0) < parsed.minRating) {
        return false;
      }
    }

    // 8. Dietary (Pure Veg)
    if (parsed.isVeg) {
      const isVegFlag = !!business.isVeg;
      const subcatVeg = (business.subcategory || '').toLowerCase().includes('veg');
      const descVeg = (business.description || '').toLowerCase().includes('veg') || (business.description || '').toLowerCase().includes('vegetarian');
      const serviceVeg = (business.services || []).some(s => s.name.toLowerCase().includes('veg'));
      if (!isVegFlag && !subcatVeg && !descVeg && !serviceVeg) {
        return false;
      }
    }

    // 9. Clean Semantic Keywords Match
    if (parsed.cleanKeywords && parsed.cleanKeywords.length > 0) {
      const textToSearch = [
        business.name || '',
        business.category || '',
        business.subcategory || '',
        business.locality || '',
        business.description || '',
        (business.features || []).join(' '),
        (business.services || []).map(s => s.name).join(' ')
      ].join(' ').toLowerCase();

      // Check if at least one clean keyword matches
      const anyMatch = parsed.cleanKeywords.some(kw => textToSearch.includes(kw.toLowerCase()));
      if (!anyMatch) {
        return false;
      }
    }

    return true;
  }

  /**
   * Calculates a relevance score for ranking
   */
  function scoreRelevance(business, parsed) {
    let score = 0;
    if (!business) return 0;

    const bName = (business.name || '').toLowerCase();
    const bDesc = (business.description || '').toLowerCase();
    const qLower = (parsed.originalQuery || '').toLowerCase();

    // Exact name match
    if (bName.includes(qLower)) score += 60;

    // Locality match
    if (parsed.locality && (business.locality || '').toLowerCase().includes(parsed.locality.toLowerCase())) {
      score += 40;
    }

    // Category match
    if (parsed.category && business.category === parsed.category) {
      score += 30;
    }

    // Quality metrics
    score += (business.rating || 0) * 8;
    score += Math.min(20, Math.log10(business.reviewsCount || 1) * 6);
    score += (business.trustScore || 80) * 0.15;

    // Budget match bonus
    if (parsed.maxBudget && business.startingPrice && business.startingPrice <= parsed.maxBudget) {
      score += 15;
    }

    // Verified bonus
    if (business.verified) score += 10;
    if (business.superSeller) score += 10;

    return score;
  }

  return {
    parseQuery,
    matchesBusiness,
    scoreRelevance,
    CATEGORY_MAP,
    CITY_LOCALITY_MAP
  };
});
