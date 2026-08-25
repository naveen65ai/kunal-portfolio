"use client";

import { Lightning, PaintBrush, Cube } from "@phosphor-icons/react";
import { soundManager } from "@/components/ui/SoundEffects";

const valueProps = [
  {
    icon: Lightning,
    title: "Direct Collaboration",
    desc: "Work directly with the person designing your project. No account managers, no lost-in-translation handoffs.",
    color: "var(--yellow)",
  },
  {
    icon: PaintBrush,
    title: "Multidisciplinary Thinking",
    desc: "UI, branding, motion, and 3D are designed together — not stitched together by separate teams.",
    color: "var(--orange)",
  },
  {
    icon: Cube,
    title: "Design With Implementation in Mind",
    desc: "Ideas are built around realistic production constraints. What you approve is what ships.",
    color: "var(--cobalt)",
  },
];

export function StudioValue() {
  return (
    <section id="why-kunal" className="studio-value-section" aria-labelledby="value-heading">
      <div className="value-header" data-reveal>
        <p className="hand-label">Why Work With Me</p>
        <h2 id="value-heading">The craft of an indie builder with studio-level taste.</h2>
      </div>

      <div className="value-pillars-grid" data-reveal>
        {valueProps.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="value-pillar-card"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
            >
              <div className="pillar-icon-box" style={{ backgroundColor: item.color }}>
                <Icon size={24} weight="bold" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
