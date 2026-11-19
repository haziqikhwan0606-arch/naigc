const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. New CSS for the Authentic Lusion.co Interactive Cursor & 3D Magnetic Pillars
const newCursorCSS = `
/* ==========================================================================
   AUTHENTIC LUSION.CO INTERACTIVE MAGNETIC CURSOR & 3D TILT
   ========================================================================== */

@media (pointer: fine) and (hover: hover) {
  body, 
  a, 
  button, 
  .naigc-holo-projection, 
  .mq4-btn {
    cursor: none !important;
  }

  #lusion-cursor-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 999999;
    overflow: hidden;
  }

  /* Precision Reticle Dot */
  #lusion-cursor-dot {
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 6px;
    background: #00E5FF;
    border-radius: 50%;
    box-shadow: 0 0 10px #00E5FF, 0 0 20px #00E5FF;
    pointer-events: none;
    transform: translate(-50%, -50%);
    will-change: transform, opacity, scale;
    transition: opacity 0.2s ease, transform 0.15s ease;
    z-index: 1000002;
  }

  #lusion-cursor-dot.is-hidden {
    opacity: 0;
  }

  #lusion-cursor-dot.is-hovering {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.2);
  }

  /* Lusion Magnetic Floating Lens / Badge */
  #lusion-cursor-lens {
    position: absolute;
    top: 0;
    left: 0;
    width: 38px;
    height: 38px;
    margin-top: -19px;
    margin-left: -19px;
    border-radius: 50%;
    pointer-events: none;
    will-change: transform, width, height, margin, background, border-color, box-shadow;
    z-index: 1000001;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 0.38s cubic-bezier(0.19, 1, 0.22, 1),
                height 0.38s cubic-bezier(0.19, 1, 0.22, 1),
                margin 0.38s cubic-bezier(0.19, 1, 0.22, 1),
                border-color 0.3s ease,
                background 0.3s ease,
                box-shadow 0.3s ease;
  }

  .lusion-lens-surface {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    border: 1.5px solid rgba(0, 229, 255, 0.75);
    background: radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, rgba(2, 11, 32, 0.2) 80%);
    box-shadow: 0 0 16px rgba(0, 229, 255, 0.25), inset 0 0 8px rgba(0, 229, 255, 0.15);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    transition: inherit;
  }

  /* Rotating Arrow & Badge Info (Lusion Signature) */
  .lusion-lens-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    color: #FFFFFF;
    pointer-events: none;
  }

  .lusion-lens-arrow {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    will-change: transform;
    color: #00E5FF;
  }

  .lusion-lens-arrow svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.8));
  }

  .lusion-lens-text {
    font-family: 'Space Grotesk', -apple-system, sans-serif;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #FFFFFF;
    text-shadow: 0 0 10px rgba(0, 229, 255, 0.8);
  }

  /* Active Hover State (Over 8 Pillars & Buttons) */
  #lusion-cursor-lens.is-hovering {
    width: 82px;
    height: 82px;
    margin-top: -41px;
    margin-left: -41px;
  }

  #lusion-cursor-lens.is-hovering .lusion-lens-surface {
    border-color: #00E5FF;
    background: radial-gradient(circle, rgba(0, 229, 255, 0.28) 0%, rgba(2, 14, 38, 0.85) 85%);
    box-shadow: 0 0 35px rgba(0, 229, 255, 0.65), 
                inset 0 0 20px rgba(0, 229, 255, 0.3),
                0 10px 25px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  #lusion-cursor-lens.is-hovering .lusion-lens-content {
    opacity: 1;
    transform: scale(1);
  }

  /* Violet Variant for Alternating Pillars */
  #lusion-cursor-lens.is-hovering-violet .lusion-lens-surface {
    border-color: #C084FC;
    background: radial-gradient(circle, rgba(192, 132, 252, 0.28) 0%, rgba(26, 4, 46, 0.85) 85%);
    box-shadow: 0 0 35px rgba(192, 132, 252, 0.65), 
                inset 0 0 20px rgba(192, 132, 252, 0.3),
                0 10px 25px rgba(0, 0, 0, 0.5);
  }

  #lusion-cursor-lens.is-hovering-violet .lusion-lens-arrow {
    color: #C084FC;
  }

  #lusion-cursor-lens.is-hovering-violet .lusion-lens-arrow svg {
    filter: drop-shadow(0 0 8px rgba(192, 132, 252, 0.8));
  }

  #lusion-cursor-lens.is-hovering-violet .lusion-lens-text {
    text-shadow: 0 0 10px rgba(192, 132, 252, 0.8);
  }

  /* Click Down Impulse */
  #lusion-cursor-lens.is-down {
    transform: scale(0.8) !important;
  }

  /* Hidden State */
  #lusion-cursor-container.is-hidden {
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  /* 3D Interactive Card Sheen & Tilt */
  .naigc-holo-projection {
    perspective: 1000px;
    transform-style: preserve-3d;
    transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
  }

  .naigc-holo-projection.is-card-tilted {
    transition: transform 0.08s ease-out;
  }
}
`;

