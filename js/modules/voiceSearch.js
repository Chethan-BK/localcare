/* ==========================================================================
   Local Care - Voice Search Module
   Web Speech API integration with pulsing audio waves & permission fallbacks
   ========================================================================== */

window.VoiceSearch = (function () {
  'use strict';

  let recognition = null;
  let isListening = false;

  function init() {
    renderVoiceModal();
    setupRecognition();
  }

  function renderVoiceModal() {
    if (document.getElementById('voiceModalDialog')) return;

    const dialog = document.createElement('dialog');
    dialog.id = 'voiceModalDialog';
    dialog.className = 'app-dialog voice-dialog';
    dialog.innerHTML = `
      <div class="dialog-content-wrapper voice-modal-content">
        <button class="dialog-close-btn" onclick="document.getElementById('voiceModalDialog').close()">✕</button>
        
        <div class="voice-modal-inner">
          <div class="voice-wave-container" id="voiceWaveAnimation">
            <span class="voice-bar"></span>
            <span class="voice-bar"></span>
            <span class="voice-bar"></span>
            <span class="voice-bar"></span>
            <span class="voice-bar"></span>
          </div>

          <div class="voice-mic-icon-circle">
            <span class="mic-glyph">🎤</span>
          </div>

          <h3 class="voice-modal-title" id="voiceStatusTitle">Listening...</h3>
          <p class="voice-modal-hint" id="voiceStatusHint">Say something like <em>"AC repair available today"</em> or <em>"Dentist near me"</em></p>

          <div class="voice-transcript-preview" id="voiceTranscriptPreview"></div>

          <div class="voice-fallback-options" id="voiceFallbackOptions" style="display: none; margin-top: 1rem;">
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem;">Microphone not accessible. Try quick voice presets:</p>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
              <button class="quick-tag-chip" onclick="window.VoiceSearch.simulateInput('AC repair available today')">"AC repair available today"</button>
              <button class="quick-tag-chip" onclick="window.VoiceSearch.simulateInput('Dermatologist near Valachil')">"Dermatologist near Valachil"</button>
              <button class="quick-tag-chip" onclick="window.VoiceSearch.simulateInput('Emergency ambulance now')">"Emergency ambulance now"</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);
  }

  function setupRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English

      recognition.onstart = () => {
        isListening = true;
        document.getElementById('voiceStatusTitle').textContent = 'Listening...';
        document.getElementById('voiceWaveAnimation')?.classList.add('active');
        document.getElementById('voiceFallbackOptions').style.display = 'none';
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(r => r[0].transcript)
          .join('');
        
        const preview = document.getElementById('voiceTranscriptPreview');
        if (preview) preview.textContent = `"${transcript}"`;

        if (event.results[0].isFinal) {
          handleRecognizedSpeech(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        isListening = false;
        document.getElementById('voiceStatusTitle').textContent = 'Could not hear audio';
        document.getElementById('voiceWaveAnimation')?.classList.remove('active');
        document.getElementById('voiceFallbackOptions').style.display = 'block';
      };

      recognition.onend = () => {
        isListening = false;
        document.getElementById('voiceWaveAnimation')?.classList.remove('active');
      };
    }
  }

  function startListening() {
    const dialog = document.getElementById('voiceModalDialog');
    if (!dialog) return;

    document.getElementById('voiceTranscriptPreview').textContent = '';
    document.getElementById('voiceFallbackOptions').style.display = 'none';
    dialog.showModal();

    if (recognition) {
      try {
        recognition.start();
      } catch (err) {
        // Recognition already started or error
        document.getElementById('voiceFallbackOptions').style.display = 'block';
      }
    } else {
      document.getElementById('voiceStatusTitle').textContent = 'Voice Search Fallback';
      document.getElementById('voiceStatusHint').textContent = 'Browser speech recognition unavailable. Choose a quick query below:';
      document.getElementById('voiceFallbackOptions').style.display = 'block';
    }
  }

  function handleRecognizedSpeech(transcript) {
    setTimeout(() => {
      document.getElementById('voiceModalDialog')?.close();
      const omnibox = document.getElementById('omniboxInput');
      if (omnibox) {
        omnibox.value = transcript;
        if (window.LocalCare && window.LocalCare.executeSearch) {
          window.LocalCare.executeSearch(transcript);
        }
        if (window.LocalCare && window.LocalCare.showToast) {
          window.LocalCare.showToast(`🎤 Recognized: "${transcript}"`, 'info');
        }
      }
    }, 800);
  }

  function simulateInput(text) {
    handleRecognizedSpeech(text);
  }

  return {
    init,
    startListening,
    simulateInput
  };
})();
