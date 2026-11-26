const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'build_all_active_theory_pillars.js');
let code = fs.readFileSync(filePath, 'utf-8');

// 1. Remove embedded rules and aperture loader CSS
const oldCssBlock1 = `  <style>
    /* Embedded Slider Performance Rules - Zero Lag & Zero Conflicting Animation */
    html.is-embedded #at-loader,
    html.is-embedded #at-transition-curtain {
      display: none !important;
    }

    html.is-embedded #at-carousel-stage {
      animation: none !important;
      opacity: 1 !important;
      transform: translate3d(0, 0, 0) !important;
    }
    :root {`;

const newCssBlock1 = `  <style>
    @view-transition {
      navigation: auto;
    }

    :root {`;

if (code.includes(oldCssBlock1)) {
  code = code.replace(oldCssBlock1, newCssBlock1);
  console.log('Replaced oldCssBlock1');
} else {
  console.log('Warning: oldCssBlock1 not matched');
}

// 2. Remove loader CSS (section 1. ACTIVE THEORY PORTAL APERTURE LOADER)
const loaderCssRegex = /\/\* ==========================================================================\s+1\. ACTIVE THEORY PORTAL APERTURE LOADER[\s\S]*?@keyframes at-blink \{[\s\S]*?\}\s+/;
if (loaderCssRegex.test(code)) {
  code = code.replace(loaderCssRegex, '');
  console.log('Removed loader CSS');
} else {
  console.log('Warning: loaderCssRegex not matched');
}

// 3. Replace stage animations & transition curtain with GPU fly-in & exit
const stageAndCurtainRegex = /\/\* Entrance from Left \(Pillars 1-4\) \*\/[\s\S]*?\.at-curtain-hud-wing \{[\s\S]*?\}\s+/;
const newStageAndTrackCss = `/* ==========================================================================
       CAROUSEL STAGE & DIRECTIONAL 3D FLY-IN (120 FPS PURE GPU)
       Pillars 1-4 fly in from LEFT ("like dia masuk ke home page mcm tu")
       Pillars 5-8 fly in from RIGHT
       ========================================================================== */
    #at-carousel-stage {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      z-index: 5;
      pointer-events: none;
      perspective: 1500px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-style: preserve-3d;
    }

    .at-card-track {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      pointer-events: none;
      will-change: transform, opacity;
    }

    /* 3D Fly-In From Left for Pillars 1-4 (staggered 3D entrance matching homepage) */
    .at-track-enter-left {
      animation: atTrackFlyInLeft 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes atTrackFlyInLeft {
      0% {
        opacity: 0;
        transform: perspective(1400px) translate3d(-160px, 0, -60px) rotateY(-22deg) scale(0.92);
        filter: brightness(1.8);
      }
      70% {
        opacity: 0.98;
        transform: perspective(1400px) translate3d(14px, 0, 10px) rotateY(3deg) scale(1.01);
        filter: brightness(1.15);
      }
      100% {
        opacity: 1;
        transform: perspective(1400px) translate3d(0, 0, 0) rotateY(0deg) scale(1);
        filter: brightness(1);
      }
    }

    /* 3D Fly-In From Right for Pillars 5-8 */
    .at-track-enter-right {
      animation: atTrackFlyInRight 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes atTrackFlyInRight {
      0% {
        opacity: 0;
        transform: perspective(1400px) translate3d(160px, 0, -60px) rotateY(22deg) scale(0.92);
        filter: brightness(1.8);
      }
      70% {
        opacity: 0.98;
        transform: perspective(1400px) translate3d(-14px, 0, 10px) rotateY(-3deg) scale(1.01);
        filter: brightness(1.15);
      }
      100% {
        opacity: 1;
        transform: perspective(1400px) translate3d(0, 0, 0) rotateY(0deg) scale(1);
        filter: brightness(1);
      }
    }

    /* Exit Animations (Ultra-fast 200ms GPU glides when leaving) */
    .at-track-exit-left {
      animation: atTrackExitLeft 0.22s cubic-bezier(0.7, 0, 0.84, 0) forwards !important;
    }

    @keyframes atTrackExitLeft {
      0% {
        transform: perspective(1400px) translate3d(0, 0, 0) rotateY(0deg) scale(1);
        opacity: 1;
        filter: brightness(1);
      }
      100% {
        transform: perspective(1400px) translate3d(-160px, 0, -60px) rotateY(-22deg) scale(0.92);
        opacity: 0;
        filter: brightness(1.6);
      }
    }

    .at-track-exit-right {
      animation: atTrackExitRight 0.22s cubic-bezier(0.7, 0, 0.84, 0) forwards !important;
    }

    @keyframes atTrackExitRight {
      0% {
        transform: perspective(1400px) translate3d(0, 0, 0) rotateY(0deg) scale(1);
        opacity: 1;
        filter: brightness(1);
      }
      100% {
        transform: perspective(1400px) translate3d(160px, 0, -60px) rotateY(22deg) scale(0.92);
        opacity: 0;
        filter: brightness(1.6);
      }
    }

    /* Individual Card Staggered Fly-In Content */
    .at-card-inner {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transform-style: preserve-3d;
      will-change: transform, opacity;
    }

    .at-card-fly-left .at-card-inner {
      animation: atInnerFlyInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes atInnerFlyInLeft {
      0% {
        opacity: 0;
        transform: perspective(1000px) translateX(-45px) rotateY(-8deg);
      }
      100% {
        opacity: 1;
        transform: perspective(1000px) translateX(0) rotateY(0deg);
      }
    }

    .at-card-fly-right .at-card-inner {
      animation: atInnerFlyInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @keyframes atInnerFlyInRight {
      0% {
        opacity: 0;
        transform: perspective(1000px) translateX(45px) rotateY(8deg);
      }
      100% {
        opacity: 1;
        transform: perspective(1000px) translateX(0) rotateY(0deg);
      }
    }
`;

