const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Smoked Sapphire Glass with high readability and beautiful frosted translucency
const newGlassCSS = `
:root {
  /* NAIGC Official Holographic Palette */
  --naigc-cyan: #00D9FF;
  --naigc-cyan-dim: rgba(0, 217, 255, 0.45);
  --naigc-cyan-glow: rgba(0, 217, 255, 0.32);
  --naigc-cyan-bloom: rgba(0, 217, 255, 0.75);

  --naigc-blue-deep: #063B78;
  --naigc-navy-midnight: #020B20;
  
  --naigc-violet: #C084FC;
  --naigc-violet-dim: rgba(192, 132, 252, 0.45);
  --naigc-violet-glow: rgba(192, 132, 252, 0.32);
  --naigc-violet-bloom: rgba(192, 132, 252, 0.75);

  --naigc-ice-blue: #E2F1FD;
  --naigc-white: #FFFFFF;
  --naigc-desc: #94A3B8;

  /* Modern Smoked Glass Surface: Translucent yet high-contrast */
  --naigc-surface-bg: linear-gradient(135deg, rgba(8, 20, 48, 0.82) 0%, rgba(4, 12, 30, 0.88) 100%);
}

/* Inner Display Surface: Modern Smoked Glassmorphism */
.naigc-poly-surface {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: var(--naigc-surface-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  display: flex;
  align-items: center;
  gap: 0.95rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.22), 
              inset 0 -1px 1px rgba(0, 0, 0, 0.4),
              0 16px 40px rgba(0, 10, 30, 0.45);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

/* Glass Border Rims */
.naigc-theme-cyan .naigc-poly-border {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(0, 217, 255, 0.65) 35%, rgba(6, 40, 90, 0.4) 65%, rgba(0, 217, 255, 0.8) 100%);
  filter: drop-shadow(0 6px 18px rgba(0, 217, 255, 0.25));
}

.naigc-theme-violet .naigc-poly-border {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(192, 132, 252, 0.65) 35%, rgba(40, 10, 80, 0.4) 65%, rgba(192, 132, 252, 0.8) 100%);
  filter: drop-shadow(0 6px 18px rgba(168, 85, 247, 0.25));
}

/* Icon Chamber: Smoked Glass Capsule */
.naigc-theme-cyan .naigc-icon-chamber {
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.20) 0%, rgba(6, 20, 50, 0.85) 100%);
  border: 1px solid rgba(0, 217, 255, 0.45);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(0, 217, 255, 0.25);
  color: #00D9FF;
}

.naigc-theme-violet .naigc-icon-chamber {
  background: linear-gradient(135deg, rgba(192, 132, 252, 0.20) 0%, rgba(20, 6, 45, 0.85) 100%);
  border: 1px solid rgba(192, 132, 252, 0.45);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(168, 85, 247, 0.25);
  color: #C084FC;
}

/* Badge Capsule: High Contrast */
.naigc-theme-cyan .naigc-badge-capsule {
  background: rgba(0, 217, 255, 0.18);
  border: 1px solid rgba(0, 217, 255, 0.5);
  box-shadow: 0 0 8px rgba(0, 217, 255, 0.25);
  color: #00D9FF;
}

.naigc-theme-violet .naigc-badge-capsule {
  background: rgba(168, 85, 247, 0.18);
  border: 1px solid rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.25);
  color: #C084FC;
}

/* Crystal Hover */
.naigc-holo-projection:hover .naigc-poly-surface {
  background: linear-gradient(135deg, rgba(12, 30, 68, 0.90) 0%, rgba(6, 18, 44, 0.94) 100%);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.45), 
              0 22px 50px rgba(0, 10, 35, 0.6);
}

/* Typography: Ultra-crisp High Contrast */
.naigc-poly-title {
  margin: 0;
  font-family: var(--mq4-font, system-ui, sans-serif);
  color: #FFFFFF !important;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.25;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 217, 255, 0.3);
  transition: color 0.25s ease;
}

.naigc-theme-violet .naigc-poly-title {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(168, 85, 247, 0.3);
}

.naigc-poly-desc {
  margin: 0;
  color: #CBD5E1 !important;
  font-size: 0.74rem;
  font-weight: 500;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85);
  transition: color 0.25s ease;
}
`;

