import{n as e}from"./rolldown-runtime-aKtaBQYM.js";import{t}from"./unicorn-background-preset-Co18sKzI.js";var n=`#version 300 es
precision highp float;

layout(location = 0) in vec2 aPosition;

out vec2 vTextureCoord;

void main() {
    vTextureCoord = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,r=`#version 300 es
precision highp float;

in vec2 vTextureCoord;

layout(location = 0) out vec4 bloomOut;
layout(location = 1) out vec4 filamentOut;

uniform vec2 uResolution;
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
    float saturation = hsv.y;
    float value = hsv.z;

    float chroma = value * saturation;
    float x = chroma * (1.0 - abs(mod(hue, 2.0) - 1.0));
    float match = value - chroma;

    vec3 rgb;
    if (hue < 1.0) {
        rgb = vec3(chroma, x, 0.0);
    } else if (hue < 2.0) {
        rgb = vec3(x, chroma, 0.0);
    } else if (hue < 3.0) {
        rgb = vec3(0.0, chroma, x);
    } else if (hue < 4.0) {
        rgb = vec3(0.0, x, chroma);
    } else if (hue < 5.0) {
        rgb = vec3(x, 0.0, chroma);
    } else {
        rgb = vec3(chroma, 0.0, x);
    }

    return rgb + match;
}

float mixHue(float fromHue, float toHue, float t) {
    float delta = mod(toHue - fromHue + 1.5, 1.0) - 0.5;
    return fract(fromHue + delta * t);
}

vec3 mixNeonColor(vec3 fromColor, vec3 toColor, float t) {
    vec3 fromHsv = rgbToHsv(fromColor);
    vec3 toHsv = rgbToHsv(toColor);
    vec3 mixed = vec3(
        mixHue(fromHsv.x, toHsv.x, t),
        mix(fromHsv.y, toHsv.y, t),
        mix(fromHsv.z, toHsv.z, t)
    );
    return hsvToRgb(mixed);
}

void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 p = (vTextureCoord - uPos) * vec2(aspect, 1.0);

    p = rot2d(radians(uFrameCount.z)) * p;
    p.y /= cos(radians(uFrameCount.y));

    float numFrames = 10.0 + mod(abs(uFrameCount.x), 50.0);
    float pulseRange = uPulseWidth * 0.15 + 0.05;
    float cycle = fract(uTime * 0.02);
    // Starts below 0 (fully dark) → enters tunnel → exits past 1 (fully dark) → wrap while dark.
    float travel = mix(-pulseRange, 1.0 + pulseRange, cycle);
    float colorT = smoothstep(0.0, 1.0, clamp(travel, 0.0, 1.0));
    vec3 neonColor = colorT < 0.5
        ? mixNeonColor(uNeonColor, uNeonColorMid, colorT * 2.0)
        : mixNeonColor(uNeonColorMid, uNeonColorEnd, (colorT - 0.5) * 2.0);

    vec3 bloomAccumulation = vec3(0.0);
    vec3 filamentColor = vec3(0.0);
    float bloomPixelSize = 2.0 / min(uResolution.x, uResolution.y);
    float filamentPixelSize = 1.5 / min(uResolution.x, uResolution.y);

    for (int i = 0; i < 40; i++) {
        if (float(i) >= numFrames) {
            break;
        }

        float framePosition = float(i) / numFrames;
        float scale = exp((framePosition - 1.0) * 4.0);
        float lit = invertedSmoothstep(
            pulseRange,
            abs(framePosition - travel)
        );

        if (lit > 0.0) {
            float flicker = 1.0 - uFlickerAmount * (
                dotNoise(vec3(framePosition * 40.0, uTime * 0.15, 0.0))
                * 0.5 + 0.5
            );
            vec2 frameSize = vec2(uRectScale * aspect, uRectScale) * scale;
            float cornerRadius = min(frameSize.x, frameSize.y) * 0.16;
            float distanceToFrame = sdRoundedRect(p, frameSize, cornerRadius);
            float absDist = abs(distanceToFrame);

            float bloomSource = invertedSmoothstep(
                bloomPixelSize * 36.0 * scale,
                absDist
            );
            bloomAccumulation += neonColor * lit * flicker * bloomSource;

            float sharp = invertedSmoothstep(
                filamentPixelSize * 5.5,
                absDist
            );
            float core = invertedSmoothstep(
                filamentPixelSize * 2.2,
                absDist
            );

            filamentColor += neonColor * lit * flicker
                * (sharp * 0.55 + core * 0.95);
        }
    }

    bloomOut = vec4(bloomAccumulation, 1.0);
    filamentOut = vec4(filamentColor, 1.0);
}
`,i=`#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 fragColor;

