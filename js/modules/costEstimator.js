/* ==========================================================================
   Local Care - Smart Cost Estimator & Rate Calculator Module
   Instant transparent market rate estimator for home repairs, healthcare,
   and services with labor, parts, and warranty breakdowns
   ========================================================================== */

window.CostEstimator = (function () {
  'use strict';

  const SERVICE_PRICING_MODELS = [
    {
      id: 'ac_service',
      category: 'electrical',
      title: 'AC Power Jet Servicing & Foam Wash',
      baseLabor: 449,
      partsMultiplier: 0,
      urgencySurcharge: 150,
      warrantyDays: 30,
      unitsLabel: 'Number of ACs',
      units: [1, 2, 3, 4],
      unitMultiplier: [1, 1.85, 2.7, 3.5],
      marketAvg: '₹499 - ₹700',
      description: 'Indoor coil pressure wash, blower sterilization, outdoor unit jet spray & amp check.'
    },
    {
      id: 'ac_gas',
      category: 'electrical',
      title: 'AC Gas Leakage Fix & R32/R410 Refrigerant Refill',
      baseLabor: 800,
      partsMultiplier: 1400,
      urgencySurcharge: 250,
      warrantyDays: 60,
      unitsLabel: 'Number of AC Units',
      units: [1, 2],
      unitMultiplier: [1, 1.9],
      marketAvg: '₹2,200 - ₹2,800',
      description: 'Nitrogen pressure leak testing, copper braising/welding, vacuum evacuation & gas charging.'
    },
    {
      id: 'plumbing_leak',
      category: 'home',
      title: 'Concealed Bathroom Pipe / Wall Seepage Repair',
      baseLabor: 399,
      partsMultiplier: 250,
      urgencySurcharge: 150,
      warrantyDays: 30,
      unitsLabel: 'Number of Leakage Points',
      units: [1, 2, 3],
      unitMultiplier: [1, 1.7, 2.4],
      marketAvg: '₹600 - ₹950',
      description: 'Acoustic leak detection, connector replacement, Teflon re-threading & pressure testing.'
    },
    {
      id: 'dental_rootcanal',
      category: 'health',
      title: 'Single-Sitting Rotary Root Canal Treatment (RCT)',
      baseLabor: 2999,
      partsMultiplier: 1000,
      urgencySurcharge: 300,
      warrantyDays: 180,
      unitsLabel: 'Number of Teeth',
      units: [1, 2],
      unitMultiplier: [1, 1.95],
      marketAvg: '₹3,500 - ₹5,000',
      description: 'Digital 3D OPG imaging, computer-guided rotary canal disinfection & bioceramic obturation.'
    },
    {
      id: 'cleaning_deep',
      category: 'cleaning',
      title: 'Complete Home Deep Cleaning & Sanitization',
      baseLabor: 1499,
      partsMultiplier: 300,
      urgencySurcharge: 200,
      warrantyDays: 14,
      unitsLabel: 'Home Layout',
      units: ['1 BHK', '2 BHK', '3 BHK', '4 BHK / Villa'],
      unitMultiplier: [1, 1.6, 2.3, 3.2],
      marketAvg: '₹1,800 - ₹3,500',
      description: 'Single-disc floor scrubbing, window mesh descaling, kitchen degreasing & UV sterilization.'
    },
    {
      id: 'towing_breakdown',
      category: 'auto',
      title: 'Flatbed Hydraulic Roadside Towing / Breakdown Rescue',
      baseLabor: 999,
      partsMultiplier: 0,
      urgencySurcharge: 200,
      warrantyDays: 7,
      unitsLabel: 'Towing Distance (km)',
      units: ['Under 5 km', '5 - 15 km', '15 - 30 km'],
      unitMultiplier: [1, 1.5, 2.2],
      marketAvg: '₹1,200 - ₹2,200',
      description: 'Damage-free wheel-lift / flatbed hydraulic transport by certified vehicle recovery crew.'
    }
  ];

  let selectedModelId = 'ac_service';
  let selectedUnitIndex = 0;
  let isExpress = false;

  function init() {
    renderEstimatorModal();
  }

  function openEstimator(preselectedCategory = null) {
    if (preselectedCategory) {
      const match = SERVICE_PRICING_MODELS.find(m => m.category === preselectedCategory);
      if (match) selectedModelId = match.id;
    }
    updateEstimatorView();
    document.getElementById('costEstimatorDialog')?.showModal();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function renderEstimatorModal() {
    if (document.getElementById('costEstimatorDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'costEstimatorDialog';
    dialog.className = 'app-dialog estimator-dialog';
    dialog.innerHTML = `
      <div class="dialog-content-wrapper estimator-modal-wrapper">
        <div class="dialog-header">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.5rem;">💰</span>
            <div>
              <h3 class="dialog-title">Smart Instant Cost Estimator</h3>
              <small style="color: var(--text-secondary);">Transparent Indian hyper-local market rates with parts & labor breakdown</small>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('costEstimatorDialog').close()">✕</button>
        </div>

        <div class="dialog-body estimator-body">
          <!-- Step 1: Select Service -->
          <div class="estimator-row">
            <label class="form-label">1. Choose Service Requirement:</label>
            <select class="form-select" id="estimatorServiceSelect">
              ${SERVICE_PRICING_MODELS.map(m => `
                <option value="${m.id}" ${m.id === selectedModelId ? 'selected' : ''}>${m.title}</option>
              `).join('')}
            </select>
          </div>

          <!-- Step 2: Units / Scope Buttons -->
          <div class="estimator-row" style="margin-top: 1rem;">
            <label class="form-label" id="estimatorUnitsLabel">2. Select Scope:</label>
            <div class="units-button-group" id="estimatorUnitsGroup"></div>
          </div>

          <!-- Step 3: Urgency Toggle -->
          <div class="estimator-row" style="margin-top: 1rem;">
            <label class="form-label">3. Service Urgency:</label>
            <div class="urgency-toggle-group">
              <button type="button" class="urgency-btn active" id="btnSchedUrgency" onclick="window.CostEstimator.setExpress(false)">
                <span>📅</span> Standard (Scheduled)
              </button>
              <button type="button" class="urgency-btn" id="btnExpressUrgency" onclick="window.CostEstimator.setExpress(true)">
                <span>⚡</span> Express (Sub-45 Mins Arrival)
              </button>
            </div>
          </div>

          <!-- Price Output Calculation Card -->
          <div class="estimate-result-card" id="estimatorResultCard">
            <!-- Computed output dynamically inserted -->
          </div>

          <!-- Matching Verified Pros for this Estimate -->
          <div class="estimator-matching-pros" id="estimatorMatchingPros">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <div class="dialog-footer" style="justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: var(--text-secondary);">
            <span>🛡️</span> Backed by LocalCare ₹10,000 Quality Guarantee
          </div>
          <button class="action-btn action-btn-primary" id="estimatorProceedBtn" onclick="window.CostEstimator.proceedWithEstimate()">
            <span>⚡</span> Book Verified Pro at this Estimate ➔
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    // Event listener for dropdown
    const select = document.getElementById('estimatorServiceSelect');
    select?.addEventListener('change', (e) => {
      selectedModelId = e.target.value;
      selectedUnitIndex = 0;
      updateEstimatorView();
      if (window.SoundFX) window.SoundFX.playClick();
    });
  }

  function setExpress(express) {
    isExpress = express;
    document.getElementById('btnSchedUrgency')?.classList.toggle('active', !express);
    document.getElementById('btnExpressUrgency')?.classList.toggle('active', express);
    updateEstimatorView();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function selectUnit(index) {
    selectedUnitIndex = index;
    updateEstimatorView();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function calculate() {
    const model = SERVICE_PRICING_MODELS.find(m => m.id === selectedModelId) || SERVICE_PRICING_MODELS[0];
    const multiplier = model.unitMultiplier[selectedUnitIndex] || 1;
    const labor = Math.round(model.baseLabor * multiplier);
    const parts = Math.round(model.partsMultiplier * multiplier);
    const urgency = isExpress ? model.urgencySurcharge : 0;
    const totalEst = labor + parts + urgency;
    const lowEst = Math.round(totalEst * 0.92);
    const highEst = Math.round(totalEst * 1.08);

    return {
      model,
      labor,
      parts,
      urgency,
      totalEst,
      lowEst,
      highEst
    };
  }

  function updateEstimatorView() {
    const model = SERVICE_PRICING_MODELS.find(m => m.id === selectedModelId) || SERVICE_PRICING_MODELS[0];
    const calc = calculate();

    // 1. Units Label & Buttons
    const labelEl = document.getElementById('estimatorUnitsLabel');
    if (labelEl) labelEl.textContent = `2. ${model.unitsLabel}:`;

    const unitsGroup = document.getElementById('estimatorUnitsGroup');
    if (unitsGroup) {
      unitsGroup.innerHTML = model.units.map((u, idx) => `
        <button type="button" class="unit-chip ${idx === selectedUnitIndex ? 'active' : ''}" onclick="window.CostEstimator.selectUnit(${idx})">
          ${u}
        </button>
      `).join('');
    }

    // 2. Computed Result Card
    const resultCard = document.getElementById('estimatorResultCard');
    if (resultCard) {
      resultCard.innerHTML = `
        <div class="estimate-result-header">
          <div>
            <span class="estimate-badge-pill">TRANSPARENT ESTIMATE</span>
            <div class="estimate-total-price">₹${calc.totalEst.toLocaleString('en-IN')}</div>
            <div class="estimate-price-range">Market Range: ₹${calc.lowEst.toLocaleString('en-IN')} – ₹${calc.highEst.toLocaleString('en-IN')}</div>
          </div>
          <div class="estimate-warranty-badge">
            <span class="warranty-icon">🛡️</span>
            <div>
              <strong>${model.warrantyDays}-Day Warranty</strong>
              <small>Free Revisit Guarantee</small>
            </div>
          </div>
        </div>

        <div class="estimate-breakdown-list">
          <div class="breakdown-item">
            <span>👷 Certified Professional Labor & Inspection</span>
            <strong>₹${calc.labor.toLocaleString('en-IN')}</strong>
          </div>
          ${calc.parts > 0 ? `
            <div class="breakdown-item">
              <span>🔩 Genuine Replacement Parts & Consumables</span>
              <strong>₹${calc.parts.toLocaleString('en-IN')}</strong>
            </div>
          ` : ''}
          ${calc.urgency > 0 ? `
            <div class="breakdown-item express">
              <span>⚡ Express Priority Dispatch (<45 min arrival)</span>
              <strong>+₹${calc.urgency}</strong>
            </div>
          ` : ''}
          <div class="breakdown-item summary-item">
            <span>Platform Service Fee & Insurance Protection</span>
            <strong style="color: var(--success);">FREE (₹0)</strong>
          </div>
        </div>
      `;
    }

    // 3. Matching Pros Preview
    const prosContainer = document.getElementById('estimatorMatchingPros');
    if (prosContainer && window.LocalCare) {
      const all = window.LocalCare.getAllBusinesses();
      const matched = all.filter(b => b.category === model.category).slice(0, 2);

      if (matched.length > 0) {
        prosContainer.innerHTML = `
          <div style="font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem; color: var(--text-primary);">
            Available Verified Professionals Ready to Book:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem;">
            ${matched.map(pro => `
              <div class="est-pro-card" onclick="window.CostEstimator.bookSpecificPro('${pro.id}')">
                <img src="${pro.image}" alt="${pro.name}" class="est-pro-thumb" />
                <div style="flex: 1; overflow: hidden;">
                  <h5 style="font-size: 0.88rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${pro.name}</h5>
                  <div style="font-size: 0.75rem; color: var(--text-secondary);">★ ${pro.rating} • ${pro.locality}</div>
                  <div style="font-size: 0.75rem; color: var(--primary); font-weight: 700;">Starting ₹${pro.startingPrice}</div>
                </div>
                <button class="action-btn action-btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">Select</button>
              </div>
            `).join('')}
          </div>
        `;
      } else {
        prosContainer.innerHTML = '';
      }
    }
  }

  function proceedWithEstimate() {
    const calc = calculate();
    document.getElementById('costEstimatorDialog')?.close();

    // Trigger quote marketplace or booking engine
    if (window.QuoteMarketplace) {
      window.QuoteMarketplace.openQuotesModal(calc.model.category);
      if (window.LocalCare) {
        window.LocalCare.showToast(`Broadcasting request with estimated budget: ₹${calc.totalEst}`, 'success');
      }
    }
  }

  function bookSpecificPro(businessId) {
    document.getElementById('costEstimatorDialog')?.close();
    const all = window.LocalCare ? window.LocalCare.getAllBusinesses() : window.INITIAL_BUSINESSES;
    const b = all.find(x => x.id === businessId);
    if (b && window.BookingEngine) {
      window.BookingEngine.openBookingModal(b);
    }
  }

  return {
    init,
    openEstimator,
    setExpress,
    selectUnit,
    proceedWithEstimate,
    bookSpecificPro
  };
})();
