import * as THREE from 'three';

/**
 * Custom GLSL Shaders for Divine Visual FX:
 * 1. Maa Kali Fiery Aura Shader
 * 2. Glowing Trinetra Shader
 * 3. Volumetric Godrays / Mist Shader
 */

export const FieryHaloShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColorCore;
    uniform vec3 uColorEdge;
    varying vec2 vUv;
    varying vec3 vNormal;

    // Simplex noise helper
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 centeredUv = vUv - 0.5;
      float dist = length(centeredUv);

      // Ring boundary
      float inner = 0.28;
      float outer = 0.5;
      float ring = smoothstep(inner, inner + 0.08, dist) * (1.0 - smoothstep(outer - 0.05, outer, dist));

      // Angular flame tongues
      float angle = atan(centeredUv.y, centeredUv.x);
      float flameNoise = snoise(vec2(angle * 3.5 + uTime * 0.8, dist * 6.0 - uTime * 1.5)) * 0.25;
      float flameSpikes = sin(angle * 16.0 + uTime * 2.0) * 0.06;

      float intensity = smoothstep(inner, outer, dist + flameNoise + flameSpikes);
      intensity = ring * (1.0 - intensity * 0.8);

      vec3 color = mix(uColorCore, uColorEdge, dist * 2.0);
      color += vec3(0.6, 0.4, 0.1) * flameNoise;

      gl_FragColor = vec4(color * 2.2, intensity * 0.95);
    }
  `
};

export const TrinetraShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vec2 uv = (vUv - 0.5) * 2.0;
      // Eye oval contour
      float eyeShape = 1.0 - (uv.x * uv.x * 0.8 + uv.y * uv.y * 3.0);
      eyeShape = clamp(eyeShape, 0.0, 1.0);

      // Inner pulsating cosmic flame
      float pulse = 0.85 + 0.15 * sin(uTime * 4.0);
      float glow = smoothstep(0.2, 1.0, eyeShape) * pulse;

      // Golden red core
      vec3 fieryEye = mix(vec3(1.0, 0.2, 0.05), vec3(1.0, 0.9, 0.3), eyeShape);
      gl_FragColor = vec4(fieryEye * 2.5, glow);
    }
  `
};

export const GodraysShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vWorldPos;
    void main() {
      vUv = uv;
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);
      vWorldPos = worldPosition.xyz;
      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 vWorldPos;

    void main() {
      // Top down cone falloff
      float cone = (1.0 - vUv.y);
      float beam = sin(vUv.x * 24.0 + uTime * 0.5) * 0.2 + 0.8;
      float alpha = cone * beam * 0.35 * smoothstep(0.0, 0.2, vUv.y);

      vec3 goldenLight = vec3(1.0, 0.85, 0.45);
      gl_FragColor = vec4(goldenLight, alpha);
    }
  `
};
