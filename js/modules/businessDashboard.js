/* ==========================================================================
   Local Care - Business Owner Dashboard Module
   Vendor management portal for leads, bookings dispatch, pricing, and analytics
   ========================================================================== */

window.BusinessDashboard = (function () {
  'use strict';

  let currentBizTab = 'overview';

  function init() {
    renderBusinessPortalModal();
  }

  function renderBusinessPortalModal() {
    if (document.getElementById('businessPortalDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'businessPortalDialog';
    dialog.className = 'app-dialog business-portal-dialog';
    dialog.setAttribute('aria-labelledby', 'bizPortalTitle');
    dialog.innerHTML = `
      <div class="dialog-content-wrapper biz-portal-content-wrapper">
        <div class="dialog-header biz-portal-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="biz-portal-badge">💼</div>
            <div>
              <h3 class="dialog-title" id="bizPortalTitle">Business Partner Center</h3>
              <small style="color: var(--text-secondary);">QuickFix Pro AC & Electricals • Koramangala Hub (Verified Partner)</small>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('businessPortalDialog').close()" aria-label="Close business portal">✕</button>
        </div>

        <div class="biz-portal-layout">
          <!-- Sidebar Nav -->
          <div class="biz-sidebar-nav">
            <button class="biz-nav-item active" data-biztab="overview">
              <span>📊</span> Performance Overview
            </button>
            <button class="biz-nav-item" data-biztab="leads">
              <span>⚡</span> Customer Leads Inbox
              <span class="dash-tab-badge" id="bizLeadsBadge">3 New</span>
            </button>
            <button class="biz-nav-item" data-biztab="bookings">
              <span>📅</span> Service Orders
              <span class="dash-tab-badge alert">2 Live</span>
            </button>
            <button class="biz-nav-item" data-biztab="services">
              <span>🛠️</span> Services & Rate Card
            </button>
            <button class="biz-nav-item" data-biztab="offers">
              <span>🏷️</span> Deals & Promotions
            </button>
            <button class="biz-nav-item" data-biztab="reviews">
              <span>⭐</span> Customer Reviews
            </button>
            <button class="biz-nav-item" data-biztab="plans">
              <span>💎</span> Growth Plans & Ads
              <span class="dash-tab-badge" style="background:#fef3c7; color:#92400e; font-weight:800;">Upgrade</span>
            </button>

            <!-- AI Co-Pilot Partner Suite Divider -->
            <div style="font-size: 0.7rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.6px; padding: 0.6rem 0.6rem 0.2rem; margin-top: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>✨</span> AI Co-Pilot Suite
            </div>
            <button class="biz-nav-item" data-biztab="ai-quotes">
              <span>🤖</span> AI Smart Quotes
              <span class="biz-ai-badge">QuoteCraft</span>
            </button>
            <button class="biz-nav-item" data-biztab="ai-reputation">
              <span>⭐</span> AI Review Sentiment
              <span class="biz-ai-badge" style="background: linear-gradient(135deg, #059669, #10b981);">Reputation</span>
            </button>
            <button class="biz-nav-item" data-biztab="ai-demand">
              <span>📈</span> AI Demand Radar
              <span class="biz-ai-badge" style="background: linear-gradient(135deg, #ea580c, #f59e0b);">Live Heat</span>
            </button>
          </div>

          <!-- Main Workspace -->
          <div class="biz-main-workspace" id="bizMainWorkspace">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    bindNavEvents();
  }

  function bindNavEvents() {
    document.querySelectorAll('.biz-nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.biz-nav-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentBizTab = btn.getAttribute('data-biztab');
        renderActiveBizTab();
      });
    });
  }

  function openPortal(defaultTab = 'overview') {
    currentBizTab = defaultTab;
    let dialog = document.getElementById('businessPortalDialog');
    if (!dialog) {
      renderBusinessPortalModal();
      dialog = document.getElementById('businessPortalDialog');
    }
    if (!dialog) return;

    document.querySelectorAll('.biz-nav-item').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-biztab') === currentBizTab);
    });

    renderActiveBizTab();
    dialog.showModal();
    if (window.SoundFX) window.SoundFX.playPop();
  }

  function renderActiveBizTab() {
    const space = document.getElementById('bizMainWorkspace');
    if (!space) return;

    if (currentBizTab === 'overview') {
      renderOverviewTab(space);
    } else if (currentBizTab === 'leads') {
      renderLeadsTab(space);
    } else if (currentBizTab === 'bookings') {
      renderBookingsTab(space);
    } else if (currentBizTab === 'services') {
      renderServicesTab(space);
    } else if (currentBizTab === 'offers') {
      renderOffersTab(space);
    } else if (currentBizTab === 'reviews') {
      renderReviewsTab(space);
    } else if (currentBizTab === 'plans') {
      renderPlansTab(space);
    } else if (currentBizTab === 'ai-quotes') {
      renderAiQuotesTab(space);
    } else if (currentBizTab === 'ai-reputation') {
      renderAiReputationTab(space);
    } else if (currentBizTab === 'ai-demand') {
      renderAiDemandTab(space);
    }
  }

  function renderOverviewTab(space) {
    space.innerHTML = `
      <div class="biz-tab-title-line">
        <h4>Today's Business Metrics & Growth</h4>
        <span class="text-success" style="font-weight: 700; font-size: 0.85rem;">● Live & Accepting Bookings</span>
      </div>

      <!-- KPI Metric Cards Grid -->
      <div class="biz-metrics-grid">
        <div class="biz-metric-card">
          <div class="metric-top">
            <span class="metric-title">Today's Leads</span>
            <span class="metric-icon">⚡</span>
          </div>
          <div class="metric-value">14</div>
          <div class="metric-growth positive">▲ +24% vs yesterday</div>
        </div>

        <div class="biz-metric-card">
          <div class="metric-top">
            <span class="metric-title">Customer Calls</span>
            <span class="metric-icon">📞</span>
          </div>
          <div class="metric-value">28</div>
          <div class="metric-growth positive">▲ +12% this week</div>
        </div>

        <div class="biz-metric-card">
          <div class="metric-top">
            <span class="metric-title">Bookings Delivered</span>
            <span class="metric-icon">✅</span>
          </div>
          <div class="metric-value">9</div>
          <div class="metric-growth">100% on-time arrival</div>
        </div>

        <div class="biz-metric-card">
          <div class="metric-top">
            <span class="metric-title">Today's Revenue</span>
            <span class="metric-icon">💵</span>
          </div>
          <div class="metric-value">₹18,450</div>
          <div class="metric-growth positive">UPI Settlement Instant</div>
        </div>

        <div class="biz-metric-card">
          <div class="metric-top">
            <span class="metric-title">Profile Views</span>
            <span class="metric-icon">👁️</span>
          </div>
          <div class="metric-value">482</div>
          <div class="metric-growth">Top ranked in Koramangala</div>
        </div>

        <div class="biz-metric-card">
          <div class="metric-top">
            <span class="metric-title">Customer Rating</span>
            <span class="metric-icon">⭐</span>
          </div>
          <div class="metric-value">4.9 / 5.0</div>
          <div class="metric-growth">Based on 512 reviews</div>
        </div>
      </div>

      <!-- Quick Action Controls -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-top: 1.5rem;">
        <h5 style="margin-bottom: 0.75rem; font-size: 0.95rem;">Quick Operations</h5>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
          <button class="action-btn action-btn-primary" onclick="window.BusinessDashboard.switchTab('leads')">Respond to 3 New Leads</button>
          <button class="action-btn action-btn-outline" onclick="window.BusinessDashboard.switchTab('services')">+ Add New Service</button>
          <button class="action-btn action-btn-outline" onclick="window.BusinessDashboard.switchTab('offers')">Launch Festive Deal</button>
        </div>
      </div>
    `;
  }

  function renderLeadsTab(space) {
    const liveEnquiries = JSON.parse(localStorage.getItem('localcare_enquiries') || '[]');
    const totalCount = 3 + liveEnquiries.length;

    space.innerHTML = `
      <div class="biz-tab-title-line">
        <h4>High-Intent Customer Enquiries (${totalCount})</h4>
      </div>
      <div class="dash-cards-list">
        ${liveEnquiries.map(enq => `
          <div class="dash-booking-card" style="padding: 1.25rem; border-left: 4px solid var(--primary); background: rgba(255,104,0,0.03);">
            <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem;">
              <div>
                <span class="bid-badge" style="background: var(--primary); color: white;">⚡ Direct Customer Enquiry</span>
                <h5 style="margin: 0.4rem 0 0.2rem 0; font-size: 1rem;">${enq.customerName} (${enq.customerPhone})</h5>
                <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0.35rem 0;">"${enq.requirement}"</p>
                <small style="color: var(--text-muted);">Preferred Date: ${enq.preferredDate || 'Earliest'} • Urgency: ${enq.urgency || 'Immediate'} • ${new Date(enq.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</small>
              </div>
              <div style="text-align: right; display: flex; flex-direction: column; gap: 0.4rem;">
                <a href="tel:${(enq.customerPhone || '').replace(/\s+/g, '')}" class="action-btn action-btn-primary" style="padding: 0.35rem 0.75rem; font-size: 0.82rem; text-decoration: none; text-align: center;">📞 Call Customer</a>
                <button class="action-btn action-btn-outline" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" onclick="window.LocalCare.showToast('Enquiry marked as Contacted', 'success')">Mark Responded</button>
              </div>
            </div>
          </div>
        `).join('')}

        <div class="dash-booking-card" style="padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <span class="bid-badge">⚡ AC Leakage Repair</span>
              <h5 style="margin: 0.4rem 0 0.2rem 0; font-size: 1rem;">Customer in HSR Layout Sector 2</h5>
              <p style="font-size: 0.88rem; color: var(--text-secondary);">"Water dripping from indoor split AC unit. Need technician today before 4 PM."</p>
              <small style="color: var(--text-muted);">Urgency: Today • Budget: Under ₹600 • Received 12m ago</small>
            </div>
            <div style="text-align: right;">
              <button class="action-btn action-btn-primary" onclick="window.LocalCare.showToast('Bid of ₹449 sent to customer!', 'success')">Submit Bid (₹449)</button>
              <div style="margin-top: 0.5rem;">
                <button class="action-btn action-btn-outline" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" onclick="window.LocalCare.showToast('Customer contact shared via WhatsApp', 'info')">Call Customer</button>
              </div>
            </div>
          </div>
        </div>

        <div class="dash-booking-card" style="padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between;">
            <div>
              <span class="bid-badge">⚡ Full Copper Piping & Installation</span>
              <h5 style="margin: 0.4rem 0 0.2rem 0; font-size: 1rem;">Customer in Koramangala 4th Block</h5>
              <p style="font-size: 0.88rem; color: var(--text-secondary);">"New 1.5 ton Inverter AC installation with 5 meters copper piping."</p>
              <small style="color: var(--text-muted);">Urgency: Tomorrow • Budget: ₹1,500 - ₹2,000 • Received 45m ago</small>
            </div>
            <div style="text-align: right;">
              <button class="action-btn action-btn-primary" onclick="window.LocalCare.showToast('Quote sent to customer!', 'success')">Submit Quote</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderBookingsTab(space) {
    space.innerHTML = `
      <div class="biz-tab-title-line">
        <h4>Assigned Doorstep Bookings</h4>
      </div>
      <div class="dash-cards-list">
        <div class="dash-booking-card">
          <div class="bk-info" style="width: 100%;">
            <div class="bk-title-row">
              <h4 class="bk-service-title">Split AC Power Jet Servicing</h4>
              <span class="bk-status-pill active">Technician On The Way</span>
            </div>
            <div class="bk-schedule">Customer: Chethan B K • 42, 5th Cross, Koramangala 4th Block</div>
            <div class="bk-price">Assigned Technician: <strong>Suresh Gowda</strong> • OTP: <strong>5192</strong></div>
            <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
              <button class="action-btn action-btn-primary" style="font-size: 0.82rem;" onclick="window.LocalCare.showToast('Service marked as Started', 'info')">Mark Service Started</button>
              <button class="action-btn action-btn-outline" style="font-size: 0.82rem;" onclick="window.LocalCare.showToast('Order completed & invoice generated!', 'success')">Mark Completed</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderServicesTab(space) {
    space.innerHTML = `
      <div class="biz-tab-title-line">
        <h4>Rate Card & Services</h4>
        <button class="action-btn action-btn-primary" style="font-size: 0.82rem;" onclick="window.BusinessDashboard.showAddServicePrompt()">+ Add Service</button>
      </div>
      <div class="dash-cards-list" id="bizServicesList">
        <div class="dash-booking-card" style="padding: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>Split AC Power Jet Servicing</strong>
            <div style="font-size: 0.82rem; color: var(--text-muted);">Duration: 45 mins • Includes foam wash</div>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <strong style="color: var(--primary); font-size: 1.1rem;">₹449</strong>
            <button class="action-btn action-btn-ghost" onclick="window.LocalCare.showToast('Service price updated', 'info')">Edit</button>
          </div>
        </div>

        <div class="dash-booking-card" style="padding: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>AC Gas Leakage Check & Top-up</strong>
            <div style="font-size: 0.82rem; color: var(--text-muted);">Duration: 60 mins • R32/R410A</div>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <strong style="color: var(--primary); font-size: 1.1rem;">₹1,899</strong>
            <button class="action-btn action-btn-ghost" onclick="window.LocalCare.showToast('Service price updated', 'info')">Edit</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderOffersTab(space) {
    space.innerHTML = `
      <div class="biz-tab-title-line">
        <h4>Promotional Deals & Coupons</h4>
        <button class="action-btn action-btn-primary" style="font-size: 0.82rem;" onclick="window.LocalCare.showToast('New deal created & published to Local Deals feed!', 'success')">+ Create New Deal</button>
      </div>
      <div class="dash-booking-card" style="padding: 1.25rem;">
        <span class="bid-badge">🔥 Active Deal</span>
        <h5 style="margin: 0.5rem 0 0.25rem 0;">Flat 35% OFF on AC Power Jet Service</h5>
        <p style="color: var(--text-secondary); font-size: 0.88rem;">Appears in "Deals Near You" carousel for users in Bengaluru.</p>
        <div style="display: flex; justify-content: space-between; margin-top: 0.75rem; font-size: 0.85rem;">
          <span>Deal Price: <strong>₹449</strong> (Reg: ₹699)</span>
          <span class="text-success">Generated 38 bookings</span>
        </div>
      </div>
    `;
  }

  function renderReviewsTab(space) {
    space.innerHTML = `
      <div class="biz-tab-title-line">
        <h4>Customer Feedback & Responses (Rating: 4.9★)</h4>
      </div>
      <div class="dash-cards-list">
        <div class="dash-booking-card" style="padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between;">
            <strong>Vikram Sethi</strong>
            <span style="color: #f59e0b;">★★★★★</span>
          </div>
          <p style="color: var(--text-secondary); font-size: 0.88rem; margin: 0.4rem 0;">"Technician Suresh arrived in 25 minutes flat! Solved the water dripping issue in my Daikin split AC in no time."</p>
          <div style="margin-top: 0.5rem; background: var(--bg-subtle); padding: 0.6rem; border-radius: var(--radius-sm); font-size: 0.82rem;">
            <strong>Your Response:</strong> "Thank you Vikram! Glad we could solve the water dripping issue promptly."
          </div>
        </div>
      </div>
    `;
  }

  /* ==========================================================================
     AI Co-Pilot Partner Suite Data & Methods
     ========================================================================== */
  const AI_QUOTE_PRESETS = {
    ac_powerjet: {
      id: 'ac_powerjet',
      title: 'Split AC Power Jet + R32 Refrigerant Gas Refill',
      category: 'AC & Cooling',
      client: 'Lead #4102 • HSR Layout Sector 2 (Dripping + Weak Cooling)',
      items: [
        { name: 'Eco Refrigerant R32 (800g Canister)', qty: '1 Can', unitCost: 650, clientRate: 1299 },
        { name: 'Epcos 45 MFD Dual Run Capacitor', qty: '1 Unit', unitCost: 180, clientRate: 380 },
        { name: 'Foam Jet Pressure Coil Clean Chemical', qty: '500 ml', unitCost: 90, clientRate: 250 },
        { name: 'HVAC Master Tech Labor (90 Mins)', qty: '1 Job', unitCost: 350, clientRate: 699 }
      ],
      warranty: '90-Day Cooling & Leakage Shield Guarantee',
      sla: 'Guaranteed 45-Min Arrival'
    },
    painting_2bhk: {
      id: 'painting_2bhk',
      title: 'Complete 2BHK Interior Painting (Asian Paints Royale)',
      category: 'Painting & Decor',
      client: 'Lead #4088 • Koramangala 4th Block (Fresh Repaint)',
      items: [
        { name: 'Asian Paints Royale Luxury Emulsion', qty: '20 Litres', unitCost: 6800, clientRate: 9800 },
        { name: 'Decoprime Water-Based Wall Primer', qty: '10 Litres', unitCost: 1400, clientRate: 2200 },
        { name: 'Birla White Wall Seal Putty & Sanding', qty: '40 kg', unitCost: 950, clientRate: 1800 },
        { name: 'Master Painters Team (3 Days x 2 Pros)', qty: '6 Mandays', unitCost: 3600, clientRate: 5900 },
        { name: 'Floor Masking & Post-Job Vacuum Cleanup', qty: '1 Setup', unitCost: 400, clientRate: 950 }
      ],
      warranty: '3-Year Anti-Fungal & Color Fastness Warranty',
      sla: '3-Day Turnaround Guarantee'
    },
    bathroom_plumbing: {
      id: 'bathroom_plumbing',
      title: 'Master Bathroom Concealed Leakage & Drainage Overhaul',
      category: 'Plumbing & Seepage',
      client: 'Lead #4075 • Indiranagar 100ft Road (Tile Seepage)',
      items: [
        { name: 'Astral CPVC Pro Pipes & Brass Elbows', qty: '1 Bundle', unitCost: 1100, clientRate: 1850 },
        { name: 'Dr. Fixit Fastflex Epoxy Waterproofing', qty: '10 kg Pack', unitCost: 1250, clientRate: 2100 },
        { name: 'Ceramic Tile Removal & Re-grouting', qty: '1 Bath', unitCost: 600, clientRate: 1200 },
        { name: 'Licensed Plumber Labor & Pressure Test', qty: '1.5 Days', unitCost: 900, clientRate: 1650 }
      ],
      warranty: '2-Year 100% Zero-Drip Shield Guarantee',
      sla: 'Next-Day Completion'
    },
    car_periodic: {
      id: 'car_periodic',
      title: 'Comprehensive 40,000 km Periodic Car Service',
      category: 'Multi-Brand Auto',
      client: 'Lead #4062 • Whitefield ITPL (Hyundai i20 Petrol)',
      items: [
        { name: 'Shell Helix Ultra 5W-30 Full Synthetic Oil', qty: '3.5 Litres', unitCost: 1750, clientRate: 2450 },
        { name: 'Bosch Genuine Engine Oil Filter & O-Ring', qty: '1 Unit', unitCost: 180, clientRate: 350 },
        { name: 'High Air-Flow Engine Air Filter', qty: '1 Unit', unitCost: 240, clientRate: 480 },
        { name: '4-Wheel Brake Disc Pad Clean & Caliper Grease', qty: '4 Wheels', unitCost: 300, clientRate: 650 },
        { name: '35-Point Diagnostic Computer Scan & Labor', qty: '1 Vehicle', unitCost: 450, clientRate: 950 }
      ],
      warranty: '6-Month / 10,000 km Service Warranty',
      sla: '4-Hour Express Delivery'
    }
  };

  let activeAiQuotePreset = 'ac_powerjet';
  let isSurgePricingEnabled = false;

  const PARTNER_REVIEWS = [
    {
      id: 'rev_1',
      name: 'Sneha Rao',
      city: 'Bengaluru (Koramangala)',
      rating: 5,
      date: '2 hours ago',
      text: 'Technician Suresh arrived in 25 minutes flat! Solved the water dripping issue in my Daikin split AC in no time. Very polite and clean work.',
      sentiment: 'Enthusiastic (98% Positive)',
      sentimentType: 'positive',
      currentReply: 'Thank you Sneha! Glad we could solve the water dripping issue promptly.',
      aiReplies: {
        warm: 'Dear Sneha, thank you so much! We are thrilled Suresh could resolve your AC issue promptly. We look forward to keeping your home cool!',
        corporate: 'Thank you for choosing QuickFix Pro. Your service is covered by our 90-day LocalCare Shield Guarantee. Always at your service.',
        loyalty: 'Thanks Sneha! As a token of gratitude, we have added a 10% loyalty discount code (COOL10) for your next seasonal AMC!'
      }
    },
    {
      id: 'rev_2',
      name: 'Karthik Nambiar',
      city: 'Bengaluru (HSR Layout)',
      rating: 3,
      date: 'Yesterday',
      text: 'Good cooling repair and gas refill, but the technician arrived 20 minutes past the scheduled slot due to Outer Ring Road traffic.',
      sentiment: 'Constructive (Traffic Delay)',
      sentimentType: 'neutral',
      currentReply: '',
      aiReplies: {
        recovery: 'Dear Karthik, we sincerely apologize for the 20-minute traffic delay on ORR. We are refining our real-time dispatch routing. We have credited ₹100 to your wallet for the inconvenience.',
        polite: 'Hello Karthik, thank you for your feedback. We are glad the AC cooling is restored perfectly. We will ensure stricter transit buffers during peak rain traffic hours.'
      }
    }
  ];

  function renderAiQuotesTab(space) {
    const q = AI_QUOTE_PRESETS[activeAiQuotePreset] || AI_QUOTE_PRESETS.ac_powerjet;
    const totalCost = q.items.reduce((acc, it) => acc + it.unitCost, 0);
    const totalClientRate = q.items.reduce((acc, it) => acc + it.clientRate, 0);
    const gst = Math.round(totalClientRate * 0.18);
    const finalTotal = totalClientRate + gst;
    const grossProfit = totalClientRate - totalCost;
    const marginPct = Math.round((grossProfit / totalClientRate) * 100);

    space.innerHTML = `
      <div class="biz-tab-title-line">
        <div>
          <h4>🤖 QuoteCraft AI — Smart Quotation Studio</h4>
          <small style="color: var(--text-secondary);">Generate professional itemized GST quotations with profit margin analysis in 1 click</small>
        </div>
        <span class="biz-profit-pill">✨ Net Margin: ${marginPct}% (₹${grossProfit.toLocaleString('en-IN')})</span>
      </div>

      <!-- Preset Selector Bar -->
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.85rem;">
        <button class="action-btn ${activeAiQuotePreset === 'ac_powerjet' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.BusinessDashboard.switchAiQuotePreset('ac_powerjet')">
          ❄️ AC Jet + Gas Refill
        </button>
        <button class="action-btn ${activeAiQuotePreset === 'painting_2bhk' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.BusinessDashboard.switchAiQuotePreset('painting_2bhk')">
          🎨 2BHK Royale Painting
        </button>
        <button class="action-btn ${activeAiQuotePreset === 'bathroom_plumbing' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.BusinessDashboard.switchAiQuotePreset('bathroom_plumbing')">
          🚰 Bathroom Leakage
        </button>
        <button class="action-btn ${activeAiQuotePreset === 'car_periodic' ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.BusinessDashboard.switchAiQuotePreset('car_periodic')">
          🚗 40k km Car Service
        </button>
      </div>

      <!-- Layout: BOM on Left, Cockpit on Right -->
      <div class="biz-quotecraft-layout">
        <div>
          <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <div>
                <strong style="font-size: 1.05rem;">${q.title}</strong>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${q.client}</div>
              </div>
              <span class="bid-badge">${q.category}</span>
            </div>

            <!-- Bill of Materials Table -->
            <table class="biz-bom-table">
              <thead>
                <tr>
                  <th>Item / Material Description</th>
                  <th>Quantity</th>
                  <th>Cost (₹)</th>
                  <th>Client Rate (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${q.items.map(it => `
                  <tr>
                    <td><strong>${it.name}</strong></td>
                    <td style="color: var(--text-secondary);">${it.qty}</td>
                    <td style="color: var(--text-muted);">₹${it.unitCost.toLocaleString('en-IN')}</td>
                    <td style="font-weight: 700; color: var(--primary);">₹${it.clientRate.toLocaleString('en-IN')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div style="margin-top: 0.85rem; padding: 0.75rem; background: var(--bg-subtle); border-radius: var(--radius-md); font-size: 0.82rem; display: flex; justify-content: space-between;">
              <span>🛡️ <strong>Included SLA:</strong> ${q.sla}</span>
              <span>📜 <strong>Warranty:</strong> ${q.warranty}</span>
            </div>
          </div>
        </div>

        <!-- Margin Cockpit Card -->
        <div>
          <div class="biz-margin-cockpit">
            <h5 style="margin-bottom: 0.25rem; font-size: 1rem;">Quotation Financials</h5>
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-secondary);">
              <span>Material & Labor Cost:</span>
              <strong>₹${totalCost.toLocaleString('en-IN')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-secondary);">
              <span>Client Subtotal:</span>
              <strong style="color: var(--text-primary);">₹${totalClientRate.toLocaleString('en-IN')}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-secondary);">
              <span>GST (18% Input/Output):</span>
              <strong>₹${gst.toLocaleString('en-IN')}</strong>
            </div>
            <hr style="border: none; border-top: 1px dashed var(--border-subtle); margin: 0.2rem 0;" />
            <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 900;">
              <span>Final Quote:</span>
              <span style="color: var(--primary);">₹${finalTotal.toLocaleString('en-IN')}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; background: #ecfdf5; padding: 0.5rem 0.75rem; border-radius: var(--radius-md); color: #059669; font-weight: 700;">
              <span>Estimated Net Profit:</span>
              <span>₹${grossProfit.toLocaleString('en-IN')} (${marginPct}%)</span>
            </div>

            <!-- Instant Actions -->
            <button class="action-btn action-btn-primary" style="width: 100%; justify-content: center; margin-top: 0.5rem;" onclick="window.BusinessDashboard.copyAiQuoteWhatsApp()">
              📋 Copy WhatsApp Quotation
            </button>
            <button class="action-btn action-btn-outline" style="width: 100%; justify-content: center;" onclick="window.BusinessDashboard.broadcastAiQuoteToLeads()">
              ⚡ Send to 3 Live Customer Leads
            </button>
            <button class="action-btn action-btn-ghost" style="width: 100%; justify-content: center; font-size: 0.82rem;" onclick="window.LocalCare && window.LocalCare.showToast('Digital GST Proforma downloaded as PDF!', 'info')">
              📄 Download Proforma Invoice
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function switchAiQuotePreset(key) {
    if (!AI_QUOTE_PRESETS[key]) return;
    activeAiQuotePreset = key;
    renderActiveBizTab();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function copyAiQuoteWhatsApp() {
    const q = AI_QUOTE_PRESETS[activeAiQuotePreset];
    const totalClientRate = q.items.reduce((acc, it) => acc + it.clientRate, 0);
    const gst = Math.round(totalClientRate * 0.18);
    const finalTotal = totalClientRate + gst;

    const text = `*QUICKFIX PRO (VERIFIED LOCALCARE PARTNER)* 🛠️\n` +
      `📋 *Service Quotation:* ${q.title}\n` +
      `---------------------------------\n` +
      q.items.map(i => `• ${i.name} (${i.qty}): ₹${i.clientRate}`).join('\n') + `\n` +
      `---------------------------------\n` +
      `Subtotal: ₹${totalClientRate}\n` +
      `GST (18%): ₹${gst}\n` +
      `*Total Final Payable: ₹${finalTotal}*\n\n` +
      `🛡️ *Warranty:* ${q.warranty}\n` +
      `⚡ *Arrival:* ${q.sla}\n` +
      `💳 *Payment:* UPI / Card / Cash on Completion\n\n` +
      `Reply *YES* to confirm this booking slot immediately!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('Quotation copied! Ready to paste into WhatsApp.', 'success');
    }
    if (window.SoundFX) window.SoundFX.playSuccess();
  }

  function broadcastAiQuoteToLeads() {
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('Quote dispatched to 3 matching leads in HSR & Koramangala!', 'success');
    }
    if (window.SoundFX) window.SoundFX.playBell();
  }

  function renderAiReputationTab(space) {
    space.innerHTML = `
      <div class="biz-tab-title-line">
        <div>
          <h4>⭐ Reputation AI — Review Sentiment & Auto-Responder</h4>
          <small style="color: var(--text-secondary);">Classify customer satisfaction, identify root causes, and publish AI smart responses in 1 click</small>
        </div>
      </div>

      <!-- Reputation Overview Bar -->
      <div class="biz-reputation-grid">
        <div class="biz-sentiment-gauge-card">
          <div style="font-size: 0.78rem; font-weight: 800; color: #4f46e5; text-transform: uppercase;">Overall Satisfaction</div>
          <div style="font-size: 2rem; font-weight: 900; margin: 0.25rem 0;">4.9 / 5.0 ★</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">94% Positive Sentiment (NPS +82)</div>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem;">
          <div style="font-size: 0.78rem; font-weight: 800; color: #059669; text-transform: uppercase;">Top Customer Praises</div>
          <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.5rem; font-size: 0.85rem;">
            <span>✅ <strong>88%</strong> praised 30-minute arrival speed</span>
            <span>✅ <strong>92%</strong> appreciated transparent pricing</span>
            <span>✅ <strong>96%</strong> loved verified technician etiquette</span>
          </div>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 1.25rem;">
          <div style="font-size: 0.78rem; font-weight: 800; color: #ea580c; text-transform: uppercase;">AI Improvement Alert</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.5rem;">
            ⚠️ <strong>4% of reviews</strong> mentioned transit delays during evening Bangalore rain. Suggest allocating 15m additional transit buffer on ORR.
          </div>
        </div>
      </div>

      <!-- Reviews Feed with Interactive AI Responders -->
      <h5 style="margin: 1.25rem 0 0.75rem 0; font-size: 0.95rem;">Recent Customer Reviews & AI Auto-Replies</h5>
      <div class="dash-cards-list">
        ${PARTNER_REVIEWS.map(r => `
          <div class="dash-booking-card" id="revCard_${r.id}" style="padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <strong>${r.name}</strong>
                  <span style="font-size: 0.78rem; color: var(--text-muted);">${r.city} • ${r.date}</span>
                </div>
                <div style="color: #f59e0b; margin: 0.2rem 0;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 0.3rem;">"${r.text}"</p>
              </div>
              <span class="bid-badge" style="${r.sentimentType === 'positive' ? 'background: #ecfdf5; color: #059669;' : 'background: #fff7ed; color: #ea580c;'}">${r.sentiment}</span>
            </div>

            <!-- Published Reply Display -->
            <div id="replyDisplay_${r.id}" style="margin-top: 0.75rem; background: var(--bg-subtle); border-left: 3px solid var(--primary); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); font-size: 0.85rem; ${r.currentReply ? '' : 'display: none;'}">
              <strong>Your Live Response:</strong> <span id="replyText_${r.id}">${r.currentReply}</span>
            </div>

            <!-- AI Suggested Smart Replies Bar -->
            <div style="margin-top: 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.85rem;">
              <div style="font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">
                ✨ Select AI Response Style:
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                ${Object.entries(r.aiReplies).map(([k, val]) => `
                  <button class="biz-ai-reply-chip" onclick="window.BusinessDashboard.applyAiReviewReply('${r.id}', \`${val.replace(/'/g, "\\'")}\`)">
                    ${k === 'warm' ? '🌟 Warm & Grateful' : k === 'corporate' ? '💼 Professional' : k === 'loyalty' ? '🎁 Loyalty Offer' : '🛠️ Service Recovery'}
                  </button>
                `).join('')}
              </div>
              <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
                <input type="text" id="customReplyInput_${r.id}" class="dropdown-search" style="margin-bottom: 0; font-size: 0.85rem;" placeholder="Click a style above or write custom response..." />
                <button class="action-btn action-btn-primary" style="padding: 0.4rem 0.85rem; font-size: 0.82rem;" onclick="window.BusinessDashboard.postAiReviewReply('${r.id}')">
                  Post Reply
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function applyAiReviewReply(revId, text) {
    const inp = document.getElementById(`customReplyInput_${revId}`);
    if (inp) {
      inp.value = text;
      inp.focus();
    }
    if (window.SoundFX) window.SoundFX.playPop();
  }

  function postAiReviewReply(revId) {
    const inp = document.getElementById(`customReplyInput_${revId}`);
    const display = document.getElementById(`replyDisplay_${revId}`);
    const textSpan = document.getElementById(`replyText_${revId}`);
    if (!inp || !inp.value.trim()) {
      if (window.LocalCare && window.LocalCare.showToast) {
        window.LocalCare.showToast('Please select or enter an AI response first.', 'info');
      }
      return;
    }

    const reply = inp.value.trim();
    if (textSpan) textSpan.textContent = reply;
    if (display) display.style.display = 'block';

    const rev = PARTNER_REVIEWS.find(r => r.id === revId);
    if (rev) rev.currentReply = reply;

    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('Response published to customer Google & LocalCare review!', 'success');
    }
    if (window.SoundFX) window.SoundFX.playSuccess();
  }

  function renderAiDemandTab(space) {
    space.innerHTML = `
      <div class="biz-tab-title-line">
        <div>
          <h4>📈 DemandRadar AI — Local Micro-Market Heatmap</h4>
          <small style="color: var(--text-secondary);">Real-time live search trends and surge earnings optimizer for your city</small>
        </div>
        <button class="action-btn action-btn-primary" style="font-size: 0.82rem;" onclick="window.BusinessDashboard.broadcastPartnerAvailability()">
          📢 Broadcast Instant Availability
        </button>
      </div>

      <!-- Dynamic Surge Earnings Toggle Card -->
      <div style="background: linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(245, 158, 11, 0.08) 100%); border: 1px solid rgba(234, 88, 12, 0.25); border-radius: var(--radius-lg); padding: 1.25rem; margin-top: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: gap: 1rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.3rem;">⚡</span>
            <strong style="font-size: 1rem;">Peak Demand Surge Pricing (+15% Earnings)</strong>
            <span class="biz-demand-surge-badge" style="position: static;">${isSurgePricingEnabled ? 'ACTIVE (+15%)' : 'OFF'}</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.3rem;">
            High heatwave search traffic currently detected in Bengaluru. Enabling surge pricing boosts your daily take-home earnings.
          </p>
          <div style="font-size: 0.82rem; font-weight: 700; color: #ea580c; margin-top: 0.2rem;">
            Projected Daily Earnings: <strong>₹${isSurgePricingEnabled ? '21,200' : '18,450'}</strong> (${isSurgePricingEnabled ? '+₹2,750 AI Surge Gain' : 'Standard Rate Card'})
          </div>
        </div>
        <div>
          <button class="action-btn ${isSurgePricingEnabled ? 'action-btn-primary' : 'action-btn-outline'}" onclick="window.BusinessDashboard.toggleSurgePricing()">
            ${isSurgePricingEnabled ? '✓ Surge Active (Turn Off)' : '⚡ Activate +15% Surge'}
          </button>
        </div>
      </div>

      <!-- Micro-Market Heatmap Cards -->
      <h5 style="margin: 1.5rem 0 0.5rem 0; font-size: 0.95rem;">Live Locality Search Surges (Bengaluru)</h5>
      <div class="biz-demand-heatmap-grid">
        <div class="biz-demand-card">
          <span class="biz-demand-surge-badge">+340% SURGE</span>
          <div style="font-size: 1.5rem; margin-bottom: 0.4rem;">❄️</div>
          <strong style="font-size: 0.95rem;">Koramangala 4th-7th Block</strong>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.3rem 0;">AC Power Jet & Gas Refill</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Cause: 37°C Heatwave Spike • 54 Unfulfilled Leads</div>
        </div>

        <div class="biz-demand-card">
          <span class="biz-demand-surge-badge">+210% SURGE</span>
          <div style="font-size: 1.5rem; margin-bottom: 0.4rem;">🧹</div>
          <strong style="font-size: 0.95rem;">HSR Layout Sector 1-4</strong>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.3rem 0;">Deep Cleaning & Sofa Sanitization</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Cause: Pre-Weekend Bookings • 38 Active Searches</div>
        </div>

        <div class="biz-demand-card">
          <span class="biz-demand-surge-badge" style="background: #fef3c7; color: #b45309;">+160% HIGH</span>
          <div style="font-size: 1.5rem; margin-bottom: 0.4rem;">🚰</div>
          <strong style="font-size: 0.95rem;">Indiranagar 100ft Road</strong>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.3rem 0;">Bathroom Tile Seepage & Plumbing</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Cause: Heavy Monsoon Rains • 29 Enquiries</div>
        </div>

        <div class="biz-demand-card">
          <span class="biz-demand-surge-badge" style="background: #fef3c7; color: #b45309;">+130% HIGH</span>
          <div style="font-size: 1.5rem; margin-bottom: 0.4rem;">🚗</div>
          <strong style="font-size: 0.95rem;">Whitefield ITPL Corridor</strong>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin: 0.3rem 0;">Periodic Car Service & Denting</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">Cause: Weekend Highway Commute Checks • 22 Leads</div>
        </div>
      </div>
    `;
  }

  function toggleSurgePricing() {
    isSurgePricingEnabled = !isSurgePricingEnabled;
    renderActiveBizTab();
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(isSurgePricingEnabled ? '⚡ Peak Surge (+15%) Activated! Rate cards updated.' : 'Standard rates restored.', 'success');
    }
    if (window.SoundFX) window.SoundFX.playSuccess();
  }

  function broadcastPartnerAvailability() {
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('Availability broadcast to 45 nearby customers searching right now!', 'success');
    }
    if (window.SoundFX) window.SoundFX.playBell();
  }

  function showAddServicePrompt() {
    const name = prompt('Enter new service name:');
    if (!name) return;
    const price = prompt('Enter price in ₹:');
    if (!price) return;

    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(`Service "${name}" at ₹${price} added to your live rate card!`, 'success');
      renderActiveBizTab();
    }
  }

  let activeBusinessPlan = (() => {
    try {
      return localStorage.getItem('localcare_biz_plan') || 'Free Starter';
    } catch (e) {
      return 'Free Starter';
    }
  })();

  function renderPlansTab(space) {
    space.innerHTML = `
      <div class="biz-tab-title-line">
        <h4>Commercial Growth, Subscriptions & Sponsored Ads</h4>
        <span class="text-success" style="font-weight: 700; font-size: 0.85rem;">Active Tier: <strong>${activeBusinessPlan}</strong></span>
      </div>

      <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
        Skyrocket your customer enquiries across your city with transparent commercial subscription tiers, verified trust badges, and sponsored search placements.
      </p>

      <div class="sub-plans-grid">
        <!-- Free Starter -->
        <div class="sub-plan-card ${activeBusinessPlan === 'Free Starter' ? 'featured' : ''}">
          <div class="sub-plan-header">
            <div class="sub-plan-name">Free Starter</div>
            <div class="sub-plan-price">₹0 <span>/ month</span></div>
            <small style="color: var(--text-muted);">Standard organic local directory presence</small>
          </div>
          <ul class="sub-features-list">
            <li><span class="check">✓</span> 1 Business Listing & Contact Info</li>
            <li><span class="check">✓</span> Customer Direct Phone Enquiries</li>
            <li><span class="check">✓</span> Basic Review Collection</li>
            <li><span class="check">✓</span> Standard Search Ranking</li>
          </ul>
          <button class="action-btn action-btn-outline" disabled style="width: 100%;">
            ${activeBusinessPlan === 'Free Starter' ? 'Current Active Plan' : 'Free Tier'}
          </button>
        </div>

        <!-- Silver Growth -->
        <div class="sub-plan-card ${activeBusinessPlan === 'Silver Growth' ? 'featured' : ''}">
          <div class="sub-plan-header">
            <div class="sub-plan-name">Silver Growth</div>
            <div class="sub-plan-price">₹999 <span>/ month</span></div>
            <small style="color: var(--text-muted);">For expanding local workshops & clinics</small>
          </div>
          <ul class="sub-features-list">
            <li><span class="check">✓</span> Everything in Starter</li>
            <li><span class="check">✓</span> <strong>Verified Partner Checkmark</strong> (+45% trust)</li>
            <li><span class="check">✓</span> Priority Search Ranking in Locality</li>
            <li><span class="check">✓</span> Direct WhatsApp Instant Leads</li>
            <li><span class="check">✓</span> Up to 25 Rate Card Services & Gallery</li>
            <li><span class="check">✓</span> 5% Booking Commission Rate</li>
          </ul>
          <button class="action-btn ${activeBusinessPlan === 'Silver Growth' ? 'action-btn-outline' : 'action-btn-primary'}" 
            onclick="window.BusinessDashboard.upgradePlan('Silver Growth', 999)" style="width: 100%;">
            ${activeBusinessPlan === 'Silver Growth' ? '✓ Currently Subscribed' : 'Upgrade to Silver (₹999)'}
          </button>
        </div>

        <!-- Gold Pro Business -->
        <div class="sub-plan-card ${activeBusinessPlan === 'Gold Pro' ? 'featured' : ''}" style="border: 2px solid var(--primary); box-shadow: 0 8px 24px -4px var(--primary-glow);">
          <div style="position: absolute; top: -12px; right: 18px; background: var(--primary); color: #fff; font-size: 0.7rem; font-weight: 800; padding: 2px 10px; border-radius: var(--radius-full); text-transform: uppercase; letter-spacing: 0.5px;">
            MOST POPULAR
          </div>
          <div class="sub-plan-header">
            <div class="sub-plan-name">Gold Pro Business</div>
            <div class="sub-plan-price">₹2,499 <span>/ month</span></div>
            <small style="color: var(--text-muted);">Dominant local category placement</small>
          </div>
          <ul class="sub-features-list">
            <li><span class="check">✓</span> Everything in Silver</li>
            <li><span class="check">✓</span> <strong>Top 3 Guaranteed Placement</strong> in Category</li>
            <li><span class="check">✓</span> <strong>Unlimited AI Smart Quotes</strong> Auto-drafting</li>
            <li><span class="check">✓</span> <strong>0% Commission</strong> on Direct Platform Bookings</li>
            <li><span class="check">✓</span> Real-Time SMS & Push Leads to Phone</li>
            <li><span class="check">✓</span> Shield Property Damage Guarantee Eligible</li>
          </ul>
          <button class="action-btn ${activeBusinessPlan === 'Gold Pro' ? 'action-btn-outline' : 'action-btn-primary'}" 
            onclick="window.BusinessDashboard.upgradePlan('Gold Pro', 2499)" style="width: 100%;">
            ${activeBusinessPlan === 'Gold Pro' ? '✓ Currently Subscribed' : 'Upgrade to Gold Pro (₹2,499)'}
          </button>
        </div>

        <!-- Platinum Enterprise -->
        <div class="sub-plan-card ${activeBusinessPlan === 'Platinum Enterprise' ? 'featured' : ''}">
          <div class="sub-plan-header">
            <div class="sub-plan-name">Platinum Enterprise</div>
            <div class="sub-plan-price">₹4,999 <span>/ month</span></div>
            <small style="color: var(--text-muted);">Multi-branch businesses & chains</small>
          </div>
          <ul class="sub-features-list">
            <li><span class="check">✓</span> Everything in Gold</li>
            <li><span class="check">✓</span> <strong>#1 Sponsored Top Spotlight</strong> (All Localities)</li>
            <li><span class="check">✓</span> <strong>Multi-Location Support</strong> (Up to 5 Branches)</li>
            <li><span class="check">✓</span> CareAI Voice Concierge Priority Referral</li>
            <li><span class="check">✓</span> Dedicated Account Manager & Weekly ROI</li>
            <li><span class="check">✓</span> Custom B2B Wholesale Mart Storefront</li>
          </ul>
          <button class="action-btn ${activeBusinessPlan === 'Platinum Enterprise' ? 'action-btn-outline' : 'action-btn-primary'}" 
            onclick="window.BusinessDashboard.upgradePlan('Platinum Enterprise', 4999)" style="width: 100%;">
            ${activeBusinessPlan === 'Platinum Enterprise' ? '✓ Currently Subscribed' : 'Upgrade to Platinum (₹4,999)'}
          </button>
        </div>
      </div>
    `;
  }

  function upgradePlan(planName, price) {
    activeBusinessPlan = planName;
    try {
      localStorage.setItem('localcare_biz_plan', planName);
    } catch (e) {}
    renderActiveBizTab();
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(`🎉 Upgraded to ${planName} (₹${price}/mo)! Your premium benefits are active immediately.`, 'success', 6000);
    }
    if (window.LocalCare && window.LocalCare.addNotification) {
      window.LocalCare.addNotification({
        title: `Plan Upgrade: ${planName}`,
        desc: `Your subscription to ${planName} (₹${price}/mo) is now active. Enjoy priority ranking & instant leads!`,
        icon: '💎',
        actionType: 'none'
      });
    }
    if (window.SoundFX) window.SoundFX.playSuccess();
  }

  function switchTab(tabName) {
    currentBizTab = tabName;
    document.querySelectorAll('.biz-nav-item').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-biztab') === currentBizTab);
    });
    renderActiveBizTab();
  }

  return {
    init,
    openPortal,
    switchTab,
    showAddServicePrompt,
    switchAiQuotePreset,
    copyAiQuoteWhatsApp,
    broadcastAiQuoteToLeads,
    applyAiReviewReply,
    postAiReviewReply,
    toggleSurgePricing,
    broadcastPartnerAvailability,
    upgradePlan
  };
})();
