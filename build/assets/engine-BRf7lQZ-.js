import{a as e,c as t,d as n,f as r,h as i,i as a,l as o,m as s,n as c,o as l,p as u,r as d,s as f,t as p,u as m}from"./landing-v4-CgTD28v7.js";import{t as h}from"./unicorn-background-preset-Co18sKzI.js";import{A as g,B as _,C as v,D as y,E as ee,F as b,G as x,H as S,I as C,K as te,L as ne,M as re,N as ie,O as ae,P as w,R as oe,S as se,T,U as ce,V as le,W as E,_ as D,a as ue,b as de,c as fe,d as pe,f as me,g as O,h as k,i as he,j as ge,k as _e,l as A,m as j,n as ve,o as M,p as N,q as ye,r as be,s as xe,t as Se,u as Ce,v as we,w as P,x as Te,y as F,z as I}from"./cabinet-D1bqaiP_.js";import{a as L,c as Ee,d as De,i as R,l as Oe,n as ke,o as z,s as Ae,t as je}from"./screenScenes-DVUnYCAj.js?v=bust70";var Me=new x(0,1,0),B=Math.PI*2,Ne=1.04,Pe={yaw:0,dist:.5,lift:-.16,look:-.12,shift:0},V={yaw:0,dist:.92,lift:.02,look:0,shift:0},H={desktop:{podium:{yaw:2,dist:1.36,lift:.01,look:0,shift:0},play:{yaw:-10,dist:.22,centerVisor:!0,shift:-.23,slide:-.06},menu:{yaw:0,dist:.22,centerVisor:!0,shift:0},activity:{yaw:10,dist:.22,centerVisor:!0,shift:.23,slide:.06},side:{yaw:78,dist:1.42,lift:.06,look:-.04,roll:6,aside:-.85},scaled:!0},stacked:{podium:{yaw:2,fitHeight:p,lift:.01,look:0,shift:0},play:{yaw:-8,dist:.26,centerVisor:!0,shift:0,slide:0},menu:{fitScreen:.94,fitScreenWide:.8},activity:{yaw:8,dist:.26,centerVisor:!0,shift:0,slide:0},side:{yaw:58,dist:1.1,lift:.05,look:-.02,roll:4,aside:0},scaled:!1},compact:{podium:{yaw:2,dist:1.36,lift:.01,look:0,shift:0},play:{yaw:-8,dist:.28,centerVisor:!0,shift:0,slide:-.01},menu:{fitScreen:.84},activity:{yaw:8,dist:.28,centerVisor:!0,shift:0,slide:.01},side:{yaw:68,dist:1.2,lift:.05,look:-.03,roll:5,aside:0},scaled:!1}};function U(){return{position:new x,target:new x,up:new x(0,1,0),cabinetYaw:0,mood:.1}}function W(e,t){return e.position.copy(t.position),e.target.copy(t.target),e.up.copy(t.up),e.cabinetYaw=t.cabinetYaw,e}function G(e){return e<.72?{yaw:.32,dist:1.22,shift:.2}:e<.95?{yaw:.55,dist:1.12,shift:.42}:e>2.15?{yaw:.94,dist:1.12,shift:1}:{yaw:1,dist:1,shift:1}}function K(e,t,n,r){return Math.min(r/2/e,n/2/t)}function Fe(e,t,n,r){return Math.max(r/2/e,n/2/t)}var Ie=new x,q=new x,Le=new x,J=new x,Re=new x;function ze(){let t=U(),n=U(),i=U(),c=U(),l=U(),u=U(),d=U(),f=U(),p=U(),m=U(),h=U(),g=null,_=`desktop`;function v(e,t,n){let{fov:r,aspect:i,screen:a,cabinet:o}=g;if(e.fitScreen)return y(e.fitScreenWide&&i*n.sx>=.6?e.fitScreenWide:e.fitScreen,t,n);let s=H[_].scaled||e===Pe||e===V?G(i):{yaw:1,dist:1,shift:1},c=Math.tan(T.degToRad(r)/2),l=c*n.sy,u=c*i*n.sx,d=i*n.sx/n.sy<.85,f=e.fitHeight?o.size.y/(2*l*e.fitHeight)+o.size.z*.5:Fe(l,u,o.size.x*(d?1.35:1.62),o.size.y*(d?1.18:1.28))*(e.dist||1)*s.dist;Ie.copy(a.normal).multiplyScalar(f),Ie.applyAxisAngle(Me,-T.degToRad((e.yaw||0)*s.yaw)),Ie.y+=e.centerVisor?a.center.y-o.center.y:o.size.y*(e.lift||0),t.position.copy(o.center).add(Ie),e.slide&&a.right&&t.position.addScaledVector(a.right,o.size.x*e.slide*s.shift),t.target.copy(o.center);let p=(e.shift||0)*s.shift;return p&&a.right&&t.target.addScaledVector(a.right,o.size.x*p),t.target.y+=e.centerVisor?a.center.y-o.center.y:o.size.y*(e.look??.02),t.up.copy(Me),t.cabinetYaw=B,e.roll!=null&&(J.copy(t.target).sub(t.position),J.lengthSq()>1e-6&&(J.normalize(),t.up.applyAxisAngle(J,-T.degToRad(e.roll)),e.aside&&(Re.crossVectors(J,t.up).normalize(),t.target.addScaledVector(Re,o.size.x*e.aside)))),t}function y(e,t,n){let{fov:r,aspect:i,screen:a}=g,o=Math.tan(T.degToRad(r)/2),s=Fe(o*n.sy,o*i*n.sx,a.width/e,a.height/e);return t.position.copy(a.center).addScaledVector(a.normal,s),t.target.copy(a.center),t.up.copy(Me),t.cabinetYaw=B,t}function ee(e){let{fov:t,aspect:n,screen:r}=g,i=Math.tan(T.degToRad(t)/2),a=_===`stacked`?Fe(i,i*n,r.width*.62,r.height*1.1):K(i,i*n,r.width,r.height)*Ne;return e.position.copy(r.center).addScaledVector(r.normal,a),e.target.copy(r.center),e.up.copy(r.up),e.cabinetYaw=0,e}function b(e,t,n,r){return e.position.lerpVectors(t.position,n.position,r),e.target.lerpVectors(t.target,n.target,r),e.up.lerpVectors(t.up,n.up,r),e.up.lengthSq()<1e-8&&e.up.set(0,1,0),e.up.normalize(),e.cabinetYaw=t.cabinetYaw+(n.cabinetYaw-t.cabinetYaw)*r,e}function x(e,t,n,r){let i=g.cabinet.center,a=q.copy(t.position).sub(i).length(),o=Le.copy(n.position).sub(i).length();return b(e,t,n,r),a<1e-4||o<1e-4||(q.multiplyScalar(1/a).lerp(Le.multiplyScalar(1/o),r),q.lengthSq()<1e-8)||e.position.copy(i).addScaledVector(q.normalize(),a+(o-a)*r),e}return{get layout(){return _},configure(e,r,a){g=e,_=H[r]?r:`desktop`;let o={sx:1,sy:1},s=H[_];ee(t),v(Pe,n,o),i.cabinetYaw=B,v(V,i,o),v(s.podium,c,{sx:1,sy:a.syPodium??1}),v(s.play,l,{sx:a.sxPlay??a.sx,sy:a.syPlay??a.sy}),v(s.menu,u,o),v(s.activity,d,a),v(s.side,f,{sx:a.sx,sy:a.syBrand??a.sy})},sample(_,v=0,y=1,ee=`foto`){if(!g)return p;let S=r(_,0,1),C=e.buttonsEnd,te=C*.8,ne=C*.55,re=C+(e.spinEnd-C)*.45,ie=C*.75;x(m,t,n,s(S,0,te)),x(p,m,i,s(S,ne,re)),x(m,p,c,s(S,e.spinEnd,e.revealEnd));let ae=s(S,e.playAt,e.playHold);x(p,m,l,ae),x(m,p,u,s(S,e.menuAt,a.menuFront)),W(p,m);let w=s(S,e.categoriesAt,e.browseAt);x(m,p,d,w),v&&(m.position.y-=g.cabinet.size.y*.045*v*y*w),W(p,m),W(m,p),b(p,m,f,s(S,e.brandAt,a.sideIn));let oe=s(S,e.brandHold,1);if(oe>0&&(J.copy(f.target).sub(f.position),J.lengthSq()>1e-6)){J.normalize();let e=g.cabinet.size.x*3.5,t=q.copy(f.target).addScaledVector(f.up,-e),n=T.degToRad(-70*oe),r=Le.copy(f.target).sub(t).applyAxisAngle(J,n).add(t).sub(f.target);r.addScaledVector(f.up,-r.dot(f.up)),r.addScaledVector(f.up,-g.cabinet.size.y*.72*oe),W(h,f),p.position.copy(h.position).add(r),p.target.copy(h.target).add(r),p.up.copy(h.up).applyAxisAngle(J,n)}return p.cabinetYaw=B*s(S,ie,e.spinEnd),p.mood=o(S,ee),p},frameMix(t){return _===`desktop`?0:s(t,e.playAt,e.playHold)*(1-s(t,e.menuAt,a.menuFront)*(1-s(t,e.categoriesAt,e.browseAt)))},frameSide(t){return _===`compact`?-1+2*s(t,e.categoriesAt,e.browseAt):1},panelMix(t){return s(t,e.categoriesAt,e.browseAt)}}}var Y=256,Be=4,Ve=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,He=`
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
`,Ue=[{color:58879,colorB:7259391,side:-.85,depth:1.35,rise:.12,w:1.35,h:1.45,amount:.9,phase:.35},{color:15054953,colorB:58879,side:.05,depth:1.85,rise:.22,w:1.7,h:1.6,amount:.75,phase:.15},{color:7259391,colorB:58879,side:.9,depth:1.45,rise:.08,w:1.4,h:1.4,amount:.95,phase:.7},{color:58879,colorB:7259391,side:-1.45,depth:-1.12,rise:-.06,w:.55,h:.78,amount:.5,phase:1.15},{color:7259391,colorB:58879,side:1.48,depth:-1.08,rise:-.1,w:.52,h:.74,amount:.48,phase:1.55}];function We(e,t,n){let r=e*374761393+t*668265263+n*2147483647|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967295}function Ge(e,t,n,r){let i=Math.floor(e),a=Math.floor(t),o=e-i,s=t-a,c=o*o*(3-2*o),l=s*s*(3-2*s),u=e=>(e%n+n)%n,d=u(i),f=u(a),p=u(i+1),m=u(a+1),h=We(d,f,r),g=We(p,f,r),_=We(d,m,r),v=We(p,m,r);return h+(g-h)*c+(_+(v-_)*c-(h+(g-h)*c))*l}function Ke(e,t,n){let r=0,i=.55,a=Be,o=e,s=t;for(let e=0;e<3;e+=1)r+=i*Ge(o,s,a,n),o=o*2+1,s=s*2+9,a*=2,i*=.5;return r}function qe(){let e=new Uint8Array(Y*Y*4),t=Be/Y;for(let n=0;n<Y;n+=1)for(let r=0;r<Y;r+=1){let i=(n*Y+r)*4;e[i]=Math.round(Math.min(1,Ke(r*t,n*t,1))*255),e[i+1]=Math.round(Math.min(1,Ke(r*t,n*t,7))*255),e[i+2]=0,e[i+3]=255}let n=new we(e,Y,Y,w);return n.wrapS=C,n.wrapT=C,n.magFilter=v,n.minFilter=P,n.generateMipmaps=!0,n.needsUpdate=!0,n}var X=new x,Je=new x,Ye=new x(0,1,0),Xe=new x(0,0,1);function Ze(e,t,n,r=Ue.length){let i=qe(),a=new re(1,1),o=Ue.slice(0,r).map(t=>{let n=new I({transparent:!0,depthWrite:!1,depthTest:!0,blending:1,side:2,toneMapped:!1,uniforms:{uNoise:{value:i},uTime:{value:0},uAmount:{value:0},uColor:{value:new D(t.color)},uColorB:{value:new D(t.colorB)}},vertexShader:Ve,fragmentShader:He}),r=new y(a,n);return r.frustumCulled=!1,r.renderOrder=2,r.visible=!1,e.add(r),{mesh:r,bank:t}}),s=!0;return{meshes:o.map(e=>e.mesh),setWisps(e){s=e},update(e,r){let i=Math.max(0,r||0),a=e*.001;X.copy(t.position).sub(n.center),X.y=0,X.lengthSq()<1e-6?X.set(0,0,1):X.normalize(),Je.crossVectors(Ye,X).normalize();let c=Math.abs(Je.x)*n.size.x+Math.abs(Je.z)*n.size.z,l=Math.abs(X.x)*n.size.x+Math.abs(X.z)*n.size.z,u=Math.max(n.size.y,.001);for(let{mesh:e,bank:t}of o){let r=i*t.amount;if(e.visible=r>.004&&(s||t.depth>0),!e.visible)continue;let o=Math.sin(a*t.phase)*u*.03;e.position.copy(n.center).addScaledVector(Je,t.side*c*.5).addScaledVector(X,-t.depth*l*.5).addScaledVector(Ye,t.rise*u+o),e.scale.set(t.w*u*1.28,t.h*u*1.28,1),e.quaternion.setFromUnitVectors(Xe,X),e.material.uniforms.uTime.value=a+t.phase*4,e.material.uniforms.uAmount.value=r}},dispose(){for(let{mesh:t}of o)e.remove(t),t.material.dispose();a.dispose(),i.dispose()}}}var Qe={white:{mesh:`Large_white_button`,color:16766182,core:.32,spill:3.2,reach:.36,halo:2.2},A:{mesh:`Button_A_inner_diffuser`,shell:`Button_A_acrylic_shell`,color:1368170,core:1.55,shellGain:.3,spill:.85,reach:.28},B:{mesh:`Button_B_inner_diffuser`,shell:`Button_B_acrylic_shell`,color:16720440,core:1.55,shellGain:.3,spill:.85,reach:.28},C:{mesh:`Button_C_inner_diffuser`,shell:`Button_C_acrylic_shell`,color:2071551,core:1.55,shellGain:.3,spill:.85,reach:.28},D:{mesh:`Button_D_inner_diffuser`,shell:`Button_D_acrylic_shell`,color:16762911,core:1.55,shellGain:.3,spill:.85,reach:.28}};function $e(){let e=document.createElement(`canvas`);e.width=128,e.height=128;let t=e.getContext(`2d`),n=t.createRadialGradient(64,64,2,64,64,64);n.addColorStop(0,`rgba(255, 242, 248, 0.95)`),n.addColorStop(.18,`rgba(255, 210, 228, 0.55)`),n.addColorStop(.42,`rgba(255, 160, 196, 0.18)`),n.addColorStop(1,`rgba(255, 130, 180, 0)`),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new O(e);r.generateMipmaps=!1,r.minFilter=v,r.magFilter=v;let i=new le(new S({map:r,color:16768236,transparent:!0,opacity:0,blending:2,depthWrite:!1,toneMapped:!1}));return i.renderOrder=2,i}function et(e,t){let n=null;return e.traverse(e=>{!n&&e.isMesh&&e.name===t&&(n=e)}),n}function tt(e,t){return new _e({name:e?.name||`button-core`,color:0,emissive:new D(t),emissiveMap:e?.map||null,emissiveIntensity:0,roughness:1,metalness:0,toneMapped:!1})}function nt(e,{lights:t}){let n=[],r=[],i=[],a=new x,o=new x;for(let s of c){let c=Qe[s],l=et(e,c.mesh);if(!l)continue;let u=null;if(c.shell){let e=l.material;u=tt(e,c.color),l.material=u,e&&r.push(e)}else l.material&&`emissive`in l.material&&(l.material.emissive=new D(c.color),l.material.emissiveIntensity=0);let d=null;if(c.shell){let t=et(e,c.shell)?.material;t&&`emissive`in t&&(t.emissive=new D(c.color),t.emissiveIntensity=0,t.transparent&&t.color.set(c.color).multiplyScalar(.3),d=t)}l.geometry?.computeBoundingBox();let f=l.geometry?.boundingBox,p=null;f&&(f.getSize(o),f.getCenter(a)),t&&(p=new ie(c.color,0,c.reach,2),f&&(p.position.copy(a),p.position.z+=o.z*.5),l.add(p),n.push(p));let m=null;c.halo&&f&&(m=$e(),m.position.copy(a),m.position.z+=o.z*.5,m.scale.setScalar(Math.max(o.x,o.y)*c.halo),l.add(m),n.push(m)),i.push({id:s,spec:c,core:u,shell:d,cap:c.shell?null:l.material,light:p,halo:m})}let s=``;function u(e){let t=c.map(t=>(e[t]??0).toFixed(3)).join();if(t!==s){s=t;for(let t of i){let n=e[t.id]??0;t.core&&(t.core.emissiveIntensity=n*t.spec.core),t.shell&&(t.shell.emissiveIntensity=n*t.spec.shellGain),t.cap&&`emissiveIntensity`in t.cap&&(t.cap.emissiveIntensity=n*t.spec.core),t.light&&(t.light.intensity=n*t.spec.spill),t.halo&&(t.halo.material.opacity=n*.45)}}}return u(l(0)),{halos:i.map(e=>e.halo).filter(Boolean),update(e,t=!1){u(l(e,t))},dispose(){for(let e of n)e.parent?.remove(e),e.isLight?e.dispose():(e.material.map?.dispose(),e.material.dispose());for(let e of r)e.dispose();n.length=0,r.length=0,i.length=0}}}var rt=`precision highp float;

in vec3 position;
out vec2 vTextureCoord;

void main() {
    vTextureCoord = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,it=`precision highp float;

