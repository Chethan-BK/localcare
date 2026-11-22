/* ==========================================================================
   Local Care - Real-Time Service Tracking Engine Module
   Uber/Swiggy style live doorstep tracking with moving technician pin,
   live countdown ETA, technician profile, and service start OTP verification
   ========================================================================== */

window.TrackingEngine = (function () {
  'use strict';

  let currentTrackingBooking = null;
  let moveInterval = null;
  let currentStepIndex = 0;
  let trackingMap = null;
  let trackingTileLayers = {};
  let currentLayerType = 'street';
  let trackingTechMarker = null;
  let trackingHomeMarker = null;
  let trackingRouteLines = [];

  // Realistic Koramangala, Bengaluru GPS route coordinates
  const REALISTIC_GPS_ROUTE = [
    [12.9270, 77.6185], // 0. Hub Start (Koramangala 1st Block)
    [12.9284, 77.6202], // 1.
    [12.9298, 77.6219], // 2. Turning towards 80ft Road
    [12.9312, 77.6236], // 3. Turning onto 80ft Road
    [12.9328, 77.6254], // 4. Passing Sony World Signal
    [12.9344, 77.6270], // 5.
    [12.9356, 77.6284], // 6. Entering Koramangala 4th Block
    [12.9368, 77.6296], // 7. 5th Cross Junction
    [12.9376, 77.6304], // 8. Approaching doorstep
    [12.9382, 77.6309]  // 9. Destination Doorstep: 42, 5th Cross, Koramangala 4th Block
  ];

  const GPS_NAV_STEPS = [
    { action: "Head north on 1st Main Rd", sub: "Towards 80 Feet Road • 300m", speed: "32 km/h", icon: "↑" },
    { action: "In 150m, turn right onto 80ft Road", sub: "Pass by Sony World Signal • 450m", speed: "28 km/h", icon: "⮡" },
    { action: "Continue straight on 80ft Road", sub: "Traffic is clear • Smooth flow", speed: "35 km/h", icon: "↑" },
    { action: "In 200m, turn left into 4th Block", sub: "Pass by Post Office Junction", speed: "24 km/h", icon: "⮠" },
    { action: "Turn right onto 5th Cross Road", sub: "Destination in 80m on right", speed: "18 km/h", icon: "⮡" },
    { action: "Arrived at Customer Doorstep", sub: "42, 5th Cross, Koramangala 4th Block", speed: "0 km/h", icon: "✓" }
  ];

  function init() {
    renderTrackingModalShell();
    renderTechCallDialog();
    renderTechChatDialog();
  }

  function renderTrackingModalShell() {
    if (document.getElementById('trackingDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'trackingDialog';
    dialog.className = 'app-dialog tracking-dialog';
    dialog.setAttribute('aria-labelledby', 'trackingTitle');
    dialog.innerHTML = `
      <div class="dialog-content-wrapper tracking-modal-wrapper">
        <div class="dialog-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span class="pulse-dot" style="background: var(--primary);"></span>
            <div>
              <h3 class="dialog-title" id="trackingTitle">Live Service Tracking</h3>
              <small id="trackBookingId" style="color: var(--text-muted); font-weight: 600;">Booking ID: LC-BK-9481</small>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('trackingDialog').close()" aria-label="Close tracking modal">✕</button>
        </div>

        <div class="dialog-body tracking-modal-body" style="padding: 0;">
          <!-- Realistic Interactive Google Maps Navigation Surface -->
          <div class="tracking-map-surface" id="trackingMapSurface">
            <!-- 1. Real Leaflet Canvas with Google Maps / Carto Voyager Street & Satellite Tiles -->
            <div id="trackingLeafletMapHost" class="tracking-leaflet-host" style="width: 100%; height: 100%; position: absolute; inset: 0; z-index: 1;"></div>

            <!-- Realistic Google Maps SVG Vector Fallback (displays while tiles load or offline) -->
            <svg class="tracking-vector-map gmap-svg-theme" id="trackingVectorFallback" viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice" style="display: none; width: 100%; height: 100%; position: absolute; inset: 0; z-index: 1;">
              <!-- Google Maps Street Network & Landscape -->
              <rect width="100%" height="100%" fill="#f1f3f4" />
              <!-- Green Park Blocks -->
              <rect x="25" y="25" width="130" height="95" rx="8" fill="#d2e3fc" opacity="0.4" />
              <rect x="40" y="40" width="100" height="70" rx="8" fill="#ceead6" />
              <text x="90" y="80" font-size="9" fill="#137333" font-weight="700" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto">Koramangala Park</text>
              <rect x="410" y="145" width="170" height="90" rx="8" fill="#ceead6" />
              <text x="495" y="195" font-size="9" fill="#137333" font-weight="700" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto">Regional Sports Complex</text>
              <!-- Water Body -->
              <path d="M 0,230 Q 200,210 350,240 T 600,225" stroke="#c2e7ff" stroke-width="18" fill="none" />
              <!-- Secondary Streets -->
              <path d="M 0,50 L 600,50" stroke="#ffffff" stroke-width="8" />
              <path d="M 0,200 L 600,200" stroke="#ffffff" stroke-width="8" />
              <path d="M 120,0 L 120,260" stroke="#ffffff" stroke-width="8" />
              <path d="M 330,0 L 330,260" stroke="#ffffff" stroke-width="8" />
              <!-- Google Major Arteries -->
              <path d="M 0,130 L 600,130" stroke="#ffffff" stroke-width="18" />
              <path d="M 0,130 L 600,130" stroke="#fdd663" stroke-width="12" />
              <text x="240" y="126" font-size="8.5" fill="#5f6368" font-weight="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto">80 FEET ROAD</text>
              <path d="M 210,0 L 210,260" stroke="#ffffff" stroke-width="18" />
              <path d="M 210,0 L 210,260" stroke="#fdd663" stroke-width="12" />
              <text x="216" y="55" font-size="8" fill="#5f6368" font-weight="800" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto" transform="rotate(90, 216, 55)">100FT ROAD</text>
              <path d="M 450,0 L 450,260" stroke="#ffffff" stroke-width="14" />
              <path d="M 450,0 L 450,260" stroke="#fef7e0" stroke-width="9" />
              <text x="456" y="70" font-size="8" fill="#5f6368" font-weight="700" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto" transform="rotate(90, 456, 70)">5TH CROSS RD</text>
              <!-- Google Maps Blue Navigation Route Line -->
              <path d="M 90,195 C 190,195 210,130 450,90" stroke="#1a73e8" stroke-width="9" stroke-linecap="round" fill="none" />
              <path d="M 90,195 C 190,195 210,130 450,90" stroke="#4285F4" stroke-width="5" stroke-linecap="round" fill="none" />
              <!-- Destination Pin -->
              <g transform="translate(450, 90)">
                <ellipse cx="0" cy="14" rx="8" ry="3" fill="rgba(0,0,0,0.25)" />
                <path d="M 0,0 C -8,-14 -12,-22 0,-32 C 12,-22 8,-14 0,0 Z" fill="#ea4335" />
                <circle cx="0" cy="-20" r="5" fill="#ffffff" />
                <text x="0" y="-17" text-anchor="middle" font-size="7">🏠</text>
                <text x="0" y="-36" text-anchor="middle" font-size="8.5" font-weight="800" fill="#202124">Your Home</text>
              </g>
              <!-- Moving Scooter -->
              <g id="trackTechMarkerSvg" transform="translate(230, 150)">
                <circle r="18" fill="rgba(66, 133, 244, 0.25)" class="radar-pulse-ring" />
                <circle r="13" fill="#ffffff" stroke="#1a73e8" stroke-width="2.5" />
                <text y="4" text-anchor="middle" font-size="12">🛵</text>
              </g>
            </svg>

            <!-- 2. Google Maps Turn-by-Turn Green Navigation HUD -->
            <div class="gmap-turn-hud">
              <div class="gmap-turn-icon-box">
                <span class="gmap-turn-arrow" id="gmapTurnIcon">⮡</span>
              </div>
              <div class="gmap-turn-info">
                <div class="gmap-turn-action" id="gmapTurnAction">In 200m, turn right onto 80ft Road</div>
                <div class="gmap-turn-sub" id="gmapTurnSub">Fastest route • Typical traffic</div>
              </div>
              <div class="gmap-turn-speed" id="gmapSpeedBadge">28 km/h</div>
            </div>

            <!-- 3. Google Maps Floating Tools (Layer Toggle + Recenter) -->
            <div class="gmap-floating-tools">
              <div class="gmap-layer-pill">
                <button type="button" class="gmap-layer-btn active" id="gmapBtnStreet" onclick="window.TrackingEngine.switchMapStyle('street')">Map</button>
                <button type="button" class="gmap-layer-btn" id="gmapBtnSat" onclick="window.TrackingEngine.switchMapStyle('satellite')">Satellite</button>
              </div>
              <button type="button" class="gmap-recenter-btn" onclick="window.TrackingEngine.recenterRoute()" title="Recenter View">🎯</button>
            </div>

            <!-- 4. ETA Badge Floating Over Map -->
            <div class="track-eta-banner">
              <div class="eta-time-group">
                <span class="eta-label">ESTIMATED ARRIVAL</span>
                <span class="eta-clock" id="trackEtaDisplay">11 Mins</span>
              </div>
              <div class="eta-status-pill">
                <span class="pulse-dot"></span> On The Way
              </div>
            </div>
          </div>

          <!-- Service Stepper Progress -->
          <div class="track-stepper-container">
            <div class="track-step-node completed">
              <div class="node-circle">✓</div>
              <span class="node-text">Confirmed</span>
            </div>
            <div class="node-line completed"></div>
            <div class="track-step-node completed">
              <div class="node-circle">✓</div>
              <span class="node-text">Assigned</span>
            </div>
            <div class="node-line completed"></div>
            <div class="track-step-node active">
              <div class="node-circle">🏍️</div>
              <span class="node-text">On The Way</span>
            </div>
            <div class="node-line"></div>
            <div class="track-step-node">
              <div class="node-circle">🔧</div>
              <span class="node-text">Service Started</span>
            </div>
            <div class="node-line"></div>
            <div class="track-step-node">
              <div class="node-circle">⭐</div>
              <span class="node-text">Completed</span>
            </div>
          </div>

          <!-- Technician & Safety Verification Card -->
          <div class="track-details-padding">
            <div class="tech-profile-card">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Technician" class="tech-avatar" id="trackTechPhoto" />
              <div class="tech-info-column">
                <div class="tech-name-row">
                  <h4 class="tech-name" id="trackTechName">Suresh Gowda</h4>
                  <span class="rating-tag">★ 4.9 (420+ trips)</span>
                </div>
                <div class="tech-vehicle" id="trackTechVehicle">Vehicle: KA-01-EA-4921 (Hero Splendor)</div>
                <div class="tech-trust-pill">🛡️ Police Verified • Mask & Sanitizer Equipped</div>
              </div>
              <div class="tech-actions-column">
                <button type="button" class="btn-tech-contact btn-tech-call" id="trackTechCallBtn" onclick="window.TrackingEngine.openTechCall()" title="Call Technician via LocalCare Bridge">📞</button>
                <button type="button" class="btn-tech-contact btn-tech-wa" id="trackTechWaBtn" onclick="window.TrackingEngine.openTechChat()" title="Chat with Technician">💬</button>
              </div>
            </div>

            <!-- Start OTP Card -->
            <div class="track-otp-strip" id="trackOtpStripCard">
              <div>
                <span class="otp-strip-label">Service Start OTP</span>
                <span class="otp-strip-code" id="trackOtpDisplay">5192</span>
              </div>
              <p class="otp-strip-desc">Do not share this PIN until the technician physically reaches your doorstep.</p>
            </div>

            <!-- Service Details Summary -->
            <div class="track-service-summary">
              <div class="summary-line">
                <span class="text-muted">Service Booked:</span>
                <strong id="trackServiceName">Split AC Power Jet Servicing</strong>
              </div>
              <div class="summary-line">
                <span class="text-muted">Destination Address:</span>
                <span id="trackAddress">42, 5th Cross, Koramangala 4th Block, Bengaluru</span>
              </div>
              <div class="summary-line">
                <span class="text-muted">Payment:</span>
                <strong class="text-success">Paid via UPI (Buyer Protection Active)</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog-footer tracking-modal-footer">
          <button type="button" class="action-btn action-btn-outline" style="border-color: var(--primary); color: var(--primary);" onclick="window.TrackingEngine.simulateDoorstepArrival()">
            ⚡ Simulate Doorstep Arrival
          </button>
          <button type="button" class="action-btn action-btn-ghost" onclick="window.LocalCare.showToast('Connecting to 24/7 Priority Support...', 'info')">
            🚨 Need Help
          </button>
          <button type="button" class="action-btn action-btn-primary" onclick="document.getElementById('trackingDialog').close()">
            Close
          </button>
        </div>
      </div>
    `;

    // Click outside backdrop to dismiss
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    });

    document.body.appendChild(dialog);
  }

  function renderTechCallDialog() {
    if (document.getElementById('techCallDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'techCallDialog';
    dialog.className = 'app-dialog tech-call-dialog';
    dialog.setAttribute('aria-labelledby', 'techCallName');
    dialog.innerHTML = `
      <div class="call-dialog-card">
        <div class="call-header">
          <span class="secure-badge">🔒 Encrypted VoIP Bridge</span>
          <button class="call-close-x" onclick="window.TrackingEngine.endTechCall()" aria-label="Close call">✕</button>
        </div>
        <div class="call-avatar-wrap">
          <div class="call-ripple-ring"></div>
          <div class="call-ripple-ring delay"></div>
          <img id="techCallAvatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Technician" class="call-avatar-img" />
        </div>
        <h3 id="techCallName" class="call-tech-name">Suresh Gowda</h3>
        <div id="techCallStatus" class="call-status">Connecting securely...</div>
        <div id="techCallTimer" class="call-timer">Ringing...</div>
        <div class="call-controls-row">
          <button type="button" class="call-ctrl-btn" id="callMuteBtn" onclick="window.TrackingEngine.toggleCallMute()" title="Mute Mic">
            <span class="ctrl-icon">🎤</span>
            <span class="ctrl-label">Mute</span>
          </button>
          <button type="button" class="call-ctrl-btn call-hangup-btn" onclick="window.TrackingEngine.endTechCall()" title="End Call">
            <span class="ctrl-icon">📞</span>
            <span class="ctrl-label">End</span>
          </button>
          <button type="button" class="call-ctrl-btn" id="callSpeakerBtn" onclick="window.TrackingEngine.toggleCallSpeaker()" title="Speakerphone">
            <span class="ctrl-icon">🔊</span>
            <span class="ctrl-label">Speaker</span>
          </button>
        </div>
      </div>
    `;

    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        window.TrackingEngine.endTechCall();
      }
    });

    document.body.appendChild(dialog);
  }

  function renderTechChatDialog() {
    if (document.getElementById('techChatDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'techChatDialog';
    dialog.className = 'app-dialog tech-chat-dialog';
    dialog.setAttribute('aria-labelledby', 'techChatTitle');
    dialog.innerHTML = `
      <div class="chat-dialog-card">
        <div class="chat-header">
          <div class="chat-user-info">
            <div class="chat-avatar-wrapper">
              <img id="techChatAvatar" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" alt="Technician" class="chat-avatar" />
              <span class="online-indicator"></span>
            </div>
            <div>
              <h4 id="techChatTitle" class="chat-tech-name">Suresh Gowda</h4>
              <span class="chat-status-sub">Assigned Technician • Online</span>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('techChatDialog').close()" aria-label="Close chat">✕</button>
        </div>
        <div class="chat-messages-container" id="techChatMessagesList">
          <!-- Populated dynamically -->
        </div>
        <div class="chat-quick-replies">
          <button class="quick-chip" onclick="window.TrackingEngine.sendQuickChat('Where are you right now?')">📍 Where are you?</button>
          <button class="quick-chip" onclick="window.TrackingEngine.sendQuickChat('Please ring doorbell when outside')">🔔 Ring doorbell</button>
          <button class="quick-chip" onclick="window.TrackingEngine.sendQuickChat('Carrying AC spare parts & gas kit?')">🧰 Have parts?</button>
        </div>
        <form class="chat-input-row" onsubmit="event.preventDefault(); window.TrackingEngine.sendCustomChat();">
          <input type="text" id="techChatInput" placeholder="Message your technician..." autocomplete="off" />
          <button type="submit" class="chat-send-btn" title="Send Message">➤</button>
        </form>
      </div>
    `;

    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    });

    document.body.appendChild(dialog);
  }

  function initTrackingMap() {
    const mapHost = document.getElementById('trackingLeafletMapHost');
    const svgFallback = document.getElementById('trackingVectorFallback');

    if (!window.L || !mapHost) {
      if (svgFallback) svgFallback.style.display = 'block';
      if (mapHost) mapHost.style.display = 'none';
      return;
    }

    if (svgFallback) svgFallback.style.display = 'none';
    mapHost.style.display = 'block';

    if (trackingMap) {
      setTimeout(() => {
        try {
          trackingMap.invalidateSize();
          recenterRoute();
        } catch (e) {
          // non-blocking
        }
      }, 150);
      return;
    }

    try {
      // 1. Initialize Leaflet Map
      trackingMap = L.map('trackingLeafletMapHost', {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true
      });

      // 2. Tile layers (Carto Voyager street theme + Esri World Imagery satellite)
      trackingTileLayers.street = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          subdomains: 'abcd'
        }
      );

      trackingTileLayers.satellite = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 19
        }
      );

      trackingTileLayers.street.addTo(trackingMap);
      currentLayerType = 'street';

      // 3. Authentic Google Maps Dual Navigation Polyline
      const outerCasing = L.polyline(REALISTIC_GPS_ROUTE, {
        color: '#1a73e8',
        weight: 8,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(trackingMap);

      const innerCore = L.polyline(REALISTIC_GPS_ROUTE, {
        color: '#4285f4',
        weight: 4,
        opacity: 1.0,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(trackingMap);

      trackingRouteLines = [outerCasing, innerCore];

      // 4. Destination Home Marker (Google Red Pin)
      const destinationCoords = REALISTIC_GPS_ROUTE[REALISTIC_GPS_ROUTE.length - 1];
      const homeIcon = L.divIcon({
        className: 'gmap-leaflet-home-marker',
        html: `
          <div class="gmap-pin-container">
            <div class="gmap-pin-label">Your Home</div>
            <div class="gmap-pin-head">
              <span class="gmap-pin-icon">🏠</span>
            </div>
            <div class="gmap-pin-tip"></div>
            <div class="gmap-pin-shadow"></div>
          </div>
        `,
        iconSize: [40, 50],
        iconAnchor: [20, 48]
      });

      trackingHomeMarker = L.marker(destinationCoords, { icon: homeIcon }).addTo(trackingMap);

      // 5. Moving Technician Scooter Marker
      const initialCoords = REALISTIC_GPS_ROUTE[0];
      const scooterIcon = L.divIcon({
        className: 'gmap-leaflet-scooter-marker',
        html: `
          <div class="gmap-scooter-container">
            <div class="gmap-scooter-pulse-ring"></div>
            <div class="gmap-scooter-badge">
              <span class="gmap-scooter-icon">🛵</span>
            </div>
            <div class="gmap-scooter-tag">Suresh • En Route</div>
          </div>
        `,
        iconSize: [46, 46],
        iconAnchor: [23, 23]
      });

      trackingTechMarker = L.marker(initialCoords, { icon: scooterIcon }).addTo(trackingMap);

      // Fit bounds with comfortable padding
      trackingMap.fitBounds(outerCasing.getBounds(), {
        padding: [50, 40],
        maxZoom: 16
      });

      setTimeout(() => {
        if (trackingMap) trackingMap.invalidateSize();
      }, 250);
    } catch (err) {
      console.warn('Leaflet tracking map init fallback:', err);
      if (svgFallback) svgFallback.style.display = 'block';
      if (mapHost) mapHost.style.display = 'none';
    }
  }

  function switchMapStyle(type) {
    if (!trackingMap) return;
    if (type === currentLayerType) return;

    if (type === 'satellite') {
      if (trackingTileLayers.street) trackingMap.removeLayer(trackingTileLayers.street);
      if (trackingTileLayers.satellite) trackingTileLayers.satellite.addTo(trackingMap);
      currentLayerType = 'satellite';
      const bStreet = document.getElementById('gmapBtnStreet');
      const bSat = document.getElementById('gmapBtnSat');
      if (bStreet) bStreet.classList.remove('active');
      if (bSat) bSat.classList.add('active');
    } else {
      if (trackingTileLayers.satellite) trackingMap.removeLayer(trackingTileLayers.satellite);
      if (trackingTileLayers.street) trackingTileLayers.street.addTo(trackingMap);
      currentLayerType = 'street';
      const bStreet = document.getElementById('gmapBtnStreet');
      const bSat = document.getElementById('gmapBtnSat');
      if (bSat) bSat.classList.remove('active');
      if (bStreet) bStreet.classList.add('active');
    }
  }

  function recenterRoute() {
    if (trackingMap && trackingRouteLines.length > 0) {
      trackingMap.fitBounds(trackingRouteLines[0].getBounds(), {
        padding: [50, 40],
        maxZoom: 16
      });
    }
  }

  function openTrackingModal(booking) {
    renderTrackingModalShell();

    currentTrackingBooking = booking || {
      id: 'LC-BK-' + Math.floor(1000 + Math.random() * 9000),
      serviceName: 'Expert Doorstep Servicing',
      address: '42, 5th Cross, Koramangala 4th Block, Bengaluru',
      otp: '7014',
      technician: {
        name: 'Suresh Gowda',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        vehicle: 'KA-01-EA-4921 (Hero Splendor)'
      }
    };

    const idEl = document.getElementById('trackBookingId');
    const etaEl = document.getElementById('trackEtaDisplay');
    const nameEl = document.getElementById('trackTechName');
    const photoEl = document.getElementById('trackTechPhoto');
    const vehicleEl = document.getElementById('trackTechVehicle');
    const otpEl = document.getElementById('trackOtpDisplay');
    const serviceEl = document.getElementById('trackServiceName');
    const addrEl = document.getElementById('trackAddress');

    if (idEl) idEl.textContent = `Booking ID: ${currentTrackingBooking.id}`;
    if (serviceEl) serviceEl.textContent = currentTrackingBooking.serviceName;
    if (addrEl) addrEl.textContent = currentTrackingBooking.address;
    if (otpEl) otpEl.textContent = currentTrackingBooking.otp || '7014';

    if (currentTrackingBooking.technician) {
      if (nameEl) nameEl.textContent = currentTrackingBooking.technician.name;
      if (photoEl && currentTrackingBooking.technician.photo) photoEl.src = currentTrackingBooking.technician.photo;
      if (vehicleEl) vehicleEl.textContent = `Vehicle: ${currentTrackingBooking.technician.vehicle}`;
    }

    // Reset Stepper
    document.querySelectorAll('.track-stepper-container .track-step-node').forEach((node, idx) => {
      if (idx <= 2) {
        node.classList.add('completed');
        const circle = node.querySelector('.node-circle');
        if (circle) circle.textContent = '✓';
      } else {
        node.classList.remove('completed');
        const circle = node.querySelector('.node-circle');
        if (circle) circle.textContent = idx === 3 ? '🔧' : '⭐';
      }
    });

    // Initialize Map and animate route
    initTrackingMap();
    startVehicleMovement();

    const dialog = document.getElementById('trackingDialog');
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }

  function startVehicleMovement() {
    clearInterval(moveInterval);
    currentStepIndex = 0;
    const etaDisplay = document.getElementById('trackEtaDisplay');
    const svgTechMarker = document.getElementById('trackTechMarkerSvg');
    const turnIcon = document.getElementById('gmapTurnIcon');
    const turnAction = document.getElementById('gmapTurnAction');
    const turnSub = document.getElementById('gmapTurnSub');
    const speedBadge = document.getElementById('gmapSpeedBadge');

    function updateNavUI(stepIdx) {
      const navInfo = GPS_NAV_STEPS[Math.min(stepIdx, GPS_NAV_STEPS.length - 1)];
      if (turnIcon && navInfo.icon) turnIcon.textContent = navInfo.icon;
      if (turnAction && navInfo.action) turnAction.textContent = navInfo.action;
      if (turnSub && navInfo.sub) turnSub.textContent = navInfo.sub;
      if (speedBadge && navInfo.speed) speedBadge.textContent = navInfo.speed;

      const minsLeft = Math.max(2, 14 - Math.round((stepIdx / (REALISTIC_GPS_ROUTE.length - 1)) * 12));
      if (etaDisplay) {
        etaDisplay.textContent = `${minsLeft} Mins`;
      }
    }

    updateNavUI(0);

    moveInterval = setInterval(() => {
      currentStepIndex++;
      if (currentStepIndex >= REALISTIC_GPS_ROUTE.length) {
        currentStepIndex = 1; // loop along route
      }

      const currentCoord = REALISTIC_GPS_ROUTE[currentStepIndex];

      // Update Leaflet marker
      if (trackingTechMarker && trackingTechMarker.setLatLng) {
        trackingTechMarker.setLatLng(currentCoord);
      }

      // Update Fallback SVG if visible
      if (svgTechMarker) {
        const svgT = currentStepIndex / (REALISTIC_GPS_ROUTE.length - 1);
        const svgX = Math.round(90 + svgT * (450 - 90));
        const svgY = Math.round(195 - Math.sin(svgT * Math.PI) * 70 - svgT * 35);
        svgTechMarker.setAttribute('transform', `translate(${svgX}, ${svgY})`);
      }

      updateNavUI(currentStepIndex);
    }, 2400);
  }

  function simulateDoorstepArrival() {
    clearInterval(moveInterval);
    const destinationCoords = REALISTIC_GPS_ROUTE[REALISTIC_GPS_ROUTE.length - 1];
    const etaDisplay = document.getElementById('trackEtaDisplay');
    const turnIcon = document.getElementById('gmapTurnIcon');
    const turnAction = document.getElementById('gmapTurnAction');
    const turnSub = document.getElementById('gmapTurnSub');
    const speedBadge = document.getElementById('gmapSpeedBadge');
    const otpCard = document.getElementById('trackOtpStripCard');
    const svgTechMarker = document.getElementById('trackTechMarkerSvg');

    if (trackingTechMarker && trackingTechMarker.setLatLng) {
      trackingTechMarker.setLatLng(destinationCoords);
    }
    if (svgTechMarker) {
      svgTechMarker.setAttribute('transform', 'translate(450, 90)');
    }

    if (turnIcon) turnIcon.textContent = '✓';
    if (turnAction) turnAction.textContent = 'Arrived at Customer Doorstep';
    if (turnSub) turnSub.textContent = 'Technician Suresh is waiting outside';
    if (speedBadge) speedBadge.textContent = '0 km/h';

    if (etaDisplay) {
      etaDisplay.innerHTML = '<span style="color: #10b981; font-weight: 700;">Arrived! 🔔</span>';
    }

    // Update Stepper
    document.querySelectorAll('.track-stepper-container .track-step-node').forEach((node, idx) => {
      if (idx <= 3) {
        node.classList.add('completed');
        const circle = node.querySelector('.node-circle');
        if (circle) circle.textContent = '✓';
      }
    });

    if (otpCard) {
      otpCard.style.animation = 'pulse 1s 3';
      otpCard.style.border = '2px solid var(--primary)';
    }

    if (window.SoundFX && window.SoundFX.playSuccess) {
      window.SoundFX.playSuccess();
    }

    const techName = (currentTrackingBooking && currentTrackingBooking.technician) ? currentTrackingBooking.technician.name : 'Suresh Gowda';
    const otp = (currentTrackingBooking && currentTrackingBooking.otp) ? currentTrackingBooking.otp : '7014';

    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(`🔔 ${techName} has arrived at your doorstep! Share OTP ${otp} to start service.`, 'success', 8000);
    }
  }

  /* --------------------------------------------------------------------------
     Technician Voice Call Simulation
     -------------------------------------------------------------------------- */
  let callTimer = null;
  let callSeconds = 0;
  let isMuted = false;
  let isSpeaker = false;

  function openTechCall() {
    const dialog = document.getElementById('techCallDialog');
    if (!dialog) return;

    const techName = (currentTrackingBooking && currentTrackingBooking.technician) ? currentTrackingBooking.technician.name : 'Suresh Gowda';
    const techPhoto = (currentTrackingBooking && currentTrackingBooking.technician && currentTrackingBooking.technician.photo) ? currentTrackingBooking.technician.photo : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

    const nameEl = document.getElementById('techCallName');
    const avatarEl = document.getElementById('techCallAvatar');
    const statusEl = document.getElementById('techCallStatus');
    const timerEl = document.getElementById('techCallTimer');

    if (nameEl) nameEl.textContent = techName;
    if (avatarEl) avatarEl.src = techPhoto;
    if (statusEl) statusEl.textContent = 'Connecting securely via LocalCare Bridge...';
    if (timerEl) timerEl.textContent = 'Ringing...';

    callSeconds = 0;
    clearInterval(callTimer);

    dialog.showModal();

    if (window.SoundFX && window.SoundFX.playClick) {
      window.SoundFX.playClick();
    }

    // Simulate answer after 2 seconds
    setTimeout(() => {
      if (!dialog.open) return;
      if (statusEl) statusEl.textContent = 'Connected (Encrypted Voice Call)';
      callTimer = setInterval(() => {
        callSeconds++;
        const mins = String(Math.floor(callSeconds / 60)).padStart(2, '0');
        const secs = String(callSeconds % 60).padStart(2, '0');
        if (timerEl) timerEl.textContent = `${mins}:${secs}`;
      }, 1000);
    }, 2000);
  }

  function endTechCall() {
    clearInterval(callTimer);
    callSeconds = 0;
    const dialog = document.getElementById('techCallDialog');
    if (dialog) dialog.close();
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('Call ended with technician', 'info');
    }
  }

  function toggleCallMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('callMuteBtn');
    if (btn) btn.classList.toggle('active', isMuted);
    if (window.LocalCare) {
      window.LocalCare.showToast(isMuted ? 'Microphone muted' : 'Microphone unmuted', 'info');
    }
  }

  function toggleCallSpeaker() {
    isSpeaker = !isSpeaker;
    const btn = document.getElementById('callSpeakerBtn');
    if (btn) btn.classList.toggle('active', isSpeaker);
    if (window.LocalCare) {
      window.LocalCare.showToast(isSpeaker ? 'Speakerphone on' : 'Speakerphone off', 'info');
    }
  }

  /* --------------------------------------------------------------------------
     Technician Instant Chat Simulation
     -------------------------------------------------------------------------- */
  const chatMessages = [
    { sender: 'tech', text: 'Hello! I am on my way to your address. Traffic is clear on 100ft road.', time: 'Just now' }
  ];

  function openTechChat() {
    const dialog = document.getElementById('techChatDialog');
    if (!dialog) return;

    const techName = (currentTrackingBooking && currentTrackingBooking.technician) ? currentTrackingBooking.technician.name : 'Suresh Gowda';
    const techPhoto = (currentTrackingBooking && currentTrackingBooking.technician && currentTrackingBooking.technician.photo) ? currentTrackingBooking.technician.photo : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

    const nameEl = document.getElementById('techChatTitle');
    const avatarEl = document.getElementById('techChatAvatar');

    if (nameEl) nameEl.textContent = techName;
    if (avatarEl) avatarEl.src = techPhoto;

    renderTechChatMessages();
    dialog.showModal();
  }

  function renderTechChatMessages() {
    const list = document.getElementById('techChatMessagesList');
    if (!list) return;

    list.innerHTML = chatMessages.map(m => `
      <div class="chat-bubble ${m.sender === 'user' ? 'user' : 'tech'}">
        <div>${escapeHtml(m.text)}</div>
        <div class="chat-time">${m.time}</div>
      </div>
    `).join('');

    list.scrollTop = list.scrollHeight;
  }

  function sendQuickChat(text) {
    appendUserMessage(text);
  }

  function sendCustomChat() {
    const input = document.getElementById('techChatInput');
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;
    input.value = '';
    appendUserMessage(val);
  }

  function appendUserMessage(text) {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chatMessages.push({ sender: 'user', text, time: now });
    renderTechChatMessages();

    if (window.SoundFX && window.SoundFX.playClick) {
      window.SoundFX.playClick();
    }

    // Auto simulated technician reply after 1.2s
    setTimeout(() => {
      const techReplies = [
        'Got it! Taking the flyover route right now.',
        'Noted! Will ring the bell once I reach.',
        'Almost there, roughly 4 minutes away!',
        'Understood! Carrying all required parts & diagnostic gear.'
      ];
      const randomReply = techReplies[Math.floor(Math.random() * techReplies.length)];
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      chatMessages.push({ sender: 'tech', text: randomReply, time: replyTime });
      renderTechChatMessages();
      if (window.SoundFX && window.SoundFX.playBubble) {
        window.SoundFX.playBubble();
      }
    }, 1200);
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[m]);
  }

  return {
    init,
    openTrackingModal,
    simulateDoorstepArrival,
    switchMapStyle,
    recenterRoute,
    openTechCall,
    endTechCall,
    toggleCallMute,
    toggleCallSpeaker,
    openTechChat,
    sendQuickChat,
    sendCustomChat
  };
})();
