/* ==========================================================================
   Local Care - Trust & Verification Module
   LocalCare Trust Score 0-100 breakdown, 5-pillar verification audits,
   and community listing reporting mechanism
   ========================================================================== */

window.VerificationEngine = (function () {
  'use strict';

  function init() {
    renderTrustScoreModal();
    renderReportListingModal();
  }

  function renderTrustScoreModal() {
    if (document.getElementById('trustScoreDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'trustScoreDialog';
    dialog.className = 'app-dialog trust-dialog';
    dialog.setAttribute('aria-labelledby', 'trustScoreTitle');
    dialog.innerHTML = `
      <div class="dialog-content-wrapper trust-modal-wrapper">
        <div class="dialog-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.4rem;">🛡️</span>
            <div>
              <h3 class="dialog-title" id="trustScoreTitle">LocalCare Trust Audit</h3>
              <small id="trustBizSubtitle" style="color: var(--text-secondary);">Verified Multi-Pillar Safety Score</small>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('trustScoreDialog').close()">✕</button>
        </div>

        <div class="dialog-body" style="padding: 1.5rem;">
          <!-- Trust Score Circle Meter -->
          <div class="trust-meter-box">
            <div class="trust-score-badge-circle">
              <span class="trust-score-number" id="trustScoreValue">96</span>
              <span class="trust-score-scale">/ 100</span>
            </div>
            <div class="trust-verdict-text">
              <h4 id="trustVerdictHeading">EXCELLENT TRUST RATING</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">This business has passed all rigorous on-ground and legal verification checks by LocalCare audit teams.</p>
            </div>
          </div>

          <!-- 5 Verification Pillars -->
          <div class="trust-pillars-list">
            <div class="trust-pillar-item">
              <div class="pillar-status-icon">✓</div>
              <div class="pillar-content">
                <strong>Government & GST Registration</strong>
                <p>Valid trade license, GSTIN, and establishment council certificate verified.</p>
              </div>
            </div>

            <div class="trust-pillar-item">
              <div class="pillar-status-icon">✓</div>
              <div class="pillar-content">
                <strong>Physical On-Ground Address Inspection</strong>
                <p>Audited by LocalCare local field officer; premises verified active.</p>
              </div>
            </div>

            <div class="trust-pillar-item">
              <div class="pillar-status-icon">✓</div>
              <div class="pillar-content">
                <strong>Background & Police Verification</strong>
                <p>Technicians and owners have clean background verification records.</p>
              </div>
            </div>

            <div class="trust-pillar-item">
              <div class="pillar-status-icon">✓</div>
              <div class="pillar-content">
                <strong>OTP Phone & Identity Authenticated</strong>
                <p>Direct contact number authenticated with zero complaints.</p>
              </div>
            </div>

            <div class="trust-pillar-item">
              <div class="pillar-status-icon">✓</div>
              <div class="pillar-content">
                <strong>100% Genuine Booking Reviews</strong>
                <p>Only customers who completed a genuine LocalCare appointment can post verified reviews.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="dialog-footer">
          <button type="button" class="action-btn action-btn-ghost" onclick="window.VerificationEngine.openReportModal()">
            🚩 Report an Issue with this Listing
          </button>
          <button type="button" class="action-btn action-btn-primary" onclick="document.getElementById('trustScoreDialog').close()">
            Close
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
  }

  function renderReportListingModal() {
    if (document.getElementById('reportListingDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'reportListingDialog';
    dialog.className = 'app-dialog report-dialog';
    dialog.innerHTML = `
      <div class="dialog-content-wrapper">
        <div class="dialog-header">
          <h3 class="dialog-title">🚩 Report Listing to Trust & Safety</h3>
          <button class="dialog-close-btn" onclick="document.getElementById('reportListingDialog').close()">✕</button>
        </div>
        <form id="reportListingForm">
          <div class="dialog-body">
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1rem;">
              Help keep LocalCare trustworthy and safe. Inaccurate or fraudulent businesses are removed within 24 hours.
            </p>

            <div class="form-group">
              <label class="form-label">Reason for reporting *</label>
              <select class="form-select" id="reportReasonSelect" required>
                <option value="phone_not_working">Incorrect / unreachable phone number</option>
                <option value="permanently_closed">Business permanently closed</option>
                <option value="wrong_address">Wrong physical address / not located here</option>
                <option value="fake_listing">Suspected fake or impersonation listing</option>
                <option value="overcharging">Overcharging or refusal of service</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Details / Observations</label>
              <textarea class="form-textarea" rows="3" placeholder="Please describe what is incorrect..." required></textarea>
            </div>
          </div>
          <div class="dialog-footer">
            <button type="button" class="action-btn action-btn-ghost" onclick="document.getElementById('reportListingDialog').close()">Cancel</button>
            <button type="submit" class="action-btn action-btn-primary">Submit Report</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(dialog);

    document.getElementById('reportListingForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('reportListingDialog').close();
      if (window.LocalCare && window.LocalCare.showToast) {
        window.LocalCare.showToast('Thank you! Report received. Our Trust & Safety team is auditing this listing.', 'success', 5000);
      }
    });
  }

  function openTrustScore(business) {
    const dialog = document.getElementById('trustScoreDialog');
    if (!dialog) return;

    const score = business.trustScore || 94;
    document.getElementById('trustScoreValue').textContent = score;
    document.getElementById('trustBizSubtitle').textContent = `${business.name} • ${business.locality}, ${business.city}`;

    if (score >= 90) {
      document.getElementById('trustVerdictHeading').textContent = 'EXCELLENT TRUST RATING (90+)';
    } else {
      document.getElementById('trustVerdictHeading').textContent = 'VERIFIED LOCAL PARTNER';
    }

    dialog.showModal();
  }

  function openReportModal() {
    document.getElementById('trustScoreDialog')?.close();
    document.getElementById('reportListingDialog')?.showModal();
  }

  return {
    init,
    openTrustScore,
    openReportModal
  };
})();
