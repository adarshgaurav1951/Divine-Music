import * as THREE from 'three';
import gsap from 'gsap';
import { ParticleEngine } from './ParticleEngine';
import { spatialAudio } from '../audio/SpatialAudio';

export type CameraPreset = 'darshan' | 'courtyard' | 'panoramic';

export class SceneManager {
  private canvas: HTMLCanvasElement;
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  // 3D Scene Components
  public particleEngine: ParticleEngine;
  private backgroundMesh: THREE.Mesh | null = null;
  private bonfireLight: THREE.PointLight | null = null;
  private kaliFaceLight: THREE.PointLight | null = null;
  private kaliHaloLight: THREE.PointLight | null = null;
  private oceanWaveLight: THREE.PointLight | null = null;

  // Camera animation & controls
  private targetLookAt: THREE.Vector3 = new THREE.Vector3(0, 0.2, 0);
  private currentLookAt: THREE.Vector3 = new THREE.Vector3(0, 0.2, 0);
  public currentPreset: CameraPreset = 'courtyard';

  // Mouse, Touch & Scroll Parallax
  private mousePos = { x: 0, y: 0 };
  private targetMousePos = { x: 0, y: 0 };
  private scrollY = 0;

  private clock = new THREE.Clock();
  private reqId: number | null = null;
  private raycaster = new THREE.Raycaster();
  private mouseVec = new THREE.Vector2();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    // 1. WebGL Renderer with High-Fidelity ACES Filmic Tone Mapping & Enhanced Brightness
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.30; // Bright, vivid and crisp

    // 2. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0515);

    // 3. Camera with adaptive framing
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    const initialZ = this.calculateIdealDistance();
    this.camera.position.set(0, 0, initialZ);
    this.camera.lookAt(this.targetLookAt);

    // 4. Enhanced Brighter Lighting: Golden Halo Rim-Light, Crisp Face Light, Bonfire, and Ocean Wave Shimmer
    this.setupLighting();

    // 5. Open-Air Beach & Bonfire Centerpiece
    this.buildBeachBonfireScene();

    // 6. GPU Particle Engine (Bonfire Embers & Sky Fireworks)
    this.particleEngine = new ParticleEngine();
    this.scene.add(this.particleEngine.group);

