"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

interface SparklesTextProps {
  text: string;
  className?: string;
  sparklesCount?: number;
  colors?: {
    first: string;
    second: string;
  };
  as?: React.ElementType;
}

export function SparklesText({
  text,
  className,
  sparklesCount = 6,
  colors = { first: "#ffc62f", second: "#ff704f" },
  as: Component = "span",
}: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles: Sparkle[] = Array.from({ length: sparklesCount }).map(
        (_, i) => ({
          id: `${i}-${Math.random()}`,
          x: `${Math.floor(Math.random() * 95)}%`,
          y: `${Math.floor(Math.random() * 90)}%`,
          color: i % 2 === 0 ? colors.first : colors.second,
          delay: Math.random() * 2,
          scale: Math.random() * 0.7 + 0.6,
          lifespan: Math.random() * 1.5 + 1.2,
        })
      );
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 2500);
    return () => clearInterval(interval);
  }, [sparklesCount, colors.first, colors.second]);

  return (
    <Component className={cn("relative inline-block font-display", className)}>
      <span className="relative z-10 bg-gradient-to-r from-[var(--ink)] via-[var(--cobalt)] to-[var(--orange)] bg-clip-text text-transparent">
        {text}
      </span>

      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="pointer-events-none absolute z-20 animate-sparkle"
          style={{
            left: sparkle.x,
            top: sparkle.y,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.lifespan}s`,
            transform: `scale(${sparkle.scale})`,
          }}
          aria-hidden="true"
        >
          <svg
            className="size-4.5 drop-shadow-[0_0_6px_rgba(255,198,47,0.8)]"
            viewBox="0 0 24 24"
            fill={sparkle.color}
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </span>
      ))}
    </Component>
  );
}
