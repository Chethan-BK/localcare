/* ==========================================================================
   Local Care - Sound Effects Engine Module (Web Audio API)
   Procedurally generated audio cues with zero external audio dependencies.
   Provides subtle tactile haptics, success chimes, and emergency alerts.
   ========================================================================== */

window.SoundFX = (function () {
  'use strict';

  let audioCtx = null;
  let isMuted = localStorage.getItem('localcare_sound_muted') === 'true';

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function init() {
    // Unlock AudioContext on first touch/click
    const unlock = () => {
      getAudioContext();
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
    };
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    updateHeaderSoundButton();
  }

  function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('localcare_sound_muted', isMuted);
    updateHeaderSoundButton();
    if (!isMuted) {
      playSuccess();
    }
    if (window.LocalCare && window.LocalCare.showToast) {
      window.LocalCare.showToast(isMuted ? 'Audio cues muted 🔇' : 'Audio cues enabled 🔊', 'info');
    }
    return !isMuted;
  }

  function updateHeaderSoundButton() {
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      btn.innerHTML = isMuted ? '🔇' : '🔊';
      btn.setAttribute('title', isMuted ? 'Enable Sound Effects' : 'Mute Sound Effects');
      btn.setAttribute('aria-label', isMuted ? 'Enable Sound Effects' : 'Mute Sound Effects');
    }
  }

  // 1. Soft Tactile Click / Pop
  function playClick() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      // AudioContext muted or blocked
    }
  }

  // 2. Pleasant Success Chime (C5 -> E5 -> G5)
  function playSuccess() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + (idx * 0.08);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch (e) {}
  }

  // 3. Emergency SOS Siren Warble
  function playEmergencyAlert() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.linearRampToValueAtTime(440, now + 0.15);
      osc.frequency.linearRampToValueAtTime(880, now + 0.30);
      osc.frequency.linearRampToValueAtTime(440, now + 0.45);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.50);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.50);
    } catch (e) {}
  }

  // 4. Subtle Notification / Bubble Ping
  function playBubble() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  return {
    init,
    toggleMute,
    playClick,
    playSuccess,
    playEmergencyAlert,
    playBubble,
    isMuted: () => isMuted
  };
})();
