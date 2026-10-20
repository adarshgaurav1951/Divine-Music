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

  // Floating Sky Embers
  private emberGeom: THREE.BufferGeometry;
  private emberPoints: THREE.Points;
  private emberCount = 350;
  private emberPositions: Float32Array;
  private emberVelocities: Float32Array;

  // Bonfire Emitter position (strictly on the burning logs)
  private bonfireEmitter: THREE.Vector3 = new THREE.Vector3(0, -1.9, 0.3);
  private isEmberBoost: boolean = false;

  public setEmberBoost(boost: boolean) {
    this.isEmberBoost = boost;
  }

  constructor() {
    this.group = new THREE.Group();

    // 1. Sparklers & Fireworks Points System
    this.sparkPositions = new Float32Array(this.maxSparks * 3);
    this.sparkColors = new Float32Array(this.maxSparks * 3);
    this.sparkSizes = new Float32Array(this.maxSparks);

    this.sparkGeom = new THREE.BufferGeometry();
    this.sparkGeom.setAttribute('position', new THREE.BufferAttribute(this.sparkPositions, 3));
    this.sparkGeom.setAttribute('color', new THREE.BufferAttribute(this.sparkColors, 3));
    this.sparkGeom.setAttribute('size', new THREE.BufferAttribute(this.sparkSizes, 1));

    const sparkTexture = this.createSparkTexture();
    const sparkMaterial = new THREE.PointsMaterial({
      size: 0.32,
      map: sparkTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    this.sparkPoints = new THREE.Points(this.sparkGeom, sparkMaterial);
    this.group.add(this.sparkPoints);

    // 2. Subtle atmospheric floating twilight motes (dispersed in background/sky)
    this.emberPositions = new Float32Array(this.emberCount * 3);
    this.emberVelocities = new Float32Array(this.emberCount * 3);

    for (let i = 0; i < this.emberCount; i++) {
      // Disperse across sky and sides, keeping center open
      const side = Math.random() > 0.5 ? 1 : -1;
      const x = side * (2.5 + Math.random() * 6.5);
      const y = 0.5 + Math.random() * 4.5;
      const z = (Math.random() - 0.5) * 4;

      this.emberPositions[i * 3 + 0] = x;
      this.emberPositions[i * 3 + 1] = y;
      this.emberPositions[i * 3 + 2] = z;

      this.emberVelocities[i * 3 + 0] = (Math.random() - 0.5) * 0.015;
      this.emberVelocities[i * 3 + 1] = 0.01 + Math.random() * 0.02;
      this.emberVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }

    this.emberGeom = new THREE.BufferGeometry();
    this.emberGeom.setAttribute('position', new THREE.BufferAttribute(this.emberPositions, 3));

    const emberMaterial = new THREE.PointsMaterial({
      color: 0xffb74d,
      size: 0.12,
      map: sparkTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.45
    });

    this.emberPoints = new THREE.Points(this.emberGeom, emberMaterial);
    this.group.add(this.emberPoints);
  }

  private createSparkTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(255, 215, 90, 0.9)');
    grad.addColorStop(0.6, 'rgba(255, 100, 15, 0.35)');
    grad.addColorStop(1, 'rgba(255, 50, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * Gentle, natural bonfire embers that rise softly from the fire logs
   * and die out BEFORE reaching Maa Kali's statue body.
   */
  public emitBonfireEmbers(count: number = 2) {
    for (let i = 0; i < count; i++) {
      if (this.activeSparks.length >= this.maxSparks) break;

      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.45;
      const speed = 1.0 + Math.random() * 1.5;

      const origin = new THREE.Vector3(
        this.bonfireEmitter.x + Math.cos(angle) * radius,
        this.bonfireEmitter.y + Math.random() * 0.2,
        this.bonfireEmitter.z + Math.sin(angle) * radius
      );

      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.35,
        speed,
        (Math.random() - 0.5) * 0.25
      );

      // Warm amber fire color
      const color = new THREE.Color().setHSL(0.08 + Math.random() * 0.05, 1.0, 0.7);

      this.activeSparks.push({
        position: origin,
        velocity: vel,
        color: color,
        size: 0.16 + Math.random() * 0.16,
        life: 0,
        maxLife: 0.7 + Math.random() * 0.5 // Fades out before rising high
      });
    }
  }

  /**
   * Gentle visual sparkler at clicked point (NO LOUD NOISE, purely subtle visual delight)
   */
  public triggerInteractiveBurst(position: THREE.Vector3, count: number = 35) {
    const hueBase = 0.08 + Math.random() * 0.12; // warm festive golden tones
    for (let i = 0; i < count; i++) {
      if (this.activeSparks.length >= this.maxSparks) break;

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 1.5 + Math.random() * 3.5;

      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      ).multiplyScalar(speed);

      const color = new THREE.Color().setHSL((hueBase + Math.random() * 0.08) % 1.0, 1.0, 0.85);

      this.activeSparks.push({
        position: position.clone(),
        velocity: dir,
        color: color,
        size: 0.22 + Math.random() * 0.18,
        life: 0,
        maxLife: 0.6 + Math.random() * 0.4
      });
    }
  }

  /**
   * Burst festive crackers in the SKY beside Maa Kali (left or right background)
   */
  public triggerSkyFirework(side: 'left' | 'right' | 'random' = 'random') {
    let chosenSide = side;
    if (chosenSide === 'random') {
      chosenSide = Math.random() > 0.5 ? 'left' : 'right';
    }

    const posX = chosenSide === 'left'
      ? -4.8 - Math.random() * 2.2
      : 4.8 + Math.random() * 2.2;

    const posY = 2.4 + Math.random() * 1.8;
    const posZ = -0.5 + (Math.random() - 0.5) * 1.0;

    const center = new THREE.Vector3(posX, posY, posZ);
    const count = 90;
    const hue = Math.random();

    for (let i = 0; i < count; i++) {
      if (this.activeSparks.length >= this.maxSparks) break;

      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const speed = 2.5 + Math.random() * 5.0;

      const dir = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.sin(phi) * Math.sin(theta),
        Math.cos(phi)
      ).multiplyScalar(speed);

      const color = new THREE.Color().setHSL((hue + Math.random() * 0.12) % 1.0, 1.0, 0.8);

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
    // 1. Emit subtle bonfire embers (boosted during Aarti)
    this.emitBonfireEmbers(this.isEmberBoost ? 7 : 2);

    // 2. Physics & Particle Life Update
    const gravity = new THREE.Vector3(0, -3.0, 0);
    const aliveSparks: ParticleSpark[] = [];

    let pIdx = 0;
    for (let i = 0; i < this.activeSparks.length; i++) {
      const spark = this.activeSparks[i];
      spark.life += delta;

      if (spark.life < spark.maxLife) {
        spark.velocity.addScaledVector(gravity, delta);
        spark.position.addScaledVector(spark.velocity, delta);

        const lifeRatio = Math.max(0, 1 - (spark.life / spark.maxLife));
        const alpha = Math.sin(lifeRatio * Math.PI * 0.5); // smooth fade-out

        this.sparkPositions[pIdx * 3 + 0] = spark.position.x;
        this.sparkPositions[pIdx * 3 + 1] = spark.position.y; // NO clamping at 0!
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

    // Zero out unused slots
    for (let i = pIdx; i < this.maxSparks; i++) {
      this.sparkSizes[i] = 0;
    }

    this.sparkGeom.attributes.position.needsUpdate = true;
    this.sparkGeom.attributes.color.needsUpdate = true;
    this.sparkGeom.attributes.size.needsUpdate = true;

    // 3. Update continuous floating sky motes
    const posAttr = this.emberGeom.attributes.position as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;

    for (let i = 0; i < this.emberCount; i++) {
      pos[i * 3 + 0] += this.emberVelocities[i * 3 + 0];
      pos[i * 3 + 1] += this.emberVelocities[i * 3 + 1];
      pos[i * 3 + 2] += this.emberVelocities[i * 3 + 2];

      // Respawn if drifted too high
      if (pos[i * 3 + 1] > 5.5) {
        pos[i * 3 + 1] = 0.5;
        const side = Math.random() > 0.5 ? 1 : -1;
        pos[i * 3 + 0] = side * (2.5 + Math.random() * 6.5);
      }
    }
    posAttr.needsUpdate = true;
  }
}
