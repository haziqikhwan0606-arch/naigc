/**
 * NAIGC NEURAL COPILOT // ACTIVE THEORY HOLOGRAPHIC AI AGENT
 * Client-Side Autonomous Question Answering Engine for 8 Strategic Pillars
 */
(function() {
  'use strict';

  function initChatCopilot() {
    const dialog = document.getElementById('at-search-dialog');
    const askBtn = document.getElementById('at-btn-ask');
    if (!dialog || !askBtn) return;

    // Detect Pillar Identity from Title or Subtitle
    const pageTitle = document.title || '';
    const logoSub = document.querySelector('.at-logo-sub')?.textContent || '';
    let pillarName = 'AI STRATEGIC PILLAR';
    if (pageTitle.includes('ACADEMY')) pillarName = 'AI ACADEMY';
    else if (pageTitle.includes('BUSINESS')) pillarName = 'AI BUSINESS SOLUTIONS';
    else if (pageTitle.includes('CREATIVE')) pillarName = 'AI CREATIVE STUDIO';
    else if (pageTitle.includes('ENTERPRISE')) pillarName = 'AI ENTERPRISE & GOVT';
    else if (pageTitle.includes('ENTREPRENEURSHIP')) pillarName = 'AI ENTREPRENEURSHIP & OPC';
    else if (pageTitle.includes('FUTURE')) pillarName = 'AI FUTURE TECHNOLOGY';
    else if (pageTitle.includes('RESEARCH')) pillarName = 'AI RESEARCH & INNOVATION';
    else if (pageTitle.includes('WORKFORCE')) pillarName = 'AI WORKFORCE & TALENT';
    else if (logoSub) pillarName = logoSub.replace(/.*?SYS\/\/NODE\.\d+\s*/i, '').trim();

    // Collect initial suggested queries from existing hints if available
    const existingHints = [];
    document.querySelectorAll('.at-search-hints span').forEach(el => {
      const q = el.getAttribute('data-search') || el.textContent.replace('#', '').trim();
      if (q && !existingHints.includes(q)) existingHints.push(q);
    });

    // Default universal chips
    const defaultChips = [
      'Modules & Curriculum',
      'Strategic Roadmap',
      'Certification & Standards',
      'Target Audience & Prerequisites',
      'Pricing & Consultation'
    ];
    const allChips = Array.from(new Set([...existingHints, ...defaultChips]));

    // Upgrade dialog markup
    dialog.className = 'at-ai-modal-backdrop';
    dialog.innerHTML = `
      <div class="at-ai-modal-window">
        <div class="at-ai-header">
          <div class="at-ai-status">
            <span class="at-ai-pulse-dot"></span>
            <span class="at-ai-status-title">NAIGC NEURAL COPILOT // ${pillarName}</span>
            <span class="at-ai-badge">CORE v3.8 ONLINE</span>
          </div>
          <div class="at-ai-controls">
            <button type="button" class="at-ai-clear-btn" id="at-ai-clear-btn" title="Reset Conversation">[RESET]</button>
            <button type="button" class="at-ai-close-btn" id="at-ai-close-btn" title="Close Dialog">[✕ ESC]</button>
          </div>
        </div>

        <div class="at-ai-dialogue-feed" id="at-ai-dialogue-feed"></div>

        <div class="at-ai-chips-bar" id="at-ai-chips-bar">
          ${allChips.map(chip => `<button type="button" class="at-ai-chip" data-query="${chip}">#${chip}</button>`).join('')}
        </div>

        <form class="at-ai-input-bar" id="at-ai-form">
          <span class="at-ai-prompt-symbol">&gt;</span>
          <input type="text" class="at-ai-input-field" id="at-ai-input-field" placeholder="Ask anything about ${pillarName.toLowerCase()}, modules, certifications, or roadmap..." autocomplete="off">
          <button type="submit" class="at-ai-send-btn" id="at-ai-send-btn">
            <span>SEND</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </form>
      </div>
    `;

    const feed = document.getElementById('at-ai-dialogue-feed');
    const form = document.getElementById('at-ai-form');
    const input = document.getElementById('at-ai-input-field');
    const closeBtn = document.getElementById('at-ai-close-btn');
    const clearBtn = document.getElementById('at-ai-clear-btn');
    const chipsBar = document.getElementById('at-ai-chips-bar');

    // Initial greeting
    function renderInitialGreeting() {
      feed.innerHTML = '';
      appendBotMessage(`
        <h4>// NEURAL INTELLIGENCE ONLINE //</h4>
        <p>Greetings, Operator. I am the NAIGC Neural Assistant for <strong>${pillarName}</strong>.</p>
        <p>I have direct telemetry into this pillar's modules, syllabus, technical specifications, and national strategic roadmap. How may I assist your mission today?</p>
        <p style="font-size:0.8rem; color: var(--at-cyan); opacity:0.85;">Tip: Click any prompt chip below or type any question to begin.</p>
      `, false);
    }

    renderInitialGreeting();

    // Sound effect helper
    function playAudio(type) {
      try {
        if (window.sound) {
          if (type === 'hover' && typeof sound.playHover === 'function') sound.playHover();
          else if (type === 'slide' && typeof sound.playSlide === 'function') sound.playSlide();
        }
      } catch (e) {}
    }

    // Open/Close Dialog
    function openDialog() {
      dialog.classList.add('is-active');
      playAudio('slide');
      setTimeout(() => input.focus(), 100);
    }

    function closeDialog() {
      dialog.classList.remove('is-active');
      playAudio('slide');
    }

    askBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openDialog();
    });

    closeBtn.addEventListener('click', closeDialog);
    clearBtn.addEventListener('click', () => {
      playAudio('hover');
      renderInitialGreeting();
    });

    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) closeDialog();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dialog.classList.contains('is-active')) {
        closeDialog();
      }
    });

    // Message Rendering Helpers
    function appendUserMessage(text) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'at-ai-msg at-ai-msg-user';
      msgDiv.innerHTML = `
        <div class="at-ai-msg-sender">OPERATOR &bull; QUERY</div>
        <div class="at-ai-msg-body">${escapeHTML(text)}</div>
      `;
      feed.appendChild(msgDiv);
      feed.scrollTop = feed.scrollHeight;
    }

    function appendBotMessage(response, withActions = true) {
      const isWarning = typeof response === 'object' && response.isWarning;
      const htmlContent = typeof response === 'object' ? response.html : response;

      const msgDiv = document.createElement('div');
      msgDiv.className = 'at-ai-msg at-ai-msg-bot' + (isWarning ? ' at-ai-msg-warning' : '');
      msgDiv.innerHTML = `
        <div class="at-ai-msg-sender">${isWarning ? '⚠ SYSTEM // TELEMETRY ALERT' : 'NAIGC CORE // ' + pillarName}</div>
        <div class="at-ai-msg-body">${htmlContent}</div>
      `;
      feed.appendChild(msgDiv);

      // Attach jump actions
      msgDiv.querySelectorAll('.at-ai-action-jump').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-index'), 10);
          closeDialog();
          if (!isNaN(idx) && window.modulesData && window.modulesData[idx]) {
            if (typeof window.targetAngle !== 'undefined' && typeof window.angleStep !== 'undefined') {
              window.targetAngle = -idx * window.angleStep;
            }
            if (window.modulesData[idx].isRoadmap && typeof window.openLightbox === 'function') {
              setTimeout(window.openLightbox, 350);
            } else if (typeof window.openDrawer === 'function') {
              setTimeout(() => window.openDrawer(idx), 350);
            }
          }
        });
      });

      msgDiv.querySelectorAll('.at-ai-action-roadmap').forEach(btn => {
        btn.addEventListener('click', () => {
          closeDialog();
          if (typeof window.openLightbox === 'function') {
            setTimeout(window.openLightbox, 300);
          }
        });
      });

      feed.scrollTop = feed.scrollHeight;
    }

    function showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.className = 'at-ai-typing';
      typingDiv.id = 'at-ai-typing-temp';
      typingDiv.innerHTML = `
        <span>PROCESSING NEURAL TELEMETRY</span>
        <div class="at-ai-typing-dots">
          <span></span><span></span><span></span>
        </div>
      `;
      feed.appendChild(typingDiv);
      feed.scrollTop = feed.scrollHeight;
    }

    function removeTypingIndicator() {
      const typing = document.getElementById('at-ai-typing-temp');
      if (typing) typing.remove();
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
      }[tag] || tag));
    }

    // Detect gibberish / invalid random keystrokes
    function isGibberish(str) {
      const clean = str.toLowerCase().replace(/[^a-z]/g, '');
      if (!clean || clean.length < 2) return true;
      // Common keyboard mashing sequences
      if (/asdf|sdfg|dfgh|fghj|ghjk|hjkl|qwer|wert|erty|rtyu|tyui|yuio|uiop|zxcv|xcvb|cvbn|vbnm/.test(clean)) return true;
      // Repeated consecutive identical characters (e.g., "aaaaa", "zzzz")
      if (/([a-z])\1{2,}/.test(clean)) return true;
      // Words with >= 5 letters but very low vowel ratio (e.g. "kjdskfndlskdf")
      const vowels = clean.match(/[aeiouy]/g);
      if (clean.length >= 5 && (!vowels || (vowels.length / clean.length) < 0.2)) {
        return true;
      }
      return false;
    }

    // Intelligent Question Answering Engine
    function processQuery(rawQuery) {
      const q = rawQuery.toLowerCase().trim();
      const mods = window.modulesData || [];

      // Check for gibberish / invalid character string
      if (isGibberish(rawQuery)) {
        return {
          isWarning: true,
          html: `
            <h4 style="color:#FF5555; display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF5555" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              // ERROR: UNRECOGNIZED INPUT SEQUENCE //
            </h4>
            <p>The neural core could not recognize or decode <em>"${escapeHTML(rawQuery)}"</em>. The input is invalid or cannot be parsed as a meaningful question.</p>
            <p style="font-size:0.85rem; color:#CAD7E6; margin-top:0.45rem;">
              The system cannot process this input. Please enter a valid inquiry about <strong>${pillarName}</strong> (such as modules, curriculum, certifications, or roadmap), or click any of the prompt chips below.
            </p>
          `
        };
      }

      // 1. Module List / Curriculum / Courses
      if (q.includes('module') || q.includes('course') || q.includes('curriculum') || q.includes('syllabus') || q.includes('what do you teach') || q.includes('what are the options')) {
        let html = `<h4>// ${pillarName} &bull; ACCREDITED MODULES //</h4>`;
        html += `<p>Here is the official suite of capabilities and learning tracks offered under this pillar:</p><ul>`;
        mods.forEach((m, i) => {
          if (!m.isRoadmap) {
            html += `<li><strong>${m.title}</strong> — ${m.desc || ''}</li>`;
          }
        });
        html += `</ul><div class="at-ai-actions">`;
        mods.forEach((m, i) => {
          if (!m.isRoadmap) {
            html += `<button type="button" class="at-ai-action-btn at-ai-action-jump" data-index="${i}">⤳ ${m.title}</button>`;
          }
        });
        html += `</div>`;
        return html;
      }

      // 2. Strategic Roadmap / Future / Timeline
      if (q.includes('roadmap') || q.includes('timeline') || q.includes('future') || q.includes('milestone') || q.includes('phase')) {
        const roadmapMod = mods.find(m => m.isRoadmap) || mods[mods.length - 1];
        let html = `<h4>// STRATEGIC ROADMAP TELEMETRY //</h4>`;
        html += `<p>${roadmapMod ? roadmapMod.desc : 'The strategic roadmap lays out the phased national deployment, industrial scaling, and sovereign technology integration for ' + pillarName + '.'}</p>`;
        html += `<p><strong>Milestone Trajectory:</strong></p><ul>`;
        html += `<li><strong>Phase 1:</strong> Foundation rollout, talent baseline certification, and framework standardisation.</li>`;
        html += `<li><strong>Phase 2:</strong> Enterprise pilot deployment, national scaling, and autonomous AI system integration.</li>`;
        html += `<li><strong>Phase 3:</strong> Sovereign technology independence, exportable AI capabilities, and sustained global leadership.</li>`;
        html += `</ul><div class="at-ai-actions">`;
        html += `<button type="button" class="at-ai-action-btn at-ai-action-gold at-ai-action-roadmap">★ LAUNCH HIGH-RES ROADMAP LIGHTBOX</button>`;
        html += `</div>`;
        return html;
      }

      // 3. Certifications & Standards
      if (q.includes('certif') || q.includes('accredit') || q.includes('qualification') || q.includes('exam') || q.includes('badge')) {
        let html = `<h4>// NATIONAL CERTIFICATION FRAMEWORK //</h4>`;
        html += `<p>All competencies developed within <strong>${pillarName}</strong> adhere to the sovereign benchmark established by the <strong>National Artificial Intelligence Generation Centre (NAIGC)</strong>.</p>`;
        html += `<ul>`;
        html += `<li><strong>Industry-Recognised Credentials:</strong> Validated through rigorous practical evaluations and real-world deployment capstones.</li>`;
        html += `<li><strong>Sovereign Compliance:</strong> Endorsed for safety, ethics, and national data privacy (PDPA) standards.</li>`;
        html += `<li><strong>Enterprise Micro-Credentials:</strong> Verifiable digital cryptographic badges issued to participants.</li>`;
        html += `</ul>`;
        html += `<div class="at-ai-actions"><button type="button" class="at-ai-action-btn at-ai-action-jump" data-index="0">⤳ VIEW FOUNDATION TRACK</button></div>`;
        return html;
      }

      // 4. Target Audience & Prerequisites
      if (q.includes('who') || q.includes('target') || q.includes('prereq') || q.includes('beginner') || q.includes('eligib') || q.includes('requirement')) {
        let html = `<h4>// TARGET AUDIENCE & ENTRANCE CRITERIA //</h4>`;
        html += `<p>Programs in <strong>${pillarName}</strong> are tiered to serve diverse participant profiles:</p>`;
        html += `<ul>`;
        html += `<li><strong>Executives & Strategists:</strong> Zero coding required. Focuses on governance, AI decision-making, and organizational integration.</li>`;
        html += `<li><strong>Practitioners & Engineers:</strong> Requires fundamental computational literacy or domain engineering experience.</li>`;
        html += `<li><strong>SMEs & Entrepreneurs:</strong> Structured for practical, immediate automation and high-ROI deployment.</li>`;
        html += `</ul>`;
        return html;
      }

      // 5. Pricing, Subsidies & Enterprise Consultation
      if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('subsidy') || q.includes('grant') || q.includes('enterprise') || q.includes('contact') || q.includes('register') || q.includes('apply')) {
        let html = `<h4>// ENTERPRISE & ADMISSION ADVISORY //</h4>`;
        html += `<p>Admissions, institutional cohorts, and enterprise deployments are coordinated directly via NAIGC's operations desk.</p>`;
        html += `<ul>`;
        html += `<li><strong>Corporate & SME Subsidies:</strong> Eligible organizations can qualify for targeted national workforce training grants and technology co-funding.</li>`;
        html += `<li><strong>Customized Cohorts:</strong> Tailored internal deployment for government agencies and enterprise teams.</li>`;
        html += `<li><strong>Direct Inquiries:</strong> Email <a href="mailto:info@build2connect.nl" style="color:var(--at-cyan); text-decoration:underline;">info@build2connect.nl</a> or call <strong>+31 (0)523 297 001</strong>.</li>`;
        html += `</ul>`;
        return html;
      }

      // 6. Check for Specific Module Name Match
      let bestMatch = null;
      let highestScore = 0;
      mods.forEach((m, idx) => {
        let score = 0;
        const titleLower = (m.title || '').toLowerCase();
        const descLower = (m.desc || '').toLowerCase();
        const tagLower = (m.tag || '').toLowerCase();
        const syllabusText = (m.syllabus || []).join(' ').toLowerCase();

        // Exact title hit
        if (q.includes(titleLower) || titleLower.includes(q)) score += 10;
        // Words matching
        const words = q.split(/\s+/).filter(w => w.length > 2);
        words.forEach(w => {
          if (titleLower.includes(w)) score += 4;
          if (tagLower.includes(w)) score += 3;
          if (descLower.includes(w)) score += 2;
          if (syllabusText.includes(w)) score += 2;
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = { module: m, index: idx };
        }
      });

      if (bestMatch && highestScore >= 3) {
        const m = bestMatch.module;
        let html = `<h4>// TELEMETRY: ${m.title} //</h4>`;
        html += `<p>${m.desc}</p>`;

        if (m.metrics) {
          html += `<div class="at-ai-badge-row">`;
          for (const [k, v] of Object.entries(m.metrics)) {
            html += `<span class="at-ai-metric-tag">${k}: <strong>${v}</strong></span>`;
          }
          html += `</div>`;
        }

        if (m.syllabus && m.syllabus.length > 0) {
          html += `<p style="font-size:0.82rem; color:var(--at-cyan); margin-bottom:0.3rem;">KEY SYLLABUS & CAPABILITIES:</p><ul>`;
          m.syllabus.slice(0, 4).forEach(item => {
            html += `<li>${item}</li>`;
          });
          html += `</ul>`;
        }

        html += `<div class="at-ai-actions">`;
        if (m.isRoadmap) {
          html += `<button type="button" class="at-ai-action-btn at-ai-action-gold at-ai-action-roadmap">★ LAUNCH ROADMAP LIGHTBOX</button>`;
        } else {
          html += `<button type="button" class="at-ai-action-btn at-ai-action-jump" data-index="${bestMatch.index}">⤳ INSPECT MODULE IN 3D SPACE</button>`;
        }
        html += `</div>`;
        return html;
      }

      // 7. Conversational Greetings / General
      if (q.startsWith('hi') || q.startsWith('hello') || q.startsWith('hey') || q === 'greeting' || q === 'who are you') {
        return `
          <h4>// AI AGENT READY //</h4>
          <p>Affirmative, Operator. I am the autonomous intelligence node for <strong>${pillarName}</strong> within the National Artificial Intelligence Generation Centre.</p>
          <p>You can ask me about our specific modules, duration, technical tracks, or request to jump directly to any interactive 3D component on this console.</p>
        `;
      }

      if (q.includes('thank') || q.includes('good') || q.includes('awesome') || q.includes('great')) {
        return `
          <h4>// TRANSMISSION ACKNOWLEDGED //</h4>
          <p>Standing by for further instructions or navigational telemetry. Explore the modules or let me know if you require additional strategic insights.</p>
        `;
      }

      // 8. General NAIGC overview
      if (q.includes('naigc') || q.includes('what is this') || q.includes('overview') || q.includes('about')) {
        return `
          <h4>// NAIGC SYSTEM TELEMETRY //</h4>
          <p>The <strong>National Artificial Intelligence Generation Centre (NAIGC)</strong> serves as a national sovereign nexus engineered to advance generative AI, autonomous intelligence, and workforce capabilities.</p>
          <p><strong>${pillarName}</strong> is one of the 8 core strategic pillars driving this transformation, delivering specialized frameworks, industry-grade toolkits, and accredited pathways.</p>
          <div class="at-ai-actions">
            <button type="button" class="at-ai-action-btn at-ai-action-roadmap">★ EXPLORE STRATEGIC ROADMAP</button>
          </div>
        `;
      }

      // Fallback Answer for Unmatched Queries
      return {
        isWarning: true,
        html: `
          <h4 style="color:#FFB800; display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFB800" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            // NO MATCHING TELEMETRY FOUND //
          </h4>
          <p>The system cannot find any capabilities, modules, or information matching <em>"${escapeHTML(rawQuery)}"</em> in <strong>${pillarName}</strong>.</p>
          <p style="font-size:0.85rem; color:#CAD7E6; margin-top:0.45rem;">
            Please rephrase your question, ask about an available topic (e.g. <em>"What modules do you teach?"</em>, <em>"How to get certified?"</em>, or <em>"Strategic roadmap"</em>), or click any prompt chip below.
          </p>
        `
      };
    }

    // Handle Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (!val) return;

      playAudio('slide');
      appendUserMessage(val);
      input.value = '';

      showTypingIndicator();

      // Realistic AI thinking delay (300-500ms)
      setTimeout(() => {
        removeTypingIndicator();
        const responseHtml = processQuery(val);
        appendBotMessage(responseHtml);
        playAudio('hover');
      }, 400);
    });

    // Handle Prompt Chips
    chipsBar.querySelectorAll('.at-ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (!query) return;
        playAudio('hover');
        input.value = query;
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      });
    });
  }

  // Self-initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatCopilot);
  } else {
    initChatCopilot();
  }
})();
