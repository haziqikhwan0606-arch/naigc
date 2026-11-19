const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update background to bright daytime KL skyline with clouds
html = html.replace(
  /url\('\.\/build\/assets\/kl_skyline_cyber\.jpg'\) no-repeat center bottom \/ cover !important;/g,
  "url('./build/assets/kl_skyline_day.jpg') no-repeat center bottom / cover !important;"
);

// Brighten gradient overlay on .mq4-stage
html = html.replace(
  /linear-gradient\(180deg, rgba\(2, 6, 23, 0\.55\) 0%, rgba\(2, 6, 23, 0\.15\) 30%, rgba\(2, 6, 23, 0\.45\) 75%, rgba\(2, 6, 23, 0\.95\) 100%\),/g,
  "linear-gradient(180deg, rgba(14, 45, 90, 0.16) 0%, rgba(12, 38, 80, 0.04) 35%, rgba(8, 24, 56, 0.20) 75%, rgba(4, 14, 38, 0.60) 100%),"
);

// 2. Make cursor effect smaller and sleeker
html = html.replace(
  /const TRAIL_LIFETIME = 1200;[\s\S]*?const BASE_WIDTH = 28 \* dpr;/,
  "const TRAIL_LIFETIME = 850;\n  const BASE_WIDTH = 12 * dpr;"
);

html = html.replace(
  /const passes = \[\s*\{ color: "rgba\(255, 45, 160, ", shift: 3\.5 \* dpr, blur: 16 \* dpr \},\s*\{ color: "rgba\(0, 235, 255, ", shift: -3\.5 \* dpr, blur: 14 \* dpr \},\s*\{ color: "rgba\(255, 255, 255, ", shift: 0, blur: 6 \* dpr \}\s*\];/,
  `const passes = [
      { color: "rgba(255, 45, 160, ", shift: 1.8 * dpr, blur: 8 * dpr },
      { color: "rgba(0, 235, 255, ", shift: -1.8 * dpr, blur: 7 * dpr },
      { color: "rgba(255, 255, 255, ", shift: 0, blur: 3 * dpr }
    ];`
);

html = html.replace(
  /const w0 = Math\.max\(3 \* dpr, BASE_WIDTH \* Math\.pow\(progress0, 0\.85\) \* Math\.min\(2\.2, 0\.8 \+ p0\.speed \* 0\.025\)\);/g,
  "const w0 = Math.max(1.5 * dpr, BASE_WIDTH * Math.pow(progress0, 0.85) * Math.min(1.8, 0.8 + p0.speed * 0.016));"
);

html = html.replace(
  /const w1 = Math\.max\(3 \* dpr, BASE_WIDTH \* Math\.pow\(progress1, 0\.85\) \* Math\.min\(2\.2, 0\.8 \+ p1\.speed \* 0\.025\)\);/g,
  "const w1 = Math.max(1.5 * dpr, BASE_WIDTH * Math.pow(progress1, 0.85) * Math.min(1.8, 0.8 + p1.speed * 0.016));"
);

// 3. Bump cache buster to v=bust33
html = html.replace(/v=bust32/g, 'v=bust33');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html updated successfully with daytime skyline and smaller cursor!');
