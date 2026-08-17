"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrollReveal } from "./ScrollReveal";

const works = [
  { title: "Soft mechanical form", meta: "Blender render study", span: "lg:col-span-2", tone: "orange" },
  { title: "Interface object", meta: "UI as material", span: "", tone: "blue" },
  { title: "Hard surface detail", meta: "Modeling pass", span: "", tone: "olive" },
  { title: "Scene lighting", meta: "Cinematic material test", span: "lg:col-span-2", tone: "rose" },
];

function RenderTile({ work, index }: { work: (typeof works)[number]; index: number }) {
  const reduce = useReducedMotion();
  const color =
    work.tone === "blue"
      ? "var(--blue)"
      : work.tone === "olive"
        ? "var(--olive)"
        : work.tone === "rose"
          ? "var(--rose)"
          : "var(--accent)";

  return (
    <motion.article
      className={`visual-shell mock-grid min-h-[360px] p-6 ${work.span}`}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.19, 1, 0.22, 1] }}
      data-cursor="Render"
    >
      <div
        className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2 rounded-[44%_56%_42%_58%] shadow-[30px_34px_80px_rgba(22,22,19,0.24)]"
        style={{
          background: `radial-gradient(circle at 32% 25%, rgba(255,255,255,.9), transparent 14%), linear-gradient(135deg, var(--cream), ${color} 48%, var(--ink))`,
        }}
      />
      <div className="absolute left-6 top-6 font-[var(--font-mono)] text-xs text-[var(--muted)]">
        {work.meta}
      </div>
      <h3 className="display-type absolute bottom-6 left-6 right-6 max-w-[11ch] text-[clamp(2.4rem,5vw,5.4rem)]">
        {work.title}
      </h3>
    </motion.article>
  );
}

export function ThreeDWorks() {
  return (
    <section id="3d-works" className="section-pad">
      <div className="container-wide">
        <ScrollReveal>
          <p className="section-kicker mb-8">3D practice</p>
          <h2 className="display-type mb-14 max-w-[940px] text-[clamp(3.2rem,8vw,8.2rem)]">
            Objects, surfaces, light.
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {works.map((work, index) => (
            <RenderTile key={work.title} work={work} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
