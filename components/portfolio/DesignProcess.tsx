"use client";

import type { CSSProperties } from "react";
import { Ear, PencilSimpleLine, Cube, Sparkle, Check } from "@phosphor-icons/react";

const steps = [
  {
    number: "01",
    title: "Listen & Align",
    icon: Ear,
    timeline: "Days 1–3",
    copy: "We uncover the business objective, audience psychology, competitive landscape, and the single emotional tension the product must resolve.",
    deliverables: ["Product Brief Alignment", "Moodboard & Visual Territories", "User Journey Flow Map"],
  },
  {
    number: "02",
    title: "Wireframe & 3D Concepts",
    icon: PencilSimpleLine,
    timeline: "Week 1",
    copy: "Rapid exploration of structural layouts, information hierarchy, spatial 3D metaphors, and responsive mobile architecture.",
    deliverables: ["Low/Mid-Fidelity Wireframes", "3D Style Frames & Shader Tests", "Architecture Review Deck"],
  },
  {
    number: "03",
    title: "Design & High-Fi Prototype",
    icon: Cube,
    timeline: "Weeks 2–3",
    copy: "Transforming wireframes into stunning high-fidelity screens, interactive prototypes in Figma, 60fps micro-animations, and custom 3D visuals.",
    deliverables: ["Full Interactive Prototype", "Bespoke 3D Assets & WebGL Files", "Typography & Color Architecture"],
  },
  {
    number: "04",
    title: "Render, Polish & Master Assets",
    icon: Sparkle,
    timeline: "Week 4",
    copy: "High-resolution 3D renders, vector assets, master brand guidelines, organized Figma design system files, and complete export packages ready for launch.",
    deliverables: ["Master 3D Renders & Models", "Complete Figma Design System", "Brand Guidelines & Asset Deck"],
  },
] as const;

import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { soundManager } from "@/components/ui/SoundEffects";

export function DesignProcess() {
  return (
    <section id="process" className="design-process" aria-labelledby="process-title">
      <div className="process-inner-container">
        <div className="section-intro" data-reveal>
          <div className="section-intro-left">
            <div className="work-header-badge-row">
              <p className="hand-label">✦ How great ideas become reality</p>
            </div>
            <h2 id="process-title">Same tools. Bigger possibilities.</h2>
          </div>
          <div className="section-intro-right">
            <p className="work-discription">
              A predictable 4-step framework designed to eliminate guesswork, speed up decisions, and
              ensure your launch is nothing short of breathtaking.
            </p>
          </div>
        </div>

        <ol className="process-grid-layout">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card3DTilt key={step.number} maxTilt={6} scale={1.02}>
                <li
                  data-reveal
                  style={{ "--reveal-delay": `${index * 100}ms` } as CSSProperties}
                  className="process-step-card"
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => soundManager.playClick()}
                >
                  <div>
                    <div className="process-step-top">
                      <span className="process-step-number">{step.number}</span>
                      <span className="process-step-timeline">{step.timeline}</span>
                    </div>

                    <div className="process-step-icon">
                      <Icon size={24} weight="bold" />
                    </div>

                    <h3 className="process-step-title">{step.title}</h3>
                    <p className="process-step-copy">{step.copy}</p>
                  </div>

                  <div className="process-step-deliverables">
                    <span className="process-deliverables-label">Deliverables:</span>
                    <ul className="process-deliverables-list">
                      {step.deliverables.map((item) => (
                        <li key={item} className="process-deliverables-item">
                          <Check size={14} weight="bold" className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Card3DTilt>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
