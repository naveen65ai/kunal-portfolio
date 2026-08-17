"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "@phosphor-icons/react";

const headline = ["UI", "MEETS", "SPATIAL", "DESIGN"];

const fragments = [
  { label: "Mobile flow", className: "left-[5%] top-[28%] rotate-[-7deg]" },
  { label: "3D form", className: "right-[8%] top-[18%] rotate-[8deg]" },
  { label: "Prototype", className: "right-[18%] bottom-[14%] rotate-[-5deg]" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24">
      <div className="container-wide relative z-10 grid gap-12 lg:grid-cols-[1fr_0.58fr] lg:items-end">
        <div>
          <motion.p
            className="section-kicker mb-8"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Kunal Kumar, UI UX designer and 3D artist
          </motion.p>

          <h1 className="display-type max-w-[1120px] text-[clamp(4rem,14vw,13.8rem)]">
            {headline.map((word, index) => (
              <span key={word} className="mr-[0.08em] inline-block overflow-hidden pb-2">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "112%" }}
                  animate={{ y: entered ? 0 : "112%" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.14 + index * 0.08,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          className="mb-4 grid gap-8 lg:justify-items-end"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.19, 1, 0.22, 1] }}
        >
          <p className="body-copy max-w-[38ch] lg:text-right">
            I design product interfaces, 3D visuals, and motion systems that make digital work feel tactile, clear, and memorable.
          </p>
          <div className="flex flex-wrap gap-5 lg:justify-end">
            <a href="#work" className="magnetic-link" data-cursor="Open">
              Selected folders <ArrowDownRight size={16} weight="bold" />
            </a>
            <a href="#contact" className="magnetic-link" data-cursor="Mail">
              Start a project <ArrowUpRight size={16} weight="bold" />
            </a>
          </div>
        </motion.div>
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        {fragments.map((fragment, index) => (
          <motion.div
            key={fragment.label}
            className={`visual-shell mock-grid absolute hidden h-36 w-56 p-4 shadow-[18px_22px_0_rgba(22,22,19,0.08)] md:block ${fragment.className}`}
            initial={reduce ? false : { opacity: 0, y: 44, rotate: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 + index * 0.12, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="mb-8 h-2 w-20 rounded-full bg-[var(--ink)]/20" />
            <div className="grid gap-2">
              <span className="h-5 rounded bg-[var(--accent)]/70" />
              <span className="h-5 w-2/3 rounded bg-[var(--ink)]/12" />
              <span className="h-5 w-4/5 rounded bg-[var(--blue)]/30" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
