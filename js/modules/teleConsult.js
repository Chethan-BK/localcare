/* ==========================================================================
   Local Care - Tele-Consultation & Virtual Video Diagnosis Module
   Instant 2-minute video consultation & diagnosis simulation with certified doctors
   and master technicians. Generates digital job sheets & prescriptions.
   ========================================================================== */

window.TeleConsult = (function () {
  'use strict';

  let currentBusiness = null;
  let callTimer = null;
  let callSeconds = 0;
  let isMuted = false;
  let isVideoOff = false;

  function init() {
    renderTeleModal();
  }

  function startConsultation(business) {
    currentBusiness = business;
    callSeconds = 0;
    isMuted = false;
    isVideoOff = false;

    renderTeleModalContent();
    const dialog = document.getElementById('teleConsultDialog');
    if (dialog) dialog.showModal();

    if (window.SoundFX) window.SoundFX.playBubble();
    startTimer();
  }

  function startTimer() {
    clearInterval(callTimer);
    const timerEl = document.getElementById('teleCallTimer');
    callTimer = setInterval(() => {
      callSeconds++;
      const mins = String(Math.floor(callSeconds / 60)).padStart(2, '0');
      const secs = String(callSeconds % 60).padStart(2, '0');
      if (timerEl) timerEl.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function endConsultation() {
    clearInterval(callTimer);
    document.getElementById('teleConsultDialog')?.close();
    if (window.SoundFX) window.SoundFX.playClick();
    if (window.LocalCare) {
      window.LocalCare.showToast('Virtual consultation completed. Summary saved to your profile!', 'success');
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    const btn = document.getElementById('teleMuteBtn');
    if (btn) {
      btn.classList.toggle('active', isMuted);
      btn.innerHTML = isMuted ? '🔇 Unmute' : '🎙️ Mute';
    }
  }

  function toggleVideo() {
    isVideoOff = !isVideoOff;
    const btn = document.getElementById('teleVideoBtn');
    const pip = document.getElementById('teleUserPip');
    if (btn) {
      btn.classList.toggle('active', isVideoOff);
      btn.innerHTML = isVideoOff ? '📷 Start Video' : '📹 Stop Video';
    }
    if (pip) {
      pip.style.opacity = isVideoOff ? '0.3' : '1';
    }
  }

  function renderTeleModal() {
    if (document.getElementById('teleConsultDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'teleConsultDialog';
    dialog.className = 'app-dialog tele-consult-dialog';
    dialog.innerHTML = `
      <div class="dialog-content-wrapper tele-modal-wrapper">
        <div id="teleModalDynamicContainer"></div>
      </div>
    `;

    document.body.appendChild(dialog);
  }

  function renderTeleModalContent() {
    const container = document.getElementById('teleModalDynamicContainer');
    if (!container || !currentBusiness) return;

    const isHealth = currentBusiness.category === 'health';
    const expertTitle = isHealth ? 'Consulting Doctor' : 'Chief Diagnostic Specialist';

    container.innerHTML = `
      <!-- Video Room Header -->
      <div class="tele-room-header">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div class="tele-status-live">
            <span class="live-dot-pulse"></span> LIVE HD
          </div>
          <div>
            <h4 style="margin: 0; font-size: 1.1rem; color: #ffffff;">${currentBusiness.name}</h4>
            <small style="color: rgba(255,255,255,0.75);">Encrypted End-to-End • LocalCare Tele-Hub</small>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div class="tele-timer-pill" id="teleCallTimer">00:00</div>
          <button class="dialog-close-btn" style="color: #ffffff;" onclick="window.TeleConsult.endConsultation()">✕</button>
        </div>
      </div>

      <!-- Main Video & Notes Split View -->
      <div class="tele-main-split">
        <!-- Left: Video Feeds -->
        <div class="tele-video-area">
          <div class="tele-pro-feed">
            <img src="${currentBusiness.image}" alt="${currentBusiness.name}" class="tele-pro-bg" />
            <div class="tele-pro-overlay">
              <div class="tele-pro-info-tag">
                <span style="font-size: 1.1rem;">${isHealth ? '👨‍⚕️' : '👷‍♂️'}</span>
                <div>
                  <div style="font-weight: 700;">${expertTitle}</div>
                  <div style="font-size: 0.75rem; opacity: 0.9;">100% Verified Credentials</div>
                </div>
              </div>
              <div class="tele-audio-visualizer">
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
                <span class="wave-bar"></span>
              </div>
            </div>

            <!-- User PIP Window -->
            <div class="tele-user-pip" id="teleUserPip">
              <div class="pip-label">You (Chethan)</div>
              <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #1e293b; color: #ffffff; font-size: 1.5rem;">
                🧑
              </div>
            </div>
          </div>

          <!-- Video Control Bar -->
          <div class="tele-controls-bar">
            <button class="tele-control-btn" id="teleMuteBtn" onclick="window.TeleConsult.toggleMute()">🎙️ Mute</button>
            <button class="tele-control-btn" id="teleVideoBtn" onclick="window.TeleConsult.toggleVideo()">📹 Video</button>
            <button class="tele-control-btn" onclick="window.LocalCare.showToast('Camera switch requested', 'info')">🔄 Flip Cam</button>
            <button class="tele-control-btn danger" onclick="window.TeleConsult.endConsultation()">📞 End Call</button>
          </div>
        </div>

        <!-- Right: Live Diagnosis & Prescription / Job Sheet -->
        <div class="tele-diagnosis-panel">
          <div class="tele-notes-header">
            <h4>${isHealth ? '📋 Live Clinical Notes & Prescription' : '🛠️ Diagnostic Inspection Sheet'}</h4>
            <span class="badge-auto-saved">✓ Auto-Syncing</span>
          </div>

          <div class="tele-notes-body">
            <div class="diag-section">
              <label class="diag-label">Reported Concern / Symptoms</label>
              <div class="diag-content-box">
                ${isHealth ? 'Patient reports acute temperature sensitivity in lower molar, intermittent aching since 2 days.' : 'Client reports AC cooling fan making rattling sound and lukewarm air output.'}
              </div>
            </div>

            <div class="diag-section">
              <label class="diag-label">${isHealth ? 'Doctor Initial Diagnosis' : 'Technician Inspection Findings'}</label>
              <div class="diag-content-box highlight">
                ${isHealth ? 'Local enamel erosion; no acute pulpal involvement noted on visual inspection. Fluoride protective application & cleaning advised.' : 'Blower motor bush loose; dust clogging on evaporator fins causing low airflow. Requires deep jet service.'}
              </div>
            </div>

            <div class="diag-section">
              <label class="diag-label">${isHealth ? 'Digital Prescription (Rx)' : 'Recommended Service & Estimate'}</label>
              <div class="diag-rx-card">
                ${isHealth ? `
                  <div class="rx-item">• Desensitizing Toothpaste (5% KNO3) - Twice daily for 14 days</div>
                  <div class="rx-item">• Warm saline mouth rinse 3x daily</div>
                  <div class="rx-item">• Follow-up in clinic if pain increases</div>
                ` : `
                  <div class="rx-item">• Split AC Power Jet Service (₹449)</div>
                  <div class="rx-item">• Blower Bush Lubrication & Alignment (Included)</div>
                  <div class="rx-item">• 30-Day Cooling Performance Warranty</div>
                `}
              </div>
            </div>
          </div>

          <div class="tele-notes-footer">
            <button class="action-btn action-btn-outline" style="font-size: 0.85rem;" onclick="window.LocalCare.showToast('Digital Report PDF downloaded successfully! 📄', 'success')">
              📥 Download Report
            </button>
            <button class="action-btn action-btn-primary" style="font-size: 0.85rem;" onclick="window.TeleConsult.proceedToBooking()">
              ⚡ Confirm Slot (15% OFF) ➔
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function proceedToBooking() {
    const biz = currentBusiness;
    endConsultation();
    if (biz && window.BookingEngine) {
      window.BookingEngine.openBookingModal(biz);
    }
  }

  return {
    init,
    startConsultation,
    endConsultation,
    toggleMute,
    toggleVideo,
    proceedToBooking
  };
})();