uniform sampler2D uTexture;
uniform vec2 uResolution;

void main() {
    vec2 uv = vTextureCoord;
    float offset = 2.0 / uResolution.x;
    vec4 sum = texture(uTexture, uv) * 0.227027;
    sum += texture(uTexture, uv + vec2(offset * 1.384615, 0.0)) * 0.316216;
    sum += texture(uTexture, uv - vec2(offset * 1.384615, 0.0)) * 0.316216;
    sum += texture(uTexture, uv + vec2(offset * 3.230769, 0.0)) * 0.070270;
    sum += texture(uTexture, uv - vec2(offset * 3.230769, 0.0)) * 0.070270;
    fragColor = sum;
}
`,a=`#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 fragColor;

uniform sampler2D uTexture;
uniform vec2 uResolution;

void main() {
    vec2 uv = vTextureCoord;
    float offset = 2.0 / uResolution.y;
    vec4 sum = texture(uTexture, uv) * 0.227027;
    sum += texture(uTexture, uv + vec2(0.0, offset * 1.384615)) * 0.316216;
    sum += texture(uTexture, uv - vec2(0.0, offset * 1.384615)) * 0.316216;
    sum += texture(uTexture, uv + vec2(0.0, offset * 3.230769)) * 0.070270;
    sum += texture(uTexture, uv - vec2(0.0, offset * 3.230769)) * 0.070270;
    fragColor = sum;
}
`,o=`#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 fragColor;

// Blurred bloom (may be lower-res; LINEAR upsample) + sharp filament.
uniform sampler2D uBloomTexture;
uniform sampler2D uFilamentTexture;
uniform float uGlowIntensity;

void main() {
    vec2 uv = vTextureCoord;
    vec3 filament = texture(uFilamentTexture, uv).rgb;
    vec3 bloom = texture(uBloomTexture, uv).rgb;

    vec3 finalNeon = filament + bloom * uGlowIntensity * 3.0;
    float alpha = clamp(length(finalNeon) * 1.5, 0.0, 1.0);
    // Black background (preset); same as mix(vec3(0.0), finalNeon, alpha).
    fragColor = vec4(finalNeon * alpha, alpha);
}
`,s=`#version 300 es
precision highp float;

in vec2 vTextureCoord;
out vec4 fragColor;

// Input: the fully composited scene below this Retro screen layer.
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float uTime;       // Elapsed time in seconds.

