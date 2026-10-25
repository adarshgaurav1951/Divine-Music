import * as THREE from 'three';
import gsap from 'gsap';
import { ParticleEngine } from './ParticleEngine';
import { spatialAudio } from '../audio/SpatialAudio';

export type CameraPreset = 'full' | 'fullbody' | 'darshan' | 'statue' | 'devotees_left' | 'devotees_right' | 'feet' | 'mukut' | 'courtyard' | 'parikrama' | 'panoramic';

export class SceneManager {
  private canvas: HTMLCanvasElement;
  public renderer: THREE.WebGLRenderer;
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  // 3D Scene Components
  public particleEngine: ParticleEngine;
  private panoramaSphere: THREE.Mesh | null = null;
  private centerpieceMesh: THREE.Mesh | null = null;
  private haloMesh: THREE.Mesh | null = null;

  // Dynamic Sacred Lighting
  private bonfireLight: THREE.PointLight | null = null;
  private kaliFaceLight: THREE.PointLight | null = null;
  private kaliHaloLight: THREE.PointLight | null = null;
  private leftDevoteesLight: THREE.PointLight | null = null;
  private rightDevoteesLight: THREE.PointLight | null = null;
  private oceanWaveLight: THREE.PointLight | null = null;

  // Spherical 360° Orbit Navigation
  // azimuth (horizontal angle in radians, 0 = facing Maa Kali frontally)
  public azimuth: number = 0;
  public targetAzimuth: number = 0;

  // elevation (vertical pitch angle in radians)
  public elevation: number = 0.02;
  public targetElevation: number = 0.02;

  // distance from target center
  public distance: number = 11.5;
  public targetDistance: number = 11.5;

  // LookAt target vector
  public currentLookAt: THREE.Vector3 = new THREE.Vector3(0, 0.2, 0);
  public targetLookAt: THREE.Vector3 = new THREE.Vector3(0, 0.2, 0);

  // 360° Parikrama (Circumambulation Orbit)
  public isParikramaActive: boolean = false;
  public parikramaSpeed: number = 0.14; // radians per second

  public currentPreset: CameraPreset = 'full';

  // Mouse & Touch Drag tracking
  private isPointerDown: boolean = false;
  private previousPointerPos = { x: 0, y: 0 };
  private initialPinchDistance: number | null = null;

  // Real-time Angle Change Listener for UI Compass
  public onAngleChange?: (angleDegrees: number, isParikrama: boolean) => void;

  private clock = new THREE.Clock();
  private reqId: number | null = null;
  private raycaster = new THREE.Raycaster();
  private mouseVec = new THREE.Vector2();

  private isAartiBoostActive: boolean = false;
  private aartiBoostTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    // 1. WebGL Renderer with High-Fidelity ACES Filmic Tone Mapping & High Dynamic Color
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    // 2. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0515);

