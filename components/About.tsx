"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";

const stats = [
  { value: "UI", label: "Product systems" },
  { value: "3D", label: "Modeling and render" },
  { value: "UX", label: "Flows and prototypes" },
];

export function About() {
  const reduce = useReducedMotion();
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [42, -42]);

  return (
    <section id="about" className="section-pad">
      <div className="container-wide grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div ref={imageRef} className="relative order-2 lg:order-1">
          <ScrollReveal>
            <div className="visual-shell aspect-[4/5] max-w-[560px] bg-[var(--paper-deep)]">
              <motion.div style={{ y }} className="absolute inset-[-8%] mock-grid">
                <div className="render-object" />
                <div className="absolute left-[12%] top-[14%] h-24 w-24 border border-[var(--ink)]/15 bg-[var(--accent)]/50" />
                <div className="absolute bottom-[16%] right-[12%] grid w-44 gap-2">
                  <span className="h-3 bg-[var(--ink)]/50" />
                  <span className="h-3 w-2/3 bg-[var(--ink)]/18" />
                  <span className="h-3 w-4/5 bg-[var(--ink)]/18" />
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>

        <div className="order-1 lg:order-2">
          <ScrollReveal>
            <p className="section-kicker mb-8">Beyond flat screens</p>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <h2 className="display-type max-w-[780px] text-[clamp(3.1rem,7vw,7.4rem)]">
              Designing with structure, motion, and depth.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.16}>
            <p className="body-copy mt-10">
              I work across product design, visual systems, and 3D modeling. My portfolio is built like a studio table: folders, studies, renders, flows, and experiments you can open and inspect.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-px overflow-hidden border border-[var(--faint)] bg-[var(--faint)] sm:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-[var(--paper)] p-6"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, delay: 0.12 + index * 0.08, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="display-type mb-3 text-5xl">{stat.value}</div>
                <p className="font-[var(--font-mono)] text-xs text-[var(--muted)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