// Preset matching the supplied Unicorn Studio screenshot:
// uPos        = vec2(0.50, 0.50)
// uScale      = 0.77
// uGamma      = 0.84
// uFuzziness  = 0.24
// uBarrel     = 0.22
// uVignette   = 0.40
// uMix        = 1.00
// uFlicker    = 0.35
// uSpeed      = 0.42
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

    // Positive values bend the image outward like a convex CRT tube.
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

    // Per-scanline jitter imitates a slightly unstable analogue signal.
    float scanline = floor(uv.y * uResolution.y);
    float frame = floor(time * 60.0);
    float jitter = (hash11(scanline + frame * 17.0) - 0.5)
        * fuzz * 1.25 * texel.x;
    vec2 baseUv = uv + vec2(jitter, 0.0);

    vec3 centre = texture(uTexture, clamp(baseUv, 0.0, 1.0)).rgb;

    // Cheap path: centre + RGB shift only (2 texture samples total with centre).
    if (fuzz < 0.3) {
        float channelShift = mix(0.15, 1.40, fuzz) * texel.x;
        vec3 softened = centre;
        softened.r = mix(
            softened.r,
            texture(uTexture, clamp(baseUv + vec2(channelShift, 0.0), 0.0, 1.0)).r,
            fuzz * 0.55
        );
        softened.b = mix(
            softened.b,
            texture(uTexture, clamp(baseUv - vec2(channelShift, 0.0), 0.0, 1.0)).b,
            fuzz * 0.55
        );
        return mix(centre, softened, fuzz);
    }

    float radius = mix(0.25, 2.75, fuzz);
    vec3 left = texture(
        uTexture,
        clamp(baseUv - vec2(radius * texel.x, 0.0), 0.0, 1.0)
    ).rgb;
    vec3 right = texture(
        uTexture,
        clamp(baseUv + vec2(radius * texel.x, 0.0), 0.0, 1.0)
    ).rgb;

    vec3 softened = centre * 0.60 + (left + right) * 0.20;

    // A small RGB separation creates phosphor bleed without obvious fringing.
    float channelShift = mix(0.15, 1.40, fuzz) * texel.x;
    softened.r = mix(
        softened.r,
        texture(uTexture, clamp(baseUv + vec2(channelShift, 0.0), 0.0, 1.0)).r,
        fuzz * 0.55
    );
    softened.b = mix(
        softened.b,
        texture(uTexture, clamp(baseUv - vec2(channelShift, 0.0), 0.0, 1.0)).b,
        fuzz * 0.55
    );

    return mix(centre, softened, fuzz);
}

vec3 quantizeRgb565(vec3 color) {
    // Conventional 16-bit colour: 5 red, 6 green and 5 blue bits.
    const vec3 levels = vec3(31.0, 63.0, 31.0);
    return floor(clamp(color, 0.0, 1.0) * levels + 0.5) / levels;
}

vec3 phosphorMask(float x) {
    float channel = mod(floor(x), 3.0);

    if (channel < 1.0) {
        return vec3(1.06, 0.88, 0.88);
    }
    if (channel < 2.0) {
        return vec3(0.88, 1.06, 0.88);
    }
    return vec3(0.88, 0.88, 1.06);
}

