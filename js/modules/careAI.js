/* ==============================================================================
   Local Care - CareAI 3.0 Supercharged Voice & Multilingual Concierge
   Next-gen conversational assistant with Web Speech synthesis, animated audio
   visualizer, multilingual NLP (Kannada, Hindi, Tamil, English), interactive
   diagnostic troubleshooting, and instant Quote Arena / booking actions.
   ============================================================================== */

window.CareAI = (function () {
  'use strict';

  // Assistant State
  const conversationHistory = [
    {
      role: 'assistant',
      text: "Namaste! I'm <strong>CareAI 3.0</strong>, your hyper-local intelligent concierge. Ask me anything in <strong>English, ಕನ್ನಡ, हिंदी, or தமிழ்</strong> (e.g. <em>'AC cooling nahi ho raha'</em>, <em>'Dentist under ₹500 near me'</em>, or <em>'Koramangala dalli plumber beku'</em>). You can also launch our Live Bidding Arena!",
      chips: [
        { label: 'Live Quote Arena', query: 'Launch Live Quote Arena', icon: 'zap', isArena: true },
        { label: 'Symptom & Fault Wizard', query: 'Symptom and Fault Wizard', icon: 'activity' },
        { label: 'AC repair today', query: 'AC repair available today', icon: 'snowflake' },
        { label: 'Dentist under ₹500', query: 'Dentist under ₹500 near me', icon: 'stethoscope' },
        { label: 'Emergency 108', query: '24/7 Emergency Ambulance 108', icon: 'siren' },
        { label: 'Best biryani near me', query: 'Best biryani restaurants near me', icon: 'utensils' }
      ]
    }
  ];

  let currentContext = {
    category: null,
    urgency: null,
    budget: null,
    locality: null
  };

  let isSpeaking = false;
  let voiceSynthesisMuted = false;
  let visualizerAnimFrame = null;
  let isListeningVoice = false;

  function init() {
    renderCareAIWidget();
    bindEvents();
    initVisualizerCanvas();
  }

  function renderCareAIWidget() {
    if (document.getElementById('careAiContainer')) return;

    const widget = document.createElement('div');
    widget.id = 'careAiContainer';
    widget.innerHTML = `
      <!-- CareAI Floating Trigger Button -->
      <button class="careai-float-btn" id="careAiTriggerBtn" aria-label="Open CareAI 3.0 Assistant" title="Chat with CareAI 3.0">
        <div class="careai-btn-inner">
          <span class="careai-sparkle-icon">✨</span>
          <span class="careai-btn-text">CareAI 3.0</span>
        </div>
        <span class="careai-status-pulse"></span>
      </button>

      <!-- CareAI Chat Drawer / Modal -->
      <div class="careai-panel" id="careAiPanel" role="dialog" aria-labelledby="careAiTitle" aria-hidden="true">
        <div class="careai-panel-header">
          <div class="careai-header-left">
            <div class="careai-avatar-badge-3d" id="careAiAvatarBadge">
              <canvas id="careAiVoiceCanvas" width="48" height="48" class="careai-voice-canvas"></canvas>
              <span class="careai-avatar-emoji" data-react-icon="bot" data-icon-size="20"></span>
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: 0.45rem;">
                <h3 class="careai-title" id="careAiTitle">CareAI 3.0 Voice Concierge</h3>
                <span class="careai-v3-badge">V3 PRO</span>
              </div>
              <div class="careai-subtitle">
                <span class="online-indicator"></span> Multilingual • Live Speech Synthesis
              </div>
            </div>
          </div>
          <div class="careai-header-actions">
            <button class="careai-action-icon" id="careAiVoiceReadoutBtn" onclick="window.CareAI.toggleReadout()" title="Toggle Speech Audio Feedback">
              <span data-react-icon="volume2" data-icon-size="15"></span>
            </button>
            <button class="careai-action-icon" id="careAiResetBtn" title="Reset Conversation">
              <span data-react-icon="refresh" data-icon-size="14"></span>
            </button>
            <button class="careai-action-icon" id="careAiCloseBtn" title="Close CareAI">
              <span data-react-icon="x" data-icon-size="15"></span>
            </button>
          </div>
        </div>

        <!-- Quick AI Power Strip -->
        <div class="careai-wizards-strip">
          <button class="careai-wiz-btn arena-btn-highlight" onclick="window.CareAI.launchArenaFromAI()">
            <span data-react-icon="zap" data-icon-size="13" data-icon-class="react-icon-gold"></span> Live Bidding Arena
          </button>
          <button class="careai-wiz-btn" onclick="window.CareAI.launchDiagnosticWizard('ac')">
            <span data-react-icon="snowflake" data-icon-size="13"></span> AC Triage
          </button>
          <button class="careai-wiz-btn" onclick="window.CareAI.launchDiagnosticWizard('health')">
            <span data-react-icon="stethoscope" data-icon-size="13"></span> Health Check
          </button>
          <button class="careai-wiz-btn" onclick="window.CareAI.launchDiagnosticWizard('plumbing')">
            <span data-react-icon="wrench" data-icon-size="13"></span> Leak Detective
          </button>
        </div>

        <!-- Chat Messages Container -->
        <div class="careai-body" id="careAiMessages">
          <!-- Rendered dynamically -->
        </div>

        <!-- Suggestion Chips Bar -->
        <div class="careai-chips-bar" id="careAiChipsBar">
          <!-- Quick action chips -->
        </div>

        <!-- Input Box & Speech Controls -->
        <div class="careai-footer">
          <form id="careAiForm" class="careai-input-form">
            <button type="button" class="careai-mic-btn" id="careAiMicBtn" onclick="window.CareAI.listenVoiceInput()" title="Speak to CareAI">
              <span data-react-icon="mic" data-icon-size="16"></span>
            </button>
            <input 
              type="text" 
              id="careAiInput" 
              class="careai-input" 
              placeholder="Ask anything in English, Kannada, Hindi, Tamil..." 
              autocomplete="off"
            />
            <button type="submit" class="careai-send-btn" id="careAiSendBtn" aria-label="Send message">
              <span data-react-icon="arrowRight" data-icon-size="14"></span>
            </button>
          </form>
          <div class="careai-disclaimer">
            <span>🇮🇳 Multilingual Local Engine • Instant 1-Click Doorstep Dispatch</span>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(widget);
    renderMessages();
  }

  function initVisualizerCanvas() {
    const canvas = document.getElementById('careAiVoiceCanvas');
    if (!canvas || typeof canvas.getContext !== 'function') return;
    const ctx = canvas.getContext('2d');
    let phase = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (isSpeaking) {
        // Dynamic expanding neon rings
        ctx.strokeStyle = '#f97316';
        ctx.lineWidth = 2;
        ctx.beginPath();
        const r1 = 16 + Math.sin(phase) * 6;
        ctx.arc(cx, cy, r1, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#7c3aed';
        ctx.beginPath();
        const r2 = 20 + Math.cos(phase * 1.5) * 4;
        ctx.arc(cx, cy, r2, 0, Math.PI * 2);
        ctx.stroke();

        phase += 0.12;
      } else {
        // Gentle breathing ring
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const r = 18 + Math.sin(phase) * 2;
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        phase += 0.04;
      }

      if (typeof requestAnimationFrame === 'function') {
        visualizerAnimFrame = requestAnimationFrame(draw);
      }
    }

    draw();
  }

  function bindEvents() {
    const triggerBtn = document.getElementById('careAiTriggerBtn');
    const closeBtn = document.getElementById('careAiCloseBtn');
    const resetBtn = document.getElementById('careAiResetBtn');
    const panel = document.getElementById('careAiPanel');
    const form = document.getElementById('careAiForm');
    const input = document.getElementById('careAiInput');

    triggerBtn?.addEventListener('click', () => {
      panel.classList.toggle('active');
      const isActive = panel.classList.contains('active');
      panel.setAttribute('aria-hidden', !isActive);
      if (isActive) {
        input.focus();
        if (window.SoundFX) window.SoundFX.playBubble();
      }
    });

    closeBtn?.addEventListener('click', () => {
      panel.classList.remove('active');
      panel.setAttribute('aria-hidden', 'true');
      stopSpeech();
    });

    resetBtn?.addEventListener('click', () => {
      conversationHistory.length = 1;
      currentContext = { category: null, urgency: null, budget: null, locality: null };
      renderMessages();
      stopSpeech();
      if (window.SoundFX) window.SoundFX.playClick();
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      addUserMessage(text);
      input.value = '';
    });
  }

  function toggleReadout() {
    voiceSynthesisMuted = !voiceSynthesisMuted;
    const btn = document.getElementById('careAiVoiceReadoutBtn');
    if (btn) {
      btn.style.color = !voiceSynthesisMuted ? 'var(--primary)' : 'inherit';
      btn.innerHTML = window.ReactIcons ? window.ReactIcons.render(!voiceSynthesisMuted ? 'volume2' : 'volumeX', { size: 16 }) : (!voiceSynthesisMuted ? '🔊' : '🔇');
    }
    if (window.LocalCare) {
      window.LocalCare.showToast(!voiceSynthesisMuted ? 'Voice readout enabled' : 'Voice readout muted', 'info');
    }
    if (voiceSynthesisMuted) {
      stopSpeech();
    }
  }

  function stopSpeech() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    isSpeaking = false;
  }

  function speakText(text) {
    if (voiceSynthesisMuted || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/<[^>]*>/g, '').replace(/₹/g, 'Rupees ');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Auto-detect language voice
      const voices = window.speechSynthesis.getVoices();
      const indianVoice = voices.find(v => v.lang.includes('IN') || v.lang.includes('hi') || v.lang.includes('kn') || v.lang.includes('ta')) || voices[0];
      if (indianVoice) {
        utterance.voice = indianVoice;
      }
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => { isSpeaking = true; };
      utterance.onend = () => { isSpeaking = false; };
      utterance.onerror = () => { isSpeaking = false; };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      isSpeaking = false;
    }
  }

  function listenVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (window.LocalCare) window.LocalCare.showToast('Speech recognition not supported in this browser', 'warning');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    const micBtn = document.getElementById('careAiMicBtn');
    if (micBtn) micBtn.classList.add('mic-listening');

    recognition.onstart = () => {
      isListeningVoice = true;
      if (window.LocalCare) window.LocalCare.showToast('Listening... Speak your requirement', 'info');
      if (window.SoundFX) window.SoundFX.playBubble();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const input = document.getElementById('careAiInput');
      if (input) input.value = transcript;
      addUserMessage(transcript);
    };

    recognition.onerror = () => {
      if (micBtn) micBtn.classList.remove('mic-listening');
      isListeningVoice = false;
    };

    recognition.onend = () => {
      if (micBtn) micBtn.classList.remove('mic-listening');
      isListeningVoice = false;
    };

    recognition.start();
  }

  function addUserMessage(text) {
    conversationHistory.push({ role: 'user', text });
    renderMessages();
    if (window.SoundFX) window.SoundFX.playClick();

    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();
      processAIResponse(text);
    }, 550);
  }

  function showTypingIndicator() {
    const msgContainer = document.getElementById('careAiMessages');
    if (!msgContainer) return;

    const typingEl = document.createElement('div');
    typingEl.id = 'careAiTyping';
    typingEl.className = 'careai-msg careai-msg-assistant';
    typingEl.innerHTML = `
      <div class="typing-bubble">
        <span></span><span></span><span></span>
      </div>
    `;
    msgContainer.appendChild(typingEl);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    document.getElementById('careAiTyping')?.remove();
  }

  function processAIResponse(userInput) {
    const activeCity = localStorage.getItem('localcare_city') || 'Bengaluru';
    const parsed = window.AISearchEngine ? window.AISearchEngine.parseQuery(userInput, activeCity) : { isAI: false };

    if (parsed.category) currentContext.category = parsed.category;
    if (parsed.urgency) currentContext.urgency = parsed.urgency;
    if (parsed.maxBudget) currentContext.budget = parsed.maxBudget;
    if (parsed.locality) currentContext.locality = parsed.locality;

    const allBusinesses = (window.LocalCare && window.LocalCare.getAllBusinesses) 
      ? window.LocalCare.getAllBusinesses() 
      : (window.INITIAL_BUSINESSES || []);
    const userCity = parsed.city || activeCity;

    let matched = allBusinesses.filter(b => {
      if (b.city.toLowerCase() !== userCity.toLowerCase()) return false;
      if (currentContext.category && b.category !== currentContext.category) return false;
      if (currentContext.locality && !b.locality.toLowerCase().includes(currentContext.locality.toLowerCase())) return false;
      if (currentContext.budget && b.startingPrice && b.startingPrice > currentContext.budget) return false;
      if (currentContext.urgency === 'today' && !b.availableToday) return false;
      return true;
    });

    if (matched.length === 0 && currentContext.category) {
      matched = allBusinesses.filter(b => b.category === currentContext.category && b.city.toLowerCase() === userCity.toLowerCase());
    }

    let responseText = '';
    let responseCards = [];
    let responseChips = [];

    const lowerInput = userInput.toLowerCase();

    // Check multilingual phrases (Kannada, Hindi, Tamil)
    const isKannada = /beku|illa|yelli|madoke|ivatte|mane|oora/i.test(lowerInput);
    const isHindi = /chahiye|karo|nahi|kahan|aaj|ghar|paani|batao/i.test(lowerInput);
    const isTamil = /venum|illai|enga|pannanum|veedu/i.test(lowerInput);

    if (lowerInput.includes('arena') || lowerInput.includes('auction') || lowerInput.includes('bidding') || lowerInput.includes('reverse bid')) {
      responseText = `⚡ <strong>Live Reverse-Bidding Arena is Ready!</strong><br>Nearby verified professionals are on standby to compete and undercut prices live in real-time.`;
      responseChips = ['Launch Live Bidding Arena ⚡', 'Split AC Service Auction', 'Plumbing Leakage Auction'];
      if (window.QuoteArena) {
        setTimeout(() => { window.QuoteArena.openArena(currentContext.category || 'electrical', currentContext.locality); }, 400);
      }
    } else if (isKannada) {
      responseText = `ನಮಸ್ಕಾರ! ನಿಮ್ಮ ಅವಶ್ಯಕತೆಗೆ ತಕ್ಕಂತೆ <strong>${userCity}</strong> ನಲ್ಲಿ ಪರಿಶೀಲಿತ (Verified) ಸೇವೆಗಳನ್ನು ಹುಡುಕಿದ್ದೇನೆ. ಬೆಲೆ ಹೋಲಿಕೆ ಮಾಡಿ ಅಥವಾ ಲೈವ್ ಬಿಡ್ಡಿಂಗ್ ಅರೇನಾದಲ್ಲಿ ಕಡಿಮೆ ದರ ಪಡೆಯಿರಿ!`;
      responseCards = matched.slice(0, 2);
      responseChips = ['⚡ Enter Live Quote Arena', 'Book Appointment Now', 'View Rates on Map'];
    } else if (isHindi) {
      responseText = `नमस्ते! आपकी आवश्यकता के लिए <strong>${userCity}</strong> में सबसे भरोसेमंद और सत्यापित प्रोफेशनल्स उपलब्ध हैं। क्या आप लाइव कोटेशन ऑक्शन शुरू करना चाहते हैं?`;
      responseCards = matched.slice(0, 2);
      responseChips = ['⚡ Live Bidding Arena शुरू करें', 'Book Doctor / Clinic', '3 Free Quotes लें'];
    } else if (isTamil) {
      responseText = `வணக்கம்! <strong>${userCity}</strong> இல் சிறந்த சரிபார்க்கப்பட்ட நிபுணர்களைக் கண்டறிந்துள்ளேன். உடனடி சேவைக்கு முன்பதிவு செய்யுங்கள்!`;
      responseCards = matched.slice(0, 2);
      responseChips = ['⚡ Live Quote Arena', 'Book Appointment', 'Check Rates'];
    } else if (lowerInput.includes('compare')) {
      let compareCategory = currentContext.category || 'tech';
      if (lowerInput.includes('laptop') || lowerInput.includes('mobile') || lowerInput.includes('tech')) compareCategory = 'tech';
      else if (lowerInput.includes('ac') || lowerInput.includes('electric')) compareCategory = 'electrical';
      else if (lowerInput.includes('plumb') || lowerInput.includes('pipe')) compareCategory = 'home';
      else if (lowerInput.includes('doctor') || lowerInput.includes('dentist') || lowerInput.includes('health')) compareCategory = 'health';
      else if (lowerInput.includes('car') || lowerInput.includes('auto')) compareCategory = 'auto';

      let catMatches = allBusinesses.filter(b => b.category === compareCategory && b.city.toLowerCase() === userCity.toLowerCase());
      if (catMatches.length === 0) {
        catMatches = allBusinesses.filter(b => b.category === compareCategory);
      }

      if (catMatches.length >= 2 && window.ProComparison) {
        catMatches.slice(0, 3).forEach(b => {
          if (!window.ProComparison.isComparing(b.id)) {
            window.ProComparison.toggleCompare(b.id);
          }
        });
        window.ProComparison.openModal();
      }

      responseText = `I've opened the <strong>Side-by-Side Pro Comparison Matrix</strong> with top rated <strong>${compareCategory.toUpperCase()}</strong> specialists in ${userCity}. You can evaluate verified trust scores, starting prices, and response speeds!`;
      responseCards = catMatches.slice(0, 3);
      responseChips = ['Open Full Comparison ⚖️', '⚡ Enter Live Quote Arena', 'Book Top Rated Pro'];
    } else if (lowerInput.includes('pg') || lowerInput.includes('hostel') || lowerInput.includes('stay') || lowerInput.includes('flat') || lowerInput.includes('room')) {
      const stays = allBusinesses.filter(b => b.category === 'stays' && b.city.toLowerCase() === userCity.toLowerCase());
      responseText = `Here are verified, background-checked <strong>PG Accommodations & Living Spaces</strong> in <strong>${userCity}</strong> with furnished amenities & high security:`;
      responseCards = stays.length > 0 ? stays.slice(0, 2) : allBusinesses.filter(b => b.category === 'stays').slice(0, 2);
      responseChips = ['Schedule Room Visit', 'Compare Amenities ⚖️', 'Filter: Single Sharing'];
    } else if (lowerInput.includes('veg') || lowerInput.includes('biryani') || lowerInput.includes('restaurant') || lowerInput.includes('food') || lowerInput.includes('dining')) {
      const foodPlaces = allBusinesses.filter(b => b.category === 'food' && b.city.toLowerCase() === userCity.toLowerCase());
      responseText = `Here are hygiene-verified <strong>Pure Veg & Authentic Dining destinations</strong> in <strong>${userCity}</strong> with top cleanliness audit scores:`;
      responseCards = foodPlaces.length > 0 ? foodPlaces.slice(0, 2) : allBusinesses.filter(b => b.category === 'food').slice(0, 2);
      responseChips = ['Reserve Table Now', 'View Verified Rate Card', 'Order Doorstep Delivery'];
    } else if (lowerInput.includes('wizard') || lowerInput.includes('troubleshoot') || lowerInput.includes('symptom')) {
      responseText = `I've opened the <strong>Interactive Fault & Symptom Diagnostic Assistant</strong>. Pick your system below:`;
      responseChips = ['⚡ AC Troubleshooter', '🩺 Dental & Doctor Symptom Triage', '🔧 Water Leakage Detective'];
    } else if (lowerInput.includes('ambulance') || lowerInput.includes('emergency')) {
      responseText = `🚨 <strong>Emergency Response Mode Activated!</strong><br>Dispatching 24/7 verified emergency medical care in <strong>${userCity}</strong> with sub-10 minute arrival times:`;
      responseCards = allBusinesses.filter(b => b.category === 'emergency' && b.city.toLowerCase() === userCity.toLowerCase()).slice(0, 2);
      responseChips = ['Call 24/7 Ambulance Now', 'Hospital Trauma Center', 'Emergency Plumber'];
    } else if (matched.length > 0) {
      responseText = `I found <strong>${matched.length} verified providers</strong> in <strong>${userCity}</strong> matching your request. You can book directly or broadcast to our Live Arena for lowest quotes:`;
      responseCards = matched.slice(0, 2);
      responseChips = ['⚡ Broadcast in Live Arena', 'Book Now', 'Filter: Available Today', 'Compare Pros ⚖️'];
    } else {
      responseText = `I understand you're looking for assistance with <em>"${userInput}"</em> in ${userCity}. Would you like me to broadcast a request to local verified experts in the Live Bidding Arena?`;
      responseChips = ['⚡ Enter Live Quote Arena', 'Launch Cost Estimator', 'Search All Categories'];
    }

    conversationHistory.push({
      role: 'assistant',
      text: responseText,
      cards: responseCards,
      chips: responseChips
    });

    renderMessages();
    speakText(responseText);
    if (window.SoundFX) window.SoundFX.playBubble();
  }

  function launchDiagnosticWizard(type) {
    let question = '';
    let options = [];

    if (type === 'ac') {
      question = "<strong>AC Diagnostic Wizard:</strong> What seems to be the primary symptom?<br>1. Air is blowing but not cooling<br>2. Water dripping from indoor unit<br>3. Unit making loud buzzing/rattling noise";
      options = ['AC Not Cooling At All', 'Water Dripping Inside', 'Loud Fan Noise', '⚡ Enter Live Quote Arena'];
    } else if (type === 'health') {
      question = "<strong>Health Symptom Triage:</strong> What issue are you experiencing today?<br>1. Tooth sensitivity or acute dental pain<br>2. Skin rash / acne flareup<br>3. Fever or seasonal cough";
      options = ['Tooth Sensitivity & Ache', 'Skin Allergy / Rash', 'Child Fever (Pediatrician)', 'Joint / Back Pain'];
    } else {
      question = "<strong>Plumbing Leak Detective:</strong> Where is the water leakage located?<br>1. Wall / Concealed pipe seepage<br>2. Sink / Washbasin drain pipe<br>3. Overhead water tank overflow";
      options = ['Concealed Wall Seepage', 'Sink / Tap Leakage', '⚡ Broadcast in Live Arena', 'Low Water Pressure'];
    }

    conversationHistory.push({
      role: 'assistant',
      text: question,
      chips: options
    });

    renderMessages();
    speakText(question);
    if (window.SoundFX) window.SoundFX.playBubble();
  }

  function launchArenaFromAI() {
    if (window.QuoteArena) {
      window.QuoteArena.openArena(currentContext.category || 'electrical', currentContext.locality);
    }
  }

  function renderMessages() {
    const msgContainer = document.getElementById('careAiMessages');
    const chipsBar = document.getElementById('careAiChipsBar');
    if (!msgContainer || !chipsBar) return;

    msgContainer.innerHTML = conversationHistory.map((msg) => {
      let cardsHtml = '';

      if (msg.cards && msg.cards.length > 0) {
        cardsHtml = `
          <div class="careai-card-group">
            ${msg.cards.map(b => `
              <div class="careai-business-preview" data-id="${b.id}">
                <img src="${b.image}" alt="${b.name}" class="careai-biz-thumb" />
                <div class="careai-biz-info">
                  <div class="careai-biz-name">${b.name}</div>
                  <div class="careai-biz-meta">
                    <span class="rating-tag">★ ${b.rating}</span>
                    <span>📍 ${b.locality}</span>
                    <span>Starts ₹${b.startingPrice || 299}</span>
                  </div>
                  <div class="careai-biz-actions">
                    <button class="careai-btn-book" onclick="window.CareAI.bookFromChat('${b.id}')">⚡ Book</button>
                    <button class="careai-btn-view" onclick="window.CareAI.viewFromChat('${b.id}')">Profile</button>
                    <button class="careai-btn-compare" onclick="window.ProComparison.toggleCompare('${b.id}')">⚖️ Compare</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      return `
        <div class="careai-msg careai-msg-${msg.role}">
          <div class="careai-bubble">
            <p>${msg.text}</p>
            ${cardsHtml}
          </div>
        </div>
      `;
    }).join('');

    const lastAssistantMsg = [...conversationHistory].reverse().find(m => m.role === 'assistant');
    if (lastAssistantMsg && lastAssistantMsg.chips && lastAssistantMsg.chips.length > 0) {
      chipsBar.innerHTML = lastAssistantMsg.chips.map(chipItem => {
        if (typeof chipItem === 'object' && chipItem !== null) {
          const iconHtml = chipItem.icon && window.ReactIcons ? window.ReactIcons.render(chipItem.icon, { size: 13, className: chipItem.isArena ? 'react-icon-gold' : '' }) : '';
          return `
            <button class="careai-chip ${chipItem.isArena ? 'chip-arena' : ''}" onclick="window.CareAI.sendQuickChip('${chipItem.query.replace(/'/g, "\\'")}')">
              ${iconHtml} <span>${chipItem.label}</span>
            </button>
          `;
        }
        const text = String(chipItem);
        const isArena = text.includes('Arena');
        return `
          <button class="careai-chip ${isArena ? 'chip-arena' : ''}" onclick="window.CareAI.sendQuickChip('${text.replace(/'/g, "\\'")}')">
            <span>${text}</span>
          </button>
        `;
      }).join('');
      chipsBar.style.display = 'flex';
    } else {
      chipsBar.style.display = 'none';
    }

    if (window.ReactIcons) {
      window.ReactIcons.replaceAll(document.getElementById('careAiPanel'));
    }

    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function sendQuickChip(text) {
    if (text.includes('Arena')) {
      launchArenaFromAI();
      return;
    }
    if (text.includes('Wizard') || text.includes('Fault')) {
      launchDiagnosticWizard('health');
      return;
    }
    if (text.includes('Quotes')) {
      if (window.QuoteMarketplace) {
        window.QuoteMarketplace.openQuotesModal();
      }
      return;
    }
    if (text.includes('Cost Estimator')) {
      if (window.CostEstimator) {
        window.CostEstimator.openEstimator();
      }
      return;
    }
    if (text.includes('Compare Pros') || text.includes('Comparison')) {
      if (window.ProComparison) {
        window.ProComparison.openModal();
      }
      return;
    }
    addUserMessage(text);
  }

  function bookFromChat(businessId) {
    if (window.BookingEngine && window.BookingEngine.openBookingModal) {
      const all = (window.LocalCare && window.LocalCare.getAllBusinesses) ? window.LocalCare.getAllBusinesses() : (window.INITIAL_BUSINESSES || []);
      const b = all.find(item => item.id === businessId);
      if (b) window.BookingEngine.openBookingModal(b);
    }
  }

  function viewFromChat(businessId) {
    const all = (window.LocalCare && window.LocalCare.getAllBusinesses) ? window.LocalCare.getAllBusinesses() : (window.INITIAL_BUSINESSES || []);
    const b = all.find(item => item.id === businessId);
    if (b && window.LocalCare) {
      if (window.LocalCare.openDetailModal) {
        window.LocalCare.openDetailModal(b);
      } else if (window.LocalCare.openBusinessDetailModal) {
        window.LocalCare.openBusinessDetailModal(b);
      }
    }
  }

  function openAssistantWithQuery(query) {
    const panel = document.getElementById('careAiPanel');
    if (panel) {
      panel.classList.add('active');
      panel.setAttribute('aria-hidden', 'false');
    }
    if (query) {
      addUserMessage(query);
    }
  }

  return {
    init,
    sendQuickChip,
    bookFromChat,
    viewFromChat,
    openAssistantWithQuery,
    launchDiagnosticWizard,
    launchArenaFromAI,
    toggleReadout,
    listenVoiceInput
  };
})();

// Auto-initialize
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.CareAI.init);
  } else {
    window.CareAI.init();
  }
}
