const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update variables in :root
html = html.replace(
  /--naigc-surface-bg: linear-gradient\(135deg, rgba\(2, 11, 32, 0\.90\) 0%, rgba\(4, 22, 54, 0\.80\) 50%, rgba\(2, 8, 24, 0\.94\) 100%\);/g,
  "--naigc-surface-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(230, 244, 255, 0.14) 45%, rgba(210, 235, 255, 0.08) 100%);"
);

// 2. Update .naigc-poly-surface
const oldSurfaceRule = /\.naigc-poly-surface\s*\{[\s\S]*?overflow:\s*hidden;\s*\}/;
const newSurfaceRule = `.naigc-poly-surface {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: var(--naigc-surface-bg);
  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  display: flex;
  align-items: center;
  gap: 0.95rem;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.65), 
              inset 0 -1px 2px rgba(0, 40, 100, 0.12),
              0 14px 38px rgba(2, 16, 48, 0.24);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}`;
html = html.replace(oldSurfaceRule, newSurfaceRule);

// 3. Update border gradients for Cyan & Violet
html = html.replace(
  /\.naigc-theme-cyan \.naigc-poly-border\s*\{[\s\S]*?filter:[^;]*;/g,
  `.naigc-theme-cyan .naigc-poly-border {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(0, 217, 255, 0.75) 30%, rgba(255, 255, 255, 0.35) 65%, rgba(0, 217, 255, 0.85) 100%);
  filter: drop-shadow(0 6px 20px rgba(0, 217, 255, 0.35));`
);

html = html.replace(
  /\.naigc-theme-violet \.naigc-poly-border\s*\{[\s\S]*?filter:[^;]*;/g,
  `.naigc-theme-violet .naigc-poly-border {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(192, 132, 252, 0.75) 30%, rgba(255, 255, 255, 0.35) 65%, rgba(192, 132, 252, 0.85) 100%);
  filter: drop-shadow(0 6px 20px rgba(168, 85, 247, 0.35));`
);

// 4. Update Icon Chamber to Frosted Crystal
html = html.replace(
  /\.naigc-theme-cyan \.naigc-icon-chamber\s*\{[\s\S]*?color:\s*var\(--naigc-cyan\);\s*\}/g,
  `.naigc-theme-cyan .naigc-icon-chamber {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(0, 217, 255, 0.18) 100%);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 4px 16px rgba(0, 217, 255, 0.25);
  color: #00D9FF;
}`
);

html = html.replace(
  /\.naigc-theme-violet \.naigc-icon-chamber\s*\{[\s\S]*?color:\s*var\(--naigc-violet\);\s*\}/g,
  `.naigc-theme-violet .naigc-icon-chamber {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(168, 85, 247, 0.18) 100%);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.8), 0 4px 16px rgba(168, 85, 247, 0.25);
  color: #C084FC;
}`
);

// 5. Update Badge Capsule (01-08)
html = html.replace(
  /\.naigc-theme-cyan \.naigc-badge-capsule\s*\{[\s\S]*?color:\s*var\(--naigc-cyan\);\s*\}/g,
  `.naigc-theme-cyan .naigc-badge-capsule {
  background: rgba(255, 255, 255, 0.30);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 2px 8px rgba(0, 217, 255, 0.3);
  color: #00D9FF;
}`
);

html = html.replace(
  /\.naigc-theme-violet \.naigc-badge-capsule\s*\{[\s\S]*?color:\s*var\(--naigc-violet\);\s*\}/g,
  `.naigc-theme-violet .naigc-badge-capsule {
  background: rgba(255, 255, 255, 0.30);
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
  color: #C084FC;
}`
);

// 6. Update Hover surface to Luminous Crystal Glass
html = html.replace(
  /\.naigc-holo-projection:hover \.naigc-poly-surface\s*\{[\s\S]*?\}/g,
  `.naigc-holo-projection:hover .naigc-poly-surface {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(240, 250, 255, 0.26) 50%, rgba(215, 240, 255, 0.18) 100%);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.9), 
              0 20px 50px rgba(0, 50, 120, 0.28);
}`
);

// 7. Typography text shadows for optimal contrast over frosted daytime glass
html = html.replace(
  /\.naigc-poly-title\s*\{[\s\S]*?transition:\s*color 0\.25s ease;\s*\}/g,
  `.naigc-poly-title {
  margin: 0;
  font-family: var(--mq4-font, system-ui, sans-serif);
  color: #FFFFFF;
  font-size: 0.90rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  line-height: 1.25;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(2, 12, 32, 0.75), 0 0 12px rgba(0, 217, 255, 0.4);
  transition: color 0.25s ease;
}`
);

html = html.replace(
  /\.naigc-poly-desc\s*\{[\s\S]*?transition:\s*color 0\.25s ease;\s*\}/g,
  `.naigc-poly-desc {
  margin: 0;
  color: #E2F1FD;
  font-size: 0.74rem;
  font-weight: 500;
  line-height: 1.35;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 1px 3px rgba(2, 12, 32, 0.7);
  transition: color 0.25s ease;
}`
);

// Bump cache buster to v=bust35
html = html.replace(/v=bust34/g, 'v=bust35');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html updated with modern translucent glass 8 pillars!');

