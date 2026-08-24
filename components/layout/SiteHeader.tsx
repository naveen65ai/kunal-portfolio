"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close the mobile drawer whenever the route changes (adjusted during render)
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const isActive = (href: string) =>
    href === "/work" ? pathname === "/work" || pathname.startsWith("/work/") : pathname === href;

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link className="burst-logo" href="/" aria-label="Kunal Kumar, back to home">
        <span>KK</span>
      </Link>

      <nav className="site-header-links" aria-label="Main navigation">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`site-header-link ${isActive(link.href) ? "is-active" : ""}`}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="site-header-actions">
        <Link className="availability-pill" href="/contact">
          <span className="pulse-dot" aria-hidden="true" />
          <span className="availability-pill-text">Available for projects</span>
        </Link>

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
      </div>

      <div id="mobile-navigation" className={`mobile-navigation ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile navigation">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              ref={index === 0 ? firstLinkRef : undefined}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label} <ArrowRight aria-hidden="true" />
            </Link>
          ))}
          <a
            className="mobile-gmail"
            href="mailto:kkunalkumar0055@gmail.com?subject=Project%20inquiry%20for%20Kunal"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            Start a project <ArrowRight aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
