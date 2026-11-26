const fs = require('fs');

// 1. UPDATE index.html
let html = fs.readFileSync('index.html', 'utf8');

// Replace variable definitions
html = html.replace(/--naigc-violet:\s*#A855F7;/g, '--naigc-gold: #E5B869; --naigc-violet: #E5B869;');
html = html.replace(/--naigc-violet-dim:\s*rgba\(168,\s*85,\s*247,\s*0\.45\);/g, '--naigc-gold-dim: rgba(229, 184, 105, 0.45); --naigc-violet-dim: rgba(229, 184, 105, 0.45);');
html = html.replace(/--naigc-violet-glow:\s*rgba\(168,\s*85,\s*247,\s*0\.32\);/g, '--naigc-gold-glow: rgba(229, 184, 105, 0.35); --naigc-violet-glow: rgba(229, 184, 105, 0.35);');
html = html.replace(/--naigc-violet-bloom:\s*rgba\(168,\s*85,\s*247,\s*0\.75\);/g, '--naigc-gold-bloom: rgba(229, 184, 105, 0.75); --naigc-violet-bloom: rgba(229, 184, 105, 0.75);');

// Replace styles for .naigc-theme-violet / .naigc-theme-gold
html = html.replace(/\.naigc-theme-violet \.naigc-tech-grid-tag\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-tech-grid-tag,
.naigc-theme-violet .naigc-tech-grid-tag {
  color: #E5B869;
  text-shadow: 0 0 6px rgba(229, 184, 105, 0.65);
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-scan-beam\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-scan-beam,
.naigc-theme-violet .naigc-scan-beam {
  background: linear-gradient(180deg, transparent, rgba(229, 184, 105, 0.28), transparent);
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-badge-capsule\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-badge-capsule,
.naigc-theme-violet .naigc-badge-capsule {
  background: rgba(229, 184, 105, 0.20);
  border: 1px solid rgba(229, 184, 105, 0.65);
  box-shadow: 0 0 8px rgba(229, 184, 105, 0.35);
  color: #F6D365;
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-icon-chamber\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-icon-chamber,
.naigc-theme-violet .naigc-icon-chamber {
  background: linear-gradient(135deg, rgba(229, 184, 105, 0.25) 0%, rgba(28, 18, 4, 0.94) 100%);
  border: 1px solid rgba(229, 184, 105, 0.65);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 4px 14px rgba(229, 184, 105, 0.32);
  color: #F3C66F;
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-poly-title\s*\{[\s\S]*?text-shadow:[^;]+;[\s\S]*?\}/g, `.naigc-theme-gold .naigc-poly-title,
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
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.9), 0 0 10px rgba(229, 184, 105, 0.38);
  transition: color 0.25s ease;
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-holo-readout\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-holo-readout,
.naigc-theme-violet .naigc-holo-readout {
  color: #E5B869;
}`);

html = html.replace(/\.naigc-theme-violet:hover \.naigc-poly-border\s*\{[^}]*\}/g, `.naigc-theme-gold:hover .naigc-poly-border,
.naigc-theme-violet:hover .naigc-poly-border {
  background: linear-gradient(135deg, #E5B869 0%, #F6D365 50%, #D49A3D 100%);
  filter: drop-shadow(0 0 16px rgba(229, 184, 105, 0.65)) drop-shadow(0 0 32px rgba(229, 184, 105, 0.35));
}`);

html = html.replace(/\.naigc-theme-violet:hover \.naigc-icon-chamber\s*\{[^}]*\}/g, `.naigc-theme-gold:hover .naigc-icon-chamber,
.naigc-theme-violet:hover .naigc-icon-chamber {
  box-shadow: 0 0 18px rgba(229, 184, 105, 0.7);
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-link-track\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-link-track,
.naigc-theme-violet .naigc-link-track {
  background: linear-gradient(90deg, #E5B869, rgba(229, 184, 105, 0.15)) !important;
  box-shadow: 0 0 8px rgba(229, 184, 105, 0.5);
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-link-left \.naigc-link-track\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-link-left .naigc-link-track,
.naigc-theme-violet .naigc-link-left .naigc-link-track {
  background: linear-gradient(90deg, rgba(229, 184, 105, 0.15), #E5B869) !important;
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-link-stream\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-link-stream,
.naigc-theme-violet .naigc-link-stream {
  box-shadow: 0 0 8px #F6D365;
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-link-terminal\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-link-terminal,
.naigc-theme-violet .naigc-link-terminal {
  box-shadow: 0 0 10px #E5B869, 0 0 18px #E5B869;
}`);

html = html.replace(/\.naigc-theme-violet \.naigc-tech-bracket\s*\{[^}]*\}/g, `.naigc-theme-gold .naigc-tech-bracket,
.naigc-theme-violet .naigc-tech-bracket {
  border-color: #E5B869;
}`);

// Update HUD accent color
html = html.replace(/\.naigc-hud-accent\s*\{[^}]*\}/g, `.naigc-hud-accent {
  color: #E5B869;
  font-weight: 800;
  text-shadow: 0 0 8px rgba(229, 184, 105, 0.45);
}`);

// Update markup to use naigc-theme-gold
html = html.replaceAll('naigc-theme-violet', 'naigc-theme-gold');

// Bump cache buster to bust65
html = html.replaceAll('v=bust60', 'v=bust65');
html = html.replaceAll('v=bust55', 'v=bust65');

fs.writeFileSync('index.html', html);
console.log('Successfully updated index.html to NAIGC Gold palette!');

// 2. UPDATE build/assets/engine-BRf7lQZ-.js
let engine = fs.readFileSync('build/assets/engine-BRf7lQZ-.js', 'utf8');

// Update Ue colors: replace violet (11032055) with champagne gold 0xE5B869 = 15054953
engine = engine.replaceAll('11032055', '15054953');

// Update shader He
const sIdx = engine.indexOf("He=`\nprecision mediump float;");
const eIdx = engine.indexOf("`,Ue=", sIdx);

const goldShaderBody = `He=\`
precision mediump float;
varying vec2 vUv;
uniform sampler2D uNoise;
uniform float uTime;
uniform float uAmount;
uniform vec3 uColor;
uniform vec3 uColorB;

void main() {
  vec2 uv = vUv - 0.5;
  float dist = length(uv);
  if (dist > 0.49) discard;
  
  float angle = atan(uv.y, uv.x);
  
  // Smooth glowing core
  float core = exp(-dist * 5.0);
  float aura = smoothstep(0.48, 0.08, dist);
  
  // Cybernetic concentric energy ripples
  float ripple = sin(dist * 48.0 - uTime * 2.2);
  ripple = smoothstep(0.65, 0.98, ripple) * smoothstep(0.46, 0.12, dist);
  
  // Rotating futuristic data dials
  float dial1 = sin(angle * 12.0 + uTime * 0.6);
  float dialLine1 = smoothstep(0.015, 0.0, abs(dist - 0.28)) * step(0.15, dial1);
  
  float dial2 = sin(angle * 24.0 - uTime * 0.4);
  float dialLine2 = smoothstep(0.010, 0.0, abs(dist - 0.36)) * step(0.2, dial2);
  
  // Animated holographic energy stream
  vec2 wind = vec2(uTime * 0.04, uTime * 0.02);
  float n = texture2D(uNoise, (uv * 2.2 + wind) / 32.0).r;
  float tint = texture2D(uNoise, (uv * 1.6 - wind.yx + vec2(1.7, 2.3)) / 32.0).g;
  float energyStream = smoothstep(0.22, 0.68, n) * aura;
  
  // Color blending: Electric Cyber Cyan to Prestige Champagne Gold (NAIGC Brand)
  vec3 neonCyan = vec3(0.0, 0.88, 1.0);
  vec3 champagneGold = vec3(0.95, 0.78, 0.45);
  vec3 baseColor = mix(neonCyan, champagneGold, smoothstep(0.18, 0.65, dist + tint * 0.12));
  
  // Composite color with bright accents on dials and ripples
  vec3 finalColor = baseColor + neonCyan * (dialLine1 * 1.35 + ripple * 0.7) + champagneGold * (dialLine2 * 1.35 + core * 0.35);
  
  // Alpha blending
  float alpha = (core * 0.75 + energyStream * 0.45 + ripple * 0.35 + dialLine1 * 0.65 + dialLine2 * 0.5) * uAmount * 1.25;
  alpha = clamp(alpha, 0.0, 0.88);
  if (alpha < 0.01) discard;
  
  gl_FragColor = vec4(finalColor, alpha);
}
\`,Ue=`;

if (sIdx !== -1 && eIdx !== -1) {
  engine = engine.substring(0, sIdx) + goldShaderBody + engine.substring(eIdx + "`,Ue=".length);
  console.log("Successfully replaced shader He with NAIGC Gold/Cyan portal!");
} else {
  console.log("Error: Could not locate shader boundaries!");
}

engine = engine.replaceAll('v=bust60', 'v=bust65');
engine = engine.replaceAll('v=bust55', 'v=bust65');
fs.writeFileSync('build/assets/engine-BRf7lQZ-.js', engine);
console.log('Successfully updated build/assets/engine-BRf7lQZ-.js!');

// 3. UPDATE build/assets/landing-v4-CgTD28v7.js
let landing = fs.readFileSync('build/assets/landing-v4-CgTD28v7.js', 'utf8');
landing = landing.replaceAll('v=bust60', 'v=bust65');
landing = landing.replaceAll('v=bust55', 'v=bust65');
fs.writeFileSync('build/assets/landing-v4-CgTD28v7.js', landing);
console.log('Successfully updated build/assets/landing-v4-CgTD28v7.js!');

