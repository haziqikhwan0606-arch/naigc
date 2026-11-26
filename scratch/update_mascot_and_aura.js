const fs = require('fs');

let engine = fs.readFileSync('build/assets/engine-BRf7lQZ-.js', 'utf8');

// 1. Remove black circular platform B
const origBAdd = "B.receiveShadow=v,B.renderOrder=1,b.add(B);";
const newBAdd = "B.receiveShadow=v,B.renderOrder=1,B.visible=!1;";
if (engine.includes(origBAdd)) {
  engine = engine.replace(origBAdd, newBAdd);
  console.log("Successfully disabled black platform B!");
} else {
  console.log("Warning: origBAdd not found!");
}

// 2. Increase mascot size in podium camera states
// In H.desktop.podium and H.compact.podium: dist: 1.95 -> dist: 1.60
engine = engine.replace(/podium:\{yaw:2,dist:1\.95,/g, "podium:{yaw:2,dist:1.60,");
console.log("Updated podium camera dist to 1.60!");

// 3. Update Ue colors (replace orange 16096779 with cyber violet 11032055 and cyan 58879)
engine = engine.replace("color:16096779,colorB:58879", "color:11032055,colorB:58879");
console.log("Updated Ue colors to cyber palette!");

// 4. Update fragment shader He
const sIdx = engine.indexOf("He=`\nprecision mediump float;");
const eIdx = engine.indexOf("`,Ue=", sIdx);

const newShaderBody = `He=\`
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
  
  // Color blending: Electric Cyan to Cyber Violet
  vec3 baseColor = mix(uColor, uColorB, smoothstep(0.2, 0.7, dist + tint * 0.15));
  vec3 neonCyan = vec3(0.0, 0.88, 1.0);
  vec3 neonViolet = vec3(0.68, 0.35, 0.98);
  
  // Composite color with bright accents on dials and ripples
  vec3 finalColor = baseColor + neonCyan * (dialLine1 * 1.3 + ripple * 0.7) + neonViolet * (dialLine2 * 1.2);
  
  // Alpha blending
  float alpha = (core * 0.75 + energyStream * 0.45 + ripple * 0.35 + dialLine1 * 0.65 + dialLine2 * 0.5) * uAmount * 1.25;
  alpha = clamp(alpha, 0.0, 0.88);
  if (alpha < 0.01) discard;
  
  gl_FragColor = vec4(finalColor, alpha);
}
\`,Ue=`;

if (sIdx !== -1 && eIdx !== -1) {
  engine = engine.substring(0, sIdx) + newShaderBody + engine.substring(eIdx + "`,Ue=".length);
  console.log("Successfully replaced shader He!");
} else {
  console.log("Error: Could not locate shader boundaries!");
}

fs.writeFileSync('build/assets/engine-BRf7lQZ-.js', engine);
console.log("Successfully written updated build/assets/engine-BRf7lQZ-.js!");

