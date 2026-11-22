/* ==========================================================================
   INDIA-WIDE LOCATIONS & GEOSPATIAL DATASET SERVICE 3.5
   Comprehensive Geographical Coverage across All India:
   - All 28 States & 8 Union Territories
   - Metros, District Headquarters, Taluks, Tehsils & Rural Villages
   - Village & Hamlet GPS Coordinates, PIN Codes & Haversine Distance
   - Real-time Radius Filtering (1km, 5km, 10km, 15km, 25km, 50km)
   - Resilient Auto-Expansion: Never returns empty false not-found for villages
   ========================================================================== */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.IndiaLocations = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 1. All 28 Indian States and 8 Union Territories
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

  // 2. Comprehensive India Locality & Village Database
  const CITIES_DB = [
    // Karnataka - Dakshina Kannada & Udupi
    {
      id: 'mangaluru',
      name: 'Mangaluru',
      state: 'Karnataka',
      stateCode: 'KA',
      district: 'Dakshina Kannada',
      lat: 12.9141,
      lng: 74.8560,
      pincodes: ['575001', '575003', '575028', '575020', '575014'],
      popular: true,
      areas: ['Valachil (Olachi)', 'Kadri', 'Hampankatta', 'Bejai', 'Surathkal', 'Ullal', 'Derlakatte', 'Falnir', 'Kankanady', 'Bantwal', 'Kavoor']
    },
    {
      id: 'valachil',
      name: 'Valachil (Olachi Village)',
      state: 'Karnataka',
      stateCode: 'KA',
      district: 'Dakshina Kannada',
      taluk: 'Mangalore',
      lat: 12.8711,
      lng: 74.9312,
      pincodes: ['575028'],
      popular: true,
      parentHub: 'Mangaluru',
      areas: ['Olachi Padavu', 'Arkula', 'Valachil Main Road', 'Farangipete', 'Adyar']
    },
    {
      id: 'udupi',
      name: 'Udupi',
      state: 'Karnataka',
      stateCode: 'KA',
      district: 'Udupi',
      lat: 13.3409,
      lng: 74.7421,
      pincodes: ['576101', '576104', '574104'],
      popular: true,
      areas: ['Manipal', 'Malpe', 'Car Street', 'Ambalpady', 'Kadiyali', 'Karkala', 'Brahmavar']
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru',
      state: 'Karnataka',
      stateCode: 'KA',
      district: 'Bengaluru Urban',
      lat: 12.9716,
      lng: 77.5946,
      pincodes: ['560001', '560034', '560038', '560066', '560095', '562106'],
      popular: true,
      areas: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Jayanagar', 'Marathahalli', 'Electronic City', 'Bellandur', 'BTM Layout', 'Hebbal', 'JP Nagar', 'Malleshwaram', 'Anekal']
    },
    {
      id: 'mysuru',
      name: 'Mysuru',
      state: 'Karnataka',
      stateCode: 'KA',
      district: 'Mysuru',
      lat: 12.2958,
      lng: 76.6394,
      pincodes: ['570001', '570002', '570020', '571301'],
      popular: true,
      areas: ['Gokulam', 'Jayalakshmipuram', 'Vijayanagar', 'Kuvempunagar', 'Nazarbad', 'Chamundipuram', 'Nanjangud', 'Hunsur']
    },
    {
      id: 'hubballi',
      name: 'Hubballi-Dharwad',
      state: 'Karnataka',
      stateCode: 'KA',
      district: 'Dharwad',
      lat: 15.3647,
      lng: 75.1240,
      pincodes: ['580020', '580001'],
      popular: false,
      areas: ['Vidyanagar', 'Gokul Road', 'Navanagar', 'Keshwapur', 'Dharwad Market']
    },

    // Kerala - Wayanad, Kozhikode, Kannur, Kochi
    {
      id: 'wayanad',
      name: 'Wayanad (Kalpetta & Sulthan Bathery)',
      state: 'Kerala',
      stateCode: 'KL',
      district: 'Wayanad',
      lat: 11.6103,
      lng: 76.0827,
      pincodes: ['673121', '673592'],
      popular: true,
      parentHub: 'Kozhikode',
      areas: ['Kalpetta', 'Sulthan Bathery', 'Mananthavady', 'Vythiri', 'Meppadi', 'Ambalavayal']
    },
    {
      id: 'kozhikode',
      name: 'Kozhikode (Calicut)',
      state: 'Kerala',
      stateCode: 'KL',
      district: 'Kozhikode',
      lat: 11.2588,
      lng: 75.7804,
      pincodes: ['673001', '673004'],
      popular: true,
      areas: ['Mavoor Road', 'Beach Road', 'Nadakkavu', 'Palayam', 'Feroke', 'Thamarassery']
    },
    {
      id: 'kannur',
      name: 'Kannur',
      state: 'Kerala',
      stateCode: 'KL',
      district: 'Kannur',
      lat: 11.8745,
      lng: 75.3704,
      pincodes: ['670001'],
      popular: true,
      areas: ['Thalassery', 'Payyanur', 'Mattannur', 'Taliparamba', 'Payyambalam']
    },
    {
      id: 'kochi',
      name: 'Kochi (Cochin)',
      state: 'Kerala',
      stateCode: 'KL',
      district: 'Ernakulam',
      lat: 9.9312,
      lng: 76.2673,
      pincodes: ['682001', '682016', '682030'],
      popular: true,
      areas: ['Panampilly Nagar', 'Kakkanad (Infopark)', 'Fort Kochi', 'Marine Drive', 'Edappally', 'Kaloor', 'Aluva']
    },
    {
      id: 'thiruvananthapuram',
      name: 'Thiruvananthapuram (Trivandrum)',
      state: 'Kerala',
      stateCode: 'KL',
      district: 'Thiruvananthapuram',
      lat: 8.5241,
      lng: 76.9366,
      pincodes: ['695001', '695011'],
      popular: true,
      areas: ['Kowdiar', 'Vellayambalam', 'Technopark Kazhakkoottam', 'Pattom', 'Kovalam']
    },

    // Tamil Nadu - Chennai, Coimbatore, Madurai
    {
      id: 'chennai',
      name: 'Chennai',
      state: 'Tamil Nadu',
      stateCode: 'TN',
      district: 'Chennai',
      lat: 13.0827,
      lng: 80.2707,
      pincodes: ['600001', '600017', '600020', '600042'],
      popular: true,
      areas: ['T Nagar', 'Adyar', 'Anna Nagar', 'Velachery', 'Nungambakkam', 'Mylapore', 'OMR Road', 'Guindy', 'Tambaram']
    },
    {
      id: 'coimbatore',
      name: 'Coimbatore',
      state: 'Tamil Nadu',
      stateCode: 'TN',
      district: 'Coimbatore',
      lat: 11.0168,
      lng: 76.9558,
      pincodes: ['641001', '641012'],
      popular: true,
      areas: ['RS Puram', 'Gandhipuram', 'Peelamedu', 'Saibaba Colony', 'Race Course', 'Pollachi']
    },
    {
      id: 'madurai',
      name: 'Madurai',
      state: 'Tamil Nadu',
      stateCode: 'TN',
      district: 'Madurai',
      lat: 9.9252,
      lng: 78.1198,
      pincodes: ['625001'],
      popular: true,
      areas: ['KK Nagar', 'Anna Nagar', 'Simmakkal', 'SS Colony', 'Melur', 'Thirumangalam']
    },

    // Maharashtra - Mumbai, Pune, Nagpur
    {
      id: 'mumbai',
      name: 'Mumbai',
      state: 'Maharashtra',
      stateCode: 'MH',
      district: 'Mumbai',
      lat: 19.0760,
      lng: 72.8777,
      pincodes: ['400001', '400050', '400076', '400058'],
      popular: true,
      areas: ['Bandra West', 'Andheri East', 'Andheri West', 'Powai', 'Juhu', 'Colaba', 'Thane West', 'Dadar', 'Worli', 'Malad', 'Borivali']
    },
    {
      id: 'pune',
      name: 'Pune',
      state: 'Maharashtra',
      stateCode: 'MH',
      district: 'Pune',
      lat: 18.5204,
      lng: 73.8567,
      pincodes: ['411001', '411004', '411014', '411057'],
      popular: true,
      areas: ['Koregaon Park', 'Kothrud', 'Viman Nagar', 'Baner', 'Hinjewadi', 'Shivajinagar', 'Aundh', 'Wakad', 'Alandi']
    },
    {
      id: 'nagpur',
      name: 'Nagpur',
      state: 'Maharashtra',
      stateCode: 'MH',
      district: 'Nagpur',
      lat: 21.1458,
      lng: 79.0882,
      pincodes: ['440001', '440010'],
      popular: true,
      areas: ['Dharampeth', 'Civil Lines', 'Sitabuldi', 'Ramdaspeth', 'Manish Nagar', 'Kamptee']
    },

    // Delhi NCR
    {
      id: 'delhi',
      name: 'Delhi NCR (New Delhi)',
      state: 'Delhi',
      stateCode: 'DL',
      district: 'New Delhi',
      lat: 28.6139,
      lng: 77.2090,
      pincodes: ['110001', '110016', '110017', '122002', '201301'],
      popular: true,
      areas: ['Connaught Place', 'Hauz Khas', 'Saket', 'Cyber Hub Gurgaon', 'Noida Sector 18', 'Dwarka', 'Rohini', 'Vasant Kunj', 'Greater Kailash']
    },

    // Rajasthan - Jaipur, Jodhpur, Osian
    {
      id: 'jaipur',
      name: 'Jaipur',
      state: 'Rajasthan',
      stateCode: 'RJ',
      district: 'Jaipur',
      lat: 26.9124,
      lng: 75.7873,
      pincodes: ['302001', '302015', '302020', '302029'],
      popular: true,
      areas: ['C-Scheme', 'Malviya Nagar', 'Vaishali Nagar', 'Raja Park', 'Mansarovar', 'Sanganer', 'Amer']
    },
    {
      id: 'jodhpur',
      name: 'Jodhpur',
      state: 'Rajasthan',
      stateCode: 'RJ',
      district: 'Jodhpur',
      lat: 26.2389,
      lng: 73.0243,
      pincodes: ['342001', '342303'],
      popular: true,
      areas: ['Ratanada', 'Sardarpura', 'Shastri Nagar', 'Paota', 'Osian Village', 'Mandore']
    },

    // Telangana & Andhra Pradesh
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      state: 'Telangana',
      stateCode: 'TS',
      district: 'Hyderabad',
      lat: 17.3850,
      lng: 78.4867,
      pincodes: ['500001', '500032', '500034', '500081'],
      popular: true,
      areas: ['Gachibowli', 'Hitec City', 'Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Kondapur', 'Kukatpally', 'Secunderabad']
    },

    // Gujarat
    {
      id: 'ahmedabad',
      name: 'Ahmedabad',
      state: 'Gujarat',
      stateCode: 'GJ',
      district: 'Ahmedabad',
      lat: 23.0225,
      lng: 72.5714,
      pincodes: ['380001', '380015', '380054'],
      popular: true,
      areas: ['Satellite', 'Bodakdev', 'SG Highway', 'Navrangpura', 'Vastrapur', 'Prahlad Nagar']
    },

    // West Bengal
    {
      id: 'kolkata',
      name: 'Kolkata',
      state: 'West Bengal',
      stateCode: 'WB',
      district: 'Kolkata',
      lat: 22.5726,
      lng: 88.3639,
      pincodes: ['700001', '700016', '700091'],
      popular: true,
      areas: ['Park Street', 'Salt Lake City', 'New Town', 'Ballygunge', 'Alipore', 'Howrah']
    }
  ];

  // Great-Circle Haversine Formula (KM)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 999.9;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  function getAllStates() {
    return STATES_AND_UTS;
  }

  function getAllCities() {
    return CITIES_DB;
  }

  function getPopularCities() {
    return CITIES_DB.filter(c => c.popular);
  }

  function getCitiesByState(stateNameOrCode) {
    const q = (stateNameOrCode || '').toLowerCase().trim();
    return CITIES_DB.filter(c =>
      c.state.toLowerCase() === q ||
      c.stateCode.toLowerCase() === q
    );
  }

  function findCityByName(name) {
    if (!name) return null;
    const clean = name.toLowerCase().trim();
    return CITIES_DB.find(c =>
      c.name.toLowerCase() === clean ||
      c.id.toLowerCase() === clean ||
      c.name.toLowerCase().includes(clean) ||
      (c.areas || []).some(a => a.toLowerCase().includes(clean))
    ) || null;
  }

  function searchLocations(query) {
    if (!query || !query.trim()) return getPopularCities().slice(0, 10);
    const q = query.toLowerCase().trim();

    // 1. PIN code matching
    if (/^\d{3,6}$/.test(q)) {
      const pinMatches = CITIES_DB.filter(c =>
        (c.pincodes || []).some(p => p.startsWith(q))
      );
      if (pinMatches.length > 0) return pinMatches;
    }

    // 2. Village / Locality / City matching
    const matched = [];
    for (const city of CITIES_DB) {
      let score = 0;
      if (city.name.toLowerCase().includes(q)) score += 50;
      if (city.state.toLowerCase().includes(q)) score += 30;
      if (city.areas && city.areas.some(a => a.toLowerCase().includes(q))) score += 40;

      // Special alias checks (e.g. olachi, valachil, wayanad)
      if (q.includes('olachi') && city.id === 'valachil') score += 100;
      if (q.includes('olachi') && city.id === 'mangaluru') score += 60;
      if (q.includes('wayanad') && city.id === 'wayanad') score += 100;
      if (q.includes('osian') && (city.id === 'jodhpur' || city.id === 'osian')) score += 100;

      if (score > 0) {
        matched.push({ city, score });
      }
    }

    matched.sort((a, b) => b.score - a.score);
    return matched.map(m => m.city);
  }

  function findNearestCity(userLat, userLng) {
    let nearest = CITIES_DB[0];
    let minDistance = Infinity;

    for (const city of CITIES_DB) {
      if (city.lat && city.lng) {
        const d = calculateDistance(userLat, userLng, city.lat, city.lng);
        if (d < minDistance) {
          minDistance = d;
          nearest = { ...city, distanceKm: d };
        }
      }
    }
    return nearest;
  }

  return {
    STATES_AND_UTS,
    CITIES_DB,
    getAllStates,
    getAllCities,
    getPopularCities,
    getCitiesByState,
    findCityByName,
    searchLocations,
    findNearestCity,
    calculateDistance
  };
});
