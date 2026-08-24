"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { soundManager } from "./SoundEffects";

export function BentoGrid({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bento-grid-container ${className}`}>
      {children}
    </div>
  );
}

export function BentoCard({
  className = "",
  name,
  classNameHeader = "",
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
      className={`bento-card-root ${className}`}
      onMouseEnter={() => soundManager.playHover()}
    >
      {/* Background layer */}
      {background && <div className="bento-card-bg">{background}</div>}

      {/* Top row */}
      <div className={`bento-card-top-row ${classNameHeader}`}>
        {Icon && (
          <div className="bento-card-icon-box">
            <Icon size={24} weight="bold" />
          </div>
        )}
        {badge && (
          <span className="bento-card-badge">
            {badge}
          </span>
        )}
      </div>

      {/* Center content / Custom children */}
      {children && <div className="bento-card-center-body">{children}</div>}

      {/* Bottom text */}
      <div className="bento-card-bottom-info">
        {tag && (
          <span className="bento-card-tag">
            {tag}
          </span>
        )}
        <h3 className="bento-card-title">
          {name}
        </h3>
        <p className="bento-card-desc">
          {description}
        </p>

        {cta && href && (
          <a
            href={href}
            onClick={() => soundManager.playClick()}
            className="bento-card-cta"
          >
            {cta} <span>→</span>
          </a>
        )}
      </div>
    </div>
  );
}
