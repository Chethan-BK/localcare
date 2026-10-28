/* ==========================================================================
   Local Care - Pro Comparison Matrix Module
   Allows users to select up to 3 local providers and compare side-by-side:
   Trust scores, pricing, response speed, warranty, police KYC & real-time slots
   ========================================================================== */

window.ProComparison = (function () {
  'use strict';

  const MAX_COMPARE = 3;
  let selectedIds = new Set();

  function init() {
    renderComparisonDock();
    renderComparisonModal();
  }

  function getSelectedBusinesses() {
    if (typeof getAllBusinesses !== 'function' && (!window.LocalCare || !window.LocalCare.getAllBusinesses)) {
      const all = [...(window.INITIAL_BUSINESSES || [])];
      return all.filter(b => selectedIds.has(b.id));
    }
    const all = window.LocalCare ? window.LocalCare.getAllBusinesses() : window.INITIAL_BUSINESSES;
    return all.filter(b => selectedIds.has(b.id));
  }

  function toggleCompare(businessId) {
    if (selectedIds.has(businessId)) {
      selectedIds.delete(businessId);
      if (window.SoundFX) window.SoundFX.playClick();
      if (window.LocalCare) window.LocalCare.showToast('Removed from comparison', 'info');
    } else {
      if (selectedIds.size >= MAX_COMPARE) {
        if (window.LocalCare) window.LocalCare.showToast(`You can compare up to ${MAX_COMPARE} businesses at once`, 'warning');
        return false;
      }
      selectedIds.add(businessId);
      if (window.SoundFX) window.SoundFX.playBubble();
      if (window.LocalCare) window.LocalCare.showToast('Added to comparison matrix ⚖️', 'success');
    }

    updateUI();
    return selectedIds.has(businessId);
  }

  function isComparing(businessId) {
    return selectedIds.has(businessId);
  }

  function clearAll() {
    selectedIds.clear();
    updateUI();
  }

  function updateUI() {
    // 1. Update Card Checkboxes/Buttons
    document.querySelectorAll('[data-compare-id]').forEach(el => {
      const id = el.getAttribute('data-compare-id');
      const active = selectedIds.has(id);
      el.classList.toggle('comparing', active);
      if (el.tagName === 'INPUT' && el.type === 'checkbox') {
        el.checked = active;
      }
    });

    // 2. Update Dock Visibility and Items
    const dock = document.getElementById('compareFloatingDock');
    if (!dock) return;

    if (selectedIds.size > 0) {
      dock.classList.add('visible');
      const itemsList = document.getElementById('compareDockItems');
      const countEl = document.getElementById('compareDockCount');
      if (countEl) countEl.textContent = `${selectedIds.size}/${MAX_COMPARE}`;

      const items = getSelectedBusinesses();
      if (itemsList) {
        itemsList.innerHTML = items.map(item => `
          <div class="compare-dock-pill" title="${item.name}">
            <img src="${item.image}" alt="${item.name}" class="dock-thumb" />
            <span class="dock-name">${item.name}</span>
            <button class="dock-remove-btn" onclick="window.ProComparison.toggleCompare('${item.id}')" title="Remove">✕</button>
          </div>
        `).join('');
      }
    } else {
      dock.classList.remove('visible');
    }
  }

  function renderComparisonDock() {
    if (document.getElementById('compareFloatingDock')) return;

    const dock = document.createElement('div');
    dock.id = 'compareFloatingDock';
    dock.className = 'compare-floating-dock';
    dock.innerHTML = `
      <div class="dock-inner">
        <div class="dock-left">
          <div class="dock-badge">⚖️ Compare Pros (<span id="compareDockCount">0/3</span>)</div>
          <div class="compare-dock-items" id="compareDockItems"></div>
        </div>
        <div class="dock-actions">
          <button class="action-btn action-btn-ghost dock-clear-btn" onclick="window.ProComparison.clearAll()">Clear</button>
          <button class="action-btn action-btn-primary dock-launch-btn" onclick="window.ProComparison.openModal()">
            <span>⚖️</span> Compare Side-by-Side ➔
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dock);
  }

  function renderComparisonModal() {
    if (document.getElementById('compareDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'compareDialog';
    dialog.className = 'app-dialog compare-dialog';
    dialog.innerHTML = `
      <div class="dialog-content-wrapper compare-modal-wrapper">
        <div class="dialog-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.5rem;">⚖️</span>
            <div>
              <h3 class="dialog-title">Side-by-Side Pro Comparison Matrix</h3>
              <small style="color: var(--text-secondary);">Direct evaluation of verified credentials, response speeds, and rates</small>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('compareDialog').close()">✕</button>
        </div>

        <div class="dialog-body compare-modal-body" id="compareMatrixBody">
          <!-- Rendered dynamically -->
        </div>

        <div class="dialog-footer" style="justify-content: space-between;">
          <button class="action-btn action-btn-ghost" onclick="window.ProComparison.clearAll(); document.getElementById('compareDialog').close();">
            Reset Comparison
          </button>
          <button class="action-btn action-btn-outline" onclick="document.getElementById('compareDialog').close()">
            Close
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
  }

  function openModal() {
    const items = getSelectedBusinesses();
    if (items.length < 2) {
      if (window.LocalCare) window.LocalCare.showToast('Please select at least 2 businesses to compare', 'info');
      return;
    }

    const body = document.getElementById('compareMatrixBody');
    if (!body) return;

    if (window.SoundFX) window.SoundFX.playClick();

    // Render comparison columns
    let html = `
      <div class="compare-table-responsive">
        <table class="compare-table">
          <thead>
            <tr>
              <th class="matrix-feature-col">Feature / Metric</th>
              ${items.map(b => `
                <th class="matrix-pro-col">
                  <div class="matrix-pro-card">
                    <img src="${b.image}" alt="${b.name}" class="matrix-pro-img" />
                    <h4 class="matrix-pro-title">${b.name}</h4>
                    <div class="matrix-pro-loc">📍 ${b.locality}</div>
                    <div class="matrix-pro-price">Starts ₹${b.startingPrice || 299}</div>
                    <button class="action-btn action-btn-primary matrix-book-btn" onclick="window.ProComparison.bookPro('${b.id}')">
                      ⚡ Book Now
                    </button>
                  </div>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <!-- Trust Score -->
            <tr>
              <td class="matrix-feature-name">
                <strong>🛡️ LocalCare Trust Score</strong>
                <small>Multi-pillar audit rating</small>
              </td>
              ${items.map(b => `
                <td class="matrix-val-cell">
                  <span class="trust-pill-score ${b.trustScore >= 95 ? 'excellent' : 'good'}">
                    ${b.trustScore || 94}/100
                  </span>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">
                    ${b.trustScore >= 95 ? 'Top 1% Audited' : 'Verified Partner'}
                  </div>
                </td>
              `).join('')}
            </tr>

            <!-- User Rating & Reviews -->
            <tr>
              <td class="matrix-feature-name">
                <strong>⭐ Rating & Customer Reviews</strong>
                <small>From verified bookings</small>
              </td>
              ${items.map(b => `
                <td class="matrix-val-cell">
                  <div style="font-weight: 800; font-size: 1.1rem; color: #f59e0b;">★ ${b.rating} / 5.0</div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary);">${b.reviewsCount} verified reviews</div>
                </td>
              `).join('')}
            </tr>

            <!-- Response Speed -->
            <tr>
              <td class="matrix-feature-name">
                <strong>⚡ Response & Arrival Time</strong>
                <small>Average doorstep dispatch</small>
              </td>
              ${items.map(b => `
                <td class="matrix-val-cell">
                  <span class="speed-pill">⏱️ ${b.responseTime || '~8 min'}</span>
                </td>
              `).join('')}
            </tr>

            <!-- Distance from You -->
            <tr>
              <td class="matrix-feature-name">
                <strong>📍 Distance from Location</strong>
                <small>Estimated proximity</small>
              </td>
              ${items.map(b => `
                <td class="matrix-val-cell">
                  <strong>${b.distance || '1.2 km'}</strong>
                </td>
              `).join('')}
            </tr>

            <!-- Availability & Hours -->
            <tr>
              <td class="matrix-feature-name">
                <strong>📅 Booking Availability</strong>
                <small>Same day slot status</small>
              </td>
              ${items.map(b => `
                <td class="matrix-val-cell">
                  ${b.availableToday ? '<span class="status-avail-badge">🟢 Slots Open Today</span>' : '<span style="color: var(--text-muted);">Tomorrow onwards</span>'}
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${b.operatingHours}</div>
                </td>
              `).join('')}
            </tr>

            <!-- Service Delivery Mode -->
            <tr>
              <td class="matrix-feature-name">
                <strong>🏠 Service Mode</strong>
                <small>Doorstep vs At Premises</small>
              </td>
              ${items.map(b => `
                <td class="matrix-val-cell">
                  ${b.homeService ? '✅ Doorstep Service' : '🏥 Clinic / Workshop Visit'}
                </td>
              `).join('')}
            </tr>

            <!-- Verification & Safety -->
            <tr>
              <td class="matrix-feature-name">
                <strong>🔒 Government & Police Verification</strong>
                <small>Identity & background check</small>
              </td>
              ${items.map(b => `
                <td class="matrix-val-cell">
                  <div class="kyc-checklist">
                    <div>✓ GSTIN & Council Reg</div>
                    <div>✓ Police Verified Staff</div>
                    <div>✓ Inspected Premises</div>
                  </div>
                </td>
              `).join('')}
            </tr>

            <!-- Quality Guarantee -->
            <tr>
              <td class="matrix-feature-name">
                <strong>🛡️ LocalCare Shield Guarantee</strong>
                <small>Damage protection & warranty</small>
              </td>
              ${items.map(() => `
                <td class="matrix-val-cell">
                  <span style="color: var(--success); font-weight: 700;">₹10,000 Cover</span>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">30-Day Re-service Warranty</div>
                </td>
              `).join('')}
            </tr>

            <!-- Top Services & Pricing -->
            <tr>
              <td class="matrix-feature-name">
                <strong>🛠️ Core Services & Rates</strong>
                <small>Direct upfront pricing</small>
              </td>
              ${items.map(b => `
                <td class="matrix-val-cell" style="text-align: left;">
                  <ul class="matrix-services-list">
                    ${b.services.slice(0, 3).map(s => `
                      <li><span>${s.name}</span><strong>₹${s.price}</strong></li>
                    `).join('')}
                  </ul>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    body.innerHTML = html;
    document.getElementById('compareDialog').showModal();
  }

  function bookPro(businessId) {
    document.getElementById('compareDialog')?.close();
    const all = window.LocalCare ? window.LocalCare.getAllBusinesses() : window.INITIAL_BUSINESSES;
    const b = all.find(x => x.id === businessId);
    if (b && window.BookingEngine) {
      window.BookingEngine.openBookingModal(b);
    }
  }

  return {
    init,
    toggleCompare,
    isComparing,
    clearAll,
    openModal,
    bookPro,
    updateUI
  };
})();
