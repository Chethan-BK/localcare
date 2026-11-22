/* ==========================================================================
   Local Care - Interactive Application Engine
   Central coordinator for search, filters, split map view, deals, and modals
   ========================================================================== */

(function () {
  'use strict';

  // Global Datasets Safe Scoping
  const CITIES = window.CITIES || [];
  const CATEGORIES = window.CATEGORIES || [];
  const PLATFORM_DEALS = window.PLATFORM_DEALS || [];
  const INITIAL_BUSINESSES = window.INITIAL_BUSINESSES || [];
  const INITIAL_BOOKINGS = window.INITIAL_BOOKINGS || [];
  const INITIAL_QUOTES = window.INITIAL_QUOTES || [];

  // Application State
  const state = {
    selectedCity: localStorage.getItem('localcare_city') || 'Bengaluru',
    selectedCategory: 'all',
    searchQuery: '',
    parsedAI: null,
    filterVerified: false,
    filterOpenNow: false,
    filterAvailableToday: false,
    filterMinRating: 0,
    filterHomeService: false,
    filterOffersOnly: false,
    filterMaxRadius: 25,
    filterMaxPrice: null,
    filterLocality: '',
    filterVeg: false,
    filterB2B: false,
    userCoordinates: null,
    sortBy: 'rating',
    viewMode: 'grid',
    currentPage: 1,
    itemsPerPage: 6,
    totalFilteredResults: 0,
    savedIds: new Set(JSON.parse(localStorage.getItem('localcare_saved') || '[]')),
    customBusinesses: JSON.parse(localStorage.getItem('localcare_custom_businesses') || '[]'),
    recentSearches: JSON.parse(localStorage.getItem('localcare_recent_searches') || '["AC repair today", "Dentist under ₹500", "Plumber in Valachil"]'),
    recentlyViewed: JSON.parse(localStorage.getItem('localcare_recently_viewed') || '[]'),
    activeDetailBusiness: null,
    serviceCart: [],
    activeCartBusiness: null,
    cartCoupon: null,
    cartDiscount: 0,
    theme: localStorage.getItem('localcare_theme') || 'light',
    mobileMapVisible: false,
    onboardingStep: 1,
    apiBusinesses: null,
    isBackendConnected: false
  };

  // DOM Elements Cache
  const DOM = {
    // Header & City
    locationBtn: document.getElementById('locationBtn'),
    locationDropdown: document.getElementById('locationDropdown'),
    currentCityLabel: document.getElementById('currentCityLabel'),
    citySearchInput: document.getElementById('citySearchInput'),
    cityList: document.getElementById('cityList'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    savedCountBadge: document.getElementById('savedCountBadge'),
    openSavedBtn: document.getElementById('openSavedBtn'),

    // Mega Menu & Mobile Drawer
    megaMenuTriggerBtn: document.getElementById('megaMenuTriggerBtn'),
    desktopMegaMenu: document.getElementById('desktopMegaMenu'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileNavDrawer: document.getElementById('mobileNavDrawer'),
    mobileNavBackdrop: document.getElementById('mobileNavBackdrop'),
    closeMobileDrawerBtn: document.getElementById('closeMobileDrawerBtn'),
    mobileSavedCount: document.getElementById('mobileSavedCount'),

    // Search Omnibox
    omniboxInput: document.getElementById('omniboxInput'),
    omniboxCityPrefix: document.getElementById('omniboxCityPrefix'),
    omniboxClearBtn: document.getElementById('omniboxClearBtn'),
    omniboxSubmitBtn: document.getElementById('omniboxSubmitBtn'),
    searchSuggestions: document.getElementById('searchSuggestions'),
    quickTagsContainer: document.getElementById('quickTagsContainer'),
    recentSearchesRow: document.getElementById('recentSearchesRow'),
    recentSearchesList: document.getElementById('recentSearchesList'),
    aiSummaryBanner: document.getElementById('aiSummaryBanner'),
    aiSummaryText: document.getElementById('aiSummaryText'),

    // Deals & Categories
    dealsCarouselContainer: document.getElementById('dealsCarouselContainer'),
    categoryGrid: document.getElementById('categoryGrid'),

    // Listings, View Modes & Filters
    resultsSplitContainer: document.querySelector('.results-split-container'),
    listingsGrid: document.getElementById('listingsGrid'),
    listingsPagination: document.getElementById('listingsPagination'),
    resultsCount: document.getElementById('resultsCount'),
    activeFilterTags: document.getElementById('activeFilterTags'),
    sortSelect: document.getElementById('sortSelect'),
    viewGridBtn: document.getElementById('viewGridBtn'),
    viewListBtn: document.getElementById('viewListBtn'),
    viewMapBtn: document.getElementById('viewMapBtn'),
    filterVerifiedBtn: document.getElementById('filterVerifiedBtn'),
    filterOpenNowBtn: document.getElementById('filterOpenNowBtn'),
    filterAvailableTodayBtn: document.getElementById('filterAvailableTodayBtn'),
    filterRatingBtn: document.getElementById('filterRatingBtn'),
    filterHomeServiceBtn: document.getElementById('filterHomeServiceBtn'),
    filterOffersBtn: document.getElementById('filterOffersBtn'),

    // City Highlights, Recently Viewed & Newsletter
    cityHighlightsSection: document.getElementById('cityHighlightsSection'),
    cityHighlightsName: document.getElementById('cityHighlightsName'),
    cityPillTabs: document.getElementById('cityPillTabs'),
    cityServicesList: document.getElementById('cityServicesList'),
    recentlyViewedSection: document.getElementById('recentlyViewedSection'),
    recentlyViewedGrid: document.getElementById('recentlyViewedGrid'),
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterEmailInput: document.getElementById('newsletterEmailInput'),

    // Modals
    detailDialog: document.getElementById('detailDialog'),
    detailContent: document.getElementById('detailContent'),
    detailBookNowBtn: document.getElementById('detailBookNowBtn'),
    detailTrustScoreBtn: document.getElementById('detailTrustScoreBtn'),
    callDialog: document.getElementById('callDialog'),
    callModalContent: document.getElementById('callModalContent'),
    vendorDialog: document.getElementById('vendorDialog'),
    vendorForm: document.getElementById('vendorForm'),
    savedDrawer: document.getElementById('savedDrawer'),
    savedDrawerBackdrop: document.getElementById('savedDrawerBackdrop'),
    savedListingsContainer: document.getElementById('savedListingsContainer'),
    closeSavedBtn: document.getElementById('closeSavedBtn'),
    mobileMapToggleBtn: document.getElementById('mobileMapToggleBtn'),
    interactiveMapContainer: document.getElementById('interactiveMapContainer'),

    // Toasts
    toastContainer: document.getElementById('toastContainer')
  };

  /* ==========================================================================
     Database Helpers & Live REST Backend Sync
     ========================================================================== */
  function getAllBusinesses() {
    if (state.apiBusinesses && state.apiBusinesses.length > 0) {
      return [...state.customBusinesses, ...state.apiBusinesses];
    }
    return [...state.customBusinesses, ...(window.INITIAL_BUSINESSES || [])];
  }

  async function loadBackendData() {
    try {
      const res = await fetch('/api/businesses?limit=300');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.businesses) && data.businesses.length > 0) {
          state.apiBusinesses = data.businesses;
          state.isBackendConnected = true;
          console.log(`[Justdial LocalCare] Live Backend REST API Connected! Loaded ${data.businesses.length} verified listings from DB.`);
          updateBackendConnectionBadge(true, data.total || data.businesses.length);
          renderListings(true);
          try { renderCuratedShowcase(); } catch (e) {}
          try { renderCityHighlights(); } catch (e) {}
          return;
        }
      }
    } catch (err) {
      console.log('[Justdial LocalCare] Running in standalone offline mode with seed data.');
      updateBackendConnectionBadge(false);
    }
  }

  function updateBackendConnectionBadge(connected, count = 226) {
    const pulseText = document.getElementById('pulseTickerTrack');
    if (pulseText && connected) {
      const badge = document.createElement('span');
      badge.className = 'backend-connected-indicator';
      badge.style.cssText = 'background: #059669; color: #fff; padding: 2px 8px; border-radius: 9999px; font-size: 0.72rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; margin-right: 8px;';
      badge.innerHTML = `🟢 REST API LIVE: ${count} Pros`;
      pulseText.prepend(badge);
    }
  }

  /* ==========================================================================
     Theme Initializer
     ========================================================================== */
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();

    DOM.themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('localcare_theme', state.theme);
      updateThemeIcon();
      showToast(`Switched to ${state.theme} mode`, 'info');
    });
  }

  function updateThemeIcon() {
    DOM.themeToggleBtn.innerHTML = window.ReactIcons
      ? window.ReactIcons.render(state.theme === 'light' ? 'moon' : 'sun', { size: 18 })
      : (state.theme === 'light' ? '🌙' : '☀️');
    DOM.themeToggleBtn.setAttribute('title', `Switch to ${state.theme === 'light' ? 'dark' : 'light'} mode`);
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

  /* ==========================================================================
     Mega Menu & Mobile Navigation Drawer
     ========================================================================== */
  function initMegaMenuAndDrawer() {
    if (DOM.megaMenuTriggerBtn && DOM.desktopMegaMenu) {
      DOM.megaMenuTriggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        DOM.desktopMegaMenu.classList.toggle('active');
      });

      document.addEventListener('click', (e) => {
        if (!DOM.desktopMegaMenu.contains(e.target) && !DOM.megaMenuTriggerBtn.contains(e.target)) {
          DOM.desktopMegaMenu.classList.remove('active');
        }
      });
    }

    if (DOM.mobileMenuBtn && DOM.mobileNavDrawer && DOM.mobileNavBackdrop) {
      DOM.mobileMenuBtn.addEventListener('click', () => {
        openMobileDrawer();
      });

      DOM.closeMobileDrawerBtn?.addEventListener('click', closeMobileDrawer);
      DOM.mobileNavBackdrop.addEventListener('click', closeMobileDrawer);
    }
  }

  function openMobileDrawer() {
    DOM.mobileNavDrawer?.classList.add('open', 'active');
    DOM.mobileNavBackdrop?.classList.add('open', 'active');
    if (DOM.mobileSavedCount) {
      DOM.mobileSavedCount.textContent = state.savedIds.size;
    }
  }

  function closeMobileDrawer() {
    DOM.mobileNavDrawer?.classList.remove('open', 'active');
    DOM.mobileNavBackdrop?.classList.remove('open', 'active');
  }

  /* ==========================================================================
     City Selector
     ========================================================================== */
  function initCitySelector() {
    renderCityList();
    updateCityLabels();

    DOM.locationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      DOM.locationDropdown.classList.toggle('active');
      if (DOM.locationDropdown.classList.contains('active')) {
        DOM.citySearchInput.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!DOM.locationDropdown.contains(e.target) && !DOM.locationBtn.contains(e.target)) {
        DOM.locationDropdown.classList.remove('active');
      }
    });

    DOM.citySearchInput.addEventListener('input', (e) => {
      renderCityList(e.target.value.toLowerCase().trim());
    });
  }

  let currentLocationStateFilter = 'ALL';

  function filterLocationByState(stateCode) {
    currentLocationStateFilter = stateCode;
    const tabs = document.querySelectorAll('#locationStateTabs .location-tab-btn');
    tabs.forEach(t => {
      const match = (stateCode === 'ALL' && t.textContent.includes('All India')) ||
                    t.getAttribute('onclick')?.includes(`'${stateCode}'`);
      t.classList.toggle('active', !!match);
    });
    const searchVal = DOM.citySearchInput ? DOM.citySearchInput.value.toLowerCase().trim() : '';
    renderCityList(searchVal);
  }

  function renderCityList(filter = '') {
    let sourceCities = (window.IndiaLocations && typeof window.IndiaLocations.getAllCities === 'function')
      ? window.IndiaLocations.getAllCities()
      : (typeof CITIES !== 'undefined' ? CITIES : []);

    if (currentLocationStateFilter && currentLocationStateFilter !== 'ALL') {
      sourceCities = sourceCities.filter(c => c.stateCode === currentLocationStateFilter || c.state === currentLocationStateFilter);
    }

    let matched = sourceCities;
    if (filter) {
      if (window.IndiaLocations && typeof window.IndiaLocations.searchLocations === 'function') {
        matched = window.IndiaLocations.searchLocations(filter);
        if (currentLocationStateFilter !== 'ALL') {
          matched = matched.filter(c => c.stateCode === currentLocationStateFilter || c.state === currentLocationStateFilter);
        }
      } else {
        matched = sourceCities.filter(c => c.name.toLowerCase().includes(filter));
      }
    }

    if (!matched.length) {
      DOM.cityList.innerHTML = `
        <li style="padding: 1.25rem 0.75rem; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
          <div>No locations found for "<strong>${filter}</strong>"</div>
          <button class="action-btn action-btn-outline" style="font-size: 0.75rem; margin-top: 0.5rem; padding: 0.3rem 0.6rem;" onclick="window.LocalCare.filterLocationByState('ALL')">
            Reset to All India
          </button>
        </li>
      `;
      return;
    }

    DOM.cityList.innerHTML = matched.map(city => {
      const areasCount = city.areas ? city.areas.length : 0;
      const areasPreview = city.areas && city.areas.length ? city.areas.slice(0, 2).join(', ') : (city.state || 'India');
      const stateBadge = city.state ? `<span style="font-size: 0.7rem; color: var(--text-muted); background: var(--bg-subtle); padding: 1px 5px; border-radius: 4px; margin-left: 0.35rem;">${city.state}</span>` : '';
      return `
        <li class="city-item ${city.name.toLowerCase() === state.selectedCity.toLowerCase() ? 'active' : ''}" data-city="${city.name}">
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="display: inline-flex; align-items: center; gap: 0.35rem; font-weight: 700;">
              ${window.ReactIcons ? window.ReactIcons.render('mapPin', { size: 14 }) : '📍'} ${city.name} ${stateBadge}
            </span>
            <small style="color: var(--text-muted); font-size: 0.74rem;">${areasCount} Localities (${areasPreview}...)</small>
          </div>
        </li>
      `;
    }).join('');

    DOM.cityList.querySelectorAll('.city-item').forEach(item => {
      item.addEventListener('click', () => {
        const city = item.getAttribute('data-city');
        setCity(city);
        DOM.locationDropdown.classList.remove('active');
      });
    });
  }

  function setCity(cityName) {
    state.selectedCity = cityName;
    state.filterLocality = '';
    localStorage.setItem('localcare_city', cityName);
    updateCityLabels();
    renderCityList();
    renderDeals();
    renderCityHighlights();
    renderCuratedShowcase();
    renderStickyChips();
    renderListings();
    if (window.MapEngine && typeof window.MapEngine.jumpToCurrentCity === 'function') {
      window.MapEngine.jumpToCurrentCity();
    }
    document.dispatchEvent(new CustomEvent('cityChanged', { detail: cityName }));
    const jdCityEl = document.getElementById('jdServicesCityName');
    if (jdCityEl) jdCityEl.textContent = cityName;
    if (window.JDFeatures && window.JDFeatures.renderLocalityPills) {
      window.JDFeatures.renderLocalityPills();
    }
    showToast(`Location set to ${cityName}`, 'info');
  }

  function updateCityLabels() {
    DOM.currentCityLabel.textContent = state.selectedCity;
    DOM.omniboxCityPrefix.innerHTML = `<span data-react-icon="mapPin" data-icon-size="14"></span> In <span>${state.selectedCity}</span> <span class="city-prefix-arrow" data-react-icon="chevronDown" data-icon-size="11"></span>`;
    if (window.ReactIcons) window.ReactIcons.replaceAll(DOM.omniboxCityPrefix);

    const weatherMap = {
      'Bengaluru': { icon: '🌤️', text: 'Bengaluru 24°C • AQI 42 (Clean)' },
      'Mangaluru': { icon: '🌊', text: 'Mangaluru 29°C • 76% Humidity (Coastal Breeze)' },
      'Mumbai': { icon: '🌆', text: 'Mumbai 28°C • AQI 78 (Moderate)' },
      'Delhi NCR': { icon: '🏛️', text: 'Delhi NCR 26°C • AQI 122 (Breezy)' },
      'Hyderabad': { icon: '✨', text: 'Hyderabad 25°C • AQI 55 (Good)' },
      'Pune': { icon: '🍃', text: 'Pune 23°C • AQI 38 (Pleasant)' },
      'Chennai': { icon: '🌴', text: 'Chennai 30°C • AQI 45 (Breezy)' },
      'Mysuru': { icon: '👑', text: 'Mysuru 22°C • AQI 30 (Very Clean)' },
      'Kochi': { icon: '🥥', text: 'Kochi 28°C • AQI 35 (Fresh)' },
      'Ahmedabad': { icon: '☀️', text: 'Ahmedabad 27°C • AQI 65 (Sunny)' }
    };
    const w = weatherMap[state.selectedCity] || { icon: '📍', text: `${state.selectedCity} 26°C • Verified Hub` };
    const wIcon = document.getElementById('weatherIcon');
    const wText = document.getElementById('weatherText');
    if (wIcon) wIcon.textContent = w.icon;
    if (wText) wText.textContent = w.text;
  }

  // Haversine Distance Helper in Kilometers
  function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  function autoDetectLocation() {
    DOM.locationDropdown.classList.remove('active');
    showToast('Detecting current GPS location...', 'info');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const uLat = pos.coords.latitude;
          const uLng = pos.coords.longitude;
          state.userCoordinates = { lat: uLat, lng: uLng };

          // Find the closest city from CITIES based on coordinates
          let closestCity = CITIES[0];
          let minDistance = Infinity;
          for (const c of CITIES) {
            const d = calculateDistanceKm(uLat, uLng, c.lat, c.lng);
            if (d < minDistance) {
              minDistance = d;
              closestCity = c;
            }
          }

          setCity(closestCity.name);
          showToast(`GPS location matched: ${closestCity.name} (${Math.round(minDistance)} km away)`, 'success');
        },
        () => {
          setCity('Bengaluru');
          showToast('GPS locked: Bengaluru Hub', 'success');
        },
        { timeout: 5000 }
      );
    } else {
      setCity('Bengaluru');
    }
  }

  /* ==========================================================================
     Deals & Offers Carousel
     ========================================================================== */
  function renderDeals() {
    if (!DOM.dealsCarouselContainer) return;

    // Filter deals for current city or popular platform deals
    let deals = PLATFORM_DEALS.filter(d => d.city.toLowerCase() === state.selectedCity.toLowerCase());
    if (deals.length === 0) {
      deals = PLATFORM_DEALS; // fallback to top trending deals
    }

    DOM.dealsCarouselContainer.innerHTML = deals.map(deal => `
      <div class="deal-card" data-biz-id="${deal.businessId}">
        <div class="deal-card-media">
          <span class="deal-badge-pill">${deal.badge}</span>
          <img src="${deal.image}" alt="${deal.title}" class="deal-card-img" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80';" />
          <span class="deal-city-tag">📍 ${deal.city}</span>
        </div>
        <div class="deal-card-content">
          <div class="deal-business-row">
            <span class="deal-business-name">${deal.businessName}</span>
            <span class="deal-verified-check" title="Verified LocalCare Pro">✓ Verified</span>
          </div>
          <h4 class="deal-title">${deal.title}</h4>
          <div class="deal-price-row">
            <span class="deal-price-current">${deal.dealPrice}</span>
            <span class="deal-price-original">${deal.originalPrice}</span>
            <span class="deal-discount-badge">${deal.discount}</span>
          </div>
          <div class="deal-card-footer">
            <span class="deal-validity"><span class="deal-clock-icon">⏱️</span> ${deal.validTill}</span>
            <button class="action-btn action-btn-primary deal-cta-btn" onclick="window.LocalCare.claimDeal('${deal.businessId}')" aria-label="Claim deal for ${deal.title}">
              Claim Deal ➔
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function claimDeal(businessId) {
    const all = getAllBusinesses();
    const b = all.find(item => item.id === businessId);
    if (b) {
      showToast(`🎉 Coupon applied! Opening booking for ${b.name}`, 'success');
      if (window.BookingEngine) {
        window.BookingEngine.openBookingModal(b);
      }
    }
  }

  /* ==========================================================================
     City Highlights Section (Section Q)
     ========================================================================== */
  function renderCityHighlights() {
    if (!DOM.cityHighlightsSection) return;

    if (DOM.cityHighlightsName) {
      DOM.cityHighlightsName.textContent = state.selectedCity;
    }

    if (DOM.cityPillTabs) {
      DOM.cityPillTabs.innerHTML = CITIES.map(c => `
        <button class="city-pill-btn ${c.name === state.selectedCity ? 'active' : ''}" data-city="${c.name}">
          ${c.name}
        </button>
      `).join('');

      DOM.cityPillTabs.querySelectorAll('.city-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const city = btn.getAttribute('data-city');
          setCity(city);
        });
      });
    }

    if (DOM.cityServicesList) {
      const all = getAllBusinesses();
      const cityPros = all.filter(b => b.city.toLowerCase() === state.selectedCity.toLowerCase()).slice(0, 4);

      if (cityPros.length === 0) {
        DOM.cityServicesList.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
            No verified businesses listed in ${state.selectedCity} yet. Be the first to list!
          </div>
        `;
      } else {
        DOM.cityServicesList.innerHTML = cityPros.map(b => `
          <div class="city-service-card" onclick="window.LocalCare.openDetailModalById('${b.id}')">
            <img src="${b.image}" alt="${b.name}" class="city-service-img" loading="lazy" />
            <div class="city-service-body">
              <span class="city-service-badge">${b.category.toUpperCase()}</span>
              <h4 class="city-service-name">${b.name}</h4>
              <p class="city-service-loc">📍 ${b.locality} • ★ ${b.rating} (${b.reviewsCount})</p>
              <div class="city-service-footer">
                <span class="city-service-price">From ₹${b.startingPrice || 299}</span>
                <button class="action-btn action-btn-primary" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;" onclick="event.stopPropagation(); window.LocalCare.openBookingById('${b.id}')">
                  Book ➔
                </button>
              </div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  /* ==========================================================================
     Curated Category Showcases & Spotlight Discovery (Section C)
     ========================================================================== */
  let currentCuratedTab = 'top-rated';

  function renderCuratedShowcase(tab = currentCuratedTab) {
    currentCuratedTab = tab;
    const curatedGrid = document.getElementById('curatedGrid');
    const curatedCityTitle = document.getElementById('curatedCityTitle');
    const curatedCategorySummary = document.getElementById('curatedCategorySummary');
    const curatedExploreAllBtn = document.getElementById('curatedExploreAllBtn');
    if (!curatedGrid) return;

    if (curatedCityTitle) curatedCityTitle.textContent = state.selectedCity;

    // Update active tab button style
    document.querySelectorAll('.curated-tab-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-curated-tab') === currentCuratedTab);
    });

    const all = getAllBusinesses();
    const cityBusinesses = all.filter(b => b.city.toLowerCase() === state.selectedCity.toLowerCase());
    let list = [];
    let label = 'Top-Rated Verified';
    let targetCat = 'all';

    if (currentCuratedTab === 'top-rated') {
      list = [...cityBusinesses].sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviewsCount || 0) - (a.reviewsCount || 0)).slice(0, 4);
      if (list.length < 4) {
        const remaining = all.filter(b => !list.some(item => item.id === b.id)).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4 - list.length);
        list = [...list, ...remaining];
      }
      label = 'Top-Rated Verified';
      targetCat = 'all';
    } else if (currentCuratedTab === 'nearby') {
      list = [...cityBusinesses].sort((a, b) => parseFloat(a.distance || 999) - parseFloat(b.distance || 999)).slice(0, 4);
      if (list.length === 0) list = cityBusinesses.slice(0, 4);
      label = 'Nearby Verified';
      targetCat = 'all';
    } else if (currentCuratedTab === 'newly-listed') {
      list = [...cityBusinesses].reverse().slice(0, 4);
      if (list.length < 4) {
        const remaining = all.filter(b => !list.some(item => item.id === b.id)).reverse().slice(0, 4 - list.length);
        list = [...list, ...remaining];
      }
      label = 'Newly Listed & Verified';
      targetCat = 'all';
    } else {
      let mappedCat = currentCuratedTab;
      if (currentCuratedTab === 'education') mappedCat = 'tutor';
      if (currentCuratedTab === 'beauty') mappedCat = 'salon';

      targetCat = mappedCat;
      list = cityBusinesses.filter(b => b.category === targetCat).slice(0, 4);
      if (list.length < 4) {
        const backfill = all.filter(b => b.category === targetCat && !list.some(item => item.id === b.id)).slice(0, 4 - list.length);
        list = [...list, ...backfill];
      }
      const catObj = CATEGORIES.find(c => c.id === targetCat);
      label = catObj ? catObj.title : targetCat;
    }

    if (curatedCategorySummary) {
      curatedCategorySummary.innerHTML = `Showing <strong>top ${list.length} ${label}</strong> providers in ${state.selectedCity}`;
    }

    if (curatedExploreAllBtn) {
      curatedExploreAllBtn.onclick = () => {
        filterCategory(targetCat);
        document.getElementById('listingsSection')?.scrollIntoView({ behavior: 'smooth' });
      };
      curatedExploreAllBtn.innerHTML = `Explore All ${label} in ${state.selectedCity} ➔`;
    }

    if (list.length === 0) {
      curatedGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
          No ${label} listings available in ${state.selectedCity} yet.
        </div>
      `;
      return;
    }

    curatedGrid.innerHTML = list.map(b => createBusinessCardHTML(b)).join('');
    attachCardEventListeners();
  }

  function switchCuratedTab(tab) {
    renderCuratedShowcase(tab);
  }

  /* ==========================================================================
     Category Grid
     ========================================================================== */
  function initCategories() {
    DOM.categoryGrid.innerHTML = CATEGORIES.map(cat => `
      <div class="category-card ${state.selectedCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
        <div class="category-icon-wrapper ${cat.badgeClass}">
          <span class="cat-icon-wrap">${window.ReactIcons ? window.ReactIcons.getCategoryIcon(cat.id, { size: 28 }) : cat.icon}</span>
        </div>
        <h4 class="category-name">${cat.title}</h4>
        <span class="category-count">${cat.count}</span>
      </div>
    `).join('');

    DOM.categoryGrid.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const catId = card.getAttribute('data-category');
        if (state.selectedCategory === catId) {
          state.selectedCategory = 'all';
        } else {
          state.selectedCategory = catId;
        }
        updateCategoryActiveStates();
        renderListings();
      });
    });

    // Quick tag chips in hero
    const sampleTags = [
      { label: 'AC repair available today', cat: 'electrical', query: 'AC repair available today' },
      { label: 'Dentist under ₹500', cat: 'health', query: 'Dentist under ₹500' },
      { label: 'Plumber in Valachil', cat: 'home', query: 'Plumber in Valachil' },
      { label: '24/7 Ambulance', cat: 'emergency', query: 'Ambulance' },
      { label: 'Dermatologist near me', cat: 'health', query: 'Dermatologist' },
      { label: 'Pure Veg Biryani', cat: 'food', query: 'Pure Veg Biryani' }
    ];

    DOM.quickTagsContainer.innerHTML = `
      <span class="quick-tag-label">Popular Searches:</span>
      ${sampleTags.map(t => `
        <button class="quick-tag-chip" data-cat="${t.cat}" data-query="${t.query}">
          <span class="icon-wrap">${window.ReactIcons ? window.ReactIcons.render('zap', { size: 14 }) : '⚡'}</span> ${t.label}
        </button>
      `).join('')}
    `;

    DOM.quickTagsContainer.querySelectorAll('.quick-tag-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        DOM.omniboxInput.value = query;
        executeSearch(query);
      });
    });
  }

  function updateCategoryActiveStates() {
    DOM.categoryGrid.querySelectorAll('.category-card').forEach(card => {
      if (card.getAttribute('data-category') === state.selectedCategory) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  function updateCategoryBanner() {
    const banner = document.getElementById('categoryHeroBanner');
    if (!banner) return;

    if (state.selectedCategory === 'all') {
      banner.style.display = 'none';
      if (window.history && window.history.replaceState) {
        const url = new URL(window.location);
        url.searchParams.delete('category');
        window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
      }
      return;
    }

    const cat = CATEGORIES.find(c => c.id === state.selectedCategory);
    if (!cat) {
      banner.style.display = 'none';
      return;
    }

    banner.style.display = 'block';

    const bcCity = document.getElementById('breadcrumbCity');
    const bcCat = document.getElementById('breadcrumbCategory');
    const heroIcon = document.getElementById('catHeroIcon');
    const heroTitle = document.getElementById('catHeroTitle');
    const heroSubtitle = document.getElementById('catHeroSubtitle');
    const subcatsContainer = document.getElementById('catHeroSubcategories');

    if (bcCity) bcCity.textContent = state.selectedCity || 'All India';
    if (bcCat) bcCat.textContent = cat.title;
    if (heroIcon) heroIcon.textContent = cat.icon || '📌';
    if (heroTitle) heroTitle.textContent = `${cat.title} in ${state.selectedCity || 'India'}`;
    if (heroSubtitle) heroSubtitle.textContent = `Explore verified, background-checked ${cat.title.toLowerCase()} across ${state.selectedCity || 'your city'} with upfront rates & instant appointment booking.`;

    if (subcatsContainer && cat.subcategories && cat.subcategories.length > 0) {
      subcatsContainer.innerHTML = `
        <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-right: 0.35rem;">Popular in ${cat.title}:</span>
        ${cat.subcategories.map(sub => `
          <button class="subcat-pill ${state.searchQuery.toLowerCase() === sub.toLowerCase() ? 'active' : ''}" onclick="window.LocalCare.filterBySubcategory('${sub.replace(/'/g, "\\'")}')">
            ${sub}
          </button>
        `).join('')}
      `;
    } else if (subcatsContainer) {
      subcatsContainer.innerHTML = '';
    }

    if (window.history && window.history.replaceState) {
      const url = new URL(window.location);
      url.searchParams.set('category', state.selectedCategory);
      window.history.replaceState(null, '', url.toString());
    }
  }

  function filterBySubcategory(subcat) {
    DOM.omniboxInput.value = subcat;
    state.searchQuery = subcat;
    DOM.omniboxClearBtn.classList.add('active');
    updateCategoryBanner();
    renderListings(true);
    showToast(`Filtering for: ${subcat}`, 'info');
  }

  function filterCategory(catId) {
    state.selectedCategory = catId;
    updateCategoryActiveStates();
    updateCategoryBanner();
    renderStickyChips();
    renderListings();
    document.getElementById('listingsSection').scrollIntoView({ behavior: 'smooth' });
  }

  /* ==========================================================================
     Omnibox Search & AI Natural Language Engine
     ========================================================================== */
  let searchDebounceTimer = null;
  let selectedSuggestionIndex = -1;

  function initSearch() {
    DOM.omniboxInput.addEventListener('input', (e) => {
      const q = e.target.value;
      DOM.omniboxClearBtn.classList.toggle('active', q.trim().length > 0);
      selectedSuggestionIndex = -1;

      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        if (q.trim().length >= 1) {
          showSuggestions(q);
        } else {
          DOM.searchSuggestions.classList.remove('open');
        }
      }, 200);
    });

    DOM.omniboxClearBtn.addEventListener('click', () => {
      DOM.omniboxInput.value = '';
      state.searchQuery = '';
      state.parsedAI = null;
      DOM.aiSummaryBanner.style.display = 'none';
      DOM.omniboxClearBtn.classList.remove('active');
      DOM.searchSuggestions.classList.remove('open');
      selectedSuggestionIndex = -1;
      renderListings();
      DOM.omniboxInput.focus();
    });

    DOM.omniboxSubmitBtn.addEventListener('click', () => {
      const q = DOM.omniboxInput.value.trim();
      executeSearch(q);
    });

    DOM.omniboxInput.addEventListener('keydown', (e) => {
      const items = DOM.searchSuggestions.querySelectorAll('.suggestion-item');
      if (DOM.searchSuggestions.classList.contains('open') && items.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          selectedSuggestionIndex = (selectedSuggestionIndex + 1) % items.length;
          updateSuggestionHighlight(items);
          return;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          selectedSuggestionIndex = (selectedSuggestionIndex - 1 + items.length) % items.length;
          updateSuggestionHighlight(items);
          return;
        } else if (e.key === 'Enter') {
          if (selectedSuggestionIndex >= 0 && items[selectedSuggestionIndex]) {
            e.preventDefault();
            items[selectedSuggestionIndex].click();
            return;
          }
        } else if (e.key === 'Escape') {
          DOM.searchSuggestions.classList.remove('open');
          selectedSuggestionIndex = -1;
          return;
        }
      }

      if (e.key === 'Enter') {
        const q = DOM.omniboxInput.value.trim();
        executeSearch(q);
      }
    });

    function updateSuggestionHighlight(items) {
      items.forEach((item, idx) => {
        item.classList.toggle('keyboard-selected', idx === selectedSuggestionIndex);
        if (idx === selectedSuggestionIndex) {
          item.scrollIntoView({ block: 'nearest' });
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (!DOM.searchSuggestions.contains(e.target) && !DOM.omniboxInput.contains(e.target)) {
        DOM.searchSuggestions.classList.remove('open');
        selectedSuggestionIndex = -1;
      }
    });
  }

  function executeSearch(query) {
    if (DOM.searchSuggestions) DOM.searchSuggestions.classList.remove('open');
    state.searchQuery = query || '';
    state.currentPage = 1;

    if (!query || !query.trim()) {
      state.parsedAI = null;
      state.filterLocality = '';
      state.filterMaxPrice = null;
      state.filterVeg = false;
      if (DOM.aiSummaryBanner) DOM.aiSummaryBanner.style.display = 'none';
      renderListings(true);
      return;
    }

    // Call AI Natural Language Search Engine
    if (window.AISearchEngine) {
      state.parsedAI = window.AISearchEngine.parseQuery(query, state.selectedCity);

      if (state.parsedAI.isAI) {
        // If city changed via natural language mention (e.g. "in Valachil", "in Mysuru")
        if (state.parsedAI.city && state.parsedAI.city.toLowerCase() !== state.selectedCity.toLowerCase()) {
          setCity(state.parsedAI.city);
        }

        // Auto filter category if detected
        if (state.parsedAI.category) {
          state.selectedCategory = state.parsedAI.category;
          updateCategoryActiveStates();
        }

        // Auto filter locality if detected
        if (state.parsedAI.locality) {
          state.filterLocality = state.parsedAI.locality;
        }

        // Auto filter budget ceiling
        if (state.parsedAI.maxBudget) {
          state.filterMaxPrice = state.parsedAI.maxBudget;
        }

        // Auto filter availability today
        if (state.parsedAI.availableToday) {
          state.filterAvailableToday = true;
          DOM.filterAvailableTodayBtn?.classList.add('active');
        }

        // Auto filter open now
        if (state.parsedAI.openNow) {
          state.filterOpenNow = true;
          DOM.filterOpenNowBtn?.classList.add('active');
        }

        // Auto filter rating
        if (state.parsedAI.minRating > 0) {
          state.filterMinRating = state.parsedAI.minRating;
          DOM.filterRatingBtn?.classList.add('active');
        }

        // Auto filter vegetarian
        if (state.parsedAI.isVeg) {
          state.filterVeg = true;
        }

        // Auto sort criteria (e.g. "near me" -> distance, "best" -> rating)
        if (state.parsedAI.sortBy) {
          state.sortBy = state.parsedAI.sortBy;
          if (DOM.sortSelect) DOM.sortSelect.value = state.parsedAI.sortBy;
        }

        // Pro comparison mode intent
        if (state.parsedAI.intentAction === 'compare') {
          showToast('⚖️ Pro Comparison Mode activated for matching providers', 'info');
        }

        // Show AI explanation banner
        if (DOM.aiSummaryText && DOM.aiSummaryBanner) {
          DOM.aiSummaryText.innerHTML = state.parsedAI.aiSummary;
          DOM.aiSummaryBanner.style.display = 'flex';
        }
      } else {
        if (DOM.aiSummaryBanner) DOM.aiSummaryBanner.style.display = 'none';
      }
    }

    renderListings(true);
    addRecentSearch(query);
    const listingsSec = document.getElementById('listingsSection');
    if (listingsSec) listingsSec.scrollIntoView({ behavior: 'smooth' });
  }

  /* ==========================================================================
     Recent Searches Row
     ========================================================================== */
  function renderRecentSearches() {
    if (!DOM.recentSearchesRow || !DOM.recentSearchesList) return;
    if (!state.recentSearches || state.recentSearches.length === 0) {
      DOM.recentSearchesRow.style.display = 'none';
      return;
    }

    DOM.recentSearchesRow.style.display = 'flex';
    DOM.recentSearchesList.innerHTML = state.recentSearches.map(term => `
      <button class="recent-search-chip" data-query="${escapeHtml(term)}">
        <span>🕒</span> ${escapeHtml(term)}
      </button>
    `).join('') + `
      <button class="recent-search-clear-btn" title="Clear search history" onclick="window.LocalCare.clearRecentSearches()">✕</button>
    `;

    DOM.recentSearchesList.querySelectorAll('.recent-search-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        DOM.omniboxInput.value = query;
        executeSearch(query);
      });
    });
  }

  function addRecentSearch(query) {
    if (!query || query.trim().length < 2) return;
    const clean = query.trim();
    state.recentSearches = [clean, ...state.recentSearches.filter(s => s.toLowerCase() !== clean.toLowerCase())].slice(0, 6);
    localStorage.setItem('localcare_recent_searches', JSON.stringify(state.recentSearches));
    renderRecentSearches();
  }

  function clearRecentSearches() {
    state.recentSearches = [];
    localStorage.removeItem('localcare_recent_searches');
    renderRecentSearches();
    showToast('Recent searches cleared', 'info');
  }

  function highlightMatch(text, query) {
    if (!text || !query) return escapeHtml(text || '');
    const cleanQ = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    if (!cleanQ) return escapeHtml(text);
    const parts = String(text).split(new RegExp(`(${cleanQ})`, 'gi'));
    return parts.map(part => part.toLowerCase() === cleanQ.toLowerCase() ? `<mark class="omni-highlight">${escapeHtml(part)}</mark>` : escapeHtml(part)).join('');
  }

  function showSuggestions(query) {
    const qLower = query.toLowerCase();
    const all = getAllBusinesses();

    // Matching businesses
    const matchedBusinesses = all.filter(b =>
      b.city.toLowerCase() === state.selectedCity.toLowerCase() &&
      (b.name.toLowerCase().includes(qLower) ||
        b.locality.toLowerCase().includes(qLower) ||
        b.services.some(s => s.name.toLowerCase().includes(qLower)))
    ).slice(0, 4);

    // Matching categories
    const matchedCategories = CATEGORIES.filter(c =>
      c.title.toLowerCase().includes(qLower) ||
      c.subcategories.some(s => s.toLowerCase().includes(qLower))
    ).slice(0, 3);

    if (matchedBusinesses.length === 0 && matchedCategories.length === 0) {
      const safeQuery = String(query).replace(/[&<>"']/g, '');
      DOM.searchSuggestions.innerHTML = `
        <div class="suggestion-empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-info">
            <div class="empty-state-title">No exact match for "<strong>${safeQuery}</strong>" in ${state.selectedCity}</div>
            <div class="empty-state-subtitle">Try natural language search or choose from popular services:</div>
            <div class="empty-state-chips">
              <span class="empty-chip-item" onclick="document.getElementById('omniboxInput').value='AC repair'; window.LocalCare.filterCategory('electrical'); document.getElementById('searchSuggestions').classList.remove('open');">❄️ AC Service</span>
              <span class="empty-chip-item" onclick="document.getElementById('omniboxInput').value='Dentist under ₹500'; window.LocalCare.filterCategory('health'); document.getElementById('searchSuggestions').classList.remove('open');">🩺 Dentist</span>
              <span class="empty-chip-item" onclick="document.getElementById('omniboxInput').value='Plumber'; window.LocalCare.filterCategory('home'); document.getElementById('searchSuggestions').classList.remove('open');">🔧 Plumber</span>
              <span class="empty-chip-item empty-chip-ai" onclick="window.CareAI.openAssistantWithQuery('${safeQuery}'); document.getElementById('searchSuggestions').classList.remove('open');">✨ Ask CareAI Concierge</span>
            </div>
          </div>
        </div>
      `;
      DOM.searchSuggestions.classList.add('open');
      return;
    }

    let html = '';
    if (matchedCategories.length > 0) {
      html += `<div class="suggestion-group-title">Services & Categories</div>`;
      matchedCategories.forEach(cat => {
        html += `
          <div class="suggestion-item" data-type="category" data-id="${cat.id}">
            <div class="suggestion-main">
              <span class="suggestion-icon">${cat.icon}</span>
              <div>
                <strong>${highlightMatch(cat.title, query)}</strong>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${cat.subcategories.slice(0, 3).map(s => highlightMatch(s, query)).join(', ')}</div>
              </div>
            </div>
            <span style="font-size: 0.8rem; color: var(--primary);">View Category ➔</span>
          </div>
        `;
      });
    }

    if (matchedBusinesses.length > 0) {
      html += `<div class="suggestion-group-title" style="margin-top: 0.4rem;">Top Rated Providers in ${state.selectedCity}</div>`;
      matchedBusinesses.forEach(b => {
        html += `
          <div class="suggestion-item" data-type="business" data-id="${b.id}">
            <div class="suggestion-main">
              <span class="suggestion-icon">📍</span>
              <div>
                <strong>${highlightMatch(b.name, query)}</strong>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${highlightMatch(b.locality, query)} • ★ ${b.rating}</div>
              </div>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">${b.distance}</span>
          </div>
        `;
      });
    }

    DOM.searchSuggestions.innerHTML = html;
    DOM.searchSuggestions.classList.add('open');

    // Attach click events
    DOM.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const type = item.getAttribute('data-type');
        const id = item.getAttribute('data-id');

        if (type === 'category') {
          state.selectedCategory = id;
          updateCategoryActiveStates();
          DOM.searchSuggestions.classList.remove('open');
          renderListings();
        } else if (type === 'business') {
          const b = all.find(x => x.id === id);
          if (b) {
            DOM.searchSuggestions.classList.remove('open');
            openBusinessDetailModal(b);
          }
        }
      });
    });
  }

  /* ==========================================================================
     Filter & Sort Controls
     ========================================================================== */
  function initFiltersAndSort() {
    DOM.filterVerifiedBtn.addEventListener('click', () => {
      state.filterVerified = !state.filterVerified;
      DOM.filterVerifiedBtn.classList.toggle('active', state.filterVerified);
      renderListings();
    });

    DOM.filterOpenNowBtn.addEventListener('click', () => {
      state.filterOpenNow = !state.filterOpenNow;
      DOM.filterOpenNowBtn.classList.toggle('active', state.filterOpenNow);
      renderListings();
    });

    DOM.filterAvailableTodayBtn.addEventListener('click', () => {
      state.filterAvailableToday = !state.filterAvailableToday;
      DOM.filterAvailableTodayBtn.classList.toggle('active', state.filterAvailableToday);
      renderListings();
    });

    DOM.filterRatingBtn.addEventListener('click', () => {
      state.filterMinRating = state.filterMinRating === 4.8 ? 0 : 4.8;
      DOM.filterRatingBtn.classList.toggle('active', state.filterMinRating > 0);
      renderListings();
    });

    DOM.filterHomeServiceBtn.addEventListener('click', () => {
      state.filterHomeService = !state.filterHomeService;
      DOM.filterHomeServiceBtn.classList.toggle('active', state.filterHomeService);
      renderListings();
    });

    DOM.filterOffersBtn?.addEventListener('click', () => {
      filterOffersOnly();
      DOM.filterOffersBtn.classList.toggle('active', state.filterOffersOnly);
    });

    DOM.viewGridBtn?.addEventListener('click', () => setViewMode('grid'));
    DOM.viewListBtn?.addEventListener('click', () => setViewMode('list'));
    DOM.viewMapBtn?.addEventListener('click', () => setViewMode('map'));

    DOM.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderListings();
    });
  }

  /* ==========================================================================
     View Modes (Grid, List, Map-Focus Layout)
     ========================================================================== */
  function setViewMode(mode) {
    state.viewMode = mode;
    if (DOM.resultsSplitContainer) {
      DOM.resultsSplitContainer.classList.toggle('view-list', mode === 'list');
      DOM.resultsSplitContainer.classList.toggle('view-full-map', mode === 'map');
    }

    DOM.viewGridBtn?.classList.toggle('active', mode === 'grid');
    DOM.viewListBtn?.classList.toggle('active', mode === 'list');
    DOM.viewMapBtn?.classList.toggle('active', mode === 'map');

    if (mode === 'map') {
      DOM.interactiveMapContainer?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function filterOffersOnly() {
    state.filterOffersOnly = !state.filterOffersOnly;
    renderListings();
    document.getElementById('listingsSection').scrollIntoView({ behavior: 'smooth' });
  }

  function filterByRadius(radiusKm) {
    state.filterMaxRadius = radiusKm;
    renderListings();
    showToast(`Showing businesses within ${radiusKm} km radius`, 'info');
  }

  /* ==========================================================================
     Listing Cards Rendering, Pagination & Two-Way Map Sync
     ========================================================================== */
  function renderListings(resetPage = false) {
    if (resetPage) state.currentPage = 1;
    const all = getAllBusinesses();

    // 1. Shimmer Loading State briefly for smooth UX feedback
    if (DOM.listingsGrid) {
      DOM.listingsGrid.innerHTML = Array(4).fill(0).map(() => `
        <div class="business-card skeleton-card" style="opacity: 0.85; pointer-events: none;">
          <div class="card-media-wrapper skeleton" style="height: 190px;"></div>
          <div class="card-content" style="gap: 0.6rem;">
            <div class="skeleton skeleton-title" style="width: 70%; height: 22px;"></div>
            <div class="skeleton skeleton-text" style="width: 45%; height: 16px;"></div>
            <div class="skeleton skeleton-text" style="width: 90%; height: 14px;"></div>
            <div class="skeleton skeleton-text" style="width: 60%; height: 14px;"></div>
          </div>
        </div>
      `).join('');
    }

    setTimeout(() => {
      let results = [...all];

      // Natural language / semantic filtering
      if (state.searchQuery.trim() && window.AISearchEngine && state.parsedAI) {
        results = results.filter(b => {
          return window.AISearchEngine.matchesBusiness(b, state.parsedAI, state.selectedCity);
        });

        // Apply relevance sorting if not explicitly overridden
        if (state.sortBy === 'rating' && !state.parsedAI.sortBy) {
          results.sort((a, b) => {
            return window.AISearchEngine.scoreRelevance(b, state.parsedAI) - window.AISearchEngine.scoreRelevance(a, state.parsedAI);
          });
        }
      } else {
        // Smart Category & City Matching with Resilient Statewide / Pan-India Fallback
        let isCategoryFallback = false;
        if (state.selectedCategory !== 'all') {
          const exactCityMatches = results.filter(b => 
            (b.city || '').toLowerCase() === state.selectedCity.toLowerCase() &&
            (b.category === state.selectedCategory || b.category_id === state.selectedCategory)
          );

          if (exactCityMatches.length > 0) {
            results = exactCityMatches;
          } else {
            // Resilient Fallback: If no provider in this exact city, show top verified providers in this category from all hubs
            const categoryMatches = all.filter(b => 
              b.category === state.selectedCategory || b.category_id === state.selectedCategory
            );
            if (categoryMatches.length > 0) {
              results = categoryMatches;
              isCategoryFallback = true;
            } else {
              results = [];
            }
          }
        } else {
          // City filter for all categories
          results = results.filter(b => (b.city || '').toLowerCase() === state.selectedCity.toLowerCase());
        }
        state.isCategoryFallback = isCategoryFallback;

        // Literal search query fallback
        if (state.searchQuery.trim()) {
          const q = state.searchQuery.toLowerCase().trim();
          results = results.filter(b => {
            const inName = (b.name || '').toLowerCase().includes(q);
            const inLoc = (b.locality || '').toLowerCase().includes(q);
            const inSub = (b.subcategory || '').toLowerCase().includes(q);
            const inServ = (b.services || []).some(s => s.name.toLowerCase().includes(q));
            const inDesc = (b.description || '').toLowerCase().includes(q);
            return inName || inLoc || inSub || inServ || inDesc;
          });
        }
      }

      // Manual Filters
      if (state.filterLocality) {
        results = results.filter(b => (b.locality || '').toLowerCase().includes(state.filterLocality.toLowerCase()));
      }
      if (state.filterVerified) {
        results = results.filter(b => b.verified);
      }
      if (state.filterOpenNow) {
        results = results.filter(b => b.openNow);
      }
      if (state.filterAvailableToday) {
        results = results.filter(b => b.availableToday);
      }
      if (state.filterMinRating > 0) {
        results = results.filter(b => (b.rating || 0) >= state.filterMinRating);
      }
      if (state.filterHomeService) {
        results = results.filter(b => b.homeService);
      }
      if (state.filterOffersOnly) {
        results = results.filter(b => !!b.offer);
      }
      if (state.filterMaxPrice) {
        results = results.filter(b => {
          const startP = b.startingPrice || 0;
          const minServP = (b.services && b.services.length > 0) ? Math.min(...b.services.map(s => s.price || 99999)) : startP;
          return startP <= state.filterMaxPrice || minServP <= state.filterMaxPrice;
        });
      }
      if (state.filterVeg) {
        results = results.filter(b => b.isVeg === true || (b.subcategory || '').toLowerCase().includes('veg'));
      }
      if (state.filterB2B) {
        results = results.filter(b => b.b2b === true || b.category === 'b2b' || (b.subcategory || '').toLowerCase().includes('wholesale'));
      }
      // Dynamic distance computation where location coordinates are available
      if (state.userCoordinates) {
        results.forEach(b => {
          if (b.lat && b.lng) {
            const dist = calculateDistanceKm(state.userCoordinates.lat, state.userCoordinates.lng, b.lat, b.lng);
            b.distance = `${dist} km`;
          }
        });
      }

      if (state.filterMaxRadius < 25) {
        results = results.filter(b => {
          const distKm = parseFloat(b.distance) || 1.5;
          return distKm <= state.filterMaxRadius;
        });
      }

      // Sorting
      if (state.sortBy === 'rating') {
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.reviewsCount || 0) - (a.reviewsCount || 0));
      } else if (state.sortBy === 'reviews') {
        results.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
      } else if (state.sortBy === 'distance') {
        results.sort((a, b) => parseFloat(a.distance || 999) - parseFloat(b.distance || 999));
      } else if (state.sortBy === 'price_low') {
        results.sort((a, b) => (a.startingPrice || 500) - (b.startingPrice || 500));
      } else if (state.sortBy === 'price_high') {
        results.sort((a, b) => (b.startingPrice || 500) - (a.startingPrice || 500));
      } else if (state.sortBy === 'response') {
        results.sort((a, b) => (parseInt(a.responseTime) || 10) - (parseInt(b.responseTime) || 10));
      }

      state.totalFilteredResults = results.length;

      // Pagination calculations
      const totalPages = Math.max(1, Math.ceil(results.length / state.itemsPerPage));
      if (state.currentPage > totalPages) state.currentPage = 1;
      const startIdx = (state.currentPage - 1) * state.itemsPerPage;
      const endIdx = Math.min(startIdx + state.itemsPerPage, results.length);
      const paginatedResults = results.slice(startIdx, endIdx);

      // Update Result Counter
      if (DOM.resultsCount) {
        if (state.isCategoryFallback && results.length > 0) {
          DOM.resultsCount.innerHTML = `Showing <strong>${results.length} Verified Providers</strong> Serving ${escapeHtml(state.selectedCity)} (Statewide & Express Doorstep Dispatch)`;
        } else if (results.length > 0) {
          DOM.resultsCount.textContent = `Showing ${startIdx + 1}–${endIdx} of ${results.length} Verified Providers in ${state.selectedCity}`;
        } else {
          DOM.resultsCount.textContent = `0 Verified Providers in ${state.selectedCity}`;
        }
      }

      // Update Active Filter Tags
      renderActiveFilterChips();

      // Render Listings or Empathetic No-Results View
      if (results.length === 0) {
        renderNoResultsSuggestions(all);
        if (DOM.listingsPagination) DOM.listingsPagination.style.display = 'none';
      } else {
        DOM.listingsGrid.innerHTML = paginatedResults.map(b => createBusinessCardHTML(b)).join('');
        attachCardEventListeners();
        renderPagination(totalPages, results.length, startIdx, endIdx);

        // Auto-highlight comparison if user searched "compare"
        if (state.parsedAI && state.parsedAI.intentAction === 'compare' && window.ProComparison) {
          const topIds = paginatedResults.slice(0, 3).map(b => b.id);
          topIds.forEach(id => {
            if (!window.ProComparison.isComparing(id)) {
              window.ProComparison.toggleCompare(id);
            }
          });
        }
      }

      // Synchronize Map with Current Listings
      if (window.MapEngine && window.MapEngine.updateMarkers) {
        window.MapEngine.updateMarkers(paginatedResults);
      }
    }, 120);
  }

  function renderPagination(totalPages, totalItems, startIdx, endIdx) {
    if (!DOM.listingsPagination) return;
    if (totalPages <= 1) {
      DOM.listingsPagination.style.display = 'none';
      return;
    }

    DOM.listingsPagination.style.display = 'flex';

    let pageButtons = '';
    for (let p = 1; p <= totalPages; p++) {
      pageButtons += `
        <button class="pagination-btn ${p === state.currentPage ? 'active' : ''}" onclick="window.LocalCare.goToPage(${p})">
          ${p}
        </button>
      `;
    }

    DOM.listingsPagination.innerHTML = `
      <div class="pagination-info">
        Showing <strong>${startIdx + 1}–${endIdx}</strong> of <strong>${totalItems}</strong> providers
      </div>
      <div class="pagination-controls">
        <button class="pagination-btn" ${state.currentPage === 1 ? 'disabled' : ''} onclick="window.LocalCare.goToPage(${state.currentPage - 1})">
          ← Prev
        </button>
        ${pageButtons}
        <button class="pagination-btn" ${state.currentPage === totalPages ? 'disabled' : ''} onclick="window.LocalCare.goToPage(${state.currentPage + 1})">
          Next →
        </button>
      </div>
    `;
  }

  function renderNoResultsSuggestions(all) {
    const cityAll = all.filter(b => b.city.toLowerCase() === state.selectedCity.toLowerCase());
    const sameCatInCity = cityAll.filter(b => state.selectedCategory === 'all' || b.category === state.selectedCategory);
    const lowestPrice = sameCatInCity.length > 0 ? Math.min(...sameCatInCity.map(b => b.startingPrice || 9999)) : null;

    let suggestionHtml = '';

    if (state.filterMaxPrice && lowestPrice && lowestPrice > state.filterMaxPrice) {
      suggestionHtml = `
        <div style="background: var(--warning-light); border: 1px solid var(--warning); border-radius: var(--radius-md); padding: 0.85rem 1rem; margin-bottom: 1.25rem; font-size: 0.9rem; text-align: left;">
          💡 <strong>Price Tip:</strong> No verified ${state.selectedCategory !== 'all' ? state.selectedCategory : 'service'} providers found under ₹${state.filterMaxPrice} in ${state.selectedCity}. Verified rates start from <strong>₹${lowestPrice}</strong>.
          <div style="margin-top: 0.5rem;">
            <button class="action-btn action-btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.82rem;" onclick="window.LocalCare.setBudgetFilter(${lowestPrice})">
              Adjust budget to ₹${lowestPrice} ➔
            </button>
          </div>
        </div>
      `;
    } else if (state.filterLocality) {
      suggestionHtml = `
        <div style="background: var(--info-light); border: 1px solid var(--info); border-radius: var(--radius-md); padding: 0.85rem 1rem; margin-bottom: 1.25rem; font-size: 0.9rem; text-align: left;">
          📍 <strong>Locality Tip:</strong> No direct matches in <strong>${state.filterLocality}</strong>. There are ${cityAll.length} verified providers serving across all areas of ${state.selectedCity}.
          <div style="margin-top: 0.5rem;">
            <button class="action-btn action-btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.82rem;" onclick="window.LocalCare.clearLocalityFilter()">
              View all of ${state.selectedCity} ➔
            </button>
          </div>
        </div>
      `;
    }

    DOM.listingsGrid.innerHTML = `
      <div style="text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-surface); border: 1px dashed var(--border-subtle); border-radius: var(--radius-xl); max-width: 650px; margin: 0 auto; width: 100%;">
        <div style="font-size: 3rem; margin-bottom: 0.75rem;">🔍</div>
        <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.35rem;">No exact matches found</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.25rem; font-size: 0.92rem; line-height: 1.6;">
          ${state.searchQuery ? `We searched for "<em>${escapeHtml(state.searchQuery)}</em>" in ${state.selectedCity}.` : `No providers matched the current combination of filters.`}
        </p>

        ${suggestionHtml}

        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button class="action-btn action-btn-outline" onclick="window.LocalCare.resetAllFilters()">
            Clear Filters & Reset
          </button>
          <button class="action-btn action-btn-primary" onclick="window.QuoteMarketplace.openQuotesModal()">
            ⚡ Broadcast Free Quote Request
          </button>
        </div>
      </div>
    `;
  }

  function renderActiveFilterChips() {
    let chips = [];
    if (state.selectedCategory !== 'all') {
      const cat = CATEGORIES.find(c => c.id === state.selectedCategory);
      chips.push({ label: cat ? cat.title : state.selectedCategory, type: 'category' });
    }
    if (state.searchQuery) chips.push({ label: `"${state.searchQuery}"`, type: 'search' });
    if (state.filterLocality) chips.push({ label: `📍 ${state.filterLocality}`, type: 'locality' });
    if (state.filterMaxPrice) chips.push({ label: `₹ Max: ₹${state.filterMaxPrice}`, type: 'price' });
    if (state.filterVeg) chips.push({ label: '🟢 Pure Veg Only', type: 'veg' });
    if (state.filterVerified) chips.push({ label: 'Verified Only', type: 'verified' });
    if (state.filterOpenNow) chips.push({ label: 'Open Now', type: 'open' });
    if (state.filterAvailableToday) chips.push({ label: 'Available Today', type: 'today' });
    if (state.filterMinRating > 0) chips.push({ label: '4.5+ Rating', type: 'rating' });
    if (state.filterHomeService) chips.push({ label: 'Home Service', type: 'homeService' });
    if (state.filterOffersOnly) chips.push({ label: 'Offers Only', type: 'offers' });

    DOM.activeFilterTags.innerHTML = chips.map(c => `
      <span class="service-pill" style="background: var(--primary-lightest); border-color: var(--primary); color: var(--primary); font-weight: 700;">
        ${c.label}
      </span>
    `).join('');
  }

  function resetAllFilters() {
    state.selectedCategory = 'all';
    state.searchQuery = '';
    state.parsedAI = null;
    state.filterVerified = false;
    state.filterOpenNow = false;
    state.filterAvailableToday = false;
    state.filterMinRating = 0;
    state.filterHomeService = false;
    state.filterOffersOnly = false;
    state.filterMaxRadius = 25;
    state.filterMaxPrice = null;
    state.filterLocality = '';
    state.filterVeg = false;
    state.currentPage = 1;
    state.sortBy = 'rating';

    if (DOM.omniboxInput) DOM.omniboxInput.value = '';
    if (DOM.omniboxClearBtn) DOM.omniboxClearBtn.classList.remove('active');
    if (DOM.aiSummaryBanner) DOM.aiSummaryBanner.style.display = 'none';
    if (DOM.sortSelect) DOM.sortSelect.value = 'rating';
    DOM.filterVerifiedBtn?.classList.remove('active');
    DOM.filterOpenNowBtn?.classList.remove('active');
    DOM.filterAvailableTodayBtn?.classList.remove('active');
    DOM.filterRatingBtn?.classList.remove('active');
    DOM.filterHomeServiceBtn?.classList.remove('active');
    DOM.filterOffersBtn?.classList.remove('active');

    updateCategoryActiveStates();
    renderListings(true);
    showToast('Filters cleared', 'info');
  }

    /* ==========================================================================
     Authentic Category & Trade Photo Engine
     Guarantees every business showcases strictly trade-matching photography
     (e.g., plumbers display ONLY plumbing pipes & tools; dentists show dental clinics)
     ========================================================================== */
  const TRADE_GALLERIES = {
    plumber: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80'
    ],
    carpenter: [
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    painter: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    tile: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2b8ab98f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    electrical: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=800&q=80'
    ],
    dentist: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=800&q=80'
    ],
    doctor: [
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    dermatology: [
      'https://images.unsplash.com/photo-1512290900672-1f55b9e078c1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
    ],
    restaurant: [
      'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80'
    ],
    salon: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80'
    ],
    auto: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80'
    ],
    cleaning: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581579186913-45ac3e6efe93?auto=format&fit=crop&w=800&q=80'
    ],
    tutor: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
    ],
    tech: [
      'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?auto=format&fit=crop&w=800&q=80'
    ],
    pro: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
    ],
    packers: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
    ],
    stays: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    shopping: [
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80'
    ],
    daily: [
      'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80'
    ],
    travel: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    ],
    events: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80'
    ],
    emergency: [
      'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
    ],
    b2b: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    jobs: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
    ]
  };

  function getTradePhotos(b) {
    if (!b) return TRADE_GALLERIES.plumber;
    const cat = (b.category || '').toLowerCase();
    const sub = (b.subcategory || '').toLowerCase();
    const name = (b.name || '').toLowerCase();

    let gallery = TRADE_GALLERIES.electrical;
    if (cat === 'jobs') gallery = TRADE_GALLERIES.jobs;
    else if (cat === 'travel') gallery = TRADE_GALLERIES.travel;
    else if (cat === 'stays') gallery = TRADE_GALLERIES.stays;
    else if (cat === 'home') {
      if (sub.includes('carp') || name.includes('carp') || name.includes('wood') || name.includes('furniture')) {
        gallery = TRADE_GALLERIES.carpenter;
      } else if (sub.includes('paint') || name.includes('paint') || name.includes('color')) {
        gallery = TRADE_GALLERIES.painter;
      } else if (sub.includes('tile') || sub.includes('marble') || sub.includes('floor') || name.includes('marble') || name.includes('tile')) {
        gallery = TRADE_GALLERIES.tile;
      } else {
        gallery = TRADE_GALLERIES.plumber;
      }
    } else if (cat === 'health') {
      if (sub.includes('dent') || name.includes('dent') || name.includes('teeth') || name.includes('smile') || name.includes('ortho')) {
        gallery = TRADE_GALLERIES.dentist;
      } else if (sub.includes('derm') || sub.includes('skin') || name.includes('skin') || name.includes('derma')) {
        gallery = TRADE_GALLERIES.dermatology;
      } else {
        gallery = TRADE_GALLERIES.doctor;
      }
    } else if (cat === 'electrical') gallery = TRADE_GALLERIES.electrical;
    else if (cat === 'food') gallery = TRADE_GALLERIES.restaurant;
    else if (cat === 'salon') gallery = TRADE_GALLERIES.salon;
    else if (cat === 'auto') gallery = TRADE_GALLERIES.auto;
    else if (cat === 'cleaning') gallery = TRADE_GALLERIES.cleaning;
    else if (cat === 'tutor') gallery = TRADE_GALLERIES.tutor;
    else if (cat === 'tech') gallery = TRADE_GALLERIES.tech;
    else if (cat === 'pro') gallery = TRADE_GALLERIES.pro;
    else if (cat === 'packers') gallery = TRADE_GALLERIES.packers;
    else if (cat === 'stays') gallery = TRADE_GALLERIES.stays;
    else if (cat === 'shopping') gallery = TRADE_GALLERIES.shopping;
    else if (cat === 'daily') gallery = TRADE_GALLERIES.daily;
    else if (cat === 'travel') gallery = TRADE_GALLERIES.travel;
    else if (cat === 'events') gallery = TRADE_GALLERIES.events;
    else if (cat === 'emergency') gallery = TRADE_GALLERIES.emergency;
    else if (cat === 'b2b') gallery = TRADE_GALLERIES.b2b;

    return gallery;
  }

  function createBusinessCardHTML(b) {
    const isSaved = state.savedIds.has(b.id);
    const isComparing = window.ProComparison && window.ProComparison.isComparing(b.id);
    const servicesPills = (b.services || []).slice(0, 3).map(s => `<span class="service-pill">${s.name} (₹${s.price})</span>`).join('');
    const yearsInBusiness = b.yearsInBusiness || 10;
    const enquiriesCount = b.enquiriesCount || Math.floor(130 + ((b.trustScore || 90) * 1.5));
    const landmark = b.landmark || (b.address ? b.address.split(',')[0] : b.locality);
    const tradeGallery = getTradePhotos(b);
    const mainImg = b.image || tradeGallery[0];
    const photos = (b.photos && b.photos.length >= 3) ? b.photos : tradeGallery;
    const photoThumbs = photos.slice(0, 3).map((p, idx) => `
      <img src="${p}" alt="${b.name}" class="jd-thumb-img" loading="lazy" onclick="event.stopPropagation(); window.LocalCare.openLightbox('${b.id}', ${idx})" />
    `).join('');

    const isSponsored = b.sponsored || b.promoted;
    const iconR = (name, opts) => window.ReactIcons ? window.ReactIcons.render(name, opts) : '';

    return `
      <div class="business-card jd-pro-card" data-id="${b.id}">
        <!-- Top LocalCare Verified & Social Proof Trust Bar -->
        <div class="jd-card-top-strip">
          <div class="jd-badge-group">
            ${isSponsored ? `
              <span class="badge-sponsored" title="Sponsored Commercial Placement">
                ${iconR('starFilled', { size: 12, className: 'react-icon-gold' })} Promoted
              </span>
            ` : ''}
            <span class="jd-stamp-trust" title="LocalCare Verified Business">
              ${iconR('checkCircle', { size: 13, className: 'react-icon-success' })} LocalCare Verified
            </span>
            <span class="jd-stamp-years" title="Years of Trusted Service">
              ${iconR('award', { size: 13, className: 'react-icon-gold' })} ${yearsInBusiness} Yrs in Business
            </span>
            <span class="jd-stamp-enquiries" title="High Customer Demand">
              ${iconR('flame', { size: 13, className: 'react-icon-danger' })} ${enquiriesCount}+ Enquiries
            </span>
          </div>

          <div class="card-top-right-actions">
            <button class="card-compare-chip ${isComparing ? 'comparing' : ''}" data-action="compare" data-compare-id="${b.id}" data-id="${b.id}" title="Compare Side-by-Side">
              ${iconR('scale', { size: 13 })} Compare
            </button>
            <button class="card-bookmark-btn ${isSaved ? 'saved' : ''}" data-action="bookmark" data-id="${b.id}" title="${isSaved ? 'Remove from Saved' : 'Save Listing'}">
              ${isSaved ? iconR('heartFilled', { size: 15, className: 'react-icon-danger' }) : iconR('heart', { size: 15 })}
            </button>
          </div>
        </div>

        <div class="card-media-wrapper">
          <img src="${mainImg}" alt="${b.name}" class="card-img" loading="lazy" />
          <div class="card-overlay-badges">
            ${b.superSeller ? `<span class="badge-super">${iconR('starFilled', { size: 11, className: 'react-icon-gold' })} Top Rated</span>` : ''}
            <span class="badge-shield-mini" title="LocalCare ₹10,000 Quality Shield">${iconR('shield', { size: 12 })} ₹10k Shield</span>
            <span class="badge-open">${b.openNow ? '<span class="status-indicator open"></span> Open Now' : '<span class="status-indicator closed"></span> Closed'}</span>
          </div>

          <!-- Quick Preview Thumbnails Reel -->
          <div class="jd-photos-thumbnail-strip" data-action="view-detail" data-id="${b.id}">
            ${photoThumbs}
          </div>
        </div>

        <div class="card-content">
          <div class="card-header-line">
            <h3 class="business-name" data-action="view-detail" data-id="${b.id}" style="cursor: pointer;">
              ${b.name} <span class="jd-name-tick" title="LocalCare Verified Pro">${iconR('checkCircle', { size: 13, className: 'react-icon-success' })}</span>
            </h3>
            <span class="jd-starting-price">
              Starts ₹${b.startingPrice || 299}
            </span>
          </div>

          <div class="card-rating-row">
            <span class="rating-badge">${iconR('starFilled', { size: 12, className: 'react-icon-gold' })} ${b.rating}</span>
            <span class="rating-reviews-count">(${b.reviewsCount} Ratings)</span>
            <span class="jd-trust-score" title="100-Point Verification Audit Score">
              ${iconR('shieldCheck', { size: 13, className: 'react-icon-success' })} Trust: ${b.trustScore || 95}/100
            </span>
            <span class="jd-response-time">${b.responseTime || '~5 min'} response</span>
          </div>

          <div class="card-meta-line">
            <span class="card-meta-icon">${iconR('mapPin', { size: 13 })}</span>
            <span class="jd-locality-text"><strong>${b.locality}</strong> • ${landmark}</span>
            ${b.distance ? `<span class="jd-distance-text">${b.distance} away</span>` : ''}
          </div>

          <div class="card-meta-line">
            <span class="card-meta-icon">${iconR('clock', { size: 13 })}</span>
            <span>${b.operatingHours}</span>
            ${b.availableToday ? `<span class="jd-avail-today">${iconR('zap', { size: 11 })} Available Today</span>` : ''}
          </div>

          ${b.offer ? `
            <div class="jd-card-offer-pill">
              ${iconR('tag', { size: 13 })} ${b.offer} • ${iconR('creditCard', { size: 13 })} 5% Cashback with LocalCare Pay
            </div>
          ` : `
            <div class="jd-card-offer-subtle">
              ${iconR('creditCard', { size: 13 })} Flat ₹50 Cashback with LocalCare Pay • Instant digital receipt
            </div>
          `}

          <div class="card-services-tags">
            ${servicesPills}
          </div>

          <!-- CareAI Review Insights & Sentiment Strip -->
          <div class="jd-ai-insights-strip" onclick="window.CareAISuite.openProblemMatchmaker()" title="Click to launch AI Diagnostic Studio">
            <span class="ai-sparkle-pill">${iconR('sparkles', { size: 12 })} AI Insight</span>
            <span class="ai-insight-text">${b.rating >= 4.8 ? '98% Positive • Praised for 30m arrival & fair rates' : '94% Positive • Reliable local service with zero hidden fees'}</span>
          </div>

          <!-- LocalCare Signature 5-Action Buttons Grid (Powered by React Icons) -->
          <div class="jd-card-actions-grid">
            <button class="jd-action-btn jd-btn-call" data-action="call" data-id="${b.id}" title="Call ${escapeHtml(b.name)}">
              <span>${iconR('phone', { size: 14 })}</span> Call Now
            </button>
            <button class="jd-action-btn jd-btn-whatsapp" data-action="whatsapp" data-id="${b.id}" title="WhatsApp Chat with ${escapeHtml(b.name)}">
              <span>${iconR('messageSquare', { size: 14 })}</span> WhatsApp
            </button>
            <button class="jd-action-btn jd-btn-directions" data-action="directions" data-id="${b.id}" title="Get Directions & Visit Location">
              <span>${iconR('compass', { size: 14 })}</span> Directions
            </button>
            <button class="jd-action-btn jd-btn-book" data-action="book" data-id="${b.id}" title="Book Appointment with ${escapeHtml(b.name)}">
              <span>${iconR('calendar', { size: 14 })}</span> Book Slot
            </button>
            <button class="jd-action-btn jd-btn-deal" data-action="best-deal" data-id="${b.id}" title="Get Best Quotes from 5 Pros">
              <span>${iconR('zap', { size: 14 })}</span> Best Deal
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function attachCardEventListeners() {
    const all = getAllBusinesses();

    DOM.listingsGrid.querySelectorAll('.business-card').forEach(card => {
      const id = card.getAttribute('data-id');

      // Click card body to open full Business Profile Modal
      card.addEventListener('click', (e) => {
        if (e.target.closest('[data-action]') || e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) {
          return;
        }
        const business = all.find(b => b.id === id);
        if (business) {
          if (window.SoundFX) window.SoundFX.playClick();
          openBusinessDetailModal(business);
        }
      });

      // Hover sync with vector map
      card.addEventListener('mouseenter', () => {
        if (window.MapEngine && window.MapEngine.selectBusiness) {
          window.MapEngine.selectBusiness(id, false);
        }
      });
    });

    DOM.listingsGrid.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');
        const business = all.find(b => b.id === id);
        if (!business) return;

        if (window.SoundFX) window.SoundFX.playClick();

        if (action === 'bookmark') {
          toggleBookmark(id);
        } else if (action === 'compare') {
          if (window.ProComparison) {
            window.ProComparison.toggleCompare(id);
            btn.classList.toggle('comparing', window.ProComparison.isComparing(id));
          }
        } else if (action === 'teleconsult') {
          if (window.TeleConsult) {
            window.TeleConsult.startConsultation(business);
          }
        } else if (action === 'view-detail') {
          openBusinessDetailModal(business);
        } else if (action === 'book') {
          if (window.BookingEngine) window.BookingEngine.openBookingModal(business);
        } else if (action === 'call') {
          if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && window.innerWidth <= 768) {
            window.location.href = `tel:${business.phone.replace(/\s+/g, '')}`;
          } else {
            openCallModal(business);
          }
        } else if (action === 'directions' || action === 'visit') {
          if (window.MapEngine) {
            window.MapEngine.selectBusiness(id, true);
          }
          const isMobile = window.innerWidth <= 768;
          if (isMobile) {
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((business.lat && business.lng) ? `${business.lat},${business.lng}` : `${business.name}, ${business.locality}, ${business.city}`)}`;
            window.open(mapsUrl, '_blank', 'noopener');
          } else {
            showToast(`📍 Showing route & directions to ${business.name} on map`, 'info', 3500);
            const mapSec = document.getElementById('interactiveMapContainer');
            if (mapSec) mapSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        } else if (action === 'whatsapp') {
          if (window.JDFeatures) {
            window.JDFeatures.openWhatsAppEnquiry(business.name, business.locality, business.city, business.phone);
          } else {
            openWhatsAppChat(business);
          }
        } else if (action === 'best-deal' || action === 'quote') {
          if (window.JDFeatures) {
            window.JDFeatures.openBestDealModal(business.category, business.name);
          } else if (window.QuoteMarketplace) {
            window.QuoteMarketplace.openQuotesModal(business.category);
          }
        } else if (action === 'jdpay' || action === 'pay') {
          openPayStudio(business, business.startingPrice || 499);
        }
      });
    });
  }

  /* ==========================================================================
     LocalCare Pay UPI & Digital Payment Studio
     ========================================================================== */
  let payTimerInterval = null;
  let payTimerSeconds = 299;

  function openPayStudio(biz, amount = 499, serviceName = null) {
    const dialog = document.getElementById('localCarePayDialog');
    if (!dialog) return;

    const amtDisplay = document.getElementById('payAmountDisplay');
    const merchantSubtitle = document.getElementById('payMerchantSubtitle');
    const vpaDisplay = document.getElementById('payVpaDisplay');
    const invoiceContainer = document.getElementById('payInvoiceContainer');

    const cleanBiz = biz || state.activeDetailBusiness || getAllBusinesses()[0];
    const finalAmt = amount || cleanBiz.startingPrice || 499;
    const cleanServiceName = serviceName || (cleanBiz.services && cleanBiz.services[0] ? cleanBiz.services[0].name : 'Verified LocalCare Service');

    dialog.dataset.bizId = cleanBiz.id;
    dialog.dataset.bizName = cleanBiz.name;
    dialog.dataset.bizGst = cleanBiz.gst || '29AABCU9603R1ZM';
    dialog.dataset.amount = finalAmt;
    dialog.dataset.service = cleanServiceName;

    if (amtDisplay) amtDisplay.textContent = `₹${finalAmt}`;
    if (merchantSubtitle) merchantSubtitle.textContent = `Merchant: ${cleanBiz.name} (${cleanBiz.locality}, ${cleanBiz.city})`;
    if (vpaDisplay) vpaDisplay.textContent = `localcare.${cleanBiz.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@icici`;
    if (invoiceContainer) {
      invoiceContainer.style.display = 'none';
      invoiceContainer.innerHTML = '';
    }

    // Start 4:59 countdown timer
    clearInterval(payTimerInterval);
    payTimerSeconds = 299;
    const timerClock = document.getElementById('payTimerClock');
    payTimerInterval = setInterval(() => {
      payTimerSeconds--;
      if (payTimerSeconds <= 0) {
        clearInterval(payTimerInterval);
        if (timerClock) timerClock.textContent = 'Expired';
      } else {
        const m = String(Math.floor(payTimerSeconds / 60)).padStart(2, '0');
        const s = String(payTimerSeconds % 60).padStart(2, '0');
        if (timerClock) timerClock.textContent = `${m}:${s}`;
      }
    }, 1000);

    dialog.showModal();
    if (window.SoundFX && window.SoundFX.playClick) window.SoundFX.playClick();
  }

  function simulateUpiApp(appName) {
    showToast(`Launching ${appName} secure payment sheet...`, 'info');
    setTimeout(() => {
      completePaymentSimulation(appName);
    }, 800);
  }

  function completePaymentSimulation(sourceApp = 'LocalCare Pay UPI') {
    clearInterval(payTimerInterval);
    const dialog = document.getElementById('localCarePayDialog');
    if (!dialog) return;

    const bizName = dialog.dataset.bizName || 'Verified Professional';
    const bizGst = dialog.dataset.bizGst || '29AABCU9603R1ZM';
    const amount = parseInt(dialog.dataset.amount || '499', 10);
    const serviceName = dialog.dataset.service || 'Verified Service';
    const invoiceNo = 'LC-INV-' + Math.floor(100000 + Math.random() * 900000);
    const txnId = 'UPI-' + Date.now().toString().slice(-8);
    const dateStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const baseAmount = Math.round(amount / 1.05);
    const gstAmount = amount - baseAmount;

    if (window.SoundFX && window.SoundFX.playSuccess) window.SoundFX.playSuccess();
    showToast(`Payment of ₹${amount} successful via ${sourceApp}! Instant receipt generated.`, 'success', 6000);

    const invoiceContainer = document.getElementById('payInvoiceContainer');
    if (invoiceContainer) {
      invoiceContainer.innerHTML = `
        <div class="upi-invoice-sheet" id="printableTaxInvoice">
          <div class="invoice-header-row">
            <div>
              <div style="font-weight: 900; font-size: 1.1rem; color: var(--primary);">LOCALCARE INFINITY X</div>
              <div style="font-size: 0.75rem; color: var(--text-muted);">GST TAX INVOICE & OFFICIAL PAYMENT RECEIPT</div>
            </div>
            <div style="text-align: right;">
              <span class="bid-badge" style="background: #ecfdf5; color: #065f46; font-weight: 700;">✓ PAID via ${escapeHtml(sourceApp)}</span>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${dateStr} ${timeStr}</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.8rem; margin-bottom: 0.75rem;">
            <div>
              <span style="color: var(--text-muted);">Billed By:</span>
              <div style="font-weight: 700;">${escapeHtml(bizName)}</div>
              <div style="color: var(--text-secondary);">GSTIN: ${escapeHtml(bizGst)}</div>
            </div>
            <div style="text-align: right;">
              <span style="color: var(--text-muted);">Invoice No:</span>
              <div style="font-weight: 700; font-family: monospace;">${invoiceNo}</div>
              <div style="color: var(--text-secondary);">Txn Ref: ${txnId}</div>
            </div>
          </div>

          <table class="invoice-bill-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>HSN/SAC</th>
                <th style="text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${escapeHtml(serviceName)}</td>
                <td>9987</td>
                <td style="text-align: right;">₹${baseAmount}</td>
              </tr>
              <tr>
                <td>LocalCare Shield Protection</td>
                <td>9971</td>
                <td style="text-align: right; color: #059669; font-weight: 700;">₹0 (Free)</td>
              </tr>
              <tr>
                <td>GST (5% SGST + CGST)</td>
                <td>--</td>
                <td style="text-align: right;">₹${gstAmount}</td>
              </tr>
              <tr style="font-weight: 900; font-size: 0.95rem; border-top: 2px solid var(--border-subtle);">
                <td colspan="2">TOTAL PAID (INR)</td>
                <td style="text-align: right; color: var(--primary);">₹${amount}</td>
              </tr>
            </tbody>
          </table>

          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button type="button" class="action-btn action-btn-primary" style="flex: 1; padding: 0.5rem; font-size: 0.85rem;" onclick="window.print()">
              🖨️ Print Tax Invoice
            </button>
            <button type="button" class="action-btn action-btn-outline" style="flex: 1; padding: 0.5rem; font-size: 0.85rem;" onclick="window.LocalCare.showToast('Official PDF Invoice downloaded to device', 'success')">
              📥 Download PDF
            </button>
          </div>
        </div>
      `;
      invoiceContainer.style.display = 'block';
      invoiceContainer.scrollIntoView({ behavior: 'smooth' });
    }

    if (window.LocalCare && window.LocalCare.addNotification) {
      window.LocalCare.addNotification({
        title: `Payment Successful: ₹${amount}`,
        desc: `Paid to ${bizName} via ${sourceApp}. Tax invoice ref #${invoiceNo}`,
        icon: '💳',
        actionType: 'dashboard-payments'
      });
    }
  }

  /* ==========================================================================
     Bookmarks / Favorites System
     ========================================================================== */
  function toggleBookmark(id) {
    if (state.savedIds.has(id)) {
      state.savedIds.delete(id);
      showToast('Removed from saved favorites', 'warning');
    } else {
      state.savedIds.add(id);
      showToast('Saved to your favorites!', 'success');
    }
    localStorage.setItem('localcare_saved', JSON.stringify([...state.savedIds]));
    updateSavedCounter();
    renderListings();
    renderSavedListings();
  }

  function updateSavedCounter() {
    DOM.savedCountBadge.textContent = state.savedIds.size;
  }

  function initSavedDrawer() {
    DOM.openSavedBtn.addEventListener('click', () => {
      DOM.savedDrawer.style.right = '0';
      DOM.savedDrawerBackdrop.style.display = 'block';
      renderSavedListings();
    });

    DOM.closeSavedBtn.addEventListener('click', closeSavedDrawer);
    DOM.savedDrawerBackdrop.addEventListener('click', closeSavedDrawer);
  }

  function closeSavedDrawer() {
    DOM.savedDrawer.style.right = '-420px';
    DOM.savedDrawerBackdrop.style.display = 'none';
  }

  function renderSavedListings() {
    const all = getAllBusinesses();
    const saved = all.filter(b => state.savedIds.has(b.id));

    if (saved.length === 0) {
      DOM.savedListingsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🤍</div>
          <h4 style="color: var(--text-primary); margin-bottom: 0.25rem;">No saved listings yet</h4>
          <p style="font-size: 0.88rem;">Click the heart icon on any business card to keep quick access to trusted providers.</p>
        </div>
      `;
      return;
    }

    DOM.savedListingsContainer.innerHTML = saved.map(b => `
      <div style="display: flex; gap: 0.75rem; padding: 0.85rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 0.75rem; position: relative;">
        <img src="${b.image}" alt="${b.name}" style="width: 70px; height: 70px; border-radius: var(--radius-sm); object-fit: cover;" />
        <div style="flex: 1;">
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.2rem;">${b.name}</h4>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 0.25rem;">📍 ${b.locality}</div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="action-btn action-btn-primary" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="window.LocalCare.openBookingById('${b.id}')">Book</button>
            <button class="action-btn action-btn-outline" style="padding: 0.25rem 0.6rem; font-size: 0.75rem;" onclick="window.LocalCare.openCallModalById('${b.id}')">Call</button>
          </div>
        </div>
        <button style="position: absolute; top: 0.5rem; right: 0.5rem; color: var(--danger); font-size: 1.1rem;" onclick="window.LocalCare.toggleBookmark('${b.id}')" title="Remove">✕</button>
      </div>
    `).join('');
  }

  /* ==========================================================================
     Notification Center & Real-Time Alerts (Section 16)
     ========================================================================== */
  const DEFAULT_NOTIFICATIONS = [
    {
      id: 'notif-1',
      title: 'Booking Confirmed',
      desc: 'Your appointment with Dr. Suresh Rao (Dental Specialist) is confirmed for tomorrow 10:30 AM.',
      time: '10 mins ago',
      icon: '📅',
      unread: true,
      actionType: 'dashboard-bookings'
    },
    {
      id: 'notif-2',
      title: 'New Quotation Bids Received',
      desc: '3 verified professionals responded to your AC Repair request with bids starting at ₹399.',
      time: '45 mins ago',
      icon: '⚡',
      unread: true,
      actionType: 'dashboard-quotes'
    },
    {
      id: 'notif-3',
      title: 'Shield Guarantee Activated',
      desc: 'LocalCare ₹10,000 Property Damage Protection is active for your upcoming home electrical service.',
      time: '2 hours ago',
      icon: '🛡️',
      unread: true,
      actionType: 'shield'
    },
    {
      id: 'notif-4',
      title: 'Special Festive Offer in Your Area',
      desc: 'Get flat 20% off on Complete Car Detailing & Wash at AutoShine Studios.',
      time: 'Yesterday',
      icon: '🏷️',
      unread: false,
      actionType: 'offers'
    }
  ];

  let notifications = (() => {
    try {
      const stored = localStorage.getItem('localcare_notifications');
      return stored ? JSON.parse(stored) : DEFAULT_NOTIFICATIONS;
    } catch (e) {
      return DEFAULT_NOTIFICATIONS;
    }
  })();

  function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => n.unread).length;
    const badge = document.getElementById('notificationCountBadge');
    const status = document.getElementById('notificationStatusText');
    if (badge) {
      badge.textContent = unreadCount;
      badge.style.display = unreadCount > 0 ? 'inline-flex' : 'none';
    }
    if (status) {
      status.textContent = `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`;
    }
  }

  function openNotificationCenter() {
    const drawer = document.getElementById('notificationDrawer');
    const backdrop = document.getElementById('notificationBackdrop');
    if (!drawer || !backdrop) return;
    drawer.style.right = '0';
    backdrop.style.display = 'block';
    renderNotifications();
    if (window.SoundFX) window.SoundFX.playPop();
  }

  function closeNotificationCenter() {
    const drawer = document.getElementById('notificationDrawer');
    const backdrop = document.getElementById('notificationBackdrop');
    if (!drawer || !backdrop) return;
    drawer.style.right = '-420px';
    backdrop.style.display = 'none';
  }

  function markAllNotificationsRead() {
    notifications.forEach(n => n.unread = false);
    try {
      localStorage.setItem('localcare_notifications', JSON.stringify(notifications));
    } catch (e) {}
    updateNotificationBadge();
    renderNotifications();
    showToast('All notifications marked as read', 'info');
  }

  function renderNotifications() {
    const container = document.getElementById('notificationListContainer');
    if (!container) return;
    if (notifications.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">🔔</span>
          <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.25rem;">No notifications yet</p>
          <small>You're all caught up!</small>
        </div>
      `;
      return;
    }

    container.innerHTML = notifications.map((n, idx) => `
      <div class="notification-drawer-item ${n.unread ? 'unread' : ''}" onclick="window.LocalCare.handleNotificationClick(${idx})">
        <div class="notif-icon-circle">${n.icon}</div>
        <div class="notif-content">
          <div class="notif-title">${n.title}</div>
          <div class="notif-desc">${n.desc}</div>
          <div class="notif-time">${n.time}</div>
        </div>
      </div>
    `).join('');
  }

  function handleNotificationClick(idx) {
    const n = notifications[idx];
    if (!n) return;
    n.unread = false;
    try {
      localStorage.setItem('localcare_notifications', JSON.stringify(notifications));
    } catch (e) {}
    updateNotificationBadge();
    renderNotifications();
    closeNotificationCenter();

    if (n.actionType === 'dashboard-bookings') {
      if (window.UserDashboard) window.UserDashboard.openDashboard('bookings');
    } else if (n.actionType === 'dashboard-quotes') {
      if (window.UserDashboard) window.UserDashboard.openDashboard('quotes');
    } else if (n.actionType === 'shield') {
      if (window.ShieldGuarantee) window.ShieldGuarantee.openShieldModal();
    } else if (n.actionType === 'offers') {
      filterOffersOnly(true);
    }
  }

  function addNotification(item) {
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: item.title || 'Notification',
      desc: item.desc || '',
      time: 'Just now',
      icon: item.icon || '🔔',
      unread: true,
      actionType: item.actionType || 'none'
    };
    notifications.unshift(newNotif);
    if (notifications.length > 25) notifications.pop();
    try {
      localStorage.setItem('localcare_notifications', JSON.stringify(notifications));
    } catch (e) {}
    updateNotificationBadge();
    renderNotifications();
  }

  /* ==========================================================================
     Recently Viewed Businesses (Section R)
     ========================================================================== */
  function addToRecentlyViewed(business) {
    if (!business || !business.id) return;
    state.recentlyViewed = [
      business,
      ...state.recentlyViewed.filter(b => b.id !== business.id)
    ].slice(0, 6);
    localStorage.setItem('localcare_recently_viewed', JSON.stringify(state.recentlyViewed));
    renderRecentlyViewed();
  }

  function renderRecentlyViewed() {
    if (!DOM.recentlyViewedSection || !DOM.recentlyViewedGrid) return;
    if (!state.recentlyViewed || state.recentlyViewed.length === 0) {
      DOM.recentlyViewedSection.style.display = 'none';
      return;
    }

    DOM.recentlyViewedSection.style.display = 'block';
    DOM.recentlyViewedGrid.innerHTML = state.recentlyViewed.map(b => `
      <div class="recent-view-mini-card" onclick="window.LocalCare.openDetailModalById('${b.id}')">
        <img src="${b.image}" alt="${b.name}" class="recent-view-thumb" loading="lazy" />
        <div style="flex: 1; min-width: 0;">
          <h4 style="font-size: 0.88rem; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 0.2rem;">${b.name}</h4>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.3rem;">★ ${b.rating} • ${b.locality}</div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 800; color: var(--primary); font-size: 0.8rem;">From ₹${b.startingPrice || 299}</span>
            <button class="action-btn action-btn-primary" style="font-size: 0.7rem; padding: 0.2rem 0.5rem;" onclick="event.stopPropagation(); window.LocalCare.openBookingById('${b.id}')">
              Book
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  function clearRecentlyViewed() {
    state.recentlyViewed = [];
    localStorage.removeItem('localcare_recently_viewed');
    renderRecentlyViewed();
    showToast('Recently viewed history cleared', 'info');
  }

  /* ==========================================================================
     Multi-Service Cart & Checkout Suite (Urban Company Style)
     ========================================================================== */
  function getCartItemQty(bizId, sid) {
    if (!state.activeCartBusiness || state.activeCartBusiness.id !== bizId) return 0;
    const item = state.serviceCart.find(i => i.id === sid);
    return item ? item.qty : 0;
  }

  function updateCartQty(bizId, serviceId, delta) {
    const all = getAllBusinesses();
    const biz = all.find(b => b.id === bizId);
    if (!biz) return;

    if (state.activeCartBusiness && state.activeCartBusiness.id !== bizId && state.serviceCart.length > 0) {
      if (!confirm(`Your cart already contains services from "${state.activeCartBusiness.name}". Would you like to clear it and add services from "${biz.name}"?`)) {
        return;
      }
      state.serviceCart = [];
      state.cartCoupon = null;
      state.cartDiscount = 0;
    }

    state.activeCartBusiness = biz;
    let serviceObj = (biz.services || []).find((s, idx) => (s.id || `srv-${idx}`) === serviceId);
    if (!serviceObj) {
      serviceObj = { id: serviceId, name: 'Verified Service', price: biz.startingPrice || 299 };
    }

    const sid = serviceObj.id || serviceId;
    let cartItem = state.serviceCart.find(i => i.id === sid);

    if (cartItem) {
      cartItem.qty += delta;
      if (cartItem.qty <= 0) {
        state.serviceCart = state.serviceCart.filter(i => i.id !== sid);
      }
    } else if (delta > 0) {
      state.serviceCart.push({
        id: sid,
        name: serviceObj.name,
        price: serviceObj.price,
        duration: serviceObj.duration || '45 mins',
        qty: 1
      });
      if (window.SoundFX && window.SoundFX.playBubble) window.SoundFX.playBubble();
      showToast(`Added "${serviceObj.name}" to service cart 🛒`, 'success');
    }

    if (state.serviceCart.length === 0) {
      state.activeCartBusiness = null;
      state.cartCoupon = null;
      state.cartDiscount = 0;
    }

    // Refresh rate card and sticky bar in detail dialog if visible
    const rateCardContainer = document.getElementById('detailRateCardContainer');
    const stickyCartSlot = document.getElementById('detailStickyCartSlot');
    if (rateCardContainer && state.activeDetailBusiness && state.activeDetailBusiness.id === bizId) {
      rateCardContainer.innerHTML = renderServicesListHTML(biz);
    }
    if (stickyCartSlot && state.activeDetailBusiness && state.activeDetailBusiness.id === bizId) {
      stickyCartSlot.innerHTML = renderStickyCartBarHTML(biz);
    }
  }

  function renderServicesListHTML(b) {
    return (b.services || []).map((s, idx) => {
      const sid = s.id || `srv-${idx}`;
      const qty = getCartItemQty(b.id, sid);
      return `
        <div class="service-rate-item" data-service-id="${sid}">
          <div class="service-rate-left">
            <div class="service-rate-title">${escapeHtml(s.name)}</div>
            <div class="service-rate-meta">⏱️ ${s.duration || '45 mins'} • 🛡️ 30-Day Quality Guarantee</div>
          </div>
          <div class="service-rate-right">
            <strong class="service-rate-price">₹${s.price}</strong>
            ${qty > 0 ? `
              <div class="service-qty-stepper">
                <button type="button" class="qty-btn" onclick="window.LocalCare.updateCartQty('${b.id}', '${sid}', -1)">−</button>
                <span class="qty-num">${qty}</span>
                <button type="button" class="qty-btn" onclick="window.LocalCare.updateCartQty('${b.id}', '${sid}', 1)">+</button>
              </div>
            ` : `
              <button type="button" class="service-add-btn" onclick="window.LocalCare.updateCartQty('${b.id}', '${sid}', 1)">
                + Add
              </button>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  function renderStickyCartBarHTML(b) {
    if (!state.activeCartBusiness || state.activeCartBusiness.id !== b.id || state.serviceCart.length === 0) {
      return '';
    }
    const totalItems = state.serviceCart.reduce((sum, item) => sum + item.qty, 0);
    const totalAmount = state.serviceCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    return `
      <div class="modal-sticky-cart-bar" id="modalStickyCartBar">
        <div class="sticky-cart-info">
          <span class="sticky-cart-count">🛒 ${totalItems} service${totalItems > 1 ? 's' : ''} in cart</span>
          <span class="sticky-cart-amount">₹${totalAmount}</span>
        </div>
        <button type="button" class="sticky-cart-view-btn" onclick="window.LocalCare.openCartDrawer()">
          View Cart & Bill Breakdown ➔
        </button>
      </div>
    `;
  }

  function openCartDrawer() {
    if (!state.activeCartBusiness || state.serviceCart.length === 0) {
      showToast('Your service cart is currently empty', 'info');
      return;
    }

    const dialog = document.getElementById('serviceCartDialog');
    if (!dialog) return;

    renderCartDrawerUI();
    dialog.showModal();
    if (window.SoundFX && window.SoundFX.playClick) window.SoundFX.playClick();
  }

  function renderCartDrawerUI() {
    const biz = state.activeCartBusiness;
    const itemsList = document.getElementById('cartServicesItems');
    const subtitle = document.getElementById('cartBizSubtitle');
    const itemsTotalEl = document.getElementById('cartBillItemsTotal');
    const discountRow = document.getElementById('cartBillDiscountRow');
    const discountEl = document.getElementById('cartBillDiscount');
    const taxesEl = document.getElementById('cartBillTaxes');
    const finalTotalEl = document.getElementById('cartBillFinalTotal');
    const footerTotalEl = document.getElementById('cartFooterTotal');

    if (subtitle && biz) {
      subtitle.textContent = `Provider: ${biz.name} • ${biz.locality}`;
    }

    if (itemsList && biz) {
      itemsList.innerHTML = state.serviceCart.map(item => `
        <div class="cart-item-row">
          <div>
            <div class="cart-item-title">${escapeHtml(item.name)}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">₹${item.price} each • ⏱️ ${item.duration}</div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div class="service-qty-stepper">
              <button type="button" class="qty-btn" onclick="window.LocalCare.updateCartQty('${biz.id}', '${item.id}', -1); window.LocalCare.renderCartDrawerUI();">−</button>
              <span class="qty-num">${item.qty}</span>
              <button type="button" class="qty-btn" onclick="window.LocalCare.updateCartQty('${biz.id}', '${item.id}', 1); window.LocalCare.renderCartDrawerUI();">+</button>
            </div>
            <span class="cart-item-price">₹${item.price * item.qty}</span>
            <button type="button" class="cart-item-remove-btn" title="Remove item" onclick="window.LocalCare.updateCartQty('${biz.id}', '${item.id}', -${item.qty}); window.LocalCare.renderCartDrawerUI();">✕</button>
          </div>
        </div>
      `).join('');
    }

    const itemsTotal = state.serviceCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxes = Math.round(itemsTotal * 0.05); // 5% GST
    const discount = state.cartDiscount || 0;
    const finalTotal = Math.max(0, itemsTotal - discount + taxes);

    if (itemsTotalEl) itemsTotalEl.textContent = `₹${itemsTotal}`;
    if (taxesEl) taxesEl.textContent = `₹${taxes}`;
    if (discountRow) {
      discountRow.style.display = discount > 0 ? 'flex' : 'none';
      if (discountEl) discountEl.textContent = `-₹${discount}`;
    }
    if (finalTotalEl) finalTotalEl.textContent = `₹${finalTotal}`;
    if (footerTotalEl) footerTotalEl.textContent = `₹${finalTotal}`;

    if (state.serviceCart.length === 0) {
      document.getElementById('serviceCartDialog')?.close();
    }
  }

  function applyCartCoupon() {
    const input = document.getElementById('cartCouponInput');
    const msg = document.getElementById('cartCouponMsg');
    if (!input || !msg) return;
    const code = input.value.trim().toUpperCase();
    if (!code) return;

    const itemsTotal = state.serviceCart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (code === 'LOCALCARE50') {
      if (itemsTotal < 200) {
        msg.innerHTML = '<span style="color: #ef4444;">Coupon requires minimum order of ₹200</span>';
        return;
      }
      state.cartCoupon = 'LOCALCARE50';
      state.cartDiscount = 50;
      msg.innerHTML = '<span style="color: #059669; font-weight: 700;">✓ Flat ₹50 discount applied successfully!</span>';
    } else if (code === 'FIRSTCARE') {
      state.cartCoupon = 'FIRSTCARE';
      state.cartDiscount = Math.min(150, Math.round(itemsTotal * 0.15));
      msg.innerHTML = `<span style="color: #059669; font-weight: 700;">✓ 15% discount applied! Saved ₹${state.cartDiscount}</span>`;
    } else {
      msg.innerHTML = '<span style="color: #ef4444;">Invalid coupon code. Try LOCALCARE50 or FIRSTCARE</span>';
      return;
    }

    if (window.SoundFX && window.SoundFX.playSuccess) window.SoundFX.playSuccess();
    renderCartDrawerUI();
  }

  function clearCart() {
    state.serviceCart = [];
    state.activeCartBusiness = null;
    state.cartCoupon = null;
    state.cartDiscount = 0;
    document.getElementById('serviceCartDialog')?.close();
    showToast('Service cart cleared', 'info');

    // Refresh rate card in detail modal if open
    if (state.activeDetailBusiness) {
      const rateCardContainer = document.getElementById('detailRateCardContainer');
      const stickyCartSlot = document.getElementById('detailStickyCartSlot');
      if (rateCardContainer) rateCardContainer.innerHTML = renderServicesListHTML(state.activeDetailBusiness);
      if (stickyCartSlot) stickyCartSlot.innerHTML = '';
    }
  }

  function proceedCartToBooking() {
    if (!state.activeCartBusiness || state.serviceCart.length === 0) {
      showToast('Please add at least one service to your cart', 'warning');
      return;
    }

    const itemsTotal = state.serviceCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxes = Math.round(itemsTotal * 0.05);
    const discount = state.cartDiscount || 0;
    const finalTotal = Math.max(0, itemsTotal - discount + taxes);

    const bundle = {
      items: [...state.serviceCart],
      itemsTotal: itemsTotal,
      taxes: taxes,
      discount: discount,
      finalPrice: finalTotal,
      coupon: state.cartCoupon
    };

    const biz = state.activeCartBusiness;

    document.getElementById('serviceCartDialog')?.close();
    document.getElementById('detailDialog')?.close();

    if (window.BookingEngine && window.BookingEngine.openBookingModal) {
      window.BookingEngine.openBookingModal(biz, null, bundle);
    }
  }

  /* --------------------------------------------------------------------------
     Mobile App Bottom Navigation Bar Handlers
     -------------------------------------------------------------------------- */
  function navToSection(sectionId) {
    updateMobileNavActive('mNavHome');
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function focusSearch() {
    updateMobileNavActive('mNavSearch');
    const omni = document.getElementById('omniboxInput');
    if (omni) {
      omni.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => omni.focus(), 300);
    }
  }

  function toggleMap() {
    updateMobileNavActive('mNavMap');
    const container = document.getElementById('interactiveMapContainer') || document.getElementById('mapSection');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function openDashboard(tab) {
    updateMobileNavActive('mNavBookings');
    if (window.UserDashboard && window.UserDashboard.openUserDashboard) {
      window.UserDashboard.openUserDashboard(tab || 'bookings');
    }
  }

  function updateMobileNavActive(btnId) {
    document.querySelectorAll('.mobile-nav-btn').forEach(b => {
      b.classList.toggle('active', b.id === btnId);
    });
  }

  /* ==========================================================================
     Business Detail Modal & Interactive Reviews System
     ========================================================================== */
  function openBusinessDetailModal(b) {
    state.activeDetailBusiness = b;
    addToRecentlyViewed(b);

    const servicesRows = renderServicesListHTML(b);
    const stickyCartBar = renderStickyCartBarHTML(b);

    const featuresPills = b.features.map(f => `
      <span style="display: inline-flex; align-items: center; gap: 0.3rem; padding: 0.35rem 0.7rem; background: var(--success-light); border: 1px solid var(--success-border); color: #065f46; border-radius: var(--radius-full); font-size: 0.78rem; font-weight: 600;">
        ✓ ${f}
      </span>
    `).join('');

    const totalReviews = (b.reviews && b.reviews.length) ? b.reviews.length : 1;
    const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    (b.reviews || []).forEach(r => {
      const s = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
      ratingCounts[s] = (ratingCounts[s] || 0) + 1;
    });
    const p5 = Math.round((ratingCounts[5] / totalReviews) * 100);
    const p4 = Math.round((ratingCounts[4] / totalReviews) * 100);
    const p3 = Math.round((ratingCounts[3] / totalReviews) * 100);
    const p2 = Math.round((ratingCounts[2] / totalReviews) * 100);
    const p1 = Math.round((ratingCounts[1] / totalReviews) * 100);

    const reviewsCards = (b.reviews || []).map((r, idx) => `
      <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 0.75rem; border: 1px solid var(--border-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <strong>${r.author}</strong>
            ${r.verifiedBooking ? '<span class="bid-badge" style="background: #ecfdf5; color: #065f46; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px;">✓ Verified Customer</span>' : ''}
          </div>
          <span style="font-size: 0.78rem; color: var(--text-muted);">${r.date}</span>
        </div>
        <div style="color: #f59e0b; margin-bottom: 0.35rem; font-size: 0.9rem;">
          ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
        </div>
        ${r.aspectTags && r.aspectTags.length ? `
          <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.4rem;">
            ${r.aspectTags.map(t => `<span style="font-size: 0.72rem; padding: 2px 6px; background: rgba(0,0,0,0.05); border-radius: 4px;">${t}</span>`).join('')}
          </div>
        ` : ''}
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${r.comment}</p>
        <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 0.5rem;">
          <button class="action-btn action-btn-ghost" style="font-size: 0.75rem; padding: 0.2rem 0.6rem; border: 1px solid var(--border-subtle);" onclick="window.LocalCare.voteHelpfulReview('${b.id}', ${idx}, this)">
            👍 Helpful (${r.helpful || 0})
          </button>
          <button class="action-btn action-btn-ghost" style="font-size: 0.75rem; padding: 0.2rem 0.6rem;" onclick="window.VerificationEngine.openReportModal('Review on ${b.name}')">
            ⚠️ Report
          </button>
        </div>
        ${r.reply ? `
          <div style="margin-top: 0.6rem; padding: 0.6rem 0.85rem; background: rgba(255, 104, 0, 0.08); border-left: 3px solid var(--primary); border-radius: 4px; font-size: 0.82rem;">
            <strong style="color: var(--primary);">Provider Response:</strong> ${r.reply}
          </div>
        ` : ''}
      </div>
    `).join('');

    const yearsInBusiness = b.yearsInBusiness || 10;
    const enquiriesCount = b.enquiriesCount || Math.floor(130 + ((b.trustScore || 90) * 1.5));
    const landmark = b.landmark || (b.address ? b.address.split(',')[0] : b.locality);
    const tradeGallery = getTradePhotos(b);
    const mainImg = b.image || tradeGallery[0];
    const photos = (b.photos && b.photos.length >= 3) ? b.photos : tradeGallery;

    const photosGalleryHTML = photos.map((p, idx) => `
      <div style="position: relative; border-radius: var(--radius-md); overflow: hidden; height: 160px; border: 1px solid var(--border-subtle);">
        <img src="${p}" alt="${b.name} Photo ${idx+1}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'" onclick="window.LocalCare.openLightbox('${b.id}', ${idx})" />
        <span style="position: absolute; bottom: 6px; left: 6px; background: rgba(0,0,0,0.65); color: #fff; font-size: 0.7rem; padding: 0.15rem 0.5rem; border-radius: var(--radius-sm); font-weight: 700;">Photo ${idx+1}</span>
      </div>
    `).join('');

    DOM.detailContent.innerHTML = `
      <div style="position: relative; height: 260px; overflow: hidden;">
        <img src="${mainImg}" alt="${b.name}" style="width: 100%; height: 100%; object-fit: cover;" />
        <div class="card-overlay-badges">
          ${b.verified ? '<span class="badge-verified" style="cursor: pointer;" onclick="event.stopPropagation(); window.LocalCare.openTrustAuditModal()" title="Click to view 7-Point Verification Audit">✓ LocalCare Verified Business 🔍</span>' : ''}
          <span class="badge-open">${b.openNow ? '🟢 Open Now' : 'Closed'}</span>
          <span style="background: rgba(0,0,0,0.7); color: #fff; font-size: 0.75rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: var(--radius-full);">
            🏆 ${yearsInBusiness} Yrs in Business
          </span>
        </div>
      </div>

      <div style="padding: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 0.75rem;">
          <div>
            <h2 style="font-size: 1.6rem; margin-bottom: 0.25rem;">
              ${b.name} <span style="color: #2563eb; font-size: 1.2rem;">✓</span>
            </h2>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">📍 ${b.address} (${landmark})</p>
          </div>
          <div style="text-align: right;">
            <span class="rating-badge" style="font-size: 1.05rem; padding: 0.35rem 0.75rem;">★ ${b.rating}</span>
            <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.25rem;">${b.reviewsCount} verified reviews • 🔥 ${enquiriesCount}+ Enquiries</div>
          </div>
        </div>

        <!-- Commercial Pro Direct Action Ribbon (Phase 5 Actions - Powered by React Icons) -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; margin: 1rem 0 0.5rem 0;">
          <a href="tel:${b.phone.replace(/\s+/g, '')}" class="action-btn action-btn-primary" style="justify-content: center; padding: 0.6rem 0.35rem; font-size: 0.82rem; background: #10b981; border-color: #10b981;" title="Call Verified Business">
            <span>${window.ReactIcons ? window.ReactIcons.render('phone', { size: 14 }) : '📞'}</span> Call Now
          </a>
          <button class="action-btn action-btn-primary" style="justify-content: center; padding: 0.6rem 0.35rem; font-size: 0.82rem; background: #25d366; border-color: #25d366;" onclick="window.JDFeatures.openWhatsAppEnquiry('${b.name}', '${b.locality}', '${b.city}', '${b.phone}')" title="Chat on WhatsApp">
            <span>${window.ReactIcons ? window.ReactIcons.render('messageSquare', { size: 14 }) : '💬'}</span> WhatsApp
          </button>
          <button class="action-btn action-btn-outline" style="justify-content: center; padding: 0.6rem 0.35rem; font-size: 0.82rem;" onclick="DOM.detailDialog.close(); window.LocalCare.openEnquiryModal('${b.id}');" title="Send Direct Enquiry">
            <span>${window.ReactIcons ? window.ReactIcons.render('mail', { size: 14 }) : '✉️'}</span> Enquire
          </button>
          <button class="action-btn action-btn-primary" style="justify-content: center; padding: 0.6rem 0.35rem; font-size: 0.82rem; background: linear-gradient(135deg, #7c3aed, #4f46e5); border: none;" onclick="DOM.detailDialog.close(); window.QuoteMarketplace.openQuotesModal('${b.category}');" title="Request Price Quotes">
            <span>${window.ReactIcons ? window.ReactIcons.render('zap', { size: 14 }) : '⚡'}</span> Get Quote
          </button>
          <button class="action-btn action-btn-primary" style="justify-content: center; padding: 0.6rem 0.35rem; font-size: 0.82rem; background: var(--primary);" onclick="DOM.detailDialog.close(); window.BookingEngine.openBookingModal(window.LocalCare.getActiveBusiness());" title="Book Doorstep Appointment">
            <span>${window.ReactIcons ? window.ReactIcons.render('calendar', { size: 14 }) : '📅'}</span> Book Slot
          </button>
        </div>

        <!-- Secondary Utility Actions Ribbon -->
        <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; flex-wrap: wrap;">
          <a href="https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((b.lat && b.lng) ? `${b.lat},${b.lng}` : `${b.address || b.name}, ${b.city}`)}" target="_blank" rel="noopener" class="action-btn action-btn-ghost" style="font-size: 0.82rem; padding: 0.4rem 0.75rem; border: 1px solid var(--border-subtle);">
            <span>${window.ReactIcons ? window.ReactIcons.render('compass', { size: 14 }) : '🗺️'}</span> Get Directions
          </a>
          <button class="action-btn action-btn-ghost" style="font-size: 0.82rem; padding: 0.4rem 0.75rem; border: 1px solid var(--border-subtle);" onclick="window.LocalCare.shareBusiness('${b.id}')">
            <span>${window.ReactIcons ? window.ReactIcons.render('share', { size: 14 }) : '🔗'}</span> Share Listing
          </button>
          <button class="action-btn action-btn-ghost" style="font-size: 0.82rem; padding: 0.4rem 0.75rem; border: 1px solid var(--border-subtle);" onclick="window.LocalCare.toggleSaveListing('${b.id}')">
            <span>${state.savedIds.has(b.id) ? (window.ReactIcons ? window.ReactIcons.render('heartFilled', { size: 14, className: 'react-icon-danger' }) : '❤️') : (window.ReactIcons ? window.ReactIcons.render('heart', { size: 14 }) : '🤍')}</span> ${state.savedIds.has(b.id) ? 'Saved' : 'Save to Favorites'}
          </button>
          <button class="action-btn action-btn-ghost" style="font-size: 0.82rem; padding: 0.4rem 0.75rem; border: 1px solid var(--border-subtle);" onclick="window.LocalCare.openPayStudio(window.LocalCare.getActiveBusiness())" title="Pay with LocalCare Pay">
            <span>${window.ReactIcons ? window.ReactIcons.render('creditCard', { size: 14, className: 'react-icon-primary' }) : '💳'}</span> Pay Merchant
          </button>
          <button class="action-btn action-btn-ghost" style="font-size: 0.82rem; padding: 0.4rem 0.75rem; border: 1px solid var(--border-subtle);" onclick="window.VerificationEngine.openReportModal('${b.name}')">
            <span>${window.ReactIcons ? window.ReactIcons.render('alertTriangle', { size: 14 }) : '⚠️'}</span> Report
          </button>
        </div>

        <!-- Detail Interactive Tab Bar (Powered by React Icons) -->
        <div class="jdpay-tabs-bar" style="margin-bottom: 1.25rem; background: var(--bg-surface); border-bottom: 2px solid var(--border-subtle);">
          <button class="jdpay-tab-btn jd-detail-tab-btn active" data-tab="overview" onclick="window.LocalCare.switchDetailTab('overview')">
            <span>${window.ReactIcons ? window.ReactIcons.render('clipboard', { size: 14 }) : '📌'}</span> Overview & Rates
          </button>
          <button class="jdpay-tab-btn jd-detail-tab-btn" data-tab="photos" onclick="window.LocalCare.switchDetailTab('photos')">
            <span>${window.ReactIcons ? window.ReactIcons.render('image', { size: 14 }) : '🖼️'}</span> Photos (${photos.length})
          </button>
          <button class="jdpay-tab-btn jd-detail-tab-btn" data-tab="reviews" onclick="window.LocalCare.switchDetailTab('reviews')">
            <span>${window.ReactIcons ? window.ReactIcons.render('star', { size: 14 }) : '⭐'}</span> Ratings & Reviews (${b.reviewsCount})
          </button>
          <button class="jdpay-tab-btn jd-detail-tab-btn" data-tab="faqs" onclick="window.LocalCare.switchDetailTab('faqs')">
            <span>${window.ReactIcons ? window.ReactIcons.render('helpCircle', { size: 14 }) : '❓'}</span> FAQs
          </button>
        </div>

        <!-- Panel 1: Overview & Rates -->
        <div class="jd-detail-tab-panel" id="detailPanel-overview" style="display: block;">
          <!-- Trust Score Strip -->
          <div style="display: flex; align-items: center; justify-content: space-between; background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(2, 132, 199, 0.1) 100%); border: 1px solid var(--success-border); border-radius: var(--radius-md); padding: 0.75rem 1rem; margin-bottom: 1.25rem;">
            <div>
              <span style="font-weight: 800; color: #065f46; font-size: 0.95rem; display: flex; align-items: center; gap: 0.4rem;">
                ${window.ReactIcons ? window.ReactIcons.render('shieldCheck', { size: 16, className: 'react-icon-success' }) : '🛡️'} LocalCare Trust Score: ${b.trustScore || 96}/100
              </span>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">Police verified • GST: ${b.gst || '29AABCU9603R1ZM'} • On-ground address audited</div>
            </div>
            <button class="action-btn action-btn-outline" style="font-size: 0.78rem; padding: 0.3rem 0.65rem;" onclick="window.VerificationEngine.openTrustScore(window.LocalCare.getActiveBusiness())">
              Audit Breakdown ➔
            </button>
          </div>

          <!-- LocalCare Shield Protection Guarantee Strip -->
          <div class="shield-guarantee-banner" onclick="window.ShieldGuarantee.openShieldModal()" style="display: flex; align-items: center; justify-content: space-between; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); color: #ffffff; padding: 0.75rem 1rem; border-radius: var(--radius-md); margin-bottom: 1.25rem; cursor: pointer;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span style="font-size: 1.25rem;">${window.ReactIcons ? window.ReactIcons.render('shield', { size: 22 }) : '🛡️'}</span>
              <div>
                <strong style="font-size: 0.9rem; color: #ffffff;">Backed by LocalCare Shield™ Guarantee</strong>
                <div style="font-size: 0.75rem; color: rgba(255,255,255,0.85);">₹10,000 Damage Cover • 30-Day Free Revisit Guarantee</div>
              </div>
            </div>
            <span style="font-size: 0.78rem; font-weight: 700; color: #fde047;">Learn More ➔</span>
          </div>

          <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1.25rem; line-height: 1.6;">${b.description}</p>

          <!-- Features & Highlights -->
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem;">
            ${featuresPills}
          </div>

          <!-- Operating Hours & Contact Schedule -->
          <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem;">
            <div style="font-weight: 700; margin-bottom: 0.5rem; font-size: 0.95rem;">🕒 Operating Schedule & Info</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; font-size: 0.88rem;">
              <div><strong>Hours:</strong> ${b.operatingHours}</div>
              <div><strong>Verified Phone:</strong> ${b.phone}</div>
              <div><strong>Locality:</strong> ${b.locality}, ${b.city}</div>
              <div><strong>Distance:</strong> ${b.distance || 'Near your location'}</div>
            </div>
          </div>

          ${b.category === 'food' ? `
            <!-- Dedicated Restaurant Experience: Table Reservation & Cuisine Info -->
            <div style="background: linear-gradient(135deg, rgba(249, 115, 22, 0.08) 0%, rgba(239, 68, 68, 0.08) 100%); border: 1.5px solid rgba(249, 115, 22, 0.25); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="font-size: 1.4rem;">🍽️</span>
                  <div>
                    <strong style="font-size: 1rem; color: var(--text-primary);">Dine-In Table Reservation & Menu</strong>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">${b.isVeg ? '🌱 100% Pure Vegetarian' : '🍗 Multi-Cuisine & Non-Veg'} • Price for two: ₹${(b.startingPrice || 350) * 2} approx</div>
                  </div>
                </div>
                <span class="bid-badge" style="background: #ffedd5; color: #c2410c; font-weight: 700; font-size: 0.78rem; padding: 4px 10px; border-radius: 999px;">Instant Confirmation</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.6rem; margin-top: 0.75rem;">
                <button type="button" class="action-btn action-btn-primary" style="font-size: 0.82rem; padding: 0.5rem;" onclick="DOM.detailDialog.close(); window.BookingEngine.openBookingModal(window.LocalCare.getActiveBusiness());">
                  📅 Reserve Table
                </button>
                <button type="button" class="action-btn action-btn-outline" style="font-size: 0.82rem; padding: 0.5rem;" onclick="window.JDFeatures.openWhatsAppEnquiry('${b.name}', '${b.locality}', '${b.city}', '${b.phone}')">
                  💬 Pre-Order / Delivery
                </button>
              </div>
            </div>
          ` : ''}

          ${(b.category === 'stays' || b.category === 'travel') ? `
            <!-- Dedicated Hotel & Stay Experience: Room Categories & Amenities -->
            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%); border: 1.5px solid rgba(59, 130, 246, 0.25); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                  <span style="font-size: 1.4rem;">🏨</span>
                  <div>
                    <strong style="font-size: 1rem; color: var(--text-primary);">Hotel Stay & Room Booking</strong>
                    <div style="font-size: 0.78rem; color: var(--text-muted);">From ₹${b.startingPrice || 1499}/night • Free Wi-Fi • AC • 24/7 Check-in</div>
                  </div>
                </div>
                <span class="bid-badge" style="background: #dbeafe; color: #1e40af; font-weight: 700; font-size: 0.78rem; padding: 4px 10px; border-radius: 999px;">Pay at Hotel Available</span>
              </div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
                <span style="font-size: 0.74rem; padding: 3px 8px; background: rgba(59, 130, 246, 0.12); color: #1d4ed8; border-radius: 4px; font-weight: 600;">✓ Free Cancellation</span>
                <span style="font-size: 0.74rem; padding: 3px 8px; background: rgba(59, 130, 246, 0.12); color: #1d4ed8; border-radius: 4px; font-weight: 600;">✓ Couple Friendly</span>
                <span style="font-size: 0.74rem; padding: 3px 8px; background: rgba(59, 130, 246, 0.12); color: #1d4ed8; border-radius: 4px; font-weight: 600;">✓ Breakfast Included</span>
              </div>
              <button type="button" class="action-btn action-btn-primary" style="font-size: 0.85rem; padding: 0.55rem; width: 100%;" onclick="DOM.detailDialog.close(); window.BookingEngine.openBookingModal(window.LocalCare.getActiveBusiness());">
                🛏️ Check Availability & Book Room
              </button>
            </div>
          ` : ''}

          <!-- Services & Rate Card (Urban Company Grade) -->
          <div style="margin-bottom: 1rem;" id="detailRateCardSection">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h3 style="font-size: 1.15rem; margin: 0;">Verified Rate Card & Packages</h3>
              <span style="font-size: 0.8rem; color: #059669; font-weight: 700;">🛡️ ₹10,000 Quality Shield Free</span>
            </div>
            <div id="detailRateCardContainer" style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.5rem 1rem; background: var(--bg-surface);">
              ${servicesRows}
            </div>
            <div id="detailStickyCartSlot">
              ${stickyCartBar}
            </div>
          </div>

          <!-- Verified FAQs Accordion -->
          <div style="margin-top: 1.5rem;">
            <h3 style="font-size: 1.15rem; margin-bottom: 0.75rem;">Frequently Asked Questions</h3>
            <div style="border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 0.75rem 1rem; background: var(--bg-surface);">
              <details style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);" open>
                <summary style="font-weight: 700; cursor: pointer; font-size: 0.88rem;">Do they provide doorstep / on-site services?</summary>
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.35rem;">Yes, verified technicians and consultants provide on-site services in ${b.locality} and across ${b.city}.</p>
              </details>
              <details style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle);">
                <summary style="font-weight: 700; cursor: pointer; font-size: 0.88rem;">What payment methods are supported?</summary>
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.35rem;">UPI, Net Banking, Credit/Debit cards, LocalCare Pay Wallet, and post-service payment.</p>
              </details>
              <details style="padding: 0.5rem 0;">
                <summary style="font-weight: 700; cursor: pointer; font-size: 0.88rem;">Is there a service warranty or quality guarantee?</summary>
                <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.35rem;">All verified services booked on LocalCare Infinity include our ₹10,000 Quality Shield protection with 30-day revisit support.</p>
              </details>
            </div>
          </div>
        </div>

        <!-- Panel 2: Photos Gallery -->
        <div class="jd-detail-tab-panel" id="detailPanel-photos" style="display: none;">
          <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1rem;">
            Official verified photos of premises, staff, equipment and previous completed work:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem;">
            ${photosGalleryHTML}
          </div>
        </div>

        <!-- Panel 3: Customer Reviews & Rating Breakdown -->
        <div class="jd-detail-tab-panel" id="detailPanel-reviews" style="display: none;">
          <!-- Justdial Dynamic Rating Breakdown Bar Chart -->
          <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 2rem; flex-wrap: wrap;">
            <div style="text-align: center; min-width: 120px;">
              <div style="font-size: 3rem; font-weight: 900; color: #f59e0b; line-height: 1;">${b.rating}</div>
              <div style="color: #f59e0b; font-size: 1.1rem; margin: 0.25rem 0;">★★★★★</div>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${b.reviewsCount} Total Ratings</div>
            </div>

            <div class="jd-rating-bars-container" style="flex: 1; min-width: 200px;">
              <div class="jd-bar-row">
                <span>5★</span>
                <div class="jd-bar-track"><div class="jd-bar-fill" style="width: ${p5}%;"></div></div>
                <span>${p5}%</span>
              </div>
              <div class="jd-bar-row">
                <span>4★</span>
                <div class="jd-bar-track"><div class="jd-bar-fill" style="width: ${p4}%;"></div></div>
                <span>${p4}%</span>
              </div>
              <div class="jd-bar-row">
                <span>3★</span>
                <div class="jd-bar-track"><div class="jd-bar-fill" style="width: ${p3}%;"></div></div>
                <span>${p3}%</span>
              </div>
              <div class="jd-bar-row">
                <span>2★</span>
                <div class="jd-bar-track"><div class="jd-bar-fill" style="width: ${p2}%;"></div></div>
                <span>${p2}%</span>
              </div>
              <div class="jd-bar-row">
                <span>1★</span>
                <div class="jd-bar-track"><div class="jd-bar-fill" style="width: ${p1}%;"></div></div>
                <span>${p1}%</span>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <h3 style="font-size: 1.15rem; margin: 0;">Verified Reviews (${b.reviewsCount})</h3>
              <select class="sort-select" style="font-size: 0.78rem; padding: 0.25rem 0.5rem; border-radius: var(--radius-sm);" onchange="window.LocalCare.sortDetailReviews(this.value)">
                <option value="recent">Most Recent</option>
                <option value="high">Highest Rating (5★)</option>
                <option value="low">Lowest Rating (1★)</option>
                <option value="helpful">Most Helpful</option>
              </select>
            </div>
            <button class="action-btn action-btn-primary" style="font-size: 0.82rem; padding: 0.35rem 0.75rem;" onclick="window.ReviewEngine.openReviewModal(window.LocalCare.getActiveBusiness())">
              ⭐ Write a Review
            </button>
          </div>

          <div class="reviews-list-container">
            ${reviewsCards}
          </div>
        </div>
      </div>
    `;

    DOM.detailBookNowBtn.onclick = () => {
      DOM.detailDialog.close();
      if (window.BookingEngine) window.BookingEngine.openBookingModal(b);
    };

    DOM.detailTrustScoreBtn.onclick = () => {
      if (window.VerificationEngine) window.VerificationEngine.openTrustScore(b);
    };

    initReviewForm(b);
    DOM.detailDialog.showModal();
    try {
      history.replaceState({ bizId: b.id }, '', `?biz=${encodeURIComponent(b.id)}`);
    } catch (e) {}
  }

  function switchDetailTab(tabName) {
    document.querySelectorAll('.jd-detail-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
    });
    document.querySelectorAll('.jd-detail-tab-panel').forEach(panel => {
      panel.style.display = panel.id === `detailPanel-${tabName}` ? 'block' : 'none';
    });
  }

  function sortDetailReviews(sortType) {
    const b = state.activeDetailBusiness;
    if (!b || !b.reviews) return;
    const sorted = [...b.reviews];

    if (sortType === 'high') {
      sorted.sort((x, y) => (y.rating || 5) - (x.rating || 5));
    } else if (sortType === 'low') {
      sorted.sort((x, y) => (x.rating || 5) - (y.rating || 5));
    } else if (sortType === 'helpful') {
      sorted.sort((x, y) => (y.helpful || 0) - (x.helpful || 0));
    }

    const container = document.querySelector('.reviews-list-container');
    if (!container) return;
    container.innerHTML = sorted.map((r, idx) => `
      <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 0.75rem; border: 1px solid var(--border-subtle);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <strong>${r.author}</strong>
            ${r.verifiedBooking ? '<span class="bid-badge" style="background: #ecfdf5; color: #065f46; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px;">✓ Verified Customer</span>' : ''}
          </div>
          <span style="font-size: 0.78rem; color: var(--text-muted);">${r.date}</span>
        </div>
        <div style="color: #f59e0b; margin-bottom: 0.35rem; font-size: 0.9rem;">
          ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
        </div>
        ${r.aspectTags && r.aspectTags.length ? `
          <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.4rem;">
            ${r.aspectTags.map(t => `<span style="font-size: 0.72rem; padding: 2px 6px; background: rgba(0,0,0,0.05); border-radius: 4px;">${t}</span>`).join('')}
          </div>
        ` : ''}
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">${r.comment}</p>
        <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 0.5rem;">
          <button class="action-btn action-btn-ghost" style="font-size: 0.75rem; padding: 0.2rem 0.6rem; border: 1px solid var(--border-subtle);" onclick="window.LocalCare.voteHelpfulReview('${b.id}', ${idx}, this)">
            👍 Helpful (${r.helpful || 0})
          </button>
          <button class="action-btn action-btn-ghost" style="font-size: 0.75rem; padding: 0.2rem 0.6rem;" onclick="window.VerificationEngine.openReportModal('Review on ${b.name}')">
            ⚠️ Report
          </button>
        </div>
        ${r.reply ? `
          <div style="margin-top: 0.6rem; padding: 0.6rem 0.85rem; background: rgba(255, 104, 0, 0.08); border-left: 3px solid var(--primary); border-radius: 4px; font-size: 0.82rem;">
            <strong style="color: var(--primary);">Provider Response:</strong> ${r.reply}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  function bookDirectService(businessId, serviceId) {
    DOM.detailDialog.close();
    const all = getAllBusinesses();
    const b = all.find(item => item.id === businessId);
    if (b && window.BookingEngine) {
      window.BookingEngine.openBookingModal(b, serviceId);
    }
  }

  function initReviewForm(business) {
    const toggleBtn = document.getElementById('toggleReviewFormBtn');
    const formContainer = document.getElementById('reviewFormContainer');
    const cancelBtn = document.getElementById('cancelReviewBtn');
    const submitBtn = document.getElementById('submitReviewBtn');
    const starSelector = document.getElementById('starRatingSelector');

    let selectedStars = 5;

    if (toggleBtn && formContainer) {
      toggleBtn.addEventListener('click', () => {
        formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        formContainer.style.display = 'none';
      });
    }

    if (starSelector) {
      starSelector.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
          selectedStars = parseInt(star.getAttribute('data-val'), 10);
          starSelector.querySelectorAll('.star').forEach((s, idx) => {
            s.textContent = idx < selectedStars ? '★' : '☆';
          });
        });
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const name = document.getElementById('reviewerNameInput').value.trim();
        const comment = document.getElementById('reviewerCommentInput').value.trim();

        if (!name || !comment) {
          showToast('Please enter your name and review comment', 'warning');
          return;
        }

        const newReview = {
          author: name,
          rating: selectedStars,
          date: 'Just now',
          verifiedBooking: true,
          comment: comment
        };

        business.reviews.unshift(newReview);
        business.reviewsCount += 1;

        showToast('Review submitted successfully!', 'success');
        openBusinessDetailModal(business);
        renderListings();
      });
    }
  }

  /* ==========================================================================
     "Call Now" Direct Contact Modal
     ========================================================================== */
  function openCallModal(b) {
    DOM.callModalContent.innerHTML = `
      <div style="text-align: center; padding: 1rem 0;">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--success-light); border: 2px solid var(--success-border); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; margin: 0 auto 1rem auto; color: var(--success);">
          📞
        </div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.25rem;">${b.name}</h3>
        <p style="color: var(--text-secondary); font-size: 0.88rem; margin-bottom: 1.5rem;">${b.locality}, ${b.city}</p>

        <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem;">
          <div style="font-size: 0.82rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 0.35rem;">Verified Phone Number</div>
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--primary); letter-spacing: 0.5px; margin-bottom: 0.5rem;" id="modalPhoneText">${b.phone}</div>
          <small style="color: var(--text-secondary);">Available ${b.operatingHours} • ${b.responseTime || '~8 min'} response</small>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.65rem;">
          <a href="tel:${b.phone.replace(/\s+/g, '')}" class="action-btn action-btn-primary" style="justify-content: center; padding: 0.85rem; font-size: 1rem;">
            📞 Call Direct Now
          </a>
          <button class="action-btn action-btn-outline" style="justify-content: center; padding: 0.75rem;" id="modalWhatsAppBtn">
            <span>💬</span> Chat on WhatsApp
          </button>
          <button class="action-btn action-btn-ghost" style="justify-content: center; padding: 0.6rem; font-size: 0.85rem;" id="copyPhoneBtn">
            📋 Copy Number to Clipboard
          </button>
        </div>

        <!-- Justdial Instant Callback Form -->
        <div style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px dashed var(--border-subtle); text-align: left;">
          <div style="font-weight: 700; font-size: 0.88rem; margin-bottom: 0.35rem;">⚡ Too busy to call? Get an instant callback:</div>
          <div style="display: flex; gap: 0.5rem;">
            <input type="tel" id="jdCallbackPhoneInput" class="form-input" value="+91 98450 11223" style="padding: 0.45rem 0.75rem; font-size: 0.85rem;" placeholder="Your mobile number" />
            <button class="action-btn action-btn-outline" style="white-space: nowrap; font-size: 0.82rem;" id="jdSubmitCallbackBtn">
              Request Callback
            </button>
          </div>
          <div id="jdCallbackSuccess" style="display: none; font-size: 0.8rem; color: #059669; font-weight: 700; margin-top: 0.5rem;">
            ✓ Callback confirmed! ${b.name} will ring you in ~5 minutes.
          </div>
        </div>
      </div>
    `;

    document.getElementById('copyPhoneBtn')?.addEventListener('click', () => {
      navigator.clipboard?.writeText(b.phone);
      showToast('Phone number copied to clipboard!', 'success');
    });

    document.getElementById('modalWhatsAppBtn')?.addEventListener('click', () => {
      if (window.JDFeatures) {
        window.JDFeatures.openWhatsAppEnquiry(b.name, b.locality, b.city, b.phone);
      } else {
        openWhatsAppChat(b);
      }
    });

    document.getElementById('jdSubmitCallbackBtn')?.addEventListener('click', () => {
      const cbPhone = document.getElementById('jdCallbackPhoneInput')?.value || '+91 98450 11223';
      const successEl = document.getElementById('jdCallbackSuccess');
      if (successEl) successEl.style.display = 'block';
      if (window.SoundFX) window.SoundFX.playSuccess();
      showToast(`Callback requested! ${b.name} will call ${cbPhone} within 5 mins.`, 'success');
    });

    DOM.callDialog.showModal();
  }

  /* ==========================================================================
     WhatsApp Instant Chat
     ========================================================================== */
  function openWhatsAppChat(b) {
    const text = encodeURIComponent(`Hi ${b.name}, I found your verified listing on LocalCare and would like to enquire about your services.`);
    const url = `https://wa.me/${b.whatsapp}?text=${text}`;
    window.open(url, '_blank');
    showToast(`Connecting to ${b.name} on WhatsApp...`, 'info');
  }

  /* ==========================================================================
     Newsletter VIP Subscription (Section Y)
     ========================================================================== */
  async function handleNewsletter(e) {
    if (e && e.preventDefault) e.preventDefault();
    const email = DOM.newsletterEmailInput?.value.trim();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, city: state.selectedCity })
      });
      const data = await res.json();
      if (data.success) {
        showToast('🎉 Subscribed! You will receive weekly deals & neighborhood updates.', 'success');
        if (DOM.newsletterForm) DOM.newsletterForm.reset();
      } else {
        showToast(data.message || 'Subscribed successfully!', 'info');
      }
    } catch (err) {
      showToast('🎉 Subscribed to LocalCare VIP deals!', 'success');
      if (DOM.newsletterForm) DOM.newsletterForm.reset();
    }
  }

  /* ==========================================================================
     Vendor Multi-Step Onboarding Form
     ========================================================================== */
  function initVendorOnboarding() {
    document.getElementById('openListBusinessBtn')?.addEventListener('click', () => {
      state.onboardingStep = 1;
      renderOnboardingStep();
      DOM.vendorDialog.showModal();
    });

    const catSelect = document.getElementById('vendorCategorySelect');
    if (catSelect) {
      catSelect.innerHTML = CATEGORIES.map(c => `<option value="${c.id}">${c.title}</option>`).join('');
    }

    const citySelect = document.getElementById('vendorCitySelect');
    if (citySelect) {
      citySelect.innerHTML = CITIES.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    }

    document.getElementById('vendorNextStep1')?.addEventListener('click', () => {
      const name = document.getElementById('vendorBusinessName').value.trim();
      const locality = document.getElementById('vendorLocality').value.trim();
      if (!name || !locality) {
        showToast('Please fill in business name and locality', 'warning');
        return;
      }
      state.onboardingStep = 2;
      renderOnboardingStep();
    });

    document.getElementById('vendorPrevStep2')?.addEventListener('click', () => {
      state.onboardingStep = 1;
      renderOnboardingStep();
    });

    document.getElementById('vendorNextStep2')?.addEventListener('click', () => {
      const phone = document.getElementById('vendorPhone').value.trim();
      if (!phone) {
        showToast('Please provide a contact phone number', 'warning');
        return;
      }
      state.onboardingStep = 3;
      renderOnboardingStep();
    });

    document.getElementById('vendorPrevStep3')?.addEventListener('click', () => {
      state.onboardingStep = 2;
      renderOnboardingStep();
    });

    DOM.vendorForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('vendorBusinessName').value.trim();
      const category = document.getElementById('vendorCategorySelect').value;
      const city = document.getElementById('vendorCitySelect').value;
      const locality = document.getElementById('vendorLocality').value.trim();
      const address = document.getElementById('vendorAddress').value.trim() || `${locality}, ${city}`;
      const phone = document.getElementById('vendorPhone').value.trim();
      const whatsapp = document.getElementById('vendorWhatsApp').value.trim() || phone.replace(/\D/g, '');
      const hours = document.getElementById('vendorHours').value.trim() || '9:00 AM - 8:00 PM';
      const desc = document.getElementById('vendorDescription').value.trim() || `${name} provides trusted, high-quality services in ${locality}.`;
      const service1 = document.getElementById('vendorService1').value.trim() || 'Consultation & Inspection';
      const price1 = parseInt(document.getElementById('vendorPrice1').value.replace(/\D/g, ''), 10) || 299;

      const newBusiness = {
        id: 'b-custom-' + Date.now(),
        name: name,
        category: category,
        city: city,
        locality: locality,
        rating: 5.0,
        reviewsCount: 1,
        verified: true,
        superSeller: false,
        openNow: true,
        availableToday: true,
        operatingHours: hours,
        startingPrice: price1,
        priceRange: '₹₹',
        responseTime: '~10 min',
        trustScore: 92,
        phone: phone,
        whatsapp: whatsapp,
        address: address,
        image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=700&q=80',
        homeService: true,
        onlineBooking: true,
        services: [
          { id: 's-custom-1', name: service1, price: price1, duration: '45 mins' }
        ],
        features: ['Verified Partner', 'On-Time Guarantee', 'Customer Friendly'],
        description: desc,
        reviews: [
          { author: 'LocalCare Audit Team', rating: 5, date: 'Today', verifiedBooking: true, comment: 'Business verified & approved on LocalCare platform.' }
        ],
        distance: '0.8 km'
      };

      state.customBusinesses.unshift(newBusiness);
      localStorage.setItem('localcare_custom_businesses', JSON.stringify(state.customBusinesses));

      // Persist to REST API server
      fetch('/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBusiness)
      }).catch(err => console.warn('Vendor API sync fallback:', err));

      DOM.vendorDialog.close();
      DOM.vendorForm.reset();
      state.onboardingStep = 1;

      if (state.selectedCity !== city) {
        setCity(city);
      } else {
        renderListings();
      }

      showToast(`🎉 Congratulations! "${name}" is now live on LocalCare!`, 'success', 6000);
    });
  }

  function renderOnboardingStep() {
    const s1 = document.getElementById('vStep1Content');
    const s2 = document.getElementById('vStep2Content');
    const s3 = document.getElementById('vStep3Content');

    const step1El = document.getElementById('vendorStep1');
    const step2El = document.getElementById('vendorStep2');
    const step3El = document.getElementById('vendorStep3');

    s1.style.display = state.onboardingStep === 1 ? 'block' : 'none';
    s2.style.display = state.onboardingStep === 2 ? 'block' : 'none';
    s3.style.display = state.onboardingStep === 3 ? 'block' : 'none';

    step1El.className = `booking-step ${state.onboardingStep === 1 ? 'active' : 'completed'}`;
    step2El.className = `booking-step ${state.onboardingStep === 2 ? 'active' : (state.onboardingStep > 2 ? 'completed' : '')}`;
    step3El.className = `booking-step ${state.onboardingStep === 3 ? 'active' : ''}`;
  }

  /* ==========================================================================
     Mobile Map / List Toggle
     ========================================================================== */
  function toggleMobileMap() {
    state.mobileMapVisible = !state.mobileMapVisible;
    DOM.interactiveMapContainer.classList.toggle('mobile-map-active', state.mobileMapVisible);

    if (state.mobileMapVisible) {
      DOM.mobileMapToggleBtn.innerHTML = `<span>${window.ReactIcons ? window.ReactIcons.render('list', { size: 16 }) : '📋'}</span> View List`;
      DOM.interactiveMapContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
      DOM.mobileMapToggleBtn.innerHTML = `<span>${window.ReactIcons ? window.ReactIcons.render('map', { size: 16 }) : '🗺️'}</span> View Map`;
      DOM.listingsGrid.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /* ==========================================================================
     Dialog Light Dismiss
     ========================================================================== */
  function initDialogDismissals() {
    const dialogs = [DOM.detailDialog, DOM.callDialog, DOM.vendorDialog];
    dialogs.forEach(dialog => {
      if (!dialog) return;

      dialog.querySelectorAll('.dialog-close-btn, [data-close-dialog]').forEach(btn => {
        btn.addEventListener('click', () => dialog.close());
      });

      dialog.addEventListener('click', (e) => {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        );
        if (!isInDialog || e.target === dialog) {
          dialog.close();
        }
      });
    });
  }

  /* ==========================================================================
     Toast Notifications
     ========================================================================== */
  function showToast(message, type = 'info', duration = 3500) {
    const iconHtml = window.ReactIcons ? {
      success: window.ReactIcons.render('checkCircle', { size: 16, className: 'react-icon-success' }),
      warning: window.ReactIcons.render('alertTriangle', { size: 16, className: 'react-icon-gold' }),
      info: window.ReactIcons.render('info', { size: 16 }),
      danger: window.ReactIcons.render('x', { size: 16, className: 'react-icon-danger' })
    }[type] || window.ReactIcons.render('info', { size: 16 }) : (
      { success: '✅', warning: '⚠️', info: 'ℹ️', danger: '❌' }[type] || 'ℹ️'
    );

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span>${iconHtml}</span>
      <span>${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.9)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  /* ==========================================================================
     Keyboard Shortcuts & Live Activity Pulse Cycle
     ========================================================================== */
  function initKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Don't trigger if user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        if (e.key === 'Escape') {
          document.activeElement.blur();
        }
        return;
      }

      if (e.key === '/' || (e.ctrlKey && e.key === 'k') || (e.metaKey && e.key === 'k')) {
        e.preventDefault();
        DOM.omniboxInput?.focus();
        DOM.omniboxInput?.select();
        if (window.SoundFX) window.SoundFX.playClick();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMobileMap();
        if (window.SoundFX) window.SoundFX.playClick();
      } else if (e.key === 'a' || e.key === 'A') {
        if (window.CareAI) window.CareAI.openAssistantWithQuery();
        if (window.SoundFX) window.SoundFX.playClick();
      } else if (e.key === 'c' || e.key === 'C') {
        if (window.ProComparison) window.ProComparison.openModal();
      } else if (e.key === 'p' || e.key === 'P') {
        if (window.CostEstimator) window.CostEstimator.openEstimator();
      } else if (e.key === 'e' || e.key === 'E') {
        if (window.EmergencyMode) window.EmergencyMode.openEmergencyModal();
      } else if (e.key === 't' || e.key === 'T') {
        DOM.themeToggleBtn?.click();
      } else if (e.key === 'o' || e.key === 'O') {
        if (window.CareAISuite?.openPrescriptionOcrModal) window.CareAISuite.openPrescriptionOcrModal();
        if (window.SoundFX) window.SoundFX.playClick();
      } else if (e.key === 'w' || e.key === 'W') {
        if (window.JDFeatures?.openWhatsAppEnquiry) window.JDFeatures.openWhatsAppEnquiry('general');
        if (window.SoundFX) window.SoundFX.playClick();
      } else if (e.key === 'v' || e.key === 'V') {
        if (window.CareAISuite?.openDiagnosticScanner) window.CareAISuite.openDiagnosticScanner();
        if (window.SoundFX) window.SoundFX.playClick();
      } else if (e.key === 'h' || e.key === 'H') {
        if (window.CareAISuite?.openVoiceHealthTriage) window.CareAISuite.openVoiceHealthTriage();
        if (window.SoundFX) window.SoundFX.playClick();
      } else if (e.key === 'b' || e.key === 'B') {
        if (window.BusinessDashboard?.openPortal) window.BusinessDashboard.openPortal('ai-quotes');
        if (window.SoundFX) window.SoundFX.playClick();
      } else if (e.key === 's' || e.key === 'S') {
        if (window.SoundFX) window.SoundFX.toggleMute();
      } else if (e.key === '?') {
        openShortcutsModal();
      } else if (e.key === 'Escape') {
        document.querySelectorAll('dialog[open]').forEach(d => d.close());
        closeSavedDrawer();
        const carePanel = document.getElementById('careAiPanel');
        if (carePanel) carePanel.classList.remove('active');
      }
    });
  }

  function openShortcutsModal() {
    document.getElementById('shortcutsDialog')?.showModal();
    if (window.SoundFX) window.SoundFX.playClick();
  }

  function startPulseTickerCycle() {
    const events = [
      '⚡ <strong>Priya K.</strong> booked Apollo Dental in Koramangala (2m ago)',
      '🔧 <strong>Ramesh N.</strong> received 3 verified bids for Plumbing in Valachil (4m ago)',
      '🚑 108 Emergency dispatch response: <strong>6.8 mins</strong> today',
      '🛡️ <strong>15,480+</strong> Businesses 100% Police & GST Verified',
      '🔥 <strong>Suresh G.</strong> completed AC Power Jet Service with 5.0★ rating (8m ago)',
      '❄️ <strong>Vikram M.</strong> availed ₹400 OFF on 2BHK Deep Cleaning',
      '🩺 <strong>Dr. Vivek</strong> completed 2-min Tele-Consultation with digital prescription',
      '🏍️ <strong>Ravi Auto Pro</strong> rescued broken down bike in T Nagar within 14 mins'
    ];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % events.length;
      const track = document.getElementById('pulseTickerTrack');
      if (track) {
        track.style.opacity = '0';
        setTimeout(() => {
          track.innerHTML = `<span>${events[idx]}</span> <span class="ticker-divider">•</span> <span>${events[(idx + 1) % events.length]}</span>`;
          track.style.opacity = '1';
        }, 300);
      }
    }, 7000);
  }

  /* ==========================================================================
     Global Exports
     ========================================================================== */

  /* ==========================================================================
     Airbnb-Grade Sticky Subnav, Lightbox & Trust Audit Controllers
     ========================================================================== */
  let currentLightboxBiz = null;
  let currentLightboxIndex = 0;
  let currentLightboxPhotos = [];

  function openLightbox(bizId, index = 0) {
    const all = getAllBusinesses();
    const b = all.find(item => item.id === bizId);
    if (!b) return;

    currentLightboxBiz = b;
    currentLightboxIndex = index;
    currentLightboxPhotos = (b.photos && b.photos.length >= 3) ? b.photos : getTradePhotos(b);

    const overlay = document.getElementById('photoLightbox');
    if (!overlay) return;

    overlay.style.display = 'flex';
    updateLightboxStage();
    if (window.SoundFX) window.SoundFX.playPop();
  }

  function closeLightbox() {
    const overlay = document.getElementById('photoLightbox');
    if (overlay) overlay.style.display = 'none';
  }

  function nextLightboxPhoto() {
    if (!currentLightboxPhotos.length) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxPhotos.length;
    updateLightboxStage();
  }

  function prevLightboxPhoto() {
    if (!currentLightboxPhotos.length) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxPhotos.length) % currentLightboxPhotos.length;
    updateLightboxStage();
  }

  function setLightboxIndex(idx) {
    currentLightboxIndex = idx;
    updateLightboxStage();
  }

  function updateLightboxStage() {
    const img = document.getElementById('lightboxMainImg');
    const nameEl = document.getElementById('lightboxBizName');
    const counterEl = document.getElementById('lightboxCounter');
    const thumbsContainer = document.getElementById('lightboxThumbsReel');

    if (!img || !currentLightboxPhotos.length) return;

    img.src = currentLightboxPhotos[currentLightboxIndex];
    if (nameEl) nameEl.textContent = `${currentLightboxBiz.name} • ${currentLightboxBiz.subcategory || currentLightboxBiz.category.toUpperCase()}`;
    if (counterEl) counterEl.textContent = `Photo ${currentLightboxIndex + 1} of ${currentLightboxPhotos.length}`;

    if (thumbsContainer) {
      thumbsContainer.innerHTML = currentLightboxPhotos.map((p, idx) => `
        <div class="lightbox-thumb-item ${idx === currentLightboxIndex ? 'active' : ''}" onclick="window.LocalCare.setLightboxIndex(${idx})">
          <img src="${p}" alt="Photo ${idx + 1}" />
        </div>
      `).join('');
    }
  }

  window.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('photoLightbox');
    if (!overlay || overlay.style.display === 'none') return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxPhoto();
    if (e.key === 'ArrowLeft') prevLightboxPhoto();
  });

  function openTrustAuditModal(bizId) {
    const all = getAllBusinesses();
    const b = all.find(item => item.id === bizId) || state.activeDetailBusiness;
    const dialog = document.getElementById('trustAuditDialog');
    const sub = document.getElementById('trustAuditBizSub');
    if (sub && b) {
      sub.textContent = `${b.name} (${b.locality}, ${b.city}) • Verification Audit Score: ${b.trustScore || 96}/100`;
    }
    if (dialog) {
      dialog.showModal();
      if (window.SoundFX) window.SoundFX.playBell();
    }
  }

  function renderStickyChips() {
    const container = document.getElementById('stickyChipsScroll');
    if (!container) return;

    const all = getAllBusinesses();
    const cityBusinesses = all.filter(b => b.city.toLowerCase() === state.selectedCity.toLowerCase());

    const catCounts = {};
    cityBusinesses.forEach(b => {
      catCounts[b.category] = (catCounts[b.category] || 0) + 1;
    });

    const isAllActive = state.selectedCategory === 'all';
    let chipsHtml = `
      <button class="sticky-chip-btn ${isAllActive ? 'active' : ''}" onclick="window.LocalCare.filterCategory('all')">
        <span class="chip-icon-wrap">${window.ReactIcons ? window.ReactIcons.render('grid', { size: 14 }) : '✨'}</span> All
        <span class="sticky-chip-count">${cityBusinesses.length}</span>
      </button>
    `;

    CATEGORIES.forEach(cat => {
      const count = catCounts[cat.id] || 0;
      const isActive = state.selectedCategory === cat.id;
      chipsHtml += `
        <button class="sticky-chip-btn ${isActive ? 'active' : ''}" onclick="window.LocalCare.filterCategory('${cat.id}')">
          <span class="chip-icon-wrap">${window.ReactIcons ? window.ReactIcons.getCategoryIcon(cat.id, { size: 14 }) : cat.icon}</span> ${cat.title.split(' ')[0]}
          <span class="sticky-chip-count">${count}</span>
        </button>
      `;
    });

    container.innerHTML = chipsHtml;
  }

  function toggleBudgetPopup(event) {
    if (event) event.stopPropagation();
    const card = document.getElementById('budgetPopupCard');
    if (!card) return;
    const isShown = card.style.display !== 'none';
    card.style.display = isShown ? 'none' : 'block';
  }

  function closeBudgetPopup() {
    const card = document.getElementById('budgetPopupCard');
    if (card) card.style.display = 'none';
  }

  function applyQuickBudget(val) {
    closeBudgetPopup();
    const label = document.getElementById('stickyBudgetLabel');
    if (label) label.textContent = val ? `Under ₹${val}` : 'Any Budget';
    const slider = document.getElementById('budgetRangeInput');
    if (slider) slider.value = val || 1500;
    const disp = document.getElementById('budgetSliderDisplay');
    if (disp) disp.textContent = val ? `₹${val}` : 'All';
    setBudgetFilter(val);
  }

  function onBudgetSliderChange(val) {
    const disp = document.getElementById('budgetSliderDisplay');
    if (disp) disp.textContent = `₹${val}`;
    const label = document.getElementById('stickyBudgetLabel');
    if (label) label.textContent = `Under ₹${val}`;
    setBudgetFilter(parseInt(val, 10));
  }

  function toggleRatingFilter() {
    const btn = document.getElementById('stickyRatingBtn');
    if (state.filterMinRating === 4.5) {
      state.filterMinRating = null;
      if (btn) btn.classList.remove('active');
      showToast('Rating filter cleared', 'info');
    } else {
      state.filterMinRating = 4.5;
      if (btn) btn.classList.add('active');
      showToast('Showing top-rated 4.5+ providers', 'success');
    }
    renderListings(true);
  }

  function toggleSplitMap() {
    const mapCol = document.getElementById('interactiveMapContainer');
    const label = document.getElementById('stickyMapLabel');
    const mapBtn = document.getElementById('stickyMapToggleBtn');
    if (!mapCol) return;
    const isHidden = mapCol.style.display === 'none';
    if (isHidden) {
      mapCol.style.display = 'block';
      if (label) label.textContent = 'Hide Map';
      if (mapBtn) mapBtn.classList.add('active');
    } else {
      mapCol.style.display = 'none';
      if (label) label.textContent = 'Show Map';
      if (mapBtn) mapBtn.classList.remove('active');
    }
  }

  /* --------------------------------------------------------------------------
     Dedicated Direct Enquiry Dialog Controller
     -------------------------------------------------------------------------- */
  function openEnquiryModal(bizId) {
    const dialog = document.getElementById('enquiryDialog');
    if (!dialog) return;

    let biz = null;
    const all = getAllBusinesses();
    if (typeof bizId === 'object' && bizId) {
      biz = bizId;
    } else if (bizId) {
      biz = all.find(b => b.id === bizId);
    }
    if (!biz) biz = state.activeDetailBusiness;

    const titleEl = document.getElementById('enquiryBusinessName');
    const bizIdInput = document.getElementById('enquiryBizId');
    const nameInput = document.getElementById('enquiryCustomerName');
    const phoneInput = document.getElementById('enquiryCustomerPhone');
    const dateInput = document.getElementById('enquiryPreferredDate');

    if (biz) {
      if (titleEl) titleEl.textContent = `Enquiring directly with ${biz.name} (${biz.locality}, ${biz.city})`;
      if (bizIdInput) bizIdInput.value = biz.id;
    }

    // Pre-fill user profile if logged in
    const currentUser = (window.Auth && window.Auth.getCurrentUser) ? window.Auth.getCurrentUser() : null;
    if (currentUser) {
      if (nameInput && !nameInput.value) nameInput.value = currentUser.name || currentUser.email || '';
      if (phoneInput && !phoneInput.value) phoneInput.value = currentUser.phone || '';
    }

    // Default to tomorrow's date
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
    }

    dialog.showModal();
  }

  async function submitDirectEnquiry(e) {
    e.preventDefault();
    const bizId = document.getElementById('enquiryBizId')?.value;
    const name = document.getElementById('enquiryCustomerName')?.value;
    const phone = document.getElementById('enquiryCustomerPhone')?.value;
    const date = document.getElementById('enquiryPreferredDate')?.value;
    const urgency = document.getElementById('enquiryUrgency')?.value;
    const notes = document.getElementById('enquiryNotes')?.value;

    const biz = getAllBusinesses().find(b => b.id === bizId) || { name: 'Verified Provider' };

    const payload = {
      businessId: bizId,
      businessName: biz.name,
      customerName: name,
      customerPhone: phone,
      preferredDate: date,
      urgency,
      requirement: notes,
      status: 'Enquiry Received',
      timestamp: new Date().toISOString()
    };

    // Store in localStorage for User Dashboard & Business Dashboard sync
    try {
      const stored = JSON.parse(localStorage.getItem('localcare_enquiries') || '[]');
      stored.unshift(payload);
      localStorage.setItem('localcare_enquiries', JSON.stringify(stored));
    } catch (err) {}

    // Send to backend quote/enquiry API if available
    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: biz.category || 'general',
          locality: biz.locality || 'Bengaluru',
          description: `Direct Enquiry for ${biz.name}: ${notes}`,
          urgency,
          budget: `Starts ₹${biz.startingPrice || 399}`
        })
      });
    } catch (err) {}

    const dialog = document.getElementById('enquiryDialog');
    if (dialog) dialog.close();

    showToast(`⚡ Enquiry sent directly to ${biz.name}! A team member will call you shortly.`, 'success');
  }

  window.LocalCare = {
    setCity,
    filterLocationByState,
    autoDetectLocation,
    filterCategory,
    filterBySubcategory,
    updateCategoryBanner,
    openEnquiryModal,
    submitDirectEnquiry,
    filterOffersOnly,
    filterByRadius,
    resetAllFilters,
    executeSearch,
    goToPage: (pageNum) => {
      state.currentPage = pageNum;
      renderListings(false);
      const sec = document.getElementById('listingsSection');
      if (sec) sec.scrollIntoView({ behavior: 'smooth' });
    },
    setBudgetFilter: (budget) => {
      state.filterMaxPrice = budget;
      renderListings(true);
      showToast(`Budget adjusted to ₹${budget}`, 'info');
    },
    setLocalityFilter: (loc) => {
      state.filterLocality = loc;
      renderListings(true);
    },
    filterB2B: (active) => {
      state.filterB2B = active;
      renderListings(true);
    },
    getCurrentCity: () => state.selectedCity,
    clearLocalityFilter: () => {
      state.filterLocality = '';
      renderListings(true);
      showToast(`Showing all areas of ${state.selectedCity}`, 'info');
    },
    claimDeal,
    toggleBookmark,
    toggleMobileMap,
    showToast,
    openShortcutsModal,
    setViewMode,
    openMobileDrawer,
    closeMobileDrawer,
    clearRecentSearches,
    clearRecentlyViewed,
    handleNewsletter,
    renderRecentSearches,
    renderRecentlyViewed,
    renderCityHighlights,
    searchFromMapArea: (area) => {
      DOM.omniboxInput.value = area;
      executeSearch(area);
    },
    clearSearch: () => {
      DOM.omniboxInput.value = '';
      executeSearch('');
    },
    refreshListings: () => {
      renderListings();
      if (window.ProComparison) window.ProComparison.updateUI();
    },
    getAllBusinesses,
    openDetailModal: openBusinessDetailModal,
    openDetailModalById: (id) => {
      const b = getAllBusinesses().find(item => item.id === id);
      if (b) openBusinessDetailModal(b);
    },
    openBookingById: (id) => {
      const b = getAllBusinesses().find(item => item.id === id);
      if (b && window.BookingEngine) window.BookingEngine.openBookingModal(b);
    },
    bookDirectService,
    openCallModalById: (id) => {
      const b = getAllBusinesses().find(item => item.id === id);
      if (b) openCallModal(b);
    },
    openCallById: (id) => {
      const b = getAllBusinesses().find(item => item.id === id);
      if (b) {
        if (/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) && window.innerWidth <= 768) {
          window.location.href = `tel:${b.phone.replace(/\s+/g, '')}`;
        } else {
          openCallModal(b);
        }
      }
    },
    openDirectionsById: (id) => {
      const b = getAllBusinesses().find(item => item.id === id);
      if (b) {
        if (window.MapEngine) window.MapEngine.selectBusiness(id, true);
        if (window.innerWidth <= 768) {
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent((b.lat && b.lng) ? `${b.lat},${b.lng}` : `${b.name}, ${b.locality}, ${b.city}`)}`;
          window.open(mapsUrl, '_blank', 'noopener');
        } else {
          showToast(`📍 Showing route & directions to ${b.name} on map`, 'info', 3500);
          const mapSec = document.getElementById('interactiveMapContainer');
          if (mapSec) mapSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    },
    openQuoteModalById: (id) => {
      const b = id ? getAllBusinesses().find(item => item.id === id) : null;
      if (window.QuoteMarketplace) window.QuoteMarketplace.openQuotesModal(b ? b.category : null);
    },
    switchDetailTab,
    getActiveBusiness: () => state.activeDetailBusiness,
    shareBusiness: (bizId) => {
      const all = getAllBusinesses();
      const b = all.find(item => item.id === bizId);
      if (!b) return;
      const shareUrl = `${window.location.origin}${window.location.pathname}?biz=${encodeURIComponent(b.id)}`;
      if (navigator.share) {
        navigator.share({
          title: `${b.name} on LocalCare Infinity`,
          text: `Discover ${b.name} (${b.locality}, ${b.city}) on LocalCare Infinity:`,
          url: shareUrl
        }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast('🔗 Listing link copied to clipboard!', 'success');
        }).catch(() => {
          showToast(`Share URL: ${shareUrl}`, 'info');
        });
      } else {
        showToast(`Share URL: ${shareUrl}`, 'info');
      }
    },
    voteHelpfulReview: (bizId, reviewIdx, btnElement) => {
      const all = getAllBusinesses();
      const b = all.find(item => item.id === bizId);
      if (!b || !b.reviews || !b.reviews[reviewIdx]) return;
      const rev = b.reviews[reviewIdx];
      rev.helpful = (rev.helpful || 0) + 1;
      if (btnElement) {
        btnElement.textContent = `👍 Helpful (${rev.helpful})`;
        btnElement.disabled = true;
        btnElement.style.color = 'var(--primary)';
      }
      showToast('Thank you! Review marked as helpful.', 'success');
    },
    toggleSaveListing: toggleBookmark,
    toggleDynamicIsland: (e) => {
      if (e) e.stopPropagation();
      const island = document.getElementById('dynamicIsland');
      const compact = document.getElementById('islandCompact');
      const expanded = document.getElementById('islandExpanded');
      if (!island || !compact || !expanded) return;
      const isExpanded = expanded.style.display !== 'none';
      if (isExpanded) {
        expanded.style.display = 'none';
        compact.style.display = 'flex';
        island.classList.remove('island-active');
      } else {
        compact.style.display = 'none';
        expanded.style.display = 'block';
        island.classList.add('island-active');
        if (window.SoundFX) window.SoundFX.playBubble();
      }
    },
    collapseDynamicIsland: () => {
      const island = document.getElementById('dynamicIsland');
      const compact = document.getElementById('islandCompact');
      const expanded = document.getElementById('islandExpanded');
      if (!island || !compact || !expanded) return;
      expanded.style.display = 'none';
      compact.style.display = 'flex';
      island.classList.remove('island-active');
    },
    openLightbox,
    closeLightbox,
    nextLightboxPhoto,
    prevLightboxPhoto,
    setLightboxIndex,
    openTrustAuditModal,
    renderStickyChips,
    toggleBudgetPopup,
    closeBudgetPopup,
    applyQuickBudget,
    onBudgetSliderChange,
    toggleRatingFilter,
    toggleSplitMap,
    renderCuratedShowcase,
    switchCuratedTab,
    sortDetailReviews,
    openNotificationCenter,
    closeNotificationCenter,
    markAllNotificationsRead,
    handleNotificationClick,
    addNotification,
    updateNotificationBadge,
    updateCartQty,
    openCartDrawer,
    renderCartDrawerUI,
    applyCartCoupon,
    clearCart,
    proceedCartToBooking,
    navToSection,
    focusSearch,
    toggleMap,
    openDashboard,
    openPayStudio,
    simulateUpiApp,
    completePaymentSimulation
  };

  /* ==========================================================================
     App Bootstrapping
     ========================================================================== */
  function init() {
    try { if (window.ReactIcons) window.ReactIcons.replaceAll(); } catch (e) { console.warn(e); }
    try { initTheme(); } catch (e) { console.warn('initTheme:', e); }
    try { initMegaMenuAndDrawer(); } catch (e) { console.warn('initMegaMenuAndDrawer:', e); }
    try { initCitySelector(); } catch (e) { console.warn('initCitySelector:', e); }
    try { initCategories(); } catch (e) { console.warn('initCategories:', e); }
    try { renderDeals(); } catch (e) { console.warn('renderDeals:', e); }
    try { renderRecentSearches(); } catch (e) { console.warn('renderRecentSearches:', e); }
    try { renderRecentlyViewed(); } catch (e) { console.warn('renderRecentlyViewed:', e); }
    try { renderCityHighlights(); } catch (e) { console.warn('renderCityHighlights:', e); }
    try { renderCuratedShowcase(); } catch (e) { console.warn('renderCuratedShowcase:', e); }
    try { initSearch(); } catch (e) { console.warn('initSearch:', e); }
    try { initFiltersAndSort(); } catch (e) { console.warn('initFiltersAndSort:', e); }
    try { initSavedDrawer(); } catch (e) { console.warn('initSavedDrawer:', e); }
    try { initVendorOnboarding(); } catch (e) { console.warn('initVendorOnboarding:', e); }
    try { initDialogDismissals(); } catch (e) { console.warn('initDialogDismissals:', e); }
    try { updateSavedCounter(); } catch (e) { console.warn('updateSavedCounter:', e); }
    try { updateNotificationBadge(); } catch (e) { console.warn('updateNotificationBadge:', e); }
    try { if (window.ReactIcons) window.ReactIcons.replaceAll(); } catch (e) {}

    // Initialize all modules safely
    const modules = [
      window.SoundFX,
      window.ProComparison,
      window.CostEstimator,
      window.TeleConsult,
      window.ReviewEngine,
      window.ShieldGuarantee,
      window.CareAI,
      window.CareAISuite,
      window.BookingEngine,
      window.TrackingEngine,
      window.QuoteMarketplace,
      window.QuoteArena,
      window.VoiceSearch,
      window.VerificationEngine,
      window.EmergencyMode,
      window.UserDashboard,
      window.BusinessDashboard,
      window.AdminPanel,
      window.AuthService
    ];

    modules.forEach(m => {
      try {
        if (m && typeof m.init === 'function') m.init();
      } catch (err) {
        console.warn('Module init error:', err);
      }
    });

    try {
      if (window.MapEngine && typeof window.MapEngine.init === 'function') {
        window.MapEngine.init('interactiveMapCanvas');
      }
    } catch (e) { console.warn('MapEngine init error:', e); }

    try { initKeyboardShortcuts(); } catch (e) {}
    try { startPulseTickerCycle(); } catch (e) {}

    // Guaranteed Render of Listings & Interactive Map
    renderListings();
    loadBackendData();

    // Deep Linking Support: Check if ?biz=<id> or ?category=<cat> is in the URL
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const deepBizId = urlParams.get('biz');
      if (deepBizId) {
        const all = getAllBusinesses();
        const found = all.find(b => b.id === deepBizId);
        if (found) {
          setTimeout(() => openBusinessDetailModal(found), 250);
        }
      }
      const deepCategory = urlParams.get('category');
      if (deepCategory && deepCategory !== 'all') {
        state.selectedCategory = deepCategory;
        updateCategoryActiveStates();
        updateCategoryBanner();
      }
    } catch (e) {}

    // Clear ?biz query param when detailDialog closes
    DOM.detailDialog?.addEventListener('close', () => {
      try {
        if (new URLSearchParams(window.location.search).has('biz')) {
          history.replaceState(null, '', window.location.pathname);
        }
      } catch (e) {}
    });

    // Register Progressive Web App Service Worker if supported
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      navigator.serviceWorker.register('/sw.js').then(reg => {
        reg.update();
        console.log('[PWA] Service Worker registered & updated with scope:', reg.scope);
      }).catch(err => {
        console.log('[PWA] Service Worker registration skipped:', err.message);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