if (stageAndCurtainRegex.test(code)) {
  code = code.replace(stageAndCurtainRegex, newStageAndTrackCss);
  console.log('Replaced stageAndCurtain with newStageAndTrackCss');
} else {
  console.log('Warning: stageAndCurtainRegex not matched');
}

// 4. Remove blur from .at-card:not(.is-center)
code = code.replace(
  `.at-card:not(.is-center) {\n      filter: brightness(0.65) blur(0.6px);\n    }`,
  `.at-card:not(.is-center) {\n      opacity: 0.65;\n      filter: brightness(0.72);\n    }`
);

// 5. Remove curtain and loader from HTML
const curtainHtmlRegex = /<!-- Directional Spatial Transition Curtain \(Left for 1-4, Right for 5-8\) -->[\s\S]*?<\/div>\s+<\/div>/;
if (curtainHtmlRegex.test(code)) {
  code = code.replace(curtainHtmlRegex, '');
  console.log('Removed curtain HTML');
} else {
  console.log('Warning: curtainHtmlRegex not matched');
}

const loaderHtmlRegex = /<!-- 1\. Active Theory Circular Aperture Portal Loader -->[\s\S]*?<\/div>\s+<\/div>/;
if (loaderHtmlRegex.test(code)) {
  code = code.replace(loaderHtmlRegex, '');
  console.log('Removed loader HTML');
} else {
  console.log('Warning: loaderHtmlRegex not matched');
}

// 6. Update #at-carousel-stage in HTML
const oldStageHtml = `<div id="at-carousel-stage" class="\${isLeftWing ? 'at-stage-enter-left' : 'at-stage-enter-right'} at-stage-ready">
    <div class="at-card-track" id="at-track">
      <!-- Generated by JavaScript with 3D Matrix Coordinates -->
    </div>
  </div>`;

const newStageHtml = `<div id="at-carousel-stage">
    <div class="at-card-track \${isLeftWing ? 'at-track-enter-left' : 'at-track-enter-right'}" id="at-track">
      <!-- Generated by JavaScript with 3D Matrix Coordinates -->
    </div>
  </div>`;

if (code.includes(oldStageHtml)) {
  code = code.replace(oldStageHtml, newStageHtml);
  console.log('Updated stage HTML');
} else {
  console.log('Warning: oldStageHtml not matched');
}

// 7. Remove loader JS logic (lines with setInterval and dismissLoader)
const oldLoaderJsRegex = /\/\/ --- 2\. Loader Sequencing ---[\s\S]*?function dismissLoader\(\) \{[\s\S]*?\}\s+/;
const newLoaderJs = `// --- 2. Direct Instant Initialization (Zero Lag & 120 FPS Composited) ---
    sound.init();
`;
if (oldLoaderJsRegex.test(code)) {
  code = code.replace(oldLoaderJsRegex, newLoaderJs);
  console.log('Replaced loader JS logic');
} else {
  console.log('Warning: oldLoaderJsRegex not matched');
}