void main() {
    vec2 uv = vTextureCoord;
    vec4 original = texture(uTexture, uv);

    // Pre-zoom toward centre so mild barrel warp still fills the screen edges.
    float barrelAmount = clamp(uBarrel, 0.0, 1.0);
    float zoom = 1.0 / (1.0 + barrelAmount * 0.28);
    vec2 zoomedUv = uPos + (uv - uPos) * zoom;

    vec2 warpedUv = barrelWarp(zoomedUv);
    float inside = insideUnitSquare(warpedUv);

    float speed = max(uSpeed, 0.01);
    float animationTime = uTime * speed;
    vec3 color = sampleFuzzySignal(warpedUv, animationTime) * inside;

    // The supplied 84% gamma setting maps naturally to a 0.84 exponent value.
    float gammaValue = max(uGamma, 0.25);
    color = pow(max(color, 0.0), vec3(1.0 / gammaValue));
    color = quantizeRgb565(color);

    // Scale controls the apparent size of the scanline and RGB-mask pattern.
    float patternScale = mix(0.75, 1.35, clamp(uScale, 0.0, 1.0));
    vec2 crtPixel = warpedUv * uResolution / patternScale;
    const float TAU = 6.28318530718;
    float scanline = 0.78 + 0.22 * sin(crtPixel.y * TAU);
    vec3 mask = phosphorMask(crtPixel.x);
    color *= scanline * mask * 1.10;

    // Soft rolling brightness variation plus low-amplitude frame flicker.
    float flickerAmount = clamp(uFlicker, 0.0, 1.0);
    float frameNoise = hash11(floor(animationTime * 60.0)) - 0.5;
    float fastFlicker = sin(animationTime * 83.0) * 0.5 + frameNoise;
    float rollingBand = sin((warpedUv.y - animationTime * 0.18) * TAU);
    color *= 1.0
        + fastFlicker * flickerAmount * 0.022
        + rollingBand * flickerAmount * 0.012;

    // Symmetric CRT edge darkening, controlled by the supplied vignette value.
    vec2 edge = clamp(warpedUv * (1.0 - warpedUv), 0.0, 1.0);
    float vignetteBase = clamp(16.0 * edge.x * edge.y, 0.0, 1.0);
    float vignettePower = mix(0.05, 0.85, clamp(uVignette, 0.0, 1.0));
    float vignette = pow(vignetteBase, vignettePower);
    color *= vignette * inside;

    color = clamp(color, 0.0, 1.0);
    fragColor = vec4(mix(original.rgb, color, clamp(uMix, 0.0, 1.0)), original.a);
}
`,c=t.neonFilamentTunnel,l=t.retroScreen,u=t.rendering,d=Object.freeze({backgroundColor:t.background?.color??`#000000`,maxDevicePixelRatio:u?.maxDevicePixelRatio??1.25,maxBufferEdge:u?.maxBufferEdge??1920,preferredFps:u?.preferredFps??30,bloomPasses:u?.bloomPasses??1,sceneScale:u?.sceneScale??.7,neon:Object.freeze({uPos:c.uPos,uFrameCount:c.uFrameCount,uRectScale:c.uRectScale,uPulseWidth:c.uPulseWidth,uNeonColor:c.uNeonColor,uNeonColorMid:c.uNeonColorMid??[0,.85,1],uNeonColorEnd:c.uNeonColorEnd,uFlickerAmount:c.uFlickerAmount,uGlowIntensity:c.uGlowIntensity,uBlendMode:c.uBlendMode,timeMultiplier:c.timeMultiplier}),retro:Object.freeze({uPos:l.uPos,uScale:l.uScale,uGamma:l.uGamma,uFuzziness:l.uFuzziness,uBarrel:l.uBarrel,uVignette:l.uVignette,uMix:l.uMix,uFlicker:l.uFlicker,uSpeed:l.uSpeed})}),f=e({createNeonCrtRenderer:()=>x}),p=.5,ee=.7;function m(e){let t=/^#?([0-9A-Fa-f]{6})$/.exec(String(e||``).trim());if(!t)return null;let n=Number.parseInt(t[1],16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}function h(e,t,n,r){let i=e.createShader(t);if(!i)throw Error(`[neon-crt] Failed to create shader: ${r}`);if(e.shaderSource(i,n),e.compileShader(i),!e.getShaderParameter(i,e.COMPILE_STATUS)){let t=e.getShaderInfoLog(i)||`unknown compile error`;throw e.deleteShader(i),Error(`[neon-crt] Shader compile failed (${r}): ${t}`)}return i}function g(e,t,n,r){let i=h(e,e.VERTEX_SHADER,t,`${r}.vert`),a=h(e,e.FRAGMENT_SHADER,n,`${r}.frag`),o=e.createProgram();if(!o)throw e.deleteShader(i),e.deleteShader(a),Error(`[neon-crt] Failed to create program: ${r}`);if(e.attachShader(o,i),e.attachShader(o,a),e.linkProgram(o),e.deleteShader(i),e.deleteShader(a),!e.getProgramParameter(o,e.LINK_STATUS)){let t=e.getProgramInfoLog(o)||`unknown link error`;throw e.deleteProgram(o),Error(`[neon-crt] Program link failed (${r}): ${t}`)}return o}function _(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<r;i+=1){let r=e.getActiveUniform(t,i);r&&(n[r.name]=e.getUniformLocation(t,r.name))}return n}function v(e,t,n){let r=e.createTexture();if(!r)throw Error(`[neon-crt] Failed to create texture`);return e.bindTexture(e.TEXTURE_2D,r),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,e.RGBA8,t,n,0,e.RGBA,e.UNSIGNED_BYTE,null),e.bindTexture(e.TEXTURE_2D,null),r}function y(e,t,n){let r=v(e,t,n),i=e.createFramebuffer();if(!i)throw e.deleteTexture(r),Error(`[neon-crt] Failed to create framebuffer`);e.bindFramebuffer(e.FRAMEBUFFER,i),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0);let a=e.checkFramebufferStatus(e.FRAMEBUFFER);if(e.bindFramebuffer(e.FRAMEBUFFER,null),a!==e.FRAMEBUFFER_COMPLETE)throw e.deleteTexture(r),e.deleteFramebuffer(i),Error(`[neon-crt] Incomplete framebuffer (0x${a.toString(16)})`);return{texture:r,framebuffer:i,width:t,height:n}}function te(e,t,n){let r=v(e,t,n),i=v(e,t,n),a=e.createFramebuffer();if(!a)throw e.deleteTexture(r),e.deleteTexture(i),Error(`[neon-crt] Failed to create MRT framebuffer`);e.bindFramebuffer(e.FRAMEBUFFER,a),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT1,e.TEXTURE_2D,i,0),e.drawBuffers([e.COLOR_ATTACHMENT0,e.COLOR_ATTACHMENT1]);let o=e.checkFramebufferStatus(e.FRAMEBUFFER);if(e.bindFramebuffer(e.FRAMEBUFFER,null),o!==e.FRAMEBUFFER_COMPLETE)throw e.deleteTexture(r),e.deleteTexture(i),e.deleteFramebuffer(a),Error(`[neon-crt] Incomplete MRT framebuffer (0x${o.toString(16)})`);return{bloomTexture:r,filamentTexture:i,framebuffer:a,width:t,height:n}}function b(e,t){t.texture&&=(e.deleteTexture(t.texture),null),t.bloomTexture&&=(e.deleteTexture(t.bloomTexture),null),t.filamentTexture&&=(e.deleteTexture(t.filamentTexture),null),t.framebuffer&&=(e.deleteFramebuffer(t.framebuffer),null)}function x(e,t={}){let c=e.getContext(`webgl2`,{alpha:!1,antialias:!1,depth:!1,stencil:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!!t.preserveDrawingBuffer});if(!c)return{ok:!1,resize(){},start(){},stop(){},dispose(){},renderStill(){},renderAt(){},pauseForVisibility(){},resumeFromVisibility(){},setNeonColors(){}};let l=d,u=!1,f=!1,h=0,v=1,x=1,S=1,C=1,w=1,T=1,E=1,D=0,O=0,k=0,ne=Math.min(1,Math.max(.25,l.sceneScale??ee)),re=1e3/Math.max(1,l.preferredFps||30),A=[...l.neon.uNeonColor],j=[...l.neon.uNeonColorMid??[0,.85,1]],M=[...l.neon.uNeonColorEnd],N=null,P=null,F=null,I=null,L=null,R={},z={},B={},ie={},ae={},V=null,H=null,U={bloomTexture:null,filamentTexture:null,framebuffer:null,width:0,height:0},W={texture:null,framebuffer:null,width:0,height:0},G={texture:null,framebuffer:null,width:0,height:0},K={texture:null,framebuffer:null,width:0,height:0},q=!1;function oe(){N=g(c,n,r,`neon-tunnel-mrt`),P=g(c,n,i,`bloom-blur-horizontal`),F=g(c,n,a,`bloom-blur-vertical`),I=g(c,n,o,`neon-lite-composite`),L=g(c,n,s,`retro-screen-crt`),R=_(c,N),z=_(c,P),B=_(c,F),ie=_(c,I),ae=_(c,L)}function se(){if(V=c.createVertexArray(),H=c.createBuffer(),!V||!H)throw Error(`[neon-crt] Failed to create fullscreen quad`);c.bindVertexArray(V),c.bindBuffer(c.ARRAY_BUFFER,H);let e=new Float32Array([-1,-1,1,-1,-1,1,1,1]);c.bufferData(c.ARRAY_BUFFER,e,c.STATIC_DRAW),c.enableVertexAttribArray(0),c.vertexAttribPointer(0,2,c.FLOAT,!1,0,0),c.bindVertexArray(null),c.bindBuffer(c.ARRAY_BUFFER,null)}function J(e,t){b(c,U),b(c,W),b(c,G),b(c,K),S=Math.max(1,Math.floor(e*ne)),C=Math.max(1,Math.floor(t*ne)),w=Math.max(1,Math.floor(S*p)),T=Math.max(1,Math.floor(C*p)),U=te(c,S,C),W=y(c,w,T),G=y(c,w,T),K=y(c,S,C)}function Y(e,t,n,r,i,a,o=null){c.bindFramebuffer(c.FRAMEBUFFER,n),n&&o?c.drawBuffers(o):n&&c.drawBuffers([c.COLOR_ATTACHMENT0]),c.viewport(0,0,r,i),c.useProgram(e),a(t),c.bindVertexArray(V),c.drawArrays(c.TRIANGLE_STRIP,0,4),c.bindVertexArray(null)}function ce(e,t,n,r){let i=l.neon;e.uResolution&&c.uniform2f(e.uResolution,n,r),e.uTime&&c.uniform1f(e.uTime,t),e.uPos&&c.uniform2f(e.uPos,i.uPos[0],i.uPos[1]),e.uFrameCount&&c.uniform3f(e.uFrameCount,i.uFrameCount[0],i.uFrameCount[1],i.uFrameCount[2]),e.uRectScale&&c.uniform1f(e.uRectScale,i.uRectScale),e.uPulseWidth&&c.uniform1f(e.uPulseWidth,i.uPulseWidth),e.uNeonColor&&c.uniform3f(e.uNeonColor,A[0],A[1],A[2]),e.uNeonColorMid&&c.uniform3f(e.uNeonColorMid,j[0],j[1],j[2]),e.uNeonColorEnd&&c.uniform3f(e.uNeonColorEnd,M[0],M[1],M[2]),e.uFlickerAmount&&c.uniform1f(e.uFlickerAmount,i.uFlickerAmount)}function le(e={}){let t=m(e.start),n=m(e.mid),r=m(e.end);t&&(A=t),n&&(j=n),r&&(M=r)}function X(e){if(u||q||!N)return;let t=e*l.neon.timeMultiplier;Y(N,R,U.framebuffer,S,C,e=>{ce(e,t,S,C)},[c.COLOR_ATTACHMENT0,c.COLOR_ATTACHMENT1]);let n=Math.max(1,l.bloomPasses|0),r=U.bloomTexture;for(let e=0;e<n;e+=1)Y(P,z,W.framebuffer,w,T,e=>{e.uResolution&&c.uniform2f(e.uResolution,w,T),e.uTexture&&(c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,r),c.uniform1i(e.uTexture,0))}),Y(F,B,G.framebuffer,w,T,e=>{e.uResolution&&c.uniform2f(e.uResolution,w,T),e.uTexture&&(c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,W.texture),c.uniform1i(e.uTexture,0))}),r=G.texture;Y(I,ie,K.framebuffer,S,C,e=>{e.uGlowIntensity&&c.uniform1f(e.uGlowIntensity,l.neon.uGlowIntensity),e.uFilamentTexture&&(c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,U.filamentTexture),c.uniform1i(e.uFilamentTexture,0)),e.uBloomTexture&&(c.activeTexture(c.TEXTURE1),c.bindTexture(c.TEXTURE_2D,G.texture),c.uniform1i(e.uBloomTexture,1))});let i=l.retro;Y(L,ae,null,v,x,t=>{t.uResolution&&c.uniform2f(t.uResolution,v,x),t.uTime&&c.uniform1f(t.uTime,e),t.uPos&&c.uniform2f(t.uPos,i.uPos[0],i.uPos[1]),t.uScale&&c.uniform1f(t.uScale,i.uScale),t.uGamma&&c.uniform1f(t.uGamma,i.uGamma),t.uFuzziness&&c.uniform1f(t.uFuzziness,i.uFuzziness),t.uBarrel&&c.uniform1f(t.uBarrel,i.uBarrel),t.uVignette&&c.uniform1f(t.uVignette,i.uVignette),t.uMix&&c.uniform1f(t.uMix,i.uMix),t.uFlicker&&c.uniform1f(t.uFlicker,i.uFlicker),t.uSpeed&&c.uniform1f(t.uSpeed,i.uSpeed),t.uTexture&&(c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,K.texture),c.uniform1i(t.uTexture,0))})}function ue(){return!f||!D?O:O+(performance.now()-D)/1e3}function de(e){!f||u||q||(h=requestAnimationFrame(de),!(k&&e-k<re)&&(k=e,X(ue())))}function fe(t,n,r=window.devicePixelRatio||1){if(u||q||!(t>=2)||!(n>=2))return;let i=Math.min(Math.max(r,1),l.maxDevicePixelRatio),a=Math.max(1,Math.floor(t*i)),o=Math.max(1,Math.floor(n*i)),s=Math.max(1,l.maxBufferEdge|0),d=Math.max(a,o);if(d>s){let e=s/d;a=Math.max(1,Math.floor(a*e)),o=Math.max(1,Math.floor(o*e))}if(a===v&&o===x&&i===E)return;let f=v,p=x,ee=E;try{E=i,v=a,x=o,e.width=v,e.height=x,J(v,x),c.viewport(0,0,v,x)}catch{try{v=Math.max(1,Math.floor(a*.5)),x=Math.max(1,Math.floor(o*.5)),E=i,e.width=v,e.height=x,J(v,x),c.viewport(0,0,v,x)}catch{v=f,x=p,E=ee;try{e.width=v,e.height=x,J(v,x),c.viewport(0,0,v,x)}catch{}}}}function Z(){if(!(u||q||f)){if(t.reducedMotion){$();return}f=!0,D=performance.now(),k=0,h=requestAnimationFrame(de)}}function Q(){f=!1,h&&=(cancelAnimationFrame(h),0)}function pe(){f&&(O=ue(),Q())}function me(){u||q||t.reducedMotion||f||Z()}function $(){u||q||X(0)}function he(e){u||q||X(e)}function ge(){if(!u){u=!0,Q(),b(c,U),b(c,W),b(c,G),b(c,K),H&&=(c.deleteBuffer(H),null),V&&=(c.deleteVertexArray(V),null);for(let e of[N,P,F,I,L])e&&c.deleteProgram(e);N=null,P=null,F=null,I=null,L=null;try{c?.getExtension(`WEBGL_lose_context`)?.loseContext()}catch{}}}function _e(e){e.preventDefault(),q=!0,Q()}function ve(){q=!1;try{oe(),se();let n=Math.max(2,e.clientWidth||2),r=Math.max(2,e.clientHeight||2);v=0,x=0,E=0,fe(n,r,window.devicePixelRatio||1),t.reducedMotion?$():Z()}catch{}}try{return oe(),se(),e.addEventListener(`webglcontextlost`,_e),e.addEventListener(`webglcontextrestored`,ve),{ok:!0,resize:fe,start:Z,stop:Q,pauseForVisibility:pe,resumeFromVisibility:me,renderStill:$,renderAt:he,setNeonColors:le,dispose(){e.removeEventListener(`webglcontextlost`,_e),e.removeEventListener(`webglcontextrestored`,ve),ge()}}}catch{return ge(),{ok:!1,resize(){},start(){},stop(){},pauseForVisibility(){},resumeFromVisibility(){},renderStill(){},renderAt(){},setNeonColors(){},dispose(){}}}}export{f as n,d as r,x as t};