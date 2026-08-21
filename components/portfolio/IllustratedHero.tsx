"use client";

import Image from "next/image";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { type CSSProperties, type PointerEvent, useEffect, useRef } from "react";
import heroCharacterOpen from "@/public/images/hero-character-open-alpha-v2.png";
import heroCharacterBlink from "@/public/images/hero-character-blink-v2.png";

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

  return (
    <section id="top" className="illustrated-hero" aria-labelledby="hero-title">
      <div
        ref={sceneRef}
        className="living-hero-scene"
        data-motion="hero-scene"
        onPointerMove={updateParallax}
        onPointerLeave={resetParallax}
      >
        <div className="hero-grid-lines" aria-hidden="true" />

        <div className="hero-live-copy">
          <p className="hand-label hero-kicker">Branding / 3D / Websites</p>
          <h1 id="hero-title" className="hero-floating-title" data-motion="portfolio-title" aria-label="Kunal Kumar portfolio">
            {title.split("").map((letter, index) => (
              <span key={`${letter}-${index}`} aria-hidden="true" style={{ "--letter-index": index } as LetterStyle}>
                {letter}
              </span>
            ))}
          </h1>
          <p className="hero-live-tagline">
            I help people turn their <strong>ideas</strong> into <em>brands</em> that actually mean something.
          </p>
          <div className="hero-live-actions">
            <a className="pill-button hero-work-button" href="#work">
              Explore my work <ArrowDown aria-hidden="true" weight="bold" />
            </a>
            <span aria-hidden="true">Good ideas deserve loud shapes.</span>
          </div>
        </div>

        <div className="hero-year-burst" aria-hidden="true">
          <span>2026</span>
        </div>

        <div className="hero-character-parallax">
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
          <span className="hero-spark hero-spark--one">✦</span>
          <span className="hero-spark hero-spark--two">✦</span>
          <span className="hero-zigzag">〰</span>
          <span className="hero-motion-lines">{"///"}</span>
        </div>

        <div className="hero-note hero-note--yellow" aria-hidden="true">
          Same tools.<br />Bigger possibilities.
        </div>
        <div className="hero-note hero-note--coral" aria-hidden="true">
          Design builds<br />better tomorrow.
        </div>

        <div className="hero-desk" aria-hidden="true">
          <span className="hero-smile">☺</span>
          <span className="hero-desk-note">Good people<br />great projects</span>
          <span className="hero-sketch-pad">Sketch<br />→ ship</span>
        </div>

        <a className="hero-scroll-cue" href="#work" aria-label="Scroll to selected work">
          <span>Explore</span>
          <ArrowRight aria-hidden="true" weight="bold" />
        </a>
      </div>
    </section>
  );
}
