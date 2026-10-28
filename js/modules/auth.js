/* ==========================================================================
   Local Care - Authentication & Profile Switcher Module
   Supports Phone OTP simulation, Google login simulation, and business account switcher
   ========================================================================== */

window.AuthService = (function () {
  'use strict';

  function init() {
    renderAuthModalShell();
  }

  function renderAuthModalShell() {
    if (document.getElementById('authDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'authDialog';
    dialog.className = 'app-dialog auth-dialog';
    dialog.innerHTML = `
      <div class="dialog-content-wrapper auth-modal-wrapper">
        <div class="dialog-header">
          <h3 class="dialog-title" id="authTitle">Welcome to LocalCare</h3>
          <button class="dialog-close-btn" onclick="document.getElementById('authDialog').close()">✕</button>
        </div>

        <div class="dialog-body auth-modal-body">
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
            Log in to manage bookings, track live technicians, view quote responses, and access exclusive local deals.
          </p>

          <!-- Step 1: Phone Input -->
          <div id="authPhoneStep">
            <form id="authPhoneForm">
              <div class="form-group">
                <label class="form-label">Enter Mobile Number</label>
                <div style="display: flex; gap: 0.5rem;">
                  <span class="phone-prefix">+91</span>
                  <input type="tel" id="authMobileInput" class="form-input" placeholder="98451 98765" value="9845198765" required />
                </div>
              </div>

              <button type="submit" class="action-btn action-btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem;">
                Get Verification OTP ➔
              </button>
            </form>

            <div class="auth-divider"><span>OR CONTINUE WITH</span></div>

            <button type="button" class="btn-oauth btn-google" onclick="window.AuthService.simulateGoogleLogin()">
              <span class="oauth-icon">🌐</span> Continue with Google
            </button>
          </div>

          <!-- Step 2: OTP Verification -->
          <div id="authOtpStep" style="display: none; text-align: center;">
            <h4 style="margin-bottom: 0.35rem;">Enter 4-Digit OTP</h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">Sent via SMS to <span id="authOtpPhoneTarget">+91 98451 98765</span></p>

            <div class="otp-boxes-row">
              <input type="text" maxlength="1" class="otp-box" value="4" />
              <input type="text" maxlength="1" class="otp-box" value="8" />
              <input type="text" maxlength="1" class="otp-box" value="2" />
              <input type="text" maxlength="1" class="otp-box" value="1" />
            </div>

            <button type="button" class="action-btn action-btn-primary" style="width: 100%; justify-content: center; margin-top: 1.25rem;" onclick="window.AuthService.verifyOtp()">
              Verify & Log In
            </button>
          </div>
        </div>

        <div class="dialog-footer" style="justify-content: center; font-size: 0.78rem; color: var(--text-muted);">
          By continuing, you agree to LocalCare's Terms of Use & Privacy Policy.
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
    bindEvents();
  }

  function bindEvents() {
    const phoneForm = document.getElementById('authPhoneForm');
    phoneForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const mobile = document.getElementById('authMobileInput').value.trim();
      document.getElementById('authOtpPhoneTarget').textContent = `+91 ${mobile}`;
      document.getElementById('authPhoneStep').style.display = 'none';
      document.getElementById('authOtpStep').style.display = 'block';
    });
  }

  function openAuthModal() {
    document.getElementById('authPhoneStep').style.display = 'block';
    document.getElementById('authOtpStep').style.display = 'none';
    document.getElementById('authDialog')?.showModal();
  }

  function verifyOtp() {
    document.getElementById('authDialog')?.close();
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('✅ Logged in successfully! Welcome back, Chethan.', 'success');
    }
    if (window.UserDashboard) {
      window.UserDashboard.updateHeaderProfile?.();
    }
  }

  function simulateGoogleLogin() {
    document.getElementById('authDialog')?.close();
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast('✅ Connected via Google Account! Welcome back.', 'success');
    }
  }

  return {
    init,
    openAuthModal,
    verifyOtp,
    simulateGoogleLogin
  };
})();