in vec2 vTextureCoord;

layout(location = 0) out vec4 bloomOut;
layout(location = 1) out vec4 filamentOut;

uniform vec2 uResolution;
// Line widths are defined against this height so the look holds at any buffer size.
uniform float uRefMin;
uniform float uTime;
uniform vec2 uPos;
uniform vec3 uFrameCount;
uniform float uRectScale;
uniform float uPulseWidth;
uniform vec3 uNeonColor;
uniform vec3 uNeonColorMid;
uniform vec3 uNeonColorEnd;
uniform float uFlickerAmount;

const mat3 GOLD = mat3(
    -0.571464913, 0.814921382, 0.096597072,
    -0.278044873, -0.303026659, 0.911518454,
    0.772087367, 0.494042493, 0.399753815
);
const mat3 GOLD_PHI = mat3(
    -0.924648, -0.449886, 1.249265,
    1.318571, -0.490308, 0.800377,
    0.156297, 1.474868, 0.646816
);

float dotNoise(vec3 p) {
    return dot(cos(GOLD * p), sin(GOLD_PHI * p));
}

float sdRoundedRect(vec2 p, vec2 b, float radius) {
    float r = min(radius, min(b.x, b.y));
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

mat2 rot2d(float angle) {
    float sine = sin(angle);
    float cosine = cos(angle);
    return mat2(cosine, -sine, sine, cosine);
}

float invertedSmoothstep(float edge, float value) {
    return 1.0 - smoothstep(0.0, edge, value);
}

vec3 rgbToHsv(vec3 color) {
    float value = max(max(color.r, color.g), color.b);
    float minChannel = min(min(color.r, color.g), color.b);
    float delta = value - minChannel;
    float hue = 0.0;
    if (delta > 1e-5) {
        if (value == color.r) {
            hue = mod((color.g - color.b) / delta, 6.0);
        } else if (value == color.g) {
            hue = (color.b - color.r) / delta + 2.0;
        } else {
            hue = (color.r - color.g) / delta + 4.0;
        }
        hue /= 6.0;
    }
    float saturation = value > 1e-5 ? delta / value : 0.0;
    return vec3(hue, saturation, value);
}

vec3 hsvToRgb(vec3 hsv) {
    float hue = hsv.x * 6.0;
    float chroma = hsv.z * hsv.y;
    float x = chroma * (1.0 - abs(mod(hue, 2.0) - 1.0));
    float match = hsv.z - chroma;
    vec3 rgb;
    if (hue < 1.0) rgb = vec3(chroma, x, 0.0);
    else if (hue < 2.0) rgb = vec3(x, chroma, 0.0);
    else if (hue < 3.0) rgb = vec3(0.0, chroma, x);
    else if (hue < 4.0) rgb = vec3(0.0, x, chroma);
    else if (hue < 5.0) rgb = vec3(x, 0.0, chroma);
    else rgb = vec3(chroma, 0.0, x);
    return rgb + match;
}

float mixHue(float fromHue, float toHue, float t) {
    float delta = mod(toHue - fromHue + 1.5, 1.0) - 0.5;
    return fract(fromHue + delta * t);
}

vec3 mixNeonColor(vec3 fromColor, vec3 toColor, float t) {
    vec3 fromHsv = rgbToHsv(fromColor);
    vec3 toHsv = rgbToHsv(toColor);
    return hsvToRgb(vec3(
        mixHue(fromHsv.x, toHsv.x, t),
        mix(fromHsv.y, toHsv.y, t),
        mix(fromHsv.z, toHsv.z, t)
    ));
}

void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (vTextureCoord - uPos) * vec2(aspect, 1.0);

    p = rot2d(radians(uFrameCount.z)) * p;
    p.y /= cos(radians(uFrameCount.y));

    float numFrames = 10.0 + mod(abs(uFrameCount.x), 50.0);
    float pulseRange = uPulseWidth * 0.15 + 0.05;
    float cycle = fract(uTime * 0.02);
    float travel = mix(-pulseRange, 1.0 + pulseRange, cycle);
    float colorT = smoothstep(0.0, 1.0, clamp(travel, 0.0, 1.0));
    vec3 neonColor = colorT < 0.5
        ? mixNeonColor(uNeonColor, uNeonColorMid, colorT * 2.0)
        : mixNeonColor(uNeonColorMid, uNeonColorEnd, (colorT - 0.5) * 2.0);

    vec3 bloomAccumulation = vec3(0.0);
    vec3 filamentColor = vec3(0.0);
    float bloomPixelSize = 2.0 / uRefMin;
    float filamentPixelSize = 1.5 / uRefMin;

    for (int i = 0; i < 40; i++) {
        if (float(i) >= numFrames) {
            break;
        }
        float framePosition = float(i) / numFrames;
        float lit = invertedSmoothstep(pulseRange, abs(framePosition - travel));
        if (lit > 0.0) {
            float scale = exp((framePosition - 1.0) * 4.0);
            float flicker = 1.0 - uFlickerAmount * (
                dotNoise(vec3(framePosition * 40.0, uTime * 0.15, 0.0)) * 0.5 + 0.5
            );
            vec2 frameSize = vec2(uRectScale * aspect, uRectScale) * scale;
            float cornerRadius = min(frameSize.x, frameSize.y) * 0.16;
            float absDist = abs(sdRoundedRect(p, frameSize, cornerRadius));
            float bloomSource = invertedSmoothstep(bloomPixelSize * 36.0 * scale, absDist);
            bloomAccumulation += neonColor * lit * flicker * bloomSource;
            float sharp = invertedSmoothstep(filamentPixelSize * 5.5, absDist);
            float core = invertedSmoothstep(filamentPixelSize * 2.2, absDist);
            filamentColor += neonColor * lit * flicker * (sharp * 0.55 + core * 0.95);
        }
    }

    bloomOut = vec4(bloomAccumulation, 1.0);
    filamentOut = vec4(filamentColor, 1.0);
}
`,at=`precision highp float;

