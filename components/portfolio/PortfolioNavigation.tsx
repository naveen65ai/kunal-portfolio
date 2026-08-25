"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, List, X, Sparkle, MagnifyingGlass, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { fireConfetti } from "./Confetti";
import { soundManager } from "@/components/ui/SoundEffects";

const links = [
  { label: "Work", href: "#work" },
  { label: "Why Me", href: "#why-kunal" },
  { label: "About", href: "#about" },
  { label: "Playground", href: "#playground" },
  { label: "Process", href: "#process" },
  { label: "Estimator", href: "#estimator" },
  { label: "Contact", href: "#contact" },
] as const;

const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=kkunalkumar0055@gmail.com&su=Project%20inquiry%20for%20Kunal";

export function PortfolioNavigation({ onOpenCommandMenu }: { onOpenCommandMenu?: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const clickTimesRef = useRef<number[]>([]);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setIsMuted(soundManager.isMuted());
    return soundManager.subscribe(setIsMuted);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    soundManager.playPowerUp();
    const now = performance.now();
    const recent = clickTimesRef.current.filter((t) => now - t < 1200);
    recent.push(now);
    clickTimesRef.current = recent;

    if (recent.length >= 3) {
      clickTimesRef.current = [];
      const rect = logoRef.current?.getBoundingClientRect();
      fireConfetti(rect ? rect.left + rect.width / 2 : undefined, rect ? rect.top + rect.height / 2 : undefined);
    }
  };

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.body.classList.add("menu-open");
    window.addEventListener("keydown", closeOnEscape);
    const focusFrame = window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const handleCommandTrigger = () => {
    soundManager.playClick();
    if (onOpenCommandMenu) {
      onOpenCommandMenu();
    } else {
      window.dispatchEvent(new CustomEvent("toggle-command-menu"));
    }
  };

  return (
    <header className={`portfolio-nav ${scrolled ? "is-scrolled" : ""}`}>
      {/* Brand Monogram */}
      <a
        ref={logoRef}
        className="burst-logo"
        href="#top"
        aria-label="Kunal Kumar, back to top"
        onClick={handleLogoClick}
        title="Triple click for confetti! 🎉"
      >
        <span>KK</span>
      </a>

      {/* Desktop Navigation Links */}
      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link-item"
            onClick={() => soundManager.playClick()}
            onMouseEnter={() => soundManager.playHover()}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Quick Search & Audio Controls */}
      <div className="hidden lg:flex items-center gap-2">
        <button
          type="button"
          onClick={handleCommandTrigger}
          className="flex items-center gap-1.5 rounded-full border border-black/30 bg-black/5 px-2.5 py-1 text-xs font-mono font-bold text-[var(--ink)] hover:bg-black/10 transition-colors"
          title="Open Command Palette (Cmd+K)"
        >
          <MagnifyingGlass size={13} weight="bold" />
          <span>Cmd+K</span>
        </button>
        <button
          type="button"
          onClick={() => soundManager.toggleMute()}
          className="flex size-7 items-center justify-center rounded-full border border-black/30 bg-black/5 text-[var(--ink)] hover:bg-black/10 transition-colors"
          title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
          aria-label={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
        >
          {isMuted ? <SpeakerSlash size={14} weight="bold" /> : <SpeakerHigh size={14} weight="bold" className="text-amber-600" />}
        </button>
      </div>

      {/* Playful Tagline */}
      <p className="nav-note" aria-hidden="true">
        Good designs,
        <br /> brighter days! ✨
      </p>

      {/* Action CTA */}
      <div className="nav-cta-wrap">
        <a
          className="pill-button nav-cta"
          href={gmailUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playPowerUp()}
        >
          <Sparkle size={15} weight="fill" />
          <span>Let&apos;s talk</span>
          <ArrowRight aria-hidden="true" weight="bold" />
          <span className="sr-only"> (opens Gmail in a new tab)</span>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        ref={menuButtonRef}
        className="nav-menu-button"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => {
          soundManager.playClick();
          setMenuOpen((open) => !open);
        }}
      >
        {menuOpen ? <X aria-hidden="true" weight="bold" /> : <List aria-hidden="true" weight="bold" />}
      </button>

      {/* Mobile Menu Drawer */}
      <div id="mobile-navigation" className={`mobile-navigation ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a
              ref={index === 0 ? firstLinkRef : undefined}
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                soundManager.playClick();
                setMenuOpen(false);
              }}
            >
              {link.label} <ArrowRight aria-hidden="true" />
            </a>
          ))}
          <button
            type="button"
            className="flex items-center justify-between w-full py-3 px-4 rounded-xl border border-black/20 bg-amber-50 font-bold text-left my-2"
            onClick={() => {
              setMenuOpen(false);
              handleCommandTrigger();
            }}
          >
            <span className="flex items-center gap-2">
              <MagnifyingGlass size={16} weight="bold" /> Search & Commands
            </span>
            <kbd className="text-xs font-mono bg-black/10 px-1.5 py-0.5 rounded">Cmd+K</kbd>
          </button>
          <a
            className="mobile-gmail"
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => soundManager.playPowerUp()}
          >
            Start a project in Gmail <ArrowRight aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
