"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { type CSSProperties, type PointerEvent, useEffect, useRef } from "react";
import heroCharacterOpen from "@/public/images/hero-character-open-alpha-v2.png";
import heroCharacterBlink from "@/public/images/hero-character-blink-v2.png";
import { RetroGrid } from "@/components/ui/RetroGrid";

const name = "KUNAL KUMAR";

type LetterStyle = CSSProperties & {
  "--letter-index": number;
};

export function Hero() {
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
    <section id="top" className="illustrated-hero relative overflow-hidden" aria-labelledby="hero-title">
      <RetroGrid opacity={0.22} angle={60} />

      <div
        ref={sceneRef}
        className="living-hero-scene relative z-10"
        data-motion="hero-scene"
        onPointerMove={updateParallax}
        onPointerLeave={resetParallax}
      >
        <div className="hero-grid-lines" aria-hidden="true" />

        <div className="hero-live-copy">
          <div className="hero-eyebrow-row" data-motion="hero-enter-1">
            <p className="hero-availability">
              <span className="pulse-dot" aria-hidden="true" />
              Available for select projects — 2026
            </p>
            <span className="hero-eyebrow-note">UI/UX · Branding · 3D · Motion</span>
          </div>

          <h1
            id="hero-title"
            className="hero-floating-title"
            data-motion="portfolio-title"
            aria-label="Kunal Kumar — UI/UX designer and 3D artist"
          >
            {name.split("").map((letter, index) => (
              <span
                key={`${letter}-${index}`}
                aria-hidden="true"
                style={{ "--letter-index": index } as LetterStyle}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>

          <p className="hero-role-line" data-motion="hero-enter-2">
            Designing digital experiences where <strong>product</strong>, <em>motion</em> and{" "}
            <strong>3D</strong> meet.
          </p>

          <p className="hero-support-copy" data-motion="hero-enter-3">
            I help ambitious brands turn ideas into thoughtful products, visual identities and
            immersive digital experiences.
          </p>

          <div
            className="hero-live-actions flex flex-wrap items-center gap-4"
            data-motion="hero-enter-4"
          >
            <Link className="pill-button" href="#work">
              <span>View Selected Work</span>
              <ArrowDown aria-hidden="true" weight="bold" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-[var(--paper)] px-6 text-sm font-extrabold tracking-wide text-[var(--paper)] uppercase transition-transform hover:-translate-y-0.5"
              href="/contact"
            >
              Start a Project
              <ArrowRight aria-hidden="true" weight="bold" />
            </Link>
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
              priority
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
          Sketch.
          <br />
          Ship. Repeat.
        </div>
        <div className="hero-note hero-note--coral" aria-hidden="true">
          Useful first.
          <br />
          Unforgettable second.
        </div>

        <div className="hero-desk" aria-hidden="true">
          <span className="hero-desk-note">Good ideas deserve loud shapes</span>
          <span className="hero-sketch-pad">Sketch<br />→ ship</span>
        </div>

        <a
          className="hero-scroll-cue"
          href="#work"
          aria-label="Scroll down to selected work"
        >
          <span>Scroll Down</span>
          <ArrowDown aria-hidden="true" weight="bold" />
        </a>
      </div>
    </section>
  );
}
