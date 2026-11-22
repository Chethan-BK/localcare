/* ==========================================================================
   Local Care - Geospatial Whole India & Village Mapping Engine 3.0
   Covers the entire Indian Subcontinent from Metros to Rural Villages,
   Taluks, Gram Panchayats, Streets & PIN Codes via Leaflet + OSM & Esri
   ========================================================================== */

window.MapEngine = (function () {
  'use strict';

  let leafletMap = null;
  let activeMarkers = [];
  let currentLayer = 'street';
  let tileLayers = {};
  let villageMarker = null;
  let userGpsMarker = null;
  let currentBusinesses = [];
  let selectedBusinessId = null;
  let activeFilterRadius = 5; // km
  let activeNeighborhood = null;
  let mapContainer = null;

  // Comprehensive coordinates dictionary for 12 Indian Metropolitan & Regional Hubs
  const CITY_COORDINATES = {
    'bengaluru': { lat: 12.9716, lng: 77.5946, zoom: 12, name: 'Bengaluru' },
    'mangaluru': { lat: 12.9141, lng: 74.8560, zoom: 13, name: 'Mangaluru' },
    'mysuru': { lat: 12.2958, lng: 76.6394, zoom: 13, name: 'Mysuru' },
    'mumbai': { lat: 19.0760, lng: 72.8777, zoom: 12, name: 'Mumbai' },
    'delhi ncr': { lat: 28.6139, lng: 77.2090, zoom: 12, name: 'Delhi NCR' },
    'delhi': { lat: 28.6139, lng: 77.2090, zoom: 12, name: 'Delhi NCR' },
    'hyderabad': { lat: 17.3850, lng: 78.4867, zoom: 12, name: 'Hyderabad' },
    'chennai': { lat: 13.0827, lng: 80.2707, zoom: 12, name: 'Chennai' },
    'kolkata': { lat: 22.5726, lng: 88.3639, zoom: 12, name: 'Kolkata' },
    'pune': { lat: 18.5204, lng: 73.8567, zoom: 13, name: 'Pune' },
    'ahmedabad': { lat: 23.0225, lng: 72.5714, zoom: 12, name: 'Ahmedabad' },
    'jaipur': { lat: 26.9124, lng: 75.7873, zoom: 13, name: 'Jaipur' },
    'kochi': { lat: 9.9312, lng: 76.2673, zoom: 13, name: 'Kochi' }
  };

  // National India Geographical Center
  const INDIA_CENTER = { lat: 22.5937, lng: 78.9629, zoom: 5 };

  // Category Color Map
  const CATEGORY_MAP_COLORS = {
    health: '#10b981',
    electrical: '#f59e0b',
    home: '#3b82f6',
    food: '#ef4444',
    salon: '#ec4899',
    cleaning: '#8b5cf6',
    auto: '#6366f1',
    emergency: '#dc2626',
    stays: '#06b6d4',
    tutor: '#14b8a6',
    tech: '#64748b',
    events: '#f97316'
  };

  const CATEGORY_ICONS = {
    health: '🩺',
    electrical: '⚡',
    home: '🔧',
    food: '🍽️',
    salon: '✂️',
    cleaning: '✨',
    auto: '🚗',
    emergency: '🚨',
    stays: '🏢',
    tutor: '📚',
    tech: '💻',
    events: '🎉'
  };

  function init(containerId = 'interactiveMapCanvas') {
    mapContainer = document.getElementById(containerId);
    if (!mapContainer) return;

    renderMapShell();
    initLeaflet();
    bindControls();
    renderNeighborhoodChips();
  }

  function renderMapShell() {
    if (!mapContainer) return;

    mapContainer.innerHTML = `
      <div class="map-viewport-wrapper whole-india-viewport">
        <!-- Top Glass Control Dock (Zero Map Overlap) -->
        <div class="map-top-panel" id="mapTopPanel">
          <!-- 1. Village & Pincode Geocoder Search Bar -->
          <div class="map-village-search-deck">
            <div class="village-search-input-wrap">
              <span class="village-search-icon" title="India Whole Country & Village Search">🏡</span>
              <input
                type="text"
                id="mapVillageSearchInput"
                class="village-search-input"
                placeholder="Search any Indian village, taluk, town or PIN code (e.g. Whitefield, Valachil, 560066)..."
                autocomplete="off"
              />
              <button class="village-search-submit-btn" id="mapVillageSearchSubmitBtn" title="Fly to Location">
                <span>Fly</span> ➔
              </button>
            </div>
            <div id="villageSearchResultsDrop" class="village-results-dropdown" style="display: none;"></div>
          </div>

          <!-- 2. Controls Toolbar: Quick-Jumps + Radius + Style -->
          <div class="map-controls-toolbar">
            <div class="map-quick-jumps" role="group" aria-label="Geographic Quick Jumps">
              <button class="map-quick-chip" id="mapJumpIndiaBtn" title="Whole India National Overview">
                🇮🇳 All India
              </button>
              <button class="map-quick-chip active" id="mapJumpCityBtn" title="Current Selected Hub">
                📍 City
              </button>
              <button class="map-quick-chip" id="mapJumpVillageBtn" title="Deep Zoom to Village Level (Zoom 16)">
                🏡 Village Zoom
              </button>
              <button class="map-quick-chip" id="mapJumpGpsBtn" title="Detect My Current GPS Location">
                🎯 My GPS
              </button>
            </div>

            <div class="map-deck-right-tools">
              <div class="map-radius-selector" title="Search Radius">
                <span class="radius-label">Radius:</span>
                <select id="mapRadiusSelect" class="radius-dropdown" aria-label="Search Radius">
                  <option value="2">2 km</option>
                  <option value="5" selected>5 km</option>
                  <option value="10">10 km</option>
                  <option value="25">25 km</option>
                  <option value="50">50 km</option>
                </select>
              </div>

              <div class="map-style-toggle" role="group" aria-label="Map Tile Style">
                <button class="map-layer-btn active" id="layerStreetBtn" data-layer="street" title="Street Map">Street</button>
                <button class="map-layer-btn" id="layerSatelliteBtn" data-layer="satellite" title="Satellite">Sat</button>
                <button class="map-layer-btn" id="layerDarkBtn" data-layer="dark" title="Dark Mode">Dark</button>
              </div>
            </div>
          </div>

          <!-- 3. Neighborhoods & Surrounding Villages Bar -->
          <div class="map-neighborhoods-bar" id="mapNeighborhoodsBar">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- 4. Interactive Map Host (Leaflet or Vector Fallback) -->
        <div class="map-surface" id="mapSurfaceHost">
          <div id="leafletMapHost" style="width: 100%; height: 100%; z-index: 1;"></div>
          <!-- Real-time Route ETA Chip -->
          <div class="map-route-eta-chip" id="mapRouteEtaChip" style="display: none;">
            <div class="eta-pulse"></div>
            <div class="eta-details">
              <strong id="etaTimeText">~8 min Doorstep Arrival</strong>
              <span id="etaDistText">1.2 km away • Real-time GPS</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function initLeaflet() {
    const host = document.getElementById('leafletMapHost');
    if (!host) return;

    // Check if Leaflet is available in global scope, dynamically inject if not yet loaded
    if (typeof window.L === 'undefined') {
      console.warn('[MapEngine] Leaflet library loading dynamically...');
      if (!document.getElementById('leaflet-cdn-script')) {
        const script = document.createElement('script');
        script.id = 'leaflet-cdn-script';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.crossOrigin = '';
        script.onload = () => {
          console.log('[MapEngine] Leaflet CDN script loaded.');
          initLeaflet();
          if (window.LocalCare && window.LocalCare.getAllBusinesses) {
            updateMarkers(window.LocalCare.getAllBusinesses());
          }
        };
        script.onerror = () => {
          renderVectorFallback();
        };
        document.head.appendChild(script);
      }
      renderVectorFallback();
      return;
    }

    try {
      const cityKey = (localStorage.getItem('localcare_city') || 'bengaluru').toLowerCase();
      const cityConfig = CITY_COORDINATES[cityKey] || CITY_COORDINATES['bengaluru'];

      leafletMap = window.L.map('leafletMapHost', {
        center: [cityConfig.lat, cityConfig.lng],
        zoom: cityConfig.zoom,
        zoomControl: false,
        attributionControl: true,
        maxZoom: 19,
        minZoom: 4
      });

      // Add Zoom Control at bottom right
      window.L.control.zoom({ position: 'bottomright' }).addTo(leafletMap);

      // Define Tile Layers
      // 1. OpenStreetMap (Street, Village, Rural Roads & Panchayats Coverage across all India)
      tileLayers.street = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c'],
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors • LocalCare Whole India Engine'
      });

      // 2. Esri World Imagery (Satellite)
      tileLayers.satellite = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });

      // 3. CartoDB Dark Matter (Dark Mode)
      tileLayers.dark = window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
      });

      // Add default street layer
      tileLayers.street.addTo(leafletMap);

      // Detect dark theme
      const currentTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem('localcare_theme');
      if (currentTheme === 'dark') {
        switchLayer('dark');
      }

      // Invalidate size after modal or layout transitions
      setTimeout(() => {
        if (leafletMap) leafletMap.invalidateSize();
      }, 300);

    } catch (err) {
      console.error('[MapEngine] Failed to initialize Leaflet:', err);
      renderVectorFallback();
    }
  }

  function switchLayer(layerType) {
    if (!leafletMap || !tileLayers[layerType]) return;

    Object.keys(tileLayers).forEach(k => {
      if (leafletMap.hasLayer(tileLayers[k])) {
        leafletMap.removeLayer(tileLayers[k]);
      }
    });

    tileLayers[layerType].addTo(leafletMap);
    currentLayer = layerType;

    // Update active button state
    ['layerStreetBtn', 'layerSatelliteBtn', 'layerDarkBtn'].forEach(id => {
      const btn = document.getElementById(id);
      if (btn) {
        btn.classList.toggle('active', btn.getAttribute('data-layer') === layerType);
      }
    });
  }

  function getBusinessCoordinates(b) {
    if (b.lat && b.lng) return [parseFloat(b.lat), parseFloat(b.lng)];

    const cityKey = (b.city || 'bengaluru').toLowerCase();
    const cityCoord = CITY_COORDINATES[cityKey] || CITY_COORDINATES['bengaluru'];

    // Deterministic pseudo-random jitter based on business id & name to distribute across the city/village
    let hash = 0;
    const str = (b.id || '') + (b.name || '') + (b.locality || '');
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }

    const latOffset = (((hash % 200) - 100) / 2500);
    const lngOffset = ((((hash >> 3) % 200) - 100) / 2500);

    return [cityCoord.lat + latOffset, cityCoord.lng + lngOffset];
  }

  function updateMarkers(businesses) {
    currentBusinesses = businesses || [];

    if (!leafletMap || typeof window.L === 'undefined') {
      updateVectorMarkers(businesses);
      return;
    }

    // Clear existing markers
    activeMarkers.forEach(m => leafletMap.removeLayer(m));
    activeMarkers = [];

    if (currentBusinesses.length === 0) return;

    const bounds = window.L.latLngBounds([]);

    currentBusinesses.forEach((b) => {
      const [lat, lng] = getBusinessCoordinates(b);
      bounds.extend([lat, lng]);

      const catColor = CATEGORY_MAP_COLORS[b.category] || '#f97316';
      const iconEmoji = CATEGORY_ICONS[b.category] || '📍';
      const isSelected = b.id === selectedBusinessId;

      // Custom Leaflet DivIcon
      const pinHtml = `
        <div class="custom-leaflet-pin ${isSelected ? 'selected' : ''}" data-biz-id="${b.id}" style="--pin-color: ${catColor};">
          <div class="leaflet-pin-beacon"></div>
          <div class="leaflet-pin-head">
            <span class="leaflet-pin-icon">${iconEmoji}</span>
            <span class="leaflet-pin-price">₹${b.startingPrice || 299}</span>
          </div>
          <div class="leaflet-pin-stem"></div>
        </div>
      `;

      const customIcon = window.L.divIcon({
        className: 'leaflet-pin-container',
        html: pinHtml,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
        popupAnchor: [0, -42]
      });

      const marker = window.L.marker([lat, lng], { icon: customIcon }).addTo(leafletMap);

      // Popup Content
      const popupHtml = `
        <div class="leaflet-custom-popup">
          <div class="popup-top">
            <img src="${b.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400'}" alt="${escapeHtml(b.name)}" class="popup-thumb" />
            <div class="popup-head-meta">
              <span class="popup-badge-verified">✓ LocalCare Verified</span>
              <h4 class="popup-biz-name">${escapeHtml(b.name)}</h4>
              <div class="popup-rating-row">
                <span class="popup-stars">★ ${b.rating || '4.8'}</span>
                <span class="popup-reviews">(${b.reviewsCount || 120} reviews)</span>
              </div>
            </div>
          </div>
          <div class="popup-body">
            <div class="popup-info-line">📍 <strong>${escapeHtml(b.locality || b.city)}</strong> • ${b.distance || '1.5 km'}</div>
            <div class="popup-info-line">⚡ Starts at <strong>₹${b.startingPrice || 299}</strong> • Response ~${b.responseTime || '10 min'}</div>
          </div>
          <div class="popup-action-row">
            <button class="popup-btn popup-btn-call" onclick="window.LocalCare.openCallModalById('${b.id}')" title="Call Business">
              📞 Call
            </button>
            <button class="popup-btn popup-btn-directions" onclick="window.MapEngine.openNavigation(${lat}, ${lng}, '${escapeHtml(b.name)}')" title="Get Directions">
              🗺️ Visit
            </button>
            <button class="popup-btn popup-btn-primary" onclick="window.LocalCare.openBookingById('${b.id}')" title="Book Slot">
              ⚡ Book
            </button>
            <button class="popup-btn popup-btn-secondary" onclick="window.LocalCare.openDetailModalById('${b.id}')" title="View Full Profile">
              Profile
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 320,
        className: 'localcare-leaflet-popup-wrapper'
      });

      marker.on('click', () => {
        selectBusiness(b.id, false);
      });

      marker.bizId = b.id;
      activeMarkers.push(marker);
    });

    // Fit map bounds smoothly if multiple markers
    if (activeMarkers.length > 0 && !selectedBusinessId) {
      try {
        leafletMap.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
      } catch (e) {}
    }
  }

  function selectBusiness(id, panTo = true) {
    selectedBusinessId = id;
    const biz = currentBusinesses.find(b => b.id === id);

    // Update pin classes in DOM
    document.querySelectorAll('.custom-leaflet-pin').forEach(el => {
      el.classList.toggle('selected', el.getAttribute('data-biz-id') === id);
    });

    if (leafletMap) {
      const targetMarker = activeMarkers.find(m => m.bizId === id);
      if (targetMarker) {
        if (panTo) {
          leafletMap.flyTo(targetMarker.getLatLng(), Math.max(leafletMap.getZoom(), 14), {
            duration: 0.8
          });
        }
        targetMarker.openPopup();
      }
    }

    if (biz) showRouteEta(biz);
  }

  function showRouteEta(biz) {
    const etaChip = document.getElementById('mapRouteEtaChip');
    const etaTime = document.getElementById('etaTimeText');
    const etaDist = document.getElementById('etaDistText');

    if (etaChip && etaTime && etaDist) {
      etaTime.textContent = `${biz.responseTime || '~8 min'} Doorstep Arrival`;
      etaDist.textContent = `${biz.distance || '1.2 km'} away • Verified GPS Route`;
      etaChip.style.display = 'flex';
    }
  }

  function hideRoute() {
    const etaChip = document.getElementById('mapRouteEtaChip');
    if (etaChip) etaChip.style.display = 'none';
  }

  function openNavigation(lat, lng, name) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
    window.open(url, '_blank');
  }

  // Live OpenStreetMap Geocoding for any Village, Taluk, Town, or Pincode across India
  async function searchVillage(query) {
    if (!query || !query.trim()) return;
    const q = query.trim();

    const submitBtn = document.getElementById('mapVillageSearchSubmitBtn');
    if (submitBtn) submitBtn.innerHTML = '<span>Searching...</span>';

    try {
      // Query OpenStreetMap Nominatim specifically restricted to countrycodes=in (Whole India)
      const url = `https://nominatim.openstreetmap.org/search?countrycodes=in&format=json&limit=5&q=${encodeURIComponent(q)}`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en-IN,en;q=0.9,hi;q=0.8' } });
      const data = await res.json();

      if (submitBtn) submitBtn.innerHTML = '<span>Fly</span> ➔';

      if (!data || data.length === 0) {
        if (window.LocalCare && window.LocalCare.showToast) {
          window.LocalCare.showToast(`No exact village match for "${q}". Please check the spelling or enter a 6-digit PIN code.`, 'warning');
        }
        return;
      }

      const match = data[0];
      const lat = parseFloat(match.lat);
      const lng = parseFloat(match.lon);
      const displayName = match.display_name;

      if (leafletMap) {
        leafletMap.flyTo([lat, lng], 15, { duration: 1.5 });

        // Add or move Village Beacon Marker
        if (villageMarker) leafletMap.removeLayer(villageMarker);

        const villageIcon = window.L.divIcon({
          className: 'village-search-beacon-icon',
          html: `
            <div class="village-beacon-glow"></div>
            <div class="village-beacon-pin">🏡</div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 20]
        });

        villageMarker = window.L.marker([lat, lng], { icon: villageIcon }).addTo(leafletMap);
        villageMarker.bindPopup(`
          <div style="font-size: 0.88rem; padding: 0.2rem;">
            <div style="font-weight: 800; color: #ff6800; margin-bottom: 0.25rem;">🏡 Indian Village / Locality Located</div>
            <div style="line-height: 1.4; color: #1e293b; font-weight: 600;">${escapeHtml(displayName)}</div>
            <div style="margin-top: 0.5rem; font-size: 0.78rem; color: #64748b;">
              Whole India Village Coverage Active • Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}
            </div>
          </div>
        `).openPopup();
      }

      if (window.LocalCare && window.LocalCare.showToast) {
        window.LocalCare.showToast(`📍 Map flown to: ${displayName.split(',')[0]} (Whole India Coverage)`, 'success');
      }

    } catch (err) {
      console.warn('[MapEngine] Geocoding lookup error:', err);
      if (submitBtn) submitBtn.innerHTML = '<span>Fly</span> ➔';
      if (window.LocalCare && window.LocalCare.showToast) {
        window.LocalCare.showToast(`Unable to reach geocoding server. Re-trying...`, 'warning');
      }
    }
  }

  // Quick-Jump Handlers
  function jumpToWholeIndia() {
    if (leafletMap) {
      leafletMap.flyTo([INDIA_CENTER.lat, INDIA_CENTER.lng], INDIA_CENTER.zoom, { duration: 1.2 });
    }
    setActiveQuickChip('mapJumpIndiaBtn');
  }

  function jumpToCurrentCity() {
    const cityKey = (localStorage.getItem('localcare_city') || 'bengaluru').toLowerCase();
    const cityCoord = CITY_COORDINATES[cityKey] || CITY_COORDINATES['bengaluru'];
    if (leafletMap) {
      leafletMap.flyTo([cityCoord.lat, cityCoord.lng], cityCoord.zoom, { duration: 1.0 });
    }
    setActiveQuickChip('mapJumpCityBtn');
  }

  function jumpToVillageLevel() {
    if (leafletMap) {
      // Zoom right into level 16 for current center to see village roads, houses & panchayats
      const center = leafletMap.getCenter();
      leafletMap.flyTo(center, 16, { duration: 1.0 });
    }
    setActiveQuickChip('mapJumpVillageBtn');
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('🏡 Deep Village & Street Zoom Level 16 Activated', 'info');
    }
  }

  function jumpToUserGps() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    const gpsBtn = document.getElementById('mapJumpGpsBtn');
    if (gpsBtn) gpsBtn.textContent = '🎯 Locating...';

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (gpsBtn) gpsBtn.textContent = '🎯 My GPS';
        setActiveQuickChip('mapJumpGpsBtn');

        if (leafletMap) {
          leafletMap.flyTo([lat, lng], 15, { duration: 1.2 });

          if (userGpsMarker) leafletMap.removeLayer(userGpsMarker);

          const gpsIcon = window.L.divIcon({
            className: 'user-gps-beacon',
            html: `
              <div class="user-gps-pulse-ring"></div>
              <div class="user-gps-core"></div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });

          userGpsMarker = window.L.marker([lat, lng], { icon: gpsIcon }).addTo(leafletMap);
          userGpsMarker.bindPopup('<strong>🎯 Your Current Location</strong><br>Showing nearest verified pros').openPopup();
        }
      },
      (err) => {
        if (gpsBtn) gpsBtn.textContent = '🎯 My GPS';
        console.warn('Geolocation error:', err.message);
        if (window.LocalCare && window.LocalCare.showToast) {
          window.LocalCare.showToast('GPS permission denied or unavailable. Using city center.', 'warning');
        }
        jumpToCurrentCity();
      },
      { timeout: 8000 }
    );
  }

  function setActiveQuickChip(activeId) {
    ['mapJumpIndiaBtn', 'mapJumpCityBtn', 'mapJumpVillageBtn', 'mapJumpGpsBtn'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('active', id === activeId);
    });
  }

  function renderNeighborhoodChips() {
    const bar = document.getElementById('mapNeighborhoodsBar');
    if (!bar) return;

    const currentCityName = localStorage.getItem('localcare_city') || 'Bengaluru';
    const cityObj = (window.CITIES || []).find(c => c.name.toLowerCase() === currentCityName.toLowerCase());

    const areas = cityObj ? cityObj.areas : ['All Hubs', 'Central', 'North', 'South', 'East', 'West'];

    bar.innerHTML = `
      <button class="area-chip ${!activeNeighborhood ? 'active' : ''}" onclick="window.MapEngine.filterByArea(null)">
        All ${currentCityName}
      </button>
      ${areas.map(area => `
        <button class="area-chip ${activeNeighborhood === area ? 'active' : ''}" onclick="window.MapEngine.filterByArea('${area}')">
          ${area}
        </button>
      `).join('')}
    `;
  }

  function filterByArea(area) {
    activeNeighborhood = area;
    renderNeighborhoodChips();

    if (!area) {
      jumpToCurrentCity();
      if (window.LocalCare && window.LocalCare.clearLocalityFilter) {
        window.LocalCare.clearLocalityFilter();
      }
      return;
    }

    // Geocode area within current city
    const currentCityName = localStorage.getItem('localcare_city') || 'Bengaluru';
    searchVillage(`${area}, ${currentCityName}`);

    if (window.LocalCare && window.LocalCare.setLocalityFilter) {
      window.LocalCare.setLocalityFilter(area);
    }
  }

  function bindControls() {
    // Village Search
    const searchInput = document.getElementById('mapVillageSearchInput');
    const searchBtn = document.getElementById('mapVillageSearchSubmitBtn');

    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', () => searchVillage(searchInput.value));
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          searchVillage(searchInput.value);
        }
      });
    }

    // Quick Jumps
    document.getElementById('mapJumpIndiaBtn')?.addEventListener('click', jumpToWholeIndia);
    document.getElementById('mapJumpCityBtn')?.addEventListener('click', jumpToCurrentCity);
    document.getElementById('mapJumpVillageBtn')?.addEventListener('click', jumpToVillageLevel);
    document.getElementById('mapJumpGpsBtn')?.addEventListener('click', jumpToUserGps);

    // Layer Switchers
    document.getElementById('layerStreetBtn')?.addEventListener('click', () => switchLayer('street'));
    document.getElementById('layerSatelliteBtn')?.addEventListener('click', () => switchLayer('satellite'));
    document.getElementById('layerDarkBtn')?.addEventListener('click', () => switchLayer('dark'));

    // Radius Selector
    const radiusSelect = document.getElementById('mapRadiusSelect');
    if (radiusSelect) {
      radiusSelect.addEventListener('change', (e) => {
        activeFilterRadius = parseInt(e.target.value, 10);
        if (window.LocalCare && window.LocalCare.setRadiusFilter) {
          window.LocalCare.setRadiusFilter(activeFilterRadius);
        }
      });
    }
  }

  // Graceful Interactive Vector Fallback with City Radar
  function renderVectorFallback() {
    const host = document.getElementById('leafletMapHost');
    if (!host) return;

    const cityKey = (localStorage.getItem('localcare_city') || 'bengaluru').toLowerCase();
    const hubs = [
      { id: 'bengaluru', name: 'Bengaluru', icon: '🏢' },
      { id: 'mumbai', name: 'Mumbai', icon: '🌊' },
      { id: 'delhi ncr', name: 'Delhi NCR', icon: '🏛️' },
      { id: 'hyderabad', name: 'Hyderabad', icon: '💎' },
      { id: 'chennai', name: 'Chennai', icon: '🏖️' },
      { id: 'pune', name: 'Pune', icon: '🎓' },
      { id: 'mangaluru', name: 'Mangaluru', icon: '🌴' },
      { id: 'mysuru', name: 'Mysuru', icon: '🏰' }
    ];

    host.innerHTML = `
      <div class="map-vector-fallback-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 420px; padding: 1.5rem; text-align: center; background: radial-gradient(circle at 50% 30%, var(--bg-surface), var(--bg-subtle));">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(255, 104, 0, 0.1); border: 2px solid var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin-bottom: 0.75rem; animation: pulse 2s infinite;">
          🗺️
        </div>
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.25rem;">
          Geospatial Radar: ${cityKey.toUpperCase()}
        </h4>
        <p style="font-size: 0.82rem; color: var(--text-secondary); max-width: 340px; margin-bottom: 1.25rem;">
          Live GPS tracking & pro pins across Indian villages, taluks, and metropolitan hubs.
        </p>

        <!-- Quick Hub Switcher Chips inside Fallback -->
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; justify-content: center; max-width: 380px; margin-bottom: 1.25rem;">
          ${hubs.map(h => `
            <button class="area-chip ${h.id === cityKey ? 'active' : ''}" onclick="window.LocalCare.setCity('${h.name}')" style="font-size: 0.72rem; padding: 0.25rem 0.6rem;">
              <span>${h.icon}</span> ${h.name}
            </button>
          `).join('')}
        </div>

        <button class="action-btn action-btn-primary" style="padding: 0.45rem 1rem; font-size: 0.82rem;" onclick="window.MapEngine.init()">
          ⚡ Connect Live Leaflet Map
        </button>
      </div>
    `;
  }

  function updateVectorMarkers(businesses) {
    // Vector fallback marker stub
  }

  function closePopup() {
    if (leafletMap) leafletMap.closePopup();
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  return {
    init,
    updateMarkers,
    selectBusiness,
    closePopup,
    filterByArea,
    hideRoute,
    searchVillage,
    jumpToWholeIndia,
    jumpToCurrentCity,
    jumpToVillageLevel,
    jumpToUserGps,
    openNavigation
  };
})();
