"use client";

import { CheckCircle, XCircle, Lightning, ShieldCheck, Trophy, RocketLaunch } from "@phosphor-icons/react";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { soundManager } from "@/components/ui/SoundEffects";

type ComparisonRow = {
  feature: string;
  withKunal: string;
  withAgency: string;
  withGenericFreelancer: string;
};

const comparisonData: ComparisonRow[] = [
  {
    feature: "Turnaround & Velocity",
    withKunal: "Fast 2–4 week sprints with daily asynchronous updates",
    withAgency: "8–16 weeks laden with meetings & middle management",
    withGenericFreelancer: "Unpredictable timelines and ghosting risks",
  },
  {
    feature: "3D & UI Cohesion",
    withKunal: "Unified vision: interface, 3D, and motion designed together",
    withAgency: "Handed off across 3 siloed departments with disjointed styles",
    withGenericFreelancer: "Typically limited to UI only or basic 3D templates",
  },
  {
    feature: "Production System Readiness",
    withKunal: "Organized Figma tokens, auto-layouts, and pristine export assets",
    withAgency: "Pretty static mocks requiring weeks of extra cleanup",
    withGenericFreelancer: "Messy auto-layouts and missing edge states",
  },
  {
    feature: "Pricing Transparency",
    withKunal: "Fixed flat rate per sprint. 0% surprise fees.",
    withAgency: "$25k+ minimum retainer with steep overhead markup",
    withGenericFreelancer: "Cheap upfront, expensive rework later",
  },
  {
    feature: "Direct Access",
    withKunal: "1-on-1 direct collaboration with the lead designer & artist",
    withAgency: "Filtered through junior account managers",
    withGenericFreelancer: "Communication barriers and slow turnarounds",
  },
];

const highlights = [
  {
    icon: Lightning,
    title: "Agile & Fast-Paced",
    desc: "No corporate fluff. We align on scope on Monday, and by Friday you have working prototypes.",
    color: "var(--yellow)",
  },
  {
    icon: Trophy,
    title: "Senior Craftsmanship",
    desc: "Every pixel, 3D shader, and typographic detail is touched by years of dedicated mastery.",
    color: "var(--orange)",
  },
  {
    icon: ShieldCheck,
    title: "100% Guaranteed Delivery",
    desc: "Fixed milestones and clear deliverables. You never pay for unapproved guesswork.",
    color: "var(--green)",
  },
  {
    icon: RocketLaunch,
    title: "High-ROI Outcomes",
    desc: "Designs engineered not just to look pretty, but to elevate brand equity and conversion rates.",
    color: "var(--cobalt)",
  },
];

export function StudioValue() {
  return (
    <section id="why-kunal" className="studio-value-section" aria-labelledby="value-heading">
      <div className="value-header" data-reveal>
        <p className="hand-label">Why Founders & Studios Choose Me</p>
        <h2 id="value-heading">The craft of an elite studio with the speed of an indie builder.</h2>
        <p className="value-subtitle">
          Building memorable digital products requires precision, taste, and speed. Here is how
          working with me compares to traditional alternatives.
        </p>
      </div>

      {/* 4 Pillar Badges with 3D Tilt */}
      <div className="value-pillars-grid" data-reveal>
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <Card3DTilt key={item.title} maxTilt={8} scale={1.02} className="h-full">
              <div
                className="value-pillar-card h-full cursor-pointer"
                onClick={() => soundManager.playClick()}
                onMouseEnter={() => soundManager.playHover()}
              >
                <div className="pillar-icon-box" style={{ backgroundColor: item.color }}>
                  <Icon size={24} weight="bold" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </Card3DTilt>
          );
        })}
      </div>

      {/* Comparison Matrix Table with BorderBeam */}
      <div className="comparison-table-wrapper relative overflow-hidden" data-reveal>
        <BorderBeam size={250} duration={15} colorFrom="#1762dc" colorTo="#ffc62f" />
        
        <div className="comparison-table-header">
          <span className="matrix-title">How I Compare to Alternatives</span>
          <span className="matrix-badge">⭐ Best ROI for Modern Brands</span>
        </div>

        <div className="table-responsive">
          <table className="comparison-table">
            <thead>
              <tr>
                <th scope="col" className="col-feature">
                  Capability / Factor
                </th>
                <th scope="col" className="col-kunal">
                  <div className="kunal-header-cell">
                    <span className="kunal-tag">⭐ Recommended</span>
                    <strong>With Kunal Kumar</strong>
                  </div>
                </th>
                <th scope="col" className="col-agency">
                  Traditional Agency
                </th>
                <th scope="col" className="col-freelancer">
                  Budget Freelancer
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr key={row.feature}>
                  <td className="row-feature-title">{row.feature}</td>
                  <td className="row-kunal-highlight">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.withKunal}</span>
                    </div>
                  </td>
                  <td className="row-agency-cell">
                    <div className="flex items-start gap-2">
                      <XCircle size={18} weight="fill" className="text-amber-700/60 shrink-0 mt-0.5" />
                      <span>{row.withAgency}</span>
                    </div>
                  </td>
                  <td className="row-freelancer-cell">
                    <div className="flex items-start gap-2">
                      <XCircle size={18} weight="fill" className="text-rose-700/60 shrink-0 mt-0.5" />
                      <span>{row.withGenericFreelancer}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
