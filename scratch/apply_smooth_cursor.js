const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// Replace the initLusionScreenPaint function with the new buttery-smooth spline engine
const oldScriptStart = '(function initLusionScreenPaint() {';
const oldScriptEnd = 'requestAnimationFrame(render);\n  })();';

const startIdx = indexHtml.indexOf(oldScriptStart);
const endIdx = indexHtml.indexOf(oldScriptEnd) + oldScriptEnd.length;

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find script block');
  process.exit(1);
}

const newScript = `(function initLusionScreenPaint() {
  if (typeof window === "undefined") return;

  // Create High-Performance GPU Canvas
  const canvas = document.createElement("canvas");
  canvas.id = "lusion-screenpaint-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = (canvas.width = window.innerWidth * dpr);
  let height = (canvas.height = window.innerHeight * dpr);

  function resize() {
    width = canvas.width = window.innerWidth * dpr;
    height = canvas.height = window.innerHeight * dpr;
  }
  window.addEventListener("resize", resize, { passive: true });

  // Physics Follower & Trail Buffer
  const points = [];
  const TRAIL_LIFETIME = 800; // ms
  const BASE_WIDTH = 13 * dpr;
  
  let targetX = -1000, targetY = -1000;
  let leaderX = -1000, leaderY = -1000;
  let prevLeaderX = -1000, prevLeaderY = -1000;
  let isMoving = false;
  let moveTimeout = null;

  window.addEventListener("pointermove", (e) => {
    targetX = e.clientX * dpr;
    targetY = e.clientY * dpr;

    if (leaderX < 0) {
      leaderX = targetX;
      leaderY = targetY;
      prevLeaderX = targetX;
      prevLeaderY = targetY;
    }

    isMoving = true;
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => { isMoving = false; }, 120);
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

  // 60-120FPS Render Loop: Organic Liquid Silk Spline Trail
  function render(now) {
    requestAnimationFrame(render);

    // Physics leader smoothing: smoothly chase mouse with fluid inertia
    if (targetX > 0) {
      const ease = isMoving ? 0.48 : 0.25;
      leaderX += (targetX - leaderX) * ease;
      leaderY += (targetY - leaderY) * ease;

      const dist = Math.hypot(leaderX - prevLeaderX, leaderY - prevLeaderY);
      if (dist > 1.8 * dpr) {
        points.push({
          x: leaderX,
          y: leaderY,
          birth: now,
          speed: dist
        });
        prevLeaderX = leaderX;
        prevLeaderY = leaderY;
      }
    }

    // Prune expired points
    while (points.length > 0 && (now - points[0].birth) > TRAIL_LIFETIME) {
      points.shift();
    }

    ctx.clearRect(0, 0, width, height);

    if (points.length < 3) return;

    const N = points.length;

    // Precompute smooth normal vectors using centered difference for C1 continuity
    const normals = new Array(N);
    for (let i = 0; i < N; i++) {
      const prev = points[Math.max(0, i - 1)];
      const next = points[Math.min(N - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      normals[i] = { nx: -dy / len, ny: dx / len };
    }

    // Multi-pass Organic Liquid Spline Passes
    // Pass 1: Electric Cyan Wide Aura Bloom
    // Pass 2: Champagne Gold Spectral Dispersion Sheen
    // Pass 3: Electric Cyan High-Intensity Core
    // Pass 4: Pure Liquid Specular White Spine
    const passes = [
      {
        shift: 0,
        blur: 16 * dpr,
        glowColor: "rgba(0, 217, 255, 0.75)",
        baseWidth: BASE_WIDTH * 1.4,
        alphaMult: 0.35,
        color: (a) => \`rgba(0, 217, 255, \${a})\`
      },
      {
        shift: 2.2 * dpr,
        blur: 10 * dpr,
        glowColor: "rgba(229, 184, 105, 0.65)",
        baseWidth: BASE_WIDTH * 0.95,
        alphaMult: 0.55,
        color: (a) => \`rgba(229, 184, 105, \${a})\`
      },
      {
        shift: -1.2 * dpr,
        blur: 6 * dpr,
        glowColor: "rgba(0, 217, 255, 0.8)",
        baseWidth: BASE_WIDTH * 0.7,
        alphaMult: 0.85,
        color: (a) => \`rgba(0, 217, 255, \${a})\`
      },
      {
        shift: 0,
        blur: 3 * dpr,
        glowColor: "rgba(255, 255, 255, 0.9)",
        baseWidth: BASE_WIDTH * 0.28,
        alphaMult: 0.95,
        color: (a) => \`rgba(255, 255, 255, \${a})\`
      }
    ];

    passes.forEach((p) => {
      ctx.save();
      ctx.shadowBlur = p.blur;
      ctx.shadowColor = p.glowColor;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Compute shifted coordinates with harmonic wave dissipation
      const shifted = new Array(N);
      for (let i = 0; i < N; i++) {
        const pt = points[i];
        const progress = Math.max(0, 1 - (now - pt.birth) / TRAIL_LIFETIME);
        const wave = Math.sin(now * 0.003 + i * 0.2) * (1 - progress) * 2.5 * dpr;
        const totalShift = p.shift + wave;
        shifted[i] = {
          x: pt.x + normals[i].nx * totalShift,
          y: pt.y + normals[i].ny * totalShift
        };
      }

      // Draw continuous midpoint quadratic Bézier spline
      for (let i = 1; i < N - 1; i++) {
        const p0 = shifted[i - 1];
        const p1 = shifted[i];
        const p2 = shifted[i + 1];

        const mPrev = { x: (p0.x + p1.x) * 0.5, y: (p0.y + p1.y) * 0.5 };
        const mNext = { x: (p1.x + p2.x) * 0.5, y: (p1.y + p2.y) * 0.5 };

        const progress = Math.max(0, 1 - (now - points[i].birth) / TRAIL_LIFETIME);
        if (progress <= 0.01) continue;

        // Smooth fluid taper: sinusoidal ease-out with speed swell
        const taper = Math.sin(progress * Math.PI * 0.5);
        const speedBoost = Math.min(1.8, 0.8 + points[i].speed * 0.02);
        const w = Math.max(0.75 * dpr, p.baseWidth * taper * speedBoost);
        const alpha = Math.pow(progress, 0.85) * p.alphaMult;

        ctx.beginPath();
        ctx.moveTo(mPrev.x, mPrev.y);
        ctx.quadraticCurveTo(p1.x, p1.y, mNext.x, mNext.y);
        ctx.lineWidth = w;
        ctx.strokeStyle = p.color(alpha.toFixed(3));
        ctx.stroke();
      }
      ctx.restore();
    });

    // Luminous Specular Tip Particle
    if (isMoving && leaderX > 0) {
      const head = points[points.length - 1];
      const speed = head ? head.speed : 0;
      const orbRadius = (5 + Math.min(speed * 0.15, 6)) * dpr;

      const grad = ctx.createRadialGradient(leaderX, leaderY, 0, leaderX, leaderY, orbRadius);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      grad.addColorStop(0.35, "rgba(0, 217, 255, 0.8)");
      grad.addColorStop(0.75, "rgba(229, 184, 105, 0.35)");
      grad.addColorStop(1, "rgba(0, 217, 255, 0)");

      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(leaderX, leaderY, orbRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  requestAnimationFrame(render);
})();`;

indexHtml = indexHtml.substring(0, startIdx) + newScript + indexHtml.substring(endIdx);
fs.writeFileSync('index.html', indexHtml);
console.log('Successfully updated index.html with smooth spline cursor engine!');

