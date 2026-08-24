"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { soundManager } from "./SoundEffects";

export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  name,
  classNameHeader,
  background,
  Icon,
  description,
  href,
  cta,
  children,
  tag,
  badge,
}: {
  className?: string;
  name: string;
  classNameHeader?: string;
  background?: React.ReactNode;
  Icon?: React.ComponentType<{ className?: string; size?: number; weight?: any }>;
  description: string;
  href?: string;
  cta?: string;
  children?: React.ReactNode;
  tag?: string;
  badge?: string;
}) {
  return (
    <div
      key={name}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6",
        "bg-[var(--white)] border-2 border-[var(--ink)] shadow-[var(--shadow-brutal)] transition-all duration-300 hover:shadow-[var(--shadow-brutal-lg)] hover:-translate-y-1",
        className
      )}
      onMouseEnter={() => soundManager.playHover()}
    >
      {/* Background layer */}
      {background && <div className="absolute inset-0 z-0">{background}</div>}

      {/* Top row */}
      <div className={cn("relative z-10 flex items-start justify-between gap-3", classNameHeader)}>
        {Icon && (
          <div className="flex size-12 items-center justify-center rounded-2xl border-2 border-black/80 bg-[var(--yellow)] text-[var(--ink)] shadow-[2px_2px_0px_#171515] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon size={24} weight="bold" />
          </div>
        )}
        {badge && (
          <span className="inline-flex items-center gap-1 rounded-full border border-black/80 bg-black/5 px-2.5 py-0.5 text-xs font-mono font-bold text-[var(--ink)]">
            {badge}
          </span>
        )}
      </div>

      {/* Center content / Custom children */}
      {children && <div className="relative z-10 my-4 flex-1">{children}</div>}

      {/* Bottom text */}
      <div className="relative z-10 mt-auto pt-4 border-t border-[var(--line)]">
        {tag && (
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[var(--cobalt)]">
            {tag}
          </span>
        )}
        <h3 className="font-display text-xl font-bold text-[var(--ink)] mt-0.5">
          {name}
        </h3>
        <p className="text-sm font-medium text-[var(--ink)]/80 mt-1.5 leading-relaxed">
          {description}
        </p>

        {cta && href && (
          <a
            href={href}
            onClick={() => soundManager.playClick()}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--cobalt)] hover:underline"
          >
            {cta} <span>→</span>
          </a>
        )}
      </div>
    </div>
  );
}
