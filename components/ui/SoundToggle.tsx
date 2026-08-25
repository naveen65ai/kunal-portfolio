"use client";

import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { useSoundState } from "@/components/ui/SoundEffects";

interface SoundToggleProps {
  variant?: "pill" | "compact" | "hero";
  className?: string;
}

export function SoundToggle({ variant = "pill", className = "" }: SoundToggleProps) {
  const { isMuted, toggleSound } = useSoundState();

  const handleToggle = () => {
    toggleSound();
  };

  if (variant === "hero") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`sound-toggle-hero ${!isMuted ? "is-active" : "is-muted"} ${className}`}
        aria-label={isMuted ? "Unmute portfolio audio effects" : "Mute portfolio audio effects"}
        aria-pressed={!isMuted}
      >
        <span className="sound-toggle-icon-wrap" aria-hidden="true">
          {isMuted ? (
            <SpeakerSlash size={16} weight="bold" />
          ) : (
            <SpeakerHigh size={16} weight="bold" />
          )}
        </span>
        <span className="sound-toggle-text">
          {isMuted ? "Sound: Muted" : "Interactive Audio: Active"}
        </span>
        {!isMuted && (
          <span className="sound-eq-bars" aria-hidden="true">
            <span className="sound-eq-bar bar-1" />
            <span className="sound-eq-bar bar-2" />
            <span className="sound-eq-bar bar-3" />
          </span>
        )}
      </button>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        className={`sound-toggle-compact ${!isMuted ? "is-active" : "is-muted"} ${className}`}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        title={isMuted ? "Unmute audio" : "Mute audio"}
        aria-pressed={!isMuted}
      >
        {isMuted ? (
          <SpeakerSlash size={16} weight="bold" />
        ) : (
          <SpeakerHigh size={16} weight="bold" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`sound-toggle-pill ${!isMuted ? "is-active" : "is-muted"} ${className}`}
      aria-label={isMuted ? "Enable sound effects" : "Mute sound effects"}
      aria-pressed={!isMuted}
    >
      <span className="sound-toggle-icon" aria-hidden="true">
        {isMuted ? (
          <SpeakerSlash size={14} weight="bold" />
        ) : (
          <SpeakerHigh size={14} weight="bold" />
        )}
      </span>
      <span className="sound-toggle-label">
        {isMuted ? "Sound OFF" : "Sound ON"}
      </span>
      {!isMuted && (
        <span className="sound-eq-bars" aria-hidden="true">
          <span className="sound-eq-bar bar-1" />
          <span className="sound-eq-bar bar-2" />
          <span className="sound-eq-bar bar-3" />
        </span>
      )}
    </button>
  );
}
