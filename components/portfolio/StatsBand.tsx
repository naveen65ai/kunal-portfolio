"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  note: string;
};

const stats: Stat[] = [
  { value: 3, suffix: "+", label: "Years crafting", note: "UI, brand & 3D" },
  { value: 40, suffix: "+", label: "Projects shipped", note: "From sketch to launch" },
  { value: 18, suffix: "+", label: "Happy clients", note: "Startups to studios" },
  { value: 5, suffix: ".0", label: "Average rating", note: "On every collaboration" },
];

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let started = false;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started) return;
        started = true;
        observer.disconnect();

        if (reducedMotion) {
          frame = requestAnimationFrame(() => setDisplay(target));
          return;
        }

        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setDisplay(Math.round(easeOutCubic(progress) * target));
          if (progress < 1) {
            frame = requestAnimationFrame(tick);
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  return (
    <section className="stats-band" aria-label="Kunal in numbers">
      <ol>
        {stats.map((stat) => (
          <li key={stat.label}>
            <p className="stat-value">
              <CountUp target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-note">{stat.note}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
