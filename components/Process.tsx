"use client";

import { ScrollReveal } from "./ScrollReveal";

const steps = [
  {
    title: "Read the room",
    desc: "Clarify audience, emotion, constraints, references, and the job the interface needs to do.",
  },
  {
    title: "Map the system",
    desc: "Turn research into flows, hierarchy, states, and a component language that can grow.",
  },
  {
    title: "Prototype the feel",
    desc: "Use motion, spacing, and 3D studies to test how the product behaves in the hand and eye.",
  },
  {
    title: "Package the work",
    desc: "Prepare specs, assets, responsive states, and handoff notes so the build keeps its intent.",
  },
];

export function Process() {
  return (
    <section id="process" className="section-pad">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <p className="section-kicker mb-8">Process</p>
              <h2 className="display-type max-w-[660px] text-[clamp(3rem,7vw,7rem)]">
                How the work moves.
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid border-t border-[var(--faint)]">
            {steps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 0.04}>
                <article className="grid gap-5 border-b border-[var(--faint)] py-8 md:grid-cols-[120px_1fr]">
                  <span className="font-[var(--font-mono)] text-sm text-[var(--accent-deep)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="mb-3 text-2xl font-semibold">{step.title}</h3>
                    <p className="body-copy text-base">{step.desc}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