in vec2 vTextureCoord;
out vec4 fragColor;

uniform sampler2D uTexture;
// Blur step in UV, fixed against the reference bloom size.
uniform vec2 uStep;

void main() {
    vec2 uv = vTextureCoord;
    vec4 sum = texture(uTexture, uv) * 0.227027;
    sum += texture(uTexture, uv + uStep * 1.384615) * 0.316216;
    sum += texture(uTexture, uv - uStep * 1.384615) * 0.316216;
    sum += texture(uTexture, uv + uStep * 3.230769) * 0.070270;
    sum += texture(uTexture, uv - uStep * 3.230769) * 0.070270;
    fragColor = sum;
}
`,ot=`precision highp float;

in vec2 vTextureCoord;
out vec4 fragColor;

uniform sampler2D uBloomTexture;
uniform sampler2D uFilamentTexture;
uniform float uGlowIntensity;

void main() {
    vec3 filament = texture(uFilamentTexture, vTextureCoord).rgb;
    vec3 bloom = texture(uBloomTexture, vTextureCoord).rgb;
    vec3 finalNeon = filament + bloom * uGlowIntensity * 3.0;
    float alpha = clamp(length(finalNeon) * 1.5, 0.0, 1.0);
    fragColor = vec4(finalNeon * alpha, alpha);
}
`,st=`precision highp float;

in vec2 vTextureCoord;
out vec4 fragColor;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPos;
uniform float uScale;
uniform float uGamma;
uniform float uFuzziness;
uniform float uBarrel;
uniform float uVignette;
uniform float uMix;
uniform float uFlicker;
uniform float uSpeed;

float hash11(float value) {
    return fract(sin(value * 12.9898) * 43758.5453123);
}

vec2 barrelWarp(vec2 uv) {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (uv - uPos) * vec2(aspect, 1.0);
    float radiusSquared = dot(p, p);
    p *= 1.0 + clamp(uBarrel, 0.0, 1.0) * 0.42 * radiusSquared;
    return uPos + p / vec2(aspect, 1.0);
}

float insideUnitSquare(vec2 uv) {
    vec2 lower = step(vec2(0.0), uv);
    vec2 upper = step(uv, vec2(1.0));
    return lower.x * lower.y * upper.x * upper.y;
}

vec3 sampleFuzzySignal(vec2 uv, float time) {
    vec2 texel = 1.0 / max(uResolution, vec2(1.0));
    float fuzz = clamp(uFuzziness, 0.0, 1.0);
    float scanline = floor(uv.y * uResolution.y);
    float frame = floor(time * 60.0);
    float jitter = (hash11(scanline + frame * 17.0) - 0.5) * fuzz * 1.25 * texel.x;
    vec2 baseUv = uv + vec2(jitter, 0.0);
    vec3 centre = texture(uTexture, clamp(baseUv, 0.0, 1.0)).rgb;
    float channelShift = mix(0.15, 1.40, fuzz) * texel.x;

    if (fuzz < 0.3) {
        vec3 softened = centre;
        softened.r = mix(softened.r, texture(uTexture, clamp(baseUv + vec2(channelShift, 0.0), 0.0, 1.0)).r, fuzz * 0.55);
        softened.b = mix(softened.b, texture(uTexture, clamp(baseUv - vec2(channelShift, 0.0), 0.0, 1.0)).b, fuzz * 0.55);
        return mix(centre, softened, fuzz);
    }

    float radius = mix(0.25, 2.75, fuzz);
    vec3 left = texture(uTexture, clamp(baseUv - vec2(radius * texel.x, 0.0), 0.0, 1.0)).rgb;
    vec3 right = texture(uTexture, clamp(baseUv + vec2(radius * texel.x, 0.0), 0.0, 1.0)).rgb;
    vec3 softened = centre * 0.60 + (left + right) * 0.20;
    softened.r = mix(softened.r, texture(uTexture, clamp(baseUv + vec2(channelShift, 0.0), 0.0, 1.0)).r, fuzz * 0.55);
    softened.b = mix(softened.b, texture(uTexture, clamp(baseUv - vec2(channelShift, 0.0), 0.0, 1.0)).b, fuzz * 0.55);
    return mix(centre, softened, fuzz);
}

vec3 quantizeRgb565(vec3 color) {
    const vec3 levels = vec3(31.0, 63.0, 31.0);
    return floor(clamp(color, 0.0, 1.0) * levels + 0.5) / levels;
}

vec3 phosphorMask(float x) {
    float channel = mod(floor(x), 3.0);
    if (channel < 1.0) return vec3(1.06, 0.88, 0.88);
    if (channel < 2.0) return vec3(0.88, 1.06, 0.88);
    return vec3(0.88, 0.88, 1.06);
}

void main() {
    vec2 uv = vTextureCoord;
    vec4 original = texture(uTexture, uv);

    float barrelAmount = clamp(uBarrel, 0.0, 1.0);
    float zoom = 1.0 / (1.0 + barrelAmount * 0.28);
    vec2 zoomedUv = uPos + (uv - uPos) * zoom;
    vec2 warpedUv = barrelWarp(zoomedUv);
    float inside = insideUnitSquare(warpedUv);

    float animationTime = uTime * max(uSpeed, 0.01);
    vec3 color = sampleFuzzySignal(warpedUv, animationTime) * inside;
    color = pow(max(color, 0.0), vec3(1.0 / max(uGamma, 0.25)));
    color = quantizeRgb565(color);

    float patternScale = mix(0.75, 1.35, clamp(uScale, 0.0, 1.0));
    vec2 crtPixel = warpedUv * uResolution / patternScale;
    const float TAU = 6.28318530718;
    float scanline = 0.78 + 0.22 * sin(crtPixel.y * TAU);
    color *= scanline * phosphorMask(crtPixel.x) * 1.10;

    float flickerAmount = clamp(uFlicker, 0.0, 1.0);
    float frameNoise = hash11(floor(animationTime * 60.0)) - 0.5;
    float fastFlicker = sin(animationTime * 83.0) * 0.5 + frameNoise;
    float rollingBand = sin((warpedUv.y - animationTime * 0.18) * TAU);
    color *= 1.0 + fastFlicker * flickerAmount * 0.022 + rollingBand * flickerAmount * 0.012;

    vec2 edge = clamp(warpedUv * (1.0 - warpedUv), 0.0, 1.0);
    float vignetteBase = clamp(16.0 * edge.x * edge.y, 0.0, 1.0);
    float vignette = pow(vignetteBase, mix(0.05, 0.85, clamp(uVignette, 0.0, 1.0)));
    color *= vignette * inside;

    fragColor = vec4(mix(original.rgb, clamp(color, 0.0, 1.0), clamp(uMix, 0.0, 1.0)), 1.0);
}
`,ct=`
precision highp float;
in vec3 position;
out vec2 vUv;
uniform vec4 uRect;
uniform vec2 uRef;
uniform vec2 uCenter;
uniform vec3 uTilt;

