"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";

const tools = [
  "Figma",
  "Blender",
  "After Effects",
  "Photoshop",
  "Illustrator",
  "Framer",
  "Cinema 4D",
  "Substance Painter",
];

export function Tools() {
  const reduce = useReducedMotion();
  const rail = [...tools, ...tools, ...tools];

  return (
    <section className="overflow-hidden py-24">
      <div className="container-wide mb-12">
        <ScrollReveal>
          <p className="section-kicker mb-8">Tools</p>
          <h2 className="display-type max-w-[860px] text-[clamp(3rem,7vw,7rem)]">
            Built with familiar hands.
          </h2>
        </ScrollReveal>
      </div>

      <div className="relative border-y border-[var(--faint)] py-5">
        <motion.div
          className="flex w-max gap-3"
          animate={reduce ? {} : { x: ["0%", "-33.333%"] }}
          transition={{ x: { duration: 28, repeat: Infinity, ease: "linear" } }}
        >
          {rail.map((tool, index) => (
            <span
              key={`${tool}-${index}`}
              className="shrink-0 border border-[var(--faint)] bg-[var(--paper-deep)] px-7 py-4 font-[var(--font-mono)] text-xs text-[var(--ink)]"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
