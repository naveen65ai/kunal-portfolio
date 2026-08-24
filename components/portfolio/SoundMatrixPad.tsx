"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SpeakerHigh, Play, Pause, Waveform } from "@phosphor-icons/react";
import { soundManager } from "@/components/ui/SoundEffects";

interface SynthKey {
  id: number;
  note: string;
  freq: number;
  color: string;
  label: string;
}

const SCALE_PRESETS = {
  lofi: {
    name: "Lo-Fi Soul (A Minor Pentatonic)",
    waveType: "triangle" as OscillatorType,
    keys: [
      { id: 1, note: "A3", freq: 220.0, color: "#1762dc", label: "Bass A" },
      { id: 2, note: "C4", freq: 261.63, color: "#ffc62f", label: "Tone C" },
      { id: 3, note: "D4", freq: 293.66, color: "#ff704f", label: "Tone D" },
      { id: 4, note: "E4", freq: 329.63, color: "#087947", label: "Tone E" },
      { id: 5, note: "G4", freq: 392.0, color: "#1762dc", label: "Harm G" },
      { id: 6, note: "A4", freq: 440.0, color: "#ffc62f", label: "Lead A" },
      { id: 7, note: "C5", freq: 523.25, color: "#ff704f", label: "Lead C" },
      { id: 8, note: "D5", freq: 587.33, color: "#087947", label: "High D" },
      { id: 9, note: "E5", freq: 659.25, color: "#e879f9", label: "High E" },
    ],
  },
  arcade: {
    name: "Arcade 8-Bit (Major Pentatonic)",
    waveType: "square" as OscillatorType,
    keys: [
      { id: 1, note: "C4", freq: 261.63, color: "#ffc62f", label: "Chip C" },
      { id: 2, note: "D4", freq: 293.66, color: "#ff704f", label: "Chip D" },
      { id: 3, note: "E4", freq: 329.63, color: "#1762dc", label: "Chip E" },
      { id: 4, note: "G4", freq: 392.0, color: "#087947", label: "Chip G" },
      { id: 5, note: "A4", freq: 440.0, color: "#e879f9", label: "Chip A" },
      { id: 6, note: "C5", freq: 523.25, color: "#ffc62f", label: "Chip C5" },
      { id: 7, note: "D5", freq: 587.33, color: "#ff704f", label: "Chip D5" },
      { id: 8, note: "E5", freq: 659.25, color: "#1762dc", label: "Chip E5" },
      { id: 9, note: "G5", freq: 783.99, color: "#087947", label: "Chip G5" },
    ],
  },
  ambient: {
    name: "Cyber Ambient (Dorian Mood)",
    waveType: "sine" as OscillatorType,
    keys: [
      { id: 1, note: "D3", freq: 146.83, color: "#1762dc", label: "Deep D" },
      { id: 2, note: "F3", freq: 174.61, color: "#ff704f", label: "Deep F" },
      { id: 3, note: "G3", freq: 196.0, color: "#087947", label: "Deep G" },
      { id: 4, note: "A3", freq: 220.0, color: "#ffc62f", label: "Mid A" },
      { id: 5, note: "C4", freq: 261.63, color: "#e879f9", label: "Mid C" },
      { id: 6, note: "D4", freq: 293.66, color: "#1762dc", label: "Mid D" },
      { id: 7, note: "E4", freq: 329.63, color: "#ff704f", label: "High E" },
      { id: 8, note: "G4", freq: 392.0, color: "#087947", label: "High G" },
      { id: 9, note: "A4", freq: 440.0, color: "#ffc62f", label: "High A" },
    ],
  },
};

export function SoundMatrixPad() {
  const [currentPreset, setCurrentPreset] = useState<keyof typeof SCALE_PRESETS>("lofi");
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [isPlayingArp, setIsPlayingArp] = useState(false);
  const arpIndexRef = useRef(0);
  const arpTimerRef = useRef<NodeJS.Timeout | null>(null);

  const preset = SCALE_PRESETS[currentPreset];

  const triggerNote = useCallback((key: SynthKey) => {
    soundManager.playTone(key.freq, preset.waveType, 0.45);
    setActiveKey(key.id);
    setTimeout(() => {
      setActiveKey((prev) => (prev === key.id ? null : prev));
    }, 280);
  }, [preset.waveType]);

  // Arpeggiator Loop
  useEffect(() => {
    if (isPlayingArp) {
      const keys = preset.keys;
      const stepSequence = [0, 2, 4, 6, 8, 7, 5, 3, 1, 4, 7, 2];
      
      arpTimerRef.current = setInterval(() => {
        const keyIdx = stepSequence[arpIndexRef.current % stepSequence.length];
        const key = keys[keyIdx % keys.length];
        triggerNote(key);
        arpIndexRef.current += 1;
      }, 320);
    } else {
      if (arpTimerRef.current) {
        clearInterval(arpTimerRef.current);
        arpTimerRef.current = null;
      }
      arpIndexRef.current = 0;
    }

    return () => {
      if (arpTimerRef.current) clearInterval(arpTimerRef.current);
    };
  }, [isPlayingArp, preset.keys, triggerNote]);

  return (
    <div className="synth-matrix-card">
      {/* Header Info */}
      <div className="synth-header">
        <div>
          <div className="synth-title-row">
            <span className="synth-title-icon">
              <Waveform size={18} weight="bold" />
            </span>
            <h3 className="synth-title">
              Harmonic Synthesizer Pad
            </h3>
          </div>
          <p className="synth-subtitle">
            Tap the tactile pads to play procedural chords · Procedural Web Audio engine
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="synth-scale-pills">
          {(Object.keys(SCALE_PRESETS) as Array<keyof typeof SCALE_PRESETS>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setCurrentPreset(key);
                soundManager.playClick();
              }}
              className={`synth-scale-btn ${currentPreset === key ? "is-active" : ""}`}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Tactile Synth Keys Grid */}
      <div className="synth-pad-grid">
        {preset.keys.map((key) => {
          const isActive = activeKey === key.id;
          return (
            <button
              key={key.id}
              type="button"
              onClick={() => triggerNote(key)}
              onMouseEnter={() => soundManager.playHover()}
              style={{
                backgroundColor: isActive ? key.color : "#ffffff",
                color: isActive ? "#ffffff" : "#171515",
              }}
              className={`synth-pad-btn ${isActive ? "is-playing" : ""}`}
            >
              <span className="synth-pad-note">{key.note}</span>
              <span className="synth-pad-label">{key.label}</span>
            </button>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="synth-toolbar">
        <button
          type="button"
          onClick={() => {
            setIsPlayingArp(!isPlayingArp);
            soundManager.playClick();
          }}
          className={`synth-arp-btn ${isPlayingArp ? "is-active" : ""}`}
        >
          {isPlayingArp ? (
            <>
              <Pause size={14} weight="bold" /> Pause Arpeggiator
            </>
          ) : (
            <>
              <Play size={14} weight="bold" /> Auto-Play Melody
            </>
          )}
        </button>

        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#171515]/60">
          <SpeakerHigh size={15} weight="bold" />
          <span>{preset.name}</span>
        </div>
      </div>
    </div>
  );
}
