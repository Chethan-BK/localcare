/* ==========================================================================
   Local Care - Emergency 24/7 Services Module
   Rapid SOS dispatch for Ambulances, Hospitals, Plumbers, Electricians, and Towing
   ========================================================================== */

window.EmergencyMode = (function () {
  'use strict';

  function init() {
    renderEmergencyModalShell();
  }

  function renderEmergencyModalShell() {
    if (document.getElementById('emergencyDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'emergencyDialog';
    dialog.className = 'app-dialog emergency-dialog';
    dialog.setAttribute('aria-labelledby', 'emergencyTitle');
    dialog.innerHTML = `
      <div class="dialog-content-wrapper emergency-modal-wrapper">
        <div class="dialog-header emergency-header-red">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span class="emergency-icon-pulse">🚨</span>
            <div>
              <h3 class="dialog-title" id="emergencyTitle" style="color: #ffffff;">Need Help Right Now?</h3>
              <small style="color: rgba(255,255,255,0.9);">24/7 Priority Emergency Dispatch & Toll-Free Assistance</small>
            </div>
          </div>
          <button class="dialog-close-btn" style="color: #ffffff;" onclick="document.getElementById('emergencyDialog').close()">✕</button>
        </div>

        <div class="dialog-body" style="padding: 1.5rem;">
          <p style="font-size: 0.92rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            Select an emergency service below to connect immediately with on-duty teams arriving within minutes:
          </p>

          <div class="emergency-grid">
            <div class="emergency-card" onclick="window.EmergencyMode.triggerEmergency('ambulance')">
              <span class="em-icon">🚑</span>
              <div class="em-text">
                <strong>24/7 Ambulance & ICU</strong>
                <small>Average arrival: ~7 mins</small>
              </div>
              <button class="em-call-btn">CALL</button>
            </div>

            <div class="emergency-card" onclick="window.EmergencyMode.triggerEmergency('hospital')">
              <span class="em-icon">🏥</span>
              <div class="em-text">
                <strong>Hospital ER & Trauma</strong>
                <small>24/7 Emergency Casualty</small>
              </div>
              <button class="em-call-btn">CALL</button>
            </div>

            <div class="emergency-card" onclick="window.EmergencyMode.triggerEmergency('plumber')">
              <span class="em-icon">🔧</span>
              <div class="em-text">
                <strong>Burst Pipe / Flooding</strong>
                <small>Master Plumber in 20m</small>
              </div>
              <button class="em-call-btn">DISPATCH</button>
            </div>

            <div class="emergency-card" onclick="window.EmergencyMode.triggerEmergency('electrician')">
              <span class="em-icon">⚡</span>
              <div class="em-text">
                <strong>Electrical Spark / Fire</strong>
                <small>Emergency Line Cutoff</small>
              </div>
              <button class="em-call-btn">DISPATCH</button>
            </div>

            <div class="emergency-card" onclick="window.EmergencyMode.triggerEmergency('towing')">
              <span class="em-icon">🚗</span>
              <div class="em-text">
                <strong>Roadside Towing / Breakdown</strong>
                <small>Highway & City Rescue</small>
              </div>
              <button class="em-call-btn">RESCUE</button>
            </div>

            <div class="emergency-card" onclick="window.EmergencyMode.triggerEmergency('pharmacy')">
              <span class="em-icon">💊</span>
              <div class="em-text">
                <strong>24/7 Emergency Pharmacy</strong>
                <small>Urgent Medicine Delivery</small>
              </div>
              <button class="em-call-btn">ORDER</button>
            </div>
          </div>

          <div class="emergency-national-helpline">
            <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.25rem;">National Emergency Helplines (Toll-Free)</div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 0.5rem;">
              <a href="tel:108" class="helpline-chip">🚑 Ambulance: <strong>108</strong></a>
              <a href="tel:112" class="helpline-chip">🚨 All Emergencies: <strong>112</strong></a>
              <a href="tel:100" class="helpline-chip">👮 Police: <strong>100</strong></a>
              <a href="tel:101" class="helpline-chip">🚒 Fire: <strong>101</strong></a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
  }

  function openEmergencyModal() {
    const dialog = document.getElementById('emergencyDialog');
    if (dialog) dialog.showModal();
  }

  function triggerEmergency(type) {
    document.getElementById('emergencyDialog')?.close();
    if (window.LocalCare && window.LocalCare.filterCategory) {
      if (type === 'ambulance' || type === 'hospital' || type === 'pharmacy') {
        window.LocalCare.filterCategory('emergency');
      } else if (type === 'plumber') {
        window.LocalCare.filterCategory('home');
      } else if (type === 'electrician') {
        window.LocalCare.filterCategory('electrical');
      } else if (type === 'towing') {
        window.LocalCare.filterCategory('auto');
      }
    }
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(`🚨 Priority 24/7 ${type.toUpperCase()} providers loaded with instant response!`, 'warning', 5000);
    }
  }

  return {
    init,
    openEmergencyModal,
    triggerEmergency
  };
})();
