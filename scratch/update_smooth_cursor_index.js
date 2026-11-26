// Let's create an elegant, liquid smooth cursor implementation
const fs = require('fs');

const smoothCursorScript = `
<script>
/**
 * NAIGC LIQUID SILK CURSOR ENGINE
 * Ultra-smooth, organic fluid ribbon trailing the cursor
 * - Catmull-Rom / Midpoint Quadratic Spline Curve (Zero geometric corners)
 * - Continuous C1 tangent continuity
 * - Multi-pass NAIGC Brand Spectral Glow (Electric Cyan, Champagne Gold, Specular White)
 * - Fluid inertia & smooth spring damping
 */
(function initNaigcLiquidCursor() {
  if (typeof window === "undefined") return;

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

  // Physics Follower & Trail State
  const points = [];
  const TRAIL_LIFETIME = 650; // ms
  const MAX_WIDTH = 12 * dpr;

  let mouseX = -1000, mouseY = -1000;
  let leaderX = -1000, leaderY = -1000;
  let prevLeaderX = -1000, prevLeaderY = -1000;
  let isMoving = false;
  let moveTimeout = null;

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX * dpr;
    mouseY = e.clientY * dpr;

    if (leaderX < 0) {
      leaderX = mouseX;
      leaderY = mouseY;
      prevLeaderX = mouseX;
      prevLeaderY = mouseY;
    }

    isMoving = true;
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => { isMoving = false; }, 100);
  }, { passive: true });

  // 3D Card Tilt Interaction
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

  // 60-120FPS Render Loop
  function render(now) {
    requestAnimationFrame(render);

    // Damped follower for natural, organic inertia
    if (mouseX > 0) {
      const ease = isMoving ? 0.42 : 0.2;
      leaderX += (mouseX - leaderX) * ease;
      leaderY += (mouseY - leaderY) * ease;

      const dist = Math.hypot(leaderX - prevLeaderX, leaderY - prevLeaderY);
      if (dist > 1.5 * dpr) {
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

    // Prune old points
    while (points.length > 0 && (now - points[0].birth) > TRAIL_LIFETIME) {
      points.shift();
    }

    ctx.clearRect(0, 0, width, height);

    if (points.length < 3) return;

    const N = points.length;

    // Precompute midpoints for quadratic bezier spline
    const midpoints = new Array(N - 1);
    for (let i = 0; i < N - 1; i++) {
      midpoints[i] = {
        x: (points[i].x + points[i + 1].x) * 0.5,
        y: (points[i].y + points[i + 1].y) * 0.5
      };
    }

    // Precompute smooth normal vectors (centered differences)
    const normals = new Array(N);
    for (let i = 0; i < N; i++) {
      const prev = points[Math.max(0, i - 1)];
      const next = points[Math.min(N - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      normals[i] = { nx: -dy / len, ny: dx / len };
    }

    // Passes:
    // Pass 1: Wide Electric Cyan Glow
    // Pass 2: Champagne Gold Spectral Accent
    // Pass 3: Electric Cyan Core Beam
    // Pass 4: Pure White Specular Spine
    const passes = [
      {
        shift: 0,
        blur: 16 * dpr,
        glow: "rgba(0, 217, 255, 0.7)",
        widthMult: 1.35,
        alphaMult: 0.35,
        color: (a) => \`rgba(0, 217, 255, \${a})\`
      },
      {
        shift: 2.0 * dpr,
        blur: 8 * dpr,
        glow: "rgba(229, 184, 105, 0.65)",
        widthMult: 0.9,
        alphaMult: 0.55,
        color: (a) => \`rgba(229, 184, 105, \${a})\`
      },
      {
        shift: -1.0 * dpr,
        blur: 5 * dpr,
        glow: "rgba(0, 217, 255, 0.8)",
        widthMult: 0.65,
        alphaMult: 0.85,
        color: (a) => \`rgba(0, 217, 255, \${a})\`
      },
      {
        shift: 0,
        blur: 2.5 * dpr,
        glow: "rgba(255, 255, 255, 0.95)",
        widthMult: 0.25,
        alphaMult: 0.95,
        color: (a) => \`rgba(255, 255, 255, \${a})\`
      }
    ];

    passes.forEach((p) => {
      ctx.save();
      ctx.shadowBlur = p.blur;
      ctx.shadowColor = p.glow;
      ctx.lineCap = "butt"; // Seamless segment connection without bulbous beading
      ctx.lineJoin = "round";

      // Compute shifted control points with soft harmonic ripple
      const shifted = new Array(N);
      for (let i = 0; i < N; i++) {
        const pt = points[i];
        const progress = Math.max(0, 1 - (now - pt.birth) / TRAIL_LIFETIME);
        const wave = Math.sin(now * 0.0035 + i * 0.18) * (1 - progress) * 2 * dpr;
        const totalShift = p.shift + wave;
        shifted[i] = {
          x: pt.x + normals[i].nx * totalShift,
          y: pt.y + normals[i].ny * totalShift
        };
      }

      // Draw seamlessly connected quadratic bezier spline segments
      for (let i = 1; i < N - 1; i++) {
        const p1 = shifted[i];
        const mPrev = {
          x: (shifted[i - 1].x + shifted[i].x) * 0.5,
          y: (shifted[i - 1].y + shifted[i].y) * 0.5
        };
        const mNext = {
          x: (shifted[i].x + shifted[i + 1].x) * 0.5,
          y: (shifted[i].y + shifted[i + 1].y) * 0.5
        };

        const progress = Math.max(0, 1 - (now - points[i].birth) / TRAIL_LIFETIME);
        if (progress <= 0.01) continue;

        // Smooth ease-out taper
        const taper = Math.sin(progress * Math.PI * 0.5);
        const speedBoost = Math.min(1.7, 0.8 + points[i].speed * 0.02);
        const w = Math.max(0.6 * dpr, MAX_WIDTH * p.widthMult * taper * speedBoost);
        const alpha = Math.pow(progress, 0.85) * p.alphaMult;

        ctx.beginPath();
        ctx.moveTo(mPrev.x, mPrev.y);
        ctx.quadraticCurveTo(p1.x, p1.y, mNext.x, mNext.y);
        ctx.lineWidth = w;
        ctx.strokeStyle = p.color(alpha.toFixed(3));
        ctx.stroke();
      }

      // Rounded end caps at head and tail
      if (N > 2) {
        const headPt = shifted[N - 1];
        const headProg = Math.max(0, 1 - (now - points[N - 1].birth) / TRAIL_LIFETIME);
        const headWidth = Math.max(0.6 * dpr, MAX_WIDTH * p.widthMult * Math.sin(headProg * Math.PI * 0.5));
        ctx.fillStyle = p.color((headProg * p.alphaMult).toFixed(3));
        ctx.beginPath();
        ctx.arc(headPt.x, headPt.y, headWidth * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    // Radiant Cursor Tip Particle (Soft Luminous Orb)
    if (isMoving && leaderX > 0) {
      const head = points[N - 1];
      const speed = head ? head.speed : 0;
      const orbRadius = (5 + Math.min(speed * 0.12, 5.5)) * dpr;

      const orbGrad = ctx.createRadialGradient(leaderX, leaderY, 0, leaderX, leaderY, orbRadius);
      orbGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      orbGrad.addColorStop(0.35, "rgba(0, 217, 255, 0.85)");
      orbGrad.addColorStop(0.7, "rgba(229, 184, 105, 0.4)");
      orbGrad.addColorStop(1, "rgba(0, 217, 255, 0)");

      ctx.save();
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(leaderX, leaderY, orbRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  requestAnimationFrame(render);
})();
</script>
`;

let indexHtml = fs.readFileSync('index.html', 'utf8');
const scriptPattern = /<script>\s*\/\*\*[\s\S]*?LUSION\.CO SCREENPAINT ENGINE[\s\S]*?<\/script>/;
if (scriptPattern.test(indexHtml)) {
  indexHtml = indexHtml.replace(scriptPattern, smoothCursorScript.trim());
  fs.writeFileSync('index.html', indexHtml);
  console.log('Successfully replaced cursor script in index.html');
} else {
  console.error('Pattern not found');
}

