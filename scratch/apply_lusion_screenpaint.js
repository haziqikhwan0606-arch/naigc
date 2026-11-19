const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. CSS for Lusion ScreenPaint Liquid Chromatic Trail
const screenPaintCSS = `
/* ==========================================================================
   LUSION.CO SCREENPAINT — LIQUID CHROMATIC DISPERSION TRAIL
   ========================================================================== */

#lusion-screenpaint-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 99998;
  mix-blend-mode: screen;
}

/* 3D Interactive Card Perspective Depth */
.naigc-holo-projection {
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.3, 1);
  will-change: transform;
}

.naigc-holo-projection.is-card-tilted {
  transition: transform 0.08s ease-out;
}
`;

// 2. JS for Lusion ScreenPaint Liquid Chromatic Ribbon Engine
const screenPaintScript = `
<script>
/**
 * LUSION.CO SCREENPAINT ENGINE — LIQUID IRIDESCENT RIBBON & CHROMATIC ABERRATION
 * Recreates the exact signature effect from lusion.co/projects:
 * - Fluid ribbon spline trailing the cursor
 * - Multi-pass spectral chromatic aberration (Cyan, Magenta, Amber, Liquid Specular)
 * - Organic dissipation & curl noise physics
 * - Native pointer responsiveness (zero lag)
 */
(function initLusionScreenPaint() {
  if (typeof window === "undefined") return;

  // Create High-Performance GPU Canvas
  const canvas = document.createElement("canvas");
  canvas.id = "lusion-screenpaint-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });
  let width = (canvas.width = window.innerWidth * window.devicePixelRatio || 1);
  let height = (canvas.height = window.innerHeight * window.devicePixelRatio || 1);
  const dpr = window.devicePixelRatio || 1;

  function resize() {
    width = canvas.width = window.innerWidth * dpr;
    height = canvas.height = window.innerHeight * dpr;
  }
  window.addEventListener("resize", resize, { passive: true });

  // Mouse State & Trail Buffer
  const points = [];
  const TRAIL_LIFETIME = 1200; // ms to dissipate
  const BASE_WIDTH = 28 * dpr;
  let mouseX = -1000, mouseY = -1000;
  let prevMouseX = -1000, prevMouseY = -1000;
  let isMoving = false;
  let moveTimeout = null;

  window.addEventListener("pointermove", (e) => {
    const curX = e.clientX * dpr;
    const curY = e.clientY * dpr;

    if (prevMouseX < 0) {
      prevMouseX = curX;
      prevMouseY = curY;
    }

    const vx = curX - prevMouseX;
    const vy = curY - prevMouseY;
    const speed = Math.hypot(vx, vy);

    if (speed > 1.5) {
      points.push({
        x: curX,
        y: curY,
        vx: vx,
        vy: vy,
        speed: speed,
        age: 0,
        birth: performance.now(),
        noiseOffset: (Math.random() - 0.5) * 6 * dpr
      });
      prevMouseX = curX;
      prevMouseY = curY;
    }

    mouseX = curX;
    mouseY = curY;
    isMoving = true;
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => { isMoving = false; }, 100);
  }, { passive: true });

  // 3D Tilt on Pillar Cards
  function bindPillarCards() {
    const cards = document.querySelectorAll(".naigc-holo-projection");
    cards.forEach((card) => {
      if (card.dataset.tiltBound) return;
      card.dataset.tiltBound = "true";

      card.addEventListener("pointerenter", () => {
        card.classList.add("is-card-tilted");
      });

      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const normX = (e.clientX - cardCenterX) / (rect.width / 2);
        const normY = (e.clientY - cardCenterY) / (rect.height / 2);
        const tiltX = -normY * 7;
        const tiltY = normX * 7;
        card.style.transform = \`perspective(1000px) rotateX(\${tiltX.toFixed(2)}deg) rotateY(\${tiltY.toFixed(2)}deg) translateZ(12px)\`;
      });

      card.addEventListener("pointerleave", () => {
        card.classList.remove("is-card-tilted");
        card.style.transform = "";
      });
    });
  }
  bindPillarCards();
  const obs = new MutationObserver(bindPillarCards);
  obs.observe(document.body, { childList: true, subtree: true });

  // 60-120FPS Render Loop: Liquid Chromatic Spline Trail
  function render(now) {
    requestAnimationFrame(render);

    // Prune expired points
    while (points.length > 0 && (now - points[0].birth) > TRAIL_LIFETIME) {
      points.shift();
    }

    ctx.clearRect(0, 0, width, height);

    if (points.length < 3) return;

    // Multi-pass Chromatic Aberration Drawing
    // Pass 1: Magenta / Violet Fringe (+offset)
    // Pass 2: Cyan / Ice-Blue Fringe (-offset)
    // Pass 3: Radiant Liquid White Core
    const passes = [
      { color: "rgba(255, 45, 160, ", shift: 3.5 * dpr, blur: 16 * dpr },
      { color: "rgba(0, 235, 255, ", shift: -3.5 * dpr, blur: 14 * dpr },
      { color: "rgba(255, 255, 255, ", shift: 0, blur: 6 * dpr }
    ];

    passes.forEach((p) => {
      ctx.save();
      ctx.shadowBlur = p.blur;
      ctx.shadowColor = p.color + "0.6)";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];

        const progress0 = Math.max(0, 1 - (now - p0.birth) / TRAIL_LIFETIME);
        const progress1 = Math.max(0, 1 - (now - p1.birth) / TRAIL_LIFETIME);
        const alpha = Math.min(progress0, progress1) * 0.85;

        if (alpha <= 0.01) continue;

        // Compute normal vector for chromatic shift & curl
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        // Dynamic width: fluid taper based on age and speed
        const w0 = Math.max(3 * dpr, BASE_WIDTH * Math.pow(progress0, 0.85) * Math.min(2.2, 0.8 + p0.speed * 0.025));
        const w1 = Math.max(3 * dpr, BASE_WIDTH * Math.pow(progress1, 0.85) * Math.min(2.2, 0.8 + p1.speed * 0.025));
        const avgWidth = (w0 + w1) * 0.5;

        // Slight curl displacement over lifetime
        const curlPhase = (now - p0.birth) * 0.005;
        const curl = Math.sin(curlPhase) * p0.noiseOffset * (1 - progress0);

        const x0 = p0.x + nx * (p.shift + curl);
        const y0 = p0.y + ny * (p.shift + curl);
        const x1 = p1.x + nx * (p.shift + curl);
        const y1 = p1.y + ny * (p.shift + curl);

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineWidth = p.shift === 0 ? avgWidth * 0.65 : avgWidth;
        ctx.strokeStyle = p.color + (alpha * (p.shift === 0 ? 0.95 : 0.75)) + ")";
        ctx.stroke();
      }
      ctx.restore();
    });
  }

  requestAnimationFrame(render);
})();
</script>
`;

// 3. Replace CSS in index.html
const cssPattern = /\/\* =+\s+AUTHENTIC LUSION\.CO INTERACTIVE MAGNETIC CURSOR[\s\S]*?<\/style>/;
if (cssPattern.test(html)) {
  html = html.replace(cssPattern, screenPaintCSS.trim() + '\n</style>');
  console.log('Replaced cursor CSS with ScreenPaint CSS');
} else {
  console.error('Could not find CSS pattern');
}

// 4. Replace JS in index.html
const jsPattern = /<script>\s*\/\*\*[\s\S]*?AUTHENTIC LUSION\.CO INTERACTIVE MAGNETIC CURSOR[\s\S]*?<\/script>\s*<\/body>/;
if (jsPattern.test(html)) {
  html = html.replace(jsPattern, screenPaintScript.trim() + '\n</body>');
  console.log('Replaced cursor JS with ScreenPaint Script');
} else {
  console.error('Could not find JS pattern');
}

// Bump cache buster to v=bust32
html = html.replace(/v=bust31/g, 'v=bust32');
console.log('Updated cache busters to v=bust32');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Updated index.html successfully!');

