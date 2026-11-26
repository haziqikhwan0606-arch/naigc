const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update variables in :root
html = html.replace(
  /--naigc-surface-bg:[\s\S]*?;/,
  `--naigc-surface-bg: linear-gradient(135deg, rgba(8, 22, 54, 0.86) 0%, rgba(4, 12, 34, 0.92) 100%);`
);

// 2. Expand grid container & projection width so no text is truncated
html = html.replace(
  /grid-template-columns:\s*minmax\(370px,\s*435px\)\s*1fr\s*minmax\(370px,\s*435px\);/,
  "grid-template-columns: minmax(380px, 470px) 1fr minmax(380px, 470px);"
);
html = html.replace(/max-width:\s*1540px;/, "max-width: 1580px;");
html = html.replace(/max-width:\s*435px;/, "max-width: 470px;");

// 3. Define the precise polygon geometry for both Left and Right panels
const polygonStyles = `
/* Left Panels Polygon: Cut corners on left, Tapered apex facing Cyborg on right */
.naigc-proj-left .naigc-poly-border {
  clip-path: polygon(
    22px 0%, 
    calc(100% - 28px) 0%, 
    100% 50%, 
    calc(100% - 28px) 100%, 
    22px 100%, 
    0% calc(100% - 22px), 
    0% 22px
  );
}

.naigc-proj-left .naigc-poly-surface {
  clip-path: polygon(
    21px 0%, 
    calc(100% - 27px) 0%, 
    99.2% 50%, 
    calc(100% - 27px) 100%, 
    21px 100%, 
    0% calc(100% - 21px), 
    0% 21px
  );
  padding: 0.75rem 2.4rem 0.75rem 1.15rem;
}

/* Right Panels Polygon: Cut corners on right, Tapered apex facing Cyborg on left */
.naigc-proj-right .naigc-poly-border {
  clip-path: polygon(
    28px 0%, 
    calc(100% - 22px) 0%, 
    100% 22px, 
    100% calc(100% - 22px), 
    calc(100% - 22px) 100%, 
    28px 100%, 
    0% 50%
  );
}

.naigc-proj-right .naigc-poly-surface {
  clip-path: polygon(
    27px 0%, 
    calc(100% - 21px) 0%, 
    100% 21px, 
    100% calc(100% - 21px), 
    calc(100% - 21px) 100%, 
    27px 100%, 
    0.8% 50%
  );
  padding: 0.75rem 1.15rem 0.75rem 2.4rem;
}

/* Base Poly Surface (Shared Smoked Sapphire Glass) */
.naigc-poly-surface {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: var(--naigc-surface-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  display: flex;
  align-items: center;
  gap: 0.85rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.22), 
              inset 0 -1px 2px rgba(0, 0, 0, 0.5),
              0 14px 40px rgba(0, 10, 32, 0.45);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
`;

// Replace left poly surface rule with the comprehensive polygonStyles
html = html.replace(
  /\/\* Left Panels Polygon:[\s\S]*?\.naigc-proj-left \.naigc-poly-surface\s*\{[\s\S]*?\}\s*(?=\/\* Internal Micro-Grid)/,
  polygonStyles.trim() + "\n\n"
);

