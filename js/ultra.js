/**
 * LocalCare Infinity X — Ultra Enhancement Layer v4.0.0
 * Scroll progress · Reveal animations · Animated counters
 * Hero particles · Floating AI orb · Live pro count · Shortcuts
 * Author: Chethan BK · LocalCare Infinity
 */
(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. SCROLL PROGRESS BAR
  ───────────────────────────────────────── */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgressBar');
    if (!bar) return;
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          const scrolled = window.scrollY;
          const total = document.documentElement.scrollHeight - window.innerHeight;
          const pct = total > 0 ? (scrolled / total) * 100 : 0;
          bar.style.width = Math.min(pct, 100) + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────
     2. REVEAL ON SCROLL (IntersectionObserver)
  ───────────────────────────────────────── */
  function initRevealAnimations() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const els = document.querySelectorAll('.reveal-on-scroll');
    if (prefersReduced) {
      els.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '60px 0px -30px 0px' });
    els.forEach(function (el) {
      // Immediately reveal elements already in the viewport (above fold)
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed');
      } else {
        obs.observe(el);
      }
    });
  }

  /* ─────────────────────────────────────────
     3. ANIMATED COUNTERS
  ───────────────────────────────────────── */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal, 10) || 0;
    const duration = 2200;
    const startTime = performance.now();
    const original = el.textContent;

    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const value = target * eased;
      const formatted = target >= 1000
        ? Math.floor(value).toLocaleString('en-IN')
        : value.toFixed(decimals);
      el.textContent = formatted + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Snap to final formatted value
        const finalFormatted = target >= 1000
          ? Math.floor(target).toLocaleString('en-IN')
          : target.toFixed(decimals);
        el.textContent = finalFormatted + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  function initCounters() {
    const els = document.querySelectorAll('.ultra-stat-value[data-count]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(animateCounter);
      return;
    }
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ─────────────────────────────────────────
     4. HERO PARTICLE SYSTEM
  ───────────────────────────────────────── */
  function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const emojis = [
      '⭐', '✨', '🔧', '🩺', '🏠', '⚡', '🚗',
      '🍽️', '🛡️', '💎', '🔥', '📍', '💊', '✂️',
      '📸', '🎓', '🌿', '🏍️'
    ];
    const count = window.innerWidth < 600 ? 8 : 18;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'hero-particle';
      p.textContent = emojis[i % emojis.length];
      const size = 0.65 + Math.random() * 0.85;
      const delay = Math.random() * 10;
      const dur = 9 + Math.random() * 9;
      p.style.cssText = [
        'left:' + (Math.random() * 100) + '%',
        'top:' + (Math.random() * 100) + '%',
        'font-size:' + size + 'rem',
        'opacity:' + (0.08 + Math.random() * 0.18),
        'animation-delay:' + delay + 's',
        'animation-duration:' + dur + 's'
      ].join(';');
      container.appendChild(p);
    }
  }

  /* ─────────────────────────────────────────
     5. FLOATING AI ORB — ATTENTION PULSE
  ───────────────────────────────────────── */
  function initFloatingOrb() {
    const orb = document.getElementById('aiFloatingOrb');
    if (!orb) return;

    // Bounce attention after 3.5s
    setTimeout(function () {
      orb.classList.add('orb-attention');
      setTimeout(function () {
        orb.classList.remove('orb-attention');
      }, 1600);
    }, 3500);

    // Wiggle again every 45s
    setInterval(function () {
      orb.classList.add('orb-attention');
      setTimeout(function () {
        orb.classList.remove('orb-attention');
      }, 1600);
    }, 45000);
  }

  /* ─────────────────────────────────────────
     6. LIVE PRO COUNT FLUCTUATION
  ───────────────────────────────────────── */
  function initLiveProCount() {
    const el = document.getElementById('liveProCount');
    if (!el) return;
    let base = 162;
    setInterval(function () {
      const delta = Math.floor(Math.random() * 9) - 3;
      base = Math.max(140, Math.min(188, base + delta));
      el.textContent = base + '+';
    }, 4800);
  }

  /* ─────────────────────────────────────────
     7. SMART GREETING (time-of-day)
  ───────────────────────────────────────── */
  function updateGreeting() {
    const el = document.getElementById('heroUserGreeting');
    if (!el) return;
    const h = new Date().getHours();
    let greeting;
    if (h < 5)       greeting = 'Burning midnight oil';
    else if (h < 12) greeting = 'Good morning';
    else if (h < 17) greeting = 'Good afternoon';
    else if (h < 21) greeting = 'Good evening';
    else              greeting = 'Working late';
    el.innerHTML = greeting + ', <span class="gradient-text">Chethan</span>';
  }

  /* ─────────────────────────────────────────
     8. KEYBOARD SHORTCUT  Ctrl+K / "/"
  ───────────────────────────────────────── */
  function initSearchShortcut() {
    document.addEventListener('keydown', function (e) {
      const tag = document.activeElement ? document.activeElement.tagName : '';
      const isTyping = ['INPUT', 'TEXTAREA', 'SELECT'].includes(tag) ||
        document.activeElement.isContentEditable;

      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        focusSearch();
      } else if (e.key === '/' && !isTyping) {
        e.preventDefault();
        focusSearch();
      }
    });

    function focusSearch() {
      const inp = document.getElementById('omniboxInput');
      if (inp) {
        inp.focus();
        inp.select();
        inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Flash the omnibox border
        inp.closest('.omnibox-card') && inp.closest('.omnibox-card').classList.add('omnibox-flash');
        setTimeout(function () {
          inp.closest('.omnibox-card') && inp.closest('.omnibox-card').classList.remove('omnibox-flash');
        }, 600);
      }
    }
  }

  /* ─────────────────────────────────────────
     9. UPGRADE EXISTING CARDS (hover glow)
  ───────────────────────────────────────── */
  function upgradeCards() {
    document.querySelectorAll('.business-card:not(.ultra)').forEach(function (c) {
      c.classList.add('ultra');
    });
  }

  function watchCardGrid() {
    const grid = document.getElementById('listingsGrid');
    if (!grid || !('MutationObserver' in window)) return;
    new MutationObserver(function () {
      grid.querySelectorAll('.business-card:not(.ultra)').forEach(function (c) {
        c.classList.add('ultra');
      });
    }).observe(grid, { childList: true, subtree: true });
  }

  /* ─────────────────────────────────────────
     10. RIPPLE EFFECT ON BUTTONS
  ───────────────────────────────────────── */
  function initRipple() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn, .hero-feature-pill, .ultra-btn');
      if (!btn) return;
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple-wave';
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = [
        'position:absolute',
        'border-radius:50%',
        'background:rgba(255,255,255,0.35)',
        'width:' + size + 'px',
        'height:' + size + 'px',
        'left:' + (e.clientX - rect.left - size / 2) + 'px',
        'top:' + (e.clientY - rect.top - size / 2) + 'px',
        'pointer-events:none',
        'animation:ripple-out 0.55s ease-out forwards'
      ].join(';');
      // Ensure btn has position:relative
      const pos = getComputedStyle(btn).position;
      if (pos === 'static') btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 600);
    });
  }

  /* ─────────────────────────────────────────
     11. SECTION HEADER REVEAL DECORATION
  ───────────────────────────────────────── */
  function decorateSectionHeaders() {
    document.querySelectorAll('.section-header:not(.reveal-on-scroll)').forEach(function (h) {
      h.classList.add('reveal-on-scroll');
    });
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  function init() {
    updateGreeting();
    initScrollProgress();
    initRevealAnimations();
    initCounters();
    initHeroParticles();
    initFloatingOrb();
    initLiveProCount();
    initSearchShortcut();
    initRipple();
    decorateSectionHeaders();
    upgradeCards();
    setTimeout(upgradeCards, 500);
    setTimeout(upgradeCards, 1500);
  }

  // Boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // After full load: watch card grid mutations + re-run upgrades
  window.addEventListener('load', function () {
    document.body.classList.add('ultra-page-loaded');
    watchCardGrid();
    upgradeCards();
    // Re-observe any dynamically added reveal elements
    initRevealAnimations();
  });

})();

