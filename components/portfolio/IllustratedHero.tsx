"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight, Sparkle } from "@phosphor-icons/react";
import { type CSSProperties, type PointerEvent, useEffect, useRef } from "react";
import heroCharacterOpen from "@/public/images/hero-character-open-alpha-v2.png";
import heroCharacterBlink from "@/public/images/hero-character-blink-v2.png";
import { RetroGrid } from "@/components/ui/RetroGrid";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { ParticlesBackground } from "@/components/ui/ParticlesBackground";
import { soundManager } from "@/components/ui/SoundEffects";
import { fireConfetti } from "./Confetti";

const title = "PORTFOLIO";

type LetterStyle = CSSProperties & {
  "--letter-index": number;
};

export function IllustratedHero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const updateParallax = (event: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scene = sceneRef.current;
    if (!scene) return;

    const bounds = scene.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      scene.style.setProperty("--hero-x", x.toFixed(3));
      scene.style.setProperty("--hero-y", y.toFixed(3));
    });
  };

  const resetParallax = () => {
    const scene = sceneRef.current;
    if (!scene) return;
    scene.style.setProperty("--hero-x", "0");
    scene.style.setProperty("--hero-y", "0");
  };

  const handleCharacterClick = () => {
    soundManager.playPowerUp();
    fireConfetti();
  };

  return (
    <section id="top" className="illustrated-hero relative overflow-hidden" aria-labelledby="hero-title">
      {/* Magic UI Retro 3D Grid background */}
      <RetroGrid opacity={0.35} angle={60} />
      {/* Ambient floating light particles */}
      <ParticlesBackground quantity={25} color="#ffc62f" />

      <div
        ref={sceneRef}
        className="living-hero-scene relative z-10"
        data-motion="hero-scene"
        onPointerMove={updateParallax}
        onPointerLeave={resetParallax}
      >
        <div className="hero-grid-lines" aria-hidden="true" />

        <div className="hero-live-copy">
          <div className="inline-flex items-center gap-2 relative">
            <p className="hand-label hero-kicker">Branding / 3D / Websites</p>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-black/80 bg-amber-200/80 px-2.5 py-0.5 text-xs font-mono font-bold text-black shadow-xs">
              <Sparkle size={12} weight="fill" className="text-amber-600 animate-spin" /> Live 2026 Edition
            </span>
          </div>

          <h1 id="hero-title" className="hero-floating-title" data-motion="portfolio-title" aria-label="Kunal Kumar portfolio">
            {title.split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                aria-hidden="true"
                style={{ "--letter-index": index } as LetterStyle}
                onMouseEnter={() => soundManager.playHover()}
              >
                {letter}
              </span>
            ))}
          </h1>

          <p className="hero-live-tagline">
            I help people turn their <strong>ideas</strong> into <em>brands</em> that actually mean something.
          </p>

          <div className="hero-live-actions flex flex-wrap items-center gap-4">
            <ShimmerButton
              as="a"
              href="#work"
              shimmerColor="#ffc62f"
              className="font-bold text-sm"
              background="var(--cobalt)"
            >
              <span className="flex items-center gap-2">
                Explore Selected Work <ArrowDown aria-hidden="true" weight="bold" />
              </span>
            </ShimmerButton>
            <span aria-hidden="true" className="font-hand font-bold text-sm opacity-80">
              Good ideas deserve loud shapes.
            </span>
          </div>
        </div>

        {/* Year burst badge with glowing BorderBeam */}
        <div className="hero-year-burst relative overflow-hidden" aria-hidden="true">
          <BorderBeam size={120} duration={8} colorFrom="#ffc62f" colorTo="#ff704f" />
          <span>2026</span>
        </div>

        {/* Interactive Character Avatar */}
        <div
          className="hero-character-parallax cursor-pointer"
          onClick={handleCharacterClick}
          title="Click Kunal for creative spark! ⚡"
        >
          <div className="hero-character-shell" data-motion="hero-person">
            <Image
              className="hero-character-image"
              src={heroCharacterOpen}
              alt="Illustrated portrait of Kunal leaning forward and drawing with a pen"
              fill
              preload
              sizes="(max-width: 760px) 92vw, 58vw"
            />
            <Image
              className="hero-character-blink"
              data-motion="hero-blink"
              src={heroCharacterBlink}
              alt=""
              fill
              sizes="(max-width: 760px) 92vw, 58vw"
            />
          </div>
        </div>

        <div className="hero-floating-doodles" aria-hidden="true">
          <span
            className="hero-spark hero-spark--one cursor-pointer"
            onClick={() => {
              soundManager.playChime();
              fireConfetti();
            }}
          >
            ✦
          </span>
          <span
            className="hero-spark hero-spark--two cursor-pointer"
            onClick={() => {
              soundManager.playChime();
              fireConfetti();
            }}
          >
            ✦
          </span>
          <span className="hero-zigzag">〰</span>
          <span className="hero-motion-lines">{"///"}</span>
        </div>

        <div
          className="hero-note hero-note--yellow cursor-pointer"
          aria-hidden="true"
          onClick={() => soundManager.playHover()}
        >
          Same tools.<br />Bigger possibilities.
        </div>
        <div
          className="hero-note hero-note--coral cursor-pointer"
          aria-hidden="true"
          onClick={() => soundManager.playHover()}
        >
          Design builds<br />better tomorrow.
        </div>

        <div className="hero-desk" aria-hidden="true">
          <span className="hero-smile cursor-pointer" onClick={() => fireConfetti()}>☺</span>
          <span className="hero-desk-note">Good people<br />great projects</span>
          <span className="hero-sketch-pad">Sketch<br />→ ship</span>
        </div>

        <a
          className="hero-scroll-cue"
          href="#work"
          aria-label="Scroll down to selected work"
          onClick={() => soundManager.playClick()}
        >
          <span>Scroll Down</span>
          <ArrowDown aria-hidden="true" weight="bold" />
        </a>
      </div>
    </section>
  );
}
