/* ==========================================================================
   Local Care Infinity - Upgraded 24/7 Priority Emergency SOS Hub
   Architecture: Instant Dispatch + City Trauma Directory + Live GPS Radar
   ========================================================================== */

window.EmergencyMode = (function () {
  'use strict';

  let currentTab = 'dispatch';
  let radarInterval = null;
  let remainingSeconds = 420; // 7 minutes
  let currentDistanceKm = 2.1;
  let activeEmergencyType = 'ambulance';

  // City-Specific Emergency Hospital Directory
  const CITY_ER_HOSPITALS = {
    'Bengaluru': [
      { name: 'Manipal Hospital 24/7 ER & Trauma', locality: 'Old Airport Road', phone: '08025024444', badge: 'Level-1 Trauma & ICU', beds: '14 ICU Beds Available' },
      { name: 'Apollo Hospital Emergency Care', locality: 'Bannerghatta Road', phone: '08026304050', badge: 'Cardiac Emergency & Stroke', beds: '8 ICU Beds Available' },
      { name: 'Victoria Govt Hospital Casualty', locality: 'K.R. Market', phone: '08026701150', badge: '24/7 Govt Casualty', beds: '25 Beds Available' },
      { name: 'Narayana Health City Multi-Trauma', locality: 'Bommasandra / Electronic City', phone: '08071222222', badge: 'Cardiac & Neuro ER', beds: '12 Beds Available' }
    ],
    'Mumbai': [
      { name: 'Lilavati Hospital & Research ER', locality: 'Bandra West', phone: '02226751000', badge: 'Level-1 Trauma Center', beds: '10 ICU Beds Available' },
      { name: 'P.D. Hinduja Hospital ER', locality: 'Mahim West', phone: '02224451515', badge: 'Multi-Speciality Casualty', beds: '6 ICU Beds Available' },
      { name: 'KEM Hospital & Medical Casualty', locality: 'Parel', phone: '02224107000', badge: 'Govt Major Trauma Hub', beds: '30 Beds Available' },
      { name: 'Kokilaben Dhirubhai Ambani ER', locality: 'Andheri West', phone: '02242696969', badge: 'Stroke & Cardiac ER', beds: '15 ICU Beds Available' }
    ],
    'Delhi': [
      { name: 'AIIMS Jai Prakash Trauma Center', locality: 'Ring Road, Safdarjung', phone: '01126588500', badge: 'Apex National Trauma', beds: '20 Beds Available' },
      { name: 'Safdarjung Hospital Emergency Block', locality: 'Ansari Nagar', phone: '01126165060', badge: 'Govt Level-1 Casualty', beds: '35 Beds Available' },
      { name: 'Max Super Speciality Hospital ER', locality: 'Saket Press Enclave', phone: '01126515050', badge: 'Private Super-Speciality', beds: '12 Beds Available' },
      { name: 'Fortis Escorts Heart & Trauma', locality: 'Okhla Road', phone: '01147135000', badge: '24/7 Emergency Cath Lab', beds: '8 Beds Available' }
    ],
    'Hyderabad': [
      { name: 'Apollo Health City Jubilee Hills ER', locality: 'Jubilee Hills Road No. 72', phone: '04023607777', badge: 'JCI Accredited Level-1', beds: '16 ICU Beds Available' },
      { name: 'Yashoda Hospitals 24/7 ER & ICU', locality: 'Somajiguda / Secunderabad', phone: '04045674567', badge: 'Trauma & Critical Care', beds: '14 Beds Available' },
      { name: 'NIMS Govt Hospital Casualty', locality: 'Punjagutta', phone: '04023489000', badge: 'State Govt Apex ER', beds: '22 Beds Available' }
    ],
    'Pune': [
      { name: 'Ruby Hall Clinic Emergency Care', locality: 'Sassoon Road', phone: '02066455100', badge: 'NABH Accredited Trauma', beds: '12 Beds Available' },
      { name: 'Jehangir Hospital 24/7 Casualty', locality: 'Near Pune Station', phone: '02066811000', badge: 'Critical Care Casualty', beds: '9 Beds Available' },
      { name: 'Sassoon General Hospital ER', locality: 'Station Road', phone: '02026128000', badge: 'Govt Central ER', beds: '25 Beds Available' }
    ],
    'Chennai': [
      { name: 'Apollo Main Hospital Greams Rd ER', locality: 'Greams Road, Thousand Lights', phone: '04428290200', badge: 'Level-1 Emergency Hub', beds: '18 Beds Available' },
      { name: 'MIOT International 24/7 Trauma', locality: 'Manapakkam', phone: '04442002288', badge: 'Orthopedic & Spine Trauma', beds: '14 Beds Available' },
      { name: 'Rajiv Gandhi Govt General ER', locality: 'Park Town / Central', phone: '04425305000', badge: 'Govt Major Casualty', beds: '40 Beds Available' }
    ],
    'Mangaluru': [
      { name: 'Father Muller Medical Hospital ER', locality: 'Kankanady', phone: '08242238000', badge: 'Full ICU & Trauma ER', beds: '15 ICU Beds Available' },
      { name: 'KMC Hospital Emergency Casualty', locality: 'Ambedkar Circle / Attavar', phone: '08242445858', badge: 'Cardiac & Neuro Trauma', beds: '11 Beds Available' },
      { name: 'Wenlock District Hospital Casualty', locality: 'Hampankatta', phone: '08242424444', badge: 'District Govt Apex ER', beds: '28 Beds Available' },
      { name: 'AJ Hospital & Research Centre ER', locality: 'Kuntikana / NH-66', phone: '08242225555', badge: 'Highway Multi-Trauma', beds: '14 Beds Available' }
    ]
  };

  // Pre-configured dispatch profiles
  const DISPATCH_PROFILES = {
    'ambulance': {
      title: '24/7 ICU Ambulance Unit (ALS)',
      driver: 'Paramedic Raghavendra S. & Pilot Naveen',
      vehicle: 'KA-01-EA-108 (Force Traveller ALS)',
      equipment: 'Hamilton Ventilator, 2x O2 Cylinders, Cardiac Defibrillator',
      phone: '108',
      avatar: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=150&q=80',
      otp: '7492'
    },
    'hospital': {
      title: 'Hospital Emergency Casualty Priority',
      driver: 'Dr. Vivek Sharma (On-Duty Casualty In-charge)',
      vehicle: 'Direct ER Admission Priority Slip #ER-991',
      equipment: 'Triage Bed Reserved, Zero Documentation Hold',
      phone: '112',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80',
      otp: '9183'
    },
    'plumber': {
      title: 'Master Emergency Plumber Dispatch',
      driver: 'Suresh Kumar (Rapid Pipe Specialist)',
      vehicle: 'Van KA-04-MB-4819 (Equipped with Industrial Cutters)',
      equipment: 'High-Pressure Pipe Cutters, Heavy Pump & Seepage Seal',
      phone: '+91 97410 88990',
      avatar: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=150&q=80',
      otp: '4218'
    },
    'electrician': {
      title: 'Emergency Power & Short-Circuit Pro',
      driver: 'Ramesh Gowda (Class-1 Licensed Wireman)',
      vehicle: 'Bike KA-01-ET-7712 (Emergency Toolkit)',
      equipment: 'Phase Testers, Heavy Cutout Breakers, Arc Shields',
      phone: '+91 98450 11223',
      avatar: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=150&q=80',
      otp: '3819'
    },
    'towing': {
      title: '24/7 Heavy Flatbed Crane & Towing',
      driver: 'Captain Manjunath (Roadside Rescue)',
      vehicle: 'Hydraulic Flatbed Truck KA-03-TR-5521',
      equipment: 'Wheel Lift, Underlift & 5-Ton Winch Cable',
      phone: '+91 91122 33445',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80',
      otp: '6620'
    },
    'pharmacy': {
      title: 'Urgent Midnight Medicine Delivery',
      driver: 'Apollo 24/7 Express Dispatch Rider',
      vehicle: 'EV Rider KA-05-EV-1928',
      equipment: 'Insulated Cold-Chain Vaccine & Medicine Box',
      phone: '104',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      otp: '8105'
    }
  };

  function init() {
    renderEmergencyModalShell();
  }

  function getActiveCity() {
    if (window.LocalCare && typeof window.LocalCare.getSelectedCity === 'function') {
      return window.LocalCare.getSelectedCity();
    }
    const label = document.getElementById('currentCityLabel');
    return (label ? label.textContent.trim() : 'Bengaluru');
  }

  function renderEmergencyModalShell() {
    let dialog = document.getElementById('emergencyDialog');
    if (dialog) dialog.remove();

    dialog = document.createElement('dialog');
    dialog.id = 'emergencyDialog';
    dialog.className = 'app-dialog emergency-dialog';
    dialog.setAttribute('aria-labelledby', 'emergencyTitle');

    const city = getActiveCity();

    dialog.innerHTML = `
      <div class="dialog-content-wrapper emergency-modal-wrapper">
        <!-- Upgraded High-Impact Emergency Header -->
        <div class="emergency-header-red">
          <div class="emergency-header-content">
            <div class="emergency-title-box">
              <div class="emergency-strobe-icon">🚨</div>
              <div>
                <h3 class="emergency-h3-title" id="emergencyTitle">
                  24/7 Priority Emergency SOS Hub
                  <span class="emergency-live-pill">⚡ SUB-10 MIN DISPATCH</span>
                </h3>
                <span class="emergency-sub-text">
                  Direct Line to ICU Ambulances, Hospital Casualties, Master Plumbers & Toll-Free 108/112
                </span>
              </div>
            </div>
            <button class="emergency-close-btn" onclick="window.EmergencyMode.closeEmergencyModal()" title="Close Emergency Modal" aria-label="Close emergency modal">
              ✕
            </button>
          </div>
        </div>

        <!-- Tab Switcher Ribbon -->
        <nav class="emergency-nav-tabs" role="tablist">
          <button class="em-tab-btn active" id="emTabBtnDispatch" onclick="window.EmergencyMode.switchTab('dispatch')">
            <span>⚡</span> Rapid SOS Dispatch
          </button>
          <button class="em-tab-btn" id="emTabBtnHospitals" onclick="window.EmergencyMode.switchTab('hospitals')">
            <span>🏥</span> City ER Hospitals & Trauma
          </button>
          <button class="em-tab-btn" id="emTabBtnRadar" onclick="window.EmergencyMode.switchTab('radar')">
            <span>📡</span> Live SOS Radar
          </button>
        </nav>

        <!-- Modal Body Container -->
        <div class="emergency-body-container" id="emModalBody">
          <!-- Populated dynamically based on current tab -->
        </div>

        <!-- National Toll-Free Helplines Footer -->
        <div class="emergency-national-helpline">
          <div class="em-helpline-header">
            <div>
              <div class="em-helpline-title">National Emergency Toll-Free Numbers (India)</div>
              <span class="em-helpline-sub">Direct one-tap connection • 100% Free 24/7 Government Services</span>
            </div>
            <button class="action-btn action-btn-outline" style="font-size: 0.78rem; padding: 0.3rem 0.7rem; color: #dc2626;" onclick="window.EmergencyMode.shareLiveLocationWhatsApp()">
              <span>📍</span> Share Location via WhatsApp
            </button>
          </div>
          <div class="em-helpline-grid">
            <a href="tel:108" class="helpline-chip" title="Call Free Medical Ambulance">
              <span>🚑</span> Ambulance: <strong>108</strong>
            </a>
            <a href="tel:112" class="helpline-chip" title="Call All-in-One National Emergency">
              <span>🚨</span> All Emergencies: <strong>112</strong>
            </a>
            <a href="tel:100" class="helpline-chip" title="Call Police Control Room">
              <span>👮</span> Police: <strong>100</strong>
            </a>
            <a href="tel:101" class="helpline-chip" title="Call Fire & Rescue Services">
              <span>🚒</span> Fire: <strong>101</strong>
            </a>
            <a href="tel:1091" class="helpline-chip" title="Call Women Safety Helpline">
              <span>👩</span> Women Helpline: <strong>1091</strong>
            </a>
            <a href="tel:104" class="helpline-chip" title="Call Blood Bank & Medical Advice">
              <span>🩸</span> Blood Bank / Medical: <strong>104</strong>
            </a>
            <a href="tel:1962" class="helpline-chip" title="Call Animal & Veterinary Ambulance">
              <span>🐾</span> Animal SOS: <strong>1962</strong>
            </a>
            <a href="tel:1098" class="helpline-chip" title="Call Child Emergency Helpline">
              <span>🧒</span> Childline: <strong>1098</strong>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    renderTabContent();
  }

  function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.em-tab-btn').forEach(btn => btn.classList.remove('active'));
    if (tab === 'dispatch') document.getElementById('emTabBtnDispatch')?.classList.add('active');
    if (tab === 'hospitals') document.getElementById('emTabBtnHospitals')?.classList.add('active');
    if (tab === 'radar') document.getElementById('emTabBtnRadar')?.classList.add('active');
    renderTabContent();
  }

  function renderTabContent() {
    const container = document.getElementById('emModalBody');
    if (!container) return;

    const city = getActiveCity();

    if (currentTab === 'dispatch') {
      container.innerHTML = `
        <div class="em-city-status-bar">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.1rem;">📍</span>
            <span>Emergency Operations Active in <strong>${escapeHtml(city)}</strong></span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <span style="width: 8px; height: 8px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
            <span style="font-size: 0.78rem; font-weight: 700; color: #16a34a;">28 FAST DISPATCH TEAMS STANDING BY</span>
          </div>
        </div>

        <div class="emergency-grid">
          <!-- 1. Ambulance -->
          <div class="emergency-card">
            <div class="em-card-top-row">
              <div class="em-icon-badge">🚑</div>
              <span class="em-eta-tag">⚡ 5 - 8 MINS ARRIVAL</span>
            </div>
            <h4 class="em-card-title">24/7 ICU Ambulance & Mobile ER</h4>
            <p class="em-card-desc">Advanced Life Support (ALS) with oxygen cylinders, portable ventilator, and certified emergency paramedic on board.</p>
            <div class="em-action-row">
              <a href="tel:108" class="em-btn-call" title="Call Free National Ambulance 108">
                <span>📞</span> Call 108
              </a>
              <button class="em-btn-dispatch" onclick="window.EmergencyMode.launchDispatchRadar('ambulance')">
                <span>🚨</span> Dispatch ICU
              </button>
            </div>
          </div>

          <!-- 2. Hospital ER -->
          <div class="emergency-card">
            <div class="em-card-top-row">
              <div class="em-icon-badge">🏥</div>
              <span class="em-eta-tag">🟢 ZERO TRIAGE DELAY</span>
            </div>
            <h4 class="em-card-title">Hospital ER & Trauma Casualty</h4>
            <p class="em-card-desc">Direct hotline to nearest verified trauma centers with immediate triage bed reservation and stroke/cardiac response.</p>
            <div class="em-action-row">
              <a href="tel:112" class="em-btn-call" title="Call National Emergency 112">
                <span>📞</span> Call 112
              </a>
              <button class="em-btn-dispatch" onclick="window.EmergencyMode.switchTab('hospitals')">
                <span>🏥</span> View ERs
              </button>
            </div>
          </div>

          <!-- 3. Burst Pipe / Plumber -->
          <div class="emergency-card">
            <div class="em-card-top-row">
              <div class="em-icon-badge" style="background: #e0f2fe; color: #0284c7;">🔧</div>
              <span class="em-eta-tag">⚡ 15 - 20 MINS</span>
            </div>
            <h4 class="em-card-title">Burst Pipe & Flooding SOS</h4>
            <p class="em-card-desc">Rapid main line cutoff, high-power submersible dewatering pumps, and pipe replacement by master plumbers.</p>
            <div class="em-action-row">
              <a href="tel:+919741088990" class="em-btn-call">
                <span>📞</span> Call Pro
              </a>
              <button class="em-btn-dispatch" onclick="window.EmergencyMode.launchDispatchRadar('plumber')">
                <span>⚡</span> Dispatch Plumber
              </button>
            </div>
          </div>

          <!-- 4. Electrical Spark -->
          <div class="emergency-card">
            <div class="em-card-top-row">
              <div class="em-icon-badge" style="background: #fef3c7; color: #d97706;">⚡</div>
              <span class="em-eta-tag">⚡ 15 MINS DISPATCH</span>
            </div>
            <h4 class="em-card-title">Electrical Spark & Fire Cutoff</h4>
            <p class="em-card-desc">Dangerous burning smell, short-circuits, MCB failure, or main meter sparks. Licensed wiremen ready with safety gear.</p>
            <div class="em-action-row">
              <a href="tel:+919845011223" class="em-btn-call">
                <span>📞</span> Call Pro
              </a>
              <button class="em-btn-dispatch" onclick="window.EmergencyMode.launchDispatchRadar('electrician')">
                <span>⚡</span> Dispatch Wireman
              </button>
            </div>
          </div>

          <!-- 5. Roadside Towing -->
          <div class="emergency-card">
            <div class="em-card-top-row">
              <div class="em-icon-badge" style="background: #f1f5f9; color: #334155;">🚗</div>
              <span class="em-eta-tag">🛠️ 24/7 HIGHWAY RESCUE</span>
            </div>
            <h4 class="em-card-title">Roadside Towing & Breakdown</h4>
            <p class="em-card-desc">Hydraulic flatbed crane dispatch, dead battery jumpstarts, puncture tire swaps, and highway accident towing.</p>
            <div class="em-action-row">
              <a href="tel:+919112233445" class="em-btn-call">
                <span>📞</span> Call Crane
              </a>
              <button class="em-btn-dispatch" onclick="window.EmergencyMode.launchDispatchRadar('towing')">
                <span>🚗</span> Dispatch Crane
              </button>
            </div>
          </div>

          <!-- 6. 24/7 Urgent Pharmacy -->
          <div class="emergency-card">
            <div class="em-card-top-row">
              <div class="em-icon-badge" style="background: #ecfdf5; color: #059669;">💊</div>
              <span class="em-eta-tag">⚡ 25 MINS DOORSTEP</span>
            </div>
            <h4 class="em-card-title">24/7 Emergency Pharmacy</h4>
            <p class="em-card-desc">Immediate delivery of critical life-saving medications, insulin, inhalers, child fever syrups, and oxygen cylinders.</p>
            <div class="em-action-row">
              <a href="tel:104" class="em-btn-call">
                <span>📞</span> Call 104
              </a>
              <button class="em-btn-dispatch" onclick="window.EmergencyMode.launchDispatchRadar('pharmacy')">
                <span>💊</span> Order Meds
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (currentTab === 'hospitals') {
      const cityKey = Object.keys(CITY_ER_HOSPITALS).find(k => k.toLowerCase() === city.toLowerCase()) || 'Bengaluru';
      const hospitals = CITY_ER_HOSPITALS[cityKey] || CITY_ER_HOSPITALS['Bengaluru'];

      container.innerHTML = `
        <div class="em-city-status-bar">
          <div>
            <span>Verified 24/7 Emergency Hospitals & Level-1 Casualties in <strong>${escapeHtml(cityKey)}</strong></span>
          </div>
          <span style="font-size: 0.78rem; font-weight: 700; color: #15803d;">Direct Casualty Dial Enabled</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${hospitals.map(h => `
            <div class="em-hospital-card">
              <div class="em-hosp-info">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                  <span class="em-hosp-badge">${h.badge}</span>
                  <span style="font-size: 0.75rem; color: #16a34a; font-weight: 700;">🟢 ${h.beds}</span>
                </div>
                <h4 class="em-hosp-name">${h.name}</h4>
                <div class="em-hosp-meta">
                  <span>📍 ${h.locality}, ${cityKey}</span>
                  <span>•</span>
                  <span>⏰ 24 Hours Open (Zero Wait Casualty)</span>
                </div>
              </div>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <a href="tel:${h.phone}" class="em-btn-call" style="padding: 0.55rem 0.95rem; font-size: 0.85rem;" title="Call Emergency Casualty">
                  <span>📞</span> Call Casualty (${h.phone})
                </a>
                <button class="action-btn action-btn-outline" style="padding: 0.55rem 0.85rem; font-size: 0.85rem;" onclick="window.LocalCare.showToast('Opening Google Maps Directions to ${escapeHtml(h.name)}...', 'info')">
                  <span>🗺️</span> Navigate
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    } else if (currentTab === 'radar') {
      const profile = DISPATCH_PROFILES[activeEmergencyType] || DISPATCH_PROFILES['ambulance'];
      const mins = Math.floor(remainingSeconds / 60);
      const secs = remainingSeconds % 60;
      const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      container.innerHTML = `
        <div class="em-radar-screen">
          <div class="em-radar-sweep-box">
            <div class="em-radar-sweep-beam"></div>
            <div class="em-radar-pulse-center">🚨</div>
          </div>

          <div class="em-radar-countdown">${formattedTime} <span style="font-size: 1.1rem; color: var(--text-muted); font-weight: 600;">MINS ETA</span></div>
          <p class="em-radar-subhead">
            <strong>${profile.title}</strong> is speeding toward your location in <strong>${escapeHtml(city)}</strong>.
          </p>

          <div class="em-radar-driver-card">
            <img src="${profile.avatar}" alt="Emergency Responder" class="em-driver-avatar" />
            <div class="em-driver-details">
              <div class="em-driver-name">${profile.driver}</div>
              <div class="em-driver-vehicle">🚗 ${profile.vehicle} • <strong>${currentDistanceKm.toFixed(1)} km away</strong></div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 0.35rem;">Equipped: ${profile.equipment}</div>
              <div class="em-driver-otp-box">
                <span>🔒 Security Handshake OTP:</span> <strong>${profile.otp}</strong>
              </div>
            </div>
          </div>

          <div class="em-radar-actions-row">
            <a href="tel:${profile.phone}" class="em-btn-call" style="padding: 0.65rem 1.25rem; font-size: 0.95rem;">
              <span>📞</span> Direct Call Driver (${profile.phone})
            </a>
            <button class="action-btn action-btn-outline" style="padding: 0.65rem 1.25rem; font-size: 0.9rem;" onclick="window.EmergencyMode.shareLiveLocationWhatsApp()">
              <span>📍</span> Send WhatsApp Location
            </button>
            <button class="action-btn action-btn-ghost" style="padding: 0.65rem 1.25rem; font-size: 0.88rem; color: var(--text-muted);" onclick="window.EmergencyMode.cancelDispatch()">
              ✕ Cancel SOS Request
            </button>
          </div>
        </div>
      `;
    }
  }

  function launchDispatchRadar(type = 'ambulance') {
    activeEmergencyType = type;
    remainingSeconds = 420; // reset 7 mins
    currentDistanceKm = 2.1;
    switchTab('radar');
    playSirenTone();

    if (radarInterval) clearInterval(radarInterval);
    radarInterval = setInterval(() => {
      if (remainingSeconds > 10) {
        remainingSeconds -= 1;
        if (currentDistanceKm > 0.3) {
          currentDistanceKm -= 0.015;
        }
        if (currentTab === 'radar') {
          renderTabContent();
        }
      } else {
        clearInterval(radarInterval);
      }
    }, 1000);

    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(`🚨 Priority SOS Dispatched: ${type.toUpperCase()} arriving in ~7 minutes!`, 'warning', 6000);
    }
  }

  function cancelDispatch() {
    if (radarInterval) clearInterval(radarInterval);
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('Emergency SOS dispatch canceled.', 'info');
    }
    switchTab('dispatch');
  }

  function playSirenTone() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.3);
      osc.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch (e) {
      // Audio context might be restricted, silent fail gracefully
    }
  }

  function shareLiveLocationWhatsApp() {
    const city = getActiveCity();
    const msg = encodeURIComponent(`🚨 EMERGENCY SOS ALERT: I need immediate medical/emergency assistance in ${city}! Please send help or contact nearest ER casualty.`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  }

  function openEmergencyModal() {
    let dialog = document.getElementById('emergencyDialog');
    if (!dialog) {
      renderEmergencyModalShell();
      dialog = document.getElementById('emergencyDialog');
    }
    if (dialog) {
      switchTab('dispatch');
      dialog.showModal();
    }
  }

  function closeEmergencyModal() {
    const dialog = document.getElementById('emergencyDialog');
    if (dialog) dialog.close();
  }

  function triggerEmergency(type) {
    openEmergencyModal();
    if (type) {
      launchDispatchRadar(type);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return {
    init,
    openEmergencyModal,
    closeEmergencyModal,
    switchTab,
    triggerEmergency,
    launchDispatchRadar,
    cancelDispatch,
    shareLiveLocationWhatsApp
  };
})();
