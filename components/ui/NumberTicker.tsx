"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  className?: string;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  className,
  delay = 0,
  prefix = "",
  suffix = "",
  decimalPlaces = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<number>(
    direction === "down" ? value : 0
  );
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          setTimeout(() => {
            const duration = 1600; // ms
            const start = performance.now();
            const startVal = direction === "down" ? value : 0;
            const endVal = direction === "down" ? 0 : value;

            const animate = (time: number) => {
              const elapsed = time - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const current = startVal + (endVal - startVal) * easeOut;

              setDisplayValue(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(endVal);
              }
            };

            requestAnimationFrame(animate);
          }, delay * 1000);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, direction, delay, hasAnimated]);

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums font-bold", className)}
    >
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      })}
      {suffix}
    </span>
  );
}
