import * as THREE from 'three';

interface ParticleSpark {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
  size: number;
  life: number;
  maxLife: number;
}

export class ParticleEngine {
  public group: THREE.Group;

  // Sparkler / Firework particle system
  private sparkGeom: THREE.BufferGeometry;
  private sparkPositions: Float32Array;
  private sparkColors: Float32Array;
  private sparkSizes: Float32Array;
  private sparkPoints: THREE.Points;
  private maxSparks = 3000;
  private activeSparks: ParticleSpark[] = [];

  // Floating Sky Embers & Divine Golden Motes
  private emberGeom: THREE.BufferGeometry;
  private emberPoints: THREE.Points;
  private emberCount = 350;
  private emberPositions: Float32Array;
  private emberVelocities: Float32Array;

  // Sacred Pushpanjali (Flower Petals: Red Hibiscus & Golden Marigold)
  private petalGeom: THREE.BufferGeometry;
  private petalPoints: THREE.Points;
  private petalCount = 200;
  private petalPositions: Float32Array;
  private petalVelocities: Float32Array;
  private petalColors: Float32Array;

  private isEmberBoost: boolean = false;

  public setEmberBoost(boost: boolean) {
    this.isEmberBoost = boost;
  }

  constructor() {
    this.group = new THREE.Group();

    const sparkTexture = this.createSparkTexture();
    const petalTexture = this.createPetalTexture();

    // 1. Sparklers & Fireworks Points System
    this.sparkPositions = new Float32Array(this.maxSparks * 3);
    this.sparkColors = new Float32Array(this.maxSparks * 3);
    this.sparkSizes = new Float32Array(this.maxSparks);

    this.sparkGeom = new THREE.BufferGeometry();
    this.sparkGeom.setAttribute('position', new THREE.BufferAttribute(this.sparkPositions, 3));
    this.sparkGeom.setAttribute('color', new THREE.BufferAttribute(this.sparkColors, 3));
    this.sparkGeom.setAttribute('size', new THREE.BufferAttribute(this.sparkSizes, 1));

    const sparkMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: sparkTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    this.sparkPoints = new THREE.Points(this.sparkGeom, sparkMaterial);
    this.group.add(this.sparkPoints);

    // 2. Continuous floating golden twilight motes (dispersed around 360 space)
    this.emberPositions = new Float32Array(this.emberCount * 3);
    this.emberVelocities = new Float32Array(this.emberCount * 3);

    for (let i = 0; i < this.emberCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.0 + Math.random() * 12.0;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const y = -4.0 + Math.random() * 11.0;

      this.emberPositions[i * 3 + 0] = x;
      this.emberPositions[i * 3 + 1] = y;
      this.emberPositions[i * 3 + 2] = z;

      this.emberVelocities[i * 3 + 0] = (Math.random() - 0.5) * 0.012;
      this.emberVelocities[i * 3 + 1] = 0.008 + Math.random() * 0.018;
      this.emberVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.012;
    }

    this.emberGeom = new THREE.BufferGeometry();
    this.emberGeom.setAttribute('position', new THREE.BufferAttribute(this.emberPositions, 3));

    const emberMaterial = new THREE.PointsMaterial({
      color: 0xffaa33,
      size: 0.16,
      map: sparkTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.55
    });

    this.emberPoints = new THREE.Points(this.emberGeom, emberMaterial);
    this.group.add(this.emberPoints);

    // 3. Sacred Pushpanjali Shower (Falling Hibiscus & Marigold Petals)
    this.petalPositions = new Float32Array(this.petalCount * 3);
    this.petalVelocities = new Float32Array(this.petalCount * 3);
    this.petalColors = new Float32Array(this.petalCount * 3);

    const hibiscusColor = new THREE.Color(0xdc143c);
    const marigoldColor = new THREE.Color(0xffa500);
    const lotusColor = new THREE.Color(0xff69b4);

    for (let i = 0; i < this.petalCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 5.5;
      this.petalPositions[i * 3 + 0] = Math.sin(angle) * r;
      this.petalPositions[i * 3 + 1] = -5.5 + Math.random() * 12.5;
      this.petalPositions[i * 3 + 2] = Math.cos(angle) * r;

      this.petalVelocities[i * 3 + 0] = (Math.random() - 0.5) * 0.008;
      this.petalVelocities[i * 3 + 1] = -0.015 - Math.random() * 0.02; // gently falling
      this.petalVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.008;

      const pick = Math.random();
      const col = pick < 0.55 ? hibiscusColor : pick < 0.85 ? marigoldColor : lotusColor;
      this.petalColors[i * 3 + 0] = col.r;
      this.petalColors[i * 3 + 1] = col.g;
      this.petalColors[i * 3 + 2] = col.b;
    }

    this.petalGeom = new THREE.BufferGeometry();
    this.petalGeom.setAttribute('position', new THREE.BufferAttribute(this.petalPositions, 3));
    this.petalGeom.setAttribute('color', new THREE.BufferAttribute(this.petalColors, 3));

    const petalMaterial = new THREE.PointsMaterial({
      size: 0.28,
      map: petalTexture,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.85
    });

    this.petalPoints = new THREE.Points(this.petalGeom, petalMaterial);
    this.group.add(this.petalPoints);
  }