// 8. Update Card Rendering loop to add at-card-inner and directional fly-in class
const oldCardCreation = `    // Render Cards
    modulesData.forEach((mod, i) => {
      const card = document.createElement('div');
      card.className = 'at-card';
      card.dataset.index = i;`;

const newCardCreation = `    // Render Cards with Staggered 3D Entrance ("like dia masuk ke home page mcm tu")
    modulesData.forEach((mod, i) => {
      const card = document.createElement('div');
      card.className = 'at-card ' + (isCurrentLeft ? 'at-card-fly-left' : 'at-card-fly-right');
      card.dataset.index = i;`;

if (code.includes(oldCardCreation)) {
  code = code.replace(oldCardCreation, newCardCreation);
  console.log('Updated oldCardCreation');
} else {
  console.log('Warning: oldCardCreation not matched');
}

// Wrap card inner content in <div class="at-card-inner" ...>
const oldCardInnerStart = `      card.innerHTML = \`
        <div class="at-card-sheen"></div>
        <div>
          \${visualHeaderHtml}`;

const newCardInnerStart = `      card.innerHTML = \`
        <div class="at-card-sheen"></div>
        <div class="at-card-inner" style="animation-delay: \${(0.04 + i * 0.07).toFixed(2)}s">
          <div>
            \${visualHeaderHtml}`;

if (code.includes(oldCardInnerStart)) {
  code = code.replace(oldCardInnerStart, newCardInnerStart);
  console.log('Updated oldCardInnerStart');
} else {
  console.log('Warning: oldCardInnerStart not matched');
}

const oldCardInnerEnd = `          <button class="at-btn-select" data-open="\${i}">
            <span>\${buttonLabel}</span>
          </button>
        </div>
      \`;`;

const newCardInnerEnd = `          <button class="at-btn-select" data-open="\${i}">
            <span>\${buttonLabel}</span>
          </button>
        </div>
        </div>
      \`;`;

if (code.includes(oldCardInnerEnd)) {
  code = code.replace(oldCardInnerEnd, newCardInnerEnd);
  console.log('Updated oldCardInnerEnd');
} else {
  console.log('Warning: oldCardInnerEnd not matched');
}

// Ensure updateCarousel() is invoked immediately after cards are appended
const afterCardsAppended = `    const cards = Array.from(document.querySelectorAll('.at-card'));
    const dialCounter = document.getElementById('at-dial-counter');
    const dialDots = Array.from(document.querySelectorAll('.at-dial-dot'));`;

const newAfterCardsAppended = `    const cards = Array.from(document.querySelectorAll('.at-card'));
    const dialCounter = document.getElementById('at-dial-counter');
    const dialDots = Array.from(document.querySelectorAll('.at-dial-dot'));
    
    // Initial 3D matrix coordinates calculation for instantaneous display
    updateCarousel();`;

if (code.includes(afterCardsAppended)) {
  code = code.replace(afterCardsAppended, newAfterCardsAppended);
  console.log('Added initial updateCarousel() call');
} else {
  console.log('Warning: afterCardsAppended not matched');
}

// 9. Update navigation functions (remove curtain, add high-speed exit to left/right)
const oldNavRegex = /const curtain = document\.getElementById\('at-transition-curtain'\);[\s\S]*?document\.querySelectorAll\('\.at-dock-node, \.at-sub-pill'\)\.forEach\(link => \{[\s\S]*?\}\s+\}\);/;
const newNavCode = `function navigateWithDirection(targetUrl, direction) {
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
          const m = link.dataset.tooltip.match(/^(\\d+)/);
          if (m) targetNum = parseInt(m[1], 10);
        } else if (link.innerText) {
          const m = link.innerText.match(/(\\d+)/);
          if (m) targetNum = parseInt(m[1], 10);
        }

        if (targetNum && targetNum !== currentPillarNum) {
          e.preventDefault();
          const dir = targetNum < currentPillarNum ? 'left' : 'right';
          navigateWithDirection(href, dir);
        }
      });
    });`;

if (oldNavRegex.test(code)) {
  code = code.replace(oldNavRegex, newNavCode);
  console.log('Updated navigation functions');
} else {
  console.log('Warning: oldNavRegex not matched');
}

fs.writeFileSync(filePath, code, 'utf-8');
console.log('Successfully updated build_all_active_theory_pillars.js!');

