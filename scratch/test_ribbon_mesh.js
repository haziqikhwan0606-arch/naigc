const fs = require('fs');

// Function that builds Catmull-Rom resampled points & smooth ribbon
function generateLiquidRibbonCode() {
  return `(function initLusionScreenPaint() {
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

  const rawPoints = [];
  const TRAIL_LIFETIME = 650; // ms
  const MAX_WIDTH = 14 * dpr;

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
        card.style.transform = "perspective(1000px) rotateX(" + tiltX.toFixed(2) + "deg) rotateY(" + tiltY.toFixed(2) + "deg) translateZ(12px)";
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

  // Catmull-Rom Spline Interpolation for Buttery Smooth Uniform Curve
  function catmullRom(p0, p1, p2, p3, t) {
    const v0 = (p2 - p0) * 0.5;
    const v1 = (p3 - p1) * 0.5;
    const t2 = t * t;
    const t3 = t * t2;
    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
  }

  function render(now) {
    requestAnimationFrame(render);

    // Smooth physics follower (spring damping)
    if (targetX > 0) {
      const ease = isMoving ? 0.45 : 0.22;
      leaderX += (targetX - leaderX) * ease;
      leaderY += (targetY - leaderY) * ease;

      const d = Math.hypot(leaderX - prevLeaderX, leaderY - prevLeaderY);
      if (d > 2 * dpr) {
        rawPoints.push({
          x: leaderX,
          y: leaderY,
          birth: now,
          speed: d
        });
        prevLeaderX = leaderX;
        prevLeaderY = leaderY;
      }
    }

    // Prune expired points
    while (rawPoints.length > 0 && (now - rawPoints[0].birth) > TRAIL_LIFETIME) {
      rawPoints.shift();
    }

    ctx.clearRect(0, 0, width, height);

    if (rawPoints.length < 3) return;

    // Resample along Catmull-Rom curve to guarantee dense, perfectly smooth points
    const smoothPoints = [];
    const pts = rawPoints;
    const stepCount = 4; // Subdivide each interval into 4 smooth points

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(pts.length - 1, i + 2)];

      const prog1 = Math.max(0, 1 - (now - p1.birth) / TRAIL_LIFETIME);
      const prog2 = Math.max(0, 1 - (now - p2.birth) / TRAIL_LIFETIME);

      for (let s = 0; s < stepCount; s++) {
        const t = s / stepCount;
        const x = catmullRom(p0.x, p1.x, p2.x, p3.x, t);
        const y = catmullRom(p0.y, p1.y, p2.y, p3.y, t);
        const progress = prog1 + (prog2 - prog1) * t;
        const speed = p1.speed + (p2.speed - p1.speed) * t;
        smoothPoints.push({ x, y, progress, speed, index: smoothPoints.length });
      }
    }
    // Add final point
    const last = pts[pts.length - 1];
    smoothPoints.push({
      x: last.x,
      y: last.y,
      progress: Math.max(0, 1 - (now - last.birth) / TRAIL_LIFETIME),
      speed: last.speed,
      index: smoothPoints.length
    });

    const M = smoothPoints.length;
    if (M < 4) return;

    // Compute continuous normals along resampled smooth points
    const normals = new Array(M);
    for (let i = 0; i < M; i++) {
      const prev = smoothPoints[Math.max(0, i - 1)];
      const next = smoothPoints[Math.min(M - 1, i + 1)];
      const dx = next.x - prev.x;
      const dy = next.y - prev.y;
      const len = Math.hypot(dx, dy) || 1;
      normals[i] = { nx: -dy / len, ny: dx / len };
    }

    // Generate Left and Right boundaries for the liquid ribbon polygon
    const leftRail = new Array(M);
    const rightRail = new Array(M);

    for (let i = 0; i < M; i++) {
      const p = smoothPoints[i];
      // Organic taper: smooth sinusoidal ease-in from tail to head
      const taper = Math.sin(p.progress * Math.PI * 0.5);
      const speedScale = Math.min(1.6, 0.75 + p.speed * 0.02);
      const w = MAX_WIDTH * taper * speedScale;

      // Soft harmonic fluid oscillation
      const wave = Math.sin(now * 0.004 + i * 0.1) * (1 - p.progress) * 2 * dpr;

      leftRail[i] = {
        x: p.x + normals[i].nx * (w * 0.5 + wave),
        y: p.y + normals[i].ny * (w * 0.5 + wave)
      };
      rightRail[i] = {
        x: p.x - normals[i].nx * (w * 0.5 - wave),
        y: p.y - normals[i].ny * (w * 0.5 - wave)
      };
    }

    // PASS 1: Broad Cyan Atmosphere Glow (Ambient Soft Halo)
    ctx.save();
    ctx.shadowBlur = 18 * dpr;
    ctx.shadowColor = "rgba(0, 217, 255, 0.65)";
    ctx.beginPath();
    ctx.moveTo(leftRail[0].x, leftRail[0].y);
    for (let i = 1; i < M; i++) {
      ctx.lineTo(leftRail[i].x, leftRail[i].y);
    }
    for (let i = M - 1; i >= 0; i--) {
      ctx.lineTo(rightRail[i].x, rightRail[i].y);
    }
    ctx.closePath();

    // Create Head-to-Tail Liquid Gradient
    const headPt = smoothPoints[M - 1];
    const tailPt = smoothPoints[0];
    const grad = ctx.createLinearGradient(tailPt.x, tailPt.y, headPt.x, headPt.y);
    grad.addColorStop(0, "rgba(0, 217, 255, 0)");
    grad.addColorStop(0.3, "rgba(0, 217, 255, 0.15)");
    grad.addColorStop(0.65, "rgba(229, 184, 105, 0.35)");
    grad.addColorStop(0.9, "rgba(0, 217, 255, 0.7)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0.85)");

    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    // PASS 2: Champagne Gold Inner Silk Sheen
    ctx.save();
    ctx.shadowBlur = 8 * dpr;
    ctx.shadowColor = "rgba(229, 184, 105, 0.7)";
    ctx.beginPath();
    ctx.moveTo(leftRail[0].x, leftRail[0].y);
    for (let i = 1; i < M; i++) {
      // Inward offset for layered depth
      const p = smoothPoints[i];
      const w = MAX_WIDTH * 0.35 * Math.sin(p.progress * Math.PI * 0.5);
      ctx.lineTo(p.x + normals[i].nx * w, p.y + normals[i].ny * w);
    }
    for (let i = M - 1; i >= 0; i--) {
      const p = smoothPoints[i];
      const w = MAX_WIDTH * 0.35 * Math.sin(p.progress * Math.PI * 0.5);
      ctx.lineTo(p.x - normals[i].nx * w, p.y - normals[i].ny * w);
    }
    ctx.closePath();

    const goldGrad = ctx.createLinearGradient(tailPt.x, tailPt.y, headPt.x, headPt.y);
    goldGrad.addColorStop(0, "rgba(229, 184, 105, 0)");
    goldGrad.addColorStop(0.4, "rgba(229, 184, 105, 0.2)");
    goldGrad.addColorStop(0.85, "rgba(229, 184, 105, 0.6)");
    goldGrad.addColorStop(1, "rgba(255, 255, 255, 0.75)");

    ctx.fillStyle = goldGrad;
    ctx.fill();
    ctx.restore();

    // PASS 3: Continuous Specular Core Spine (Liquid Light Ray)
    ctx.save();
    ctx.shadowBlur = 4 * dpr;
    ctx.shadowColor = "rgba(0, 217, 255, 0.9)";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Single uninterrupted continuous spline path
    ctx.beginPath();
    ctx.moveTo(smoothPoints[0].x, smoothPoints[0].y);
    for (let i = 1; i < M - 1; i++) {
      const p0 = smoothPoints[i];
      const p1 = smoothPoints[i + 1];
      const mx = (p0.x + p1.x) * 0.5;
      const my = (p0.y + p1.y) * 0.5;
      ctx.quadraticCurveTo(p0.x, p0.y, mx, my);
    }
    ctx.lineTo(smoothPoints[M - 1].x, smoothPoints[M - 1].y);

    const spineGrad = ctx.createLinearGradient(tailPt.x, tailPt.y, headPt.x, headPt.y);
    spineGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
    spineGrad.addColorStop(0.5, "rgba(0, 217, 255, 0.6)");
    spineGrad.addColorStop(0.85, "rgba(220, 250, 255, 0.95)");
    spineGrad.addColorStop(1, "rgba(255, 255, 255, 1)");

    ctx.lineWidth = 2.2 * dpr;
    ctx.strokeStyle = spineGrad;
    ctx.stroke();
    ctx.restore();

    // PASS 4: Luminous Specular Tip Particle
    if (isMoving && leaderX > 0) {
      const head = smoothPoints[M - 1];
      const orbRadius = (5.5 + Math.min(head.speed * 0.15, 6)) * dpr;

      const orbGrad = ctx.createRadialGradient(leaderX, leaderY, 0, leaderX, leaderY, orbRadius);
      orbGrad.addColorStop(0, "rgba(255, 255, 255, 1)");
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
})();`;
}

let indexHtml = fs.readFileSync('index.html', 'utf8');
const oldScriptStart = '(function initLusionScreenPaint() {';
const oldScriptEnd = 'requestAnimationFrame(render);\n  })();';

const startIdx = indexHtml.indexOf(oldScriptStart);
const endIdx = indexHtml.indexOf(oldScriptEnd) + oldScriptEnd.length;

if (startIdx === -1 || endIdx === -1) {
  console.error('Could not find script block');
  process.exit(1);
}

indexHtml = indexHtml.substring(0, startIdx) + generateLiquidRibbonCode() + indexHtml.substring(endIdx);
fs.writeFileSync('index.html', indexHtml);
console.log('Successfully written liquid ribbon engine to index.html');

