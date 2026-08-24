"use client";

import { useState } from "react";
import {
  Check,
  ArrowRight,
  Calculator,
  CalendarCheck,
  PaperPlaneRight,
} from "@phosphor-icons/react";

type ScopeItem = {
  id: string;
  name: string;
  baseDays: number;
  description: string;
};

const scopeOptions: ScopeItem[] = [
  {
    id: "uiux",
    name: "Product & UI/UX Design",
    baseDays: 14,
    description: "End-to-end mobile or web UX flows, wireframes, and an interactive Figma system.",
  },
  {
    id: "3d",
    name: "3D Art & Spatial Visuals",
    baseDays: 10,
    description: "Custom 3D objects, key visuals, interactive WebGL assets, and motion loops.",
  },
  {
    id: "brand",
    name: "Brand Identity System",
    baseDays: 12,
    description: "Distinctive logo, typography scales, color architecture, and brand guidelines.",
  },
  {
    id: "website",
    name: "Website Design",
    baseDays: 10,
    description: "A storytelling site designed to present your work clearly and convert visitors.",
  },
  {
    id: "design-system",
    name: "Design System & Asset Library",
    baseDays: 8,
    description: "Reusable component tokens, variant libraries, and organized design files.",
  },
];

type ProjectTier = "mvp" | "standard" | "flagship";

export function ProjectEstimator() {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["uiux", "3d"]);
  const [tier, setTier] = useState<ProjectTier>("standard");
  const [timeline, setTimeline] = useState<"fast" | "standard" | "flexible">("standard");

  const toggleScope = (id: string) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id],
    );
  };

  // Compute estimated delivery window
  const baseDays = selectedScopes.reduce((acc, id) => {
    const item = scopeOptions.find((s) => s.id === id);
    return acc + (item?.baseDays || 0);
  }, 0);

  const tierMultiplier = tier === "mvp" ? 0.75 : tier === "standard" ? 1.0 : 1.4;
  const totalDays = Math.round(baseDays * tierMultiplier);
  const estimatedWeeks = Math.max(2, Math.round(totalDays / 5));

  const selectedNames = selectedScopes
    .map((id) => scopeOptions.find((s) => s.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  const emailSubject = encodeURIComponent(
    `Project inquiry: ${selectedNames || "New project"} (~${estimatedWeeks} weeks)`,
  );
  const emailBody = encodeURIComponent(
    `Hi Kunal,\n\nI put together an estimate on your portfolio with this scope:\n\n` +
      `Disciplines: ${selectedNames}\n` +
      `Depth: ${tier}\n` +
      `Estimated timeline: ~${estimatedWeeks} weeks (${timeline})\n\n` +
      `Project brief:\n[Describe your idea, company and goals here]\n\nThanks!`,
  );

  const handleInquire = () => {
    window.location.href = `mailto:kkunalkumar0055@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <section id="estimator" className="project-estimator-section" aria-labelledby="estimator-title">
      <div className="estimator-header" data-reveal>
        <p className="hand-label">Scope & Timeline Builder</p>
        <h2 id="estimator-title">Sketch your project scope in 30 seconds.</h2>
        <p className="estimator-subtitle">
          Select what you need and get a realistic delivery window. Final quotes are confirmed
          after a short conversation.
        </p>
      </div>

      <div className="estimator-container" data-reveal>
        {/* Left Configurator Column */}
        <div className="estimator-configurator">
          <div className="estimator-group">
            <span className="group-label">
              <span className="step-num">1</span> Select what you need:
            </span>
            <div className="scope-pills-grid">
              {scopeOptions.map((option) => {
                const isSelected = selectedScopes.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`scope-pill-btn ${isSelected ? "is-selected" : ""}`}
                    onClick={() => toggleScope(option.id)}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="scope-name">{option.name}</span>
                      <span className="scope-check">{isSelected && <Check size={14} weight="bold" />}</span>
                    </div>
                    <p className="scope-desc">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="estimator-group">
            <span className="group-label">
              <span className="step-num">2</span> Project depth:
            </span>
            <div className="tier-selector-row">
              <button
                type="button"
                aria-pressed={tier === "mvp"}
                className={`tier-btn ${tier === "mvp" ? "is-selected" : ""}`}
                onClick={() => setTier("mvp")}
              >
                <strong>Quick Sprint / MVP</strong>
                <span>Core essentials & rapid launch</span>
              </button>
              <button
                type="button"
                aria-pressed={tier === "standard"}
                className={`tier-btn ${tier === "standard" ? "is-selected" : ""}`}
                onClick={() => setTier("standard")}
              >
                <strong>Full Product Build</strong>
                <span>Complete design, 3D & token system</span>
              </button>
              <button
                type="button"
                aria-pressed={tier === "flagship"}
                className={`tier-btn ${tier === "flagship" ? "is-selected" : ""}`}
                onClick={() => setTier("flagship")}
              >
                <strong>Flagship Overhaul</strong>
                <span>Deep research, bespoke 3D & spatial web</span>
              </button>
            </div>
          </div>

          <div className="estimator-group">
            <span className="group-label">
              <span className="step-num">3</span> Desired pace:
            </span>
            <div className="pace-selector-row">
              {(
                [
                  ["fast", "Fast-track sprint"],
                  ["standard", "Standard cadence"],
                  ["flexible", "Flexible staged rollout"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={timeline === value}
                  className={`pace-btn ${timeline === value ? "is-selected" : ""}`}
                  onClick={() => setTimeline(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="w-full lg:w-auto">
          <div className="estimator-summary-card relative overflow-hidden">
            <div className="summary-card-header">
              <div className="flex items-center gap-2">
                <Calculator size={20} weight="bold" />
                <span className="summary-title">Scope Summary</span>
              </div>
              <span className="summary-status-badge">Available for select projects — 2026</span>
            </div>

            <div className="summary-highlight-box">
              <div className="summary-metric">
                <span className="metric-label">Estimated Delivery</span>
                <div className="metric-val-row">
                  <CalendarCheck size={28} weight="fill" className="text-amber-500" />
                  <span className="metric-big-num">~{estimatedWeeks} Weeks</span>
                </div>
              </div>
              <p className="summary-note">
                Includes weekly milestone reviews and production-ready handoff files.
              </p>
            </div>

            <div className="summary-deliverables-list">
              <span className="deliverables-title">Included in your scope:</span>
              <ul>
                {selectedScopes.map((id) => {
                  const item = scopeOptions.find((s) => s.id === id);
                  return (
                    <li key={id}>
                      <Check size={16} weight="bold" className="text-emerald-600 shrink-0" />
                      <span>{item?.name}</span>
                    </li>
                  );
                })}
                <li>
                  <Check size={16} weight="bold" className="text-emerald-600 shrink-0" />
                  <span>Direct communication with me throughout</span>
                </li>
              </ul>
            </div>

            <button type="button" className="estimator-submit-btn" onClick={handleInquire}>
              <PaperPlaneRight size={20} weight="bold" />
              <span>Send This Scope by Email</span>
              <ArrowRight size={18} weight="bold" />
            </button>

            <p className="summary-guarantee">
              Estimates are directional — the final scope and price are agreed together before
              anything starts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
