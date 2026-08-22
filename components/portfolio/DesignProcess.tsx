import type { CSSProperties } from "react";

const steps = [
  { number: "01", title: "Listen", copy: "Find the tension, the audience, and the one thing the work must make clear." },
  { number: "02", title: "Sketch", copy: "Turn loose ideas into flows, frames, visual territories, and quick experiments." },
  { number: "03", title: "Build", copy: "Make the system real through interface, image, 3D, motion, and prototypes." },
  { number: "04", title: "Refine", copy: "Test every detail until the work feels natural, expressive, and ready to move." },
] as const;

export function DesignProcess() {
  return (
    <section className="design-process" aria-labelledby="process-title">
      <div className="process-heading" data-reveal>
        <p className="hand-label">How good ideas get real</p>
        <h2 id="process-title">Same tools. Bigger possibilities.</h2>
      </div>

      <ol className="process-notes">
        {steps.map((step, index) => (
          <li key={step.number} data-reveal style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