// 4. Update Border Gradients for Cyan and Violet
html = html.replace(
  /\.naigc-theme-cyan \.naigc-poly-border\s*\{[\s\S]*?filter:[^;]*;/g,
  `.naigc-theme-cyan .naigc-poly-border {
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.9) 0%, rgba(14, 116, 204, 0.5) 45%, rgba(0, 217, 255, 0.85) 100%);
  filter: drop-shadow(0 4px 16px rgba(0, 217, 255, 0.32));`
);

html = html.replace(
  /\.naigc-theme-violet \.naigc-poly-border\s*\{[\s\S]*?filter:[^;]*;/g,
  `.naigc-theme-violet .naigc-poly-border {
  background: linear-gradient(135deg, rgba(192, 132, 252, 0.9) 0%, rgba(147, 51, 234, 0.5) 45%, rgba(192, 132, 252, 0.85) 100%);
  filter: drop-shadow(0 4px 16px rgba(168, 85, 247, 0.32));`
);

// 5. Update Badge Capsule (01-08) for crisp contrast
html = html.replace(
  /\.naigc-theme-cyan \.naigc-badge-capsule\s*\{[\s\S]*?color:\s*#00D9FF;\s*\}/g,
  `.naigc-theme-cyan .naigc-badge-capsule {
  background: rgba(0, 217, 255, 0.20);
  border: 1px solid rgba(0, 217, 255, 0.55);
  box-shadow: 0 0 8px rgba(0, 217, 255, 0.3);
  color: #00D9FF;
}`
);

html = html.replace(
  /\.naigc-theme-violet \.naigc-badge-capsule\s*\{[\s\S]*?color:\s*#C084FC;\s*\}/g,
  `.naigc-theme-violet .naigc-badge-capsule {
  background: rgba(168, 85, 247, 0.20);
  border: 1px solid rgba(168, 85, 247, 0.55);
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.3);
  color: #C084FC;
}`
);

// 6. Update Icon Chamber: Smoked glass with glowing border
html = html.replace(
  /\.naigc-theme-cyan \.naigc-icon-chamber\s*\{[\s\S]*?color:\s*#00D9FF;\s*\}/g,
  `.naigc-theme-cyan .naigc-icon-chamber {
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.22) 0%, rgba(6, 24, 58, 0.92) 100%);
  border: 1px solid rgba(0, 217, 255, 0.55);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(0, 217, 255, 0.28);
  color: #00D9FF;
}`
);

html = html.replace(
  /\.naigc-theme-violet \.naigc-icon-chamber\s*\{[\s\S]*?color:\s*#C084FC;\s*\}/g,
  `.naigc-theme-violet .naigc-icon-chamber {
  background: linear-gradient(135deg, rgba(192, 132, 252, 0.22) 0%, rgba(26, 8, 52, 0.92) 100%);
  border: 1px solid rgba(192, 132, 252, 0.55);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(168, 85, 247, 0.28);
  color: #C084FC;
}`
);

// 7. Update Typography: Crisp white title and clean desc without truncation
const typographyCSS = `
.naigc-poly-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  flex: 1;
  min-width: 0;
  z-index: 5;
  padding-top: 4px;
}

.naigc-poly-title {
  margin: 0;
  font-family: var(--mq4-font, system-ui, sans-serif);
  color: #FFFFFF !important;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.035em;
  line-height: 1.25;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: visible;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 217, 255, 0.35);
  transition: color 0.25s ease;
}

.naigc-theme-violet .naigc-poly-title {
  margin: 0;
  font-family: var(--mq4-font, system-ui, sans-serif);
  color: #FFFFFF !important;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.035em;
  line-height: 1.25;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: visible;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(168, 85, 247, 0.35);
  transition: color 0.25s ease;
}

.naigc-poly-desc {
  margin: 0;
  color: #CBD5E1 !important;
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.35;
  white-space: nowrap;
  overflow: visible;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85);
  transition: color 0.25s ease;
}
`;

html = html.replace(
  /\.naigc-poly-content\s*\{[\s\S]*?\.naigc-holo-readout\s*\{/g,
  typographyCSS.trim() + "\n\n/* Subtle Directional Arrow Readout */\n.naigc-holo-readout {"
);

// 8. Hide subsequent template sections so user can only scroll to 8 pillars
const hideExtraSectionsCSS = `
#games,
#opties,
#pakketten,
#faq,
.mq4-section,
.mq4-fb-acts,
.mq4-fb-brand,
.mq4-fb-play,
.mq4-fb-screen,
.mq4-main,
.mq4 .mq4-btn.mq4-book-cta,
.mq4-snaps,
.mq4-snap,
.mq4-words.is-flat.is-back,
.mq4-story__closing,
.mq4-closing,
.mq4-footer,
.mq4-act,
.mq4-copy,
.mq4-meter,
.mq4-brand-rise,
.mq4-brand-tools,
.mq4-panel,
.mq4-play {
  display: none !important;
  height: 0 !important;
  max-height: 0 !important;
  overflow: hidden !important;
  visibility: hidden !important;
  pointer-events: none !important;
}

.mq4-track {
  max-height: 100vh !important;
  overflow: hidden !important;
}

.mq4-stick {
  height: 100vh !important;
  max-height: 100vh !important;
}

.mq4-fallback {
  height: auto !important;
  min-height: 100vh !important;
  overflow: hidden !important;
}

.mq4-fb-hero {
  min-height: 100vh !important;
  height: auto !important;
  overflow: hidden !important;
}
`;

html = html.replace(
  /\.mq4-main,[\s\S]*?\.mq4-play\s*\{\s*display:\s*none\s*!important;\s*\}/,
  hideExtraSectionsCSS.trim()
);

// 9. Add scroll boundary enforcer before </body> if not present
if (!html.includes('lockScrollBoundary')) {
  const scrollLockScript = `
<script>
/**
 * NAIGC SCROLL BOUNDARY ENFORCER
 * Ensures the user can only scroll up to the 8 Pillars & Cyborg showcase part,
 * strictly preventing scrolling past this section.
 */
(function lockScrollBoundary() {
  function getPillarsBottom() {
    const pillars = document.getElementById('naigc-pillars');
    if (!pillars) return null;
    const rect = pillars.getBoundingClientRect();
    return window.scrollY + rect.bottom;
  }

  function clampScroll() {
    const pillarsBottom = getPillarsBottom();
    if (!pillarsBottom) return;
    const maxScroll = Math.max(0, pillarsBottom - window.innerHeight + 30);
    if (window.scrollY > maxScroll) {
      window.scrollTo({ top: maxScroll, behavior: 'instant' });
    }
  }

  window.addEventListener('scroll', clampScroll, { passive: true });
  window.addEventListener('resize', clampScroll, { passive: true });
  window.addEventListener('load', clampScroll, { passive: true });
})();
</script>
`;
  html = html.replace('</body>', scrollLockScript.trim() + '\n</body>');
}

// Bump cache buster
html = html.replace(/v=bust35/g, 'v=bust39');
html = html.replace(/v=bust36/g, 'v=bust39');
html = html.replace(/v=bust37/g, 'v=bust39');
html = html.replace(/v=bust38/g, 'v=bust39');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully applied tapered enhancements, high contrast smoked glass, and scroll locking!');

