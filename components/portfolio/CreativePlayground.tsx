"use client";

import { Sparkle, Flame, Palette, ArrowDownRight } from "@phosphor-icons/react";
import { InteractiveCd } from "@/components/portfolio/InteractiveCd";
import { TactilePhysicsSandbox } from "@/components/portfolio/TactilePhysicsSandbox";
import { SoundMatrixPad } from "@/components/portfolio/SoundMatrixPad";
import { soundManager } from "@/components/ui/SoundEffects";
import { fireConfetti } from "./Confetti";

export function CreativePlayground() {
  const handleSparkClick = () => {
    soundManager.playPowerUp();
    fireConfetti();
  };

  return (
    <section id="playground" className="creative-playground" aria-labelledby="playground-title">
      <div className="playground-inner-container">
        {/* Section Header */}
        <div className="playground-heading" data-reveal>
          <div className="playground-heading-left">
            <div className="work-header-badge-row">
              <p className="hand-label">Experiments & Happy Accidents</p>
              <span className="live-pill">
                <Sparkle size={12} weight="fill" /> Live Interactive Sandbox
              </span>
            </div>
            <h2 id="playground-title">The playground is where useful gets weird.</h2>
          </div>
          <div className="playground-heading-right">
            <p className="playground-subtitle">
              Where I test procedural sound, kinetic gravity physics, WebGL audio visualizers, and ideas too
              bold for conventional briefs.
            </p>
          </div>
        </div>

        {/* Spacious 2x2 Interactive Sandbox Layout */}
        <div className="playground-content-layout">
          {/* Row 1: Turntable Audio Synth & Harmonic Soundboard */}
          <div className="playground-row-top">
            <InteractiveCd />
            <SoundMatrixPad />
          </div>

          {/* Row 2: Kinetic Gravity Physics Lab & Creative Manifesto */}
          <div className="playground-row-bottom">
            <TactilePhysicsSandbox />

            {/* Interactive Manifesto Box */}
            <div
              className="playground-manifesto"
              role="button"
              tabIndex={0}
              onClick={handleSparkClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSparkClick();
              }}
              aria-label="Click to spark confetti"
              title="Click to celebrate creativity!"
            >
              <div className="manifesto-icons-row">
                <Sparkle size={28} weight="fill" className="manifesto-sparkle-icon" />
                <Flame size={28} weight="fill" className="manifesto-flame-icon" />
                <Palette size={28} weight="fill" className="manifesto-palette-icon" />
              </div>

              <div className="manifesto-center-text">
                <span className="manifesto-small-label">Studio Philosophy</span>
                <p className="manifesto-quote">
                  Create.
                  <br />
                  Explore.
                  <br />
                  Impact.
                  <br />
                  Repeat.
                </p>
              </div>

              <div className="manifesto-footer">
                <span>Click for creative spark ✦</span>
                <ArrowDownRight aria-hidden="true" weight="bold" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
