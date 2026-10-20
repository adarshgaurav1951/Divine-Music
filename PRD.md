# 🪔 Product Requirements Document (PRD)

**Project Name:** Divine Diwali & Shyama Puja Immersive WebGL Experience  
**Codename:** *Divine Darshan 3D*  
**Document Version:** 1.0.0  
**Status:** Approved for Implementation  
**Target Standard:** Commercial-Grade Web Experience (60 FPS on Desktop & Mobile)  
**Primary Reference:** [`plan.md`](file:///home/adarsh/Documents/Diwali/plan.md)

---

## 1. Executive Summary & Product Vision

### 1.1 Vision Statement
The **Divine Diwali & Shyama Puja Immersive WebGL Experience** is a state-of-the-art interactive 3D web application designed to bring the transcendent spirit, visual splendor, and spiritual depth of Diwali and Kali Puja to a global digital audience. 

The application seamlessly weaves two revered epic narratives into a unified, panoramic real-time 3D environment:
1. **Shyama Peeth & Kali Mandir Courtyard:** The fierce divine grace of Maa Kali's Rudra avatar during deep-night Shyama Puja, illuminated by burning incense, brass *pancha-pradeep* Aarti flames, temple bells, and joyful devotee celebrations with sparklers and fountain crackers.
2. **Ayodhya Aagman Corridor:** The majestic, golden return of Maryada Purushottam Shri Ram, Mata Sita, and Lakshman along a sacred pathway lined with floating diyas and lotus petals, protected by the colossal, towering presence of Viraat Sankat Mochan Hanuman Ji emerging from celestial mist and godrays.

### 1.2 Core Value Proposition
- **Authentic Cultural Representation:** Faithful adherence to sacred iconography, traditional rituals, attire, and festive atmosphere.
- **Zero-Barrier Accessibility:** Instantly accessible in modern web browsers across desktop, tablet, and mobile devices without app store downloads or VR headset requirements.
- **Cinematic Production Quality:** Leveraging cutting-edge WebGL graphics (PBR lighting, custom GLSL shaders, selective bloom, spatial audio) while strictly respecting mobile thermal and memory limits.

---

## 2. Target Audience, Personas & User Journeys

### 2.1 Target Audience
- **Global Devotees & Diaspora:** Individuals and families seeking an authentic, uplifting darshan and festive celebration from anywhere in the world.
- **Cultural & Heritage Enthusiasts:** Users exploring Hindu traditions, sacred mythology, and festive iconography.
- **Creative Web & 3D Enthusiasts:** Developers, designers, and digital artists drawn to cutting-edge WebGL, Three.js/R3F implementations, and high-fidelity real-time rendering.

### 2.2 User Personas
- **Persona A — "The Global Devotee" (Aarav, 28, London):** Accesses via mobile phone on Diwali night. Needs fast load time, instant intuitive darshan, immersive Aarti audio, and simple controls to offer prayers or switch views.
- **Persona B — "The Family Celebrator" (Sunita, 52, Kolkata):** Views on an iPad or laptop. Enjoys listening to the rhythmic Bengali Dhak and Vedic chants, watching the sparklers, and viewing Shri Ram's royal return.
- **Persona C — "The Tech & Design Critic" (Marcus, 31, San Francisco):** Assesses frame rates, post-processing bloom quality, shader fidelity, mobile responsiveness, and smooth camera choreography.

### 2.3 Primary User Journey
```
1. Landing & Asset Preload
   └── Dynamic progress bar, festive iconography & spiritual lore snippet
2. Gate Interaction ("Click to Enter Darshan")
   └── Unlocks Web Audio Context & transitions camera into the scene
3. Zone Discovery & Exploration
   ├── Default Viewpoint: Maa Kali Courtyard (Aarti sounds, sparklers, dhoop smoke)
   ├── Perspective Switcher: Toggle to Ayodhya Aagman (Shankhnaad, godrays, giant Hanuman Ji)
   └── Interactive Orbit: Free-look mode with angle and distance clamping
4. Interactive Micro-engagements
   ├── Audio toggle (Spatial 3D sound vs. serene ambient mode)
   ├── Sparkler/Anar interactive burst trigger
   └── Cultural info drawers (explaining the significance of each deity and ritual)
```

---

## 3. Core Product Goals & Success Metrics (KPIs)

| Metric Category | Target Key Performance Indicator (KPI) | Measurement Method |
| :--- | :--- | :--- |
| **Performance** | Constant 60 FPS (≥ 55 FPS on Tier-2 mobile; 60 FPS on Desktop) | In-app performance monitor / `stats-gl` |
| **Load Efficiency** | Initial load < 3.5 seconds on 4G / standard broadband | Lighthouse / Web Vitals |
| **Total Asset Weight** | Compressed bundle < 12 MB total initial payload | Network tab (Draco + KTX2 assets) |
| **Memory Ceiling** | GPU VRAM consumption < 150 MB (prevent WebGL context loss) | Chrome DevTools Memory Profiler |
| **Draw Call Budget** | Total active draw calls < 75 at all camera angles | Three.js renderer info / Spector.js |
| **Audio Compliance** | 100% compliant with browser autoplay policies (zero unmuted autoplay failures) | Automated browser test suite |
| **User Engagement** | Average session duration > 2.5 minutes; > 60% viewpoint toggle engagement | Web analytics / telemetry |

---

## 4. Feature Specifications & Functional Requirements

### 4.1 Interactive Entry & Audio Unlock Gateway (Preloader)
- **FR-1.1:** Present an atmospheric preloader overlay featuring gold/midnight-blue aesthetics, traditional motifs (*Alpona/Rangoli*), and a numeric loading percentage tracked via R3F `useProgress`.
- **FR-1.2:** Block automatic audio playback until explicit user interaction, fulfilling strict browser autoplay compliance.
- **FR-1.3:** Provide a prominent, beautifully styled button: **"🪔 Click to Enter Darshan"** that initializes the Web Audio context, hides the preloader, and triggers the opening cinematic camera dolly into Zone A.
- **FR-1.4:** Graceful network error handling with retry functionality if 3D assets fail to download.

### 4.2 Dual-Zone 3D Panoramic World

#### Zone A: Shyama Peeth & Kali Mandir Courtyard (Foreground & Left Flank)
- **FR-2.1 Hero Model (Maa Kali - Rudra Avatar):**
  - Midnight-blue skin tone, fierce expression, wide eyes, extended red tongue, glowing Trinetra (third eye).
  - Royal crown (*Mukut*), Mundamala (skull garland), waist ornament of severed hands/skulls.
  - Wielding the scimitar (*Khadga*), trident, and sacrificial flame bowl.
  - Backed by an animated procedural fiery halo/aura GLSL fragment shader and rim lighting.
- **FR-2.2 Maha Aarti Gathering:**
  - Head temple priest performing rhythmic Aarti movements with multi-tiered brass oil lamps (*pancha-pradeep*).
  - Devotees positioned in front of the sanctum sanctorum offering pushpanjali.
- **FR-2.3 Festive Courtyard Atmosphere:**
  - Children holding and waving safe sparklers (*phooljhadi*) emitting dynamic GPU sparks.
  - Ground fountain crackers (*anar*) firing cascading gold/silver particle fountains at timed intervals.
  - Billowing volumetric incense (*dhoop*) smoke drifting through the mandir stone pillars and arches.
  - Temple monkeys (*vanaras*) resting, perching, and idling naturally along mandir cornices and steps.

#### Zone B: Ayodhya Aagman Corridor (Mid-to-Background & Horizon)
- **FR-2.4 The Royal Return (Ram Parivar):**
  - Shri Ram in auspicious yellow silk (*Peetambar*) holding his divine bow (*Kodanda*).
  - Mata Sita in bridal red-gold attire radiating divine serenity.
  - Lakshman in royal warrior attire standing watchfully beside them.
  - Elevated sacred pathway adorned with scattered pink/red lotus petals and hundreds of glowing terracotta diyas.
- **FR-2.5 Viraat Sankat Mochan (Giant Hanuman Ji):**
  - Colossal, towering scale standing reverently behind the divine trio.
  - Enveloped in soft knee-high swirling mist/cloud layers.
  - Volumetric golden godrays streaming from above his shoulders down to the procession path.
  - Ethereal golden halo illuminating the connection between earth and sky.

### 4.3 Camera Choreography & Perspective Controls
- **FR-3.1 Perspective Switcher UI:**
  - Floating, non-intrusive HUD toggle with two primary preset modes:
    1. **"Maa Kali Aarti" View:** Low-to-mid angle focusing on the temple courtyard, Aarti lamps, and the ferocious beauty of Maa Kali.
    2. **"Ayodhya Aagman" View:** Elevated cinematic vantage point tracking the illuminated sacred path, Ram Parivar, and towering Hanuman Ji.
- **FR-3.2 Smooth Transitions:**
  - Camera transitions executed via GSAP smooth bezier interpolation (duration: 1.8s, ease: `power3.inOut`) to eliminate jarring cuts or disorientation.
- **FR-3.3 Restricted Free Orbit Controls:**
  - Users can gently drag/pan to explore the scene.
  - Polar and azimuthal angles strictly clamped (`minPolarAngle: Math.PI / 4`, `maxPolarAngle: Math.PI / 2.05`, `minDistance: 5`, `maxDistance: 45`) to prevent clipping under geometry or breaking visual illusions.

### 4.4 GPU Compute Particle & Shader Systems
- **FR-4.1 Firecracker Sparks (*Phooljhadi* & *Anar*):**
  - 100% GPU-driven instanced point clouds running on custom GLSL vertex/fragment shaders.
  - Zero per-spark CPU overhead; includes velocity decay, gravity pull, turbulence noise, and color temperature shift (white-hot to fiery amber).
- **FR-4.2 Aarti Flames & Incense Smoke:**
  - 2D animated spritesheet emitters utilizing additive blending and soft depth-fade to prevent hard visual clipping against 3D geometries.
- **FR-4.3 Procedural Halo & Glow Shaders:**
  - Maa Kali's radiant fiery halo powered by animated Voronoi/Perlin noise distortion.
  - Trinetra pulse shader radiating subtle cosmic violet/golden energy.
  - Godray light-shaft pass projecting from celestial light sources.
- **FR-4.4 Diya Illumination:**
  - High-intensity emissive texture mapping feeding into selective bloom post-processing.
  - Strict limitation: Scene uses exactly 4 primary physical Three.js dynamic lights (scene key, Kali rim, Ayodhya path key, Hanuman fill) — avoiding costly per-diya point lights.

### 4.5 Devotee Crowd & Fauna Simulation (Instancing & VAT)
- **FR-5.1 High-Performance Instanced Rendering:**
  - Crowd rendered using Three.js `InstancedMesh` with Vertex Animation Textures (VAT) or shared skeletal rig references.
  - Total crowd draw calls capped under 10.
- **FR-5.2 5 Core Character Archetypes:**
  1. Female Devotee in traditional red-bordered silk saree.
  2. Female Devotee in festive salwar suit / lehenga.
  3. Male Devotee in traditional kurta and dhoti.
  4. Child playing with sparklers.
  5. Temple Monkey (*Vanara*) with natural resting/looking idle loops.
- **FR-5.3 Visual Variety:**
  - Archetypes share a unified master texture atlas.
  - Per-instance GPU color attribute variations randomly tint clothing across authentic festive palettes (crimson, marigold yellow, emerald green, royal magenta).

### 4.6 Spatial 3D Audio Engine
- **FR-6.1 Multi-Layer Spatial Soundscape (Howler.js / Web Audio API):**
  - **Zone A Audio Layer (Maa Kali Peeth):** Meditative low-frequency drone, resonant Bengali *Dhak* drums, ringing brass *Kansar ghanta* bells, and soft Sanskrit Kali Stotram mantras.
  - **Zone B Audio Layer (Ayodhya Procession):** Classical bansuri flute, meditative sitar melodies, and deep, resonant conch shells (*Shankhnaad*).
  - **Foreground SFX Layer:** Positional crackle of sparklers, ambient evening breeze, and distant joyous fireworks.
- **FR-6.2 Position-Based Dynamic Cross-Fading:**
  - As the camera pans or dollies between Zone A and Zone B, audio volumes seamlessly cross-fade according to listener distance vectors.
- **FR-6.3 Audio HUD Controls:**
  - Mute/Unmute master toggle button.
  - Volume slider and discrete sound layer mute options (Music vs. Ambient SFX).

### 4.7 HUD, Overlay UI & Informational Drawers
- **FR-7.1 Minimalist Glassmorphic HUD:**
  - Elegant, translucent backdrop (`backdrop-filter: blur(12px)`) with gold accents (`#FFD700`, `#E5A93C`) and midnight-blue borders.
- **FR-7.2 Lore & Significance Modal ("Katha & Darshan Info"):**
  - Toggleable drawer detailing the spiritual significance of Shyama Puja, Diwali, and the return to Ayodhya.
- **FR-7.3 FPS & Performance Monitor:**
  - Optional unobtrusive toggle to show real-time FPS, draw calls, and memory usage.

---

## 5. Non-Functional Requirements (NFRs)

### 5.1 Technical Budgets & Hardware Constraints

| Engineering Parameter | Target Ceiling | Hard Limit | Rationale |
| :--- | :--- | :--- | :--- |
| **Total Scene Polygons** | 120,000 triangles | **160,000 triangles** | Ensures 60 FPS on integrated GPUs and mobile chips. |
| **Active Draw Calls** | < 50 draw calls | **< 75 draw calls** | Minimizes CPU-to-GPU overhead and WebGL state switches. |
| **GPU Texture VRAM** | < 100 MB | **< 150 MB** | Prevents mobile Safari/Chrome OOM context termination. |
| **Texture Formats** | KTX2 / Basis Universal | KTX2 (with WebP fallback) | Direct GPU VRAM upload with zero CPU decompression spike. |
| **Geometry Compression**| Google Draco | Draco compressed GLB | Reduces 3D model file download size by 75–85%. |
| **Dynamic Lights** | 3 active lights | **4 active lights max** | Prevents shader permutation explosion and severe frame drops. |

### 5.2 Device Tiering & Adaptive Performance Scaling

The application incorporates hardware capability detection (via `detect-gpu`):

```
                       [Device Detection]
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼
   [Tier 1: High]        [Tier 2: Medium]       [Tier 3: Low / Mobile]
  (Discrete GPUs)       (Modern Phones/iPads)   (Budget Android / Older iOS)
  ─────────────────     ────────────────────    ────────────────────────────
  • Full Post-Proc      • Selective Bloom only  • Post-processing DISABLED
  • DPR: 1.5 - 2.0      • DPR: 1.25             • DPR clamped to 1.0
  • 100% Particles      • 60% Particle density  • 35% Particle density
  • Volumetric Godrays  • Mesh Godray cones     • Static glow sprite
  • Max Shadows (1024)  • Soft Shadows (512)    • Shadows disabled / baked
```

### 5.3 Browser & Platform Compatibility
- **Desktop:** Google Chrome (v100+), Mozilla Firefox (v100+), Apple Safari (v15+), Microsoft Edge (v100+).
- **Mobile/Tablet:** iOS Safari (iOS 15+), Android Chrome (Android 10+), Samsung Internet.
- **WebGL Fallback:** In the rare event of WebGL 2.0 unavailability, display an elegant fallback poster card with high-resolution cinematic artwork and festive greetings.

### 5.4 Accessibility & Inclusivity
- **A11y-1:** Semantic HTML5 overlay structure with clear ARIA labels on all HUD buttons (`aria-label="Switch to Ayodhya view"`, etc.).
- **A11y-2:** Full keyboard navigation support (Tab/Enter navigation, Spacebar for audio mute, 1/2 keys for viewpoint toggles).
- **A11y-3:** `prefers-reduced-motion` compliance: Disables rapid camera animations and reduces particle velocity for sensitive users.
- **A11y-4:** High-contrast text readability on all informational modals against darkened backgrounds.

### 5.5 SEO & Social Graph Optimization
- **SEO-1:** Rich semantic `<title>`: *"Divine Diwali & Shyama Puja | Real-Time 3D WebGL Experience"*.
- **SEO-2:** Descriptive meta tags, keywords, canonical URLs, and structured data (`Schema.org/Event` & `WebApplication`).
- **SEO-3:** OpenGraph (`og:image`) and Twitter Card metadata pointing to a high-resolution preview render of Maa Kali and Ram Parivar.

---

## 6. Technical Architecture & Tech Stack

### 6.1 Technology Stack Summary

| Technology | Role | Purpose & Specification |
| :--- | :--- | :--- |
| **Next.js (App Router) / Vite + React** | Web Framework | TypeScript component hierarchy, SSR metadata, asset streaming. |
| **Three.js & `@react-three/fiber` (R3F)** | 3D Engine | Declarative WebGL scene graph, lifecycle management. |
| **`@react-three/drei`** | 3D Utilities | `useGLTF`, `OrbitControls`, `AdaptiveDpr`, `Preload`, `Instances`. |
| **`@react-three/postprocessing`** | Post-Processing | Selective Bloom (Luminance threshold: 0.85), ACESFilmic tone mapping. |
| **Custom GLSL Shaders** | Shaders | Fiery halo, Trinetra pulse, GPU point cloud particle engines. |
| **Howler.js** | Audio Engine | Spatial 3D audio, vector attenuation, cross-fades, unlock handling. |
| **GSAP (GreenSock)** | Motion | Cinematic camera choreography and tweening between viewpoints. |
| **Vanilla CSS / CSS Modules** | Styling | Glassmorphic HUD, responsive layout, zero heavyweight CSS dependencies. |
| **Google Draco + KTX2** | Asset Pipeline | Geometry compression and GPU-ready texture streaming. |

### 6.2 Component Hierarchy & Data Flow
```
App (layout.tsx / page.tsx)
 ├── Preloader (DOM: useProgress listener & Click to Enter gate)
 ├── HUDOverlay (DOM: Glassmorphism controls, Audio toggle, Viewpoint switcher, Lore)
 └── Canvas (R3F WebGL Context)
      ├── AdaptiveDpr & PerformanceTierManager
      ├── LightingEnvironment (Diwali night HDRI + 4 Key Lights)
      ├── CameraRig (PerspectiveCamera controlled by GSAP & clamped OrbitControls)
      ├── SceneGraph
      │    ├── KaliCourtyardZone (Zone A)
      │    │    ├── MaaKaliHero (Draco GLB + FieryHaloShader + TrinetraGlow)
      │    │    ├── MandirArchitecture (Baked lightmaps)
      │    │    ├── DevoteeCrowdInstances (InstancedMesh: sarees, kurtas, monkeys)
      │    │    ├── AartiFlames (Additive spritesheet emitters)
      │    │    └── FirecrackerParticles (GPU compute sparklers & anars)
      │    └── AyodhyaProcessionZone (Zone B)
      │         ├── RamParivar (Shri Ram, Sita Ji, Lakshman)
      │         ├── ViraatHanumanJi (Colossal scale)
      │         ├── SacredPathway (Lotus petals & instanced emissive diyas)
      │         └── VolumetricAtmosphere (Godrays & ground fog shaders)
      └── PostProcessingComposer (Selective Bloom, ToneMapping, Vignette)
```

---

## 7. Development Guardrails: What To Do vs. What NOT To Do

To ensure production stability and avoid common WebGL development pitfalls, the following engineering rules are mandatory:

```
┌──────────────────────────────────────────────┬──────────────────────────────────────────────┐
│           ❌ STRICTLY PROHIBITED             │            ✅ MANDATORY PRACTICES            │
├──────────────────────────────────────────────┼──────────────────────────────────────────────┤
│ 1. NEVER load raw uncompressed .obj/.fbx     │ 1. Always compress with Draco & KTX2 via     │
│    assets (causes high latency & memory lag).│    gltf-transform before committing models.  │
│                                              │                                              │
│ 2. NEVER add real dynamic point lights to    │ 2. Use emissive materials + Bloom filter for │
│    individual diyas or sparklers.            │    diyas; restrict dynamic lights to max 4.  │
│                                              │                                              │
│ 3. NEVER load uncompressed 4K textures (risk │ 3. Cap textures at 2048x2048 (hero) and      │
│    of WebGL context loss on mobile).         │    512-1024 for props; share texture atlases.│
│                                              │                                              │
│ 4. NEVER autoplay unmuted audio on load      │ 4. Lock audio behind an explicit user touch  │
│    (violates browser security policies).     │    or click gesture ("Enter Darshan").       │
│                                              │                                              │
│ 5. NEVER use CPU loops to animate hundreds   │ 5. Drive sparklers, anars, and smoke via GPU │
│    of individual sparkler/smoke particles.   │    GLSL shaders and InstancedMesh matrices.  │
│                                              │                                              │
│ 6. NEVER use dynamic strand-based hair on    │ 6. Use polygon hair cards with normal maps   │
│    characters (extreme GPU fill-rate drop).  │    and alpha cutoffs.                        │
└──────────────────────────────────────────────┴──────────────────────────────────────────────┘
```

---

## 8. Implementation Roadmap & Milestones

```
Phase 1: Asset Preparation & Texturing Pipeline (Week 1)
 ├── 3D model sculpts/optimization: Maa Kali, Ram Parivar, Hanuman Ji, Devotees
 ├── Texture baking (PBR normal maps, trim sheets, ambient occlusion, lightmaps)
 ├── Idle character animation rigs (Aarti waving, sparkler play, monkey idling)
 └── Asset optimization: Draco geometry compression + KTX2 texture encoding

Phase 2: R3F Canvas Staging & Scene Assembly (Week 2)
 ├── Staging Zone A (Kali Mandir) & Zone B (Ayodhya Pathway) coordinates
 ├── PBR lighting balance (Starry Diwali HDRI + warm ground bounce)
 ├── Camera rig setup (Cinematic dolly paths + GSAP viewpoint switcher)
 └── Core render loop verification under Three.js stats

Phase 3: Shaders, Particles & Visual FX (Week 3)
 ├── Custom GLSL: Maa Kali fiery halo & Trinetra pulse shader
 ├── GPU point cloud engine: Phooljhadi sparklers & Anar fountain crackers
 ├── Volumetric godrays, mist clouds & additive smoke sprites
 └── Post-processing chain configuration (Selective Bloom & ACES tone mapping)

Phase 4: Crowd Instancing & Spatial Audio (Week 4)
 ├── InstancedMesh integration for 5 devotee archetypes with color variations
 ├── Fauna placement: Animated temple monkeys along architectural cornices
 ├── Howler.js spatial audio engine setup (3 layers + listener position tracking)
 └── Glassmorphic HUD overlay (Viewpoint toggles, audio controls, lore modal)

Phase 5: Performance Optimization, QA & Production Deployment (Week 5)
 ├── Hardware tiering implementation via detect-gpu (DPR clamping & fallbacks)
 ├── Mobile browser testing (iOS Safari, Android Chrome)
 ├── Edge CDN asset caching setup on Vercel / Cloudflare Pages + S3/R2
 └── Pre-flight checklist sign-off and public launch
```

---

## 9. Verification & Acceptance Criteria (DoD)

A release candidate will be considered **Production-Ready (Definition of Done)** when it passes all of the following verifiable criteria:

- [ ] **Asset Pipeline Verification:** All `.glb` assets run through `gltf-transform` with Draco compression and KTX2 texture formats.
- [ ] **Polygon Budget Verification:** Total scene geometry strictly under **160,000 triangles**.
- [ ] **Draw Call Budget Verification:** Active draw calls stay under **75** across all camera viewpoints.
- [ ] **Frame Rate Stability:** Maintains ≥ **55–60 FPS** on desktop and mid-tier mobile devices (iPhone 12+, Snapdragon 778G+).
- [ ] **VRAM Safety:** GPU VRAM allocation remains under **150 MB** with zero WebGL context lost errors during 10+ minutes of continuous rendering.
- [ ] **Audio Policy Compliance:** Audio context is completely silent upon page load and unlocks seamlessly upon clicking **"Click to Enter Darshan"**.
- [ ] **Spatial Audio Transitions:** Sound smoothly transitions between Bengali Dhak/mantras (Zone A) and flute/Shankhnaad (Zone B) as camera position shifts.
- [ ] **Mobile DPR Clamping:** Device Pixel Ratio is clamped via `Math.min(window.devicePixelRatio, 1.5)` on mobile devices.
- [ ] **Viewpoint Switching:** UI toggle shifts camera position without stutter, geometric clipping, or state desynchronization.
- [ ] **Accessibility & Keyboard Support:** All UI elements are operable via keyboard, with clear ARIA labels and reduced-motion compliance.

---

## 10. Document Approval & Sign-Off

| Stakeholder Role | Name / Title | Date | Status |
| :--- | :--- | :--- | :--- |
| **Lead 3D WebGL Architect** | Core Engineering Team | 2026-10-20 | Approved |
| **Creative & Cultural Director** | Heritage & Art Review | 2026-10-20 | Approved |
| **Technical Product Manager** | Product Operations | 2026-10-20 | Approved |
