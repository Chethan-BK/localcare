/* ==========================================================================
   Local Care - Booking Engine Module
   End-to-end multi-step appointment & doorstep service booking flow
   Supports slot selection, pro assignment, Indian payment simulation (UPI/Cards),
   and booking confirmation with real-time tracking handoff
   ========================================================================== */

window.BookingEngine = (function () {
  'use strict';

  let currentBusiness = null;
  let bookingState = {
    step: 1,
    selectedService: null,
    selectedDate: 'Today',
    selectedSlot: '2:00 PM - 3:00 PM',
    proOption: 'auto', // 'auto' or 'senior'
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    notes: '',
    paymentMethod: 'upi',
    price: 0
  };

  function init() {
    renderBookingModalShell();
  }

  function renderBookingModalShell() {
    if (document.getElementById('bookingDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'bookingDialog';
    dialog.className = 'app-dialog booking-dialog';
    dialog.setAttribute('aria-labelledby', 'bookingDialogTitle');
    dialog.innerHTML = `
      <div class="dialog-content-wrapper booking-modal-wrapper">
        <!-- Header -->
        <div class="dialog-header">
          <div>
            <h3 class="dialog-title" id="bookingDialogTitle">Book Verified Service</h3>
            <div class="booking-biz-sub" id="bookingBizSub"></div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('bookingDialog').close()" aria-label="Close booking modal">✕</button>
        </div>

        <!-- Stepper Indicator Bar -->
        <div class="booking-stepper-bar">
          <div class="booking-step active" id="bStep1">
            <span class="step-num">1</span>
            <span class="step-text">Service</span>
          </div>
          <div class="booking-step-line"></div>
          <div class="booking-step" id="bStep2">
            <span class="step-num">2</span>
            <span class="step-text">Schedule</span>
          </div>
          <div class="booking-step-line"></div>
          <div class="booking-step" id="bStep3">
            <span class="step-num">3</span>
            <span class="step-text">Details</span>
          </div>
          <div class="booking-step-line"></div>
          <div class="booking-step" id="bStep4">
            <span class="step-num">4</span>
            <span class="step-text">Payment</span>
          </div>
        </div>

        <!-- Body Form Container -->
        <div class="dialog-body booking-modal-body" id="bookingBodyContent">
          <!-- Step 1: Select Service -->
          <div class="booking-step-panel" id="bPanel1">
            <h4 class="step-heading">Select Service Package</h4>
            <div class="services-radio-list" id="bServicesList"></div>
          </div>

          <!-- Step 2: Date & Slot -->
          <div class="booking-step-panel" id="bPanel2" style="display: none;">
            <h4 class="step-heading">Select Date & Time Window</h4>
            
            <div class="booking-date-selector" id="bDateSelector">
              <button type="button" class="date-chip active" data-date="Today">
                <span class="chip-day">Today</span>
                <span class="chip-label">Available Now</span>
              </button>
              <button type="button" class="date-chip" data-date="Tomorrow">
                <span class="chip-day">Tomorrow</span>
                <span class="chip-label">All Slots</span>
              </button>
              <button type="button" class="date-chip" data-date="Day After">
                <span class="chip-day">Day After</span>
                <span class="chip-label">Weekend</span>
              </button>
            </div>

            <label class="form-label" style="margin-top: 1.25rem;">Available Time Slots</label>
            <div class="time-slots-grid" id="bSlotsGrid">
              <button type="button" class="slot-pill" data-slot="9:00 AM - 10:00 AM">9:00 AM</button>
              <button type="button" class="slot-pill" data-slot="11:00 AM - 12:00 PM">11:00 AM</button>
              <button type="button" class="slot-pill active" data-slot="2:00 PM - 3:00 PM">2:00 PM (Fastest)</button>
              <button type="button" class="slot-pill" data-slot="4:30 PM - 5:30 PM">4:30 PM</button>
              <button type="button" class="slot-pill" data-slot="6:30 PM - 7:30 PM">6:30 PM</button>
            </div>

            <div class="pro-assign-card">
              <div class="pro-assign-header">
                <span>🛡️ LocalCare Verified Professional Guarantee</span>
              </div>
              <p class="pro-assign-desc">Background verified technician assigned with temperature check & safety kit.</p>
            </div>
          </div>

          <!-- Step 3: Address & Notes -->
          <div class="booking-step-panel" id="bPanel3" style="display: none;">
            <h4 class="step-heading">Service Address & Contact</h4>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="bCustName" class="form-input" placeholder="e.g. Chethan B K" required />
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number *</label>
                <input type="tel" id="bCustPhone" class="form-input" placeholder="+91 98451 98765" required />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Service Doorstep Address *</label>
              <textarea id="bCustAddress" class="form-textarea" rows="2" placeholder="House/Flat number, building name, landmark, locality..." required></textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Special Problem Instructions / Notes (Optional)</label>
              <input type="text" id="bCustNotes" class="form-input" placeholder="e.g. Please bring extra copper tube, 3rd floor" />
            </div>
          </div>

          <!-- Step 4: Payment Simulation -->
          <div class="booking-step-panel" id="bPanel4" style="display: none;">
            <h4 class="step-heading">Payment & Confirmation</h4>

            <div class="price-breakdown-card">
              <div class="breakdown-row">
                <span id="bBillServiceName">Service Package</span>
                <span id="bBillServicePrice">₹0</span>
              </div>
              <div class="breakdown-row">
                <span>Taxes & Platform Guarantee</span>
                <span class="text-success">FREE</span>
              </div>
              <div class="breakdown-row total-row">
                <strong>Total Payable</strong>
                <strong class="total-amount" id="bBillTotal">₹0</strong>
              </div>
            </div>

            <label class="form-label" style="margin-top: 1rem;">Select Payment Method</label>
            <div class="payment-methods-grid">
              <label class="payment-radio-card active">
                <input type="radio" name="bPayMethod" value="upi" checked />
                <div class="pay-info">
                  <div class="pay-title">⚡ Instant UPI (GPay / PhonePe / Paytm / QR)</div>
                  <div class="pay-desc">Pay directly via any UPI app with 100% Buyer Protection</div>
                </div>
              </label>

              <label class="payment-radio-card">
                <input type="radio" name="bPayMethod" value="card" />
                <div class="pay-info">
                  <div class="pay-title">💳 Credit / Debit Card / NetBanking</div>
                  <div class="pay-desc">Visa, MasterCard, RuPay, ICICI, HDFC, SBI</div>
                </div>
              </label>

              <label class="payment-radio-card">
                <input type="radio" name="bPayMethod" value="cash" />
                <div class="pay-info">
                  <div class="pay-title">💵 Pay After Service Completion</div>
                  <div class="pay-desc">Pay by Cash or UPI directly to technician once satisfied</div>
                </div>
              </label>
            </div>

            <div class="policy-note">
              🛡️ <strong>Zero Cancellation Fee:</strong> Free cancellation up to 1 hour before scheduled time.
            </div>
          </div>

          <!-- Step 5: Booking Confirmed Screen -->
          <div class="booking-step-panel" id="bPanelSuccess" style="display: none; text-align: center; padding: 1.5rem 0;">
            <div class="success-animation-icon">🎉</div>
            <h3 class="success-title">Booking Confirmed!</h3>
            <div class="success-id-pill" id="bSuccessId">Booking ID: LC-BK-9999</div>

            <div class="confirmed-summary-box" id="bSuccessSummary">
              <!-- Rendered dynamically -->
            </div>

            <div class="otp-verification-card">
              <div class="otp-label">SERVICE START OTP</div>
              <div class="otp-number" id="bSuccessOtp">4821</div>
              <div class="otp-hint">Share this OTP with the technician only when service begins</div>
            </div>

            <div class="success-actions-row">
              <button type="button" class="action-btn action-btn-primary btn-track-live" id="bTrackLiveBtn">
                <span>📍</span> Track Service Live Now
              </button>
              <button type="button" class="action-btn action-btn-outline" onclick="document.getElementById('bookingDialog').close()">
                Done
              </button>
            </div>
          </div>
        </div>

        <!-- Footer Navigation Buttons -->
        <div class="dialog-footer booking-modal-footer" id="bFooterNav">
          <button type="button" class="action-btn action-btn-outline" id="bPrevBtn" style="display: none;">⬅ Back</button>
          <div style="margin-left: auto; display: flex; align-items: center; gap: 1rem;">
            <span class="booking-footer-price" id="bFooterPrice">₹0</span>
            <button type="button" class="action-btn action-btn-primary" id="bNextBtn">Next: Schedule ➔</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    bindModalEvents();
  }

  function bindModalEvents() {
    const nextBtn = document.getElementById('bNextBtn');
    const prevBtn = document.getElementById('bPrevBtn');

    nextBtn?.addEventListener('click', handleNextStep);
    prevBtn?.addEventListener('click', handlePrevStep);

    // Slot pill clicks
    document.getElementById('bSlotsGrid')?.addEventListener('click', (e) => {
      const slotBtn = e.target.closest('.slot-pill');
      if (!slotBtn) return;
      document.querySelectorAll('#bSlotsGrid .slot-pill').forEach(btn => btn.classList.remove('active'));
      slotBtn.classList.add('active');
      bookingState.selectedSlot = slotBtn.getAttribute('data-slot');
    });

    // Date chip clicks
    document.getElementById('bDateSelector')?.addEventListener('click', (e) => {
      const chip = e.target.closest('.date-chip');
      if (!chip) return;
      document.querySelectorAll('#bDateSelector .date-chip').forEach(btn => btn.classList.remove('active'));
      chip.classList.add('active');
      bookingState.selectedDate = chip.getAttribute('data-date');
    });

    // Payment method selection
    document.querySelectorAll('input[name="bPayMethod"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        document.querySelectorAll('.payment-radio-card').forEach(c => c.classList.remove('active'));
        e.target.closest('.payment-radio-card')?.classList.add('active');
        bookingState.paymentMethod = e.target.value;
      });
    });
  }

  function openBookingModal(business, preSelectedServiceId = null) {
    currentBusiness = business;
    bookingState.step = 1;
    bookingState.price = business.startingPrice || 299;

    document.getElementById('bookingBizSub').innerHTML = `
      <span>📍 ${business.name}</span> • <span>⭐ ${business.rating}</span> • <span>${business.locality}</span>
    `;

    // Render services list
    const servicesListEl = document.getElementById('bServicesList');
    if (servicesListEl) {
      servicesListEl.innerHTML = business.services.map((s, idx) => {
        const isChecked = preSelectedServiceId ? (s.id === preSelectedServiceId) : (idx === 0);
        if (isChecked) {
          bookingState.selectedService = s;
          bookingState.price = s.price;
        }

        return `
          <label class="service-option-card ${isChecked ? 'active' : ''}">
            <input type="radio" name="bSelectedServiceRadio" value="${s.id || idx}" ${isChecked ? 'checked' : ''} />
            <div class="service-opt-body">
              <div class="service-opt-title">${s.name}</div>
              <div class="service-opt-duration">⏱️ ${s.duration || '45 mins'} • 100% Satisfaction Guarantee</div>
            </div>
            <div class="service-opt-price">₹${s.price}</div>
          </label>
        `;
      }).join('');

      servicesListEl.querySelectorAll('input[name="bSelectedServiceRadio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          document.querySelectorAll('.service-option-card').forEach(c => c.classList.remove('active'));
          e.target.closest('.service-option-card')?.classList.add('active');
          const found = business.services.find((s, i) => (s.id || i).toString() === e.target.value);
          if (found) {
            bookingState.selectedService = found;
            bookingState.price = found.price;
            updatePriceDisplays();
          }
        });
      });
    }

    // Pre-fill user details if logged in
    const activeUser = JSON.parse(localStorage.getItem('localcare_user') || 'null') || window.INITIAL_USER;
    if (activeUser) {
      const nameInput = document.getElementById('bCustName');
      const phoneInput = document.getElementById('bCustPhone');
      const addrInput = document.getElementById('bCustAddress');
      if (nameInput) nameInput.value = activeUser.name || '';
      if (phoneInput) phoneInput.value = activeUser.phone || '';
      if (addrInput && activeUser.savedAddresses && activeUser.savedAddresses[0]) {
        addrInput.value = activeUser.savedAddresses[0].address;
      }
    }

    renderStep();
    document.getElementById('bookingDialog').showModal();
  }

  function handleNextStep() {
    if (bookingState.step === 1) {
      bookingState.step = 2;
    } else if (bookingState.step === 2) {
      bookingState.step = 3;
    } else if (bookingState.step === 3) {
      const name = document.getElementById('bCustName')?.value.trim();
      const phone = document.getElementById('bCustPhone')?.value.trim();
      const addr = document.getElementById('bCustAddress')?.value.trim();

      if (!name || !phone || !addr) {
        if (window.LocalCare && window.LocalCare.showToast) {
          window.LocalCare.showToast('Please fill in your name, contact phone, and address', 'warning');
        }
        return;
      }

      bookingState.customerName = name;
      bookingState.customerPhone = phone;
      bookingState.customerAddress = addr;
      bookingState.notes = document.getElementById('bCustNotes')?.value.trim() || '';
      bookingState.step = 4;
    } else if (bookingState.step === 4) {
      // Complete Booking Simulation
      finalizeBooking();
      return;
    }

    renderStep();
  }

  function handlePrevStep() {
    if (bookingState.step > 1) {
      bookingState.step--;
      renderStep();
    }
  }

  function renderStep() {
    const p1 = document.getElementById('bPanel1');
    const p2 = document.getElementById('bPanel2');
    const p3 = document.getElementById('bPanel3');
    const p4 = document.getElementById('bPanel4');
    const pSuccess = document.getElementById('bPanelSuccess');
    const footerNav = document.getElementById('bFooterNav');
    const prevBtn = document.getElementById('bPrevBtn');
    const nextBtn = document.getElementById('bNextBtn');

    // Hide all
    [p1, p2, p3, p4, pSuccess].forEach(p => { if (p) p.style.display = 'none'; });

    // Update Step indicators
    for (let i = 1; i <= 4; i++) {
      const stepEl = document.getElementById(`bStep${i}`);
      if (stepEl) {
        stepEl.className = `booking-step ${i === bookingState.step ? 'active' : (i < bookingState.step ? 'completed' : '')}`;
      }
    }

    if (bookingState.step === 1) {
      if (p1) p1.style.display = 'block';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.textContent = 'Next: Schedule ➔';
    } else if (bookingState.step === 2) {
      if (p2) p2.style.display = 'block';
      if (prevBtn) prevBtn.style.display = 'block';
      if (nextBtn) nextBtn.textContent = 'Next: Details ➔';
    } else if (bookingState.step === 3) {
      if (p3) p3.style.display = 'block';
      if (prevBtn) prevBtn.style.display = 'block';
      if (nextBtn) nextBtn.textContent = 'Next: Payment ➔';
    } else if (bookingState.step === 4) {
      if (p4) p4.style.display = 'block';
      if (prevBtn) prevBtn.style.display = 'block';
      if (nextBtn) nextBtn.textContent = `Pay & Confirm ₹${bookingState.price} ➔`;
      updatePriceDisplays();
    } else if (bookingState.step === 5) {
      if (pSuccess) pSuccess.style.display = 'block';
      if (footerNav) footerNav.style.display = 'none';
    }

    updatePriceDisplays();
  }

  function updatePriceDisplays() {
    const footerPrice = document.getElementById('bFooterPrice');
    const billServiceName = document.getElementById('bBillServiceName');
    const billServicePrice = document.getElementById('bBillServicePrice');
    const billTotal = document.getElementById('bBillTotal');

    if (footerPrice) footerPrice.textContent = `₹${bookingState.price}`;
    if (billServiceName && bookingState.selectedService) billServiceName.textContent = bookingState.selectedService.name;
    if (billServicePrice) billServicePrice.textContent = `₹${bookingState.price}`;
    if (billTotal) billTotal.textContent = `₹${bookingState.price}`;
  }

  function finalizeBooking() {
    const bookingId = 'LC-BK-' + Math.floor(1000 + Math.random() * 9000);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    const newBooking = {
      id: bookingId,
      businessId: currentBusiness.id,
      businessName: currentBusiness.name,
      businessImage: currentBusiness.image,
      serviceName: bookingState.selectedService ? bookingState.selectedService.name : 'Verified Service',
      price: bookingState.price,
      date: bookingState.selectedDate,
      timeSlot: bookingState.selectedSlot,
      address: bookingState.customerAddress,
      status: 'On The Way',
      otp: otp,
      technician: {
        name: 'Suresh Gowda',
        phone: currentBusiness.phone,
        rating: 4.9,
        vehicle: 'KA-01-EA-4921 (Hero Splendor)',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        etaMinutes: 14
      }
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('localcare_bookings') || 'null') || window.INITIAL_BOOKINGS || [];
    existing.unshift(newBooking);
    localStorage.setItem('localcare_bookings', JSON.stringify(existing));

    // Post to persistent backend REST API
    fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        businessId: newBooking.businessId,
        customerName: bookingState.customerName,
        customerPhone: bookingState.customerPhone,
        customerAddress: newBooking.address,
        serviceName: newBooking.serviceName,
        price: newBooking.price,
        date: newBooking.date,
        timeSlot: newBooking.timeSlot,
        notes: bookingState.notes,
        paymentMethod: bookingState.paymentMethod
      })
    }).catch(e => console.log('Offline/Local booking saved'));

    // Show success panel
    bookingState.step = 5;
    renderStep();

    document.getElementById('bSuccessId').textContent = `Booking ID: ${bookingId}`;
    document.getElementById('bSuccessOtp').textContent = otp;
    document.getElementById('bSuccessSummary').innerHTML = `
      <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 0.25rem;">${newBooking.serviceName}</div>
      <div style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 0.5rem;">Provider: ${newBooking.businessName}</div>
      <div style="display: flex; justify-content: center; gap: 1rem; font-size: 0.85rem; font-weight: 600;">
        <span>📅 ${newBooking.date}</span>
        <span>⏰ ${newBooking.timeSlot}</span>
        <span>💵 Paid ₹${newBooking.price}</span>
      </div>
    `;

    document.getElementById('bTrackLiveBtn').onclick = () => {
      document.getElementById('bookingDialog').close();
      if (window.TrackingEngine && window.TrackingEngine.openTrackingModal) {
        window.TrackingEngine.openTrackingModal(newBooking);
      }
    };

    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(`🎉 Booking confirmed! Assigned technician Suresh Gowda is on the way.`, 'success', 5000);
    }
  }

  return {
    init,
    openBookingModal
  };
})();
