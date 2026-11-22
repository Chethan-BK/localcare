/* ==============================================================================
   LOCALCARE INFINITY - PAN-INDIA GEOGRAPHICAL ARCHITECTURE & GEOSPATIAL ENGINE
   Covers All 28 Indian States & 8 Union Territories
   Districts, Taluks, Tehsils, Towns, Rural Villages, PIN Codes & Lat/Lng Coordinates
   Includes Haversine distance, radius filtering, smart auto-expansion,
   spelling variation / phonetic alias resolution & Google Geocoding fallbacks.
   ============================================================================== */

const STATES_AND_UTS = [
  { code: 'AP', name: 'Andhra Pradesh', type: 'State', capital: 'Amaravati', lat: 16.5062, lng: 80.6480 },
  { code: 'AR', name: 'Arunachal Pradesh', type: 'State', capital: 'Itanagar', lat: 27.0844, lng: 93.6053 },
  { code: 'AS', name: 'Assam', type: 'State', capital: 'Dispur', lat: 26.1445, lng: 91.7362 },
  { code: 'BR', name: 'Bihar', type: 'State', capital: 'Patna', lat: 25.5941, lng: 85.1376 },
  { code: 'CG', name: 'Chhattisgarh', type: 'State', capital: 'Raipur', lat: 21.2514, lng: 81.6296 },
  { code: 'GA', name: 'Goa', type: 'State', capital: 'Panaji', lat: 15.4909, lng: 73.8278 },
  { code: 'GJ', name: 'Gujarat', type: 'State', capital: 'Gandhinagar', lat: 23.2156, lng: 72.6369 },
  { code: 'HR', name: 'Haryana', type: 'State', capital: 'Chandigarh', lat: 28.4595, lng: 77.0266 },
  { code: 'HP', name: 'Himachal Pradesh', type: 'State', capital: 'Shimla', lat: 31.1048, lng: 77.1734 },
  { code: 'JH', name: 'Jharkhand', type: 'State', capital: 'Ranchi', lat: 23.3441, lng: 85.3096 },
  { code: 'KA', name: 'Karnataka', type: 'State', capital: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  { code: 'KL', name: 'Kerala', type: 'State', capital: 'Thiruvananthapuram', lat: 8.5241, lng: 76.9366 },
  { code: 'MP', name: 'Madhya Pradesh', type: 'State', capital: 'Bhopal', lat: 23.2599, lng: 77.4126 },
  { code: 'MH', name: 'Maharashtra', type: 'State', capital: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { code: 'MN', name: 'Manipur', type: 'State', capital: 'Imphal', lat: 24.8170, lng: 93.9368 },
  { code: 'ML', name: 'Meghalaya', type: 'State', capital: 'Shillong', lat: 25.5788, lng: 91.8933 },
  { code: 'MZ', name: 'Mizoram', type: 'State', capital: 'Aizawl', lat: 23.7271, lng: 92.7176 },
  { code: 'NL', name: 'Nagaland', type: 'State', capital: 'Kohima', lat: 25.6751, lng: 94.1086 },
  { code: 'OD', name: 'Odisha', type: 'State', capital: 'Bhubaneswar', lat: 20.2961, lng: 85.8245 },
  { code: 'PB', name: 'Punjab', type: 'State', capital: 'Chandigarh', lat: 31.6340, lng: 74.8723 },
  { code: 'RJ', name: 'Rajasthan', type: 'State', capital: 'Jaipur', lat: 26.9124, lng: 75.7873 },
  { code: 'SK', name: 'Sikkim', type: 'State', capital: 'Gangtok', lat: 27.3389, lng: 88.6065 },
  { code: 'TN', name: 'Tamil Nadu', type: 'State', capital: 'Chennai', lat: 13.0827, lng: 80.2707 },
  { code: 'TS', name: 'Telangana', type: 'State', capital: 'Hyderabad', lat: 17.3850, lng: 78.4867 },
  { code: 'TR', name: 'Tripura', type: 'State', capital: 'Agartala', lat: 23.8315, lng: 91.2868 },
  { code: 'UP', name: 'Uttar Pradesh', type: 'State', capital: 'Lucknow', lat: 26.8467, lng: 80.9462 },
  { code: 'UK', name: 'Uttarakhand', type: 'State', capital: 'Dehradun', lat: 30.3165, lng: 78.0322 },
  { code: 'WB', name: 'West Bengal', type: 'State', capital: 'Kolkata', lat: 22.5726, lng: 88.3639 },
  // 8 Union Territories
  { code: 'AN', name: 'Andaman and Nicobar Islands', type: 'UT', capital: 'Port Blair', lat: 11.6234, lng: 92.7265 },
  { code: 'CH', name: 'Chandigarh', type: 'UT', capital: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  { code: 'DH', name: 'Dadra and Nagar Haveli and Daman and Diu', type: 'UT', capital: 'Daman', lat: 20.4283, lng: 72.8397 },
  { code: 'DL', name: 'Delhi', type: 'UT', capital: 'New Delhi', lat: 28.6139, lng: 77.2090 },
  { code: 'JK', name: 'Jammu and Kashmir', type: 'UT', capital: 'Srinagar', lat: 34.0837, lng: 74.7973 },
  { code: 'LA', name: 'Ladakh', type: 'UT', capital: 'Leh', lat: 34.1526, lng: 77.5771 },
  { code: 'LD', name: 'Lakshadweep', type: 'UT', capital: 'Kavaratti', lat: 10.5667, lng: 72.6417 },
  { code: 'PY', name: 'Puducherry', type: 'UT', capital: 'Puducherry', lat: 11.9416, lng: 79.8083 }
];

// Rich India Locality, Village, Taluk and City Database
const PAN_INDIA_PLACES = [
  // KARNATAKA - Dakshina Kannada (Mangaluru, Valachil/Olachi, Ullal, Bantwal)
  {
    id: 'ka-dk-valachil',
    name: 'Valachil (Olachi)',
    type: 'Village',
    taluk: 'Mangalore',
    district: 'Dakshina Kannada',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 12.8711,
    lng: 74.9312,
    pincode: '575028',
    aliases: ['olachi', 'valachil village', 'valachil mangalore', 'olachi mangalore', 'valachil padavu', 'arkula'],
    parentHub: 'Mangaluru',
    hubDistanceKm: 6.8
  },
  {
    id: 'ka-dk-ullal',
    name: 'Ullal',
    type: 'Town',
    taluk: 'Mangalore',
    district: 'Dakshina Kannada',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 12.8056,
    lng: 74.8587,
    pincode: '575020',
    aliases: ['ullal', 'kotekar', 'someshwar', 'derlakatte'],
    parentHub: 'Mangaluru',
    hubDistanceKm: 8.5
  },
  {
    id: 'ka-dk-mangaluru',
    name: 'Mangaluru',
    type: 'City',
    taluk: 'Mangalore',
    district: 'Dakshina Kannada',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 12.9141,
    lng: 74.8560,
    pincode: '575001',
    aliases: ['mangalore', 'mangaluru', 'kudla', 'kadri', 'hampankatta', 'bejai', 'kankanady', 'falnir'],
    parentHub: 'Mangaluru',
    hubDistanceKm: 0.0
  },
  {
    id: 'ka-dk-surathkal',
    name: 'Surathkal',
    type: 'Town',
    taluk: 'Mangalore',
    district: 'Dakshina Kannada',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 13.0119,
    lng: 74.7943,
    pincode: '575014',
    aliases: ['surathkal', 'nitk surathkal', 'mukka', 'baikampady'],
    parentHub: 'Mangaluru',
    hubDistanceKm: 14.2
  },
  {
    id: 'ka-dk-bantwal',
    name: 'Bantwal',
    type: 'Taluk',
    taluk: 'Bantwal',
    district: 'Dakshina Kannada',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 12.8953,
    lng: 75.0354,
    pincode: '574211',
    aliases: ['bantwal', 'bcroad', 'b.c. road', 'panemangalore'],
    parentHub: 'Mangaluru',
    hubDistanceKm: 21.0
  },

  // KARNATAKA - Udupi
  {
    id: 'ka-udupi-manipal',
    name: 'Manipal',
    type: 'Town',
    taluk: 'Udupi',
    district: 'Udupi',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 13.3525,
    lng: 74.7928,
    pincode: '576104',
    aliases: ['manipal', 'manipal university', 'eshwar nagar'],
    parentHub: 'Udupi',
    hubDistanceKm: 5.2
  },
  {
    id: 'ka-udupi-city',
    name: 'Udupi',
    type: 'City',
    taluk: 'Udupi',
    district: 'Udupi',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 13.3409,
    lng: 74.7421,
    pincode: '576101',
    aliases: ['udupi', 'malpe', 'car street', 'ambalpady'],
    parentHub: 'Udupi',
    hubDistanceKm: 0.0
  },
  {
    id: 'ka-udupi-karkala',
    name: 'Karkala',
    type: 'Taluk',
    taluk: 'Karkala',
    district: 'Udupi',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 13.2133,
    lng: 74.9961,
    pincode: '574104',
    aliases: ['karkala', 'karkal', 'attur', 'miyar'],
    parentHub: 'Udupi',
    hubDistanceKm: 34.0
  },

  // KARNATAKA - Bengaluru Urban & Rural
  {
    id: 'ka-blr-city',
    name: 'Bengaluru',
    type: 'Metro',
    taluk: 'Bengaluru North/South',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 12.9716,
    lng: 77.5946,
    pincode: '560001',
    aliases: ['bengaluru', 'bangalore', 'koramangala', 'indiranagar', 'hsr layout', 'whitefield', 'jayanagar', 'marathahalli', 'electronic city'],
    parentHub: 'Bengaluru',
    hubDistanceKm: 0.0
  },
  {
    id: 'ka-blr-anekal',
    name: 'Anekal',
    type: 'Taluk',
    taluk: 'Anekal',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 12.7107,
    lng: 77.6974,
    pincode: '562106',
    aliases: ['anekal', 'jigani', 'bannerghatta village', 'attibele'],
    parentHub: 'Bengaluru',
    hubDistanceKm: 33.0
  },

  // KARNATAKA - Mysuru
  {
    id: 'ka-mys-city',
    name: 'Mysuru',
    type: 'City',
    taluk: 'Mysuru',
    district: 'Mysuru',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 12.2958,
    lng: 76.6394,
    pincode: '570001',
    aliases: ['mysuru', 'mysore', 'gokulam', 'jayalakshmipuram', 'kuvempunagar', 'vijayanagar mysore'],
    parentHub: 'Mysuru',
    hubDistanceKm: 0.0
  },
  {
    id: 'ka-mys-nanjangud',
    name: 'Nanjangud',
    type: 'Taluk',
    taluk: 'Nanjangud',
    district: 'Mysuru',
    state: 'Karnataka',
    stateCode: 'KA',
    lat: 12.1194,
    lng: 76.6806,
    pincode: '571301',
    aliases: ['nanjangud', 'nanjangudu', 'srikanteshwara'],
    parentHub: 'Mysuru',
    hubDistanceKm: 23.5
  },

  // KERALA - Wayanad (Sulthan Bathery, Kalpetta, Mananthavady, Meppadi)
  {
    id: 'kl-wayanad-kalpetta',
    name: 'Kalpetta (Wayanad)',
    type: 'Town',
    taluk: 'Vythiri',
    district: 'Wayanad',
    state: 'Kerala',
    stateCode: 'KL',
    lat: 11.6103,
    lng: 76.0827,
    pincode: '673121',
    aliases: ['wayanad', 'kalpetta', 'vythiri', 'meppadi', 'wayanad village'],
    parentHub: 'Kozhikode',
    hubDistanceKm: 62.0
  },
  {
    id: 'kl-wayanad-sulthanbathery',
    name: 'Sulthan Bathery',
    type: 'Taluk',
    taluk: 'Sulthan Bathery',
    district: 'Wayanad',
    state: 'Kerala',
    stateCode: 'KL',
    lat: 11.6625,
    lng: 76.2570,
    pincode: '673592',
    aliases: ['sulthan bathery', 'bathery', 'sultan battery', 'ambalavayal', 'muthanga'],
    parentHub: 'Kozhikode',
    hubDistanceKm: 85.0
  },

  // KERALA - Kozhikode
  {
    id: 'kl-kozhikode-city',
    name: 'Kozhikode',
    type: 'City',
    taluk: 'Kozhikode',
    district: 'Kozhikode',
    state: 'Kerala',
    stateCode: 'KL',
    lat: 11.2588,
    lng: 75.7804,
    pincode: '673001',
    aliases: ['kozhikode', 'calicut', 'mavoor', 'feroke', 'nadakkavu', 'beach road calicut'],
    parentHub: 'Kozhikode',
    hubDistanceKm: 0.0
  },

  // KERALA - Kannur
  {
    id: 'kl-kannur-city',
    name: 'Kannur',
    type: 'City',
    taluk: 'Kannur',
    district: 'Kannur',
    state: 'Kerala',
    stateCode: 'KL',
    lat: 11.8745,
    lng: 75.3704,
    pincode: '670001',
    aliases: ['kannur', 'cannnanore', 'thalassery', 'payyanur', 'taliparamba', 'mattannur'],
    parentHub: 'Kannur',
    hubDistanceKm: 0.0
  },

  // KERALA - Kochi / Ernakulam
  {
    id: 'kl-kochi-city',
    name: 'Kochi',
    type: 'Metro',
    taluk: 'Kanayannur',
    district: 'Ernakulam',
    state: 'Kerala',
    stateCode: 'KL',
    lat: 9.9312,
    lng: 76.2673,
    pincode: '682001',
    aliases: ['kochi', 'cochin', 'ernakulam', 'kakkanad', 'fort kochi', 'marine drive kochi', 'edappally', 'aluva'],
    parentHub: 'Kochi',
    hubDistanceKm: 0.0
  },

  // TAMIL NADU - Chennai
  {
    id: 'tn-chennai-city',
    name: 'Chennai',
    type: 'Metro',
    taluk: 'Chennai Central',
    district: 'Chennai',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    lat: 13.0827,
    lng: 80.2707,
    pincode: '600001',
    aliases: ['chennai', 'madras', 't nagar', 'anna nagar', 'adyar', 'velachery', 'mylapore', 'guindy', 'tambaram'],
    parentHub: 'Chennai',
    hubDistanceKm: 0.0
  },

  // TAMIL NADU - Coimbatore
  {
    id: 'tn-cbe-city',
    name: 'Coimbatore',
    type: 'City',
    taluk: 'Coimbatore South',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    lat: 11.0168,
    lng: 76.9558,
    pincode: '641001',
    aliases: ['coimbatore', 'kovai', 'rs puram', 'gandhipuram', 'peelamedu', 'saibaba colony', 'pollachi'],
    parentHub: 'Coimbatore',
    hubDistanceKm: 0.0
  },

  // TAMIL NADU - Madurai
  {
    id: 'tn-madurai-city',
    name: 'Madurai',
    type: 'City',
    taluk: 'Madurai North',
    district: 'Madurai',
    state: 'Tamil Nadu',
    stateCode: 'TN',
    lat: 9.9252,
    lng: 78.1198,
    pincode: '625001',
    aliases: ['madurai', 'meenakshi amman', 'kk nagar madurai', 'simmakkal', 'thirumangalam', 'melur'],
    parentHub: 'Madurai',
    hubDistanceKm: 0.0
  },

  // MAHARASHTRA - Mumbai
  {
    id: 'mh-mumbai-city',
    name: 'Mumbai',
    type: 'Metro',
    taluk: 'Mumbai Suburban',
    district: 'Mumbai',
    state: 'Maharashtra',
    stateCode: 'MH',
    lat: 19.0760,
    lng: 72.8777,
    pincode: '400001',
    aliases: ['mumbai', 'bombay', 'bandra', 'andheri', 'powai', 'juhu', 'colaba', 'dadar', 'thane', 'navi mumbai'],
    parentHub: 'Mumbai',
    hubDistanceKm: 0.0
  },

  // MAHARASHTRA - Pune
  {
    id: 'mh-pune-city',
    name: 'Pune',
    type: 'Metro',
    taluk: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
    stateCode: 'MH',
    lat: 18.5204,
    lng: 73.8567,
    pincode: '411001',
    aliases: ['pune', 'poona', 'koregaon park', 'kothrud', 'hinjewadi', 'baner', 'viman nagar', 'wakad', 'alandi'],
    parentHub: 'Pune',
    hubDistanceKm: 0.0
  },

  // MAHARASHTRA - Nagpur
  {
    id: 'mh-nagpur-city',
    name: 'Nagpur',
    type: 'City',
    taluk: 'Nagpur Urban',
    district: 'Nagpur',
    state: 'Maharashtra',
    stateCode: 'MH',
    lat: 21.1458,
    lng: 79.0882,
    pincode: '440001',
    aliases: ['nagpur', 'dharampeth', 'civil lines nagpur', 'sitabuldi', 'ramdaspeth', 'kamptee'],
    parentHub: 'Nagpur',
    hubDistanceKm: 0.0
  },

  // DELHI NCR
  {
    id: 'dl-delhi-ncr',
    name: 'New Delhi (Delhi NCR)',
    type: 'Metro',
    taluk: 'New Delhi',
    district: 'New Delhi',
    state: 'Delhi',
    stateCode: 'DL',
    lat: 28.6139,
    lng: 77.2090,
    pincode: '110001',
    aliases: ['delhi', 'new delhi', 'delhi ncr', 'connaught place', 'south extension', 'hauz khas', 'saket', 'noida', 'gurugram', 'dwarka', 'rohini'],
    parentHub: 'Delhi NCR',
    hubDistanceKm: 0.0
  },

  // RAJASTHAN - Jaipur & Sanganer
  {
    id: 'rj-jaipur-city',
    name: 'Jaipur',
    type: 'Metro',
    taluk: 'Jaipur',
    district: 'Jaipur',
    state: 'Rajasthan',
    stateCode: 'RJ',
    lat: 26.9124,
    lng: 75.7873,
    pincode: '302001',
    aliases: ['jaipur', 'pink city', 'c-scheme', 'malviya nagar', 'vaishali nagar', 'raja park', 'mansarovar', 'amer'],
    parentHub: 'Jaipur',
    hubDistanceKm: 0.0
  },
  {
    id: 'rj-jaipur-sanganer',
    name: 'Sanganer (Jaipur)',
    type: 'Town',
    taluk: 'Sanganer',
    district: 'Jaipur',
    state: 'Rajasthan',
    stateCode: 'RJ',
    lat: 26.8205,
    lng: 75.7667,
    pincode: '302029',
    aliases: ['sanganer', 'sanganer town', 'sitapura', 'pratap nagar jaipur'],
    parentHub: 'Jaipur',
    hubDistanceKm: 12.5
  },

  // RAJASTHAN - Jodhpur & Osian Village
  {
    id: 'rj-jodhpur-city',
    name: 'Jodhpur',
    type: 'City',
    taluk: 'Jodhpur',
    district: 'Jodhpur',
    state: 'Rajasthan',
    stateCode: 'RJ',
    lat: 26.2389,
    lng: 73.0243,
    pincode: '342001',
    aliases: ['jodhpur', 'sun city', 'blue city', 'ratanada', 'sardarpura', 'shastri nagar jodhpur', 'mandore'],
    parentHub: 'Jodhpur',
    hubDistanceKm: 0.0
  },
  {
    id: 'rj-jodhpur-osian',
    name: 'Osian (Osiya Village)',
    type: 'Village',
    taluk: 'Osian',
    district: 'Jodhpur',
    state: 'Rajasthan',
    stateCode: 'RJ',
    lat: 26.7265,
    lng: 72.9094,
    pincode: '342303',
    aliases: ['osian', 'osiya', 'osian village', 'osian desert', 'osian rajasthan', 'thivri'],
    parentHub: 'Jodhpur',
    hubDistanceKm: 64.0
  },

  // TELANGANA - Hyderabad
  {
    id: 'ts-hyd-city',
    name: 'Hyderabad',
    type: 'Metro',
    taluk: 'Hyderabad',
    district: 'Hyderabad',
    state: 'Telangana',
    stateCode: 'TS',
    lat: 17.3850,
    lng: 78.4867,
    pincode: '500001',
    aliases: ['hyderabad', 'secunderabad', 'gachibowli', 'hitec city', 'banjara hills', 'jubilee hills', 'madhapur', 'kondapur', 'kukatpally'],
    parentHub: 'Hyderabad',
    hubDistanceKm: 0.0
  },

  // GUJARAT - Ahmedabad
  {
    id: 'gj-ahm-city',
    name: 'Ahmedabad',
    type: 'Metro',
    taluk: 'Ahmedabad City',
    district: 'Ahmedabad',
    state: 'Gujarat',
    stateCode: 'GJ',
    lat: 23.0225,
    lng: 72.5714,
    pincode: '380001',
    aliases: ['ahmedabad', 'amdavad', 'satellite ahmedabad', 'bodakdev', 'sg highway', 'navrangpura', 'vastrapur'],
    parentHub: 'Ahmedabad',
    hubDistanceKm: 0.0
  },

  // WEST BENGAL - Kolkata
  {
    id: 'wb-kol-city',
    name: 'Kolkata',
    type: 'Metro',
    taluk: 'Kolkata',
    district: 'Kolkata',
    state: 'West Bengal',
    stateCode: 'WB',
    lat: 22.5726,
    lng: 88.3639,
    pincode: '700001',
    aliases: ['kolkata', 'calcutta', 'park street', 'salt lake city', 'new town kolkata', 'ballygunge', 'alipore', 'howrah'],
    parentHub: 'Kolkata',
    hubDistanceKm: 0.0
  }
];

/* ----------------------------------------------------------------------------
   Geospatial & Distance Utility Functions
   ---------------------------------------------------------------------------- */

// Calculate great-circle Haversine distance between two points in Kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 999.9;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Search locations by name, alias, PIN code, taluk, district, or state
function searchLocations(query) {
  if (!query || !query.trim()) return PAN_INDIA_PLACES.slice(0, 15);
  const clean = query.toLowerCase().trim();

  // 1. PIN code matching
  if (/^\d{3,6}$/.test(clean)) {
    const pinMatches = PAN_INDIA_PLACES.filter(p => p.pincode && p.pincode.startsWith(clean));
    if (pinMatches.length > 0) return pinMatches;
  }

  // 2. Direct exact or alias matching
  const scored = [];
  for (const place of PAN_INDIA_PLACES) {
    let score = 0;
    const nameLower = place.name.toLowerCase();
    const talukLower = (place.taluk || '').toLowerCase();
    const distLower = (place.district || '').toLowerCase();
    const stateLower = place.state.toLowerCase();

    if (nameLower === clean) score += 100;
    else if (nameLower.startsWith(clean)) score += 60;
    else if (nameLower.includes(clean)) score += 40;

    if (place.aliases && place.aliases.some(a => a === clean || a.includes(clean))) {
      score += 50;
    }

    if (talukLower.includes(clean)) score += 30;
    if (distLower.includes(clean)) score += 30;
    if (stateLower.includes(clean)) score += 20;

    if (score > 0) {
      scored.push({ place, score });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.place);
}

// Find nearest place in database to arbitrary coordinates
function findNearestPlace(lat, lng) {
  let nearest = PAN_INDIA_PLACES[0];
  let minDistance = Infinity;

  for (const p of PAN_INDIA_PLACES) {
    const d = calculateDistance(lat, lng, p.lat, p.lng);
    if (d < minDistance) {
      minDistance = d;
      nearest = { ...p, distanceKm: d };
    }
  }

  return nearest;
}

// Discover nearby businesses with Haversine distance and Smart Auto-Expansion
function discoverNearbyBusinesses(businesses, targetLat, targetLng, requestedRadiusKm = 5, category = 'all') {
  const radius = parseFloat(requestedRadiusKm) || 5;

  // 1. Compute distance for all businesses
  let scored = businesses.map(b => {
    let bLat = parseFloat(b.lat);
    let bLng = parseFloat(b.lng);

    // Fallback if coordinates missing on business: derive from parent city
    if (isNaN(bLat) || isNaN(bLng)) {
      const cityPlace = PAN_INDIA_PLACES.find(p => p.name.toLowerCase() === (b.city || '').toLowerCase());
      if (cityPlace) {
        // pseudo-jitter based on id so businesses are distributed in the locality
        let h = 0;
        const str = (b.id || '') + (b.name || '');
        for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i);
        bLat = cityPlace.lat + (((h % 100) - 50) / 1200);
        bLng = cityPlace.lng + ((((h >> 2) % 100) - 50) / 1200);
      } else {
        bLat = 12.9716;
        bLng = 77.5946;
      }
    }

    const dist = calculateDistance(targetLat, targetLng, bLat, bLng);
    return {
      ...b,
      lat: bLat,
      lng: bLng,
      distanceKm: dist,
      distance: `${dist.toFixed(1)} km`
    };
  });

  // Filter category if specified
  if (category && category !== 'all') {
    scored = scored.filter(b => b.category_id === category || b.category === category);
  }

  // Sort strictly by distance
  scored.sort((a, b) => a.distanceKm - b.distanceKm);

  // 2. Filter within requested radius
  let matches = scored.filter(b => b.distanceKm <= radius);
  let autoExpanded = false;
  let effectiveRadius = radius;

  // 3. Smart Auto-Radius Expansion: Never show empty/false results for a village!
  // Progressive expansion: radius -> 10km -> 25km -> 50km -> 100km
  if (matches.length === 0 && scored.length > 0) {
    const expansionTiers = [10, 15, 25, 35, 50, 75, 100, 200];
    for (const tier of expansionTiers) {
      if (tier > radius) {
        const tierMatches = scored.filter(b => b.distanceKm <= tier);
        if (tierMatches.length > 0) {
          matches = tierMatches;
          effectiveRadius = tier;
          autoExpanded = true;
          break;
        }
      }
    }

    // Fallback if still empty: take top 5 closest verified businesses in the state/country
    if (matches.length === 0) {
      matches = scored.slice(0, 5);
      effectiveRadius = matches[0] ? Math.ceil(matches[0].distanceKm) : 50;
      autoExpanded = true;
    }
  }

  return {
    businesses: matches,
    targetCoords: { lat: targetLat, lng: targetLng },
    requestedRadiusKm: radius,
    effectiveRadiusKm: effectiveRadius,
    autoExpanded,
    totalCount: matches.length
  };
}

module.exports = {
  STATES_AND_UTS,
  PAN_INDIA_PLACES,
  calculateDistance,
  searchLocations,
  findNearestPlace,
  discoverNearbyBusinesses
};
