/* ==========================================================================
   Local Care - Real-Time Service Tracking Engine Module
   Uber/Swiggy style live doorstep tracking with moving technician pin,
   live countdown ETA, technician profile, and service start OTP verification
   ========================================================================== */

window.TrackingEngine = (function () {
  'use strict';

  let currentTrackingBooking = null;
  let moveInterval = null;
  let currentProgressPercent = 35; // 0 to 100

  function init() {
    renderTrackingModalShell();
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
          <!-- Live Map Animation Surface -->
          <div class="tracking-map-surface">
            <svg class="tracking-vector-map" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="trackGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" stroke-width="0.5" class="map-grid-line" />
                </pattern>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#3b82f6" />
                  <stop offset="100%" stop-color="#10b981" />
                </linearGradient>
              </defs>

              <!-- Map Background -->
              <rect width="100%" height="100%" class="map-bg-rect" />
              <rect width="100%" height="100%" fill="url(#trackGrid)" />

              <!-- City Roads -->
              <path d="M 0,160 Q 180,140 300,180 T 600,160" stroke="var(--border-subtle)" stroke-width="12" fill="none" />
              <path d="M 120,0 L 120,320" stroke="var(--border-subtle)" stroke-width="8" fill="none" />
              <path d="M 460,0 L 460,320" stroke="var(--border-subtle)" stroke-width="8" fill="none" />

              <!-- Route Path Polyline -->
              <path id="trackRoutePath" d="M 120,240 C 220,220 280,120 460,100" 
                    fill="none" 
                    stroke="url(#routeGradient)" 
                    stroke-width="5" 
                    stroke-dasharray="8 6" 
                    class="animated-route-line" />

              <!-- Destination Pin (Customer Home) -->
              <g transform="translate(460, 100)">
                <circle r="20" fill="rgba(16, 185, 129, 0.2)" class="radar-pulse-ring" />
                <circle r="12" fill="#10b981" stroke="#ffffff" stroke-width="2.5" />
                <text y="4" text-anchor="middle" font-size="12">🏠</text>
                <text y="24" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary)">Your Home</text>
              </g>

              <!-- Moving Technician Marker -->
              <g id="trackTechMarker" transform="translate(240, 180)">
                <circle r="18" fill="rgba(249, 115, 22, 0.25)" class="radar-pulse-ring" />
                <circle r="14" fill="#f97316" stroke="#ffffff" stroke-width="2.5" />
                <text y="4" text-anchor="middle" font-size="13">🏍️</text>
                <text y="-20" text-anchor="middle" font-size="9" font-weight="700" fill="var(--primary)" class="tech-marker-label">Technician Moving</text>
              </g>
            </svg>

            <!-- ETA Badge Floating Over Map -->
            <div class="track-eta-banner">
              <div class="eta-time-group">
                <span class="eta-label">ESTIMATED ARRIVAL</span>
                <span class="eta-clock" id="trackEtaDisplay">12 Mins</span>
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
                <a href="#" class="btn-tech-contact btn-tech-call" id="trackTechCallBtn" title="Call Technician">📞</a>
                <a href="#" target="_blank" class="btn-tech-contact btn-tech-wa" id="trackTechWaBtn" title="WhatsApp Technician">💬</a>
              </div>
            </div>

            <!-- Start OTP Card -->
            <div class="track-otp-strip">
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
          <button type="button" class="action-btn action-btn-ghost" onclick="window.LocalCare.showToast('Connecting to 24/7 Priority Support...', 'info')">
            🚨 Need Help / Support
          </button>
          <button type="button" class="action-btn action-btn-primary" onclick="document.getElementById('trackingDialog').close()">
            Dismiss
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
  }

  function openTrackingModal(booking) {
    currentTrackingBooking = booking;

    const titleEl = document.getElementById('trackingTitle');
    const idEl = document.getElementById('trackBookingId');
    const etaEl = document.getElementById('trackEtaDisplay');
    const nameEl = document.getElementById('trackTechName');
    const photoEl = document.getElementById('trackTechPhoto');
    const vehicleEl = document.getElementById('trackTechVehicle');
    const otpEl = document.getElementById('trackOtpDisplay');
    const serviceEl = document.getElementById('trackServiceName');
    const addrEl = document.getElementById('trackAddress');
    const callBtn = document.getElementById('trackTechCallBtn');
    const waBtn = document.getElementById('trackTechWaBtn');

    if (idEl) idEl.textContent = `Booking ID: ${booking.id}`;
    if (serviceEl) serviceEl.textContent = booking.serviceName;
    if (addrEl) addrEl.textContent = booking.address;
    if (otpEl) otpEl.textContent = booking.otp || '4821';

    if (booking.technician) {
      if (nameEl) nameEl.textContent = booking.technician.name;
      if (photoEl && booking.technician.photo) photoEl.src = booking.technician.photo;
      if (vehicleEl) vehicleEl.textContent = `Vehicle: ${booking.technician.vehicle}`;
      if (callBtn) callBtn.href = `tel:${booking.technician.phone.replace(/\s+/g, '')}`;
      if (waBtn) waBtn.href = `https://wa.me/${booking.technician.phone.replace(/\D/g, '')}?text=Hi%20Suresh,%20checking%20on%20my%20LocalCare%20booking%20status.`;
    }

    // Start animated vehicle movement along the route
    startVehicleMovement();

    document.getElementById('trackingDialog').showModal();
  }

  function startVehicleMovement() {
    clearInterval(moveInterval);
    const techMarker = document.getElementById('trackTechMarker');
    const etaDisplay = document.getElementById('trackEtaDisplay');
    let minutesRemaining = 14;

    moveInterval = setInterval(() => {
      currentProgressPercent += 3;
      if (currentProgressPercent > 92) {
        currentProgressPercent = 30; // loop
        minutesRemaining = 14;
      } else {
        minutesRemaining = Math.max(2, Math.round(14 * (1 - (currentProgressPercent - 30) / 60)));
      }

      // Route math: from (120, 240) to (460, 100)
      const t = currentProgressPercent / 100;
      // Bezier point calculation (P0=(120,240), P1=(250,180), P2=(460,100))
      const x = Math.round((1 - t) * (1 - t) * 120 + 2 * (1 - t) * t * 250 + t * t * 460);
      const y = Math.round((1 - t) * (1 - t) * 240 + 2 * (1 - t) * t * 180 + t * t * 100);

      if (techMarker) {
        techMarker.setAttribute('transform', `translate(${x}, ${y})`);
      }
      if (etaDisplay) {
        etaDisplay.textContent = `${minutesRemaining} Mins`;
      }
    }, 1800);
  }

  return {
    init,
    openTrackingModal
  };
})();
