/**
 * Sacred Audio Engine for Maa Kali Shyama Puja.
 * - Plays real surreal Maa Kali song extracted from public media (/audio/kali_song.m4a)
 * - Rhythmic brass bells, temple conch shell (Shankhnaad), and sparklers/fireworks SFX
 */

export class SpatialAudioEngine {
  private ctx: AudioContext | null = null;
  private isUnlocked: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;

  private mandirGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Real Maa Kali soundtrack
  public musicAudio: HTMLAudioElement | null = null;
  public isMusicPlaying: boolean = false;

  public init(): boolean {
    if (this.isUnlocked) return true;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.mandirGain = this.ctx.createGain();
      this.mandirGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.mandirGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      // Initialize real Maa Kali track (Universal MP3)
      this.musicAudio = new Audio('/audio/kali_song.mp3');
      this.musicAudio.loop = true;
      this.musicAudio.volume = 0.85;
      
      this.musicAudio.play()
        .then(() => {
          this.isMusicPlaying = true;
        })
        .catch(err => {
          console.warn('Audio play error:', err);
        });

      this.isUnlocked = true;
      return true;
    } catch (e) {
      console.warn('Web Audio initialization error:', e);
      return false;
    }
  }

  public toggleSong(): boolean {
    if (!this.musicAudio) {
      this.musicAudio = new Audio('/audio/kali_song.mp3');
      this.musicAudio.loop = true;
      this.musicAudio.volume = 0.85;
    }

    if (this.musicAudio.paused) {
      this.musicAudio.play().then(() => {
        this.isMusicPlaying = true;
      }).catch(err => console.warn('Audio play error:', err));
      return true;
    } else {
      this.musicAudio.pause();
      this.isMusicPlaying = false;
      return false;
    }
  }

  public setMasterMute(mute: boolean) {
    this.isMuted = mute;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(mute ? 0 : 0.85, this.ctx.currentTime, 0.1);
    }
    if (this.musicAudio) {
      this.musicAudio.muted = mute;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Temple brass bell (Kansar Ghanta)
   */
  public playBell() {
    if (!this.ctx || !this.mandirGain) return;
    const now = this.ctx.currentTime;

    const freqs = [1860, 2480, 3120, 4800];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.mandirGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      const decay = 0.8 + idx * 0.4;
      gain.gain.setValueAtTime(0.06 / (idx + 1), now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gain);
      gain.connect(this.mandirGain);

      osc.start(now);
      osc.stop(now + decay);
    });
  }

  /**
   * Resonant Shankhnaad (Divine Conch Shell blow)
   */
  public playShankh() {
    if (!this.ctx || !this.mandirGain) return;
    const now = this.ctx.currentTime;
    const duration = 4.2;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(370, now + 1.2);
    osc.frequency.setValueAtTime(370, now + 2.8);
    osc.frequency.exponentialRampToValueAtTime(310, now + duration);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(700, now);
    filter.Q.setValueAtTime(3.5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.8);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.mandirGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * Sparkler / Cracker sound effect
   */
  public playCrackerSizzle() {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.45;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const isPop = Math.random() < 0.05 ? 3.0 : 1.0;
      data[i] = (Math.random() * 2 - 1) * isPop;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2500, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
  }

  /**
   * Festive Aerial Firework Burst
   */
  public playFireworkExplosion() {
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const boomOsc = this.ctx.createOscillator();
    const boomGain = this.ctx.createGain();
    boomOsc.type = 'sine';
    boomOsc.frequency.setValueAtTime(140, now);
    boomOsc.frequency.exponentialRampToValueAtTime(35, now + 0.5);

    boomGain.gain.setValueAtTime(0.4, now);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    boomOsc.connect(boomGain);
    boomGain.connect(this.sfxGain);
    boomOsc.start(now);
    boomOsc.stop(now + 0.75);

    window.setTimeout(() => {
      this.playCrackerSizzle();
      this.playCrackerSizzle();
    }, 200);
  }

  public destroy() {
    if (this.musicAudio) {
      this.musicAudio.pause();
      this.musicAudio = null;
    }
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

export const spatialAudio = new SpatialAudioEngine();
