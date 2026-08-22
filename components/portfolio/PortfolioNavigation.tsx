"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { fireConfetti } from "./Confetti";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Playground", href: "#playground" },
  { label: "Contact", href: "#contact" },
] as const;

const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=kkunalkumar0055%40gmail.com&su=Project%20inquiry%20for%20Kunal";

export function PortfolioNavigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const clickTimesRef = useRef<number[]>([]);
  const logoRef = useRef<HTMLAnchorElement>(null);

  const handleLogoClick = () => {
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

  return (
    <header className="portfolio-nav">
      <a
        ref={logoRef}
        className="burst-logo"
        href="#top"
        aria-label="Kunal Kumar, back to top"
        onClick={handleLogoClick}
      >
        <span>KK</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <p className="nav-note" aria-hidden="true">
        Good designs,
        <br /> brighter days!
      </p>

      <a className="pill-button nav-cta" href={gmailUrl} target="_blank" rel="noopener noreferrer">
        Let&apos;s talk <ArrowRight aria-hidden="true" weight="bold" />
        <span className="sr-only"> (opens Gmail in a new tab)</span>
      </a>

      <button
        ref={menuButtonRef}
        className="nav-menu-button"
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X aria-hidden="true" weight="bold" /> : <List aria-hidden="true" weight="bold" />}
      </button>

      <div id="mobile-navigation" className={`mobile-navigation ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <a
              ref={index === 0 ? firstLinkRef : undefined}
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              {link.label} <ArrowRight aria-hidden="true" />
            </a>
          ))}
          <a
            className="mobile-gmail"
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
          >
            Open Gmail <ArrowRight aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
