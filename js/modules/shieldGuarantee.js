/* ==========================================================================
   Local Care - Shield Protection & ₹10,000 Quality Guarantee Module
   Consumer protection policy, damage guarantee, and interactive claim tracker
   ========================================================================== */

window.ShieldGuarantee = (function () {
  'use strict';

  function init() {
    renderShieldModal();
  }

  function openShieldModal() {
    document.getElementById('shieldDialog')?.showModal();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function renderShieldModal() {
    if (document.getElementById('shieldDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'shieldDialog';
    dialog.className = 'app-dialog shield-dialog';
    dialog.innerHTML = `
      <div class="dialog-content-wrapper shield-modal-wrapper">
        <div class="dialog-header shield-modal-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="shield-badge-gold">🛡️</div>
            <div>
              <h3 class="dialog-title">LocalCare Shield™ Protection</h3>
              <small style="color: rgba(255,255,255,0.9);">India's Strongest Consumer Protection & ₹10,000 Quality Cover</small>
            </div>
          </div>
          <button class="dialog-close-btn" style="color: #ffffff;" onclick="document.getElementById('shieldDialog').close()">✕</button>
        </div>

        <div class="dialog-body shield-modal-body">
          <div class="shield-hero-badge-box">
            <div class="shield-sum-insured">₹10,000</div>
            <div class="shield-sum-label">COMPLIMENTARY PROPERTY & SERVICE PROTECTION INCLUDED WITH EVERY BOOKING</div>
          </div>

          <!-- 4 Pillars -->
          <div class="shield-pillars-grid">
            <div class="shield-pillar-card">
              <span class="pillar-icon">💰</span>
              <h4>₹10,000 Damage Cover</h4>
              <p>Accidental damage during doorstep electrical, plumbing, or cleaning work is insured up to ₹10,000.</p>
            </div>

            <div class="shield-pillar-card">
              <span class="pillar-icon">🔄</span>
              <h4>30-Day Free Revisit</h4>
              <p>If the repaired issue reoccurs within 30 days, we dispatch a senior supervisor to fix it at zero cost.</p>
            </div>

            <div class="shield-pillar-card">
              <span class="pillar-icon">👮</span>
              <h4>Police Background Checked</h4>
              <p>Every technician undergoes Aadhaar biometric identity and local police criminal verification.</p>
            </div>

            <div class="shield-pillar-card">
              <span class="pillar-icon">💎</span>
              <h4>Zero Hidden Surges</h4>
              <p>The rate quoted upfront is what you pay. No doorstep surprise surcharges or forced material fees.</p>
            </div>
          </div>

          <!-- Quick Claim Trigger -->
          <div class="shield-claim-box">
            <div>
              <h4 style="margin-bottom: 0.25rem;">Need to file a Shield Claim?</h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">Our 24/7 dedicated resolution cell handles claims within 2 hours.</p>
            </div>
            <button class="action-btn action-btn-primary" onclick="window.ShieldGuarantee.openClaimWorkflow()">
              File Shield Claim ➔
            </button>
          </div>
        </div>

        <div class="dialog-footer">
          <button class="action-btn action-btn-ghost" onclick="document.getElementById('shieldDialog').close()">
            Close
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
  }

  function openClaimWorkflow() {
    document.getElementById('shieldDialog')?.close();
    if (window.LocalCare) {
      window.LocalCare.showToast('Connecting to Priority Resolution Manager (Ticket #LC-SHIELD-991)...', 'info');
    }
    setTimeout(() => {
      if (window.LocalCare) {
        window.LocalCare.showToast('Shield Claim initiated! Dedicated concierge is assigned.', 'success');
      }
    }, 1200);
  }

  return {
    init,
    openShieldModal,
    openClaimWorkflow
  };
})();
