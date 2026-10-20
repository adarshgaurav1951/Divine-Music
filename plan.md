# 🪔 Complete Master Implementation & Production Deployment Plan (`plan.md`)
**Project:** Divine Diwali & Shyama Puja Immersive WebGL Experience  
**Target Standard:** Real-World Production / Commercial-Grade Web Experience (60 FPS on Desktop & Mobile)

---

## 1. Executive Summary & Scene Choreography

The application blends two sacred Diwali narratives into an interconnected, panoramic real-time 3D environment:

### Zone A: Foreground & Left Flank — Shyama Peeth & Kali Mandir Courtyard
* **Hero Model (Maa Kali - Rudra Avatar):**
  * Iconic iconography based on authentic references: celestial midnight-blue skin, wide ferocious gaze, extended red tongue, glowing Trinetra (third eye), royal crown (*Mukut*), Mundamala (skull garland), waist ornament of severed hands/skulls, holding the scimitar (*Khadga*), trident, and sacrificial flame bowl.
  * Backed by a dynamic procedural fiery halo/aura shader and rim lighting.
* **Maha Aarti & Ritual Gathering:**
  * Temple priests and devotees performing Aarti with multi-tiered brass oil lamps (*pancha-pradeep*).
  * Devotee crowd archetypes: women in traditional red-bordered silk sarees, girls in salwar suits/lehengas, men in kurtas and dhotis offering pushpanjali.
* **Celebration & Atmosphere:**
  * Children safely bursting sparklers (*phooljhadi*) and ground fountain crackers (*anar*).
  * Temple monkeys (*vanaras*) resting and moving on mandir cornices and steps.
  * Soft billows of incense (*dhoop*) smoke drifting through the temple courtyard.

### Zone B: Mid-to-Background & Horizon — Ayodhya Aagman Corridor
* **The Royal Return:**
  * Shri Ram, Mata Sita, and Lakshman walking gracefully along an illuminated sacred pathway adorned with lotus petals and glowing diyas.
  * Shri Ram in yellow silk (*Peetambar*) with bow (*Kodanda*); Mata Sita in bridal red-gold; Lakshman in warrior attire.
* **Colossal Sankat Mochan (Viraat Hanuman Ji):**
  * Giant, towering Hanuman Ji walking reverently behind the divine trio.
  * Translucent golden godrays, knee-high swirling mist/clouds, and an ethereal halo connecting earth and sky.

---

## 2. Complete Technology Stack & Tooling

| Domain | Selected Technology | Purpose & Industry Standard |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router, TypeScript) / Vite + React | Modern component architecture, server-side asset caching, dynamic bundling. |
| **3D Engine** | Three.js via `@react-three/fiber` (R3F) | Declarative WebGL scene graph with reactive state management. |
| **3D Helpers** | `@react-three/drei` | Efficient loader helpers (`useGLTF`), instancing, camera controls, and preloading. |
| **Post-Processing** | `@react-three/postprocessing` | Selective Bloom, ACESFilmic tone mapping, depth-of-field, and volumetric godrays. |
| **Physics / Shaders** | Custom GLSL Vertex & Fragment Shaders | GPU compute particles (sparklers/smoke) and animated flame auras. |
| **Audio** | Howler.js | Spatial 3D positional audio zones and audio unlock management. |
| **Compression** | Google Draco + KTX2 / Basis Universal | Mesh geometry reduction (up to 85%) and direct GPU VRAM texture streaming. |
| **Animation Engine** | GSAP (GreenSock) + Three.js AnimationMixer | Cinematic camera choreography and character idle animations. |
| **Hosting & Edge CDN** | Vercel / Cloudflare Pages + AWS S3 / R2 | Edge-cached static delivery with Brotli and HTTP/3 support. |

---

## 3. High-Performance Engineering Architecture

To guarantee smooth 60 FPS performance without mobile crashes or WebGL context loss:

