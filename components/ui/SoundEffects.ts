"use client";

import { useState, useEffect, useCallback } from "react";

// Web Audio API procedural sound engine - 0 external asset dependencies!
class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private muted: boolean = false; // Enabled by default across all devices & Vercel
  private listeners: Set<(muted: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("kunal_portfolio_muted");
      if (stored !== null) {
        this.muted = stored === "true";
      } else {
        // Default to enabled (unmuted) so interactive toys work out of the box
        this.muted = false;
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public unlock(): AudioContext | null {
    return this.getContext();
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("kunal_portfolio_muted", String(muted));
    }
    if (!muted) {
      this.getContext();
    }
    this.listeners.forEach((fn) => fn(muted));
  }

  public toggleMute(): boolean {
    const nextMuted = !this.muted;
    this.setMuted(nextMuted);
    if (!nextMuted) {
      this.playChime();
    }
    return this.muted;
  }

  public unmute() {
    if (this.muted) {
      this.setMuted(false);
      this.playChime();
    }
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Crisp mechanical tactile click
  public playClick(pitch: number = 1) {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600 * pitch, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio context error handling
    }
  }

  // Soft interactive hover blip
  public playHover() {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.03);

      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // ignore
    }
  }

  public playBlip() {
    this.playHover();
  }

  // Sparkling harmonic celebration chime (Confetti / Copy / Success)
  public playChime() {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        const startTime = now + idx * 0.06;
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.4);
      });
    } catch {
      // ignore
    }
  }

  // Retro 8-bit power up sound
  public playPowerUp() {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        const startTime = now + idx * 0.045;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.04, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.09);
      });
    } catch {
      // ignore
    }
  }

  // Lo-fi warm synth chords for interactive turntable CD
  public playSynthChord(trackIndex: number = 0) {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const chordSets = [
        // Track 1: Nocturnal Chill (Am9 -> Fmaj7)
        [220.0, 261.63, 329.63, 392.0, 493.88],
        // Track 2: Tactile Chrome (Fmaj9 -> G6)
        [174.61, 220.0, 261.63, 329.63, 392.0],
        // Track 3: Midnight Sprint (Dm7 -> Em7)
        [146.83, 220.0, 261.63, 349.23, 440.0],
      ];

      const chord = chordSets[trackIndex % chordSets.length];
      const now = ctx.currentTime;

      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = i % 2 === 0 ? "sawtooth" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Warm analog low-pass filter
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(900, now);
        filter.frequency.exponentialRampToValueAtTime(350, now + 1.2);

        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.25);
      });
    } catch {
      // ignore
    }
  }

  // Individual harmonic note synthesis for sound pads and physics
  public playTone(freq: number, type: OscillatorType = "sine", duration: number = 0.45) {
    if (this.muted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundEffectsManager();

/**
 * Reactive React hook for subscribing to global sound mute/unmute state.
 */
export function useSoundState() {
  const [isMuted, setIsMuted] = useState<boolean>(() => soundManager.isMuted());

  useEffect(() => {
    setIsMuted(soundManager.isMuted());
    const unsubscribe = soundManager.subscribe((nextMuted) => {
      setIsMuted(nextMuted);
    });
    return unsubscribe;
  }, []);

  const toggleSound = useCallback(() => {
    return soundManager.toggleMute();
  }, []);

  const unmute = useCallback(() => {
    soundManager.unmute();
  }, []);

  return { isMuted, toggleSound, unmute };
}
