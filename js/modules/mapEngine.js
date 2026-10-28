/* ==========================================================================
   Local Care - Interactive Vector Map Engine 2.0 Module
   High-performance vector map with two-way list-map synchronization,
   animated route tracing, neighborhood quick-zoom pills, traffic layers,
   category markers, interactive popups, radius filters, and map abstraction
   ========================================================================== */

window.MapEngine = (function () {
  'use strict';

  let currentBusinesses = [];
  let selectedBusinessId = null;
  let currentZoom = 1;
  let mapContainer = null;
  let activeFilterRadius = 5; // km
  let activeNeighborhood = null;

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
    bindControls();
    renderNeighborhoodChips();
  }

  function renderMapShell() {
    if (!mapContainer) return;

    mapContainer.innerHTML = `
      <div class="map-viewport-wrapper">
        <!-- Clean Dedicated Map Header Deck (Zero Overlap) -->
        <div class="map-header-deck">
          <div class="map-deck-controls-row">
            <div class="map-control-group">
              <button class="map-btn" id="mapZoomInBtn" title="Zoom In">+</button>
              <button class="map-btn" id="mapZoomOutBtn" title="Zoom Out">−</button>
              <button class="map-btn" id="mapRecenterBtn" title="Reset View">🎯</button>
            </div>

            <div class="map-radius-selector" title="Search Radius">
              <span class="radius-label">Radius:</span>
              <select id="mapRadiusSelect" class="radius-dropdown">
                <option value="2">2 km</option>
                <option value="5" selected>5 km</option>
                <option value="10">10 km</option>
                <option value="25">25 km</option>
              </select>
            </div>

            <div class="map-style-toggle">
              <button class="map-layer-btn active" id="layerVectorBtn">Street</button>
              <button class="map-layer-btn" id="layerSatelliteBtn">Satellite</button>
            </div>
          </div>

          <!-- Neighborhood Quick-Filter Strip -->
          <div class="map-neighborhoods-bar" id="mapNeighborhoodsBar">
            <!-- Populated dynamically -->
          </div>
        </div>

        <!-- Vector SVG Map Surface -->
        <div class="map-surface" id="mapSurface">
          <svg class="map-vector-svg" id="mapSvg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <!-- Defs: Gradients and Markers -->
            <defs>
              <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="0.7" class="map-grid-line" />
              </pattern>
              <radialGradient id="userRadarGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.45" />
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
              </radialGradient>
              <linearGradient id="routeTraceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#2563eb" />
                <stop offset="100%" stop-color="#f97316" />
              </linearGradient>
            </defs>

            <!-- Base Grid & Background -->
            <rect width="100%" height="100%" class="map-bg-rect" />
            <rect width="100%" height="100%" fill="url(#mapGrid)" />

            <!-- Stylized Roads and Water Bodies -->
            <g class="map-terrain-features">
              <!-- Water Stream / Lake -->
              <path d="M 0,220 C 150,240 280,180 450,250 C 600,310 720,280 800,320 L 800,360 C 680,310 520,330 380,270 C 220,210 100,280 0,250 Z" class="map-water" />
              
              <!-- Highway Arteries -->
              <path d="M 50,0 Q 250,280 420,340 T 780,600" class="map-road-highway" />
              <path d="M 750,0 Q 520,240 380,380 T 50,550" class="map-road-highway" />
              <path d="M 0,420 Q 320,440 600,380 T 800,450" class="map-road-arterial" />
              <path d="M 280,0 L 310,600" class="map-road-arterial" />
              <path d="M 520,0 L 540,600" class="map-road-arterial" />

              <!-- Landmarks / Parks -->
              <rect x="180" y="80" width="90" height="70" rx="12" class="map-park" />
              <rect x="480" y="400" width="110" height="90" rx="16" class="map-park" />
              <text x="225" y="120" class="map-park-label" text-anchor="middle">Central Green Park</text>
              <text x="535" y="450" class="map-park-label" text-anchor="middle">Tech Valley Zone</text>
            </g>

            <!-- Dynamic Active Route Line (drawn when pin selected) -->
            <path id="mapDynamicRoute" d="" fill="none" stroke="url(#routeTraceGrad)" stroke-width="4.5" stroke-dasharray="8 5" class="animated-route-line" style="display: none;" />

            <!-- Moving Live Technician Marker -->
            <g id="mapMovingTechPin" transform="translate(260, 220)">
              <circle r="12" fill="rgba(249, 115, 22, 0.3)" class="radar-pulse-ring" />
              <circle r="9" fill="#f97316" stroke="#ffffff" stroke-width="2" />
              <text y="3" text-anchor="middle" font-size="9">🏍️</text>
            </g>

            <!-- User Live Location Radar -->
            <g id="userLocationPin" transform="translate(400, 300)">
              <circle r="48" fill="url(#userRadarGlow)" class="radar-pulse-ring" />
              <circle r="14" fill="#3b82f6" stroke="#ffffff" stroke-width="3" class="user-pulse-dot" />
              <circle r="5" fill="#ffffff" />
              <text y="28" text-anchor="middle" class="user-loc-label">Your Location</text>
            </g>

            <!-- Markers Dynamic Container -->
            <g id="mapMarkersLayer"></g>
          </svg>

          <!-- Interactive Route ETA Float Banner -->
          <div class="map-route-eta-chip" id="mapRouteEtaChip" style="display: none;">
            <span class="route-icon">🏍️</span>
            <div>
              <strong id="mapEtaTime">~8 Mins Doorstep Arrival</strong>
              <small id="mapEtaDist">1.4 km via Main Arterial Road</small>
            </div>
          </div>

          <!-- Interactive Marker Popup Preview -->
          <div class="map-marker-popup" id="mapMarkerPopup" style="display: none;"></div>
        </div>

        <div class="map-footer-badge">
          <span>📍 Live Vector Map Engine 2.0</span>
          <span id="mapCountBadge">0 Businesses Nearby</span>
        </div>
      </div>
    `;

    startMovingTechAnimation();
  }

  function startMovingTechAnimation() {
    let t = 0;
    setInterval(() => {
      t = (t + 0.006) % 1;
      const marker = document.getElementById('mapMovingTechPin');
      if (marker) {
        // Parametric path along highway
        const x = Math.round(150 + t * 450);
        const y = Math.round(180 + Math.sin(t * Math.PI * 2) * 60 + t * 150);
        marker.setAttribute('transform', `translate(${x}, ${y})`);
      }
    }, 50);
  }

  function renderNeighborhoodChips() {
    const bar = document.getElementById('mapNeighborhoodsBar');
    if (!bar) return;

    const city = localStorage.getItem('localcare_city') || 'Bengaluru';
    const cityData = (typeof CITIES !== 'undefined') ? CITIES.find(c => c.name.toLowerCase() === city.toLowerCase()) : null;
    const areas = cityData ? cityData.areas : ['Central', 'North', 'South', 'East'];

    bar.innerHTML = `
      <button class="area-chip ${!activeNeighborhood ? 'active' : ''}" onclick="window.MapEngine.filterByArea(null)">
        All ${city}
      </button>
      ${areas.slice(0, 5).map(area => `
        <button class="area-chip ${activeNeighborhood === area ? 'active' : ''}" onclick="window.MapEngine.filterByArea('${area}')">
          📍 ${area}
        </button>
      `).join('')}
    `;
  }

  function filterByArea(area) {
    activeNeighborhood = area;
    renderNeighborhoodChips();
    if (window.SoundFX) window.SoundFX.playClick();

    if (window.LocalCare) {
      if (area) {
        window.LocalCare.searchFromMapArea(area);
        window.LocalCare.showToast(`Focused on ${area}`, 'info');
      } else {
        window.LocalCare.clearSearch();
      }
    }
  }

  function bindControls() {
    document.getElementById('mapZoomInBtn')?.addEventListener('click', () => {
      currentZoom = Math.min(1.8, currentZoom + 0.2);
      applyZoom();
      if (window.SoundFX) window.SoundFX.playClick();
    });

    document.getElementById('mapZoomOutBtn')?.addEventListener('click', () => {
      currentZoom = Math.max(0.7, currentZoom - 0.2);
      applyZoom();
      if (window.SoundFX) window.SoundFX.playClick();
    });

    document.getElementById('mapRecenterBtn')?.addEventListener('click', () => {
      currentZoom = 1;
      applyZoom();
      closePopup();
      hideRoute();
      if (window.SoundFX) window.SoundFX.playClick();
    });

    document.getElementById('mapRadiusSelect')?.addEventListener('change', (e) => {
      activeFilterRadius = parseInt(e.target.value, 10);
      if (window.LocalCare && window.LocalCare.filterByRadius) {
        window.LocalCare.filterByRadius(activeFilterRadius);
      }
    });

    const vectorBtn = document.getElementById('layerVectorBtn');
    const satBtn = document.getElementById('layerSatelliteBtn');

    vectorBtn?.addEventListener('click', () => {
      vectorBtn.classList.add('active');
      satBtn.classList.remove('active');
      mapContainer?.classList.remove('satellite-mode');
      if (window.SoundFX) window.SoundFX.playClick();
    });

    satBtn?.addEventListener('click', () => {
      satBtn.classList.add('active');
      vectorBtn.classList.remove('active');
      mapContainer?.classList.add('satellite-mode');
      if (window.SoundFX) window.SoundFX.playClick();
    });
  }

  function applyZoom() {
    const surface = document.getElementById('mapSvg');
    if (surface) {
      surface.style.transform = `scale(${currentZoom})`;
      surface.style.transformOrigin = 'center center';
    }
  }

  function updateMarkers(businesses) {
    currentBusinesses = businesses;
    const layer = document.getElementById('mapMarkersLayer');
    const countBadge = document.getElementById('mapCountBadge');
    if (!layer) return;

    renderNeighborhoodChips();

    if (countBadge) {
      countBadge.textContent = `${businesses.length} Verified in Map Radius`;
    }

    if (businesses.length === 0) {
      layer.innerHTML = '';
      closePopup();
      hideRoute();
      return;
    }

    // Distribute markers deterministically across the 800x600 SVG plane around center (400, 300)
    layer.innerHTML = businesses.map((b, idx) => {
      const angle = (idx / Math.max(1, businesses.length)) * 2 * Math.PI + (idx * 0.4);
      const distRatio = 0.28 + ((idx % 4) * 0.17);
      const radiusX = 290 * distRatio;
      const radiusY = 210 * distRatio;

      const posX = Math.round(400 + Math.cos(angle) * radiusX);
      const posY = Math.round(300 + Math.sin(angle) * radiusY);

      const color = CATEGORY_MAP_COLORS[b.category] || '#4f46e5';
      const icon = CATEGORY_ICONS[b.category] || '📍';
      const isSelected = b.id === selectedBusinessId;

      return `
        <g class="map-marker-pin ${isSelected ? 'selected' : ''}" 
           data-id="${b.id}" 
           data-x="${posX}"
           data-y="${posY}"
           transform="translate(${posX}, ${posY})" 
           tabindex="0" 
           role="button" 
           aria-label="${b.name}">
          <!-- Drop Shadow -->
          <ellipse cx="0" cy="18" rx="10" ry="4" fill="rgba(0,0,0,0.25)" class="marker-shadow" />
          
          <!-- Radar ring for high-rated / verified -->
          ${b.superSeller ? '<circle r="22" fill="none" stroke="' + color + '" stroke-width="1.5" class="radar-pulse-ring" />' : ''}

          <!-- Pin Body -->
          <path d="M 0,0 C -14,-14 -14,-34 0,-44 C 14,-34 14,-14 0,0 Z" 
                fill="${color}" 
                stroke="#ffffff" 
                stroke-width="2.5" 
                class="pin-head" />
          
          <!-- Category Emoji Badge -->
          <circle cx="0" cy="-26" r="10" fill="#ffffff" />
          <text x="0" y="-22" font-size="11" text-anchor="middle" dominant-baseline="middle">${icon}</text>

          <!-- Marker Pill Label -->
          <g class="marker-label-bubble">
            <rect x="-48" y="-62" width="96" height="18" rx="9" fill="var(--bg-surface)" stroke="var(--border-subtle)" stroke-width="1" />
            <text x="0" y="-50" font-size="9" font-weight="700" text-anchor="middle" fill="var(--text-primary)">${escapeHtml(b.name.slice(0, 14))}</text>
          </g>
        </g>
      `;
    }).join('');

    // Attach click and hover listeners
    layer.querySelectorAll('.map-marker-pin').forEach(pin => {
      const id = pin.getAttribute('data-id');
      const b = businesses.find(item => item.id === id);

      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        selectBusiness(id, true);
        if (window.SoundFX) window.SoundFX.playClick();
      });

      pin.addEventListener('mouseenter', () => {
        if (b) showPopup(b, pin);
      });
    });
  }

  function selectBusiness(id, scrollToListing = false) {
    selectedBusinessId = id;
    const layer = document.getElementById('mapMarkersLayer');
    if (!layer) return;

    layer.querySelectorAll('.map-marker-pin').forEach(pin => {
      pin.classList.toggle('selected', pin.getAttribute('data-id') === id);
    });

    const b = currentBusinesses.find(item => item.id === id);
    if (b) {
      const pin = layer.querySelector(`[data-id="${id}"]`);
      if (pin) {
        showPopup(b, pin);
        drawRouteToPin(pin, b);
      }

      if (scrollToListing) {
        const card = document.querySelector(`.business-card[data-id="${id}"]`);
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
          card.classList.add('map-highlighted');
          setTimeout(() => card.classList.remove('map-highlighted'), 2500);
        }
      }
    }
  }

  function drawRouteToPin(pin, business) {
    const route = document.getElementById('mapDynamicRoute');
    const etaChip = document.getElementById('mapRouteEtaChip');
    const etaTime = document.getElementById('mapEtaTime');
    const etaDist = document.getElementById('mapEtaDist');

    if (!route || !pin) return;

    const targetX = parseInt(pin.getAttribute('data-x') || '400', 10);
    const targetY = parseInt(pin.getAttribute('data-y') || '300', 10);
    const startX = 400;
    const startY = 300;

    // Curved Bezier route
    const midX = (startX + targetX) / 2 + (targetY > startY ? 40 : -40);
    const midY = (startY + targetY) / 2 + (targetX > startX ? -30 : 30);
    const d = `M ${startX},${startY} Q ${midX},${midY} ${targetX},${targetY}`;

    route.setAttribute('d', d);
    route.style.display = 'block';

    if (etaChip && etaTime && etaDist) {
      etaTime.textContent = `${business.responseTime || '~8 min'} Doorstep Arrival`;
      etaDist.textContent = `${business.distance || '1.2 km'} away • Verified Route`;
      etaChip.style.display = 'flex';
    }
  }

  function hideRoute() {
    const route = document.getElementById('mapDynamicRoute');
    const etaChip = document.getElementById('mapRouteEtaChip');
    if (route) route.style.display = 'none';
    if (etaChip) etaChip.style.display = 'none';
  }

  function showPopup(b, pinElement) {
    const popup = document.getElementById('mapMarkerPopup');
    if (!popup) return;

    popup.innerHTML = `
      <div class="popup-inner">
        <button class="popup-close-btn" onclick="window.MapEngine.closePopup()">✕</button>
        <img src="${b.image}" alt="${b.name}" class="popup-thumb" />
        <div class="popup-info">
          <div class="popup-title">${escapeHtml(b.name)}</div>
          <div class="popup-rating">★ ${b.rating} <span style="color: var(--text-muted);">(${b.reviewsCount})</span> • <strong>${b.distance}</strong></div>
          <div class="popup-price">Starts at ₹${b.startingPrice || 299} • ${b.locality}</div>
          <div class="popup-actions">
            <button class="popup-btn-book" onclick="window.LocalCare.openBookingById('${b.id}')">Book</button>
            <button class="popup-btn-view" onclick="window.LocalCare.openDetailModalById('${b.id}')">Profile</button>
            <button class="popup-btn-compare" onclick="window.ProComparison.toggleCompare('${b.id}')">⚖️ Compare</button>
          </div>
        </div>
      </div>
    `;

    popup.style.display = 'block';
  }

  function closePopup() {
    const popup = document.getElementById('mapMarkerPopup');
    if (popup) popup.style.display = 'none';
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
    hideRoute
  };
})();
