/* ==========================================================================
   Local Care - Quote Marketplace Module
   Broadcast service requests to local vendors & live bid comparison engine
   ========================================================================== */

window.QuoteMarketplace = (function () {
  'use strict';

  function init() {
    renderQuotesDialogShell();
  }

  function renderQuotesDialogShell() {
    if (document.getElementById('quotesMarketplaceDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'quotesMarketplaceDialog';
    dialog.className = 'app-dialog quotes-marketplace-dialog';
    dialog.setAttribute('aria-labelledby', 'qmTitle');
    dialog.innerHTML = `
      <div class="dialog-content-wrapper quotes-modal-wrapper">
        <div class="dialog-header">
          <div>
            <h3 class="dialog-title" id="qmTitle">⚡ Quote Marketplace</h3>
            <small style="color: var(--text-secondary);">Broadcast requirement to verified local professionals</small>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('quotesMarketplaceDialog').close()" aria-label="Close quote dialog">✕</button>
        </div>

        <div class="dialog-body quotes-modal-body" id="qmBodyContent">
          <!-- Step 1: Submit Request Form -->
          <div id="qmFormSection">
            <form id="qmRequestForm">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Service Category *</label>
                  <select id="qmCategorySelect" class="form-select" required>
                    <option value="home">Plumbing & Water Leakage</option>
                    <option value="electrical">AC Repair & Electrical Works</option>
                    <option value="cleaning">Deep Cleaning & Pest Control</option>
                    <option value="health">Doctor & Dental Consultation</option>
                    <option value="auto">Car & Bike Repair / Towing</option>
                    <option value="tech">Laptop & Smartphone Repair</option>
                    <option value="events">Weddings, Photographers & Events</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Your Locality / Area *</label>
                  <input type="text" id="qmLocalityInput" class="form-input" placeholder="e.g. Koramangala / Valachil" required />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Expected Budget</label>
                  <select id="qmBudgetSelect" class="form-select">
                    <option value="Flexible / Best Price">Flexible / Best Price</option>
                    <option value="Under ₹500">Under ₹500</option>
                    <option value="₹500 - ₹1,500">₹500 - ₹1,500</option>
                    <option value="₹1,500 - ₹5,000">₹1,500 - ₹5,000</option>
                    <option value="Above ₹5,000">Above ₹5,000</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label">Urgency *</label>
                  <select id="qmUrgencySelect" class="form-select">
                    <option value="Immediate (Next 30 mins)">Immediate (Next 30 mins)</option>
                    <option value="Today anytime" selected>Today anytime</option>
                    <option value="Tomorrow morning">Tomorrow morning</option>
                    <option value="This weekend">This weekend</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Contact Mobile Number (WhatsApp) *</label>
                <input type="tel" id="qmPhoneInput" class="form-input" placeholder="+91 98451 98765" required />
              </div>

              <div class="form-group">
                <label class="form-label">Describe Your Requirement / Problem</label>
                <textarea id="qmDescInput" class="form-textarea" rows="3" placeholder="e.g. Bathroom sink pipe leaking heavily, need replacement of connector pipe and tap washer..." required></textarea>
              </div>

              <div class="privacy-callout-box">
                🔒 <strong>Spam Protection Guarantee:</strong> Your contact number is shared with a maximum of 3 top-rated, police-verified pros. Zero spam calls.
              </div>

              <div class="dialog-footer" style="padding: 1rem 0 0 0;">
                <button type="button" class="action-btn action-btn-ghost" onclick="document.getElementById('quotesMarketplaceDialog').close()">Cancel</button>
                <button type="submit" class="action-btn action-btn-primary" id="qmSubmitBtn">
                  <span>⚡</span> Broadcast Request & Get Quotes
                </button>
              </div>
            </form>
          </div>

          <!-- Step 2: Live Broadcasting Radar Animation -->
          <div id="qmBroadcastingSection" style="display: none; text-align: center; padding: 2.5rem 1rem;">
            <div class="broadcasting-radar-circle">
              <span class="radar-ping-ring"></span>
              <span class="radar-ping-ring delay"></span>
              <span class="radar-center-icon">📡</span>
            </div>
            <h4 style="font-size: 1.25rem; font-weight: 700; margin: 1.5rem 0 0.5rem 0;">Broadcasting to Verified Pros...</h4>
            <p style="color: var(--text-secondary); font-size: 0.92rem; max-width: 420px; margin: 0 auto;" id="qmBroadcastStatusText">
              Contacting top professionals nearby. Gathering transparent estimates...
            </p>
          </div>

          <!-- Step 3: Live Incoming Bids & Comparison View -->
          <div id="qmBidsSection" style="display: none;">
            <div class="bids-success-header">
              <div class="bids-badge-success">⚡ REQUEST BROADCASTED</div>
              <h4 style="font-size: 1.2rem; font-weight: 800; margin: 0.35rem 0 0.2rem 0;" id="qmBidsCountTitle">3 Professionals Responded</h4>
              <p style="color: var(--text-secondary); font-size: 0.85rem;" id="qmBidsSubText">Compare competitive quotes, ratings, and arrival times below:</p>
            </div>

            <!-- Bids List -->
            <div class="bids-cards-container" id="qmBidsList"></div>

            <div class="dialog-footer" style="padding: 1.25rem 0 0 0; justify-content: space-between;">
              <button type="button" class="action-btn action-btn-outline" onclick="window.QuoteMarketplace.resetForm()">
                Submit Another Request
              </button>
              <button type="button" class="action-btn action-btn-primary" onclick="document.getElementById('quotesMarketplaceDialog').close()">
                Done / View in Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    bindEvents();
  }

  function bindEvents() {
    const form = document.getElementById('qmRequestForm');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const cat = document.getElementById('qmCategorySelect').value;
      const locality = document.getElementById('qmLocalityInput').value.trim();
      const budget = document.getElementById('qmBudgetSelect').value;
      const urgency = document.getElementById('qmUrgencySelect').value;
      const phone = document.getElementById('qmPhoneInput').value.trim();
      const desc = document.getElementById('qmDescInput').value.trim();

      if (!locality || !phone || !desc) {
        if (window.LocalCare && window.LocalCare.showToast) {
          window.LocalCare.showToast('Please provide locality, contact number, and description', 'warning');
        }
        return;
      }

      // Show radar broadcasting
      document.getElementById('qmFormSection').style.display = 'none';
      document.getElementById('qmBroadcastingSection').style.display = 'block';
      document.getElementById('qmBroadcastStatusText').textContent = `Pinging 18 verified experts in ${locality}...`;

      setTimeout(() => {
        document.getElementById('qmBroadcastingSection').style.display = 'none';
        showIncomingBids(cat, locality, budget, urgency, desc);
      }, 1500);
    });
  }

  function showIncomingBids(category, locality, budget, urgency, desc) {
    const bidsSection = document.getElementById('qmBidsSection');
    const bidsList = document.getElementById('qmBidsList');
    if (!bidsSection || !bidsList) return;

    // Generate 3 contextual realistic bids
    const sampleBids = [
      {
        id: 'bid-1',
        proName: 'Ravi Multi-Tech Solutions',
        rating: 4.9,
        reviewsCount: 210,
        price: 450,
        eta: 'Arrives in 25 min',
        phone: '+91 98450 11990',
        badge: '⚡ Fastest Arrival',
        warranty: '30-Day Service Warranty',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'bid-2',
        proName: 'QuickFix Professional Care',
        rating: 4.7,
        reviewsCount: 140,
        price: 399,
        eta: 'Arrives in 40 min',
        phone: '+91 98450 22881',
        badge: '💰 Best Price',
        warranty: 'Original Spares Used',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'bid-3',
        proName: 'City Master Technicians',
        rating: 4.8,
        reviewsCount: 320,
        price: 500,
        eta: 'Available at 5:00 PM',
        phone: '+91 98450 33772',
        badge: '🏆 Highest Rated',
        warranty: 'Police Verified Staff',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
      }
    ];

    bidsList.innerHTML = sampleBids.map(bid => `
      <div class="bid-card-item">
        <div class="bid-card-left">
          <img src="${bid.avatar}" alt="${bid.proName}" class="bid-pro-avatar" />
          <div class="bid-pro-info">
            <div class="bid-pro-header">
              <h4 class="bid-pro-name">${bid.proName}</h4>
              <span class="bid-badge">${bid.badge}</span>
            </div>
            <div class="bid-pro-meta">
              <span class="rating-tag">★ ${bid.rating} (${bid.reviewsCount})</span>
              <span>⏱️ ${bid.eta}</span>
              <span class="bid-warranty">✓ ${bid.warranty}</span>
            </div>
          </div>
        </div>

        <div class="bid-card-right">
          <div class="bid-price-tag">₹${bid.price}</div>
          <div class="bid-actions-row">
            <button class="action-btn action-btn-primary btn-accept-bid" onclick="window.QuoteMarketplace.acceptBid('${bid.proName}', ${bid.price})">
              Accept & Book
            </button>
            <a href="tel:${bid.phone.replace(/\s+/g, '')}" class="action-btn action-btn-outline" title="Call Provider">
              📞 Call
            </a>
            <a href="https://wa.me/${bid.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(bid.proName)},%20saw%20your%20quote%20on%20LocalCare." target="_blank" class="action-btn action-btn-outline" title="WhatsApp Chat">
              💬 Chat
            </a>
          </div>
        </div>
      </div>
    `).join('');

    // Save to quotes store
    const quoteRecord = {
      id: 'LC-QT-' + Math.floor(1000 + Math.random() * 9000),
      category: category,
      title: desc.slice(0, 40) + '...',
      locality: locality,
      urgency: urgency,
      budget: budget,
      status: '3 Bids Received',
      createdAt: 'Just now',
      bids: sampleBids
    };

    const existingQuotes = JSON.parse(localStorage.getItem('localcare_quotes') || 'null') || window.INITIAL_QUOTES || [];
    existingQuotes.unshift(quoteRecord);
    localStorage.setItem('localcare_quotes', JSON.stringify(existingQuotes));

    bidsSection.style.display = 'block';
  }

  function acceptBid(proName, price) {
    document.getElementById('quotesMarketplaceDialog').close();

    const bookingId = 'LC-BK-' + Math.floor(1000 + Math.random() * 9000);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking = {
      id: bookingId,
      businessId: 'b-103',
      businessName: proName,
      businessImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80',
      serviceName: 'Quote Service Contract',
      price: price,
      date: 'Today',
      timeSlot: 'Within 30 mins (Fastest)',
      address: 'Current Customer Address',
      status: 'On The Way',
      otp: otp,
      technician: {
        name: proName,
        phone: '+91 98450 11990',
        rating: 4.9,
        vehicle: 'Verified Service Van',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
        etaMinutes: 15
      }
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('localcare_bookings') || 'null') || window.INITIAL_BOOKINGS || [];
    existing.unshift(newBooking);
    localStorage.setItem('localcare_bookings', JSON.stringify(existing));

    // Post to backend API
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessId: 'b-103',
        customerName: 'Chethan B K',
        customerPhone: '+91 98451 98765',
        customerAddress: 'Current Locality',
        price: price,
        serviceName: `Quote Accepted: ${proName}`
      })
    }).catch(e => console.log('Offline/Local mode booking saved'));

    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(`🎉 Accepted bid from ${proName} (₹${price})! Booking ${bookingId} confirmed.`, 'success', 6000);
    }

    if (window.LocalCare && window.LocalCare.addNotification) {
      window.LocalCare.addNotification({
        title: `Quote Accepted: ${proName}`,
        desc: `Bid of ₹${price} accepted! Booking #${bookingId} confirmed with 30m doorstep arrival.`,
        icon: '⚡',
        actionType: 'dashboard-bookings'
      });
    }

    // Launch live tracking modal
    setTimeout(() => {
      if (window.TrackingEngine && window.TrackingEngine.openTrackingModal) {
        window.TrackingEngine.openTrackingModal(newBooking);
      }
    }, 700);
  }

  function resetForm() {
    document.getElementById('qmBidsSection').style.display = 'none';
    document.getElementById('qmBroadcastingSection').style.display = 'none';
    document.getElementById('qmFormSection').style.display = 'block';
    document.getElementById('qmRequestForm')?.reset();
  }

  function openQuotesModal(prefillCategory = null) {
    const dialog = document.getElementById('quotesMarketplaceDialog');
    if (!dialog) return;

    resetForm();
    if (prefillCategory) {
      const select = document.getElementById('qmCategorySelect');
      if (select) select.value = prefillCategory;
    }

    dialog.showModal();
  }

  return {
    init,
    openQuotesModal,
    acceptBid,
    resetForm
  };
})();
