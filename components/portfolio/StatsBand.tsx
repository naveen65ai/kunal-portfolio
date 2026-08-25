"use client";

import { useEffect, useRef, useState } from "react";
import { Trophy, CheckCircle, Star, TrendUp } from "@phosphor-icons/react";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { soundManager } from "@/components/ui/SoundEffects";

type Stat = {
  value: number;
  suffix: string;
  label: string;
  note: string;
  color: string;
};

const stats: Stat[] = [
  {
    value: 40,
    suffix: "+",
    label: "Projects Shipped",
    note: "From napkin sketch to live release",
    color: "var(--cobalt)",
  },
  {
    value: 100,
    suffix: "%",
    label: "On-Time Milestone Rate",
    note: "Zero missed launch deadlines",
    color: "var(--orange)",
  },
  {
    value: 4,
    suffix: ".8M+",
    label: "Client Value & Raised",
    note: "Measurable commercial impact",
    color: "var(--green)",
  },
  {
    value: 5,
    suffix: ".0",
    label: "Average Rating",
    note: "On every studio collaboration",
    color: "var(--yellow)",
  },
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

        const duration = 1500;
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
      <div className="stats-container">
        <ol className="stats-list">
          {stats.map((stat, idx) => (
            <Card3DTilt key={stat.label} maxTilt={6} scale={1.02} className="h-full">
              <li
                className="stat-card h-full relative overflow-hidden cursor-pointer"
                data-reveal
                onMouseEnter={() => soundManager.playHover()}
                onClick={() => soundManager.playClick()}
              >
                {idx === 0 && (
                  <BorderBeam size={140} duration={8} colorFrom="#1762dc" colorTo="#ffc62f" />
                )}
                <p className="stat-value">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="stat-label">{stat.label}</p>
                <p className="stat-note">{stat.note}</p>
              </li>
            </Card3DTilt>
          ))}
        </ol>
      </div>
    </section>
  );
}
