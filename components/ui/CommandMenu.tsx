"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  MagnifyingGlass,
  X,
  Sparkle,
  SpeakerHigh,
  SpeakerSlash,
  Monitor,
  EnvelopeSimple,
  Calculator,
  Compass,
  FolderOpen,
  User,
  ArrowRight,
  LinkedinLogo,
} from "@phosphor-icons/react";
import { soundManager } from "./SoundEffects";
import { crtManager } from "./CrtScanlines";
import { fireConfetti } from "@/components/portfolio/Confetti";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Actions" | "Features";
  icon: React.ComponentType<{ size?: number; weight?: any; className?: string }>;
  perform: () => void;
  shortcut?: string;
}

export function CommandMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const [isCrt, setIsCrt] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !containerRef.current) return;

    const focusable = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    setIsMuted(soundManager.isMuted());
    const unsubSound = soundManager.subscribe(setIsMuted);
    setIsCrt(crtManager.isActive());
    const unsubCrt = crtManager.subscribe(setIsCrt);
    return () => {
      unsubSound();
      unsubCrt();
    };
  }, []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        soundManager.playClick();
        if (isOpen) {
          onClose();
        } else {
          // Open menu via custom event or props
          const event = new CustomEvent("toggle-command-menu");
          window.dispatchEvent(event);
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items: CommandItem[] = [
    {
      id: "nav-work",
      title: "Jump to Selected Work (Case Studies)",
      category: "Navigation",
      icon: FolderOpen,
      perform: () => {
        window.location.hash = "#work";
        onClose();
      },
    },
    {
      id: "nav-about",
      title: "Jump to About Studio & Capabilities",
      category: "Navigation",
      icon: User,
      perform: () => {
        window.location.hash = "#about";
        onClose();
      },
    },
    {
      id: "nav-playground",
      title: "Jump to Creative Playground & CD Player",
      category: "Navigation",
      icon: Compass,
      perform: () => {
        window.location.hash = "#playground";
        onClose();
      },
    },
    {
      id: "nav-estimator",
      title: "Launch Interactive Project Estimator",
      category: "Navigation",
      icon: Calculator,
      perform: () => {
        window.location.hash = "#estimator";
        onClose();
      },
    },
    {
      id: "action-sound",
      title: isMuted ? "Turn Sound FX ON" : "Mute Sound FX",
      category: "Actions",
      icon: isMuted ? SpeakerHigh : SpeakerSlash,
      perform: () => {
        soundManager.toggleMute();
      },
      shortcut: "S",
    },
    {
      id: "action-crt",
      title: isCrt ? "Disable CRT Scanlines Mode" : "Enable Retro CRT Scanlines Mode",
      category: "Actions",
      icon: Monitor,
      perform: () => {
        crtManager.toggle();
        soundManager.playClick();
      },
      shortcut: "C",
    },
    {
      id: "action-confetti",
      title: "Celebrate! Fire Studio Confetti ✦",
      category: "Actions",
      icon: Sparkle,
      perform: () => {
        fireConfetti();
        soundManager.playChime();
        onClose();
      },
    },
    {
      id: "action-email",
      title: "Copy Kunal's Direct Email (kkunalkumar0055@gmail.com)",
      category: "Actions",
      icon: EnvelopeSimple,
      perform: () => {
        navigator.clipboard.writeText("kkunalkumar0055@gmail.com");
        soundManager.playChime();
        alert("Copied kkunalkumar0055@gmail.com to clipboard! 📬");
        onClose();
      },
    },
    {
      id: "social-linkedin",
      title: "Connect with Kunal on LinkedIn",
      category: "Actions",
      icon: LinkedinLogo,
      perform: () => {
        window.open("https://www.linkedin.com/in/kunal-kunal-kumar-", "_blank");
        onClose();
      },
    },
  ];

  const filtered = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border-2 border-black bg-[var(--paper)] p-2 shadow-[8px_8px_0px_#171515] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="relative flex items-center border-b-2 border-black/10 px-4 py-3">
          <MagnifyingGlass size={20} weight="bold" className="text-[var(--ink)]/60" />
          <input
            autoFocus
            type="text"
            placeholder="Search commands, navigate sections, or toggle modes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent px-3 text-base font-semibold text-[var(--ink)] placeholder:text-[var(--ink)]/40 focus:outline-none"
          />
          <kbd className="hidden sm:inline-block rounded-md border border-black/20 bg-black/5 px-2 py-0.5 text-xs font-mono font-bold text-[var(--ink)]/70">
            ESC
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="ml-2 rounded-full p-1 text-[var(--ink)] hover:bg-black/10 transition-colors"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm font-medium text-[var(--ink)]/60">
              No matching commands found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    item.perform();
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className="flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-all hover:bg-[var(--yellow)] hover:shadow-sm group border border-transparent hover:border-black/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-lg border border-black/20 bg-[var(--white)] text-[var(--ink)] shadow-xs group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon size={16} weight="bold" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--ink)]">
                        {item.title}
                      </div>
                      <span className="text-[11px] font-mono text-[var(--ink)]/60">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.shortcut && (
                      <kbd className="rounded border border-black/20 bg-black/5 px-1.5 py-0.5 text-[10px] font-mono font-bold">
                        {item.shortcut}
                      </kbd>
                    )}
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="text-[var(--ink)]/40 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t-2 border-black/10 px-4 py-2 text-xs font-mono text-[var(--ink)]/60 bg-black/5 rounded-b-2xl">
          <span>Navigate with mouse or keyboard</span>
          <span>Kunal Studio Command Palette</span>
        </div>
      </div>
    </div>
  );
}
