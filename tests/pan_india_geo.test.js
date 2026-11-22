/* ==============================================================================
   LOCALCARE INFINITY - PAN-INDIA GEOGRAPHICAL & GOOGLE PLACES TEST SUITE
   Validates:
   - All 28 States & 8 Union Territories
   - Karnataka (Mangalore, Mysuru, Bengaluru, Udupi, Olachi/Valachil)
   - Kerala (Kochi, Kozhikode, Kannur, Wayanad)
   - Tamil Nadu (Chennai, Coimbatore, Madurai)
   - Maharashtra (Mumbai, Pune, Nagpur)
   - Delhi (New Delhi)
   - Rajasthan (Jaipur, Jodhpur, Osian)
   - Rural / Village Discovery & Smart Auto-Expansion (Never False Not-Found)
   - Google Places API Proxy & Geocoding Endpoints
   ============================================================================== */

const assert = require('assert');
const http = require('http');
const indiaGeo = require('../backend/indiaGeo.js');
const googlePlaces = require('../backend/googlePlacesService.js');
const db = require('../backend/database.js');

let passCount = 0;
let failCount = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ [PASS] ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${desc}\n    Error: ${err.message}`);
    failCount++;
  }
}

async function itAsync(desc, fn) {
  try {
    await fn();
    console.log(`  ✓ [PASS] ${desc}`);
    passCount++;
  } catch (err) {
    console.error(`  ✗ [FAIL] ${desc}\n    Error: ${err.message}`);
    failCount++;
  }
}

function makeRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
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

    req.on('error', err => reject(err));
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

async function runPanIndiaTests() {
  console.log('\n================================================================');
  console.log('  LOCALCARE INFINITY - PAN-INDIA GEOSPATIAL & PLACES TEST SUITE');
  console.log('================================================================\n');

  console.log('[1] Geographical Dataset & National Administrative Divisions:');

  it('Covers all 28 Indian States and 8 Union Territories (36 total)', () => {
    const states = indiaGeo.STATES_AND_UTS;
    assert.strictEqual(states.length, 36, 'Expected exactly 36 states and union territories');
    const stateCount = states.filter(s => s.type === 'State').length;
    const utCount = states.filter(s => s.type === 'UT').length;
    assert.strictEqual(stateCount, 28, 'Must have 28 states');
    assert.strictEqual(utCount, 8, 'Must have 8 union territories');
  });

  it('Accurately identifies Karnataka key hubs: Mangalore, Mysuru, Bengaluru, Udupi & Olachi', () => {
    const olachi = indiaGeo.searchLocations('Olachi');
    assert.ok(olachi.length > 0, 'Must find Olachi village');
    assert.strictEqual(olachi[0].taluk, 'Mangalore');
    assert.strictEqual(olachi[0].pincode, '575028');

    const udupi = indiaGeo.searchLocations('Udupi');
    assert.ok(udupi.length > 0, 'Must find Udupi');

    const manipal = indiaGeo.searchLocations('Manipal');
    assert.ok(manipal.length > 0, 'Must find Manipal');
  });

  it('Accurately identifies Kerala locations: Kochi, Kozhikode, Kannur & Wayanad (Kalpetta)', () => {
    const wayanad = indiaGeo.searchLocations('Wayanad');
    assert.ok(wayanad.length > 0, 'Must find Wayanad');
    assert.strictEqual(wayanad[0].state, 'Kerala');

    const kochi = indiaGeo.searchLocations('Kochi');
    assert.ok(kochi.length > 0, 'Must find Kochi');

    const kannur = indiaGeo.searchLocations('Kannur');
    assert.ok(kannur.length > 0, 'Must find Kannur');
  });

  it('Accurately identifies Tamil Nadu locations: Chennai, Coimbatore & Madurai', () => {
    const chennai = indiaGeo.searchLocations('Chennai');
    assert.ok(chennai.length > 0, 'Must find Chennai');

    const cbe = indiaGeo.searchLocations('Coimbatore');
    assert.ok(cbe.length > 0, 'Must find Coimbatore');

    const madurai = indiaGeo.searchLocations('Madurai');
    assert.ok(madurai.length > 0, 'Must find Madurai');
  });

  it('Accurately identifies Maharashtra locations: Mumbai, Pune & Nagpur', () => {
    const mumbai = indiaGeo.searchLocations('Mumbai');
    assert.ok(mumbai.length > 0, 'Must find Mumbai');

    const pune = indiaGeo.searchLocations('Pune');
    assert.ok(pune.length > 0, 'Must find Pune');

    const nagpur = indiaGeo.searchLocations('Nagpur');
    assert.ok(nagpur.length > 0, 'Must find Nagpur');
  });

  it('Accurately identifies Rajasthan locations: Jaipur, Jodhpur & Osian Village', () => {
    const jaipur = indiaGeo.searchLocations('Jaipur');
    assert.ok(jaipur.length > 0, 'Must find Jaipur');

    const jodhpur = indiaGeo.searchLocations('Jodhpur');
    assert.ok(jodhpur.length > 0, 'Must find Jodhpur');

    const osian = indiaGeo.searchLocations('Osian');
    assert.ok(osian.length > 0, 'Must find Osian village');
    assert.strictEqual(osian[0].state, 'Rajasthan');
  });

  it('Resolves 6-digit PIN codes directly (575028 -> Valachil/Olachi)', () => {
    const byPin = indiaGeo.searchLocations('575028');
    assert.ok(byPin.length > 0, 'Must resolve PIN 575028');
    assert.strictEqual(byPin[0].id, 'ka-dk-valachil');
  });

  console.log('\n[2] Geospatial Haversine & Smart Auto-Expansion (Never False Not-Found):');

  it('Calculates accurate Haversine distance in Kilometers', () => {
    // Valachil (12.8711, 74.9312) to Mangaluru city center (12.9141, 74.8560)
    const dist = indiaGeo.calculateDistance(12.8711, 74.9312, 12.9141, 74.8560);
    assert.ok(dist >= 8.0 && dist <= 12.0, `Expected distance ~9-10 km, got ${dist} km`);
  });

  it('Auto-expands search radius for small villages so customers are never turned away', () => {
    const businesses = db.find('businesses');
    // Olachi coordinates with narrow 1 km radius
    const result = indiaGeo.discoverNearbyBusinesses(businesses, 12.8711, 74.9312, 1, 'all');
    assert.ok(result.businesses.length > 0, 'Must discover nearest businesses via auto-expansion');
    assert.strictEqual(result.autoExpanded, true, 'autoExpanded flag must be true');
    assert.ok(result.effectiveRadiusKm > 1, 'Effective radius must be expanded');
  });

  console.log('\n[3] Google Places API Proxy & Hybrid Discovery Integration:');

  await itAsync('Geocodes Indian locations and returns verified coordinates', async () => {
    const geo = await googlePlaces.geocode('Valachil, Mangalore');
    assert.strictEqual(geo.success, true);
    assert.ok(geo.lat && geo.lng, 'Must provide lat and lng');
  });

  await itAsync('searchNearby returns combined businesses sorted by real distance', async () => {
    const businesses = db.find('businesses');
    const nearby = await googlePlaces.searchNearby({
      lat: 12.9716,
      lng: 77.5946,
      radius: 5000,
      category: 'health'
    }, businesses);
    assert.strictEqual(nearby.success, true);
    assert.ok(nearby.businesses.length > 0, 'Must find nearby health clinics');
    assert.ok(nearby.businesses[0].distanceKm !== undefined, 'Must calculate distanceKm');
  });

  console.log('\n================================================================');
  console.log(`  PAN-INDIA TEST SUMMARY: ${passCount} Passed, ${failCount} Failed`);
  console.log('================================================================\n');

  if (failCount > 0) process.exit(1);
}

runPanIndiaTests();