  /**
   * Generates a circular radial glow texture for sparks and embers
   */
  private createSparkTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 220, 150, 0.9)');
    grad.addColorStop(0.5, 'rgba(255, 130, 40, 0.4)');
    grad.addColorStop(1.0, 'rgba(255, 60, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }

  /**
   * Generates a soft petal-shaped alpha texture for flower petals
   */
  private createPetalTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return new THREE.Texture();

    ctx.save();
    ctx.translate(32, 32);
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 28, 0.3, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
    grad.addColorStop(0.0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(1.0, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();

    return new THREE.CanvasTexture(canvas);
  }

  /**
   * Emits golden embers around the altar base
   */
  private emitAltarEmbers(count: number) {
    for (let i = 0; i < count; i++) {
      if (this.activeSparks.length >= this.maxSparks) break;

      const angle = Math.random() * Math.PI * 2;
      const radius = 1.0 + Math.random() * 3.0;
      const pos = new THREE.Vector3(
        Math.sin(angle) * radius,
        -5.2 + Math.random() * 0.4,
        Math.cos(angle) * radius
      );

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.4,
        0.8 + Math.random() * 1.4,
        (Math.random() - 0.5) * 0.4
      );

      const color = new THREE.Color().setHSL(0.08 + Math.random() * 0.05, 1.0, 0.7);

      this.activeSparks.push({
        position: pos,
        velocity: vel,
        color: color,
        size: 0.18 + Math.random() * 0.16,
        life: 0,
        maxLife: 1.2 + Math.random() * 0.8
      });
    }
  }

  /**
   * Interactive Click/Tap Burst
   */
  public triggerInteractiveBurst(point: THREE.Vector3, count: number = 35) {
    const hue = Math.random() * 0.15; // Golden-orange-red sparks
    for (let i = 0; i < count; i++) {
      if (this.activeSparks.length >= this.maxSparks) break;

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 1.8 + Math.random() * 3.8;

      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      ).multiplyScalar(speed);

      const color = new THREE.Color().setHSL(hue, 1.0, 0.7 + Math.random() * 0.25);

      this.activeSparks.push({
        position: point.clone(),
        velocity: dir,
        color: color,
        size: 0.25 + Math.random() * 0.2,
        life: 0,
        maxLife: 0.6 + Math.random() * 0.5
      });
    }
  }

  /**
   * Sky fireworks burst in the temple courtyard sky
   */
  public triggerSkyFirework(side: 'left' | 'right' | 'center' = 'center') {
    let posX = 0;
    if (side === 'left') posX = -6.0 - Math.random() * 3.0;
    else if (side === 'right') posX = 6.0 + Math.random() * 3.0;
    else posX = (Math.random() - 0.5) * 6.0;

    const posY = 5.0 + Math.random() * 3.0;
    const posZ = -6.0 + (Math.random() - 0.5) * 4.0;

    const center = new THREE.Vector3(posX, posY, posZ);
    const count = 110;
    const hue = Math.random();

    for (let i = 0; i < count; i++) {
      if (this.activeSparks.length >= this.maxSparks) break;

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 2.5 + Math.random() * 5.5;

      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      ).multiplyScalar(speed);

      const color = new THREE.Color().setHSL((hue + Math.random() * 0.1) % 1.0, 1.0, 0.8);

      this.activeSparks.push({
        position: center.clone(),
        velocity: dir,
        color: color,
        size: 0.35 + Math.random() * 0.25,
        life: 0,
        maxLife: 0.9 + Math.random() * 0.6
      });
    }
  }

  public update(delta: number) {
    // 1. Emit subtle altar base embers
    this.emitAltarEmbers(this.isEmberBoost ? 6 : 2);

    // 2. Physics & Spark Life Update
    const gravity = new THREE.Vector3(0, -2.5, 0);
    const aliveSparks: ParticleSpark[] = [];

    let pIdx = 0;
    for (let i = 0; i < this.activeSparks.length; i++) {
      const spark = this.activeSparks[i];
      spark.life += delta;

      if (spark.life < spark.maxLife) {
        spark.velocity.addScaledVector(gravity, delta);
        spark.position.addScaledVector(spark.velocity, delta);

        const lifeRatio = Math.max(0, 1 - (spark.life / spark.maxLife));
        const alpha = Math.sin(lifeRatio * Math.PI * 0.5);

        this.sparkPositions[pIdx * 3 + 0] = spark.position.x;
        this.sparkPositions[pIdx * 3 + 1] = spark.position.y;
        this.sparkPositions[pIdx * 3 + 2] = spark.position.z;

        this.sparkColors[pIdx * 3 + 0] = spark.color.r * alpha;
        this.sparkColors[pIdx * 3 + 1] = spark.color.g * alpha;
        this.sparkColors[pIdx * 3 + 2] = spark.color.b * alpha;

        this.sparkSizes[pIdx] = spark.size * alpha;

        aliveSparks.push(spark);
        pIdx++;
      }
    }

    this.activeSparks = aliveSparks;

    for (let i = pIdx; i < this.maxSparks; i++) {
      this.sparkSizes[i] = 0;
    }

    this.sparkGeom.attributes.position.needsUpdate = true;
    this.sparkGeom.attributes.color.needsUpdate = true;
    this.sparkGeom.attributes.size.needsUpdate = true;

    // 3. Update continuous floating golden sky motes
    const emberPosAttr = this.emberGeom.attributes.position as THREE.BufferAttribute;
    const emberPos = emberPosAttr.array as Float32Array;

    for (let i = 0; i < this.emberCount; i++) {
      emberPos[i * 3 + 0] += this.emberVelocities[i * 3 + 0];
      emberPos[i * 3 + 1] += this.emberVelocities[i * 3 + 1];
      emberPos[i * 3 + 2] += this.emberVelocities[i * 3 + 2];

      if (emberPos[i * 3 + 1] > 7.0) {
        emberPos[i * 3 + 1] = -5.0;
        const angle = Math.random() * Math.PI * 2;
        const radius = 3.0 + Math.random() * 12.0;
        emberPos[i * 3 + 0] = Math.sin(angle) * radius;
        emberPos[i * 3 + 2] = Math.cos(angle) * radius;
      }
    }
    emberPosAttr.needsUpdate = true;

    // 4. Update falling Pushpanjali Flower Petals
    const petalPosAttr = this.petalGeom.attributes.position as THREE.BufferAttribute;
    const petalPos = petalPosAttr.array as Float32Array;

    for (let i = 0; i < this.petalCount; i++) {
      // Gentle floating sway
      petalPos[i * 3 + 0] += this.petalVelocities[i * 3 + 0] + Math.sin(petalPos[i * 3 + 1] * 2.0 + i) * 0.005;
      petalPos[i * 3 + 1] += this.petalVelocities[i * 3 + 1];
      petalPos[i * 3 + 2] += this.petalVelocities[i * 3 + 2] + Math.cos(petalPos[i * 3 + 1] * 2.0 + i) * 0.005;

      // Respawn at the top above Maa Kali's crown
      if (petalPos[i * 3 + 1] < -5.6) {
        petalPos[i * 3 + 1] = 6.8 + Math.random() * 1.5;
        const angle = Math.random() * Math.PI * 2;
        const r = Math.random() * 5.0;
        petalPos[i * 3 + 0] = Math.sin(angle) * r;
        petalPos[i * 3 + 2] = Math.cos(angle) * r;
      }
    }
    petalPosAttr.needsUpdate = true;
  }
}
