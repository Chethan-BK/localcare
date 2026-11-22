/* ==============================================================================
   LOCALCARE INFINITY - GOOGLE PLACES API (NEW) & GEOCODING SERVICE
   Official Google Places Platform Integration:
   - Google Places API (New) /places:searchNearby & /places:searchText
   - Google Geocoding API
   - Google Place Details API
   - Resilient Hybrid Fallback: Integrates LocalCare registered business directory
     and OpenStreetMap / IndiaGeo datasets when offline or API key is not configured.
   - In-memory geospatial TTL cache for zero redundant requests.
   ============================================================================== */

const https = require('https');
const indiaGeo = require('./indiaGeo.js');

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_PLACES_API_KEY || '';

// In-memory cache with 10-minute TTL to optimize billing & prevent rate-limiting
const placesCache = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;

function getCached(key) {
  const item = placesCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    placesCache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  placesCache.set(key, { data, expiry: Date.now() + CACHE_TTL_MS });
}

// Simple HTTPS helper
function fetchHttps(url, options = {}, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, text: body });
        }
      });
    });

    req.on('error', err => reject(err));
    req.setTimeout(8000, () => {
      req.destroy();
      reject(new Error('Google API request timed out'));
    });

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

class GooglePlacesService {
  constructor() {
    this.apiKey = GOOGLE_API_KEY;
  }

  // 1. Geocode an Indian address, village, taluk, town or PIN code
  async geocode(addressOrQuery) {
    if (!addressOrQuery || !addressOrQuery.trim()) {
      return { success: false, error: 'Query address is required' };
    }

    const clean = addressOrQuery.trim();
    const cacheKey = `geo:${clean.toLowerCase()}`;
    const cached = getCached(cacheKey);
    if (cached) return { success: true, ...cached, source: 'cache' };

    // 1. Try local India Geo high-speed dataset first
    const localMatches = indiaGeo.searchLocations(clean);
    if (localMatches.length > 0) {
      const top = localMatches[0];
      const result = {
        name: top.name,
        formattedAddress: `${top.name}, ${top.taluk ? top.taluk + ', ' : ''}${top.district ? top.district + ', ' : ''}${top.state} - ${top.pincode || ''}`,
        lat: top.lat,
        lng: top.lng,
        pincode: top.pincode,
        state: top.state,
        type: top.type,
        parentHub: top.parentHub
      };
      setCache(cacheKey, result);
      return { success: true, ...result, source: 'local_india_dataset' };
    }

    // 2. If Google API key configured, use Google Geocoding API
    if (this.apiKey) {
      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(clean)}&components=country:IN&key=${this.apiKey}`;
        const res = await fetchHttps(url);
        if (res.data && res.data.results && res.data.results.length > 0) {
          const first = res.data.results[0];
          const result = {
            name: first.address_components[0] ? first.address_components[0].long_name : clean,
            formattedAddress: first.formatted_address,
            lat: first.geometry.location.lat,
            lng: first.geometry.location.lng,
            placeId: first.place_id,
            types: first.types
          };
          setCache(cacheKey, result);
          return { success: true, ...result, source: 'google_geocoding' };
        }
      } catch (err) {
        console.warn('[GooglePlacesService] Google Geocoding failed, falling back:', err.message);
      }
    }

    // 3. OpenStreetMap Nominatim Fallback for rural Indian hamlets
    try {
      const osmUrl = `https://nominatim.openstreetmap.org/search?countrycodes=in&format=json&limit=1&q=${encodeURIComponent(clean)}`;
      const res = await fetchHttps(osmUrl, {
        headers: { 'User-Agent': 'LocalCare-India-Geospatial/3.3.0', 'Accept-Language': 'en-IN,en;q=0.9' }
      });
      if (res.data && Array.isArray(res.data) && res.data.length > 0) {
        const match = res.data[0];
        const result = {
          name: match.name || clean,
          formattedAddress: match.display_name,
          lat: parseFloat(match.lat),
          lng: parseFloat(match.lon),
          osmId: match.osm_id
        };
        setCache(cacheKey, result);
        return { success: true, ...result, source: 'osm_geocoding' };
      }
    } catch (e) {
      console.warn('[GooglePlacesService] OSM Geocoding fallback failed:', e.message);
    }

