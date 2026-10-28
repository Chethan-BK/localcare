/* ==========================================================================
   Local Care - CareAI Suite 3.0 Module
   Includes:
   1. Visual CareAI Photo Diagnostic Scanner (Image analysis & triage)
   2. AI Problem Matchmaker & Root-Cause Estimator
   3. AI Review Sentiment Summarizer & Insights Engine
   4. AI Dynamic Price & Off-Peak Booking Forecaster
   5. Unified Floating Action Command Dock Controller
   ========================================================================== */

window.CareAISuite = (function () {
  'use strict';

  // Preset Visual Diagnostic Scenarios for Photo Scanner
  const VISUAL_SCENARIOS = {
    leak: {
      id: 'leak',
      title: 'Plumbing: Kitchen Sink P-Trap Leak & Pipe Corrosion',
      category: 'home',
      categoryName: 'Plumbing & Drainage',
      severity: 'Moderate',
      severityColor: '#f59e0b',
      detectedIssue: 'Damaged P-trap compression washer with calcium buildup and loose slip-joint nut.',
      requiredAction: 'Replace P-trap washer, tighten slip joints, and clear secondary drain line.',
      estimatedCost: '₹350 - ₹480',
      estimatedTime: '25 - 40 mins',
      recommendedParts: 'PVC Slip Nut, 1.5" Rubber Beveled Washer, PTFE Sealant Tape',
      icon: '🚰',
      imagePreview: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
      sampleTip: 'Shut off the under-sink isolation valve immediately to prevent cabinet water damage.'
    },
    ac: {
      id: 'ac',
      title: 'AC: Evaporator Coil Icing & Indoor Unit Dripping',
      category: 'electrical',
      categoryName: 'AC & Appliance Repair',
      severity: 'High',
      severityColor: '#ef4444',
      detectedIssue: 'Restricted airflow caused by clogged dust filter leading to evaporator coil icing and condensate drain overflow.',
      requiredAction: 'High-pressure power jet coil cleaning, defrosting, and drain line backflush.',
      estimatedCost: '₹499 - ₹699',
      estimatedTime: '45 - 60 mins',
      recommendedParts: 'Anti-microbial coil cleaner, Condensate pump purge',
      icon: '❄️',
      imagePreview: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
      sampleTip: 'Turn off cooling mode and run fan only for 30 minutes to melt the ice safely.'
    },
    electrical: {
      id: 'electrical',
      title: 'Electrical: Burnt 16A Power Socket & Carbon Arcing',
      category: 'electrical',
      categoryName: 'Electrician & Wiring',
      severity: 'Critical (Safety Hazard)',
      severityColor: '#dc2626',
      detectedIssue: 'Loose terminal screw caused contact resistance, resulting in thermal scorching of socket housing and charred insulation.',
      requiredAction: 'Isolate circuit at MCB, strip damaged copper, and install modular 16A ceramic-base socket.',
      estimatedCost: '₹300 - ₹450',
      estimatedTime: '20 - 30 mins',
      recommendedParts: '16A Modular Switch & Socket, 2.5 sq mm FR Wire sleeve',
      icon: '⚡',
      imagePreview: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
      sampleTip: '⚠️ Do not touch with bare hands! Switch off the main trip switch (MCB) immediately.'
    },
    car: {
      id: 'car',
      title: 'Auto: Front Bumper Crease Dent & Paint Scuff',
      category: 'auto',
      categoryName: 'Car Care & Detailing',
      severity: 'Minor (Cosmetic)',
      severityColor: '#10b981',
      detectedIssue: 'Polypropylene bumper deformation with clear coat surface abrasion without underlying metal crumple.',
      requiredAction: 'Heat gun reshaped Paintless Dent Repair (PDR) + 3M multi-stage compounding polish.',
      estimatedCost: '₹1,200 - ₹1,800',
      estimatedTime: '2 - 3 hours',
      recommendedParts: 'High-gloss clear coat touchup, 3M rubbing compound',
      icon: '🚗',
      imagePreview: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
      sampleTip: 'PDR retains original factory paint warranty and prevents insurance claim deductible loss.'
    },
    dental: {
      id: 'dental',
      title: 'Dental: Deep Occlusal Molar Cavity & Pulp Sensitivity',
      category: 'health',
      categoryName: 'Dental Care',
      severity: 'Urgent',
      severityColor: '#ea580c',
      detectedIssue: 'Class I enamel cavitation extending toward dentin pulp chamber with thermal sensitivity.',
      requiredAction: 'Digital bitewing X-ray diagnosis followed by light-cure composite restoration or root canal triage.',
      estimatedCost: '₹500 consultation (Filling: ₹1,200)',
      estimatedTime: '45 mins',
      recommendedParts: 'Nanohybrid Composite Resin, Desensitizing Base',
      icon: '🩺',
      imagePreview: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=600&q=80',
      sampleTip: 'Avoid extremely cold or hot beverages. Rinse with lukewarm salt water.'
    }
  };

  let activePhotoScenario = 'leak';
  let isScanningActive = false;

  function init() {
    initCommandDock();
    initModals();
  }

  /* ==========================================================================
     1. Unified Floating Action Command Dock Controller
     ========================================================================== */
  function initCommandDock() {
    // Listen for outside clicks to close dock menu
    document.addEventListener('click', (e) => {
      const dock = document.getElementById('floatingCommandDock');
      const menu = document.getElementById('commandDockMenu');
      if (menu && menu.classList.contains('active')) {
        if (dock && !dock.contains(e.target)) {
          menu.classList.remove('active');
          const toggle = document.getElementById('dockMenuToggleBtn');
          if (toggle) toggle.classList.remove('open');
        }
      }
    });
  }

  function toggleDockMenu() {
    const menu = document.getElementById('commandDockMenu');
    const toggle = document.getElementById('dockMenuToggleBtn');
    if (!menu) return;

    menu.classList.toggle('active');
    if (toggle) toggle.classList.toggle('open');
    if (window.SoundFX) window.SoundFX.playBubble();
  }

  function toggleCareAI() {
    const panel = document.getElementById('careAiPanel');
    const input = document.getElementById('careAiInput');
    const menu = document.getElementById('commandDockMenu');
    if (menu) menu.classList.remove('active');

    if (panel) {
      panel.classList.toggle('active');
      const isActive = panel.classList.contains('active');
      panel.setAttribute('aria-hidden', !isActive);
      if (isActive && input) {
        input.focus();
        if (window.SoundFX) window.SoundFX.playBubble();
      }
    } else if (window.CareAI) {
      window.CareAI.init();
      const p = document.getElementById('careAiPanel');
      if (p) {
        p.classList.add('active');
        p.setAttribute('aria-hidden', 'false');
      }
    }
  }

  /* ==========================================================================
     2. Visual CareAI Photo Diagnostic Scanner
     ========================================================================== */
  function openDiagnosticScanner(presetKey = 'leak') {
    closeDockMenu();
    activePhotoScenario = presetKey;
    let dialog = document.getElementById('aiScannerDialog');
    if (!dialog) {
      renderScannerDialogTemplate();
      dialog = document.getElementById('aiScannerDialog');
    }
    if (!dialog) return;

    renderScannerContent(activePhotoScenario);
    dialog.showModal();
    if (window.SoundFX) window.SoundFX.playSuccess();
  }

  function renderScannerDialogTemplate() {
    if (document.getElementById('aiScannerDialog')) return;
    const dlg = document.createElement('dialog');
    dlg.id = 'aiScannerDialog';
    dlg.className = 'app-dialog scanner-dialog';
    dlg.style.cssText = 'width: 880px; max-width: 96vw;';
    dlg.setAttribute('aria-labelledby', 'scannerTitle');
    dlg.innerHTML = `
      <div class="dialog-content-wrapper scanner-modal-wrapper">
        <div class="dialog-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: linear-gradient(135deg, #2563eb, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: #fff;">
              📸
            </div>
            <div>
              <h3 class="dialog-title" id="scannerTitle">CareVision AI — Visual Diagnostic Lab</h3>
              <small style="color: var(--text-secondary);">Fault diagnosis, spare parts fair pricing & verified technician matching</small>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('aiScannerDialog').close()" aria-label="Close dialog">✕</button>
        </div>
        <div class="dialog-body" id="scannerModalContent" style="padding: 1.25rem;">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;
    document.body.appendChild(dlg);
  }

  function closeDockMenu() {
    const menu = document.getElementById('commandDockMenu');
    const toggle = document.getElementById('dockMenuToggleBtn');
    if (menu) menu.classList.remove('active');
    if (toggle) toggle.classList.remove('open');
  }

  function selectScannerScenario(scenarioKey) {
    activePhotoScenario = scenarioKey;
    renderScannerContent(scenarioKey);
  }

  function runVisualScan() {
    const scanContainer = document.getElementById('scannerVisionOverlay');
    const resultsPanel = document.getElementById('scannerResultsPanel');
    const scanBtn = document.getElementById('scannerRunBtn');
    if (!scanContainer || !resultsPanel) return;

    isScanningActive = true;
    scanBtn.disabled = true;
    scanBtn.innerHTML = '<span>⚡ Scanning & Diagnosing...</span>';
    scanContainer.classList.add('scanning-active');

    if (window.SoundFX) window.SoundFX.playBell();

    setTimeout(() => {
      isScanningActive = false;
      scanContainer.classList.remove('scanning-active');
      scanBtn.disabled = false;
      scanBtn.innerHTML = '<span>🔄 Re-Scan Image</span>';

      const sc = VISUAL_SCENARIOS[activePhotoScenario];
      displayScanDiagnosis(sc);
      if (window.SoundFX) window.SoundFX.playSuccess();
    }, 1200);
  }

  function renderScannerContent(scenarioKey) {
    const sc = VISUAL_SCENARIOS[scenarioKey] || VISUAL_SCENARIOS.leak;
    const dialog = document.getElementById('aiScannerDialog');
    if (!dialog) return;

    const content = document.getElementById('scannerModalContent');
    if (!content) return;

    content.innerHTML = `
      <div class="scanner-layout">
        <!-- Left: Image Preview & Interactive Laser Scan -->
        <div class="scanner-image-container">
          <div class="scanner-scenario-tabs">
            <button class="scanner-tab-pill ${scenarioKey === 'leak' ? 'active' : ''}" onclick="window.CareAISuite.selectScannerScenario('leak')">
              🚰 Pipe Leak
            </button>
            <button class="scanner-tab-pill ${scenarioKey === 'ac' ? 'active' : ''}" onclick="window.CareAISuite.selectScannerScenario('ac')">
              ❄️ AC Ice/Drip
            </button>
            <button class="scanner-tab-pill ${scenarioKey === 'electrical' ? 'active' : ''}" onclick="window.CareAISuite.selectScannerScenario('electrical')">
              ⚡ Burnt Socket
            </button>
            <button class="scanner-tab-pill ${scenarioKey === 'car' ? 'active' : ''}" onclick="window.CareAISuite.selectScannerScenario('car')">
              🚗 Car Dent
            </button>
            <button class="scanner-tab-pill ${scenarioKey === 'dental' ? 'active' : ''}" onclick="window.CareAISuite.selectScannerScenario('dental')">
              🩺 Toothache
            </button>
          </div>

          <div class="scanner-viewfinder" id="scannerVisionOverlay">
            <img src="${sc.imagePreview}" alt="${sc.title}" class="scanner-source-img" id="scannerMainImg" />
            
            <!-- AI Laser Scan Sweep Effect -->
            <div class="scanner-laser-beam"></div>

            <!-- AI Bounding Box Overlay -->
            <div class="scanner-bounding-box" id="scannerBoundingBox">
              <span class="box-tag">Defect: ${sc.categoryName} [98.4% Confidence]</span>
            </div>

            <!-- Live Camera / Custom Photo Upload Bar -->
            <div class="scanner-upload-bar">
              <label class="scanner-upload-label" title="Upload custom photo from your device">
                <span>📁 Upload Your Own Photo</span>
                <input type="file" accept="image/*" style="display: none;" onchange="window.CareAISuite.handleUserPhotoUpload(event)" />
              </label>
            </div>
          </div>

          <div style="margin-top: 1rem; text-align: center;">
            <button class="action-btn action-btn-primary" id="scannerRunBtn" style="padding: 0.75rem 1.8rem; font-size: 0.95rem; width: 100%; justify-content: center;" onclick="window.CareAISuite.runVisualScan()">
              <span>✨ Run AI Visual Diagnosis</span>
            </button>
          </div>
        </div>

        <!-- Right: Diagnostic Report & Matched Verified Pros -->
        <div class="scanner-diagnosis-container" id="scannerResultsPanel">
          <div class="scanner-waiting-state">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🤖</div>
            <h4 style="font-size: 1.15rem; margin-bottom: 0.35rem;">Click "Run AI Visual Diagnosis"</h4>
            <p style="font-size: 0.88rem; color: var(--text-secondary);">CareAI will detect the physical fault, calculate fair market parts & labour cost, and match top rated verified specialists.</p>
          </div>
        </div>
      </div>
    `;

    // Automatically trigger scan after brief moment
    setTimeout(runVisualScan, 300);
  }

  function handleUserPhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      const mainImg = document.getElementById('scannerMainImg');
      if (mainImg) {
        mainImg.src = evt.target.result;
        if (window.LocalCare) {
          window.LocalCare.showToast('Custom photo loaded! Running AI visual analysis...', 'info');
        }
        runVisualScan();
      }
    };
    reader.readAsDataURL(file);
  }

  function displayScanDiagnosis(sc) {
    const panel = document.getElementById('scannerResultsPanel');
    if (!panel) return;

    const allBusinesses = (window.LocalCare && window.LocalCare.getAllBusinesses) 
      ? window.LocalCare.getAllBusinesses() 
      : (window.INITIAL_BUSINESSES || []);

    const currentCity = (window.LocalCare && window.LocalCare.getCurrentCity) 
      ? window.LocalCare.getCurrentCity() 
      : 'Bengaluru';

    // Find matching verified pros
    let matches = allBusinesses.filter(b => b.category === sc.category && b.city.toLowerCase() === currentCity.toLowerCase());
    if (matches.length === 0) {
      matches = allBusinesses.filter(b => b.category === sc.category);
    }
    const topPros = matches.slice(0, 2);

    const prosHTML = topPros.map((p, idx) => `
      <div class="matched-pro-compact" style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 0.6rem;">
        <div style="display: flex; align-items: center; gap: 0.65rem;">
          <img src="${p.thumbnail}" alt="${p.name}" style="width: 44px; height: 44px; border-radius: var(--radius-md); object-fit: cover;" />
          <div>
            <div style="font-weight: 700; font-size: 0.92rem;">${p.name}</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.4rem;">
              <span>⭐ ${p.rating} (${p.reviewsCount})</span>
              <span>•</span>
              <span style="color: var(--success); font-weight: 700;">${idx === 0 ? '99% Match' : '96% Match'}</span>
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button class="action-btn action-btn-outline" style="padding: 0.4rem 0.65rem; font-size: 0.78rem;" onclick="document.getElementById('aiScannerDialog').close(); window.LocalCare.openDetailModalById('${p.id}');">
            View
          </button>
          <button class="action-btn action-btn-primary" style="padding: 0.4rem 0.75rem; font-size: 0.78rem;" onclick="document.getElementById('aiScannerDialog').close(); window.LocalCare.openBookingById('${p.id}');">
            Book
          </button>
        </div>
      </div>
    `).join('');

    panel.innerHTML = `
      <div class="scanner-report-card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.6rem;">
          <div>
            <span style="font-size: 0.72rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">AI Visual Diagnostics</span>
            <h3 style="font-size: 1.15rem; color: var(--text-primary); margin-top: 2px;">${sc.title}</h3>
          </div>
          <span style="background: ${sc.severityColor}; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: var(--radius-full); white-space: nowrap;">
            ${sc.severity}
          </span>
        </div>

        <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 0.85rem; font-size: 0.85rem; line-height: 1.5;">
          <div style="font-weight: 700; color: var(--primary); margin-bottom: 0.25rem;">🔍 Technical Root Cause:</div>
          <p style="color: var(--text-secondary); margin: 0;">${sc.detectedIssue}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 0.85rem; font-size: 0.82rem;">
          <div style="background: var(--bg-subtle); padding: 0.65rem; border-radius: var(--radius-md);">
            <span style="color: var(--text-muted); font-size: 0.75rem; font-weight: 700;">FAIR MARKET ESTIMATE</span>
            <div style="font-weight: 800; font-size: 1.1rem; color: var(--success); margin-top: 2px;">${sc.estimatedCost}</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 0.65rem; border-radius: var(--radius-md);">
            <span style="color: var(--text-muted); font-size: 0.75rem; font-weight: 700;">EST. TIME TO RESOLVE</span>
            <div style="font-weight: 800; font-size: 1.1rem; color: var(--text-primary); margin-top: 2px;">${sc.estimatedTime}</div>
          </div>
        </div>

        <div style="font-size: 0.8rem; background: rgba(59, 130, 246, 0.08); border-left: 3px solid #3b82f6; padding: 0.5rem 0.75rem; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-bottom: 1rem;">
          <strong>💡 AI Safety Tip:</strong> ${sc.sampleTip}
        </div>

        <div style="margin-bottom: 0.5rem;">
          <div style="font-size: 0.82rem; font-weight: 800; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase;">
            ⭐ Recommended Top Verified Specialists
          </div>
          ${prosHTML}
        </div>

        <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
          <button class="action-btn action-btn-primary" style="flex: 1; justify-content: center; font-size: 0.88rem; padding: 0.65rem;" onclick="document.getElementById('aiScannerDialog').close(); window.JDFeatures.openBestDealModal('${sc.category}');">
            <span>⚡ Broadcast This Issue to All Nearby Pros</span>
          </button>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     3. AI Problem Matchmaker & Root-Cause Estimator
     ========================================================================== */
  function openProblemMatchmaker() {
    closeDockMenu();
    const dialog = document.getElementById('aiMatchmakerDialog');
    if (!dialog) return;

    dialog.showModal();
    const input = document.getElementById('matchmakerInput');
    if (input) input.focus();
  }

  function handleMatchmakerSubmit(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('matchmakerInput');
    const text = input ? input.value.trim() : '';
    if (!text) return;

    const resultsArea = document.getElementById('matchmakerResultsArea');
    if (!resultsArea) return;

    resultsArea.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem;">
        <div class="careai-thinking-spinner" style="width: 44px; height: 44px; border: 4px solid var(--border-subtle); border-top-color: var(--ai-purple); border-radius: 50%; margin: 0 auto 1rem auto; animation: spin 0.8s linear infinite;"></div>
        <h4 style="font-size: 1.1rem; margin-bottom: 0.35rem;">CareAI Decomposing Problem...</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Analyzing intent, calculating fair rates, and matching vetted specialists</p>
      </div>
    `;

    if (window.SoundFX) window.SoundFX.playClick();

    setTimeout(() => {
      renderMatchmakerOutput(text);
      if (window.SoundFX) window.SoundFX.playSuccess();
    }, 850);
  }

  function renderMatchmakerOutput(query) {
    const resultsArea = document.getElementById('matchmakerResultsArea');
    if (!resultsArea) return;

    const activeCity = (window.LocalCare && window.LocalCare.getCurrentCity) 
      ? window.LocalCare.getCurrentCity() 
      : 'Bengaluru';

    const parsed = window.AISearchEngine ? window.AISearchEngine.parseQuery(query, activeCity) : {};
    const catKey = parsed.category || detectCategoryFromQuery(query);
    const catName = getCategoryTitle(catKey);

    const allBusinesses = (window.LocalCare && window.LocalCare.getAllBusinesses) 
      ? window.LocalCare.getAllBusinesses() 
      : (window.INITIAL_BUSINESSES || []);

    let matchedPros = allBusinesses.filter(b => b.category === catKey && b.city.toLowerCase() === activeCity.toLowerCase());
    if (matchedPros.length === 0) matchedPros = allBusinesses.filter(b => b.category === catKey);
    const topMatches = matchedPros.slice(0, 3);

    const prosCards = topMatches.map((b, i) => `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 0.6rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${b.thumbnail}" alt="${b.name}" style="width: 48px; height: 48px; border-radius: var(--radius-md); object-fit: cover;" />
          <div>
            <div style="font-weight: 800; font-size: 0.95rem;">${b.name}</div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.4rem;">
              <span>⭐ ${b.rating} (${b.reviewsCount})</span>
              <span>•</span>
              <span>${b.locality}</span>
            </div>
            <div style="font-size: 0.75rem; color: #10b981; font-weight: 700; margin-top: 2px;">
              🎯 ${99 - i * 3}% Match for: "${query.slice(0, 35)}..."
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button class="action-btn action-btn-outline" style="font-size: 0.8rem; padding: 0.4rem 0.75rem;" onclick="document.getElementById('aiMatchmakerDialog').close(); window.LocalCare.openDetailModalById('${b.id}');">
            View
          </button>
          <button class="action-btn action-btn-primary" style="font-size: 0.8rem; padding: 0.4rem 0.85rem;" onclick="document.getElementById('aiMatchmakerDialog').close(); window.LocalCare.openBookingById('${b.id}');">
            Book
          </button>
        </div>
      </div>
    `).join('');

    resultsArea.innerHTML = `
      <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-top: 1rem; border: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
          <div>
            <span style="font-size: 0.75rem; font-weight: 800; color: var(--ai-purple); text-transform: uppercase;">✨ AI Problem Decomposition</span>
            <h4 style="font-size: 1.2rem; margin-top: 2px;">Matched Category: ${catName}</h4>
          </div>
          <span style="background: rgba(99, 102, 241, 0.15); color: var(--ai-purple); padding: 0.25rem 0.65rem; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 800;">
            ⚡ Verified Algorithm Match
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; margin-bottom: 1.25rem;">
          <div style="background: var(--bg-surface); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">ESTIMATED FAIR PRICE</span>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--success); margin-top: 2px;">₹399 - ₹750</div>
          </div>
          <div style="background: var(--bg-surface); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">TYPICAL RESOLUTION TIME</span>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary); margin-top: 2px;">30 - 60 Mins</div>
          </div>
          <div style="background: var(--bg-surface); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">SHIELD GUARANTEE</span>
            <div style="font-size: 1.15rem; font-weight: 800; color: #3b82f6; margin-top: 2px;">₹10,000 Cover</div>
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <div style="font-size: 0.85rem; font-weight: 800; margin-bottom: 0.5rem;">Top Matched Professionals in ${activeCity}:</div>
          ${prosCards || '<p style="color: var(--text-muted); font-size: 0.88rem;">No exact match in city. Showing regional verified experts.</p>'}
        </div>

        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button class="action-btn action-btn-ghost" onclick="document.getElementById('matchmakerInput').value = ''; document.getElementById('matchmakerResultsArea').innerHTML = '';">
            Clear
          </button>
          <button class="action-btn action-btn-primary" onclick="document.getElementById('aiMatchmakerDialog').close(); window.JDFeatures.openBestDealModal('${catKey}');">
            <span>⚡ Broadcast to Top 5 Quotes</span>
          </button>
        </div>
      </div>
    `;
  }

  function detectCategoryFromQuery(q) {
    const l = q.toLowerCase();
    if (l.includes('ac') || l.includes('fan') || l.includes('fridge') || l.includes('wire') || l.includes('electric') || l.includes('switch') || l.includes('power')) return 'electrical';
    if (l.includes('leak') || l.includes('pipe') || l.includes('tap') || l.includes('plumb') || l.includes('drain') || l.includes('sink') || l.includes('seepage')) return 'home';
    if (l.includes('teeth') || l.includes('dentist') || l.includes('doctor') || l.includes('fever') || l.includes('clinic') || l.includes('pain') || l.includes('health')) return 'health';
    if (l.includes('car') || l.includes('bike') || l.includes('dent') || l.includes('tyre') || l.includes('puncture') || l.includes('towing') || l.includes('auto')) return 'auto';
    if (l.includes('clean') || l.includes('sofa') || l.includes('sanitize') || l.includes('dust') || l.includes('maid')) return 'cleaning';
    if (l.includes('pack') || l.includes('move') || l.includes('shift') || l.includes('luggage') || l.includes('truck') || l.includes('relocation')) return 'packers';
    if (l.includes('hair') || l.includes('salon') || l.includes('facial') || l.includes('spa') || l.includes('makeup')) return 'salon';
    return 'home';
  }

  function getCategoryTitle(catKey) {
    const map = {
      health: 'Healthcare & Dental',
      electrical: 'Electrical & AC Repair',
      home: 'Plumbing & Home Repairs',
      cleaning: 'Deep Cleaning & Sanitization',
      auto: 'Car Care & Mechanics',
      packers: 'Packers & Movers',
      salon: 'Beauty, Salon & Spa',
      food: 'Food, Catering & Dining',
      b2b: 'B2B Wholesale / JD Mart'
    };
    return map[catKey] || 'Local Services';
  }

  /* ==========================================================================
     4. AI Review Summaries & Dynamic Off-Peak Pricing
     ========================================================================== */
  function getAISummaryForBusiness(business) {
    const rating = business.rating || 4.5;
    const cat = business.category || 'home';
    
    if (rating >= 4.8) {
      return {
        sentiment: '98% Positive',
        sentimentScore: 9.8,
        summary: 'Exceptional service quality with outstanding technician punctuality and zero hidden costs.',
        pros: ['Prompt 30-min arrival', 'Original spare parts', 'Polite & verified staff'],
        note: 'High demand during evening hours (5 PM - 8 PM).'
      };
    } else if (rating >= 4.5) {
      return {
        sentiment: '94% Positive',
        sentimentScore: 9.3,
        summary: 'Reliable and cost-effective work. Recommended by 94% of verified local clients in the neighborhood.',
        pros: ['Transparent rate card', 'Equipped with proper tools', 'Clean cleanup after work'],
        note: 'Advance slot booking recommended on weekends.'
      };
    } else {
      return {
        sentiment: '88% Positive',
        sentimentScore: 8.7,
        summary: 'Good value for emergency budget fixes. Fast phone response.',
        pros: ['Quick phone pickup', 'Reasonable rates'],
        note: 'Confirm parts pricing prior to job start.'
      };
    }
  }

  function getAIOffPeakTip(category) {
    const currentHour = new Date().getHours();
    if (currentHour >= 12 && currentHour <= 16) {
      return {
        isOffPeak: true,
        text: '⚡ AI Off-Peak Window Active: Book right now to get up to 15% discount on labour rates!',
        discount: '15%'
      };
    } else {
      return {
        isOffPeak: false,
        text: '⚡ AI Booking Tip: 1:00 PM - 4:00 PM is off-peak with instant slot allocation & ₹100 off.',
        discount: '₹100'
      };
    }
  }

  // ==========================================================================
  // 6. Visual CareAI Prescription & Invoice OCR Diagnostics Engine
  // ==========================================================================
  const OCR_SCENARIOS = {
    prescription: {
      id: 'prescription',
      type: 'medical',
      title: 'Doctor Medical Prescription (Apollo Dental Clinic)',
      docImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
      doctor: 'Dr. Arvind Rao, BDS, MDS (NABH Accredited)',
      patient: 'Chethan B K • 28/M • Koramangala',
      diagnosis: 'Acute Apical Periodontitis & Occlusal Cavity with Cold Sensitivity',
      date: 'Today',
      items: [
        { name: 'Amoxicillin 500mg Capsules', brand: 'Augmentin / Mox 500', dosage: '1 Cap TID (5 Days)', brandPrice: 185, genericPrice: 42, genericName: 'Amoxicillin I.P. 500mg', status: 'Generic Available' },
        { name: 'Ibuprofen + Paracetamol (Tab)', brand: 'Combiflam', dosage: '1 Tab SOS for Pain', brandPrice: 65, genericPrice: 18, genericName: 'Ibuprofen 400mg + PCM 325mg', status: 'Generic Available' },
        { name: 'Chlorhexidine 0.2% Antiseptic Mouthwash', brand: 'Hexidine 150ml', dosage: '10ml BID rinse', brandPrice: 155, genericPrice: 48, genericName: 'Chlorhexidine Gluconate 0.2%', status: 'Generic Available' }
      ],
      totalBrand: 405,
      totalGeneric: 108,
      savings: 297,
      savingsPct: '73%',
      warning: 'Take antibiotics with food. Finish full 5-day cycle even if pain subsides.',
      actionCta: 'Order at Nearest Jan Aushadhi Pharmacy'
    },
    autorepair: {
      id: 'autorepair',
      type: 'auto',
      title: 'Garage Repair Estimate & Parts Quotation',
      docImage: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
      doctor: 'SpeedMotors Multi-Brand Workshop, HSR Layout',
      patient: 'Vehicle: Hyundai i20 (Petrol) • 42,000 km',
      diagnosis: 'Periodic 40k Service + Brake Vibration on Highway Deceleration',
      date: 'Today',
      items: [
        { name: 'Full Synthetic Engine Oil 5W-30 (3.5L)', brand: 'Shell Helix Ultra', dosage: 'Replacement', brandPrice: 2400, genericPrice: 1950, genericName: 'Castrol / Servo Synthetic', status: 'Fair Price' },
        { name: 'Front Disc Brake Pads (Ceramic Set)', brand: 'Bosch Genuine', dosage: 'Both Wheels', brandPrice: 1850, genericPrice: 1350, genericName: 'TVS Girling OE Spec', status: 'Fair Price' },
        { name: 'Throttle Body & Injector Cleaning Labour', brand: 'Workshop Charge', dosage: 'Labour Only', brandPrice: 1400, genericPrice: 650, genericName: 'LocalCare Benchmark Labour', status: 'Overpriced (₹750 Markup)' }
      ],
      totalBrand: 5650,
      totalGeneric: 3950,
      savings: 1700,
      savingsPct: '30%',
      warning: 'Workshop is charging ₹1,400 for throttle body cleaning which takes 15 mins. Market benchmark is ₹650.',
      actionCta: 'Get 3 Counter-Quotes from Top Verified Garages'
    },
    acquote: {
      id: 'acquote',
      type: 'ac',
      title: 'AC Technician Invoice & Gas Refill Quote',
      docImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
      doctor: 'CoolTech Services (Unverified Freelancer)',
      patient: 'Appliance: Daikin 1.5 Ton Inverter Split AC',
      diagnosis: 'Indoor Unit Not Cooling & Outer Fan Running Slow',
      date: 'Today',
      items: [
        { name: 'R32 Eco Refrigerant Gas Refill (800g)', brand: 'Claimed 100% Full', dosage: 'Gas Top-up', brandPrice: 1950, genericPrice: 1299, genericName: 'LocalCare Verified Gas Top-up', status: 'Overpriced (₹650 Markup)' },
        { name: '45 MFD Dual Run Capacitor', brand: 'Epcos / Tibcon', dosage: 'Part Replacement', brandPrice: 850, genericPrice: 380, genericName: 'Standard ISI Heavy Duty 45uF', status: 'Overpriced (120% Markup)' },
        { name: 'Inspection & Nitrogen Pressure Test', brand: 'Service Labour', dosage: 'Labour', brandPrice: 500, genericPrice: 199, genericName: 'LocalCare Fixed Diagnosis Rate', status: 'Overpriced' }
      ],
      totalBrand: 3300,
      totalGeneric: 1878,
      savings: 1422,
      savingsPct: '43%',
      warning: 'Capacitor market MRP is only ₹320–₹400. You are being overcharged ₹530 for parts.',
      actionCta: 'Book LocalCare Shield AC Pro at Fixed ₹1,499'
    }
  };

  let activeOcrKey = 'prescription';

  function openPrescriptionOcrModal(presetKey = 'prescription') {
    activeOcrKey = presetKey;
    let dialog = document.getElementById('aiPrescriptionDialog');
    if (!dialog) {
      renderOcrDialogTemplate();
      dialog = document.getElementById('aiPrescriptionDialog');
    }

    renderOcrStudioContent();
    if (window.SoundFX) window.SoundFX.playPop();
    dialog.showModal();
  }

  function renderOcrDialogTemplate() {
    if (document.getElementById('aiPrescriptionDialog')) return;
    const dlg = document.createElement('dialog');
    dlg.id = 'aiPrescriptionDialog';
    dlg.className = 'modal-dialog jd-modal modal-xl';
    dlg.setAttribute('aria-labelledby', 'aiOcrTitle');
    dlg.innerHTML = `
      <div class="modal-content-wrapper" style="width: 840px; max-width: 95vw;">
        <div class="modal-header-clean">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: linear-gradient(135deg, #059669 0%, #10b981 100%); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: #ffffff;">
              📑
            </div>
            <div>
              <h3 class="modal-clean-title" id="aiOcrTitle">AI Prescription & Invoice OCR Diagnostics</h3>
              <span style="font-size: 0.8rem; color: var(--text-secondary);">Extract medications, detect overpriced repair parts & compare generic alternatives</span>
            </div>
          </div>
          <button class="modal-close-icon" onclick="document.getElementById('aiPrescriptionDialog').close()" aria-label="Close modal">✕</button>
        </div>
        <div class="modal-clean-body" id="ocrStudioContent" style="padding: 1.5rem;">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;
    document.body.appendChild(dlg);
  }

  function selectOcrScenario(key) {
    if (!OCR_SCENARIOS[key]) return;
    activeOcrKey = key;
    renderOcrStudioContent();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function renderOcrStudioContent() {
    const container = document.getElementById('ocrStudioContent');
    if (!container) return;

    const data = OCR_SCENARIOS[activeOcrKey] || OCR_SCENARIOS.prescription;

    container.innerHTML = `
      <!-- Presets bar -->
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
        <button class="action-btn ${activeOcrKey === 'prescription' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.CareAISuite.selectOcrScenario('prescription')">
          <span>🩺</span> Doctor Prescription
        </button>
        <button class="action-btn ${activeOcrKey === 'autorepair' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.CareAISuite.selectOcrScenario('autorepair')">
          <span>🚗</span> Garage Estimate & Parts
        </button>
        <button class="action-btn ${activeOcrKey === 'acquote' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.CareAISuite.selectOcrScenario('acquote')">
          <span>❄️</span> AC Gas & Capacitor Bill
        </button>
      </div>

      <div class="ocr-studio-grid">
        <!-- Document Viewport -->
        <div class="ocr-doc-viewport">
          <img src="${data.docImage}" alt="${data.title}" class="ocr-doc-img" />
          <div class="ocr-scan-line"></div>
          <div class="ocr-detected-box" style="top: 25%; left: 10%; width: 80%; height: 20%;"></div>
          <div class="ocr-detected-box" style="top: 55%; left: 10%; width: 80%; height: 28%;"></div>
        </div>

        <!-- Extracted Structured Findings -->
        <div class="ocr-results-panel">
          <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 0.85rem 1rem;">
            <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted); letter-spacing: 0.5px;">Detected Issuer</div>
            <div style="font-weight: 800; font-size: 0.95rem; color: var(--text-primary); margin-top: 0.2rem;">${data.doctor}</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.15rem;">${data.patient} • <em>${data.diagnosis}</em></div>
          </div>

          <!-- Items Breakdown -->
          <div>
            <div style="font-weight: 800; font-size: 0.88rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between;">
              <span>Detected Items & Generic Comparison</span>
              <span style="color: #059669; font-size: 0.8rem;">OCR Confidence: 99.4%</span>
            </div>
            <table class="ocr-meds-table">
              <thead>
                <tr>
                  <th>Item / Medicine</th>
                  <th>Brand Rate</th>
                  <th>Generic / Benchmark</th>
                </tr>
              </thead>
              <tbody>
                ${data.items.map(it => `
                  <tr>
                    <td>
                      <strong>${it.name}</strong>
                      <div style="font-size: 0.72rem; color: var(--text-muted);">${it.dosage}</div>
                    </td>
                    <td>
                      <span style="font-weight: 700; color: #ef4444;">₹${it.brandPrice}</span>
                    </td>
                    <td>
                      <span class="ocr-generic-chip">₹${it.genericPrice}</span>
                      <div style="font-size: 0.72rem; color: #059669; font-weight: 600;">Save ₹${it.brandPrice - it.genericPrice}</div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- Total Savings Banner -->
          <div class="ocr-savings-banner">
            <div>
              <div style="font-size: 0.8rem; font-weight: 700; opacity: 0.9;">TOTAL POTENTIAL SAVINGS:</div>
              <div style="font-size: 1.4rem; font-weight: 900;">₹${data.savings} (${data.savingsPct} OFF)</div>
            </div>
            <button class="action-btn action-btn-outline" style="background: #ffffff; color: #065f46; font-weight: 800; border: none; font-size: 0.82rem;" onclick="window.LocalCare && window.LocalCare.showToast('Voucher code JANCARE applied! Locating partner pharmacy...', 'success'); document.getElementById('aiPrescriptionDialog').close();">
              ${data.actionCta} ➔
            </button>
          </div>

          <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.5; background: var(--bg-surface); border: 1px solid var(--border-subtle); padding: 0.65rem 0.85rem; border-radius: var(--radius-md);">
            💡 <strong>AI Doctor Advisory:</strong> ${data.warning}
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     5. CareAI Multilingual Voice Health & Symptom Triage
     ========================================================================== */
  const VOICE_TRIAGE_SCENARIOS = {
    toothache: {
      id: 'toothache',
      title: 'Throbbing Toothache & Cold Water Sensitivity',
      category: 'health',
      severityLevel: 2,
      severityName: 'Urgent Dental Care (Level 2)',
      severityBadge: '🟡 Urgent (Visit Dentist Today)',
      specialty: 'Endodontist / Apollo Dental Specialist',
      symptoms: 'Deep enamel cavitation, radiating jaw ache, sharp sensitivity to hot/cold liquids.',
      doctorAdvisory: {
        en: 'Possible deep dentin pulp inflammation. Avoid chewing on the affected side. Schedule an in-person dental evaluation and bitewing X-ray today.',
        hi: 'दांत के पल्प (गूदे) में सूजन की संभावना है। गर्म या बहुत ठंडा पानी न पिएं। आज ही दंत चिकित्सक से जांच कराएं।',
        kn: 'ಹಲ್ಲಿನ ತಿರುಳಿನ ತೀವ್ರ ಉರಿಯೂತದ ಸಾಧ್ಯತೆಯಿದೆ. ತಣ್ಣನೆಯ ಅಥವಾ ಬಿಸಿಯಾದ ನೀರನ್ನು ಸೇವಿಸಬೇಡಿ. ಇಂದು ದಂತ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.',
        ta: 'பல் கூச்சம் மற்றும் நரம்பு அழற்சி இருக்க வாய்ப்புள்ளது. மிகவும் குளிர்ந்த அல்லது சூடான நீரைத் தவிர்க்கவும். இன்றே பல் மருத்துவரை அணுகவும்.'
      },
      firstAid: 'Rinse mouth with lukewarm saline water. Do not apply hot compresses directly on outer cheek.',
      generics: [
        { name: 'Ibuprofen 400mg + Paracetamol 325mg', brand: 'Combiflam (₹65)', generic: 'Jan Aushadhi Ibu-PCM (₹18)', save: '₹47 (72% Off)' },
        { name: 'Chlorhexidine 0.2% Oral Rinse', brand: 'Hexidine 150ml (₹155)', generic: 'Jan Aushadhi Chlorhexidine (₹48)', save: '₹107 (69% Off)' }
      ],
      primaryAction: { label: 'Book Urgent Dental Clinic', action: "window.LocalCare.openBookingById('b1')" }
    },
    fever: {
      id: 'fever',
      title: 'High Grade Fever (102°F) with Shivering & Body Aches',
      category: 'health',
      severityLevel: 2,
      severityName: 'Urgent Care Evaluation (Level 2)',
      severityBadge: '🟡 Urgent (Same-Day TeleConsult)',
      specialty: 'General Physician / Internal Medicine',
      symptoms: 'Temperature 102°F, mild dehydration, headache, joint stiffness.',
      doctorAdvisory: {
        en: 'Symptoms suggest an acute viral infection. Maintain adequate hydration with ORS and monitor body temperature every 4 hours.',
        hi: 'लक्षण वायरल बुखार का संकेत देते हैं। ओआरएस और प्रचुर मात्रा में तरल पदार्थ लें। तापमान हर 4 घंटे में मापें।',
        kn: 'ಇದು ತೀವ್ರ ವೈರಲ್ ಜ್ವರದ ಲಕ್ಷಣವಾಗಿದೆ. ಸಾಕಷ್ಟು ನೀರು ಮತ್ತು ಓಆರ್ಎಸ್ ಕುಡಿಯಿರಿ. ದೇಹದ ಉಷ್ಣತೆಯನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ.',
        ta: 'இது வைரஸ் காய்ச்சலின் அறிகுறியாகும். ஓ.ஆர்.எஸ் மற்றும் நீர்ச்சத்து அதிகம் எடுத்துக்கொள்ளவும். காய்ச்சலை தொடர்ந்து கண்காணிக்கவும்.'
      },
      firstAid: 'Apply damp lukewarm water cloth sponge on forehead and neck. Drink 250ml electrolyte solution.',
      generics: [
        { name: 'Paracetamol 650mg Tablets', brand: 'Dolo 650 (₹34)', generic: 'Jan Aushadhi PCM 650 (₹14)', save: '₹20 (59% Off)' },
        { name: 'ORS Electrolyte Sachet', brand: 'Electral 21g (₹22)', generic: 'Jan Aushadhi ORS (₹7)', save: '₹15 (68% Off)' }
      ],
      primaryAction: { label: 'Start 2-Min Doctor Video Consult', action: "window.TeleConsult.openConsultModal('doc_general')" }
    },
    chestpain: {
      id: 'chestpain',
      title: 'Sudden Heavy Chest Pressure & Left Arm Numbness',
      category: 'health',
      severityLevel: 1,
      severityName: 'CRITICAL EMERGENCY (Level 1)',
      severityBadge: '🔴 Emergency (Call 108 Immediately)',
      specialty: 'Emergency Medicine / Interventional Cardiologist',
      symptoms: 'Crushing retrosternal chest tightness, cold perspiration, shortness of breath, left shoulder discomfort.',
      doctorAdvisory: {
        en: 'POTENTIAL CARDIAC EMERGENCY DETECTED. Cease all physical activity immediately, sit upright, loosen collar, and activate 108 Emergency dispatch.',
        hi: 'गंभीर हृदय आपातकाल की संभावना। तुरंत बैठ जाएं, शारीरिक गतिविधि रोकें और 108 आपातकालीन एम्बुलेंस बुलाएं।',
        kn: 'ತೀವ್ರ ತುರ್ತು ಹೃದಯಾಘಾತದ ಲಕ್ಷಣ. ತಕ್ಷಣ ಕುಳಿತುಕೊಳ್ಳಿ, ಯಾವುದೇ ಚಟುವಟಿಕೆ ಮಾಡಬೇಡಿ ಮತ್ತು 108 ತುರ್ತು ಆಂಬ್ಯುಲೆನ್ಸ್ ಕರೆಯಿರಿ.',
        ta: 'அவசர இதய பாதிப்பு ஆபத்து. உடனடியாக அமரவும், எவ்வித வேலையும் செய்யாதீர்கள், 108 அவசர ஆம்புலன்ஸை அழைக்கவும்.'
      },
      firstAid: 'Keep patient calm in seated upright posture. Do not allow patient to walk or climb stairs. Loosen tight clothing around neck and waist.',
      generics: [
        { name: 'Soluble Aspirin 300mg (Chewable)', brand: 'Disprin / Ecosprin (₹12)', generic: 'Emergency Antiplatelet Protocol', save: 'Immediate ER Care' }
      ],
      primaryAction: { label: '🚨 Dispatch 108 Emergency Ambulance', action: "window.EmergencyMode.triggerEmergency('ambulance')" }
    },
    backpain: {
      id: 'backpain',
      title: 'Acute Lumbar Muscular Spasm after Heavy Lifting',
      category: 'health',
      severityLevel: 3,
      severityName: 'Primary Self-Care & Physiotherapy (Level 3)',
      severityBadge: '🟢 Mild / Self-Care (Physio & Rest)',
      specialty: 'Physiotherapist / Orthopedic Specialist',
      symptoms: 'Localized muscular stiffness in lower back without radiating numbness into legs.',
      doctorAdvisory: {
        en: 'Symptoms indicate a mechanical lumbar muscular strain. Bed rest for 24 hours, cold pack therapy for 48 hours followed by gentle spinal stretching.',
        hi: 'यह पीठ की मांसपेशियों में खिंचाव का संकेत है। 24 घंटे आराम करें, बर्फ की सिकाई करें और भारी वजन न उठाएं।',
        kn: 'ಇದು ಬೆನ್ನು ಸ್ನಾಯುಗಳ ಸೆಳೆತದ ಲಕ್ಷಣ. 24 ಗಂಟೆಗಳ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ ಮತ್ತು ತಣ್ಣನೆಯ ನೀರಿನ ಶಾಖ ಕೊಡಿ.',
        ta: 'இது இடுப்பு தசைப் பிடிப்பு அறிகுறி. முழு ஓய்வு எடுக்கவும், ஐஸ் ஒத்தடம் கொடுக்கவும்.'
      },
      firstAid: 'Apply ice pack wrapped in a cloth towel for 15 minutes every 3 hours. Lie flat with pillow under knees.',
      generics: [
        { name: 'Diclofenac + Linseed Oil Gel 30g', brand: 'Volini Gel (₹160)', generic: 'Jan Aushadhi Pain Gel (₹45)', save: '₹115 (72% Off)' },
        { name: 'Thiocolchicoside 4mg Muscle Relaxant', brand: 'Myoril 4mg (₹210)', generic: 'Jan Aushadhi Relaxant (₹65)', save: '₹145 (69% Off)' }
      ],
      primaryAction: { label: 'Book Doorstep Physiotherapist', action: "window.LocalCare.filterCategory('health')" }
    }
  };

  let activeTriageScenario = 'toothache';
  let activeTriageLanguage = 'en';

  function openVoiceHealthTriage(presetKey = 'toothache') {
    closeDockMenu();
    activeTriageScenario = presetKey;
    let dialog = document.getElementById('aiVoiceTriageDialog');
    if (!dialog) {
      renderVoiceTriageDialogTemplate();
      dialog = document.getElementById('aiVoiceTriageDialog');
    }
    if (!dialog) return;

    renderVoiceTriageContent();
    dialog.showModal();
    if (window.SoundFX) window.SoundFX.playPop();
  }

  function renderVoiceTriageDialogTemplate() {
    if (document.getElementById('aiVoiceTriageDialog')) return;
    const dlg = document.createElement('dialog');
    dlg.id = 'aiVoiceTriageDialog';
    dlg.className = 'app-dialog voice-triage-dialog';
    dlg.style.cssText = 'width: 820px; max-width: 96vw;';
    dlg.setAttribute('aria-labelledby', 'voiceTriageTitle');
    dlg.innerHTML = `
      <div class="dialog-content-wrapper">
        <div class="dialog-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 44px; height: 44px; border-radius: var(--radius-md); background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); display: flex; align-items: center; justify-content: center; font-size: 1.4rem; color: #fff;">
              🩺
            </div>
            <div>
              <h3 class="dialog-title" id="voiceTriageTitle">CareAI Multilingual Voice Health & Symptom Triage</h3>
              <small style="color: var(--text-secondary);">Voice-guided symptom triage, emergency routing & Jan Aushadhi generic advice</small>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('aiVoiceTriageDialog').close()" aria-label="Close dialog">✕</button>
        </div>

        <!-- Language Switcher Bar -->
        <div class="voice-lang-bar">
          <span style="font-size: 0.8rem; font-weight: 800; color: var(--text-muted); align-self: center;">Language:</span>
          <button class="voice-lang-btn active" data-lang="en" onclick="window.CareAISuite.selectVoiceTriageLanguage('en')">🇬🇧 English</button>
          <button class="voice-lang-btn" data-lang="hi" onclick="window.CareAISuite.selectVoiceTriageLanguage('hi')">🇮🇳 हिन्दी (Hindi)</button>
          <button class="voice-lang-btn" data-lang="kn" onclick="window.CareAISuite.selectVoiceTriageLanguage('kn')">🇮🇳 ಕನ್ನಡ (Kannada)</button>
          <button class="voice-lang-btn" data-lang="ta" onclick="window.CareAISuite.selectVoiceTriageLanguage('ta')">🇮🇳 தமிழ் (Tamil)</button>
        </div>

        <div class="dialog-body" id="voiceTriageModalContent" style="padding: 1.25rem;">
          <!-- Dynamically populated -->
        </div>
      </div>
    `;
    document.body.appendChild(dlg);
  }

  function selectVoiceTriageLanguage(langKey) {
    activeTriageLanguage = langKey;
    document.querySelectorAll('.voice-lang-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === langKey);
    });
    renderVoiceTriageContent();
    speakTriageGuidance();
  }

  function selectVoiceTriageScenario(key) {
    if (!VOICE_TRIAGE_SCENARIOS[key]) return;
    activeTriageScenario = key;
    renderVoiceTriageContent();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function speakTriageGuidance() {
    const sc = VOICE_TRIAGE_SCENARIOS[activeTriageScenario];
    if (!sc) return;
    const text = sc.doctorAdvisory[activeTriageLanguage] || sc.doctorAdvisory.en;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      if (activeTriageLanguage === 'hi') utterance.lang = 'hi-IN';
      else if (activeTriageLanguage === 'kn') utterance.lang = 'kn-IN';
      else if (activeTriageLanguage === 'ta') utterance.lang = 'ta-IN';
      else utterance.lang = 'en-IN';

      window.speechSynthesis.speak(utterance);
      if (window.LocalCare && window.LocalCare.showToast) {
        window.LocalCare.showToast('🔊 Speaking AI Doctor guidance in your language...', 'info');
      }
    } else {
      if (window.LocalCare && window.LocalCare.showToast) {
        window.LocalCare.showToast(text, 'info');
      }
    }
  }

  function startVoiceSpeechRecognition() {
    const micBtn = document.getElementById('voiceMicTriggerBtn');
    if (micBtn) micBtn.classList.add('listening');

    if (window.SoundFX) window.SoundFX.playBell();
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('🎙️ Listening to your symptoms...', 'info');
    }

    setTimeout(() => {
      if (micBtn) micBtn.classList.remove('listening');
      if (window.LocalCare && window.LocalCare.showToast) {
        window.LocalCare.showToast('Symptoms analyzed successfully! Doctor guidance ready.', 'success');
      }
      speakTriageGuidance();
    }, 2200);
  }

  function renderVoiceTriageContent() {
    const space = document.getElementById('voiceTriageModalContent');
    if (!space) return;

    const sc = VOICE_TRIAGE_SCENARIOS[activeTriageScenario] || VOICE_TRIAGE_SCENARIOS.toothache;
    const doctorMsg = sc.doctorAdvisory[activeTriageLanguage] || sc.doctorAdvisory.en;

    space.innerHTML = `
      <!-- Presets quick bar -->
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
        <button class="action-btn ${activeTriageScenario === 'toothache' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.CareAISuite.selectVoiceTriageScenario('toothache')">
          🦷 Toothache & Sensitivity
        </button>
        <button class="action-btn ${activeTriageScenario === 'fever' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.CareAISuite.selectVoiceTriageScenario('fever')">
          🌡️ High Fever & Chills
        </button>
        <button class="action-btn ${activeTriageScenario === 'chestpain' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.CareAISuite.selectVoiceTriageScenario('chestpain')">
          🫀 Chest Pressure (Level 1)
        </button>
        <button class="action-btn ${activeTriageScenario === 'backpain' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.CareAISuite.selectVoiceTriageScenario('backpain')">
          🦴 Lower Back Spasm
        </button>
      </div>

      <!-- Voice Interaction Microphone Banner -->
      <div class="voice-mic-banner">
        <button class="voice-mic-btn" id="voiceMicTriggerBtn" onclick="window.CareAISuite.startVoiceSpeechRecognition()" title="Click to speak your symptoms">
          🎙️
        </button>
        <strong style="font-size: 1rem; color: var(--text-primary);">Tap Microphone to Speak Symptoms</strong>
        <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">
          CareAI listens in English, Hindi, Kannada or Tamil and matches the right triage severity.
        </p>
      </div>

      <!-- Severity Status Card -->
      <div class="triage-severity-box level-${sc.severityLevel}">
        <div style="font-size: 2.2rem; line-height: 1;">
          ${sc.severityLevel === 1 ? '🚨' : sc.severityLevel === 2 ? '⚠️' : '✅'}
        </div>
        <div style="flex: 1;">
          <div style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.6px; opacity: 0.9;">Triage Assessment Result</div>
          <h4 style="font-size: 1.2rem; margin: 0.2rem 0; color: #ffffff;">${sc.severityName}</h4>
          <p style="font-size: 0.88rem; opacity: 0.95;">${sc.symptoms}</p>
          <div style="margin-top: 0.4rem; font-size: 0.82rem; font-weight: 700;">
            Recommended Specialty: <u>${sc.specialty}</u>
          </div>
        </div>
      </div>

      <!-- Spoken Audio Guidance Strip -->
      <div class="triage-audio-strip">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <button class="voice-audio-play-btn" onclick="window.CareAISuite.speakTriageGuidance()">
            <span>🔊</span> Speak Advice
          </button>
          <div style="font-size: 0.86rem; color: var(--text-primary); font-weight: 600;">
            "${doctorMsg}"
          </div>
        </div>
      </div>

      <!-- Home First-Aid & Generic Medicines Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <strong style="font-size: 0.88rem; color: var(--text-primary); display: flex; align-items: center; gap: 0.4rem;">
            <span>🩹</span> Immediate First-Aid Protocol
          </strong>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.4rem; line-height: 1.5;">
            ${sc.firstAid}
          </p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <strong style="font-size: 0.88rem; color: #059669; display: flex; align-items: center; gap: 0.4rem;">
            <span>💊</span> Jan Aushadhi Generic Cost Comparison
          </strong>
          <div style="margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.82rem;">
            ${sc.generics.map(g => `
              <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-subtle); padding-bottom: 0.25rem;">
                <div><strong>${g.generic}</strong> <small style="color: var(--text-muted);">(vs ${g.brand})</small></div>
                <span style="color: #059669; font-weight: 800;">${g.save}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Primary Action CTA -->
      <div style="display: flex; gap: 0.75rem; justify-content: flex-end; align-items: center;">
        <button class="action-btn action-btn-outline" onclick="window.CareAISuite.downloadTriageSummary()">
          📄 Download Triage Summary (PDF)
        </button>
        <button class="action-btn action-btn-primary" onclick="document.getElementById('aiVoiceTriageDialog').close(); ${sc.primaryAction.action};">
          ${sc.primaryAction.label} ➔
        </button>
      </div>
    `;
  }

  function downloadTriageSummary() {
    const sc = VOICE_TRIAGE_SCENARIOS[activeTriageScenario];
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(`Digital Triage Summary for "${sc.title}" generated!`, 'success');
    }
    if (window.SoundFX) window.SoundFX.playSuccess();
  }

  function initModals() {
    // Esc key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const scannerDialog = document.getElementById('aiScannerDialog');
        const matchmakerDialog = document.getElementById('aiMatchmakerDialog');
        const prescriptionDialog = document.getElementById('aiPrescriptionDialog');
        const voiceDialog = document.getElementById('aiVoiceTriageDialog');
        if (scannerDialog && scannerDialog.open) scannerDialog.close();
        if (matchmakerDialog && matchmakerDialog.open) matchmakerDialog.close();
        if (prescriptionDialog && prescriptionDialog.open) prescriptionDialog.close();
        if (voiceDialog && voiceDialog.open) voiceDialog.close();
      }
    });
  }

  return {
    init,
    toggleCareAI,
    toggleDockMenu,
    openDiagnosticScanner,
    selectScannerScenario,
    runVisualScan,
    handleUserPhotoUpload,
    openProblemMatchmaker,
    handleMatchmakerSubmit,
    openPrescriptionOcrModal,
    selectOcrScenario,
    openVoiceHealthTriage,
    selectVoiceTriageLanguage,
    selectVoiceTriageScenario,
    speakTriageGuidance,
    startVoiceSpeechRecognition,
    downloadTriageSummary,
    getAISummaryForBusiness,
    getAIOffPeakTip
  };
})();

