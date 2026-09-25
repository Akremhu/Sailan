/**
 * Luxury Web Audio API Chime Synthesizer
 * Generates an ethereal, warm golden harmonic chime for the gatefold opening
 * and an acoustic melodic pluck for interactive gestures without external audio files.
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (this.isMuted) return null;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Plays an authentic, warm Yemeni oud & golden celebratory fanfare
   * perfectly tuned for opening a royal wedding invitation
   */
  public playGoldenChime(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    
    // Warm acoustic resonant chord (Oud & Golden Bell frequencies - Rast/Bayati inspired harmony)
    // D3, G3, A3, D4, F#4, A4, D5 (220Hz - 587Hz)
    const oudFrequencies = [146.83, 196.00, 220.00, 293.66, 369.99, 440.00, 587.33];

    oudFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Triangle for acoustic warm string pluck resonance
      osc.type = idx < 2 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.045);

      // Micro-detune for authentic acoustic choir resonance
      osc.detune.setValueAtTime((idx - 3) * 4, now);

      // Amplitude envelope: crisp acoustic attack + lush lingering decay
      const baseVol = 0.16 / (1 + idx * 0.35);
      const startTime = now + idx * 0.045;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(baseVol, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 3.4);
    });
  }

  /**
   * Plays a celebratory gentle harp / oud chime for RSVP confirmation
   */
  public playCelebrationChime(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880, 1108.73]; // A major pentatonic sparkle

    notes.forEach((freq, i) => {
      const startTime = now + i * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.1, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 1.3);
    });
  }

  /**
   * Subtle golden click tone for button interactions
   */
  public playClickTone(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.06);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  /**
   * Alias for celebration chime used across interactive toggles
   */
  public playChimeTone(): void {
    this.playCelebrationChime();
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const soundManager = new SoundEffectsManager();
