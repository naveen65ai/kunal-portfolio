"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pause, Play, Sparkle, Disc, FastForward } from "@phosphor-icons/react";
import compactDisc from "@/public/images/compact-disc-illustrated-v2.png";
import { soundManager } from "@/components/ui/SoundEffects";

const tracks = [
  { id: "01", name: "Nocturnal Flow (UI & Spatial)", bpm: "124 BPM" },
  { id: "02", name: "Tactile Glass & Spun Chrome", bpm: "118 BPM" },
  { id: "03", name: "Midnight Sprint to Launch", bpm: "128 BPM" },
];

const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=kkunalkumar0055@gmail.com&su=Project%20inquiry%20from%20turntable";

export function InteractiveCd() {
  const [spinning, setSpinning] = useState(true);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) setSpinning(false);
  }, []);

  const handleToggleSpin = () => {
    soundManager.playClick();
    setSpinning((isSpinning) => {
      const nextState = !isSpinning;
      if (nextState) {
        soundManager.playSynthChord(currentTrackIndex);
      }
      return nextState;
    });
  };

  const nextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    if (spinning) {
      soundManager.playSynthChord(nextIdx);
    }
  };

  const track = tracks[currentTrackIndex];

  return (
    <div className="cd-stage" data-spinning={spinning}>
      {/* Vinyl Disc Interactive Container */}
      <button
        className="cd-motion-toggle cursor-pointer"
        type="button"
        aria-label={spinning ? "Pause rotating compact disc" : "Play rotating compact disc"}
        aria-pressed={spinning}
        data-cursor={spinning ? "Pause" : "Spin"}
        onClick={handleToggleSpin}
      >
        <span className="cd-disc" aria-hidden="true">
          <Image
            src={compactDisc}
            alt="Illustrated creative soundtrack compact disc"
            fill
            sizes="(max-width: 760px) 80vw, 38vw"
          />
        </span>
        <span className="cd-glint" aria-hidden="true" />

        {/* Center Spindle & State */}
        <span className="cd-control-state">
          {spinning ? (
            <Pause aria-hidden="true" weight="fill" size={18} />
          ) : (
            <Play aria-hidden="true" weight="fill" size={18} />
          )}
          {spinning ? "Pause Vinyl" : "Spin Disc"}
        </span>
      </button>

      {/* Turntable Info Display & Equalizer */}
      <div className="turntable-player-badge">
        <div className="turntable-track-header">
          <div className="flex items-center gap-1.5">
            <Disc size={16} weight="bold" className={spinning ? "animate-spin text-amber-500" : "text-zinc-500"} />
            <span className="turntable-live-tag">Studio Playlist</span>
          </div>
          <span className="track-bpm">{track.bpm}</span>
        </div>

        <div className="turntable-track-title">
          <strong>{track.name}</strong>
        </div>

        {/* Animated Soundwave Equalizer */}
        <div className="turntable-wave-row" aria-hidden="true">
          <div className={`eq-bar eq-bar-1 ${spinning ? "is-playing" : ""}`} />
          <div className={`eq-bar eq-bar-2 ${spinning ? "is-playing" : ""}`} />
          <div className={`eq-bar eq-bar-3 ${spinning ? "is-playing" : ""}`} />
          <div className={`eq-bar eq-bar-4 ${spinning ? "is-playing" : ""}`} />
          <div className={`eq-bar eq-bar-5 ${spinning ? "is-playing" : ""}`} />
          <div className={`eq-bar eq-bar-6 ${spinning ? "is-playing" : ""}`} />
          <div className={`eq-bar eq-bar-7 ${spinning ? "is-playing" : ""}`} />
          <div className={`eq-bar eq-bar-8 ${spinning ? "is-playing" : ""}`} />
        </div>

        <div className="turntable-actions-row">
          <button
            type="button"
            className="turntable-next-btn"
            onClick={nextTrack}
            aria-label="Skip to next playlist track"
          >
            <FastForward size={14} weight="bold" /> Next Track
          </button>
          <a
            className="cd-note"
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            aria-label="Start a project inspired by this vibe; opens Gmail in a new tab"
          >
            <Sparkle size={14} weight="fill" /> Let&apos;s Build <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
