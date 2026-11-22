/* ==============================================================================
   Local Care - Live Reverse-Bidding & Pro Auction Arena ("Quote Arena")
   Real-time multi-vendor competitive bidding war with dynamic price undercutting,
   countdown timers, audio feedback, counter-offers, and 1-click slot locking.
   ============================================================================== */

window.QuoteArena = (function () {
  'use strict';

  let currentTimer = null;
  let timerSeconds = 60;
  let activeBids = [];
  let isAuctionActive = false;
  let broadcastCategory = 'home';
  let broadcastLocality = 'Koramangala, Bengaluru';
  let initialBudget = 500;

  function init() {
    renderArenaDialogShell();
  }

  function renderArenaDialogShell() {
    if (document.getElementById('quoteArenaDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'quoteArenaDialog';
    dialog.className = 'app-dialog quote-arena-dialog';
    dialog.setAttribute('aria-labelledby', 'arenaTitle');
    dialog.style.maxWidth = '840px';
    dialog.style.width = '95vw';
    dialog.innerHTML = `
      <div class="dialog-content-wrapper arena-modal-wrapper">
        <div class="dialog-header arena-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="arena-live-icon-box">
              <span class="arena-flame-icon">🔥</span>
              <span class="arena-pulse-ring"></span>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <h3 class="dialog-title" id="arenaTitle">Live Reverse-Bidding Arena</h3>
                <span class="arena-live-tag"><span class="live-dot-pulse"></span> LIVE AUCTION</span>
              </div>
              <small style="color: var(--text-secondary);" id="arenaSubtitle">
                Verified pros compete in real-time to offer you the best price & fastest arrival
              </small>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="window.QuoteArena.closeArena()" aria-label="Close arena">✕</button>
        </div>

        <div class="dialog-body arena-body">
          <!-- Step A: Fast Launch Setup (If not already started) -->
          <div id="arenaLaunchSection" style="display: block;">
            <div class="arena-welcome-card">
              <div class="arena-welcome-text">
                <h4>🎯 Start a 60-Second Pro Bidding Battle</h4>
                <p>Broadcast your exact service request. Watch nearby certified pros drop their prices live on screen to win your booking.</p>
              </div>
              <div class="arena-stats-mini-strip">
                <div><span>⚡</span> Avg 35% Savings</div>
                <div><span>⏱️</span> Sub-15 Min Response</div>
                <div><span>🛡️</span> ₹10k Shield Protected</div>
              </div>
            </div>

            <form id="arenaStartForm" onsubmit="window.QuoteArena.startLiveAuction(event)">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Service Needed *</label>
                  <select id="arenaServiceSelect" class="form-select" required>
                    <option value="home|Plumbing & Leakage Repair">🔧 Plumbing & Concealed Leakage</option>
                    <option value="electrical|Split AC Service & Gas Refill" selected>❄️ AC Power Jet & Gas Refill</option>
                    <option value="electrical|Electrician & Short Circuit Fix">⚡ Electrician & Wiring Tripping</option>
                    <option value="cleaning|Full Home Deep Cleaning">✨ Deep Home & Bathroom Cleaning</option>
                    <option value="health|Doctor or Dental Consultation">🩺 Doctor / Dental Appointment</option>
                    <option value="auto|Car Detailing & Roadside Recovery">🚗 Car Wash / Roadside Towing</option>
                    <option value="tech|Laptop Motherboard & Screen Repair">💻 Laptop & Smartphone Repair</option>
                    <option value="packers|1BHK / 2BHK Shifting">📦 Packers & Household Movers</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Your Locality *</label>
                  <input type="text" id="arenaLocalityInput" class="form-input" placeholder="e.g. Koramangala / Indiranagar / Valachil" required />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Target Maximum Budget</label>
                  <input type="number" id="arenaBudgetInput" class="form-input" placeholder="e.g. 500" value="500" min="150" step="50" />
                </div>
                <div class="form-group">
                  <label class="form-label">Contact Phone (WhatsApp) *</label>
                  <input type="tel" id="arenaPhoneInput" class="form-input" placeholder="+91 98451 98765" value="+91 98451 98765" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Specific Details / Symptoms</label>
                <input type="text" id="arenaRequirementInput" class="form-input" placeholder="e.g. AC not cooling, fan is spinning but blowing warm air" value="AC not cooling properly, blowing room temperature air" />
              </div>

              <div class="dialog-footer" style="padding: 1.25rem 0 0 0;">
                <button type="button" class="action-btn action-btn-ghost" onclick="window.QuoteArena.closeArena()">Cancel</button>
                <button type="submit" class="action-btn action-btn-primary arena-cta-pulse">
                  <span>⚡</span> Launch Live Bidding Arena
                </button>
              </div>
            </form>
          </div>

          <!-- Step B: Live Bidding Arena View (Active Battle) -->
          <div id="arenaLiveBattleSection" style="display: none;">
            
            <!-- Top Arena Control HUD -->
            <div class="arena-hud-bar">
              <div class="arena-hud-left">
                <div class="arena-radar-small">
                  <span class="arena-radar-ping"></span>
                  <span class="arena-radar-dot"></span>
                </div>
                <div>
                  <div class="arena-hud-req-title" id="arenaHudTitle">Split AC Power Jet & Gas Refill</div>
                  <div class="arena-hud-req-meta" id="arenaHudMeta">📍 Koramangala • 8 Pros Pinging Live</div>
                </div>
              </div>

              <div class="arena-hud-right">
                <div class="arena-countdown-box">
                  <span class="countdown-label">CLOSES IN</span>
                  <span class="countdown-digits" id="arenaTimerDisplay">00:60</span>
                </div>
                <div class="arena-best-bid-pill" id="arenaLowestBidPill">
                  <span>Lowest Bid:</span>
                  <strong id="arenaLowestPriceText">₹499</strong>
                </div>
              </div>
            </div>

            <!-- Live Ticker Feed -->
            <div class="arena-live-ticker" id="arenaLiveTicker">
              <span class="ticker-badge">⚡ LIVE FEED</span>
              <span id="arenaTickerMessage">Broadcasting encrypted requirement to 12 nearby technicians...</span>
            </div>

            <!-- Real-time Bids Battle Grid / Stack -->
            <div class="arena-bids-stack" id="arenaBidsContainer">
              <!-- Dynamically populated bid battle cards -->
            </div>

            <!-- Negotiation & Counter Offer Quick Strip -->
            <div class="arena-negotiation-strip">
              <div class="negotiation-left">
                <span>💡 Want an even lower price?</span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">Counter-offer to all participating pros:</span>
              </div>
              <div class="negotiation-actions">
                <button class="action-btn action-btn-ghost arena-counter-btn" onclick="window.QuoteArena.sendCounterOffer(350)">
                  Request ₹350
                </button>
                <button class="action-btn action-btn-ghost arena-counter-btn" onclick="window.QuoteArena.sendCounterOffer(300)">
                  Request ₹300
                </button>
                <button class="action-btn action-btn-outline" onclick="window.QuoteArena.requestExpressArrival()">
                  ⚡ Need in 15 Mins
                </button>
              </div>
            </div>
          </div>

          <!-- Step C: Winning Bid Confirmed Success HUD -->
          <div id="arenaConfirmedSection" style="display: none; text-align: center; padding: 2rem 1rem;">
            <div class="arena-celebrate-badge">🎉 BID LOCKED & CONFIRMED</div>
            <h3 style="font-size: 1.6rem; font-weight: 800; margin: 0.75rem 0 0.5rem 0;" id="arenaWinTitle">
              Appointment Secured!
            </h3>
            <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.5rem auto;" id="arenaWinDesc">
              Your technician has been dispatched with guaranteed pricing.
            </p>

            <div class="arena-ticket-card" id="arenaTicketCard">
              <!-- Rendered dynamically -->
            </div>

            <div style="display: flex; gap: 0.75rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
              <button class="action-btn action-btn-outline" onclick="window.QuoteArena.trackTechnician()">
                🗺️ Track GPS En-Route
              </button>
              <button class="action-btn action-btn-primary" onclick="window.QuoteArena.closeArena()">
                Done & View in My Bookings
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeArena();
      }
    });

    document.body.appendChild(dialog);
  }

  function openArena(presetCat = 'electrical', presetLoc = '') {
    renderArenaDialogShell();
    const dialog = document.getElementById('quoteArenaDialog');
    if (!dialog) return;

    const currentCity = localStorage.getItem('localcare_city') || 'Bengaluru';
    const locInput = document.getElementById('arenaLocalityInput');
    if (locInput) {
      locInput.value = presetLoc || `${currentCity} Central`;
    }

    // Reset to launch view
    document.getElementById('arenaLaunchSection').style.display = 'block';
    document.getElementById('arenaLiveBattleSection').style.display = 'none';
    document.getElementById('arenaConfirmedSection').style.display = 'none';

    if (presetCat) {
      const select = document.getElementById('arenaServiceSelect');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.startsWith(presetCat)) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }

    dialog.showModal();
    if (window.SoundFX) window.SoundFX.playBubble();
  }

  function closeArena() {
    stopAuctionTimer();
    const dialog = document.getElementById('quoteArenaDialog');
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

  function startLiveAuction(e) {
    if (e) e.preventDefault();

    const serviceVal = document.getElementById('arenaServiceSelect').value;
    const [cat, svcName] = serviceVal.split('|');
    const locality = document.getElementById('arenaLocalityInput').value.trim() || 'Koramangala, Bengaluru';
    const budget = parseInt(document.getElementById('arenaBudgetInput').value, 10) || 500;
    const phone = document.getElementById('arenaPhoneInput').value.trim();
    const reqText = document.getElementById('arenaRequirementInput').value.trim();

    broadcastCategory = cat;
    broadcastLocality = locality;
    initialBudget = budget;

    // Transition view
    document.getElementById('arenaLaunchSection').style.display = 'none';
    document.getElementById('arenaLiveBattleSection').style.display = 'block';
    document.getElementById('arenaConfirmedSection').style.display = 'none';

    document.getElementById('arenaHudTitle').textContent = svcName;
    document.getElementById('arenaHudMeta').textContent = `📍 ${locality} • Searching Verified Pros`;
    document.getElementById('arenaLowestPriceText').textContent = `₹${budget}`;

    // Play radar sound / audio chime
    if (window.SoundFX) window.SoundFX.playClick();

    // Start 60s countdown
    timerSeconds = 60;
    isAuctionActive = true;
    updateTimerDisplay();
    startAuctionTimer();

    // Reset bids container
    const container = document.getElementById('arenaBidsContainer');
    container.innerHTML = `
      <div class="arena-waiting-pros">
        <div class="arena-radar-spinner"></div>
        <div style="font-weight: 700; font-size: 1.05rem;">Radar Broadcasting to 15+ Verified Pros...</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">Nearby pros are analyzing your request. First bids incoming in seconds!</div>
      </div>
    `;

    // Simulate real-time pros entering and competing with price undercuts
    simulateBiddingWar(svcName, locality, budget);
  }

  function updateTimerDisplay() {
    const disp = document.getElementById('arenaTimerDisplay');
    if (!disp) return;
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    disp.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    if (timerSeconds <= 15) {
      disp.style.color = '#ef4444';
      disp.style.animation = 'pulse 1s infinite';
    } else {
      disp.style.color = 'var(--primary)';
      disp.style.animation = 'none';
    }
  }

  function startAuctionTimer() {
    stopAuctionTimer();
    currentTimer = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
      if (timerSeconds <= 0) {
        stopAuctionTimer();
        isAuctionActive = false;
        setTickerMessage('⏰ Bidding window concluded. Review final competitive bids below!');
      }
    }, 1000);
  }

  function stopAuctionTimer() {
    if (currentTimer) {
      clearInterval(currentTimer);
      currentTimer = null;
    }
  }

  function setTickerMessage(msg) {
    const el = document.getElementById('arenaTickerMessage');
    if (el) {
      el.textContent = msg;
      el.style.opacity = '0';
      setTimeout(() => { el.style.opacity = '1'; }, 50);
    }
  }

  function simulateBiddingWar(svcName, locality, budget) {
    activeBids = [];

    // Realistic candidate pool from actual platform data
    const PRO_CANDIDATES = [
      {
        name: 'QuickFix Pro Certified Engineering',
        rating: 4.9,
        reviews: 490,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        eta: 'Arrives in 18 min',
        basePrice: Math.round(budget * 0.95),
        badge: '⚡ Fastest Dispatch',
        perk: 'Includes 30-Day Anti-Bacterial Clean Warranty',
        note: 'Team ready with pressure pump and copper fittings.'
      },
      {
        name: 'Apex Precision Master Care',
        rating: 4.8,
        reviews: 310,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        eta: 'Arrives in 30 min',
        basePrice: Math.round(budget * 0.88),
        badge: '🏆 Top Rated Master',
        perk: 'Police Background Checked + GST Tax Invoice',
        note: '12 years experience in high-rise and villa repairs.'
      },
      {
        name: 'UrbanCare Express Solutions',
        rating: 4.7,
        reviews: 215,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        eta: 'Arrives in 22 min',
        basePrice: Math.round(budget * 0.78),
        badge: '💰 Best Deal',
        perk: 'Free General Health & Inspection Checkup included',
        note: 'Can do instant on-the-spot repair.'
      },
      {
        name: 'Royal Master Technicians Hub',
        rating: 4.9,
        reviews: 640,
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
        eta: 'Arrives in 15 min',
        basePrice: Math.round(budget * 0.72),
        badge: '🔥 Flash Cut',
        perk: 'LocalCare ₹10,000 Quality Shield Guarantee',
        note: 'Special arena discount applied to win your booking!'
      }
    ];

    // Sequence of bids popping in
    const timeline = [
      { delay: 1800, proIdx: 0, price: PRO_CANDIDATES[0].basePrice },
      { delay: 4200, proIdx: 1, price: PRO_CANDIDATES[1].basePrice },
      { delay: 7800, proIdx: 2, price: PRO_CANDIDATES[2].basePrice },
      { delay: 11500, proIdx: 3, price: PRO_CANDIDATES[3].basePrice }
    ];

    timeline.forEach(step => {
      setTimeout(() => {
        if (!isAuctionActive) return;
        const candidate = PRO_CANDIDATES[step.proIdx];
        addOrUpdateBid({
          id: `arena-bid-${step.proIdx + 1}`,
          proName: candidate.name,
          rating: candidate.rating,
          reviews: candidate.reviews,
          avatar: candidate.avatar,
          eta: candidate.eta,
          price: step.price,
          badge: candidate.badge,
          perk: candidate.perk,
          note: candidate.note,
          isLowest: false
        });
      }, step.delay);
    });
  }

  function addOrUpdateBid(newBid) {
    const container = document.getElementById('arenaBidsContainer');
    if (!container) return;

    // Remove waiting placeholder
    const waiting = container.querySelector('.arena-waiting-pros');
    if (waiting) waiting.remove();

    // Check if bid exists
    const idx = activeBids.findIndex(b => b.id === newBid.id);
    if (idx >= 0) {
      activeBids[idx] = newBid;
    } else {
      activeBids.push(newBid);
    }

    // Sort active bids by price ascending
    activeBids.sort((a, b) => a.price - b.price);

    // Lowest bid highlight
    activeBids.forEach((b, i) => { b.isLowest = (i === 0); });

    const lowestPrice = activeBids[0].price;
    document.getElementById('arenaLowestPriceText').textContent = `₹${lowestPrice}`;

    setTickerMessage(`⚡ ${newBid.proName} placed a bid of ₹${newBid.price} (${newBid.eta})`);

    // Audio Cue
    if (window.SoundFX) {
      window.SoundFX.playSuccess();
    }

    renderBidsList();
  }

  function renderBidsList() {
    const container = document.getElementById('arenaBidsContainer');
    if (!container) return;

    container.innerHTML = activeBids.map(bid => `
      <div class="arena-bid-card ${bid.isLowest ? 'arena-bid-lowest' : ''}">
        ${bid.isLowest ? '<div class="arena-lowest-ribbon">⭐ LEADING BID • LOWEST PRICE</div>' : ''}
        
        <div class="arena-bid-main">
          <img src="${bid.avatar}" alt="${bid.proName}" class="arena-pro-img" />
          
          <div class="arena-bid-details">
            <div class="arena-pro-title-row">
              <h4 class="arena-pro-name">${bid.proName}</h4>
              <span class="arena-bid-badge-pill">${bid.badge}</span>
            </div>

            <div class="arena-pro-sub-meta">
              <span class="arena-rating">★ ${bid.rating} (${bid.reviews})</span>
              <span>⏱️ ${bid.eta}</span>
              <span class="arena-verified-shield">✓ Police & GST Audited</span>
            </div>

            <div class="arena-pro-perk">
              <span>🎁</span> ${bid.perk}
            </div>

            <div class="arena-pro-chat-bubble">
              💬 <em>"${bid.note}"</em>
            </div>
          </div>

          <div class="arena-bid-action-col">
            <div class="arena-price-block">
              <div class="arena-price-label">Live Quoted Rate</div>
              <div class="arena-price-val">₹${bid.price}</div>
              <div class="arena-savings-text">Save ₹${Math.max(0, initialBudget - bid.price)}</div>
            </div>

            <button class="action-btn action-btn-primary arena-accept-btn" onclick="window.QuoteArena.acceptBid('${bid.id}')">
              <span>🔒 Lock & Confirm</span>
            </button>
            <button class="action-btn action-btn-ghost" style="font-size: 0.78rem;" onclick="window.QuoteArena.pingPro('${bid.proName}')">
              💬 Message Pro
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function sendCounterOffer(targetPrice) {
    if (!isAuctionActive || activeBids.length === 0) return;

    setTickerMessage(`📢 You requested counter-offer of ₹${targetPrice}. Waiting for pro response...`);
    if (window.SoundFX) window.SoundFX.playClick();

    setTimeout(() => {
      // One pro aggressively accepts counter offer
      const bestPro = activeBids[0];
      bestPro.price = targetPrice;
      bestPro.badge = '⚡ COUNTER ACCEPTED!';
      bestPro.note = `I will accept ₹${targetPrice} for immediate confirmation!`;
      addOrUpdateBid(bestPro);
      if (window.LocalCare) {
        window.LocalCare.showToast(`🔥 ${bestPro.proName} ACCEPTED your ₹${targetPrice} counter-offer!`, 'success');
      }
    }, 1800);
  }

  function requestExpressArrival() {
    setTickerMessage('🚨 Express 15-Min arrival requested! Pros adjusting routes...');
    if (window.SoundFX) window.SoundFX.playClick();

    setTimeout(() => {
      if (activeBids.length > 0) {
        activeBids[0].eta = 'Arrives in 12 min (Express Route)';
        activeBids[0].badge = '🚀 PRIORITY DISPATCH';
        renderBidsList();
      }
    }, 1200);
  }

  function pingPro(proName) {
    if (window.LocalCare) {
      window.LocalCare.showToast(`Connected encrypted channel with ${proName}`, 'info');
    }
  }

  function acceptBid(bidId) {
    const bid = activeBids.find(b => b.id === bidId) || activeBids[0];
    if (!bid) return;

    stopAuctionTimer();
    isAuctionActive = false;

    // Generate confirmed booking
    const bookingOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const bookingId = 'LC-BK-' + Math.floor(100000 + Math.random() * 900000);

    const bookingRecord = {
      id: bookingId,
      businessName: bid.proName,
      businessImage: bid.avatar,
      serviceName: document.getElementById('arenaHudTitle').textContent,
      price: bid.price,
      date: 'Today',
      timeSlot: 'Within 30 mins',
      address: broadcastLocality,
      status: 'Technician Assigned',
      otp: bookingOtp,
      technician: {
        name: bid.proName.split(' ')[0] + ' (Master Tech)',
        phone: '+91 98450 88210',
        rating: bid.rating,
        vehicle: 'KA-04-MB-4819',
        photo: bid.avatar,
        etaMinutes: parseInt(bid.eta.replace(/\D/g, ''), 10) || 15
      }
    };

    // Save to user storage
    try {
      const stored = JSON.parse(localStorage.getItem('localcare_user_bookings') || '[]');
      stored.unshift(bookingRecord);
      localStorage.setItem('localcare_user_bookings', JSON.stringify(stored));
    } catch (e) {}

    // Play celebration sound & display confirmed HUD
    if (window.SoundFX) window.SoundFX.playSuccess();

    document.getElementById('arenaLiveBattleSection').style.display = 'none';
    const confSection = document.getElementById('arenaConfirmedSection');
    confSection.style.display = 'block';

    document.getElementById('arenaWinTitle').textContent = `Confirmed with ${bid.proName}!`;
    document.getElementById('arenaWinDesc').textContent = `Locked at guaranteed ₹${bid.price} with ${bid.perk}. Technician is mobilizing right now.`;

    document.getElementById('arenaTicketCard').innerHTML = `
      <div class="arena-success-ticket">
        <div class="ticket-header-strip">
          <span>BOOKING ID: <strong>${bookingId}</strong></span>
          <span class="ticket-otp-badge">DIGITAL OTP: <strong>${bookingOtp}</strong></span>
        </div>
        <div class="ticket-body">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <img src="${bid.avatar}" alt="${bid.proName}" style="width: 54px; height: 54px; border-radius: var(--radius-full); object-fit: cover;" />
            <div style="text-align: left;">
              <h4 style="font-size: 1.1rem; margin-bottom: 0.2rem;">${bid.proName}</h4>
              <div style="font-size: 0.85rem; color: var(--text-secondary);">★ ${bid.rating} • ${bid.eta} • ₹${bid.price} Total</div>
            </div>
          </div>
          <div style="background: var(--bg-surface); padding: 0.75rem; border-radius: var(--radius-md); font-size: 0.85rem; text-align: left; border: 1px solid var(--border-subtle);">
            🛡️ <strong>Safety Guarantee:</strong> Provide OTP <strong>${bookingOtp}</strong> to technician upon arrival at your doorstep in ${broadcastLocality}.
          </div>
        </div>
      </div>
    `;

    // Also trigger platform toast
    if (window.LocalCare) {
      window.LocalCare.showToast(`🎉 Bid Locked! ${bid.proName} arriving in ~${bid.eta}`, 'success');
      window.LocalCare.updatePulseTicker(`🔥 Chethan B K just locked bid with ${bid.proName} (₹${bid.price})`);
    }
  }

  function trackTechnician() {
    closeArena();
    if (window.TrackingEngine && window.TrackingEngine.openTrackingModal) {
      window.TrackingEngine.openTrackingModal();
    } else if (window.UserDashboard) {
      window.UserDashboard.openDashboard('bookings');
    }
  }

  return {
    init,
    openArena,
    closeArena,
    startLiveAuction,
    sendCounterOffer,
    requestExpressArrival,
    pingPro,
    acceptBid,
    trackTechnician
  };
})();

// Auto-initialize when DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.QuoteArena.init);
  } else {
    window.QuoteArena.init();
  }
}