### A. Instanced Mesh Devotee Crowd Simulation
* Rather than rendering dozens of independent character models, the crowd utilizes **`InstancedMesh`** or **Vertex Animation Textures (VAT)**.
* **5 Base Mesh Archetypes:**
  1. Female Devotee (Saree)
  2. Female Devotee (Salwar Suit)
  3. Male Devotee (Kurta / Dhoti)
  4. Child (Sparkler Play)
  5. Temple Monkey (Vanara)
* Archetypes share a unified texture atlas. Variations in clothing colors are driven by per-instance GPU color attributes.
* Draw calls for the entire crowd are reduced from 100+ to under 10.

### B. GPU Particle Engine (Crackers, Flames, Smoke)
* **Firecrackers (*Phooljhadi* / *Anar*):** Rendered as instanced point-clouds driven completely by GLSL shaders on the GPU. No CPU physics computations per spark.
* **Aarti Flames & Incense Smoke:** 2D spritesheet emitters utilizing additive blending and depth-fade to eliminate hard clipping against geometry.
* **Diyas (Lamps):** Built using high-intensity emissive textures that trigger Bloom in post-processing. Physical Three.js dynamic lights are limited strictly to 4 primary scene key-lights.

### C. Technical Budgets & Memory Ceiling

| Asset Group | Triangle Limit | Texture Resolution | Target Draw Calls |
| :--- | :--- | :--- | :--- |
| **Maa Kali (Hero Model)** | 25,000 – 35,000 | 2048x2048 (KTX2) | 12 |
| **Giant Hanuman Ji** | 15,000 – 20,000 | 2048x2048 (KTX2) | 6 |
| **Shri Ram, Sita Ji, Lakshman** | 12,000 each | 1024x1024 (KTX2) | 12 (combined) |
| **Devotees & Monkeys** | 2,500 – 3,500 per type | 512x512 shared atlas | 5 (instanced) |
| **Temple & Ghat Architecture** | 30,000 total | 2048x2048 baked | 15 |
| **Total Scene Limits** | **< 160,000 triangles** | **< 150 MB GPU RAM** | **< 75 draw calls** |

---

## 4. What To Do vs. What NOT To Do (Guardrails)

### ❌ Strict Avoidance List (Common Pitfalls)
1. **Never load raw uncompressed `.obj` or `.fbx` files:** These multi-megabyte assets cause extreme load delays, UI freezing, and high bounce rates.
2. **Never place real dynamic lights on every Diya or lamp:** WebGL typically caps active dynamic lights at 8 per mesh, and multiple lights will degrade framerates to single digits.
3. **Never load uncompressed 4K textures:** Exceeding texture memory limits triggers browser `WebGL context lost` crashes, especially on mobile Safari and Android.
4. **Never autoplay unmuted sound:** Modern browsers automatically block unmuted audio contexts unless initiated by a user touch/click gesture.
5. **Never use dynamic particle strand hair:** Dynamic strand-based hair freezes WebGL; use polygon hair cards with normal maps and alpha cutoffs.

### ✅ Mandatory Best Practices
1. **Apply Draco & KTX2 Compression:** Process all `.glb` assets with `gltf-transform` to ensure instant streaming and minimal RAM footprint.
2. **Implement an Interactive Preloader:** Display a traditional loading screen with progress tracking (`useProgress`) and an explicit **"Click to Enter Darshan"** button to safely unlock audio.
3. **Adaptive Performance Scaling:** Integrate hardware detection (`detect-gpu`). Low-tier mobile devices will automatically disable heavy post-processing bloom, scale particle density down by 60%, and clamp DPR to 1.0.
4. **Physically Based Rendering (PBR):** Utilize an HDR Diwali starry night skybox balanced with warm ground-level ambient bounce from the lamps.

---

## 5. Audio Architecture & Spatial Zones

* **Audio Layer 1 (Maa Kali Zone):** Deep meditative low-frequency drone, rhythmic Bengali *Dhak* drums, brass *Kansar ghanta* bells, and Kali Stotram mantras.
* **Audio Layer 2 (Ayodhya Zone):** Gentle classical flute, sitar, and celebratory conch (*Shankhnaad*) reverberation.
* **Audio Layer 3 (Foreground SFX):** Positional sound effects for sparkling *phooljhadi* crackles and distant sky fireworks.

