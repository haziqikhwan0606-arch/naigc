const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Remove duplicate old pillar styles between lines 327-356 if present
html = html.replace(
  /\/\* 8 Pillars Overall Grid Container \*\/[\s\S]*?\.naigc-pillars-center\s*\{[\s\S]*?\}\s*(?=\/\* ==========================================================================)/,
  ""
);

// 2. Define the new Unified Pillars CSS
const unifiedCSS = `
/* ==========================================================================
   NAIGC — UNIFIED 8 PILLARS COMPONENT ARCHITECTURE
   Consistent geometry, dark translucent glassmorphic surfaces, crisp contrast
   ========================================================================== */

:root {
  /* NAIGC Official Holographic Palette */
  --naigc-cyan: #00D9FF;
  --naigc-cyan-dim: rgba(0, 217, 255, 0.4);
  --naigc-cyan-glow: rgba(0, 217, 255, 0.25);
  --naigc-cyan-border: linear-gradient(135deg, rgba(0, 217, 255, 0.9) 0%, rgba(14, 116, 204, 0.5) 50%, rgba(0, 217, 255, 0.85) 100%);

  --naigc-violet: #C084FC;
  --naigc-violet-dim: rgba(192, 132, 252, 0.4);
  --naigc-violet-glow: rgba(192, 132, 252, 0.25);
  --naigc-violet-border: linear-gradient(135deg, rgba(192, 132, 252, 0.9) 0%, rgba(147, 51, 234, 0.5) 50%, rgba(192, 132, 252, 0.85) 100%);

  --naigc-ice-blue: #C9F5FF;
  --naigc-white: #FFFFFF;
  --naigc-desc: #CBD5E1;

  /* High-Contrast Smoked Sapphire Glass Surface */
  --naigc-surface-bg: linear-gradient(135deg, rgba(8, 22, 54, 0.88) 0%, rgba(4, 12, 34, 0.94) 100%);
}

/* Malaysian Skyline Background on Stage (STRICTLY LOCKED) */
body.mq4-body,
.mq4-stage,
.mq4-story {
  background: 
    linear-gradient(180deg, rgba(14, 45, 90, 0.12) 0%, rgba(12, 38, 80, 0.04) 35%, rgba(8, 24, 56, 0.20) 75%, rgba(4, 14, 38, 0.60) 100%),
    url('./build/assets/kl_skyline_day.jpg') no-repeat center center / cover !important;
}

/* Hide BEYOND HUMAN text and default buttons */
.mq4-words {
  display: none !important;
}

.mq4-intro .mq4-lead,
.mq4-intro .mq4-intro__actions {
  display: none !important;
}

/* Intro Layout */
.mq4-intro {
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  inset: 0 !important;
  padding: 1.5rem 2rem !important;
  box-sizing: border-box !important;
  pointer-events: none !important;
  max-width: 100% !important;
  width: 100% !important;
}

/* Title at top center (STRICTLY LOCKED) */
.mq4-intro .mq4-title {
  margin: 0 auto !important;
  text-align: center !important;
  font-size: clamp(1.4rem, 1.2rem + 1.8vw, 2.4rem) !important;
  width: 100% !important;
  max-width: 32em !important;
  color: #ffffff !important;
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.8) !important;
  letter-spacing: -0.01em !important;
  z-index: 10 !important;
  padding-top: 0.5rem !important;
}

.mq4-intro__body {
  width: 100% !important;
  height: 100% !important;
  background: transparent !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 !important;
  margin: 0 !important;
  position: relative !important;
}

/* ==========================================================================
   8 PILLARS CONTAINER & 4-LEFT 4-RIGHT SPATIAL ARRANGEMENT
   ========================================================================== */

.naigc-pillars-container {
  display: grid;
  grid-template-columns: minmax(360px, 420px) 1fr minmax(360px, 420px);
  width: 100%;
  max-width: 1540px;
  height: calc(100vh - 120px);
  max-height: 820px;
  margin: 0 auto;
  align-items: center;
  pointer-events: none;
  box-sizing: border-box;
  padding: 0 1.5rem;
  z-index: 12;
}

.naigc-pillars-col {
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  pointer-events: auto;
  z-index: 15;
  width: 100%;
}

.naigc-pillars-center {
  min-width: 180px;
  pointer-events: none;
}

/* ==========================================================================
   SHARED REUSABLE PILLAR COMPONENT (IDENTICAL STRUCTURE FOR ALL 8)
   ========================================================================== */

.naigc-pillar {
  position: relative;
  display: block;
  text-decoration: none;
  box-sizing: border-box;
  width: 100%;
  height: 86px;
  cursor: pointer;
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), filter 0.32s ease;
  will-change: transform;
}

/* Subtle 3D perspective oriented towards central cyborg */
.naigc-pillar-left {
  transform: perspective(1000px) rotateY(6deg);
  transform-origin: right center;
}

.naigc-pillar-right {
  transform: perspective(1000px) rotateY(-6deg);
  transform-origin: left center;
}

/* Suspended spatial depth staggering */
.naigc-pillars-left .naigc-pillar:nth-child(1) { transform: perspective(1000px) rotateY(6deg) translateZ(-6px); }
.naigc-pillars-left .naigc-pillar:nth-child(2) { transform: perspective(1000px) rotateY(6deg) translateZ(8px); }
.naigc-pillars-left .naigc-pillar:nth-child(3) { transform: perspective(1000px) rotateY(6deg) translateZ(12px); }
.naigc-pillars-left .naigc-pillar:nth-child(4) { transform: perspective(1000px) rotateY(6deg) translateZ(-2px); }

.naigc-pillars-right .naigc-pillar:nth-child(1) { transform: perspective(1000px) rotateY(-6deg) translateZ(-6px); }
.naigc-pillars-right .naigc-pillar:nth-child(2) { transform: perspective(1000px) rotateY(-6deg) translateZ(8px); }
.naigc-pillars-right .naigc-pillar:nth-child(3) { transform: perspective(1000px) rotateY(-6deg) translateZ(12px); }
.naigc-pillars-right .naigc-pillar:nth-child(4) { transform: perspective(1000px) rotateY(-6deg) translateZ(-2px); }

/* Outer Polygon Border Frame */
.naigc-pillar-border {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1.5px;
  position: relative;
  clip-path: polygon(
    14px 0%,
    calc(100% - 14px) 0%,
    100% 14px,
    100% calc(100% - 14px),
    calc(100% - 14px) 100%,
    14px 100%,
    0% calc(100% - 14px),
    0% 14px
  );
  transition: all 0.3s ease;
}

.naigc-theme-cyan .naigc-pillar-border {
  background: var(--naigc-cyan-border);
  filter: drop-shadow(0 4px 14px rgba(0, 217, 255, 0.28));
}

.naigc-theme-violet .naigc-pillar-border {
  background: var(--naigc-violet-border);
  filter: drop-shadow(0 4px 14px rgba(168, 85, 247, 0.28));
}

/* High-Contrast Smoked Glass Surface — IDENTICAL FOR ALL 8 PILLARS */
.naigc-pillar-surface {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: var(--naigc-surface-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  clip-path: polygon(
    13px 0%,
    calc(100% - 13px) 0%,
    100% 13px,
    100% calc(100% - 13px),
    calc(100% - 13px) 100%,
    13px 100%,
    0% calc(100% - 13px),
    0% 13px
  );
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.65rem 1.15rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.18), 
              inset 0 -1px 2px rgba(0, 0, 0, 0.5),
              0 12px 32px rgba(0, 8, 24, 0.5);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

/* Micro-Grid Texture */
.naigc-pillar-grid {
  position: absolute;
  inset: 0;
  background-image: 
    repeating-linear-gradient(0deg, rgba(0, 217, 255, 0.04) 0px, rgba(0, 217, 255, 0.04) 1px, transparent 1px, transparent 4px),
    linear-gradient(90deg, rgba(0, 217, 255, 0.02) 1px, transparent 1px);
  background-size: 100% 4px, 16px 100%;
  pointer-events: none;
  z-index: 1;
}

/* Scanning Light Beam */
.naigc-pillar-beam {
  position: absolute;
  top: -50%;
  left: 0;
  right: 0;
  height: 18px;
  pointer-events: none;
  z-index: 2;
  animation: naigc-beam-sweep 4.5s infinite ease-in-out;
}

.naigc-theme-cyan .naigc-pillar-beam {
  background: linear-gradient(180deg, transparent, rgba(0, 217, 255, 0.22), transparent);
}

.naigc-theme-violet .naigc-pillar-beam {
  background: linear-gradient(180deg, transparent, rgba(168, 85, 247, 0.22), transparent);
}

@keyframes naigc-beam-sweep {
  0% { top: -50%; }
  50% { top: 120%; }
  100% { top: 120%; }
}

/* Faceted Hexagonal Icon Chamber */
.naigc-pillar-icon-box {
  width: 44px;
  height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
  position: relative;
  z-index: 5;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.naigc-theme-cyan .naigc-pillar-icon-box {
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.22) 0%, rgba(6, 24, 58, 0.9) 100%);
  border: 1px solid rgba(0, 217, 255, 0.5);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(0, 217, 255, 0.25);
  color: #00D9FF;
}

.naigc-theme-violet .naigc-pillar-icon-box {
  background: linear-gradient(135deg, rgba(192, 132, 252, 0.22) 0%, rgba(24, 8, 48, 0.9) 100%);
  border: 1px solid rgba(192, 132, 252, 0.5);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(168, 85, 247, 0.25);
  color: #C084FC;
}

.naigc-pillar-icon-box svg {
  width: 21px;
  height: 21px;
  filter: drop-shadow(0 0 5px currentColor);
}

/* Typography & Content Block */
.naigc-pillar-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.22rem;
  flex: 1;
  min-width: 0;
  z-index: 5;
  text-align: left;
}

.naigc-pillar-title-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.naigc-pillar-tag {
  font-family: var(--mq4-font-pixel, monospace);
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  line-height: 1;
  padding: 2px 5px;
  border-radius: 2px;
  flex-shrink: 0;
}

.naigc-theme-cyan .naigc-pillar-tag {
  background: rgba(0, 217, 255, 0.18);
  border: 1px solid rgba(0, 217, 255, 0.45);
  box-shadow: 0 0 6px rgba(0, 217, 255, 0.25);
  color: #00D9FF;
}

.naigc-theme-violet .naigc-pillar-tag {
  background: rgba(168, 85, 247, 0.18);
  border: 1px solid rgba(168, 85, 247, 0.45);
  box-shadow: 0 0 6px rgba(168, 85, 247, 0.25);
  color: #C084FC;
}

.naigc-pillar-title {
  margin: 0;
  font-family: var(--mq4-font, system-ui, sans-serif);
  color: #FFFFFF !important;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1.25;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9);
  transition: color 0.25s ease;
}

.naigc-pillar-desc {
  margin: 0;
  color: #CBD5E1 !important;
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85);
  transition: color 0.25s ease;
}

.naigc-pillar-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  flex-shrink: 0;
  opacity: 0.45;
  transition: opacity 0.25s ease, transform 0.25s ease;
  z-index: 5;
}

.naigc-theme-cyan .naigc-pillar-arrow {
  color: #00D9FF;
}

.naigc-theme-violet .naigc-pillar-arrow {
  color: #C084FC;
}

/* ==========================================================================
   HOVER & INTERACTION (DIMENSIONAL SUSPENDED FLOAT)
   ========================================================================== */

.naigc-pillar:hover {
  transform: perspective(1000px) rotateY(0deg) translateZ(20px) translateY(-3px) scale(1.02) !important;
}

.naigc-theme-cyan:hover .naigc-pillar-border {
  background: linear-gradient(135deg, #00D9FF 0%, #38BDF8 50%, #00D9FF 100%);
  filter: drop-shadow(0 0 16px rgba(0, 217, 255, 0.65)) drop-shadow(0 0 32px rgba(0, 217, 255, 0.35));
}

.naigc-theme-violet:hover .naigc-pillar-border {
  background: linear-gradient(135deg, #C084FC 0%, #E879F9 50%, #C084FC 100%);
  filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.65)) drop-shadow(0 0 32px rgba(168, 85, 247, 0.35));
}

.naigc-pillar:hover .naigc-pillar-surface {
  background: linear-gradient(135deg, rgba(12, 32, 72, 0.92) 0%, rgba(6, 18, 48, 0.96) 100%);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 18px 44px rgba(0, 10, 32, 0.6);
}

.naigc-pillar:hover .naigc-pillar-icon-box {
  transform: scale(1.06);
}

.naigc-theme-cyan:hover .naigc-pillar-icon-box {
  box-shadow: 0 0 18px rgba(0, 217, 255, 0.7);
}

.naigc-theme-violet:hover .naigc-pillar-icon-box {
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.7);
}

.naigc-pillar:hover .naigc-pillar-desc {
  color: #FFFFFF !important;
}

.naigc-pillar:hover .naigc-pillar-arrow {
  opacity: 1;
  transform: translateX(4px);
  filter: drop-shadow(0 0 6px currentColor);
}

/* ==========================================================================
   RESPONSIVE DESIGN (DESKTOP & MOBILE WIDTHS)
   ========================================================================== */

@media (max-width: 1280px) {
  .naigc-pillars-container {
    grid-template-columns: minmax(310px, 360px) 1fr minmax(310px, 360px);
    padding: 0 1rem;
  }
  .naigc-pillar {
    height: 80px;
    transform: none !important;
  }
  .naigc-pillar-title {
    font-size: 0.82rem;
  }
  .naigc-pillar-desc {
    font-size: 0.68rem;
  }
  .naigc-pillar-icon-box {
    width: 38px;
    height: 38px;
    min-width: 38px;
  }
  .naigc-pillar-icon-box svg {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 860px) {
  .naigc-pillars-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: auto;
    max-height: none;
    padding-bottom: 2rem;
    gap: 0.75rem;
  }
  .naigc-pillars-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
    width: 100%;
  }
  .naigc-pillars-center {
    display: none;
  }
  .naigc-pillar {
    height: 72px;
    transform: none !important;
  }
  .naigc-pillar-surface {
    padding: 0.5rem 0.75rem !important;
    gap: 0.65rem;
  }
  .naigc-pillar-icon-box {
    width: 34px;
    height: 34px;
    min-width: 34px;
  }
  .naigc-pillar-icon-box svg {
    width: 16px;
    height: 16px;
  }
  .naigc-pillar-title {
    font-size: 0.75rem;
  }
  .naigc-pillar-desc {
    display: none;
  }
  .naigc-pillar-arrow {
    display: none;
  }
}

.naigc-pillar {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1);
  will-change: transform;
}

.naigc-pillar.is-card-tilted {
  transition: transform 0.08s ease-out;
}
`;

