/* ==============================================================================
   LOCALCARE INFINITY - Justdial-Grade Experience & Feature Suite (JDFeatures)
   Includes:
   1. Iconic JD Quick Services Round Icons Grid & Category Launcher
   2. Locality Quick Filter Pill Navigation for active cities
   3. "Get Best Deal" Multi-Vendor Instant Lead Broadcast Engine
   4. "JD Pay / LocalPay" Mobile Recharge & Utility Bill Payment Hub
   5. Packers & Movers Instant Cost & Route Fare Estimator
   6. JD Mart B2B Wholesale Mode & Bulk Quotes
   7. Justdial Quick Call Sheet & WhatsApp Instant Connect
   ============================================================================== */

(function () {
  'use strict';

  // JD Quick Services Data definition with vibrant icons & badges
  const JD_QUICK_SERVICES = [
    {
      id: 'health',
      name: 'Doctors & Clinics',
      icon: '🩺',
      badge: 'Top Rated',
      badgeClass: 'jd-badge-blue',
      action: 'category',
      categoryId: 'health'
    },
    {
      id: 'electrical',
      name: 'AC Repair & Service',
      icon: '❄️',
      badge: 'Trending',
      badgeClass: 'jd-badge-orange',
      action: 'category',
      categoryId: 'electrical'
    },
    {
      id: 'packers',
      name: 'Packers & Movers',
      icon: '📦',
      badge: 'Hot Deal',
      badgeClass: 'jd-badge-red',
      action: 'packers-movers'
    },
    {
      id: 'home',
      name: 'Plumbers & Leakage',
      icon: '🔧',
      badge: 'Sub-10m',
      badgeClass: 'jd-badge-green',
      action: 'category',
      categoryId: 'home'
    },
    {
      id: 'stays',
      name: 'Rent & Real Estate',
      icon: '🏢',
      badge: 'Verified',
      badgeClass: 'jd-badge-blue',
      action: 'category',
      categoryId: 'stays'
    },
    {
      id: 'food',
      name: 'Restaurants & Food',
      icon: '🍽️',
      badge: '50% Off',
      badgeClass: 'jd-badge-orange',
      action: 'category',
      categoryId: 'food'
    },
    {
      id: 'auto',
      name: 'Car Care & Towing',
      icon: '🚗',
      badge: '24/7 SOS',
      badgeClass: 'jd-badge-red',
      action: 'category',
      categoryId: 'auto'
    },
    {
      id: 'salon',
      name: 'Salons & Spa',
      icon: '✂️',
      badge: 'Popular',
      badgeClass: 'jd-badge-purple',
      action: 'category',
      categoryId: 'salon'
    },
    {
      id: 'b2b',
      name: 'JD Mart Wholesale',
      icon: '🏭',
      badge: 'B2B Bulk',
      badgeClass: 'jd-badge-gold',
      action: 'b2b-mart'
    },
    {
      id: 'jdpay',
      name: 'Bills & Recharge',
      icon: '💳',
      badge: 'Cashback',
      badgeClass: 'jd-badge-green',
      action: 'jdpay'
    },
    {
      id: 'cleaning',
      name: 'Deep Cleaning',
      icon: '✨',
      badge: 'Hygiene',
      badgeClass: 'jd-badge-blue',
      action: 'category',
      categoryId: 'cleaning'
    },
    {
      id: 'events',
      name: 'Weddings & Events',
      icon: '🎉',
      badge: 'Packages',
      badgeClass: 'jd-badge-purple',
      action: 'category',
      categoryId: 'events'
    },
    {
      id: 'tech',
      name: 'Mobile & Laptop',
      icon: '💻',
      badge: 'Express Fix',
      badgeClass: 'jd-badge-blue',
      action: 'category',
      categoryId: 'tech'
    },
    {
      id: 'tutor',
      name: 'Tutors & Classes',
      icon: '📚',
      badge: 'Top Tutors',
      badgeClass: 'jd-badge-green',
      action: 'category',
      categoryId: 'tutor'
    },
    {
      id: 'emergency',
      name: '24/7 SOS Helpline',
      icon: '🚨',
      badge: '108 Tollfree',
      badgeClass: 'jd-badge-red',
      action: 'emergency'
    },
    {
      id: 'bestdeal',
      name: 'Get Best Deal',
      icon: '⚡',
      badge: 'Instant Bids',
      badgeClass: 'jd-badge-orange',
      action: 'best-deal'
    }
  ];

  // Mobile Recharge Sample Plans
  const RECHARGE_PLANS = {
    jio: [
      { price: 299, validity: '28 Days', data: '1.5 GB/day', calls: 'Unlimited Voice', desc: 'JioCinema + JioTV Free' },
      { price: 349, validity: '28 Days', data: '2.0 GB/day', calls: 'Unlimited Voice', desc: 'True 5G Unlimited Data Included' },
      { price: 719, validity: '84 Days', data: '1.5 GB/day', calls: 'Unlimited Voice', desc: 'Best Seller • 5G Speed Included' },
      { price: 999, validity: '84 Days', data: '2.0 GB/day', calls: 'Unlimited Voice', desc: 'Hero Unlimited 5G + Hotstar Mobile' },
      { price: 19, validity: 'Active Plan', data: '1.0 GB Booster', calls: 'Data Only', desc: 'High Speed Top-up' }
    ],
    airtel: [
      { price: 299, validity: '28 Days', data: '1.5 GB/day', calls: 'Unlimited Voice', desc: 'Wynk Music + Apollo 24/7 Circle' },
      { price: 359, validity: '28 Days', data: '2.0 GB/day', calls: 'Unlimited Voice', desc: 'Airtel Xstream Play 20+ OTTs' },
      { price: 719, validity: '84 Days', data: '1.5 GB/day', calls: 'Unlimited Voice', desc: 'Unlimited 5G Data across India' },
      { price: 839, validity: '84 Days', data: '2.0 GB/day', calls: 'Unlimited Voice', desc: 'Disney+ Hotstar 3 Months Free' }
    ],
    vi: [
      { price: 299, validity: '28 Days', data: '1.5 GB/day', calls: 'Unlimited Voice', desc: 'Binge All Night (12 AM - 6 AM)' },
      { price: 719, validity: '84 Days', data: '1.5 GB/day', calls: 'Unlimited Voice', desc: 'Weekend Data Rollover' }
    ]
  };

  // Room Items Preset for Packers & Movers
  const MOVERS_ROOM_ITEMS = {
    living: [
      { id: 'sofa', name: '3-Seater Sofa', cft: 45, icon: '🛋️' },
      { id: 'tv', name: '55" Smart TV & Unit', cft: 18, icon: '📺' },
      { id: 'coffeetable', name: 'Center / Coffee Table', cft: 10, icon: '☕' },
      { id: 'dining', name: 'Dining Table & 4 Chairs', cft: 35, icon: '🪑' },
      { id: 'shoerack', name: 'Shoe Rack / Bookshelf', cft: 12, icon: '📚' }
    ],
    bedroom: [
      { id: 'bed', name: 'King Size Bed Frame', cft: 60, icon: '🛏️' },
      { id: 'mattress', name: 'King Foam Mattress', cft: 25, icon: '🛌' },
      { id: 'wardrobe', name: '3-Door Wooden Wardrobe', cft: 50, icon: '🚪' },
      { id: 'ac', name: 'Split AC (Indoor & Outdoor)', cft: 15, icon: '❄️' },
      { id: 'dressing', name: 'Dressing Mirror Table', cft: 20, icon: '🪞' }
    ],
    kitchen: [
      { id: 'fridge', name: 'Double-Door Refrigerator', cft: 35, icon: '🧊' },
      { id: 'washing', name: 'Front-Load Washing Machine', cft: 25, icon: '🧺' },
      { id: 'microwave', name: 'Microwave & Stand', cft: 8, icon: '🍲' },
      { id: 'waterpurifier', name: 'RO Water Purifier', cft: 6, icon: '🚰' },
      { id: 'boxes', name: 'Heavy Kitchen Pack (Cartons)', cft: 20, icon: '📦' }
    ]
  };

  // State Management
  const jdState = {
    activeLocality: '',
    b2bModeActive: false,
    selectedOperator: 'jio',
    rechargeAmount: 299,
    electricityBoard: 'bescom',
    electricityBillAmount: 0,
    fetchedBillData: null,
    moveSize: '2bhk',
    moveTier: 'standard',
    moveDistanceType: 'local',
    radarBids: [],
    currentWhatsAppBusiness: null,
    whatsAppMessages: [],
    activeMoversRoom: 'living',
    moversInventory: {
      sofa: 1,
      tv: 1,
      coffeetable: 1,
      dining: 0,
      shoerack: 1,
      bed: 1,
      wardrobe: 1,
      mattress: 1,
      ac: 1,
      dressing: 1,
      fridge: 1,
      washing: 1,
      microwave: 1,
      waterpurifier: 1,
      boxes: 6
    }
  };

  /* ==========================================================================
     1. Initialize & Render JD Quick Services Grid
     ========================================================================== */
  function initQuickServicesGrid() {
    const container = document.getElementById('jdQuickServicesGrid');
    if (!container) return;

    container.innerHTML = JD_QUICK_SERVICES.map(item => `
      <div class="jd-service-tile" data-action="${item.action}" data-cat="${item.categoryId || ''}" role="button" tabindex="0" title="${item.name}">
        <div class="jd-tile-icon-bubble">
          <span class="jd-tile-icon">${item.icon}</span>
          ${item.badge ? `<span class="jd-tile-badge ${item.badgeClass}">${item.badge}</span>` : ''}
        </div>
        <div class="jd-tile-label">${item.name}</div>
      </div>
    `).join('');

    container.querySelectorAll('.jd-service-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const action = tile.getAttribute('data-action');
        const cat = tile.getAttribute('data-cat');
        handleQuickServiceClick(action, cat);
      });
      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          tile.click();
        }
      });
    });
  }

  function handleQuickServiceClick(action, catId) {
    if (window.SoundFX) window.SoundFX.playClick();

    if (action === 'category' && catId) {
      if (window.LocalCare && window.LocalCare.filterCategory) {
        window.LocalCare.filterCategory(catId);
      }
      scrollToResults();
    } else if (action === 'packers-movers') {
      openPackersMoversModal();
    } else if (action === 'b2b-mart') {
      toggleB2BMode();
    } else if (action === 'jdpay') {
      openJdPayModal('recharge');
    } else if (action === 'emergency') {
      if (window.EmergencyMode) window.EmergencyMode.openEmergencyModal();
    } else if (action === 'best-deal') {
      openBestDealModal();
    }
  }

  function scrollToResults() {
    const section = document.getElementById('listingsSection');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  }

  /* ==========================================================================
     2. Locality Quick-Filter Pills Navigation
     ========================================================================== */
  function renderLocalityPills() {
    const container = document.getElementById('jdLocalityPills');
    if (!container) return;

    const currentCityName = (window.LocalCare && window.LocalCare.getCurrentCity) 
      ? window.LocalCare.getCurrentCity() 
      : (localStorage.getItem('localcare_city') || 'Bengaluru');

    const cityObj = (window.CITIES || []).find(c => c.name.toLowerCase() === currentCityName.toLowerCase());
    const areas = cityObj ? cityObj.areas : ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'Jayanagar'];

    let html = `
      <button class="jd-locality-pill ${!jdState.activeLocality ? 'active' : ''}" data-locality="">
        <span>📍 All ${currentCityName}</span>
      </button>
    `;

    areas.forEach(area => {
      const isActive = jdState.activeLocality.toLowerCase() === area.toLowerCase();
      html += `
        <button class="jd-locality-pill ${isActive ? 'active' : ''}" data-locality="${area}">
          <span>${area}</span>
        </button>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.jd-locality-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        const loc = btn.getAttribute('data-locality');
        setLocalityFilter(loc);
      });
    });
  }

  function setLocalityFilter(locality) {
    jdState.activeLocality = locality;
    renderLocalityPills();

    if (window.LocalCare && window.LocalCare.setLocalityFilter) {
      window.LocalCare.setLocalityFilter(locality);
    } else if (window.LocalCare && window.LocalCare.filterBySearch) {
      window.LocalCare.filterBySearch(locality);
    }

    if (locality) {
      showToast(`Showing verified providers in ${locality}`, 'info');
    } else {
      showToast('Showing all areas', 'info');
    }
  }

  /* ==========================================================================
     3. "Get Best Deal" / Instant Leads Engine (Justdial Signature)
     ========================================================================== */
  function openBestDealModal(categoryHint = '', businessNameHint = '') {
    const dialog = document.getElementById('jdBestDealDialog');
    if (!dialog) return;

    if (window.SoundFX) window.SoundFX.playPop();

    const titleEl = document.getElementById('jdBestDealTitle');
    const serviceInput = document.getElementById('jdDealServiceInput');
    const subtitleEl = document.getElementById('jdBestDealSubtitle');

    if (businessNameHint) {
      if (titleEl) titleEl.textContent = `Get Best Deal from ${businessNameHint}`;
      if (subtitleEl) subtitleEl.textContent = 'Tell us your exact requirement to receive best guaranteed quote & discounts';
      if (serviceInput) serviceInput.value = `Enquiry for ${businessNameHint}`;
    } else if (categoryHint) {
      if (titleEl) titleEl.textContent = `⚡ Get Best Deal for ${categoryHint.toUpperCase()}`;
      if (subtitleEl) subtitleEl.textContent = 'Receive competitive price quotes from top 5 verified local professionals in 15 mins';
      if (serviceInput) serviceInput.value = `${categoryHint} services near me`;
    } else {
      if (titleEl) titleEl.textContent = '⚡ Tell Us What You Need — Get Best Deal in 15 Mins';
      if (subtitleEl) subtitleEl.textContent = 'Broadcast your requirement to top verified providers for lowest rates and guaranteed service';
      if (serviceInput) serviceInput.value = '';
    }

    // Reset feedback container
    const form = document.getElementById('jdBestDealForm');
    const feedback = document.getElementById('jdBestDealSuccess');
    if (form) form.style.display = 'block';
    if (feedback) feedback.style.display = 'none';

    dialog.showModal();
  }

  function handleBestDealSubmit(e) {
    e.preventDefault();

    const service = document.getElementById('jdDealServiceInput')?.value || 'Local Service';
    const urgency = document.getElementById('jdDealUrgencySelect')?.value || 'Today';
    const budget = document.getElementById('jdDealBudgetSelect')?.value || 'Standard';
    const name = document.getElementById('jdDealNameInput')?.value || 'Chethan B K';
    const phone = document.getElementById('jdDealPhoneInput')?.value || '+91 98450 11223';
    const notes = document.getElementById('jdDealNotesInput')?.value || 'Best price requested';

    // Submit into platform quotes system
    if (window.QuoteMarketplace && window.QuoteMarketplace.createQuote) {
      window.QuoteMarketplace.createQuote({
        title: service,
        category: 'home',
        urgency: urgency,
        budget: budget,
        notes: notes,
        customerName: name,
        customerPhone: phone
      });
    }

    launchLiveRadarArena(service, urgency, budget, name, phone, notes);
    if (window.SoundFX) window.SoundFX.playSuccess();
    showToast('Radar activated! Pinging 18 nearby verified pros...', 'success');
  }

  function launchLiveRadarArena(service, urgency, budget, name, phone, notes) {
    const form = document.getElementById('jdBestDealForm');
    const feedback = document.getElementById('jdBestDealSuccess');
    if (form) form.style.display = 'none';
    if (!feedback) return;

    feedback.style.display = 'block';
    feedback.innerHTML = `
      <div class="jd-radar-arena-card">
        <div class="jd-radar-header">
          <div class="jd-radar-header-left">
            <span class="jd-radar-status-badge">
              <span class="live-dot-pulse"></span> RADAR ACTIVE
            </span>
            <div>
              <strong style="font-size: 0.95rem;">Live Multi-Vendor Bidding Radar</strong>
              <div style="font-size: 0.75rem; color: rgba(255,255,255,0.7);">Requirement: ${escapeHtml(service)}</div>
            </div>
          </div>
          <div class="jd-radar-timer-pill" id="radarTimerDisplay">
            ⏱️ 14:59 Left
          </div>
        </div>

        <div class="jd-radar-viewport">
          <div class="jd-radar-circle jd-radar-circle-1"></div>
          <div class="jd-radar-circle jd-radar-circle-2"></div>
          <div class="jd-radar-circle jd-radar-circle-3"></div>
          <div class="jd-radar-crosshair-h"></div>
          <div class="jd-radar-crosshair-v"></div>
          <div class="jd-radar-sweep"></div>
          <div class="jd-radar-center-beacon">📍</div>
          <div id="radarBlipsContainer"></div>
        </div>

        <div style="padding: 0.75rem 1.25rem 0.25rem 1.25rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: var(--text-secondary);">
          <span id="radarStatusText">📡 Radar scanning 18 verified pros within 3.5 km...</span>
          <span style="font-weight: 700; color: #10b981;" id="radarBidsCount">0 Bids Received</span>
        </div>

        <div class="jd-radar-bids-list" id="radarBidsList">
          <!-- Bids stream in live -->
        </div>

        <div style="padding: 1rem 1.25rem; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; background: var(--bg-subtle);">
          <span style="font-size: 0.78rem; color: var(--text-muted);">🛡️ LocalCare ₹10,000 Quality Shield applies to all accepted quotes</span>
          <button class="action-btn action-btn-ghost" style="font-size: 0.85rem;" onclick="document.getElementById('jdBestDealDialog').close()">
            Close Radar
          </button>
        </div>
      </div>
    `;

    // Initialize bids simulation
    jdState.radarBids = [];
    const pros = [
      {
        id: 'bid-1',
        name: 'Apex FastFix Pro',
        avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&q=80',
        rating: 4.9,
        reviews: 218,
        distance: '1.2 km',
        time: 'In 35 mins',
        originalPrice: 750,
        price: 499,
        warranty: '30-Day Guarantee',
        badge: '⚡ Fast Arrival',
        blip: { top: '35%', left: '68%' },
        phone: '9845011223'
      },
      {
        id: 'bid-2',
        name: 'CoolMaster Certified Care',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 4.8,
        reviews: 142,
        distance: '2.4 km',
        time: 'Today 4:00 PM',
        originalPrice: 650,
        price: 449,
        warranty: 'Free Checkup Included',
        badge: '🛡️ Police Verified',
        blip: { top: '65%', left: '28%' },
        phone: '9845033445'
      },
      {
        id: 'bid-3',
        name: 'QuickFix Verified Pro',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        rating: 5.0,
        reviews: 384,
        distance: '1.8 km',
        time: 'In 20 mins',
        originalPrice: 600,
        price: 399,
        warranty: '100% Genuine Spare Parts',
        badge: '★ Lowest Guaranteed Bid',
        isBest: true,
        blip: { top: '25%', left: '35%' },
        phone: '9845099881'
      }
    ];

    let delay = 1200;
    pros.forEach((pro, index) => {
      setTimeout(() => {
        addRadarBid(pro, index + 1);
      }, delay);
      delay += 1400;
    });
  }

  function addRadarBid(pro, totalReceived) {
    jdState.radarBids.push(pro);

    // Add blip on radar screen
    const blips = document.getElementById('radarBlipsContainer');
    if (blips) {
      const blipEl = document.createElement('div');
      blipEl.className = 'jd-radar-blip';
      blipEl.style.top = pro.blip.top;
      blipEl.style.left = pro.blip.left;
      blipEl.innerHTML = `<span class="jd-radar-blip-label">₹${pro.price}</span>`;
      blips.appendChild(blipEl);
    }

    // Update status
    const statusText = document.getElementById('radarStatusText');
    const bidsCount = document.getElementById('radarBidsCount');
    if (statusText) statusText.textContent = `⚡ Incoming bid received from ${pro.name}!`;
    if (bidsCount) bidsCount.textContent = `${totalReceived} Bids Received`;

    // Append bid card
    const list = document.getElementById('radarBidsList');
    if (list) {
      const card = document.createElement('div');
      card.id = `bid-card-${pro.id}`;
      card.className = `jd-incoming-bid-card ${pro.isBest ? 'best-bid' : ''}`;
      card.innerHTML = `
        <div class="jd-bid-top-row">
          <div class="jd-bid-pro-info">
            <img src="${pro.avatar}" alt="${pro.name}" class="jd-bid-avatar" />
            <div>
              <div class="jd-bid-name">
                ${pro.name} <span class="jd-check-icon">✓</span>
                ${pro.isBest ? '<span class="jd-tile-badge jd-badge-green" style="position:static; margin-left:4px;">★ Best Rate</span>' : ''}
              </div>
              <div class="jd-bid-meta">
                ★ <strong>${pro.rating}</strong> (${pro.reviews} reviews) • 📍 ${pro.distance} • ⏰ ${pro.time}
              </div>
            </div>
          </div>
          <div class="jd-bid-price-box">
            <div class="jd-bid-price-value" id="price-val-${pro.id}">₹${pro.price}</div>
            <div class="jd-bid-price-orig">₹${pro.originalPrice}</div>
          </div>
        </div>

        <div class="jd-bid-perks-row">
          <span class="jd-bid-perk-chip">🛡️ ${pro.warranty}</span>
          <span class="jd-bid-perk-chip">⚡ ${pro.badge}</span>
        </div>

        <div class="jd-bid-actions-row">
          <button class="jd-bargain-btn" id="bargain-btn-${pro.id}" onclick="window.JDFeatures.aiNegotiateBid('${pro.id}')" title="Ask CareAI to counter-offer for discount">
            <span>✨</span> Ask AI to Bargain (-₹50)
          </button>
          <div style="display: flex; gap: 0.4rem;">
            <button class="action-btn action-btn-outline" style="padding: 0.35rem 0.65rem; font-size: 0.78rem;" onclick="window.JDFeatures.openWhatsAppEnquiry('${escapeHtml(pro.name)}', 'Your Area', 'Bengaluru', '${pro.phone}')">
              <span>💬</span> WhatsApp
            </button>
            <button class="action-btn action-btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.78rem;" onclick="window.JDFeatures.acceptRadarBid('${pro.id}')">
              <span>✓</span> Accept Bid
            </button>
          </div>
        </div>
      `;
      list.prepend(card);
    }

    if (window.SoundFX) window.SoundFX.playPop();
  }

  function aiNegotiateBid(bidId) {
    const bid = jdState.radarBids.find(b => b.id === bidId);
    if (!bid || bid.bargained) return;

    if (window.SoundFX) window.SoundFX.playClick();
    showToast(`CareAI is negotiating an exclusive discount with ${bid.name}...`, 'info');

    const btn = document.getElementById(`bargain-btn-${bidId}`);
    if (btn) {
      btn.innerHTML = `<span>⏳</span> Negotiating...`;
      btn.disabled = true;
    }

    setTimeout(() => {
      const discount = 50;
      bid.price = Math.max(199, bid.price - discount);
      bid.bargained = true;

      const priceVal = document.getElementById(`price-val-${bidId}`);
      if (priceVal) {
        priceVal.textContent = `₹${bid.price}`;
        priceVal.style.color = '#10b981';
      }

      const card = document.getElementById(`bid-card-${bidId}`);
      if (card) {
        card.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 100%)';
      }

      if (btn) {
        btn.innerHTML = `<span>🎉</span> Saved ₹${discount}! (Locked)`;
        btn.style.background = '#10b981';
        btn.style.color = '#ffffff';
        btn.style.borderColor = '#10b981';
      }

      if (window.SoundFX) window.SoundFX.playSuccess();
      showToast(`🎉 Success! ${bid.name} approved a ₹${discount} instant discount!`, 'success');
    }, 1100);
  }

  function acceptRadarBid(bidId) {
    const bid = jdState.radarBids.find(b => b.id === bidId);
    if (!bid) return;

    if (window.SoundFX) window.SoundFX.playSuccess();
    const dialog = document.getElementById('jdBestDealDialog');
    if (dialog) dialog.close();

    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(`🎉 Deal Confirmed with ${bid.name} at ₹${bid.price}! Assigned OTP: ${Math.floor(1000 + Math.random() * 9000)}.`, 'success');
    }
  }

  /* ==========================================================================
     4. "JD Pay / LocalPay" Bills, Recharges & Utility Hub
     ========================================================================== */
  function openJdPayModal(activeTab = 'recharge') {
    const dialog = document.getElementById('jdPayDialog');
    if (!dialog) return;

    if (window.SoundFX) window.SoundFX.playPop();

    switchJdPayTab(activeTab);
    dialog.showModal();
  }

  function switchJdPayTab(tabId) {
    document.querySelectorAll('.jdpay-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    document.querySelectorAll('.jdpay-tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `jdpay-${tabId}`);
    });

    if (tabId === 'recharge') {
      renderRechargePlans();
    }
  }

  function renderRechargePlans() {
    const container = document.getElementById('jdpayPlansGrid');
    if (!container) return;

    const op = jdState.selectedOperator || 'jio';
    const plans = RECHARGE_PLANS[op] || RECHARGE_PLANS.jio;

    container.innerHTML = plans.map(p => `
      <div class="jdpay-plan-card ${jdState.rechargeAmount === p.price ? 'selected' : ''}" onclick="window.JDFeatures.selectPlan(${p.price})">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
          <span style="font-size: 1.35rem; font-weight: 800; color: var(--primary);">₹${p.price}</span>
          <span style="font-size: 0.78rem; font-weight: 700; color: #059669; background: #ecfdf5; padding: 0.15rem 0.5rem; border-radius: var(--radius-full);">${p.validity}</span>
        </div>
        <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem;">⚡ ${p.data} • ${p.calls}</div>
        <div style="font-size: 0.78rem; color: var(--text-muted);">${p.desc}</div>
      </div>
    `).join('');
  }

  function selectPlan(price) {
    jdState.rechargeAmount = price;
    renderRechargePlans();
    const amountInput = document.getElementById('jdpayAmountInput');
    if (amountInput) amountInput.value = price;
  }

  function handleRechargeSubmit(e) {
    e.preventDefault();
    const phone = document.getElementById('jdpayMobileInput')?.value || '9845012345';
    const amount = jdState.rechargeAmount || 299;
    const op = (jdState.selectedOperator || 'jio').toUpperCase();

    if (phone.length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'warning');
      return;
    }

    const txId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
    const cashback = Math.min(25, Math.round(amount * 0.05));

    const resultBox = document.getElementById('jdpayRechargeResult');
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="jdpay-success-pill">
          <div style="font-size: 1.8rem; margin-bottom: 0.35rem;">✅</div>
          <h4 style="font-size: 1.15rem; color: #065f46; margin-bottom: 0.2rem;">Recharge Successful!</h4>
          <p style="font-size: 0.88rem; color: #047857; margin-bottom: 0.5rem;">
            ₹${amount} recharged for <strong>+91 ${phone}</strong> (${op})
          </p>
          <div style="font-size: 0.78rem; color: #065f46; background: rgba(255,255,255,0.7); padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); margin-bottom: 0.5rem;">
            Txn ID: <strong>${txId}</strong> • Operator Ref: 2026-${Date.now().toString().slice(-6)}
          </div>
          <div style="font-weight: 800; color: #b45309; font-size: 0.88rem;">
            🎁 ₹${cashback} Instant JD Pay Cashback Credited to Wallet!
          </div>
        </div>
      `;
      resultBox.style.display = 'block';
    }

    if (window.SoundFX) window.SoundFX.playSuccess();
    showToast(`Recharge of ₹${amount} successful! ₹${cashback} cashback earned!`, 'success');
  }

  function handleFetchElectricityBill() {
    const cid = document.getElementById('jdpayConsumerIdInput')?.value || '';
    if (!cid || cid.length < 5) {
      showToast('Please enter your Consumer Account ID (e.g. 54810294)', 'warning');
      return;
    }

    const boardSelect = document.getElementById('jdpayBoardSelect');
    const boardName = boardSelect ? boardSelect.options[boardSelect.selectedIndex].text : 'BESCOM Bengaluru';
    const amount = Math.floor(850 + Math.random() * 950);
    const dueDate = '28-Oct-2026';

    jdState.fetchedBillData = { cid, boardName, amount, dueDate };

    const billBox = document.getElementById('jdpayElectricityBillBox');
    if (billBox) {
      billBox.innerHTML = `
        <div class="jdpay-bill-card">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Electricity Board</div>
              <div style="font-weight: 800; font-size: 1rem;">${boardName}</div>
              <div style="font-size: 0.82rem; color: var(--text-secondary);">Consumer ID: ${cid}</div>
            </div>
            <div style="text-align: right;">
              <span class="bid-badge" style="background: #fef3c7; color: #92400e;">Bill Due</span>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">Due Date: ${dueDate}</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 0.75rem; border-top: 1px dashed var(--border-subtle);">
            <div>
              <span style="font-size: 0.82rem; color: var(--text-muted);">Total Payable</span>
              <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">₹${amount}</div>
            </div>
            <button class="action-btn action-btn-primary" onclick="window.JDFeatures.payElectricityBill()">
              Pay ₹${amount} via JD Pay ➔
            </button>
          </div>
        </div>
      `;
      billBox.style.display = 'block';
    }

    showToast('Live Electricity Bill Fetched Successfully', 'success');
  }

  function payElectricityBill() {
    if (!jdState.fetchedBillData) return;
    const { amount, boardName, cid } = jdState.fetchedBillData;
    const discount = Math.round(amount * 0.05);
    const paidAmount = amount - discount;

    const billBox = document.getElementById('jdpayElectricityBillBox');
    if (billBox) {
      billBox.innerHTML = `
        <div class="jdpay-success-pill">
          <div style="font-size: 1.8rem; margin-bottom: 0.35rem;">⚡</div>
          <h4 style="font-size: 1.15rem; color: #065f46; margin-bottom: 0.2rem;">Bill Paid Successfully!</h4>
          <p style="font-size: 0.88rem; color: #047857; margin-bottom: 0.5rem;">
            Paid ₹${paidAmount} to <strong>${boardName}</strong> (Consumer: ${cid})
          </p>
          <div style="font-weight: 800; color: #b45309; font-size: 0.88rem;">
            🎉 Flat 5% JD Pay Discount Applied (Saved ₹${discount})
          </div>
        </div>
      `;
    }

    if (window.SoundFX) window.SoundFX.playSuccess();
    showToast(`Bill paid! Saved ₹${discount} via JD Pay`, 'success');
  }

  /* ==========================================================================
     5. Packers & Movers 3D Room-by-Room Load & Fare Calculator
     ========================================================================== */
  function openPackersMoversModal() {
    const dialog = document.getElementById('jdPackersMoversDialog');
    if (!dialog) return;

    renderMoversRoomInventory();
    calculateMoversEstimate();

    if (window.SoundFX) window.SoundFX.playPop();
    dialog.showModal();
  }

  function switchMoversRoom(roomId) {
    if (!MOVERS_ROOM_ITEMS[roomId]) return;
    jdState.activeMoversRoom = roomId;
    renderMoversRoomInventory();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function updateMoversItemQty(itemId, delta) {
    const cur = jdState.moversInventory[itemId] || 0;
    const next = Math.max(0, cur + delta);
    jdState.moversInventory[itemId] = next;
    renderMoversRoomInventory();
    calculateMoversEstimate();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function renderMoversRoomInventory() {
    const container = document.getElementById('pmRoomInventoryContainer');
    if (!container) return;

    const items = MOVERS_ROOM_ITEMS[jdState.activeMoversRoom] || MOVERS_ROOM_ITEMS.living;

    let html = `
      <div class="pm-room-nav" style="margin-bottom: 0.75rem;">
        <button type="button" class="pm-room-tab-btn ${jdState.activeMoversRoom === 'living' ? 'active' : ''}" onclick="window.JDFeatures.switchMoversRoom('living')">
          <span>🛋️</span> Living Room
        </button>
        <button type="button" class="pm-room-tab-btn ${jdState.activeMoversRoom === 'bedroom' ? 'active' : ''}" onclick="window.JDFeatures.switchMoversRoom('bedroom')">
          <span>🛏️</span> Bedroom
        </button>
        <button type="button" class="pm-room-tab-btn ${jdState.activeMoversRoom === 'kitchen' ? 'active' : ''}" onclick="window.JDFeatures.switchMoversRoom('kitchen')">
          <span>🍳</span> Kitchen & Boxes
        </button>
      </div>

      <div class="pm-inventory-grid">
        ${items.map(it => {
          const qty = jdState.moversInventory[it.id] || 0;
          return `
            <div class="pm-item-stepper-card">
              <div class="pm-item-label-group">
                <span class="pm-item-name">${it.icon} ${it.name}</span>
                <span class="pm-item-cft">${it.cft} CFT / unit</span>
              </div>
              <div class="pm-counter-controls">
                <button type="button" class="pm-step-btn" onclick="window.JDFeatures.updateMoversItemQty('${it.id}', -1)">-</button>
                <span class="pm-item-qty">${qty}</span>
                <button type="button" class="pm-step-btn" onclick="window.JDFeatures.updateMoversItemQty('${it.id}', 1)">+</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    container.innerHTML = html;
  }

  function calculateMoversEstimate() {
    // 1. Calculate Total Cubic Feet (CFT)
    let totalCft = 0;
    Object.keys(MOVERS_ROOM_ITEMS).forEach(room => {
      MOVERS_ROOM_ITEMS[room].forEach(item => {
        const qty = jdState.moversInventory[item.id] || 0;
        totalCft += (item.cft * qty);
      });
    });

    totalCft = Math.max(60, totalCft);

    // 2. Vehicle Recommendation based on CFT
    let vehicleName = 'Tata Ace Super (Mini Truck)';
    let vehicleIcon = '🛻';
    let maxCftCapacity = 140;

    if (totalCft > 350) {
      vehicleName = '17ft Container (Multi-Axle)';
      vehicleIcon = '🚛';
      maxCftCapacity = 600;
    } else if (totalCft > 140) {
      vehicleName = '14ft Eicher (Standard Container)';
      vehicleIcon = '🚚';
      maxCftCapacity = 350;
    }

    const fillPct = Math.min(100, Math.round((totalCft / maxCftCapacity) * 100));

    const cftDisplay = document.getElementById('pmTotalCftDisplay');
    const gaugeBar = document.getElementById('pmGaugeBar');
    const vehicleNameEl = document.getElementById('pmVehicleName');
    const vehicleIconEl = document.getElementById('pmVehicleIcon');

    if (cftDisplay) cftDisplay.textContent = `${totalCft} CFT`;
    if (gaugeBar) gaugeBar.style.width = `${fillPct}%`;
    if (vehicleNameEl) vehicleNameEl.textContent = vehicleName;
    if (vehicleIconEl) vehicleIconEl.textContent = vehicleIcon;

    // 3. Distance & Surcharges
    const moveType = document.getElementById('pmMoveTypeSelect')?.value || 'local';
    const tier = document.getElementById('pmPackingTierSelect')?.value || 'standard';

    let baseLow = Math.round(totalCft * 22) + 2200;
    let baseHigh = Math.round(totalCft * 28) + 3200;

    if (moveType === 'intercity') {
      baseLow = Math.round(baseLow * 2.3);
      baseHigh = Math.round(baseHigh * 2.5);
    }

    if (tier === 'premium') {
      baseLow += 1400;
      baseHigh += 2000;
    }

    const estimateLowEl = document.getElementById('pmEstimateLow');
    const estimateHighEl = document.getElementById('pmEstimateHigh');
    if (estimateLowEl) estimateLowEl.textContent = `₹${baseLow.toLocaleString('en-IN')}`;
    if (estimateHighEl) estimateHighEl.textContent = `₹${baseHigh.toLocaleString('en-IN')}`;
  }

  function handleMoversLeadSubmit(e) {
    e.preventDefault();
    const fromArea = document.getElementById('pmFromAreaInput')?.value || 'Current Home';
    const toArea = document.getElementById('pmToAreaInput')?.value || 'New Destination';
    const size = document.getElementById('pmMoveSizeSelect')?.value || '2 BHK';
    const phone = document.getElementById('pmPhoneInput')?.value || '+91 98450 11223';

    if (window.QuoteMarketplace && window.QuoteMarketplace.createQuote) {
      window.QuoteMarketplace.createQuote({
        title: `Packers & Movers Shifting (${size}) from ${fromArea} to ${toArea}`,
        category: 'home',
        urgency: 'Flexible (This Month)',
        budget: 'Best Market Rates',
        notes: `Moving ${size} from ${fromArea} to ${toArea}. Need 3 competitive quotes.`,
        customerName: 'Shifting Customer',
        customerPhone: phone
      });
    }

    const form = document.getElementById('pmLeadForm');
    const resultBox = document.getElementById('pmResultBox');
    if (form) form.style.display = 'none';
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="jd-deal-success-card">
          <div class="jd-success-icon-badge">🚚</div>
          <h3 style="font-size: 1.3rem; color: var(--text-primary); margin-bottom: 0.35rem;">Moving Request Dispatched!</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
            Top 3 verified movers (including <strong>SafeMove India</strong> & <strong>National Express</strong>) are reviewing your route from <strong>${escapeHtml(fromArea)}</strong> to <strong>${escapeHtml(toArea)}</strong>.
          </p>
          <div class="jd-vendor-sms-preview">
            📞 Expect direct competitive quotes and vehicle options within 10 minutes.
          </div>
          <button class="action-btn action-btn-primary" style="margin-top: 1.25rem;" onclick="document.getElementById('jdPackersMoversDialog').close()">
            Done & Browse Movers
          </button>
        </div>
      `;
      resultBox.style.display = 'block';
    }

    if (window.SoundFX) window.SoundFX.playSuccess();
    showToast('Moving request dispatched to top verified moving partners!', 'success');
  }

  /* ==========================================================================
     6. JD Mart (B2B Wholesale Mode) Toggle
     ========================================================================== */
  function toggleB2BMode() {
    jdState.b2bModeActive = !jdState.b2bModeActive;
    const btn = document.getElementById('b2bModeToggleBtn');
    if (btn) btn.classList.toggle('active', jdState.b2bModeActive);

    const banner = document.getElementById('jdMartBanner');
    if (banner) banner.style.display = jdState.b2bModeActive ? 'flex' : 'none';

    if (window.LocalCare && window.LocalCare.filterB2B) {
      window.LocalCare.filterB2B(jdState.b2bModeActive);
    } else {
      if (jdState.b2bModeActive) {
        if (window.LocalCare && window.LocalCare.filterBySearch) {
          window.LocalCare.filterBySearch('wholesale');
        }
      } else {
        if (window.LocalCare && window.LocalCare.resetAllFilters) {
          window.LocalCare.resetAllFilters();
        }
      }
    }

    if (jdState.b2bModeActive) {
      showToast('Switched to JD Mart B2B Wholesale Mode (MOQ & Bulk Rates)', 'success');
    } else {
      showToast('Exited B2B Wholesale Mode', 'info');
    }

    scrollToResults();
  }

  /* ==========================================================================
     7. Interactive In-App WhatsApp Web Concierge Simulator
     ========================================================================== */
  function openWhatsAppEnquiry(businessName, locality, city, phone) {
    let dialog = document.getElementById('waChatDialog');
    if (!dialog) {
      createWhatsAppDialog();
      dialog = document.getElementById('waChatDialog');
    }

    const cleanNumber = (phone || '9845011223').replace(/[^0-9]/g, '');
    jdState.currentWhatsAppBusiness = {
      name: businessName || 'LocalCare Verified Partner',
      locality: locality || 'Koramangala',
      city: city || 'Bengaluru',
      phone: cleanNumber,
      avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&q=80'
    };

    renderWhatsAppChat();
    if (window.SoundFX) window.SoundFX.playPop();
    dialog.showModal();
  }

  function createWhatsAppDialog() {
    if (document.getElementById('waChatDialog')) return;
    const dlg = document.createElement('dialog');
    dlg.id = 'waChatDialog';
    dlg.className = 'app-dialog';
    dlg.style.width = '520px';
    dlg.style.maxWidth = '95vw';
    dlg.setAttribute('aria-labelledby', 'waContactName');
    dlg.innerHTML = `
      <div class="dialog-content-wrapper wa-chat-wrapper">
        <div class="wa-chat-header">
          <div class="wa-header-profile">
            <div class="wa-avatar-box">
              <img id="waAvatarImg" src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=120&q=80" alt="Profile" class="wa-avatar-img" />
              <span class="wa-online-dot"></span>
            </div>
            <div>
              <div class="wa-title-row">
                <span class="wa-contact-name" id="waContactName">Apex Pro Care</span>
                <span class="wa-verified-tick" title="Verified Business">✓</span>
              </div>
              <div class="wa-status-text" id="waStatusText">online • verified local partner</div>
            </div>
          </div>
          <div class="wa-header-tools">
            <button class="wa-tool-btn" onclick="window.JDFeatures.launchOfficialWhatsApp()" title="Open official WhatsApp app">🔗</button>
            <button class="dialog-close-btn" data-close-dialog aria-label="Close chat" style="color:#ffffff;">✕</button>
          </div>
        </div>

        <div class="wa-chat-body" id="waChatBody">
          <!-- Dynamically populated -->
        </div>

        <!-- Suggestion Chips -->
        <div class="wa-chips-strip" id="waChipsStrip">
          <button class="wa-suggest-chip" onclick="window.JDFeatures.sendWhatsAppQuickReply('ratecard')">📋 Rate Card</button>
          <button class="wa-suggest-chip" onclick="window.JDFeatures.sendWhatsAppQuickReply('today')">⚡ Visit Today?</button>
          <button class="wa-suggest-chip" onclick="window.JDFeatures.sendWhatsAppQuickReply('discount')">🎁 Coupon Code</button>
          <button class="wa-suggest-chip" onclick="window.JDFeatures.sendWhatsAppQuickReply('address')">📍 Shop Address</button>
        </div>

        <form class="wa-input-footer" onsubmit="window.JDFeatures.handleWhatsAppSubmit(event)">
          <input type="text" id="waTextInput" class="wa-chat-input" placeholder="Type a message..." autocomplete="off" />
          <button type="submit" class="wa-send-btn" title="Send Message">➤</button>
        </form>
      </div>
    `;
    document.body.appendChild(dlg);

    dlg.querySelector('[data-close-dialog]')?.addEventListener('click', () => dlg.close());
  }

  function renderWhatsAppChat() {
    const biz = jdState.currentWhatsAppBusiness;
    if (!biz) return;

    const nameEl = document.getElementById('waContactName');
    const avatarEl = document.getElementById('waAvatarImg');

    if (nameEl) nameEl.textContent = biz.name;
    if (avatarEl) avatarEl.src = biz.avatar;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    jdState.whatsAppMessages = [
      {
        type: 'received',
        text: `Namaste Chethan! 🙏 Thank you for reaching out to <strong>${escapeHtml(biz.name)}</strong> on WhatsApp.`,
        time: timeStr
      },
      {
        type: 'received',
        text: `We are a police-verified, top-rated local service provider based in <strong>${escapeHtml(biz.locality)}, ${escapeHtml(biz.city)}</strong>. Our certified specialists are available for same-day doorstep service. How can we help you today?`,
        time: timeStr
      }
    ];

    renderWhatsAppMessages();
  }

  function renderWhatsAppMessages() {
    const bodyEl = document.getElementById('waChatBody');
    if (!bodyEl) return;

    let html = `
      <div class="wa-encrypted-tag">
        🔒 Messages are end-to-end encrypted. No third party or spam can access this direct chat.
      </div>
    `;

    jdState.whatsAppMessages.forEach(msg => {
      const isOut = msg.type === 'sent';
      html += `
        <div class="wa-bubble ${isOut ? 'wa-bubble-out' : 'wa-bubble-in'}">
          ${msg.text}
          <div class="wa-msg-meta">
            <span>${msg.time}</span>
            ${isOut ? '<span class="wa-blue-ticks">✓✓</span>' : ''}
          </div>
        </div>
      `;
    });

    bodyEl.innerHTML = html;
    bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function handleWhatsAppSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('waTextInput');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = '';

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    jdState.whatsAppMessages.push({
      type: 'sent',
      text: escapeHtml(text),
      time: timeStr
    });
    renderWhatsAppMessages();
    if (window.SoundFX) window.SoundFX.playClick();

    const statusEl = document.getElementById('waStatusText');
    if (statusEl) statusEl.textContent = 'typing...';

    setTimeout(() => {
      if (statusEl) statusEl.textContent = 'online • verified local partner';

      const replies = [
        "Sure, we can take care of that! Our technician is available within 30-45 minutes. Would you like to confirm the booking?",
        "Our standard inspection fee is just ₹149, which is 100% waived off if you proceed with the repair!",
        "Yes, all our services come with the LocalCare ₹10,000 Quality Shield and a 30-day rework guarantee.",
        "We have received your requirement. One of our master technicians will call you immediately on your registered number!"
      ];
      const botReply = replies[Math.floor(Math.random() * replies.length)];

      jdState.whatsAppMessages.push({
        type: 'received',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      renderWhatsAppMessages();
      if (window.SoundFX) window.SoundFX.playPop();
    }, 900);
  }

  function sendWhatsAppQuickReply(replyKey) {
    const biz = jdState.currentWhatsAppBusiness || { name: 'Service Pro', locality: 'Bengaluru' };
    let question = '';
    let answer = '';

    if (replyKey === 'ratecard') {
      question = 'Could you please send me your official verified rate card?';
      answer = `<strong>📋 Official Verified Rate Card - ${escapeHtml(biz.name)}:</strong><br/>• Doorstep Inspection & Diagnosis: ₹149 (Waived on repair)<br/>• Standard Repair / Consultation: ₹399<br/>• Full Deep Overhaul & Servicing: ₹649<br/>• 30-Day Quality Warranty included on all work!`;
    } else if (replyKey === 'today') {
      question = 'Are your specialists available to visit today?';
      answer = `⚡ <strong>Yes, absolutely!</strong> We have 2 technicians on duty near <strong>${escapeHtml(biz.locality)}</strong> today. Earliest arrival window is within <strong>35 minutes</strong>.`;
    } else if (replyKey === 'discount') {
      question = 'Do you have any ongoing discounts or coupons?';
      answer = `🎁 <strong>Exclusive LocalCare Offer:</strong> Use coupon <strong>LOCAL50</strong> to get flat ₹50 OFF + 5% cashback when paying via JD Pay!`;
    } else if (replyKey === 'address') {
      question = 'Where is your clinic/workshop located?';
      answer = `📍 <strong>Our Location:</strong> 14th Main Road, ${escapeHtml(biz.locality)}, ${escapeHtml(biz.city)}.<br/><em>Landmark: 200m from Main Metro Station.</em>`;
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    jdState.whatsAppMessages.push({ type: 'sent', text: question, time: timeStr });
    renderWhatsAppMessages();

    const statusEl = document.getElementById('waStatusText');
    if (statusEl) statusEl.textContent = 'typing...';

    setTimeout(() => {
      if (statusEl) statusEl.textContent = 'online • verified local partner';
      jdState.whatsAppMessages.push({ type: 'received', text: answer, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
      renderWhatsAppMessages();
      if (window.SoundFX) window.SoundFX.playPop();
    }, 700);
  }

  function launchOfficialWhatsApp() {
    const biz = jdState.currentWhatsAppBusiness;
    if (!biz) return;
    const cleanNumber = biz.phone.startsWith('91') ? biz.phone : `91${biz.phone}`;
    const text = encodeURIComponent(`Hi ${biz.name}! I am contacting you from LocalCare Justdial.`);
    window.open(`https://wa.me/${cleanNumber}?text=${text}`, '_blank');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ==========================================================================
     8. Public API & Initialization
     ========================================================================== */
  function init() {
    initQuickServicesGrid();
    renderLocalityPills();

    // Attach Best Deal form listener
    const bestDealForm = document.getElementById('jdBestDealForm');
    if (bestDealForm) {
      bestDealForm.addEventListener('submit', handleBestDealSubmit);
    }

    // Attach Recharge form listener
    const rechargeForm = document.getElementById('jdpayRechargeForm');
    if (rechargeForm) {
      rechargeForm.addEventListener('submit', handleRechargeSubmit);
    }

    // Attach Movers form listener
    const moversForm = document.getElementById('pmLeadForm');
    if (moversForm) {
      moversForm.addEventListener('submit', handleMoversLeadSubmit);
    }

    // Attach Operator selector
    document.querySelectorAll('.jdpay-op-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.jdpay-op-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        jdState.selectedOperator = btn.getAttribute('data-op');
        renderRechargePlans();
      });
    });

    // Attach Movers calculator triggers
    ['pmMoveSizeSelect', 'pmMoveTypeSelect', 'pmPackingTierSelect'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', calculateMoversEstimate);
    });

    // Listen to city changes to refresh locality pills
    document.addEventListener('cityChanged', (e) => {
      jdState.activeLocality = '';
      renderLocalityPills();
    });
  }

  // Toast Helper
  function showToast(msg, type = 'info') {
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(msg, type);
    }
  }

  // Expose to window
  window.JDFeatures = {
    init,
    openBestDealModal,
    openJdPayModal,
    switchJdPayTab,
    selectPlan,
    handleFetchElectricityBill,
    payElectricityBill,
    openPackersMoversModal,
    switchMoversRoom,
    updateMoversItemQty,
    calculateMoversEstimate,
    toggleB2BMode,
    openWhatsAppEnquiry,
    handleWhatsAppSubmit,
    sendWhatsAppQuickReply,
    launchOfficialWhatsApp,
    aiNegotiateBid,
    acceptRadarBid,
    setLocalityFilter,
    renderLocalityPills
  };

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

