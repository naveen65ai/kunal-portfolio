"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FolderOpen,
  User,
  Compass,
  Calculator,
  SpeakerHigh,
  SpeakerSlash,
  Monitor,
  MagnifyingGlass,
  ArrowUp,
  EnvelopeSimple,
  Sparkle,
} from "@phosphor-icons/react";
import { soundManager } from "./SoundEffects";
import { crtManager } from "./CrtScanlines";
import { cn } from "@/lib/utils";

interface DockItem {
  title: string;
  icon: React.ComponentType<{ size?: number; weight?: any; className?: string }>;
  href?: string;
  onClick?: () => void;
  badge?: string;
}

export function FloatingDock({
  onOpenCommandMenu,
  className,
}: {
  onOpenCommandMenu: () => void;
  className?: string;
}) {
  const [isMuted, setIsMuted] = useState(true);
  const [isCrt, setIsCrt] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

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

  const items: DockItem[] = [
    {
      title: "Projects",
      icon: FolderOpen,
      href: "#work",
    },
    {
      title: "About",
      icon: User,
      href: "#about",
    },
    {
      title: "Playground",
      icon: Compass,
      href: "#playground",
    },
    {
      title: "Estimator",
      icon: Calculator,
      href: "#estimator",
      badge: "Quote",
    },
    {
      title: isMuted ? "Sound: OFF" : "Sound: ON",
      icon: isMuted ? SpeakerSlash : SpeakerHigh,
      onClick: () => {
        soundManager.toggleMute();
      },
    },
    {
      title: isCrt ? "CRT: Active" : "CRT Retro Mode",
      icon: Monitor,
      onClick: () => {
        crtManager.toggle();
        soundManager.playClick();
      },
    },
    {
      title: "Search / Cmd+K",
      icon: MagnifyingGlass,
      onClick: () => {
        soundManager.playClick();
        onOpenCommandMenu();
      },
    },
    {
      title: "Hire Kunal",
      icon: EnvelopeSimple,
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=kkunalkumar0055@gmail.com&su=Project%20inquiry%20from%20dock",
    },
    {
      title: "Top",
      icon: ArrowUp,
      href: "#top",
    },
  ];

  return (
    <aside
      aria-label="Quick navigation dock"
      className={cn(
        "fixed bottom-5 left-1/2 -translate-x-1/2 z-[900] flex items-center gap-1.5 rounded-full border-2 border-black/80 bg-[var(--white)]/90 px-3 py-2 shadow-[4px_6px_0px_#171515] backdrop-blur-md transition-all duration-300 hover:shadow-[6px_8px_0px_#171515]",
        className
      )}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const isHovered = hoveredIdx === idx;
        const isAdjacent =
          hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

        const sizeScale = isHovered
          ? "scale-125 -translate-y-2 bg-[var(--yellow)] border-black text-black"
          : isAdjacent
          ? "scale-110 -translate-y-1 bg-black/5"
          : "scale-100 bg-transparent text-[var(--ink)]";

        const content = (
          <div
            className={cn(
              "relative flex size-10 items-center justify-center rounded-full border border-black/20 transition-all duration-200 ease-out cursor-pointer",
              sizeScale
            )}
            onMouseEnter={() => {
              soundManager.playHover();
              setHoveredIdx(idx);
            }}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <Icon size={18} weight="bold" />

            {item.badge && (
              <span className="absolute -top-1 -right-1 flex size-3 items-center justify-center rounded-full bg-[var(--orange)] border border-black" />
            )}

            {/* Hover Tooltip */}
            {isHovered && (
              <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-black/80 bg-black px-2 py-0.5 text-[11px] font-mono font-bold text-white shadow-md animate-fade-in">
                {item.title}
              </div>
            )}
          </div>
        );

        if (item.href) {
          return (
            <a
              key={item.title}
              href={item.href}
              onClick={() => soundManager.playClick()}
              aria-label={item.title}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={item.title}
            type="button"
            onClick={item.onClick}
            aria-label={item.title}
          >
            {content}
          </button>
        );
      })}
    </aside>
  );
}