// Replace from :root down to </noscript> or <script async src="https://www.googletagmanager.com
const cssBlockRegex = /:root\s*\{[\s\S]*?\.naigc-holo-projection\.is-card-tilted\s*\{[\s\S]*?\}\s*<\/style>/;

if (!cssBlockRegex.test(html)) {
  console.error("Could not match old CSS block!");
  process.exit(1);
}

html = html.replace(cssBlockRegex, unifiedCSS.trim() + "\n</style>");

// 3. Define the Unified HTML Markup in JavaScript
const unifiedMarkup = `<!-- 8 Pillars NAIGC Ecosystem — Unified Holographic Architecture -->
<div id="naigc-pillars" class="naigc-pillars-container">
  <!-- Left Column: Pillars 01 to 04 -->
  <div class="naigc-pillars-col naigc-pillars-left">
    <!-- Pillar 01: Electric Cyan -->
    <a href="#academy" class="naigc-pillar naigc-pillar-left naigc-theme-cyan" data-pillar="1">
      <div class="naigc-pillar-border">
        <div class="naigc-pillar-surface">
          <div class="naigc-pillar-grid"></div>
          <div class="naigc-pillar-beam"></div>
          <div class="naigc-pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
          </div>
          <div class="naigc-pillar-body">
            <div class="naigc-pillar-title-row">
              <span class="naigc-pillar-tag">01</span>
              <h3 class="naigc-pillar-title">AI ACADEMY</h3>
            </div>
            <p class="naigc-pillar-desc">Education, Training & Professional Development</p>
          </div>
          <div class="naigc-pillar-arrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>

    <!-- Pillar 02: Holographic Violet -->
    <a href="#creative-studio" class="naigc-pillar naigc-pillar-left naigc-theme-violet" data-pillar="2">
      <div class="naigc-pillar-border">
        <div class="naigc-pillar-surface">
          <div class="naigc-pillar-grid"></div>
          <div class="naigc-pillar-beam"></div>
          <div class="naigc-pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m10 9 5 3-5 3z"/>
              <path d="M2 8h20"/>
            </svg>
          </div>
          <div class="naigc-pillar-body">
            <div class="naigc-pillar-title-row">
              <span class="naigc-pillar-tag">02</span>
              <h3 class="naigc-pillar-title">AI CREATIVE STUDIO</h3>
            </div>
            <p class="naigc-pillar-desc">AI Video, Media & Digital Content Production</p>
          </div>
          <div class="naigc-pillar-arrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>

    <!-- Pillar 03: Electric Cyan -->
    <a href="#workforce-talent" class="naigc-pillar naigc-pillar-left naigc-theme-cyan" data-pillar="3">
      <div class="naigc-pillar-border">
        <div class="naigc-pillar-surface">
          <div class="naigc-pillar-grid"></div>
          <div class="naigc-pillar-beam"></div>
          <div class="naigc-pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div class="naigc-pillar-body">
            <div class="naigc-pillar-title-row">
              <span class="naigc-pillar-tag">03</span>
              <h3 class="naigc-pillar-title">AI WORKFORCE & TALENT</h3>
            </div>
            <p class="naigc-pillar-desc">Talent Development, Certification & Placement</p>
          </div>
          <div class="naigc-pillar-arrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>

    <!-- Pillar 04: Holographic Violet -->
    <a href="#business-solutions" class="naigc-pillar naigc-pillar-left naigc-theme-violet" data-pillar="4">
      <div class="naigc-pillar-border">
        <div class="naigc-pillar-surface">
          <div class="naigc-pillar-grid"></div>
          <div class="naigc-pillar-beam"></div>
          <div class="naigc-pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 3v18h18"/>
              <path d="m19 9-5 5-4-4-3 3"/>
              <path d="M15 9h4v4"/>
            </svg>
          </div>
          <div class="naigc-pillar-body">
            <div class="naigc-pillar-title-row">
              <span class="naigc-pillar-tag">04</span>
              <h3 class="naigc-pillar-title">AI BUSINESS SOLUTIONS</h3>
            </div>
            <p class="naigc-pillar-desc">Business Automation, AI Implementation & Industry Solutions</p>
          </div>
          <div class="naigc-pillar-arrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>
  </div>

  <!-- Center Spacer for 3D Mascot (STRICTLY LOCKED) -->
  <div class="naigc-pillars-center"></div>

  <!-- Right Column: Pillars 05 to 08 -->
  <div class="naigc-pillars-col naigc-pillars-right">
    <!-- Pillar 05: Electric Cyan -->
    <a href="#enterprise-government" class="naigc-pillar naigc-pillar-right naigc-theme-cyan" data-pillar="5">
      <div class="naigc-pillar-border">
        <div class="naigc-pillar-surface">
          <div class="naigc-pillar-grid"></div>
          <div class="naigc-pillar-beam"></div>
          <div class="naigc-pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3 2 10h20z"/>
            </svg>
          </div>
          <div class="naigc-pillar-body">
            <div class="naigc-pillar-title-row">
              <span class="naigc-pillar-tag">05</span>
              <h3 class="naigc-pillar-title">AI ENTERPRISE & GOVT SOLUTIONS</h3>
            </div>
            <p class="naigc-pillar-desc">Enterprise & Public-Sector AI Projects</p>
          </div>
          <div class="naigc-pillar-arrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>

    <!-- Pillar 06: Holographic Violet -->
    <a href="#entrepreneurship-opc" class="naigc-pillar naigc-pillar-right naigc-theme-violet" data-pillar="6">
      <div class="naigc-pillar-border">
        <div class="naigc-pillar-surface">
          <div class="naigc-pillar-grid"></div>
          <div class="naigc-pillar-beam"></div>
          <div class="naigc-pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5"/>
              <path d="M12 15v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5"/>
            </svg>
          </div>
          <div class="naigc-pillar-body">
            <div class="naigc-pillar-title-row">
              <span class="naigc-pillar-tag">06</span>
              <h3 class="naigc-pillar-title">AI ENTREPRENEURSHIP & OPC</h3>
            </div>
            <p class="naigc-pillar-desc">Startup Development, Commercialisation & OPC</p>
          </div>
          <div class="naigc-pillar-arrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>

    <!-- Pillar 07: Electric Cyan -->
    <a href="#research-innovation" class="naigc-pillar naigc-pillar-right naigc-theme-cyan" data-pillar="7">
      <div class="naigc-pillar-border">
        <div class="naigc-pillar-surface">
          <div class="naigc-pillar-grid"></div>
          <div class="naigc-pillar-beam"></div>
          <div class="naigc-pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 18h8M3 22h18M14 22a7 7 0 1 0-7-7h14"/>
              <circle cx="9" cy="9" r="2"/>
            </svg>
          </div>
          <div class="naigc-pillar-body">
            <div class="naigc-pillar-title-row">
              <span class="naigc-pillar-tag">07</span>
              <h3 class="naigc-pillar-title">AI RESEARCH & INNOVATION</h3>
            </div>
            <p class="naigc-pillar-desc">R&D, Applied Research, IP & Commercialisation</p>
          </div>
          <div class="naigc-pillar-arrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>

    <!-- Pillar 08: Holographic Violet -->
    <a href="#future-technology" class="naigc-pillar naigc-pillar-right naigc-theme-violet" data-pillar="8">
      <div class="naigc-pillar-border">
        <div class="naigc-pillar-surface">
          <div class="naigc-pillar-grid"></div>
          <div class="naigc-pillar-beam"></div>
          <div class="naigc-pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div class="naigc-pillar-body">
            <div class="naigc-pillar-title-row">
              <span class="naigc-pillar-tag">08</span>
              <h3 class="naigc-pillar-title">AI FUTURE TECHNOLOGY</h3>
            </div>
            <p class="naigc-pillar-desc">Robotics, Automation, IoT & Emerging Tech</p>
          </div>
          <div class="naigc-pillar-arrow">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </div>
    </a>
  </div>
</div>`;

// Replace pillarsMarkup in JS
html = html.replace(
  /const pillarsMarkup = "[\s\S]*?";\s*\n\s*function mountEcosystem\(\)/,
  `const pillarsMarkup = ${JSON.stringify(unifiedMarkup)};\n\n  function mountEcosystem()`
);

// Update bindPillarCards selector to .naigc-pillar
html = html.replace(
  /document\.querySelectorAll\("\.naigc-holo-projection"\)/g,
  'document.querySelectorAll(".naigc-pillar")'
);

// Bump cache buster to v=bust37
html = html.replace(/v=bust36/g, 'v=bust37');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully applied unified 8 pillars component architecture!');