void main() {
  vec2 corner = position.xy;
  vec2 p = uRect.xy + corner * uRect.zw;
  float s = uTilt.z / (uTilt.z + p.y * uTilt.y);
  vec2 px = vec2(uCenter.x + p.x * s, uCenter.y + p.y * uTilt.x * s);
  vec2 ndc = vec2(px.x / uRef.x * 2.0 - 1.0, 1.0 - px.y / uRef.y * 2.0);
  float w = 1.0 / s;
  gl_Position = vec4(ndc * w, 0.0, w);
  vUv = vec2(corner.x, 1.0 - corner.y);
}
`,lt=`
precision highp float;
in vec3 position;
in vec2 uv;
in float glyph;
out vec2 vUv;
uniform vec2 uRef;
uniform float uTime;
uniform float uFontPx;

float ctaWave(float timeMs, float index) {
  float t = mod(timeMs + index * 45.0, 6500.0) / 6500.0;
  if (t > 0.12) return 0.0;
  if (t < 0.04) return -0.45 * (t / 0.04);
  if (t < 0.08) return -0.45 + 0.53 * ((t - 0.04) / 0.04);
  return 0.08 * (1.0 - (t - 0.08) / 0.04);
}

void main() {
  vec2 px = position.xy + vec2(0.0, ctaWave(uTime, glyph) * uFontPx);
  gl_Position = vec4(px.x / uRef.x * 2.0 - 1.0, 1.0 - px.y / uRef.y * 2.0, 0.0, 1.0);
  vUv = uv;
}
`,ut=`
precision highp float;
in vec3 position;
out vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,dt=`
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uMap;
uniform float uOpacity;

void main() {
  fragColor = texture(uMap, vUv) * uOpacity;
}
`,ft=[640,960,1280,1920],pt=h.rendering?.sceneScale??.7,Z={w:Math.floor(L.width*pt),h:Math.floor(L.height*pt)},mt={w:Math.floor(Z.w*.5),h:Math.floor(Z.h*.5)},Q=h.neonFilamentTunnel,ht=h.retroScreen,gt=180,_t=new Set([`qr`,`player`]),vt=new Set(je),yt=3;function bt(e,{shownId:t=``,fadeFrom:n=``,justAdded:r=``}={}){let i=new Set([t,n,r].filter(Boolean)),a=[],o=new Set,s=0;for(let t=e.length-1;t>=0;--t){let n=e[t];if(o.has(n)){a.push(n);continue}if(o.add(n),!_t.has(n)){if(i.has(n)||s<yt){s+=1;continue}a.push(n)}}return a}var xt={type:ce,format:w,minFilter:v,magFilter:v,generateMipmaps:!1,depthBuffer:!1,stencilBuffer:!1};function St(e,t){return new b({glslVersion:de,vertexShader:rt,fragmentShader:e,uniforms:t,depthTest:!1,depthWrite:!1,blending:0})}function Ct(e,t){return new b({glslVersion:de,vertexShader:e,fragmentShader:dt,uniforms:{uMap:{value:null},uOpacity:{value:1},...t},side:2,depthTest:!1,depthWrite:!1,transparent:!0,blending:5,blendSrc:201,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205})}function wt(e){let t=new O(e);return t.colorSpace=``,t.premultiplyAlpha=!0,t.generateMipmaps=!1,t.minFilter=v,t.magFilter=v,t}function Tt(){let e=new k;return e.setAttribute(`position`,new j(new Float32Array([0,0,0,1,0,0,1,1,0,0,1,0]),3)),e.setIndex([0,1,2,0,2,3]),e}function Et(e){let t=e.glyphs.length,n=new Float32Array(t*4*3),r=new Float32Array(t*4*2),i=new Float32Array(t*4),a=[];e.glyphs.forEach((e,t)=>{let o=[[e.x,e.y],[e.x+e.w,e.y],[e.x+e.w,e.y+e.h],[e.x,e.y+e.h]],s=[[e.u0,1],[e.u1,1],[e.u1,0],[e.u0,0]];o.forEach(([a,o],c)=>{n.set([a,o,0],(t*4+c)*3),r.set(s[c],(t*4+c)*2),i[t*4+c]=e.index});let c=t*4;a.push(c,c+1,c+2,c,c+2,c+3)});let o=new k;return o.setAttribute(`position`,new j(n,3)),o.setAttribute(`uv`,new j(r,2)),o.setAttribute(`glyph`,new j(i,1)),o.setIndex(a),o}function Dt(e,t,n=0){return((e-n)%t+t)%t/t}function $(e,t,n,r=0){let i=Dt(e,t,r);return-n*(1-Math.cos(i*Math.PI*2))/2}function Ot(e,t){if(e<=t[0][0])return t[0][1];for(let n=1;n<t.length;n+=1)if(e<=t[n][0]){let r=t[n][0]-t[n-1][0],i=r<=0?1:(e-t[n-1][0])/r;return t[n-1][1]+(t[n][1]-t[n-1][1])*i}return t[t.length-1][1]}var kt=[[0,1],[.18,1.035],[.36,1],[1,1]],At=[[0,1],[.18,1.1],[.32,1],[.62,1.06],[.72,1],[.84,1.28],[.92,.96],[1,1]];async function jt(e,{maxWidth:t,fps:n,frozen:r,liveScale:i=1,lite:a=!1,video:o=!0}){let s=await Ae(),c=new oe,l=new y(new re(2,2));l.frustumCulled=!1,c.add(l);let u=new g(-1,1,1,-1,0,1),d=new ye(1,1,{...xt,count:2}),f=new ye(1,1,xt),p=new ye(1,1,xt),m=new ye(1,1,xt),h=new ye(1,1,xt),_=St(it,{uResolution:{value:new E(Z.w,Z.h)},uRefMin:{value:Math.min(Z.w,Z.h)},uTime:{value:0},uPos:{value:new E(...Q.uPos)},uFrameCount:{value:new x(...Q.uFrameCount)},uRectScale:{value:Q.uRectScale},uPulseWidth:{value:Q.uPulseWidth},uNeonColor:{value:new x(...Q.uNeonColor)},uNeonColorMid:{value:new x(...Q.uNeonColorMid??[.957,.388,.737])},uNeonColorEnd:{value:new x(...Q.uNeonColorEnd)},uFlickerAmount:{value:Q.uFlickerAmount}}),v=St(at,{uTexture:{value:d.textures[0]},uStep:{value:new E(2/mt.w,0)}}),ee=St(at,{uTexture:{value:f.texture},uStep:{value:new E(0,2/mt.h)}}),b=St(ot,{uBloomTexture:{value:p.texture},uFilamentTexture:{value:d.textures[1]},uGlowIntensity:{value:Q.uGlowIntensity}}),S=St(st,{uTexture:{value:m.texture},uResolution:{value:new E(1,1)},uTime:{value:0},uPos:{value:new E(...ht.uPos)},uScale:{value:ht.uScale},uGamma:{value:ht.uGamma},uFuzziness:{value:ht.uFuzziness},uBarrel:{value:ht.uBarrel},uVignette:{value:ht.uVignette},uMix:{value:ht.uMix},uFlicker:{value:ht.uFlicker},uSpeed:{value:ht.uSpeed}}),C=new oe,ne=z.rotateX*Math.PI/180,ie=()=>({uRect:{value:new te},uRef:{value:new E(L.width,L.height)},uCenter:{value:new E(L.width/2,L.height*.5)},uTilt:{value:new x(Math.cos(ne),Math.sin(ne),z.perspective)}}),ae=Tt();let w=e=>{let t=Ct(ct,ie());t.uniforms.uMap.value=wt(e);let n=new y(ae,t);return n.frustumCulled=!1,C.add(n),n};let eyeCanvas=typeof document<"u"?document.createElement("canvas"):null;eyeCanvas&&(eyeCanvas.width=512,eyeCanvas.height=256);let targetEyeX=0,targetEyeY=0,curEyeX=0,curEyeY=0,isMouseDown=!1;typeof window<"u"&&(window.addEventListener("pointermove",e=>{targetEyeX=(e.clientX/window.innerWidth)*2-1,targetEyeY=(e.clientY/window.innerHeight)*2-1},{passive:!0}),window.addEventListener("pointerdown",()=>{isMouseDown=!0},{passive:!0}),window.addEventListener("pointerup",()=>{isMouseDown=!1},{passive:!0}));let updateRobotEyes=e=>{if(!eyeCanvas)return;let t=eyeCanvas.getContext("2d");curEyeX+=(targetEyeX-curEyeX)*.12,curEyeY+=(targetEyeY-curEyeY)*.12,t.clearRect(0,0,512,256);let n=e%3800,i=1;n<160&&(i=1-Math.sin(n/160*Math.PI)*.94),isMouseDown&&(i=Math.min(i,.45));let a=Math.sin(e*.002)*2,o=Math.cos(e*.0026)*1.5,s=186,c=Math.max(3,62*i),l=62,u=curEyeX*22+a,d=curEyeY*14+o,f=(e,n)=>{t.beginPath();let a=-e*.5,o=-n*.35,s=e*.5,c=n*.45;t.moveTo(a,o),t.bezierCurveTo(-e*.15,-n*.42,e*.2,-n*.05,s,c),t.bezierCurveTo(e*.15,n*.65,-e*.2,n*.4,a,o),t.closePath()};[-1,1].forEach(e=>{t.save();let n=256+e*(l/2+s/2)+u,a=126+d;t.translate(n,a),e===1&&t.scale(-1,1),t.rotate(curEyeX*.035*e),t.save(),t.shadowColor="rgba(0, 240, 255, 0.95)",t.shadowBlur=32,t.fillStyle="rgba(0, 220, 255, 0.5)",f(s*1.08,c*1.2),t.fill(),t.restore(),t.save(),t.shadowColor="rgba(0, 240, 255, 1)",t.shadowBlur=22;let o=t.createLinearGradient(0,-c*.5,0,c*.5);o.addColorStop(0,"#a5f3fc"),o.addColorStop(.35,"#00f0ff"),o.addColorStop(1,"#00b4d8"),t.fillStyle=o,f(s,c),t.fill(),t.lineWidth=1.5,t.strokeStyle="rgba(224, 250, 255, 0.95)",t.stroke(),i>.25&&(t.save(),t.clip(),t.shadowBlur=0,t.fillStyle="rgba(0, 30, 70, 0.18)");if(i>.25){for(let e=-c;e<c;e+=3.5)t.fillRect(-s,e,s*2,1.2);for(let e=-s;e<s;e+=4)t.fillRect(e,-c,1.2,c*2);let e=t.createRadialGradient(0,0,2,0,0,s*.35);e.addColorStop(0,"rgba(255, 255, 255, 0.9)"),e.addColorStop(.5,"rgba(200, 250, 255, 0.5)"),e.addColorStop(1,"rgba(0, 240, 255, 0)"),t.fillStyle=e,t.beginPath(),t.ellipse(curEyeX*12,curEyeY*8,s*.35,c*.45,0,0,Math.PI*2),t.fill(),t.restore()}t.restore(),t.save(),t.shadowColor="rgba(0, 240, 255, 0.8)",t.shadowBlur=16;let r=t.createLinearGradient(-s*.8,0,s*.8,0);r.addColorStop(0,"rgba(0, 240, 255, 0)"),r.addColorStop(.5,"rgba(0, 240, 255, 0.4)"),r.addColorStop(1,"rgba(0, 240, 255, 0)"),t.fillStyle=r,t.fillRect(-s*.85,-2,s*1.7,4),t.restore(),t.restore()})};let se=w(s.logo.canvas),T=w(s.heartLeft.canvas),ce=w(s.heartRight.canvas),logoTex=se.material.uniforms.uMap.value,eyeTex=eyeCanvas?wt(eyeCanvas):logoTex,isEyesActive=!1,le=Ct(lt,{uRef:{value:new E(L.width,L.height)},uTime:{value:0},uFontPx:{value:s.cta.fontPx}});le.uniforms.uMap.value=wt(s.cta.canvas);let D=new y(Et(s.cta),le);D.frustumCulled=!1,C.add(D);let ue=new re(2,2),de=()=>{let e=new y(ue,Ct(ut,{}));return e.frustumCulled=!1,e.visible=!1,C.add(e),e},fe=de(),pe=de(),me=[se,T,ce,D],O=ke({lite:a,video:o}),k=[0,1].map(()=>{let e=document.createElement(`canvas`);e.width=Math.round(R.width*i),e.height=Math.round(R.height*i);let t=e.getContext(`2d`);return t.setTransform(i,0,0,i,0,0),{id:``,since:0,canvas:e,ctx:t,texture:wt(e)}}),he=``,ge=0,_e={brand:``,stickers:[],lettering:``},A=new Map,j=new Map,ve=[],M=`attract`,N=``,be=``,xe=0,Se=0,Ce=t,we=-1e9,P=0,Te=-1e9,F=!0,I=performance.now();function De(e){if(e===Se)return;Se=e;let t=Math.round(e*9/16);h.setSize(e,t);let n=Math.max(1,Math.floor(e*pt)),r=Math.max(1,Math.floor(t*pt));d.setSize(n,r),m.setSize(n,r),f.setSize(Math.max(1,Math.floor(n*.5)),Math.max(1,Math.floor(r*.5))),p.setSize(Math.max(1,Math.floor(n*.5)),Math.max(1,Math.floor(r*.5))),S.uniforms.uResolution.value.set(e,t),F=!0}let je=t>=1280?960:640;function Me(e){let n=Math.min(t,Ce),r=ft.find(t=>t>=e*1.25)??ft[ft.length-1],i=Math.min(r,ft.filter(e=>e<=n).pop()??ft[0]);return Math.max(i,Math.min(je,n))}De(Me(t));function B(e,t){let n=A.get(e);n||(n=wt(t),A.set(e,n));let r=ve.indexOf(e);r>=0&&ve.splice(r,1),ve.push(e);for(let t of bt(ve,{shownId:N,fadeFrom:be,justAdded:e})){A.get(t)?.dispose(),A.delete(t);let e=ve.indexOf(t);e>=0&&ve.splice(e,1)}return n}function Ne(t){t&&typeof e.initTexture==`function`&&e.initTexture(t)}let Pe=``,V=``,H=!1,U=``;function W(e){A.get(e)?.dispose(),A.delete(e),j.delete(e);let t=ve.indexOf(e);t>=0&&ve.splice(t,1)}function G(e,t){e&&e!==Pe&&(Pe=e,W(`qr`),H=!1,K(`qr`)),t&&t!==V&&(V=t,W(`player`),U=``,K(`player`))}function K(e){if(e===`qr`){if(!Pe||A.has(`qr`)||H){!A.has(`qr`)&&j.has(`qr`)&&B(`qr`,j.get(`qr`));return}H=!0;let e=Pe;Oe(e).then(t=>{H=!1,e===Pe&&(j.set(`qr`,t),A.has(`qr`)||Ne(B(`qr`,t)),F=!0)}).catch(()=>{H=!1});return}if(e===`player`){if(!V||U===V){j.get(`player`)?.dataset?.name===V&&!A.has(`player`)&&B(`player`,j.get(`player`));return}if(j.get(`player`)?.dataset?.name===V&&A.has(`player`))return;U=V;let e=V;Ee(e).then(t=>{U===e&&(U=``),e===V&&(j.set(`player`,t),A.has(`player`)||Ne(B(`player`,t)),F=!0)})}}let Fe=typeof requestIdleCallback==`function`?e=>requestIdleCallback(e,{timeout:1500}):e=>setTimeout(e,60);function Ie(e){return k.find(t=>t.id===e)||null}function q(e){e!==he&&(he&&O.leave(he),he=e,he&&!r&&O.enter(he))}function Le(e){return vt.has(e)?Ie(e)?.texture||null:A.get(e)||null}function J(e,t){if(e!==M){if(M=e,F=!0,M===`attract`){N=``,be=``,q(``);return}if(vt.has(M)){let e=Ie(N),n=Ie(M)||k.find(t=>t!==e);n.id=M,n.since=t,O.load(M).then(()=>{F=!0})}else K(M);be=N,xe=t}}function Re(e,t,n,r,i){e.material.uniforms.uRect.value.set(t-z.width/2,n-z.height/2,r,i)}function ze(e){let t=r?0:e;if(isEyesActive){if(eyeTex){se.material.uniforms.uMap.value=eyeTex,updateRobotEyes(t),eyeTex.needsUpdate=!0}let n=z.width*.96,i=n*.52;Re(se,(z.width-n)/2,(z.height-i)/2,n,i),T.visible=!1,ce.visible=!1,D.visible=!1,se.visible=!0,le.uniforms.uTime.value=t%6500}else{if(logoTex){se.material.uniforms.uMap.value=logoTex}let n=r?1:Ot(Dt(t,4e3),kt),i=r?0:$(t,3600,10),a=z.titleW*n,o=z.titleH*n,c=s.logo.pad*n;Re(se,z.pad+(z.titleW-a)/2-c,z.pad+(z.titleH-o)/2+i-c,a+c*2,o+c*2);let l=s.heartLeft,u=s.heartRight,d=r?1:Ot(Dt(t,5200,400),At),f=r?1:Ot(Dt(t,5800,1800),At),p=r?0:$(t,4400,14,200),m=r?0:$(t,5100,8,1100),h=z.height*.94-l.h;Re(T,(l.w-l.w*d)/2,h+(l.h-l.h*d)/2+p,l.w*d,l.h*d);let g=z.width-u.w;Re(ce,g+(u.w-u.w*f)/2,(u.h-u.h*f)/2+m,u.w*f,u.h*f),le.uniforms.uTime.value=t%6500,D.visible=!r,T.visible=!r,ce.visible=!r,se.visible=!0}}function Y(e,t){let n=Ie(e);if(!n)return;let i=r?O.stillMs(e):t-n.since;O.draw(e,n.ctx,i,{frozen:r,menuP:ge,name:V,..._e}),n.texture.needsUpdate=!0}function Be(e){Le(M)&&(N=M),vt.has(N)&&Y(N,e);let t=N?Le(N):null,n=be&&be!==N?Le(be):null,i=r?1:Math.min(1,(e-xe)/gt);return fe.visible=!!t,fe.material.uniforms.uMap.value=t,fe.material.uniforms.uOpacity.value=n?i:1,pe.visible=!!n&&i<1,pe.material.uniforms.uMap.value=n,pe.material.uniforms.uOpacity.value=1-i,i>=1&&(be=``),i<1}function Ve(t,n){l.material=t,e.setRenderTarget(n),e.render(c,u)}function He(t){let n=r?0:(t-I)/1e3;_.uniforms.uTime.value=n*Q.timeMultiplier,S.uniforms.uTime.value=n;let i=e.getRenderTarget(),a=e.autoClear;if(isEyesActive){e.setRenderTarget(h),e.setClearColor(132631,1),e.clear(!0,!0,!0),e.setClearColor(0,0)}else{Ve(_,d),Ve(v,f),Ve(ee,p),Ve(b,m),Ve(S,h)}let o=!1,s=M===`attract`;for(let e of me)e.visible=s;return s?(ze(t),fe.visible=!1,pe.visible=!1):o=Be(t),e.autoClear=!1,e.setRenderTarget(h),e.render(C,u),e.autoClear=a,e.setRenderTarget(i),o}return{texture:h.texture,target:h,get level(){return Se},update(e,{mode:t,visible:i,projectedPx:a,playUrl:o=``,playName:s=``,menu:c=0,brand:l=null,eyes:uEyes=!1}){let curEyeActive=Boolean(uEyes);curEyeActive!==isEyesActive&&(isEyesActive=curEyeActive,F=!0),isEyesActive&&(F=!0);if(G(o,s),J(t,e),c!==ge&&(ge=c,M===`menu`&&(F=!0)),q(i&&vt.has(M)?M:``),l&&(l.brand!==_e.brand||l.lettering!==_e.lettering||l.stickers[0]!==_e.stickers[0])&&(_e={brand:l.brand,stickers:[...l.stickers],lettering:l.lettering},M===`brand`&&(F=!0)),i&&e-we>400){let t=Me(a);t>Se?(De(t),we=e,P=0):t<Se?(P||=e,e-P>900&&(De(t),we=e,P=0)):P=0}return!i&&!F||r&&!F||!r&&!F&&e-Te<1e3/n?!1:(Te=e,F=He(e),!0)},async warm(e){await Promise.race([O.load(`foto`),new Promise(e=>setTimeout(e,2500))]),Fe(()=>O.preload());let t=M;He(e),M=`foto`,k[0].id=`foto`,k[0].since=e,N=`foto`,He(e),k[1].id=`menu`,N=`menu`,M=`menu`,He(e),M=t,N=``,k[0].id=``,k[1].id=``,F=!0},capLevel(e){Ce=ft[Math.max(0,ft.indexOf(Me(t))-e)]??ft[0],Se>Ce&&De(Ce)},dispose(){for(let e of[d,f,p,m,h])e.dispose();for(let e of[_,v,ee,b,S,le,fe.material,pe.material])e.dispose();for(let e of[se,T,ce])e.material.uniforms.uMap.value?.dispose(),e.material.dispose();le.uniforms.uMap.value?.dispose();for(let e of A.values())e.dispose();A.clear();for(let e of k)e.texture.dispose();O.dispose(),l.geometry.dispose(),ae.dispose(),ue.dispose(),D.geometry.dispose()}}}function Mt(e,t){let n=t.length,r=e.map((e,n)=>[...e,t[n]]);for(let e=0;e<n;e+=1){let t=e,i=Math.abs(r[e][e]);for(let a=e+1;a<n;a+=1){let n=Math.abs(r[a][e]);n>i&&(i=n,t=a)}if(i<1e-12)return null;if(t!==e){let n=r[e];r[e]=r[t],r[t]=n}let a=r[e][e];for(let t=e;t<=n;t+=1)r[e][t]/=a;for(let t=0;t<n;t+=1){if(t===e)continue;let i=r[t][e];if(i!==0)for(let a=e;a<=n;a+=1)r[t][a]-=i*r[e][a]}}return r.map(e=>e[n])}function Nt(e,t){let n=[],r=[];for(let i=0;i<4;i+=1){let[a,o]=e[i],[s,c]=t[i];n.push([a,o,1,0,0,0,-s*a,-s*o]),r.push(s),n.push([0,0,0,a,o,1,-c*a,-c*o]),r.push(c)}let i=Mt(n,r);return i?[...i,1]:null}function Pt(e,t,n){if(!e||!t||n.length!==4)return null;for(let e of n)if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y)||e.z<-1||e.z>1)return null;let r=Nt([[0,0],[e,0],[e,t],[0,t]],n.map(e=>[e.x,e.y]));if(!r)return null;let[i,a,o,s,c,l,u,d,f]=r,p=e=>Math.abs(e)<1e-9?0:+e.toPrecision(7);return`matrix3d(${p(i)},${p(s)},0,${p(u)},${p(a)},${p(c)},0,${p(d)},0,0,1,0,${p(o)},${p(l)},0,${p(f)})`}function Ft(e,t=.72,n=-.64){let r=[[-e,1.55,t],[-.76,.1,.24],[-.76,.1,-.2],[-e,1.55,n]],i=[[.76,.1,.24],[e,1.55,t],[e,1.55,n],[.76,.1,-.2]];return{l:{hidden:[[-.22,-.25,.18],[-.04,-.6,.08],[-.04,-.6,-.06],[-.22,-.25,-.14]],rest:r,away:r.map(It)},r:{hidden:[[.04,-.6,.08],[.22,-.25,.18],[.22,-.25,-.14],[.04,-.6,-.06]],rest:i,away:i.map(It)}}}function It([e,t,n]){return[e*1.35,t+.75,n*1.3]}function Lt(e,t){let n=e*.8,r=.58;return{l:{hidden:[[-.16,-.3,.3],[.16,-.3,.3],[.1,-.6,.22],[-.1,-.6,.22]],rest:[[-e,1.6,t],[e,1.6,t],[n,.12,r],[-n,.12,r]],away:[[-e*4.2,3.4,t*2.8],[e*4.2,3.4,t*2.8],[n*3,1.9,t*1.8],[-n*3,1.9,t*1.8]]},r:{hidden:[[-.1,-.6,-.22],[.1,-.6,-.22],[.16,-.3,-.3],[-.16,-.3,-.3]],rest:[[-n,.12,-.58],[n,.12,-.58],[e,1.6,-t],[-e,1.6,-t]],away:[[-n*3,1.9,-t*1.8],[n*3,1.9,-t*1.8],[e*4.2,3.4,-t*2.8],[-e*4.2,3.4,-t*2.8]]}}}var Rt=Object.freeze([[.64,.04,.48],[1.77,.3,.56],[1.77,.3,.22],[.64,.04,.24]]),zt=Object.freeze({outer:2.02,top:.72,bottom:-.64});function Bt(e,t={}){return e===`stacked`?Lt(t.half??.5,t.rise??.72):e===`compact`?Ft(1.82):Ft(t.outer??zt.outer,t.top??zt.top,t.bottom??zt.bottom)}function Vt(e,t,n){return[e[0]+(t[0]-e[0])*n,e[1]+(t[1]-e[1])*n,e[2]+(t[2]-e[2])*n]}function Ht(e,t,n){return e.hidden.map((r,i)=>Vt(Vt(r,e.rest[i],t),e.away[i],n))}var Ut=[.64,.04,.36],Wt=[1.77,.3,.39],Gt=32,Kt=14*Math.PI/180,qt=-12*Math.PI/180,Jt=[1,.85,.72,.62];function Yt(){let e=document.createElement(`canvas`);e.width=256,e.height=256;let t=e.getContext(`2d`);if(t){let e=t.createRadialGradient(128,128,9,128,128,115);e.addColorStop(0,`rgba(255,255,255,0.85)`),e.addColorStop(.28,`rgba(255,255,255,0.4)`),e.addColorStop(.55,`rgba(255,255,255,0)`),e.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=e,t.fillRect(0,0,256,256)}let n=new O(e);return n.colorSpace=``,n}async function Xt({canvas:o,model:c,profile:l,reduced:p,onProgress:h}){let g=new N({canvas:o,antialias:l.antialias,alpha:!0,premultipliedAlpha:!1,stencil:!1,powerPreference:`high-performance`});g.outputColorSpace=ne,g.toneMapping=4,g.toneMappingExposure=0.92,g.setClearColor(0,0),g.info.autoReset=!1;let v=!1;g.shadowMap.enabled=!1,g.shadowMap.type=1,g.shadowMap.autoUpdate=!1;let b=new oe,S=new ge(Gt,1,.05,40),C=new Te;b.add(C);let te=new se(13691647,10535136,0.9),w=new F(16775920,1.4);w.position.set(3.4,4.6,.35);let T=new F(7260415,.02);T.position.set(-2.6,.35,1.8);let ce=new F(16096779,.55);ce.position.set(-1.35,1.55,-2.7);let le=new F(6217983,.08);le.position.set(2.1,.2,-1.8);let E=new F(16761162,0);E.position.set(-.4,3.2,2.2);let D=new F(10405119,0);D.position.set(.2,2.6,-3.4);let de=new F(16766658,0);de.position.set(1.1,2.9,4.4);let O=new ie(58879,1.8,2.4,2);b.add(te,w,T,ce,le,E,D,de,O);let k=null,_e=null;try{k=new me(g),_e=k.fromScene(new A,.08).texture,b.environment=_e,b.environmentIntensity=0.85}catch{b.environment=null}let j=new pe;j.setMeshoptDecoder(Ce);let ye=await c;h?.(.86);let we=await j.parseAsync(ye,``);h?.(.88);let root=new Te;root.name="Full_Cyborg_Armature";let body=we.scene;body.rotation.y=0;body.position.set(0,0,0);root.add(body);try{let _hb=await fetch("/naigc/memory-quest/landing-v4/cyborg.glb").then(e=>e.arrayBuffer()),_hg=await j.parseAsync(_hb,""),helmet=_hg.scene;helmet.scale.setScalar(.4);helmet.position.set(0,1.38,-.035);helmet.traverse(e=>{if(e.isMesh){if(e.name==="Helmet-Body_Helmet-Body_0"){e.material.color?.setHex(16777215),e.material.roughness=.16,e.material.metalness=.12}else if(e.name==="Black-one_Standard_14_0"){e.material.color?.setHex(1579552),e.material.roughness=.35,e.material.metalness=.85}}});root.add(helmet);}catch(err){console.error("Armature setup error:",err);}h?.(.9);let P=be(C,root);he(C,{maxAniso:g.capabilities.getMaxAnisotropy(),shadows:v});let I=fe(C,`Screen_glass`);if(!I)throw Error(`Arcade model is missing Screen_glass.`);let L=xe(I,P.center);L.normal.set(0,0,1),L.up.set(0,1,0),L.right.set(1,0,0),L.width=.36,L.height=.2025;M(I.geometry);let Ee=await jt(g,{maxWidth:l.screenMax,fps:l.screenFps,frozen:p});h?.(.94),I.material?.dispose(),I.material=ue(Ee.texture),I.renderOrder=1;let R=null;if(l.glass){R=new y(I.geometry.clone(),new ae({color:16777215,metalness:0,roughness:.08,transparent:!0,opacity:.05,clearcoat:1,clearcoatRoughness:.08,envMapIntensity:1.6,depthWrite:!1,specularIntensity:.3})),R.renderOrder=2,I.parent.add(R),R.position.copy(I.position),R.quaternion.copy(I.quaternion),R.scale.copy(I.scale);let e=new ee().copy(I.matrixWorld).invert(),t=L.normal.clone().transformDirection(e).normalize();R.position.addScaledVector(t,.0025)}O.position.copy(L.center).addScaledVector(L.normal,.1);let Oe=new F(16734870,.1);Oe.position.copy(L.center).addScaledVector(L.normal,1.1),Oe.target.position.copy(P.center),b.add(Oe,Oe.target);function ke(e,t){let n=new _(e,0,9,Math.PI/5.4,.64,1.25);return n.castShadow=t,t&&(n.shadow.mapSize.set(l.shadowMap,l.shadowMap),n.shadow.bias=-2e-4,n.shadow.normalBias=.03,n.shadow.camera.near=.15,n.shadow.camera.far=12),b.add(n,n.target),n}let z=ke(16726431,v),Ae=ke(7921151,v),je=ke(16724808,!1);{let e=P.center,{x:t,y:n,z:r}=P.size;z.position.set(e.x-t*1.55,e.y+n*.38,e.z-r*.2),Ae.position.set(e.x+t*1.62,e.y+n*.46,e.z-r*.08),je.position.set(e.x-t*.15,e.y+n*.92,e.z+r*.7);let i=e.y-n*.2,a=e.z+r*.32;z.target.position.set(e.x-t*.04,i,a),Ae.target.position.set(e.x+t*.04,i,a),je.target.position.set(e.x,e.y-n*.02,e.z+r*.2)}let Me=Yt(),B=new y(new re(6.5,6.5),new ae({color:197127,roughness:1,metalness:0,specularIntensity:0,envMapIntensity:0,transparent:!0,alphaMap:Me,depthWrite:!1}));B.rotation.x=-Math.PI/2,B.position.y=P.center.y-P.size.y*.5-.012,B.receiveShadow=v,B.renderOrder=1,B.visible=!1;let{decals:Ne,brandParts:Pe}=ve(C,L),V=nt(b,{lights:l.buttonLights}),H=Ze(b,S,P,l.hazeBanks);De();let U=ze(),W={width:1,height:1},G=`desktop`,K={sx:1,sy:1},Fe=1,Ie=0,q=0,Le=0,J=Bt(`desktop`),Re=!1,Y=!1,Be=NaN,Ve=NaN,He={brand:``,stickers:[],lettering:``};function Ue(e,t,n){return He.brand=e||``,He.stickers=Array.isArray(t)?t:He.stickers,He.lettering=String(n||``),He}let We=``,Ge=0,Ke=1,qe=-1,X=``,Je=[],Ye=``,Xe=!1,Qe=!1,$e=0,et=``,tt=-1,rt=`attract`,it=0,at={act:0,brand:0,play:0},ot=null,st={},ct=new x,lt=new x,ut=new x,dt=new x,ft=new x,pt=new x(0,1,0),Z=new x,mt=new x,Q=L.corners(),ht=Q.map(e=>e.clone());function gt(){let e=W.width<=700?l.dprCapNarrow:l.dprCap;return Math.max(.6,Math.min(window.devicePixelRatio||1,e)*Fe)}function _t(e){let t=r(e,0,1),n=s(t,.04,.32),a=i(t,.32,.76),o=s(t,.22,.76);te.intensity=0.85+n*0.2+a*0.2+o*0.45,w.intensity=1.2+n*0.4+a*0.4+o*1.1,T.intensity=0.45+n*0.15+a*0.15+o*0.35,ce.intensity=0.85+a*0.25+o*0.45,le.intensity=0.55+a*0.2+o*0.35,E.intensity=0.45+o*0.35,D.intensity=0.35+a*0.15+o*0.25,de.intensity=0.75+o*0.45,O.intensity=1.6+o*0.85,Oe.intensity=0.2+o*0.25,g.toneMappingExposure=0.88+n*0.1+o*0.22,b.environmentIntensity=0.7+o*0.4,w.position.set(3.4,4.6+o*1.6,.35),de.position.set(1.1,2.9+o*2,4.4),E.position.set(-.4,3.2+o*1.8,2.2),D.position.set(.2,2.6+o*1.4,-3.4),R&&(R.visible=t>.18)}function vt(e){O.color.set(e.screenColor),O.intensity*=e.screen,z.intensity=e.pink,Ae.intensity=e.cyan,je.intensity=e.accent,je.color.set(e.accentColor)}function yt(e,t){Se(Pe,e,t)}function bt(e){if(G===`desktop`||e<=.001)return 1;let t=K.syIntro??1;return t>=.999?1:1+(1/t-1)*e}function xt(e,t){let n=bt(t);n<=1.001||e.position.sub(e.target).multiplyScalar(n).add(e.target)}function St(t,n,i){let o=s(t,a.brandFrom,a.sideIn)*(1-s(t,e.brandHold,e.brandHold+.01)),c=o*qt;if(!p&&o>0&&n?.active){let e=Z.copy(P.center).project(S).x;c+=o*r((e-n.x)/.45,-1,1)*Kt}let l=1-Math.exp(-i*(n?.active?5:3));it+=(c-it)*l,Math.abs(it)<1e-4&&c===0&&(it=0)}function Ct(e,t,n){let r=U.sample(e,n,Ke,t);return xt(r,q),C.rotation.y=(r.cabinetYaw||0)+it,C.updateWorldMatrix(!0,!0),S.up.copy(r.up),S.position.copy(r.position),S.lookAt(r.target),S.updateMatrixWorld(),I.getWorldPosition(ct),lt.copy(L.normal).applyQuaternion(C.quaternion).normalize(),O.position.copy(ct).addScaledVector(lt,.1),Oe.position.copy(ct).addScaledVector(lt,1.1),_t(r.mood),r}function wt(e,t=0,n=0,r=1,i=0){let{width:a,height:o}=W,s=0,c=0,l=(1-1/bt(n))*o/2;if(G===`desktop`)c=l;else if(G===`stacked`){let n=K.syPlay??K.sy,r=o*(1-(n+(K.sy+((K.syBrand??K.sy)-K.sy)*t-n)*i))*e/2;c=Math.max(l,r)}else if(G===`compact`){let t=(K.sxPlay??K.sx)+(K.sx-(K.sxPlay??K.sx))*i;s=e*r*(a-a*t)/2,c=l}let u=`${a}x${o}:${s.toFixed(1)},${c.toFixed(1)}`;u!==We&&(We=u,s===0&&c===0?S.clearViewOffset():S.setViewOffset(a,o,s,c,a,o))}function Tt(e){return Z.copy(e).project(S),{x:(Z.x*.5+.5)*W.width,y:(-Z.y*.5+.5)*W.height,z:Z.z}}function Et(){dt.copy(S.position).sub(P.center),dt.y=0,dt.lengthSq()<1e-6?dt.set(0,0,1):dt.normalize(),ft.crossVectors(pt,dt).normalize()}function Dt(e,t,n){return mt.copy(P.center).addScaledVector(ft,P.size.x*e).addScaledVector(dt,P.size.z*t).addScaledVector(pt,P.size.y*n)}function $([e,t,n]){return Tt(Dt(e,t,n))}function Ot(e){let t=0,n=1;for(let r=0;r<10;r+=1){let r=(t+n)/2;Z.copy(Dt(u(Ut[0],Wt[0],r),u(Ut[1],Wt[1],r),u(Ut[2],Wt[2],r))).project(S),(Z.x*.5+.5)*W.width<=e?t=r:n=r}return t}function kt(t=0){q=t,Ct((e.revealEnd+e.playAt)/2,`foto`,0),wt(0,0,t)}function At(){kt(0),Et();let e=.52,t=.74,n=!1,i=.05,a=.95;for(let o=0;o<10;o+=1){let o=Bt(`stacked`,{half:e,rise:t}),s=[...o.l.rest,...o.r.rest].map($);if(s.some(e=>!Number.isFinite(e.x)||e.z<-1||e.z>1)){t*=.9,e*=.9;continue}let c=s.map(e=>e.x),l=s.map(e=>e.y),u=(Math.max(...c)-Math.min(...c))/W.width,d=Math.min(...l)/W.height,f=Math.max(...l)/W.height;if(u<=.92&&u>=.7&&d>=i&&f<=a){n=!0;break}(u>.92||u<.7)&&(e*=.86/Math.max(u,.05)),d<i||f>a?t-=.05:d>.16&&f<.84&&(t+=.04),e=r(e,.18,1.4),t=r(t,.6,1.2)}return J=Bt(`stacked`,{half:e,rise:t}),n}function Mt(e){kt(0),Et();let t=Math.max(20,W.width*.035),{outer:n,top:i,bottom:a}=zt;for(let o=0;o<8;o+=1){let o=Bt(`desktop`,{outer:n,top:i,bottom:a}),s=[o.l.rest[0],o.l.rest[3],o.r.rest[1],o.r.rest[2]].map($);if(s.some(e=>!Number.isFinite(e.x)||e.z<-1||e.z>1)){n*=.9;continue}let c=W.width/2,l=(Math.abs(s[0].x-c)+Math.abs(s[1].x-c)+Math.abs(s[2].x-c)+Math.abs(s[3].x-c))/4;if(n=r(n*((c-t)/Math.max(l,1)),.9,3.2),e){let t=$([o.l.rest[0][0],o.l.rest[0][1],0]).y,n=Math.min(s[0].y,s[2].y),c=Math.max(s[1].y,s[3].y);n<e.top+16&&t>n&&(i*=r((t-e.top-16)/(t-n),.2,1)),c>e.bottom-16&&c>t&&(a*=r((e.bottom-16-t)/(c-t),.2,1))}i=r(i,.12,zt.top),a=r(a,zt.bottom,-.12)}J=Bt(`desktop`,{outer:n,top:i,bottom:a})}function Nt(e){let t=S.aspect*(e.sx??1),{x:n,y:i}=P.size,a=i*1.18/(n*1.35)*t;t/a>=.85&&(a=i*1.28/(n*1.62)*t);let o=(e,t)=>t==null||e==null?e:r(a,e,Math.max(e,t));return{...e,sy:o(e.sy,e.syReach),syPlay:o(e.syPlay,e.syPlayReach)}}function Ft(e){kt(0);let t=It();if(!t)return;let n=t.top/100*W.height,i=t.bottom/100*W.height,a=W.height/2,o=Math.min(a-n>0?(a-e.top)/(a-n):1,i-a>0?(e.bottom-a)/(i-a):1);o>=1||(K={...K,syPodium:r(o*.96,.62,1)},U.configure({fov:Gt,aspect:S.aspect,screen:L,cabinet:P},G,K))}function It(){let e=P.size.x/2,t=P.size.y/2,n=P.size.z/2,i=P.center,a=1/0,o=-1/0,s=1/0,c=-1/0;for(let r of[-e,e])for(let e of[-t,t])for(let t of[-n,n]){let n=Tt(Z.set(i.x+r,i.y+e,i.z+t));n.z<-1||n.z>1||(a=Math.min(a,n.x),o=Math.max(o,n.x),s=Math.min(s,n.y),c=Math.max(c,n.y))}if(!Number.isFinite(a)||o<=a)return null;let l=(e,t)=>Math.round(r(e/t,0,1)*100),u=Math.min(80,l(a,W.width)),d=Math.min(80,l(s,W.height));return{left:u,right:Math.max(u+8,l(o,W.width)),top:d,bottom:Math.max(d+8,l(c,W.height))}}function Lt(){if(ut.copy(S.position).sub(ct),!(lt.dot(ut)>0))return{visible:!1,projectedPx:0};let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let i=0;i<Q.length;i+=1){mt.copy(ht[i]).applyMatrix4(C.matrixWorld);let a=Tt(mt);e=Math.min(e,a.x),t=Math.max(t,a.x),n=Math.min(n,a.y),r=Math.max(r,a.y)}let i=t>0&&e<W.width&&r>0&&n<W.height,a=(t-e)*g.getPixelRatio();return{visible:i&&t-e>24,projectedPx:a}}{let e=new ee().copy(C.matrixWorld).invert();ht.forEach(t=>t.applyMatrix4(e))}async function Vt(){let e=[];b.traverse(t=>{t.isMesh&&!t.visible&&(e.push(t),t.visible=!0)}),Ct(0,`foto`,0),await g.compileAsync(b,S);for(let t of e)t.visible=!1;await Ee.warm(performance.now()),g.shadowMap.needsUpdate=!0,g.render(b,S)}function Xt(e,t){W.width=Math.max(1,Math.round(e)),W.height=Math.max(1,Math.round(t)),S.aspect=W.width/W.height,S.fov=Gt,We=``,S.clearViewOffset(),S.updateProjectionMatrix(),g.setPixelRatio(gt()),g.setSize(W.width,W.height,!1)}return{scene:b,camera:S,cabinet:P,renderer:g,screen:Ee,get flatWords(){return Re},get brandBox(){return ot},configure({width:e,height:t,layout:n,split:r,scissor:i,wordBand:a=null}){Xt(e,t),G=n,K=r||{sx:1,sy:1,syBrand:1},n===`stacked`&&(K=Nt(K)),at=i||{act:0,brand:0},U.configure({fov:Gt,aspect:S.aspect,screen:L,cabinet:P},G,K),G===`desktop`&&a&&Ft(a),ot=null,G===`desktop`&&(Ct(d.brand,`foto`,0),ot=It()),Re=!1,G===`stacked`?Re=!At():G===`desktop`?Mt(a):J=Bt(G),kt(),qe=-1},async precompile(){await Vt(),h?.(1)},update({progress:n,now:r,dt:i,activityId:o,index:c,brandColor:l,introMix:u,playUrl:d=``,playName:h=``,stickers:_=[],lettering:y=``,pointer:ee=null}){g.info.reset(),n>=e.browseAt&&(qe>=0&&c!==qe&&(Ge=1,Ke=c>qe?1:-1),qe=c),Ge=Math.max(0,Ge-i/.38);let b=p?0:Math.sin(Ge*Math.PI),x=!1,S=s(n,a.coverFrom,a.sideIn),te=!!l||Array.isArray(_)&&_.length>0||String(y||``).trim()!==``;if(!Qe&&te&&n>=a.sideIn){l&&(X=l);let e=Array.isArray(_)?_:[];(e.length!==Je.length||e.some((e,t)=>e!==Je[t]))&&(Je=[...e]),Ye=String(y||``),Xe=!0}Xe&&n<a.sideIn&&(Xe=!1,Qe=!0,$e=S,x=!0);let ne=0;Qe?($e=Math.min($e,S),ne=$e,$e<=.001&&(Qe=!1,X=``,Je=[],Ye=``)):l&&(X=l,ne=S),(X!==et||Math.abs(ne-tt)>.002)&&(et=X,tt=ne,yt(X,ne));for(let e of Ne)e.update(Qe?Je:_,Qe?Ye:y,X||l||``,Qe?$e:S);let re=U.frameMix(n),ie=U.frameSide(n);Le=U.panelMix(n),Ie=s(n,e.brandAt,a.sideIn),q=u??m(n).intro,wt(re,Ie,q,ie,Le),St(n,ee,i),Ct(n,o,b),V.update(n,p),f(n,o,st),vt(st),H.update(r,st.haze),rt=n>=e.brandAt?`brand`:n>a.screenSwitch?n<a.menuOff?`menu`:o:n>=a.qrOn&&(h||d)?h?`player`:`qr`:`attract`;let isEyes=!1,ae=Lt();Ee.update(r,{mode:rt,visible:ae.visible,projectedPx:ae.projectedPx,playUrl:d,playName:h,menu:t(n),brand:Ue(l,_,y),eyes:isEyes});let w=C.rotation.y,oe=Math.abs(w-Ve)>1e-6;Ve=w;let se=Math.abs(w-Be);return v&&(se>.002||!oe&&se>1e-5)&&(Be=w,g.shadowMap.needsUpdate=!0),{punch:b,clearBrand:x,frameMix:re}},render(e=0){if(Y)return;let t=(at.play||at.act)+(at.act-(at.play||at.act))*Le,n=Math.max(t,at.brand)>0?t+(at.brand-t)*Ie:0,r=G===`stacked`&&n>0&&e>.999?Math.min(W.height,Math.ceil(n)):0;if(r&&r<W.height){g.setScissorTest(!1),g.clear(),g.setScissor(0,W.height-r,W.width,r),g.setScissorTest(!0);let e=g.autoClear;g.autoClear=!1,g.render(b,S),g.autoClear=e,g.setScissorTest(!1)}else g.render(b,S)},words(t,r){Et();let{glide:i,exit:o}=n(t),s={l:null,r:null,act:null};if(t>=a.wordsOn&&t<a.wordsOff&&!Re&&(s.l=Pt(r.l[0],r.l[1],Ht(J.l,i,o).map($)),s.r=Pt(r.r[0],r.r[1],Ht(J.r,i,o).map($))),G===`desktop`&&t>=a.actIn&&t<e.brandAt+.02&&(s.act=Pt(r.reel[0],r.reel[1],Rt.map($)),s.act&&r.reel[0]>0)){let e=$(Ut),t=$(Wt);s.reelStart=e.x+(t.x-e.x)*((r.reelInset||0)/r.reel[0]),s.reelRoom=r.reelLimit>0&&t.x>r.reelLimit?Ot(r.reelLimit):1}return s},band:It,setDprStep(e){Fe=Jt[Math.min(e,Jt.length-1)],g.setPixelRatio(gt()),g.setSize(W.width,W.height,!1)},degrade(e){e<=3&&this.setDprStep(e),e===4&&Ee.capLevel(1),e>=5&&H.setWisps(!1)},stats(){return{calls:g.info.render.calls,triangles:g.info.render.triangles,dpr:g.getPixelRatio(),screen:Ee.level}},dispose(){Y||(Y=!0,Ee.dispose(),H.dispose(),V.dispose(),Me.dispose(),b.environment=null,_e?.dispose(),k?.dispose(),b.traverse(e=>{if(!e.isMesh)return;e.geometry?.dispose();let t=Array.isArray(e.material)?e.material:[e.material];for(let e of t){for(let t of[`map`,`normalMap`,`roughnessMap`,`metalnessMap`,`emissiveMap`,`alphaMap`])e?.[t]&&e[t]!==Ee.texture&&e[t].dispose();e?.dispose()}}),g.dispose(),g.forceContextLoss())}}}export{Xt as createEngine};