// 2. New JS Script for the Authentic Lusion.co Cursor Physics & Interaction
const newCursorScript = `
<script>
/**
 * AUTHENTIC LUSION.CO INTERACTIVE MAGNETIC CURSOR & 3D TILT ENGINE
 * Features:
 * - Second-order spring dynamics (butter-smooth lag-free inertia)
 * - Velocity-oriented arrow rotation & elastic stretching
 * - Lusion magnetic badge with contextual action label ("EXPLORE" / "OPEN")
 * - 3D card tilt & holographic surface sheen tracking
 * - Click impulse response
 */
(function initAuthenticLusionCursor() {
  if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  // Inject Cursor Elements
  const container = document.createElement("div");
  container.id = "lusion-cursor-container";
  container.setAttribute("aria-hidden", "true");

  const lens = document.createElement("div");
  lens.id = "lusion-cursor-lens";

  const lensSurface = document.createElement("div");
  lensSurface.className = "lusion-lens-surface";

  const lensContent = document.createElement("div");
  lensContent.className = "lusion-lens-content";

  const lensArrow = document.createElement("div");
  lensArrow.className = "lusion-lens-arrow";
  lensArrow.innerHTML = \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>\`;

  const lensText = document.createElement("span");
  lensText.className = "lusion-lens-text";
  lensText.textContent = "EXPLORE";

  lensContent.appendChild(lensArrow);
  lensContent.appendChild(lensText);
  lensSurface.appendChild(lensContent);
  lens.appendChild(lensSurface);

  const dot = document.createElement("div");
  dot.id = "lusion-cursor-dot";

  container.appendChild(lens);
  container.appendChild(dot);
  document.body.appendChild(container);

  // Second-Order Dynamics Physics Class (Exact algorithm used in Lusion.co)
  class SecondOrderDynamics {
    constructor(f, z, r, x0 = 0) {
      // f: natural frequency, z: damping coefficient, r: initial response
      this.computeConstants(f, z, r);
      this.xp = x0;
      this.y = x0;
      this.yd = 0;
    }
    computeConstants(f, z, r) {
      this.k1 = z / (Math.PI * f);
      this.k2 = 1 / ((2 * Math.PI * f) * (2 * Math.PI * f));
      this.k3 = (r * z) / (2 * Math.PI * f);
    }
    update(t, x, xd = null) {
      if (xd === null) {
        xd = (x - this.xp) / t;
        this.xp = x;
      }
      let k2_stable = Math.max(this.k2, 1.1 * (t * t / 4 + t * this.k1 / 2));
      this.y = this.y + t * this.yd;
      this.yd = this.yd + t * (x + this.k3 * xd - this.y - this.k1 * this.yd) / k2_stable;
      return this.y;
    }
  }

  // Physics Instances (Frequency 5.5Hz, Damping 0.78, Response 1.15)
  const lensDynX = new SecondOrderDynamics(5.5, 0.78, 1.15, window.innerWidth / 2);
  const lensDynY = new SecondOrderDynamics(5.5, 0.78, 1.15, window.innerHeight / 2);
  const arrowDynRot = new SecondOrderDynamics(4.5, 0.75, 1.2, 0);

  // State Variables
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let prevMouseX = mouseX;
  let prevMouseY = mouseY;
  let currentLensX = mouseX;
  let currentLensY = mouseY;
  let targetMagneticOffsetX = 0;
  let targetMagneticOffsetY = 0;
  let magneticInfluence = 0; // 0 to 1

  let isHovering = false;
  let isHoveringViolet = false;
  let hoveredCard = null;
  let lastTime = performance.now();

  // Pointer Listeners
  window.addEventListener("pointermove", (e) => {
    container.classList.remove("is-hidden");
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  window.addEventListener("pointerdown", () => {
    lens.classList.add("is-down");
  }, { passive: true });

  window.addEventListener("pointerup", () => {
    lens.classList.remove("is-down");
  }, { passive: true });

  document.documentElement.addEventListener("mouseleave", () => {
    container.classList.add("is-hidden");
  });

  document.documentElement.addEventListener("mouseenter", () => {
    container.classList.remove("is-hidden");
  });

  // Magnetic & 3D Tilt Setup on 8 Pillar Cards and Buttons
  function bindInteractiveElements() {
    const cards = document.querySelectorAll(".naigc-holo-projection");
    cards.forEach((card) => {
      if (card.dataset.lusionBound) return;
      card.dataset.lusionBound = "true";

      card.addEventListener("pointerenter", () => {
        isHovering = true;
        hoveredCard = card;
        card.classList.add("is-card-tilted");
        isHoveringViolet = card.classList.contains("naigc-theme-violet");

        lens.classList.add("is-hovering");
        if (isHoveringViolet) {
          lens.classList.add("is-hovering-violet");
        } else {
          lens.classList.remove("is-hovering-violet");
        }
        dot.classList.add("is-hovering");
        lensText.textContent = "EXPLORE";
      });

      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        // Offset from center (-1 to +1)
        const normX = (e.clientX - cardCenterX) / (rect.width / 2);
        const normY = (e.clientY - cardCenterY) / (rect.height / 2);

        // 3D Tilt calculation (max 10 degrees)
        const tiltX = -normY * 8.5;
        const tiltY = normX * 8.5;
        card.style.transform = \`perspective(1000px) rotateX(\${tiltX.toFixed(2)}deg) rotateY(\${tiltY.toFixed(2)}deg) translateZ(12px)\`;

        // Magnetic Attraction Pull
        targetMagneticOffsetX = (cardCenterX - e.clientX) * 0.22;
        targetMagneticOffsetY = (cardCenterY - e.clientY) * 0.22;
        magneticInfluence = 0.55;
      });

      card.addEventListener("pointerleave", () => {
        isHovering = false;
        hoveredCard = null;
        card.classList.remove("is-card-tilted");
        card.style.transform = "";

        targetMagneticOffsetX = 0;
        targetMagneticOffsetY = 0;
        magneticInfluence = 0;

        lens.classList.remove("is-hovering", "is-hovering-violet");
        dot.classList.remove("is-hovering");
      });
    });

    // General Buttons (CTA, nav buttons)
    const buttons = document.querySelectorAll(".mq4-btn, button:not(.naigc-holo-projection), a.header-menu-link");
    buttons.forEach((btn) => {
      if (btn.dataset.lusionBound) return;
      btn.dataset.lusionBound = "true";

      btn.addEventListener("pointerenter", () => {
        isHovering = true;
        lens.classList.add("is-hovering");
        dot.classList.add("is-hovering");
        lensText.textContent = "SELECT";
      });

      btn.addEventListener("pointermove", (e) => {
        const rect = btn.getBoundingClientRect();
        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;
        targetMagneticOffsetX = (btnCenterX - e.clientX) * 0.32;
        targetMagneticOffsetY = (btnCenterY - e.clientY) * 0.32;
        magneticInfluence = 0.7;
      });

      btn.addEventListener("pointerleave", () => {
        isHovering = false;
        targetMagneticOffsetX = 0;
        targetMagneticOffsetY = 0;
        magneticInfluence = 0;
        lens.classList.remove("is-hovering");
        dot.classList.remove("is-hovering");
      });
    });
  }

  bindInteractiveElements();
  const observer = new MutationObserver(bindInteractiveElements);
  observer.observe(document.body, { childList: true, subtree: true });

  // Main 60-120FPS Lusion Render Loop
  let currentAngle = 0;
  let targetAngle = 0;
  let currentStretchX = 1;
  let currentStretchY = 1;

  function render(time) {
    let dt = Math.min((time - lastTime) / 1000, 0.033);
    if (dt <= 0) dt = 0.016;
    lastTime = time;

    // Calculate Mouse Velocity
    let vx = mouseX - prevMouseX;
    let vy = mouseY - prevMouseY;
    let speed = Math.hypot(vx, vy);
    prevMouseX = mouseX;
    prevMouseY = mouseY;

    // Desired destination with magnetic pull
    let targetX = mouseX + targetMagneticOffsetX * magneticInfluence;
    let targetY = mouseY + targetMagneticOffsetY * magneticInfluence;

    // Second-order physics update for lens position
    currentLensX = lensDynX.update(dt, targetX);
    currentLensY = lensDynY.update(dt, targetY);

    // Direction & Dynamic Arrow Rotation (Lusion Signature)
    if (speed > 1.2) {
      targetAngle = Math.atan2(vy, vx) * (180 / Math.PI);
    }
    // Smooth angle interpolation avoiding wrap-around glitches
    let angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
    currentAngle += angleDiff * Math.min(dt * 18, 1);
    let smoothedAngle = arrowDynRot.update(dt, currentAngle);

    // Dynamic Velocity Stretching (Elastic deformation)
    if (speed > 1.5 && !isHovering) {
      let stretchFactor = Math.min(speed * 0.035, 0.6);
      currentStretchX += (1 + stretchFactor - currentStretchX) * Math.min(dt * 20, 1);
      currentStretchY += (1 / (1 + stretchFactor * 0.7) - currentStretchY) * Math.min(dt * 20, 1);
    } else {
      currentStretchX += (1 - currentStretchX) * Math.min(dt * 15, 1);
      currentStretchY += (1 - currentStretchY) * Math.min(dt * 15, 1);
    }

    // Apply GPU-accelerated transforms
    lens.style.transform = \`translate3d(\${currentLensX.toFixed(2)}px, \${currentLensY.toFixed(2)}px, 0) rotate(\${currentAngle.toFixed(2)}deg) scale(\${currentStretchX.toFixed(3)}, \${currentStretchY.toFixed(3)})\`;
    
    // Lens Arrow Counter-rotates or rotates to movement heading
    lensArrow.style.transform = \`rotate(\${(smoothedAngle - currentAngle).toFixed(2)}deg)\`;

    // Precision Dot
    dot.style.transform = \`translate3d(\${mouseX.toFixed(1)}px, \${mouseY.toFixed(1)}px, 0)\`;

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();
</script>
`;

// Replace CSS in index.html
const cssPattern = /\/\* =+\s+LUSION-STYLE INTERACTIVE FLUID MAGNETIC CURSOR[\s\S]*?<\/style>/;
if (cssPattern.test(html)) {
  html = html.replace(cssPattern, newCursorCSS.trim() + '\n</style>');
  console.log('Successfully replaced cursor CSS');
} else {
  console.error('Could not find CSS pattern in index.html');
}

// Replace JS in index.html
const jsPattern = /<script>\s*\/\*\*[\s\S]*?LUSION-STYLE INTERACTIVE FLUID MAGNETIC CURSOR ENGINE[\s\S]*?<\/script>\s*<\/body>/;
if (jsPattern.test(html)) {
  html = html.replace(jsPattern, newCursorScript.trim() + '\n</body>');
  console.log('Successfully replaced cursor JS');
} else {
  console.error('Could not find JS pattern in index.html');
}

// Update cache buster to v=bust31
html = html.replace(/v=bust30/g, 'v=bust31');
console.log('Updated cache busters to v=bust31');

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Updated index.html successfully!');