    // 7. Event Listeners
    this.setupInteractions();
    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll, { passive: true });

    // 8. Start Render Loop
    this.animate();
  }

  /**
   * Calculates ideal camera distance to ensure full 16:9 plane is visible across devices
   */
  private calculateIdealDistance(): number {
    const vFovRad = THREE.MathUtils.degToRad(this.camera.fov);
    const planeHeight = 9.0;
    const planeWidth = 16.0;
    const aspect = window.innerWidth / window.innerHeight;

    const distForHeight = (planeHeight / 2) / Math.tan(vFovRad / 2);
    const distForWidth = (planeWidth / 2) / (aspect * Math.tan(vFovRad / 2));

    return Math.max(distForHeight, distForWidth) * 1.05;
  }

  private setupLighting() {
    // 1. Ambient twilight fill light with purple-gold warmth
    const ambientLight = new THREE.AmbientLight(0x523668, 2.8);
    this.scene.add(ambientLight);

    // 2. Radiant Golden/Orange Halo Rim-Light behind Maa Kali's silhouette
    this.kaliHaloLight = new THREE.PointLight(0xffaa22, 4.6, 18);
    this.kaliHaloLight.position.set(0, 2.4, -0.9);
    this.scene.add(this.kaliHaloLight);

    // 3. Warm Front Illumination focused on Maa Kali's Face, Crown, Tongue & Weapons
    this.kaliFaceLight = new THREE.PointLight(0xffe2b0, 3.5, 20);
    this.kaliFaceLight.position.set(0, 2.0, 3.8);
    this.scene.add(this.kaliFaceLight);

    // 4. Dynamic Blazing Bonfire Light (warm orange flicker illuminating sand & devotees)
    this.bonfireLight = new THREE.PointLight(0xff7711, 4.8, 16);
    this.bonfireLight.position.set(0, -1.8, 1.4);
    this.scene.add(this.bonfireLight);

    // 5. Ocean Beach Shoreline Wave Reflection Light (Subtle cyan-indigo glow that ripples)
    this.oceanWaveLight = new THREE.PointLight(0x30d5c8, 1.8, 22);
    this.oceanWaveLight.position.set(0, -3.2, 2.5);
    this.scene.add(this.oceanWaveLight);

    // 6. Sunset Horizon Directional Light
    const sunsetRim = new THREE.DirectionalLight(0xff5522, 1.6);
    sunsetRim.position.set(6, 4, -1);
    this.scene.add(sunsetRim);
  }

  /**
   * Builds the open-air beach bonfire scene with Maa Kali and Pixar-style devotees
   */
  private buildBeachBonfireScene() {
    const textureLoader = new THREE.TextureLoader();
    const sceneTexture = textureLoader.load('/textures/kali_beach_bonfire.jpg');
    sceneTexture.colorSpace = THREE.SRGBColorSpace;
    sceneTexture.minFilter = THREE.LinearFilter;
    sceneTexture.magFilter = THREE.LinearFilter;

    // 16:9 Aspect Ratio Plane (Width: 16, Height: 9)
    const geom = new THREE.PlaneGeometry(16, 9, 32, 32);

    // Subtle 3D cylindrical curve so it creates genuine depth around camera
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = -Math.cos((x / 16) * Math.PI * 0.5) * 0.45 + 0.45;
      pos.setZ(i, z);
    }
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      map: sceneTexture,
      roughness: 0.65,
      metalness: 0.05,
      emissive: 0x180f1e,
      emissiveIntensity: 0.35, // Enhanced luminosity for crisp visibility
      side: THREE.DoubleSide
    });

    this.backgroundMesh = new THREE.Mesh(geom, mat);
    this.backgroundMesh.position.set(0, 0, 0);
    this.scene.add(this.backgroundMesh);
  }

  /**
   * Switch Viewpoint presets
   */
  public switchPreset(preset: CameraPreset) {
    this.currentPreset = preset;
    const baseZ = this.calculateIdealDistance();

    let targetCamPos: THREE.Vector3;
    let targetLook: THREE.Vector3;

    if (preset === 'darshan') {
      // 1. Close-up on Maa Kali's divine statue, glowing eyes, crown & weapons
      targetCamPos = new THREE.Vector3(0, 1.2, baseZ * 0.62);
      targetLook = new THREE.Vector3(0, 1.4, 0);
    } else if (preset === 'courtyard') {
      // 2. Full Beach & Bonfire: Devotees performing Aarti, bonfire flames & Maa Kali
      targetCamPos = new THREE.Vector3(0, 0.0, baseZ);
      targetLook = new THREE.Vector3(0, 0.2, 0);
    } else {
      // 3. Sunset Beach Panorama: Wide majestic perspective
      targetCamPos = new THREE.Vector3(0, -0.3, baseZ * 1.18);
      targetLook = new THREE.Vector3(0, 0.3, 0);
    }

    gsap.to(this.camera.position, {
      x: targetCamPos.x,
      y: targetCamPos.y,
      z: targetCamPos.z,
      duration: 1.5,
      ease: 'power3.inOut'
    });

    gsap.to(this.currentLookAt, {
      x: targetLook.x,
      y: targetLook.y,
      z: targetLook.z,
      duration: 1.5,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.camera.lookAt(this.currentLookAt);
      }
    });
  }

  /**
   * Burst festive crackers beside Maa Kali in the sky/background with audio
   */
  public burstFestiveFireworks() {
    spatialAudio.playFireworkExplosion();

    this.particleEngine.triggerSkyFirework('left');
    setTimeout(() => {
      this.particleEngine.triggerSkyFirework('right');
    }, 280);
    setTimeout(() => {
      this.particleEngine.triggerSkyFirework('left');
    }, 550);
    setTimeout(() => {
      this.particleEngine.triggerSkyFirework('right');
    }, 800);
  }

  private isAartiBoostActive: boolean = false;
  private aartiBoostTimer: ReturnType<typeof setTimeout> | null = null;

  /**
   * 8-second sacred Aarti offering ritual:
   * Chimes temple bell, sounds divine Shankh, increases scene lighting and bonfire embers
   */
  public startAartiOffering() {
    spatialAudio.playBell();
    spatialAudio.playShankh();

    this.isAartiBoostActive = true;
    this.particleEngine.setEmberBoost(true);

    if (this.aartiBoostTimer) clearTimeout(this.aartiBoostTimer);
    this.aartiBoostTimer = setTimeout(() => {
      this.isAartiBoostActive = false;
      this.particleEngine.setEmberBoost(false);
    }, 8000);
  }

  private setupInteractions() {
    window.addEventListener('mousemove', e => {
      this.targetMousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Touch Move Parallax
    window.addEventListener('touchmove', e => {
      if (e.touches.length > 0) {
        this.targetMousePos.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        this.targetMousePos.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    }, { passive: true });

    // Interactive Click anywhere: SILENT sparklers
    this.canvas.addEventListener('click', e => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouseVec, this.camera);
      const hitPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const hitPoint = new THREE.Vector3();
      this.raycaster.ray.intersectPlane(hitPlane, hitPoint);

      if (hitPoint) {
        this.particleEngine.triggerInteractiveBurst(hitPoint, 40);
      }
    });
  }

  private onScroll = () => {
    this.scrollY = window.scrollY;
  };

  private onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));

    const idealZ = this.calculateIdealDistance();
    if (this.currentPreset === 'courtyard') {
      this.camera.position.z = idealZ;
    } else if (this.currentPreset === 'darshan') {
      this.camera.position.z = idealZ * 0.62;
    } else {
      this.camera.position.z = idealZ * 1.18;
    }
  };

  private animate = () => {
    this.reqId = requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // 1. Natural Bonfire Flickering Light & Volumetric Glow (boosted during Aarti)
    const boostMultiplier = this.isAartiBoostActive ? 1.55 : 1.0;

    if (this.bonfireLight) {
      const flameNoise = Math.sin(time * 12.0) * 0.45 + Math.sin(time * 26.0) * 0.25;
      this.bonfireLight.intensity = (4.8 + flameNoise) * boostMultiplier;
    }

    if (this.kaliFaceLight) {
      const faceFlicker = Math.sin(time * 8.0) * 0.25;
      this.kaliFaceLight.intensity = (3.5 + faceFlicker) * boostMultiplier;
    }

    if (this.kaliHaloLight) {
      const haloPulse = Math.sin(time * 2.8) * 0.35;
      this.kaliHaloLight.intensity = (4.6 + haloPulse) * boostMultiplier;
    }

    // 2. Animated Ocean Wave Shimmer Light (rippling reflections on wet sand and water)
    if (this.oceanWaveLight) {
      const wavePulse = Math.sin(time * 1.8) * 0.5 + Math.cos(time * 2.5) * 0.3;
      this.oceanWaveLight.intensity = 1.8 + wavePulse;
      this.oceanWaveLight.position.x = Math.sin(time * 0.8) * 1.5;
    }

    // 3. Smooth Camera Parallax Response to Cursor & Scroll Depth
    this.mousePos.x += (this.targetMousePos.x - this.mousePos.x) * 0.05;
    this.mousePos.y += (this.targetMousePos.y - this.mousePos.y) * 0.05;

    // Subtle scroll-driven parallax vertical displacement
    const scrollOffset = Math.min(this.scrollY * 0.002, 1.2);

    if (this.backgroundMesh) {
      this.backgroundMesh.rotation.y = this.mousePos.x * 0.035;
      this.backgroundMesh.rotation.x = -this.mousePos.y * 0.025 - scrollOffset * 0.04;
      this.backgroundMesh.position.y = scrollOffset * 0.3;
    }

    // 4. Update GPU Particles (Bonfire embers & sky fireworks)
    this.particleEngine.update(delta);

    // 5. Render
    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    if (this.reqId) cancelAnimationFrame(this.reqId);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
    this.renderer.dispose();
  }
}
