"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { soundManager } from "./SoundEffects";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

export const ShimmerButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ShimmerButtonProps
>(
  (
    {
      shimmerColor = "#ffffff",
      shimmerSize = "0.08em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(23, 21, 21, 0.96)",
      className,
      children,
      as = "button",
      href,
      target,
      rel,
      onClick,
      onMouseEnter,
      ...props
    },
    ref
  ) => {
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      soundManager.playHover();
      onMouseEnter?.(e as any);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
      soundManager.playClick();
      onClick?.(e as any);
    };

    const commonStyle = {
      "--spread": "90deg",
      "--shimmer-color": shimmerColor,
      "--radius": borderRadius,
      "--speed": shimmerDuration,
      "--cut": shimmerSize,
      "--bg": background,
    } as React.CSSProperties;

    const commonClasses = cn(
      "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border-2 border-black/80 px-6 py-3.5 text-white [background:var(--bg)] [border-radius:var(--radius)]",
      "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-0.5 active:scale-98 hover:scale-[1.02] shadow-[4px_4px_0px_#171515]",
      className
    );

    const innerContent = (
      <>
        {/* Spark container */}
        <div
          className={cn(
            "-z-30 blur-[2px]",
            "absolute inset-0 overflow-visible [container-type:size]"
          )}
        >
          {/* Spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
            {/* Spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={cn(
            "insert-0 absolute size-full",
            "rounded-[inherit] px-4 py-1.5 text-sm font-medium",
            // Transition
            "transform-gpu transition-all duration-300 ease-in-out",
            // Disabled
            "group-disabled:opacity-0"
          )}
        />

        {/* Backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]"
          )}
        />
      </>
    );

    if (as === "a" && href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          style={commonStyle}
          className={commonClasses}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          {...(props as any)}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        style={commonStyle}
        className={commonClasses}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
        {...props}
      >
        {innerContent}
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
