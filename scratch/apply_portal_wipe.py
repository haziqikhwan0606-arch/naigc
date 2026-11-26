import re

with open('scratch/build_all_active_theory_pillars.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add #naigc-portal-wipe CSS
portal_wipe_css = """    /* ==========================================================================
       HARDWARE-ACCELERATED SPATIAL TRANSITION PORTAL WIPER (120 FPS PURE GPU)
       ========================================================================== */
    #naigc-portal-wipe {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 999999;
      background: radial-gradient(circle at 50% 50%, #030a17 0%, #010308 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      visibility: hidden;
      will-change: transform;
      transform: translate3d(-100vw, 0, 0);
      contain: strict;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    #naigc-portal-wipe.wipe-in-left {
      visibility: visible;
      pointer-events: auto;
      border-right: 3px solid #00F0FF;
      box-shadow: 25px 0 90px rgba(0, 240, 255, 0.7);
      animation: naigcWipeInLeft 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes naigcWipeInLeft {
      0% { transform: translate3d(-100vw, 0, 0); }
      100% { transform: translate3d(0, 0, 0); }
    }

    #naigc-portal-wipe.wipe-in-right {
      visibility: visible;
      pointer-events: auto;
      border-left: 3px solid #FFB800;
      box-shadow: -25px 0 90px rgba(255, 184, 0, 0.7);
      animation: naigcWipeInRight 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes naigcWipeInRight {
      0% { transform: translate3d(100vw, 0, 0); }
      100% { transform: translate3d(0, 0, 0); }
    }

    #naigc-portal-wipe.wipe-out-right {
      visibility: visible;
      border-left: 3px solid #00F0FF;
      box-shadow: -25px 0 90px rgba(0, 240, 255, 0.7);
      animation: naigcWipeOutRight 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes naigcWipeOutRight {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(100vw, 0, 0); }
    }

    #naigc-portal-wipe.wipe-out-left {
      visibility: visible;
      border-right: 3px solid #FFB800;
      box-shadow: 25px 0 90px rgba(255, 184, 0, 0.7);
      animation: naigcWipeOutLeft 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes naigcWipeOutLeft {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-100vw, 0, 0); }
    }

    .naigc-portal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.65rem;
      text-align: center;
      font-family: var(--at-font-mono);
      position: relative;
      z-index: 2;
    }

    .naigc-portal-core-ring {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 1.5px solid rgba(0, 240, 255, 0.5);
      box-shadow: 0 0 30px rgba(0, 240, 255, 0.3), inset 0 0 15px rgba(0, 240, 255, 0.2);
      margin-bottom: 0.5rem;
      animation: naigcRingSpin 4s linear infinite;
    }

    @keyframes naigcRingSpin {
      0% { transform: rotate(0deg) scale(0.96); }
      50% { transform: rotate(180deg) scale(1.04); }
      100% { transform: rotate(360deg) scale(0.96); }
    }

    .naigc-portal-tag {
      font-size: 0.65rem;
      letter-spacing: 0.25em;
      color: #00F0FF;
      text-shadow: 0 0 10px rgba(0, 240, 255, 0.7);
    }

    .naigc-portal-title {
      font-family: var(--at-font-display);
      font-size: clamp(1.4rem, 3.5vw, 2.5rem);
      font-weight: 900;
      letter-spacing: 0.12em;
      color: #FFFFFF;
      text-transform: uppercase;
    }

    .naigc-portal-wing {
      font-size: 0.68rem;
      letter-spacing: 0.2em;
      color: #8A99AD;
    }

    .naigc-portal-sub {
      font-size: 0.55rem;
      letter-spacing: 0.3em;
      color: rgba(0, 240, 255, 0.7);
      margin-top: 0.4rem;
    }
"""

css_insert_point = "    /* ==========================================================================\n       CAROUSEL STAGE & DIRECTIONAL 3D FLY-IN"
if css_insert_point in content:
    content = content.replace(css_insert_point, portal_wipe_css + "\n" + css_insert_point)
    print("Inserted portal wipe CSS")
else:
    print("Warning: css_insert_point not found")

# 2. Add portal wipe HTML right inside <body>
old_body_tag = """<body>

  
  </div>"""

new_body_markup = """<body>

  <!-- Directional Hardware-Accelerated Spatial Transition Portal (60-120 FPS Pure GPU) -->
  <div id="naigc-portal-wipe" class="${isLeftWing ? 'wipe-out-right' : 'wipe-out-left'}" aria-hidden="true">
    <div class="naigc-portal-content">
      <div class="naigc-portal-core-ring"></div>
      <div class="naigc-portal-tag">// SPATIAL TELEMETRY MATRIX //</div>
      <div class="naigc-portal-title">${p.title}</div>
      <div class="naigc-portal-wing">${wingTag}</div>
      <div class="naigc-portal-sub">SYS//WARPING PROTOCOL ACTIVE</div>
    </div>
  </div>"""

if old_body_tag in content:
    content = content.replace(old_body_tag, new_body_markup)
    print("Replaced body markup")
else:
    # Try alternate body tag match
    content = re.sub(r'<body>\s*(?:</div>)?', new_body_markup, content, count=1)
    print("Replaced body markup via regex")

# 3. Update navigation logic in JS
old_nav_code = """    // --- 6. Spatial Directional Transition Orchestration (Left for 1-4, Right for 5-8) ---
    function navigateWithDirection(targetUrl, direction) {
      sound.init();
      sound.playSlide();

      const track = document.getElementById('at-track');
      if (track) {
        track.classList.remove('at-track-enter-left', 'at-track-enter-right');
        track.classList.add(direction === 'left' ? 'at-track-exit-left' : 'at-track-exit-right');
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 190);
    }

    // Intercept Return to Homepage (Core Hub)
    document.querySelectorAll('a[href*="index.html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const dir = isCurrentLeft ? 'left' : 'right';
        navigateWithDirection('../index.html', dir);
      });
    });

    // Intercept Pillar Mini-Dock & Sub-Pill Navigation
    document.querySelectorAll('.at-dock-node, .at-sub-pill').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.includes('index.html')) return;

        let targetNum = null;
        if (link.dataset.tooltip) {
          const m = link.dataset.tooltip.match(/^([0-9]+)/);
          if (m) targetNum = parseInt(m[1], 10);
        } else if (link.innerText) {
          const m = link.innerText.match(/([0-9]+)/);
          if (m) targetNum = parseInt(m[1], 10);
        }

        if (targetNum && targetNum !== currentPillarNum) {
          e.preventDefault();
          const dir = targetNum < currentPillarNum ? 'left' : 'right';
          navigateWithDirection(href, dir);
        }
      });
    });"""

new_nav_code = """    // --- 6. Spatial Directional Transition Orchestration (Left for 1-4, Right for 5-8) ---
    const urlParams = new URLSearchParams(window.location.search);
    const fromDir = urlParams.get('from');
    const wiperEl = document.getElementById('naigc-portal-wipe');
    if (wiperEl) {
      if (fromDir === 'right' || (!fromDir && !isCurrentLeft)) {
        wiperEl.className = 'wipe-out-left';
      } else {
        wiperEl.className = 'wipe-out-right';
      }
    }

    function navigateWithDirection(targetUrl, direction) {
      sound.init();
      sound.playSlide();

      const wiper = document.getElementById('naigc-portal-wipe');
      if (wiper) {
        wiper.className = direction === 'left' ? 'wipe-in-left' : 'wipe-in-right';
      }

      const track = document.getElementById('at-track');
      if (track) {
        track.classList.remove('at-track-enter-left', 'at-track-enter-right');
        track.classList.add(direction === 'left' ? 'at-track-exit-left' : 'at-track-exit-right');
      }

      setTimeout(() => {
        window.location.href = targetUrl;
      }, 350);
    }

    // Intercept Return to Homepage (Core Hub)
    document.querySelectorAll('a[href*="index.html"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const returnWing = isCurrentLeft ? 'left' : 'right';
        const sweepDir = isCurrentLeft ? 'left' : 'right';
        navigateWithDirection('../index.html?return=' + returnWing, sweepDir);
      });
    });

    // Intercept Pillar Mini-Dock & Sub-Pill Navigation
    document.querySelectorAll('.at-dock-node, .at-sub-pill').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#') || href.includes('index.html')) return;

        let targetNum = null;
        if (link.dataset.tooltip) {
          const m = link.dataset.tooltip.match(/^([0-9]+)/);
          if (m) targetNum = parseInt(m[1], 10);
        } else if (link.innerText) {
          const m = link.innerText.match(/([0-9]+)/);
          if (m) targetNum = parseInt(m[1], 10);
        }

        if (targetNum && targetNum !== currentPillarNum) {
          e.preventDefault();
          const dir = targetNum < currentPillarNum ? 'left' : 'right';
          navigateWithDirection(href + '?from=' + dir, dir);
        }
      });
    });"""

if old_nav_code in content:
    content = content.replace(old_nav_code, new_nav_code)
    print("Replaced navigation code")
else:
    print("Warning: old_nav_code not found")

with open('scratch/build_all_active_theory_pillars.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Successfully saved build_all_active_theory_pillars.js")