---

## 6. End-to-End Implementation Roadmap

```
Phase 1: Asset Preparation & Texturing Pipeline
 ├── Model sculpts / base meshes (Maa Kali, Ram Parivar, Hanuman Ji, Devotees)
 ├── Texture baking (Normal maps, Trim sheets, Lightmaps for the temple)
 ├── Rigging & idle animation loops (Aarti gestures, sparklers, crowd movement)
 └── Compression pipeline (Draco geometry + KTX2 texture encoding)
      │
Phase 2: R3F Canvas Staging & Scene Assembly
 ├── Dual-zone spatial positioning (Foreground Mandir vs. Background Ayodhya)
 ├── Camera rigging (Cinematic dolly transitions + restricted OrbitControls)
 └── PBR environment lighting (Diwali night HDRI + warm ground bounce)
      │
Phase 3: Custom Shaders & Particle Engines
 ├── Maa Kali fiery halo shader & glowing Trinetra
 ├── Volumetric godrays and cloud layers for Giant Hanuman Ji
 └── GPU sparklers, fountain crackers (*anars*), and floating glowing diyas
      │
Phase 4: Devotee Instancing & 3D Spatial Audio
 ├── GPU instanced crowd rendering with randomized color palettes
 ├── Monkey idle behaviors along mandir steps
 └── 3D positional audio zones via Howler.js with user interaction unlock
      │
Phase 5: Production Deployment & QA
 ├── Mobile hardware tiering (DPR clamping, fallback shaders)
 ├── Edge CDN asset caching on Vercel/Cloudflare Pages
 └── Cross-platform verification on iOS Safari, Android Chrome, and Desktop
```

---

## 7. Recommended Production Directory Structure

```text
diwali-divine-darshan/
├── public/
│   ├── audio/
│   │   ├── kali-aarti-ambience.mp3
│   │   ├── ayodhya-shankh-ambience.mp3
│   │   └── crackers-spatial.mp3
│   ├── models/
│   │   ├── maa-kali-rudra-draco.glb
│   │   ├── viraat-hanuman-draco.glb
│   │   ├── ram-sita-lakshman-draco.glb
│   │   ├── crowd-instanced-vat.glb
│   │   └── kali-mandir-baked.glb
│   └── textures/
│       └── diwali-night-sky.hdr
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Scene.tsx
│   │   │   ├── KaliCourtyardZone.tsx
│   │   │   ├── AyodhyaProcessionZone.tsx
│   │   │   ├── DevoteeCrowdInstances.tsx
│   │   │   ├── FirecrackerParticles.tsx
│   │   │   └── AartiFlames.tsx
│   │   ├── dom/
│   │   │   ├── Preloader.tsx
│   │   │   ├── AudioController.tsx
│   │   │   └── ViewpointSwitcher.tsx
│   ├── hooks/
│   │   ├── usePerformanceTier.ts
│   │   └── useSpatialAudio.ts
│   ├── shaders/
│   │   ├── fieryHaloShader.glsl
│   │   ├── godraysShader.glsl
│   │   └── flameShader.glsl
│   └── app/
│       ├── layout.tsx
│       └── page.tsx
├── package.json
└── next.config.mjs
```

---

## 8. Deployment Pre-Flight Checklist

- [ ] All `.glb` assets compressed via `gltf-transform optimize --draco.compress --texture-compress ktx2`.
- [ ] Total scene polygon budget verified under 160,000 triangles.
- [ ] Active draw calls verified under 75 via Three.js Stats or Spector.js.
- [ ] Audio playback locked behind the "Enter Darshan" interaction.
- [ ] Mobile DPR clamped to `Math.min(window.devicePixelRatio, 1.5)`.
- [ ] UI perspective switcher toggles smoothly between **"Maa Kali Aarti"** and **"Ayodhya Aagman"**.