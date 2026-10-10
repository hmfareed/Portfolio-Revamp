// Web Audio API Synthesizer for Tactile Sketchbook Sound Effects
// 100% self-contained, zero external network assets or latency

class PencilSoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pencil_sound_enabled');
      if (stored !== null) {
        this.enabled = stored === 'true';
      }
    }
  }

  private initContext() {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (typeof window !== 'undefined') {
      localStorage.setItem('pencil_sound_enabled', String(val));
    }
  }

  public toggle(): boolean {
    const next = !this.enabled;
    this.setEnabled(next);
    if (next) {
      this.playPop();
    }
    return next;
  }

  /**
   * Generates a short white noise buffer for organic tactile paper/pencil texture
   */
  private createNoiseBuffer(durationSeconds: number): AudioBuffer | null {
    const ctx = this.initContext();
    if (!ctx) return null;
    const bufferSize = Math.floor(ctx.sampleRate * durationSeconds);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * Tactile Paper Flip sound: filtered sweeping noise simulating paper turning
   */
  public playPaperFlip() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const duration = 0.18;
      const noiseBuffer = this.createNoiseBuffer(duration);
      if (!noiseBuffer) return;

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + duration);
      filter.Q.setValueAtTime(1.8, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noiseSource.start();
      noiseSource.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext policy safe fallback
    }
  }

  /**
   * Pencil Scribble sound: 3 rapid micro-scratches mimicking graphite on paper
   */
  public playPencilScribble() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const bursts = [0, 0.04, 0.09];
      bursts.forEach((offset, idx) => {
        const duration = 0.035;
        const noiseBuffer = this.createNoiseBuffer(duration);
        if (!noiseBuffer) return;

        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1400 + idx * 300, ctx.currentTime + offset);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.01, ctx.currentTime + offset);
        gain.gain.linearRampToValueAtTime(0.14, ctx.currentTime + offset + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + duration);

        noiseSource.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noiseSource.start(ctx.currentTime + offset);
        noiseSource.stop(ctx.currentTime + offset + duration);
      });
    } catch {
      // AudioContext policy safe fallback
    }
  }

  /**
   * Stamp Thud sound: deep resonant thud with subtle desk vibration
   */
  public playStampThud() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const duration = 0.22;
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(38, ctx.currentTime + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);

      // Add small impact snap
      const snapBuffer = this.createNoiseBuffer(0.03);
      if (snapBuffer) {
        const snap = ctx.createBufferSource();
        snap.buffer = snapBuffer;
        const snapFilter = ctx.createBiquadFilter();
        snapFilter.type = 'lowpass';
        snapFilter.frequency.setValueAtTime(500, ctx.currentTime);
        const snapGain = ctx.createGain();
        snapGain.gain.setValueAtTime(0.2, ctx.currentTime);
        snapGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);

        snap.connect(snapFilter);
        snapFilter.connect(snapGain);
        snapGain.connect(ctx.destination);
        snap.start();
        snap.stop(ctx.currentTime + 0.03);
      }
    } catch {
      // AudioContext policy safe fallback
    }
  }

  /**
   * Click / Pop sound: crisp pen click or button tap
   */
  public playPop() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const duration = 0.06;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.02);
      osc.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext policy safe fallback
    }
  }

  /**
   * Harmonious sketch chime: two light notes for special accomplishments
   */
  public playChime() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const notes = [587.33, 880]; // D5, A5
      notes.forEach((freq, idx) => {
        const start = ctx.currentTime + idx * 0.08;
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch {
      // AudioContext policy safe fallback
    }
  }
}

export const pencilSoundEngine = new PencilSoundEngine();