// Replace surface background variable
html = html.replace(
  /--naigc-surface-bg:\s*linear-gradient\([^;]+;/g,
  "--naigc-surface-bg: linear-gradient(135deg, rgba(8, 20, 48, 0.82) 0%, rgba(4, 12, 30, 0.88) 100%);"
);

// Replace .naigc-poly-surface
html = html.replace(
  /\.naigc-poly-surface\s*\{[\s\S]*?overflow:\s*hidden;[\s\S]*?\}/,
  `.naigc-poly-surface {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: var(--naigc-surface-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  display: flex;
  align-items: center;
  gap: 0.95rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.22), 
              inset 0 -1px 1px rgba(0, 0, 0, 0.4),
              0 16px 40px rgba(0, 10, 30, 0.45);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}`
);

// Replace border styling
html = html.replace(
  /\.naigc-theme-cyan \.naigc-poly-border\s*\{[\s\S]*?filter:[^;]*;/g,
  `.naigc-theme-cyan .naigc-poly-border {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(0, 217, 255, 0.65) 35%, rgba(6, 40, 90, 0.4) 65%, rgba(0, 217, 255, 0.8) 100%);
  filter: drop-shadow(0 6px 18px rgba(0, 217, 255, 0.25));`
);

html = html.replace(
  /\.naigc-theme-violet \.naigc-poly-border\s*\{[\s\S]*?filter:[^;]*;/g,
  `.naigc-theme-violet .naigc-poly-border {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.55) 0%, rgba(192, 132, 252, 0.65) 35%, rgba(40, 10, 80, 0.4) 65%, rgba(192, 132, 252, 0.8) 100%);
  filter: drop-shadow(0 6px 18px rgba(168, 85, 247, 0.25));`
);

// Replace icon chamber
html = html.replace(
  /\.naigc-theme-cyan \.naigc-icon-chamber\s*\{[\s\S]*?color:\s*#[a-fA-F0-9]+;\s*\}/g,
  `.naigc-theme-cyan .naigc-icon-chamber {
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.20) 0%, rgba(6, 20, 50, 0.85) 100%);
  border: 1px solid rgba(0, 217, 255, 0.45);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(0, 217, 255, 0.25);
  color: #00D9FF;
}`
);

html = html.replace(
  /\.naigc-theme-violet \.naigc-icon-chamber\s*\{[\s\S]*?color:\s*#[a-fA-F0-9]+;\s*\}/g,
  `.naigc-theme-violet .naigc-icon-chamber {
  background: linear-gradient(135deg, rgba(192, 132, 252, 0.20) 0%, rgba(20, 6, 45, 0.85) 100%);
  border: 1px solid rgba(192, 132, 252, 0.45);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(168, 85, 247, 0.25);
  color: #C084FC;
}`
);

// Replace badge capsule
html = html.replace(
  /\.naigc-theme-cyan \.naigc-badge-capsule\s*\{[\s\S]*?color:\s*#[a-fA-F0-9]+;\s*\}/g,
  `.naigc-theme-cyan .naigc-badge-capsule {
  background: rgba(0, 217, 255, 0.18);
  border: 1px solid rgba(0, 217, 255, 0.5);
  box-shadow: 0 0 8px rgba(0, 217, 255, 0.25);
  color: #00D9FF;
}`
);

html = html.replace(
  /\.naigc-theme-violet \.naigc-badge-capsule\s*\{[\s\S]*?color:\s*#[a-fA-F0-9]+;\s*\}/g,
  `.naigc-theme-violet .naigc-badge-capsule {
  background: rgba(168, 85, 247, 0.18);
  border: 1px solid rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.25);
  color: #C084FC;
}`
);

// Replace hover surface
html = html.replace(
  /\.naigc-holo-projection:hover \.naigc-poly-surface\s*\{[\s\S]*?\}/g,
  `.naigc-holo-projection:hover .naigc-poly-surface {
  background: linear-gradient(135deg, rgba(12, 30, 68, 0.90) 0%, rgba(6, 18, 44, 0.94) 100%);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.45), 
              0 22px 50px rgba(0, 10, 35, 0.6);
}`
);

// Replace typography
html = html.replace(
  /\.naigc-poly-title\s*\{[\s\S]*?transition:\s*color 0\.25s ease;\s*\}/g,
  `.naigc-poly-title {
  margin: 0;
  font-family: var(--mq4-font, system-ui, sans-serif);
  color: #FFFFFF !important;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.25;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(0, 217, 255, 0.3);
  transition: color 0.25s ease;
}`
);

html = html.replace(
  /\.naigc-poly-desc\s*\{[\s\S]*?transition:\s*color 0\.25s ease;\s*\}/g,
  `.naigc-poly-desc {
  margin: 0;
  color: #CBD5E1 !important;
  font-size: 0.74rem;
  font-weight: 500;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85);
  transition: color 0.25s ease;
}`
);

// Bump cache buster to v=bust36
html = html.replace(/v=bust35/g, 'v=bust36');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Updated index.html with smoked high-contrast translucent glass pillars!');