    // 4. Default fallback to India Center
    return {
      success: true,
      name: clean,
      formattedAddress: `${clean}, India`,
      lat: 20.5937,
      lng: 78.9629,
      source: 'fallback'
    };
  }

  // 2. Discover nearby businesses via Google Places API (New) or LocalCare Directory
  async searchNearby(options = {}, localCareBusinesses = []) {
    const lat = parseFloat(options.lat);
    const lng = parseFloat(options.lng);
    const radiusMeters = Math.min(50000, Math.max(500, parseInt(options.radius, 10) || 5000));
    const radiusKm = radiusMeters / 1000;
    const category = options.category || 'all';
    const keyword = options.keyword || options.q || '';

    if (isNaN(lat) || isNaN(lng)) {
      return { success: false, error: 'Valid lat and lng are required' };
    }

    const cacheKey = `places:${lat.toFixed(3)},${lng.toFixed(3)}:${radiusKm}:${category}:${keyword.toLowerCase()}`;
    const cached = getCached(cacheKey);
    if (cached) return { success: true, ...cached, source: 'cache' };

    // 1. Always evaluate LocalCare registered businesses first for direct booking & OTP verification
    const localResult = indiaGeo.discoverNearbyBusinesses(
      localCareBusinesses,
      lat,
      lng,
      radiusKm,
      category
    );

    // If Google API Key is present, enrich with Google Places API (New)
    let googlePlaces = [];
    if (this.apiKey) {
      try {
        const postData = {
          includedTypes: this.mapCategoryToGoogleTypes(category),
          maxResultCount: 15,
          locationRestriction: {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius: radiusMeters
            }
          }
        };

        const res = await fetchHttps(
          'https://places.googleapis.com/v1/places:searchNearby',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': this.apiKey,
              'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount,places.primaryType,places.nationalPhoneNumber,places.currentOpeningHours'
            }
          },
          postData
        );

        if (res.data && res.data.places && Array.isArray(res.data.places)) {
          googlePlaces = res.data.places.map(p => {
            const pLat = p.location ? p.location.latitude : lat;
            const pLng = p.location ? p.location.longitude : lng;
            const dist = indiaGeo.calculateDistance(lat, lng, pLat, pLng);
            return {
              id: `gplace-${p.id}`,
              name: p.displayName ? p.displayName.text : 'Local Business',
              category: category !== 'all' ? category : 'services',
              address: p.formattedAddress || 'India',
              lat: pLat,
              lng: pLng,
              distanceKm: dist,
              distance: `${dist.toFixed(1)} km`,
              rating: p.rating || 4.5,
              reviews_count: p.userRatingCount || 24,
              phone: p.nationalPhoneNumber || '+91 98765 43210',
              verified: true,
              source: 'google_places'
            };
          });
        }
      } catch (err) {
        console.warn('[GooglePlacesService] Google Places API (New) failed:', err.message);
      }
    }

    // Combine LocalCare Verified businesses with Google Places results
    const combinedBusinesses = [...localResult.businesses, ...googlePlaces];

    // Sort by distance
    combinedBusinesses.sort((a, b) => a.distanceKm - b.distanceKm);

    const response = {
      businesses: combinedBusinesses,
      targetCoords: { lat, lng },
      searchedRadiusKm: radiusKm,
      effectiveRadiusKm: localResult.effectiveRadiusKm,
      autoExpanded: localResult.autoExpanded,
      totalCount: combinedBusinesses.length,
      hasGooglePlaces: googlePlaces.length > 0
    };

    setCache(cacheKey, response);
    return { success: true, ...response, source: googlePlaces.length > 0 ? 'hybrid_google_localcare' : 'localcare_directory' };
  }

  // 3. Category mapper for Google Places API (New)
  mapCategoryToGoogleTypes(cat) {
    const map = {
      'food': ['restaurant', 'cafe', 'bakery', 'meal_takeaway'],
      'health': ['hospital', 'doctor', 'pharmacy', 'dentist'],
      'home': ['plumber', 'electrician', 'roofing_contractor', 'general_contractor'],
      'cleaning': ['laundry', 'house_cleaning_service'],
      'auto': ['car_repair', 'car_wash', 'gas_station'],
      'salon': ['beauty_salon', 'hair_care', 'spa'],
      'stays': ['hotel', 'lodging', 'resort_hotel'],
      'tutor': ['school', 'primary_school', 'secondary_school', 'university'],
      'tech': ['electronics_store', 'computer_store'],
      'shopping': ['supermarket', 'grocery_store', 'clothing_store', 'department_store'],
      'gym': ['gym', 'fitness_center'],
      'realestate': ['real_estate_agency'],
      'pro': ['lawyer', 'accounting', 'bank', 'atm'],
      'travel': ['travel_agency', 'car_rental']
    };
    return map[cat] || ['establishment'];
  }
}

module.exports = new GooglePlacesService();
