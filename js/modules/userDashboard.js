/* ==========================================================================
   Local Care - User Account & Personalized Dashboard Module
   Manages user bookings, quotes history, addresses, notifications, and profile
   ========================================================================== */

window.UserDashboard = (function () {
  'use strict';

  let currentTab = 'bookings';

  function init() {
    renderDashboardModal();
    updateHeaderProfile();
  }

  function getUser() {
    return JSON.parse(localStorage.getItem('localcare_user') || 'null') || window.INITIAL_USER;
  }

  function getBookings() {
    return JSON.parse(localStorage.getItem('localcare_bookings') || 'null') || window.INITIAL_BOOKINGS || [];
  }

  function getQuotes() {
    return JSON.parse(localStorage.getItem('localcare_quotes') || 'null') || window.INITIAL_QUOTES || [];
  }

  function updateHeaderProfile() {
    const user = getUser();
    const avatarEl = document.getElementById('userProfileBtn');
    if (avatarEl) {
      avatarEl.innerHTML = `
        <span class="user-avatar-initials">${user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
        <span class="user-name-text">${user.name.split(' ')[0]}</span>
      `;
    }

    // Dynamic Greeting in Hero
    const greetingEl = document.getElementById('heroUserGreeting');
    if (greetingEl) {
      const hour = new Date().getHours();
      let timeOfDay = 'Day';
      if (hour < 12) timeOfDay = 'Morning';
      else if (hour < 17) timeOfDay = 'Afternoon';
      else timeOfDay = 'Evening';

      greetingEl.innerHTML = `Good ${timeOfDay}, <span class="gradient-text">${user.name.split(' ')[0]}</span>`;
    }
  }

  function renderDashboardModal() {
    if (document.getElementById('userDashboardDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'userDashboardDialog';
    dialog.className = 'app-dialog user-dashboard-dialog';
    dialog.setAttribute('aria-labelledby', 'userDashTitle');
    dialog.innerHTML = `
      <div class="dialog-content-wrapper dashboard-content-wrapper">
        <div class="dialog-header">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="user-dash-avatar" id="dashAvatar">CK</div>
            <div>
              <h3 class="dialog-title" id="userDashTitle">My Account & Activity</h3>
              <small style="color: var(--text-secondary);" id="dashUserPhone">+91 98451 98765 • Bengaluru</small>
            </div>
          </div>
          <button class="dialog-close-btn" onclick="document.getElementById('userDashboardDialog').close()" aria-label="Close dashboard">✕</button>
        </div>

        <div class="dashboard-body-container">
          <!-- Sidebar Tabs -->
          <div class="dashboard-sidebar-tabs">
            <button class="dash-tab-btn active" data-tab="bookings">
              <span>📅</span> My Bookings
              <span class="dash-tab-badge" id="dashBookingsBadge">1</span>
            </button>
            <button class="dash-tab-btn" data-tab="quotes">
              <span>⚡</span> My Quotes
              <span class="dash-tab-badge" id="dashQuotesBadge">1</span>
            </button>
            <button class="dash-tab-btn" data-tab="saved">
              <span>❤️</span> Saved Listings
            </button>
            <button class="dash-tab-btn" data-tab="history">
              <span>🕒</span> Browsing History
            </button>
            <button class="dash-tab-btn" data-tab="myreviews">
              <span>⭐</span> My Reviews
            </button>
            <button class="dash-tab-btn" data-tab="addresses">
              <span>📍</span> Saved Addresses
            </button>
            <button class="dash-tab-btn" data-tab="notifications">
              <span>🔔</span> Notifications
              <span class="dash-tab-badge alert" id="dashNotifBadge">2</span>
            </button>
            <button class="dash-tab-btn" data-tab="profile">
              <span>⚙️</span> Profile Settings
            </button>
          </div>

          <!-- Main Content Area -->
          <div class="dashboard-main-panel" id="dashMainPanel">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    bindTabEvents();
  }

  function bindTabEvents() {
    document.querySelectorAll('.dash-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.dash-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.getAttribute('data-tab');
        renderActiveTabContent();
      });
    });
  }

  function openDashboard(defaultTab = 'bookings') {
    currentTab = defaultTab;
    const dialog = document.getElementById('userDashboardDialog');
    if (!dialog) return;

    // Set active tab button
    document.querySelectorAll('.dash-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === currentTab);
    });

    const user = getUser();
    document.getElementById('dashAvatar').textContent = user.name.split(' ').map(n => n[0]).join('').slice(0, 2);
    document.getElementById('dashUserPhone').textContent = `${user.phone} • ${user.city}`;

    renderActiveTabContent();
    dialog.showModal();
  }

  function renderActiveTabContent() {
    const panel = document.getElementById('dashMainPanel');
    if (!panel) return;

    if (currentTab === 'bookings') {
      renderBookingsTab(panel);
    } else if (currentTab === 'quotes') {
      renderQuotesTab(panel);
    } else if (currentTab === 'saved') {
      renderSavedTab(panel);
    } else if (currentTab === 'history') {
      renderHistoryTab(panel);
    } else if (currentTab === 'myreviews') {
      renderMyReviewsTab(panel);
    } else if (currentTab === 'addresses') {
      renderAddressesTab(panel);
    } else if (currentTab === 'notifications') {
      renderNotificationsTab(panel);
    } else if (currentTab === 'profile') {
      renderProfileTab(panel);
    }
  }

  function renderBookingsTab(panel) {
    const bookings = getBookings();
    document.getElementById('dashBookingsBadge').textContent = bookings.length;

    if (bookings.length === 0) {
      panel.innerHTML = `
        <div class="dash-empty-state">
          <div class="empty-icon">📅</div>
          <h4>No Bookings Yet</h4>
          <p>Book verified home repairs, doctor appointments, or salon therapies near you.</p>
        </div>
      `;
      return;
    }

    panel.innerHTML = `
      <div class="dash-tab-header">
        <h4>My Service Appointments (${bookings.length})</h4>
      </div>
      <div class="dash-cards-list">
        ${bookings.map(bk => `
          <div class="dash-booking-card">
            <div class="bk-card-top">
              <img src="${bk.businessImage || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=200&q=80'}" alt="${bk.businessName}" class="bk-thumb" />
              <div class="bk-info">
                <div class="bk-title-row">
                  <h4 class="bk-service-title">${bk.serviceName}</h4>
                  <span class="bk-status-pill ${bk.status === 'On The Way' ? 'active' : ''}">${bk.status}</span>
                </div>
                <div class="bk-biz-name">📍 ${bk.businessName}</div>
                <div class="bk-schedule">📅 ${bk.date} • ⏰ ${bk.timeSlot}</div>
                <div class="bk-price">Paid: <strong>₹${bk.price}</strong> • Booking ID: <small>${bk.id}</small></div>
              </div>
            </div>

            <div class="bk-card-bottom">
              ${bk.status === 'On The Way' ? `
                <div class="bk-tech-chip">
                  <span>🏍️ Technician ${bk.technician ? bk.technician.name : 'Assigned'} is on the way (OTP: <strong>${bk.otp || '5192'}</strong>)</span>
                </div>
                <button class="action-btn action-btn-primary" onclick="window.UserDashboard.trackBooking('${bk.id}')">
                  <span>📍</span> Track Live
                </button>
              ` : `
                <button class="action-btn action-btn-outline" onclick="window.LocalCare.showToast('Invoice downloaded for ${bk.id}', 'success')">
                  📄 Download Invoice
                </button>
              `}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderQuotesTab(panel) {
    const quotes = getQuotes();
    document.getElementById('dashQuotesBadge').textContent = quotes.length;

    if (quotes.length === 0) {
      panel.innerHTML = `
        <div class="dash-empty-state">
          <div class="empty-icon">⚡</div>
          <h4>No Active Quote Requests</h4>
          <p>Broadcast custom requirements to multiple pros and compare competitive prices.</p>
          <button class="action-btn action-btn-primary" onclick="window.QuoteMarketplace.openQuotesModal()">Request Quotes Now</button>
        </div>
      `;
      return;
    }

    panel.innerHTML = `
      <div class="dash-tab-header">
        <h4>My Broadcasted Quotes (${quotes.length})</h4>
        <button class="action-btn action-btn-primary" style="font-size: 0.82rem; padding: 0.35rem 0.75rem;" onclick="window.QuoteMarketplace.openQuotesModal()">
          + New Quote
        </button>
      </div>
      <div class="dash-cards-list">
        ${quotes.map(qt => `
          <div class="dash-booking-card">
            <div class="bk-info" style="width: 100%;">
              <div class="bk-title-row">
                <h4 class="bk-service-title">${qt.title}</h4>
                <span class="bk-status-pill active">${qt.status}</span>
              </div>
              <div class="bk-biz-name">📍 ${qt.locality} • ⏱️ ${qt.urgency}</div>
              <div class="bk-schedule">Budget: ${qt.budget} • Created: ${qt.createdAt}</div>
              
              <!-- Bids preview list -->
              <div style="margin-top: 0.75rem; border-top: 1px dashed var(--border-subtle); padding-top: 0.75rem;">
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-secondary); margin-bottom: 0.5rem;">Received Bids (${qt.bids ? qt.bids.length : 0}):</div>
                ${(qt.bids || []).map(b => `
                  <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-subtle); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-bottom: 0.4rem; font-size: 0.82rem;">
                    <div>
                      <strong>${b.proName}</strong> (★ ${b.rating}) • ${b.eta}
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <strong style="color: var(--primary);">₹${b.price}</strong>
                      <button class="action-btn action-btn-primary" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;" onclick="window.QuoteMarketplace.acceptBid('${b.proName}', ${b.price})">Accept</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderSavedTab(panel) {
    const savedIds = new Set(JSON.parse(localStorage.getItem('localcare_saved') || '[]'));
    const all = (typeof getAllBusinesses === 'function') ? getAllBusinesses() : (window.INITIAL_BUSINESSES || []);
    const savedBusinesses = all.filter(b => savedIds.has(b.id));

    if (savedBusinesses.length === 0) {
      panel.innerHTML = `
        <div class="dash-empty-state">
          <div class="empty-icon">❤️</div>
          <h4>No Saved Listings</h4>
          <p>Click the heart icon on any business card to save it for instant access later.</p>
        </div>
      `;
      return;
    }

    panel.innerHTML = `
      <div class="dash-tab-header">
        <h4>Saved Businesses & Providers (${savedBusinesses.length})</h4>
      </div>
      <div class="dash-cards-list">
        ${savedBusinesses.map(b => `
          <div class="dash-booking-card">
            <div class="bk-card-top">
              <img src="${b.image}" alt="${b.name}" class="bk-thumb" />
              <div class="bk-info">
                <div class="bk-title-row">
                  <h4 class="bk-service-title">${b.name}</h4>
                  <span class="rating-tag">★ ${b.rating}</span>
                </div>
                <div class="bk-biz-name">📍 ${b.locality}, ${b.city}</div>
                <div class="bk-schedule">Starts at ₹${b.startingPrice || 299} • ${b.operatingHours}</div>
              </div>
            </div>
            <div class="bk-card-bottom" style="gap: 0.5rem;">
              <button class="action-btn action-btn-primary" onclick="window.LocalCare.openBookingById('${b.id}')">Book Service</button>
              <button class="action-btn action-btn-outline" onclick="window.LocalCare.openCallModalById('${b.id}')">Call</button>
              <button class="action-btn action-btn-ghost" onclick="window.LocalCare.toggleBookmark('${b.id}'); window.UserDashboard.renderActiveTabContent();">Remove</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderAddressesTab(panel) {
    const user = getUser();
    panel.innerHTML = `
      <div class="dash-tab-header">
        <h4>Saved Delivery & Service Addresses</h4>
      </div>
      <div class="dash-cards-list">
        ${(user.savedAddresses || []).map((addr, idx) => `
          <div class="dash-booking-card" style="padding: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div>
                <span class="bid-badge">${addr.label} ${addr.default ? '(Default)' : ''}</span>
                <p style="margin-top: 0.5rem; font-size: 0.92rem; color: var(--text-primary);">${addr.address}</p>
              </div>
              <button class="action-btn action-btn-ghost" onclick="window.LocalCare.showToast('Address set as primary', 'info')">Use</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderNotificationsTab(panel) {
    const user = getUser();
    panel.innerHTML = `
      <div class="dash-tab-header">
        <h4>Notifications & Alerts</h4>
        <button class="action-btn action-btn-ghost" style="font-size: 0.8rem;" onclick="window.LocalCare.showToast('All notifications marked as read', 'info')">Mark all read</button>
      </div>
      <div class="dash-cards-list">
        ${(user.notifications || []).map(notif => `
          <div class="dash-booking-card" style="padding: 1rem; ${notif.unread ? 'border-left: 4px solid var(--primary);' : ''}">
            <div style="display: flex; justify-content: space-between;">
              <strong style="font-size: 0.95rem;">${notif.title}</strong>
              <small style="color: var(--text-muted);">${notif.time}</small>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.88rem; margin-top: 0.3rem;">${notif.message}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderHistoryTab(panel) {
    const recentSearches = JSON.parse(localStorage.getItem('localcare_recent_searches') || '[]');
    const recentlyViewed = JSON.parse(localStorage.getItem('localcare_recently_viewed') || '[]');

    panel.innerHTML = `
      <div class="dash-tab-header">
        <h4>Browsing & Search History</h4>
      </div>

      <!-- Recent Searches Subsection -->
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h5 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0;">Recent Searches</h5>
          ${recentSearches.length > 0 ? `
            <button class="action-btn action-btn-ghost" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;" onclick="localStorage.removeItem('localcare_recent_searches'); window.UserDashboard.renderActiveTabContent();">
              Clear Searches
            </button>
          ` : ''}
        </div>
        ${recentSearches.length === 0 ? `
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin: 0;">No recent searches recorded yet.</p>
        ` : `
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${recentSearches.map(s => `
              <button class="search-tag-chip" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.75rem; border-radius: var(--radius-full); background: var(--bg-subtle); border: 1px solid var(--border-subtle); font-size: 0.82rem; cursor: pointer; color: var(--text-primary);" onclick="document.getElementById('userDashboardDialog')?.close(); if (window.LocalCare && window.LocalCare.searchQuery) { window.LocalCare.searchQuery('${s.replace(/'/g, "\\'")}'); }">
                <span>🔍</span> ${s}
              </button>
            `).join('')}
          </div>
        `}
      </div>

      <!-- Recently Viewed Businesses Subsection -->
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h5 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin: 0;">Recently Viewed Businesses (${recentlyViewed.length})</h5>
          ${recentlyViewed.length > 0 ? `
            <button class="action-btn action-btn-ghost" style="font-size: 0.75rem; padding: 0.2rem 0.5rem;" onclick="localStorage.removeItem('localcare_recently_viewed'); window.UserDashboard.renderActiveTabContent();">
              Clear Viewed
            </button>
          ` : ''}
        </div>
        ${recentlyViewed.length === 0 ? `
          <div class="dash-empty-state" style="padding: 1.5rem;">
            <div class="empty-icon">🕒</div>
            <p>You haven't viewed any business profiles recently. Browse the directory to see them here.</p>
          </div>
        ` : `
          <div class="dash-cards-list">
            ${recentlyViewed.map(b => `
              <div class="dash-booking-card" style="cursor: pointer;" onclick="document.getElementById('userDashboardDialog')?.close(); if (window.LocalCare && window.LocalCare.openDetailModalById) { window.LocalCare.openDetailModalById('${b.id}'); }">
                <div class="bk-card-top">
                  <img src="${b.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80'}" alt="${b.name}" class="bk-thumb" />
                  <div class="bk-info">
                    <div class="bk-title-row">
                      <h4 class="bk-service-title">${b.name}</h4>
                      <span class="rating-tag">★ ${b.rating}</span>
                    </div>
                    <div class="bk-biz-name">📍 ${b.locality || 'Nearby'}, ${b.city || ''}</div>
                    <div class="bk-schedule">From ₹${b.startingPrice || 299} • ${b.category || 'Local Service'}</div>
                  </div>
                </div>
                <div class="bk-card-bottom" style="gap: 0.5rem;" onclick="event.stopPropagation();">
                  <button class="action-btn action-btn-primary" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;" onclick="document.getElementById('userDashboardDialog')?.close(); window.LocalCare.openDetailModalById('${b.id}');">View Profile</button>
                  <button class="action-btn action-btn-outline" style="font-size: 0.78rem; padding: 0.35rem 0.75rem;" onclick="document.getElementById('userDashboardDialog')?.close(); window.LocalCare.openBookingById('${b.id}');">Book Slot</button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  }

  function renderMyReviewsTab(panel) {
    const userReviews = JSON.parse(localStorage.getItem('localcare_user_reviews') || '[]');

    if (userReviews.length === 0) {
      panel.innerHTML = `
        <div class="dash-empty-state">
          <div class="empty-icon">⭐</div>
          <h4>No Reviews Submitted Yet</h4>
          <p>Share your genuine experience with local providers to help your neighbors discover trusted services.</p>
        </div>
      `;
      return;
    }

    panel.innerHTML = `
      <div class="dash-tab-header">
        <h4>My Customer Reviews (${userReviews.length})</h4>
      </div>
      <div class="dash-cards-list">
        ${userReviews.map((r, idx) => `
          <div class="dash-booking-card" style="padding: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
              <div>
                <strong style="font-size: 1rem; color: var(--text-primary);">${r.businessName || 'Local Business'}</strong>
                <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.2rem;">${r.date || 'Recently'} • ${r.verifiedBooking ? '✓ Verified Booking' : 'Direct Review'}</div>
              </div>
              <span class="rating-tag" style="font-size: 0.85rem;">★ ${r.rating}.0</span>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0.5rem 0;">${r.comment || ''}</p>
            ${(r.tags && r.tags.length > 0) ? `
              <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                ${r.tags.map(t => `<span class="aspect-chip active" style="font-size: 0.72rem; padding: 0.15rem 0.5rem;">${t}</span>`).join('')}
              </div>
            ` : ''}
            <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
              ${r.businessId ? `
                <button class="action-btn action-btn-outline" style="font-size: 0.78rem; padding: 0.3rem 0.6rem;" onclick="document.getElementById('userDashboardDialog')?.close(); if (window.LocalCare && window.LocalCare.openDetailModalById) { window.LocalCare.openDetailModalById('${r.businessId}'); }">
                  View Business Profile
                </button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderProfileTab(panel) {
    const user = getUser();
    panel.innerHTML = `
      <div class="dash-tab-header">
        <h4>Profile Details & Preferences</h4>
      </div>
      <form id="dashProfileForm" style="display: flex; flex-direction: column; gap: 1rem;">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" id="dashNameInput" class="form-input" value="${user.name}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input type="email" id="dashEmailInput" class="form-input" value="${user.email}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Phone Number</label>
          <input type="tel" id="dashPhoneInput" class="form-input" value="${user.phone}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Preferred City</label>
          <select id="dashCityInput" class="form-input">
            <option value="Bengaluru" ${(user.city || 'Bengaluru') === 'Bengaluru' ? 'selected' : ''}>Bengaluru</option>
            <option value="Mumbai" ${user.city === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
            <option value="Delhi NCR" ${user.city === 'Delhi NCR' ? 'selected' : ''}>Delhi NCR</option>
            <option value="Chennai" ${user.city === 'Chennai' ? 'selected' : ''}>Chennai</option>
            <option value="Hyderabad" ${user.city === 'Hyderabad' ? 'selected' : ''}>Hyderabad</option>
            <option value="Pune" ${user.city === 'Pune' ? 'selected' : ''}>Pune</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Language Preference</label>
          <select id="dashLangInput" class="form-input">
            <option value="en" ${(user.language || 'en') === 'en' ? 'selected' : ''}>English</option>
            <option value="kn" ${user.language === 'kn' ? 'selected' : ''}>ಕನ್ನಡ (Kannada)</option>
            <option value="hi" ${user.language === 'hi' ? 'selected' : ''}>हिन्दी (Hindi)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Communication Preferences</label>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; cursor: pointer;">
              <input type="checkbox" id="dashCommWhatsapp" ${user.commWhatsapp !== false ? 'checked' : ''} />
              WhatsApp Updates & OTPs
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; cursor: pointer;">
              <input type="checkbox" id="dashCommEmail" ${user.commEmail !== false ? 'checked' : ''} />
              Email Invoices & Deals
            </label>
          </div>
        </div>
        <div>
          <button type="submit" class="action-btn action-btn-primary">Save Profile Changes</button>
        </div>
      </form>
    `;

    document.getElementById('dashProfileForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      user.name = document.getElementById('dashNameInput').value.trim();
      user.email = document.getElementById('dashEmailInput').value.trim();
      user.phone = document.getElementById('dashPhoneInput').value.trim();
      user.city = document.getElementById('dashCityInput').value;
      user.language = document.getElementById('dashLangInput').value;
      user.commWhatsapp = document.getElementById('dashCommWhatsapp').checked;
      user.commEmail = document.getElementById('dashCommEmail').checked;

      localStorage.setItem('localcare_user', JSON.stringify(user));
      updateHeaderProfile();
      if (window.LocalCare && window.LocalCare.showToast) {
        window.LocalCare.showToast('Profile & preferences updated successfully!', 'success');
      }
    });
  }

  function trackBooking(bookingId) {
    const bookings = getBookings();
    const bk = bookings.find(b => b.id === bookingId);
    if (bk && window.TrackingEngine) {
      document.getElementById('userDashboardDialog')?.close();
      window.TrackingEngine.openTrackingModal(bk);
    }
  }

  return {
    init,
    openDashboard,
    trackBooking,
    renderActiveTabContent
  };
})();