    // 3. Camera with ideal distance to ensure full 16:9 scene fits screen
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      250
    );
    const initialDist = this.calculateIdealDistance();
    this.distance = initialDist;
    this.targetDistance = initialDist;
    this.updateCameraTransform();

    // 4. Sacred Illumination (Bonfire, Face, Fiery Halo, Left & Right Devotees, Ocean Waves)
    this.setupLighting();

    // 5. Build Sacred Beach Aarti Centerpiece & 360° Panorama
    this.buildBeachAartiScene();

    // 6. GPU Particle Engine (Bonfire embers, golden motes, fireworks, flower petals)
    this.particleEngine = new ParticleEngine();
    this.scene.add(this.particleEngine.group);

    // 7. Interactive Controls (360 Drag, Pinch/Wheel Zoom, Click Sparklers)
    this.setupInteractions();
    window.addEventListener('resize', this.onResize);

    // 8. Start Render Loop
    this.animate();
  }

  /**
   * Calculates ideal camera distance so the full 16:9 scene
   * (Width: 16.0, Height: 9.0) is visible across all screen sizes
   */
  public calculateIdealDistance(): number {
    const vFovRad = THREE.MathUtils.degToRad(this.camera.fov);
    const planeHeight = 9.0;
    const planeWidth = 16.0;
    const aspect = window.innerWidth / window.innerHeight;

    const distForHeight = (planeHeight / 2) / Math.tan(vFovRad / 2);
    const distForWidth = (planeWidth / 2) / (aspect * Math.tan(vFovRad / 2));

    return Math.max(distForHeight, distForWidth) * 1.02;
  }

  private setupLighting() {
    // 1. Ambient warm twilight radiance
    const ambientLight = new THREE.AmbientLight(0x563468, 2.6);
    this.scene.add(ambientLight);

    // 2. Dynamic Blazing Bonfire Light (warm orange flicker illuminating sand & devotees)
    this.bonfireLight = new THREE.PointLight(0xff7711, 5.2, 16);
    this.bonfireLight.position.set(0, -2.1, 1.4);
    this.scene.add(this.bonfireLight);

    // 3. Radiant Fiery Halo Rim-Light behind Maa Kali
    this.kaliHaloLight = new THREE.PointLight(0xff9911, 4.8, 18);
    this.kaliHaloLight.position.set(0, 2.3, -0.6);
    this.scene.add(this.kaliHaloLight);

    // 4. Warm Front Illumination focused on Maa Kali's Face, Crown, Tongue & Weapons
    this.kaliFaceLight = new THREE.PointLight(0xffebbb, 3.8, 20);
    this.kaliFaceLight.position.set(0, 1.8, 3.5);
    this.scene.add(this.kaliFaceLight);

    // 5. Left Devotees Illumination (warm light from their brass lamps and bell)
    this.leftDevoteesLight = new THREE.PointLight(0xffa522, 3.2, 12);
    this.leftDevoteesLight.position.set(-5.0, -1.2, 2.0);
    this.scene.add(this.leftDevoteesLight);

    // 6. Right Devotees Illumination (warm light from their lamps and bell)
    this.rightDevoteesLight = new THREE.PointLight(0xffa522, 3.2, 12);
    this.rightDevoteesLight.position.set(5.0, -1.2, 2.0);
    this.scene.add(this.rightDevoteesLight);

    // 7. Ocean Beach Shoreline Wave Reflection Light (Cyan-indigo shimmer)
    this.oceanWaveLight = new THREE.PointLight(0x30d5c8, 1.9, 22);
    this.oceanWaveLight.position.set(0, -3.2, 2.6);
    this.scene.add(this.oceanWaveLight);

    // 8. Sunset Horizon Directional Light
    const sunsetRim = new THREE.DirectionalLight(0xff6622, 1.8);
    sunsetRim.position.set(6, 4, -2);
    this.scene.add(sunsetRim);
  }

  /**
   * Builds the Sacred Beach Aarti Scene:
   * - Central fiery Maa Kali (Image 2) with flaming halo, crown, sword, trishul, fire bowls & diyas
   * - Left family of devotees offering Aarti with brass bell & lamps (Image 3)
   * - Right family of devotees praying with folded hands, bell & lamps (Image 4)
   * - Bonfire, ocean shoreline, and 360° surroundings
   */
  private buildBeachAartiScene() {
    const textureLoader = new THREE.TextureLoader();

    // A. 360-Degree Panoramic Sky & Temple Courtyard Environment
    const panoramaTexture = textureLoader.load('/textures/temple_sanctum_360_panorama.jpg');
    panoramaTexture.colorSpace = THREE.SRGBColorSpace;
    panoramaTexture.minFilter = THREE.LinearFilter;
    panoramaTexture.magFilter = THREE.LinearFilter;

    const sphereGeom = new THREE.SphereGeometry(65, 64, 32);
    sphereGeom.scale(-1, 1, 1); // Invert X so texture faces inward
    const sphereMat = new THREE.MeshBasicMaterial({
      map: panoramaTexture,
      side: THREE.BackSide
    });
    this.panoramaSphere = new THREE.Mesh(sphereGeom, sphereMat);
    this.panoramaSphere.rotation.y = -Math.PI / 2;
    this.scene.add(this.panoramaSphere);

    // B. Centerpiece: Full 16:9 Sacred Aarti Sanctuary
    // Seamlessly integrates Maa Kali (Image 2), Left Devotees (Image 3), Right Devotees (Image 4)
    const sceneTexture = textureLoader.load('/textures/maa_kali_devotees_aarti_sanctum.jpg');
    sceneTexture.colorSpace = THREE.SRGBColorSpace;
    sceneTexture.minFilter = THREE.LinearFilter;
    sceneTexture.magFilter = THREE.LinearFilter;

    // 16:9 Aspect Ratio Plane (Width: 16.0, Height: 9.0)
    const geom = new THREE.PlaneGeometry(16.0, 9.0, 36, 36);

    // Subtle 3D cylindrical curve for genuine immersive depth
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = -Math.cos((x / 16.0) * Math.PI * 0.5) * 0.55 + 0.55;
      pos.setZ(i, z);
    }
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      map: sceneTexture,
      roughness: 0.55,
      metalness: 0.08,
      emissive: 0x221020,
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide
    });

    this.centerpieceMesh = new THREE.Mesh(geom, mat);
    this.centerpieceMesh.position.set(0, 0, 0);
    this.scene.add(this.centerpieceMesh);

    // C. 3D Rotating Golden Prabhamandala Halo behind Maa Kali's Crown
    const haloGeom = new THREE.RingGeometry(2.1, 2.5, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffaa22,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75
    });
    this.haloMesh = new THREE.Mesh(haloGeom, haloMat);
    this.haloMesh.position.set(0, 2.2, -0.15);
    this.scene.add(this.haloMesh);
  }

  /**
   * Updates camera position from spherical coordinates (azimuth, elevation, distance)
   */
  private updateCameraTransform() {
    const x = this.currentLookAt.x + this.distance * Math.sin(this.azimuth) * Math.cos(this.elevation);
    const y = this.currentLookAt.y + this.distance * Math.sin(this.elevation);
    const z = this.currentLookAt.z + this.distance * Math.cos(this.azimuth) * Math.cos(this.elevation);

    this.camera.position.set(x, y, z);
    this.camera.lookAt(this.currentLookAt);
  }

  /**
   * Switch Viewpoint presets
   */
  public switchPreset(preset: CameraPreset) {
    this.currentPreset = preset;
    const baseDist = this.calculateIdealDistance();

    if (preset === 'parikrama') {
      this.setParikrama(true);
      return;
    }

    this.isParikramaActive = false;

    let targetAz: number = 0;
    let targetEl: number = 0.02;
    let targetDist: number = baseDist;
    let targetLook: THREE.Vector3 = new THREE.Vector3(0, 0.2, 0);

    if (preset === 'full' || preset === 'fullbody' || preset === 'courtyard') {
      // 1. Full Aarti View: Maa Kali, Left Devotees, Right Devotees, Bonfire & Ocean
      targetAz = 0;
      targetEl = 0.02;
      targetDist = baseDist;
      targetLook = new THREE.Vector3(0, 0.2, 0);
    } else if (preset === 'darshan' || preset === 'statue' || preset === 'mukut') {
      // 2. Maa Kali Darshan: Close-up on divine face, fiery halo, crown & weapons (Image 2)
      targetAz = 0;
      targetEl = 0.04;
      targetDist = baseDist * 0.54;
      targetLook = new THREE.Vector3(0, 1.4, 0);
    } else if (preset === 'devotees_left') {
      // 3. Left Devotees: Focus on family offering lamps and ringing brass bell (Image 3)
      targetAz = -0.12;
      targetEl = -0.02;
      targetDist = baseDist * 0.62;
      targetLook = new THREE.Vector3(-4.6, -0.9, 0);
    } else if (preset === 'devotees_right') {
      // 4. Right Devotees: Focus on family praying with lamps and ringing bell (Image 4)
      targetAz = 0.12;
      targetEl = -0.02;
      targetDist = baseDist * 0.62;
      targetLook = new THREE.Vector3(4.6, -0.9, 0);
    } else if (preset === 'feet') {
      // 5. Sacred Diya Altar & Bonfire flames
      targetAz = 0;
      targetEl = 0.16;
      targetDist = baseDist * 0.68;
      targetLook = new THREE.Vector3(0, -2.1, 0);
    } else if (preset === 'panoramic') {
      // 6. 360° Sunset Beach Panorama: Wide view of the whole scene
      targetAz = 0;
      targetEl = 0.08;
      targetDist = baseDist * 1.22;
      targetLook = new THREE.Vector3(0, 0.2, 0);
    }

    gsap.to(this, {
      targetAzimuth: targetAz,
      targetElevation: targetEl,
      targetDistance: targetDist,
      duration: 1.4,
      ease: 'power3.inOut'
    });

    gsap.to(this.targetLookAt, {
      x: targetLook.x,
      y: targetLook.y,
      z: targetLook.z,
      duration: 1.4,
      ease: 'power3.inOut'
    });
  }

  /**
   * Set 360° Auto-Parikrama
   */
  public setParikrama(active: boolean) {
    this.isParikramaActive = active;
    if (active) {
      this.currentPreset = 'parikrama';
      const baseDist = this.calculateIdealDistance();
      gsap.to(this, {
        targetElevation: 0.06,
        targetDistance: baseDist * 1.05,
        duration: 1.2,
        ease: 'power2.out'
      });
      gsap.to(this.targetLookAt, {
        x: 0,
        y: 0.2,
        z: 0,
        duration: 1.2,
        ease: 'power2.out'
      });
    }
  }

  public toggleParikrama(): boolean {
    const nextState = !this.isParikramaActive;
    this.setParikrama(nextState);
    return nextState;
  }

  public rotateBy(degrees: number) {
    this.isParikramaActive = false;
    const rad = THREE.MathUtils.degToRad(degrees);
    this.targetAzimuth += rad;
  }

  public setAzimuthDegrees(degrees: number) {
    this.isParikramaActive = false;
    const rad = THREE.MathUtils.degToRad(degrees);
    gsap.to(this, {
      targetAzimuth: rad,
      duration: 1.0,
      ease: 'power2.out'
    });
  }

  public zoomBy(delta: number) {
    this.targetDistance = THREE.MathUtils.clamp(
      this.targetDistance - delta,
      5.0,
      25.0
    );
  }

  public resetView() {
    this.switchPreset('full');
  }

  /**
   * Burst festive crackers beside Maa Kali with spatial sound
   */
  public burstFestiveFireworks() {
    spatialAudio.playFireworkExplosion();

    this.particleEngine.triggerSkyFirework('left');
    setTimeout(() => {
      this.particleEngine.triggerSkyFirework('right');
    }, 250);
    setTimeout(() => {
      this.particleEngine.triggerSkyFirework('center');
    }, 520);
    setTimeout(() => {
      this.particleEngine.triggerSkyFirework('right');
    }, 780);
  }

  /**
   * 8.5-second sacred Aarti offering ritual:
   * Chimes temple bell, sounds divine Shankh, intensifies bonfire & sacred lighting
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
    }, 8500);
  }

  /**
   * 360° Drag & Touch Controls
   */
  private setupInteractions() {
    const onMouseDown = (e: MouseEvent) => {
      this.isPointerDown = true;
      this.previousPointerPos = { x: e.clientX, y: e.clientY };
      this.isParikramaActive = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!this.isPointerDown) return;

      const deltaX = e.clientX - this.previousPointerPos.x;
      const deltaY = e.clientY - this.previousPointerPos.y;

      const sensitivityX = 0.0055;
      const sensitivityY = 0.0045;

      this.targetAzimuth -= deltaX * sensitivityX;
      this.targetElevation = THREE.MathUtils.clamp(
        this.targetElevation + deltaY * sensitivityY,
        -0.38,
        0.65
      );

      this.previousPointerPos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      this.isPointerDown = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY * 0.012;
      this.targetDistance = THREE.MathUtils.clamp(
        this.targetDistance + zoomFactor,
        5.0,
        25.0
      );
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        this.isPointerDown = true;
        this.previousPointerPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        this.isParikramaActive = false;
      } else if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        this.initialPinchDistance = Math.hypot(dx, dy);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1 && this.isPointerDown) {
        const deltaX = e.touches[0].clientX - this.previousPointerPos.x;
        const deltaY = e.touches[0].clientY - this.previousPointerPos.y;

        const sensitivityX = 0.0065;
        const sensitivityY = 0.0055;

        this.targetAzimuth -= deltaX * sensitivityX;
        this.targetElevation = THREE.MathUtils.clamp(
          this.targetElevation + deltaY * sensitivityY,
          -0.38,
          0.65
        );

        this.previousPointerPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2 && this.initialPinchDistance !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const currentDistance = Math.hypot(dx, dy);
        const diff = this.initialPinchDistance - currentDistance;

        this.targetDistance = THREE.MathUtils.clamp(
          this.targetDistance + diff * 0.03,
          5.0,
          25.0
        );
        this.initialPinchDistance = currentDistance;
      }
    };

    const onTouchEnd = () => {
      this.isPointerDown = false;
      this.initialPinchDistance = null;
    };

    const onClick = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      this.raycaster.setFromCamera(this.mouseVec, this.camera);
      const hitPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const hitPoint = new THREE.Vector3();
      this.raycaster.ray.intersectPlane(hitPlane, hitPoint);

      if (hitPoint) {
        this.particleEngine.triggerInteractiveBurst(hitPoint, 36);
      }
    };

    this.canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    this.canvas.addEventListener('wheel', onWheel, { passive: false });

    this.canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    this.canvas.addEventListener('click', onClick);
  }

  private onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));

    if (this.currentPreset === 'full' || this.currentPreset === 'fullbody') {
      const ideal = this.calculateIdealDistance();
      this.targetDistance = ideal;
    }
  };

  private animate = () => {
    this.reqId = requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // 1. 360° Auto-Parikrama
    if (this.isParikramaActive) {
      this.targetAzimuth += delta * this.parikramaSpeed;
    }

    // 2. Damped Camera Interpolation (60fps smooth)
    this.azimuth += (this.targetAzimuth - this.azimuth) * 0.08;
    this.elevation += (this.targetElevation - this.elevation) * 0.08;
    this.distance += (this.targetDistance - this.distance) * 0.08;

    this.currentLookAt.lerp(this.targetLookAt, 0.08);
    this.updateCameraTransform();

    // Notify UI of current azimuth angle
    if (this.onAngleChange) {
      let deg = THREE.MathUtils.radToDeg(this.azimuth) % 360;
      if (deg < 0) deg += 360;
      this.onAngleChange(Math.round(deg), this.isParikramaActive);
    }

    // 3. Dynamic Bonfire, Halo, Face & Devotees Lighting
    const boostMultiplier = this.isAartiBoostActive ? 1.6 : 1.0;

    if (this.bonfireLight) {
      const flameNoise = Math.sin(time * 12.0) * 0.5 + Math.sin(time * 26.0) * 0.3;
      this.bonfireLight.intensity = (5.2 + flameNoise) * boostMultiplier;
    }

    if (this.kaliHaloLight) {
      const haloPulse = Math.sin(time * 3.5) * 0.45;
      this.kaliHaloLight.intensity = (4.8 + haloPulse) * boostMultiplier;
    }

    if (this.kaliFaceLight) {
      const faceFlicker = Math.sin(time * 8.0) * 0.3;
      this.kaliFaceLight.intensity = (3.8 + faceFlicker) * boostMultiplier;
    }

    if (this.leftDevoteesLight) {
      const leftFlicker = Math.sin(time * 10.0 + 1.0) * 0.35;
      this.leftDevoteesLight.intensity = (3.2 + leftFlicker) * boostMultiplier;
    }

    if (this.rightDevoteesLight) {
      const rightFlicker = Math.sin(time * 10.0 + 2.5) * 0.35;
      this.rightDevoteesLight.intensity = (3.2 + rightFlicker) * boostMultiplier;
    }

    if (this.oceanWaveLight) {
      const wavePulse = Math.sin(time * 1.8) * 0.5 + Math.cos(time * 2.5) * 0.3;
      this.oceanWaveLight.intensity = 1.9 + wavePulse;
      this.oceanWaveLight.position.x = Math.sin(time * 0.8) * 1.5;
    }

    // 4. Subtle Halo Rotation
    if (this.haloMesh) {
      this.haloMesh.rotation.z = time * 0.15;
    }

    // 5. Update GPU Particles
    this.particleEngine.update(delta);

    // 6. Render
    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    if (this.reqId) cancelAnimationFrame(this.reqId);
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
  }
}
