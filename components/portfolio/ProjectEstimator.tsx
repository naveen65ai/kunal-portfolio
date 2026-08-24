"use client";

import { useState } from "react";
import {
  Check,
  Sparkle,
  ArrowRight,
  Calculator,
  CalendarCheck,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import { fireConfetti } from "./Confetti";

type ScopeItem = {
  id: string;
  name: string;
  category: string;
  baseDays: number;
  description: string;
};

const scopeOptions: ScopeItem[] = [
  {
    id: "uiux",
    name: "Product & UI/UX App Design",
    category: "Product",
    baseDays: 14,
    description: "End-to-end mobile or web app UX flows, wireframes, and interactive Figma system.",
  },
  {
    id: "3d",
    name: "3D Art, Icons & Spatial Visuals",
    category: "3D Art",
    baseDays: 10,
    description: "Custom 3D objects, key visuals, interactive WebGL assets, and motion loops.",
  },
  {
    id: "brand",
    name: "Complete Brand Identity System",
    category: "Branding",
    baseDays: 12,
    description: "Distinctive logo, typography scales, color architecture, and brand guidelines.",
  },
  {
    id: "website",
    name: "Marketing Landing Page & Web Design",
    category: "Web",
    baseDays: 10,
    description: "High-converting storytelling landing page designed to turn visitors into buyers.",
  },
  {
    id: "design-system",
    name: "Design System & Asset Library",
    category: "System",
    baseDays: 8,
    description: "Reusable component tokens, variant libraries, and complete organized design files.",
  },
];

type ProjectTier = "mvp" | "standard" | "flagship";

import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { soundManager } from "@/components/ui/SoundEffects";

export function ProjectEstimator() {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["uiux", "3d"]);
  const [tier, setTier] = useState<ProjectTier>("standard");
  const [timeline, setTimeline] = useState<"fast" | "standard" | "flexible">("standard");

  const toggleScope = (id: string) => {
    soundManager.playClick();
    setSelectedScopes((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id],
    );
  };

  const handleSelectTier = (t: ProjectTier) => {
    soundManager.playClick();
    setTier(t);
  };

  const handleSelectTimeline = (time: "fast" | "standard" | "flexible") => {
    soundManager.playClick();
    setTimeline(time);
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

  const emailSubject = encodeURIComponent(`Project Inquiry: ${tier.toUpperCase()} Project (${estimatedWeeks} Wks)`);
  const emailBody = encodeURIComponent(
    `Hi Kunal,\n\nI built an estimate on your portfolio with the following scope:\n\n` +
      `• Selected Disciplines: ${selectedNames}\n` +
      `• Project Scope Level: ${tier.toUpperCase()}\n` +
      `• Target Timeline: ~${estimatedWeeks} Weeks (${timeline})\n\n` +
      `Project Brief / Details:\n[Add a quick description of your idea/company here]\n\nLooking forward to hearing from you!`,
  );

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=kkunalkumar0055@gmail.com&su=${emailSubject}&body=${emailBody}`;

  const handleInquire = () => {
    soundManager.playPowerUp();
    fireConfetti();
    window.open(gmailUrl, "_blank");
  };

  return (
    <section id="estimator" className="project-estimator-section" aria-labelledby="estimator-title">
      <div className="estimator-header" data-reveal>
        <p className="hand-label">Instant Scope & Timeline Builder</p>
        <h2 id="estimator-title">Calculate your project scope in 30 seconds.</h2>
        <p className="estimator-subtitle">
          Select what you need, choose your depth, and get an accurate timeline estimate. No games,
          no hidden delays.
        </p>
      </div>

      <div className="estimator-container" data-reveal>
        {/* Left Configurator Column */}
        <div className="estimator-configurator">
          {/* Step 1: Select Disciplines */}
          <div className="estimator-group">
            <span className="group-label">
              <span className="step-num">1</span> Select What You Need:
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

          {/* Step 2: Select Depth / Tier */}
          <div className="estimator-group">
            <span className="group-label">
              <span className="step-num">2</span> Project Scope Depth:
            </span>
            <div className="tier-selector-row">
              <button
                type="button"
                className={`tier-btn ${tier === "mvp" ? "is-selected" : ""}`}
                onClick={() => handleSelectTier("mvp")}
              >
                <strong>Quick Sprint / MVP</strong>
                <span>Core essentials & rapid launch</span>
              </button>
              <button
                type="button"
                className={`tier-btn ${tier === "standard" ? "is-selected" : ""}`}
                onClick={() => handleSelectTier("standard")}
              >
                <strong>Full Product Build</strong>
                <span>Complete design, 3D & token system</span>
              </button>
              <button
                type="button"
                className={`tier-btn ${tier === "flagship" ? "is-selected" : ""}`}
                onClick={() => handleSelectTier("flagship")}
              >
                <strong>Flagship Overhaul</strong>
                <span>Deep research, bespoke 3D & spatial web</span>
              </button>
            </div>
          </div>

          {/* Step 3: Speed Requirement */}
          <div className="estimator-group">
            <span className="group-label">
              <span className="step-num">3</span> Desired Pace:
            </span>
            <div className="pace-selector-row">
              <button
                type="button"
                className={`pace-btn ${timeline === "fast" ? "is-selected" : ""}`}
                onClick={() => handleSelectTimeline("fast")}
              >
                ⚡ Fast Track Sprint
              </button>
              <button
                type="button"
                className={`pace-btn ${timeline === "standard" ? "is-selected" : ""}`}
                onClick={() => handleSelectTimeline("standard")}
              >
                🗓️ Standard Cadence
              </button>
              <button
                type="button"
                className={`pace-btn ${timeline === "flexible" ? "is-selected" : ""}`}
                onClick={() => handleSelectTimeline("flexible")}
              >
                🤝 Flexible Staged Rollout
              </button>
            </div>
          </div>
        </div>

        {/* Right Summary & Proposal Card with 3D Tilt & BorderBeam */}
        <div className="w-full lg:w-auto">
          <Card3DTilt maxTilt={6} scale={1.02}>
            <div className="estimator-summary-card relative overflow-hidden">
              <BorderBeam size={220} duration={12} colorFrom="#1762dc" colorTo="#ffc62f" />

              <div className="summary-card-header">
                <div className="flex items-center gap-2">
                  <Calculator size={20} weight="bold" />
                  <span className="summary-title">Scope Summary</span>
                </div>
                <span className="summary-status-badge">Available for Q3/Q4</span>
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
                  Includes weekly milestone demos, design tokens, and production-ready handoff files.
                </p>
              </div>

              <div className="summary-deliverables-list">
                <span className="deliverables-title">What&apos;s Included In Your Scope:</span>
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
                    <span>Direct 1-on-1 Slack/WhatsApp channel with Kunal</span>
                  </li>
                  <li>
                    <Check size={16} weight="bold" className="text-emerald-600 shrink-0" />
                    <span>Unlimited iterations within the active milestone</span>
                  </li>
                </ul>
              </div>

              <ShimmerButton
                shimmerColor="#ffc62f"
                background="var(--ink)"
                className="w-full font-bold text-sm text-white mt-4"
                onClick={handleInquire}
              >
                <span className="flex items-center justify-center gap-2">
                  <PaperPlaneRight size={18} weight="bold" />
                  Lock In Scope via Gmail
                  <Sparkle size={16} weight="fill" className="text-amber-400" />
                </span>
              </ShimmerButton>

              <p className="summary-guarantee">
                🔒 100% Fixed-Price Guarantee · No surprise billing · Fast 24-hr reply
              </p>
            </div>
          </Card3DTilt>
        </div>
      </div>
    </section>
  );
}
