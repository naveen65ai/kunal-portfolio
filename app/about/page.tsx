import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkle,
  CheckCircle,
  Globe,
  ChatCircleText,
} from "@phosphor-icons/react/dist/ssr";
import processDesk from "@/public/images/process-desk-illustrated-v2.png";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LocalTimeBadge } from "@/components/portfolio/LocalTimeBadge";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kunal Kumar is an independent multidisciplinary designer working across product design, brand identity, motion and 3D.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Kunal Kumar — Designer & 3D Artist",
    description:
      "An independent multidisciplinary design practice combining product UI/UX logic, brand identity systems, and expressive 3D art.",
  },
};

const toolstack = [
  {
    category: "Design",
    tools: ["Figma", "Design systems & tokens", "Prototyping", "WCAG AA accessibility"],
  },
  {
    category: "3D",
    tools: ["Blender", "Cinema 4D & Redshift", "Octane Render", "Spline"],
  },
  {
    category: "Branding",
    tools: ["Adobe Illustrator", "Adobe Photoshop", "Typography systems", "Brand guidelines"],
  },
  {
    category: "Motion & Interaction",
    tools: ["After Effects", "Rive", "Figma Interactive Prototypes", "Lottie Animations"],
  },
];

const clients = [
  "Nocturne Labs",
  "Studio Hyperchroma",
  "Nexus Arch Group",
  "Resonance Audio",
  "Void Craft",
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className="subpage-main">
        <header className="subpage-hero">
          <div className="subpage-container">
            <p className="hand-label">Studio Story & Craft</p>
            <h1 className="subpage-title">I design digital experiences where product, motion, and 3D meet.</h1>
            <p className="subpage-lead">
              I work as an independent creative partner for founders and ambitious teams who want
              thoughtful products and distinctive visuals — without agency overhead.
            </p>
          </div>
        </header>

        {/* Section 1: The Practice */}
        <section className="about-story-section">
          <div className="subpage-container">
            <div className="about-two-col">
              <div className="about-bio-text">
                <span className="block-label">01 / The Practice</span>
                <h2 className="about-section-heading">Creative direction grounded in commercial reality.</h2>
                <p className="about-bio-para">
                  Modern digital products tend to sit at two extremes: hyper-functional but
                  generic, or visually striking but frustrating to use.
                </p>
                <p className="about-bio-para">
                  My practice bridges both. Structured UX, tokenized component libraries and clear
                  hierarchy are combined with expressive 3D materials, tactile animation and bold
                  typography — so the end result converts users and builds brand equity at the same
                  time.
                </p>
                <div className="about-values-list">
                  <div className="value-item">
                    <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                    <div>
                      <strong>Direct collaboration</strong>
                      <p>You collaborate directly with the designer building every asset.</p>
                    </div>
                  </div>
                  <div className="value-item">
                    <CheckCircle size={18} weight="fill" className="text-emerald-600 shrink-0" />
                    <div>
                      <strong>Production-ready assets</strong>
                      <p>Structured tokens, organized layer hierarchies, and clear handoff specs.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="about-photo-wrapper">
                <div className="about-visual-polaroid">
                  <div className="about-visual-shell">
                    <Image
                      src={processDesk}
                      alt="Illustrated design workbench with wireframes, color cards, and hand drawing"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="about-visual-caption">
                    <strong>The Maker Workbench</strong>
                    <span>Sketch · Model · Prototype · Ship</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Tools */}
        <section className="about-tools-section">
          <div className="subpage-container">
            <div className="tools-section-header">
              <span className="block-label">02 / Tools</span>
              <h2 className="about-section-heading">A focused stack chosen for creative execution.</h2>
              <p className="about-tools-sub">
                Every tool earns its place — chosen for creative freedom, precision 3D modeling,
                and seamless collaborative design workflows.
              </p>
            </div>

            <div className="toolstack-grid">
              {toolstack.map((group) => (
                <div key={group.category} className="toolstack-group-card">
                  <h3 className="toolstack-cat-title">{group.category}</h3>
                  <ul className="toolstack-items-list">
                    {group.tools.map((t) => (
                      <li key={t}>
                        <Sparkle size={14} weight="fill" className="text-amber-500 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: Selected clients */}
        <section className="about-clients-section">
          <div className="subpage-container">
            <span className="block-label">03 / Selected Clients</span>
            <ul className="clients-strip">
              {clients.map((client) => (
                <li key={client}>{client}</li>
              ))}
            </ul>
            <p className="clients-note">
              Client names shown reflect real project engagements from my case studies. References
              available on request.
            </p>
          </div>
        </section>

        {/* Section 4: Availability */}
        <section className="about-remote-section">
          <div className="subpage-container">
            <div className="remote-card">
              <div className="remote-left">
                <div className="remote-badge-row">
                  <Globe size={18} weight="bold" />
                  <span>Remote-first, worldwide</span>
                </div>
                <h2 className="remote-title">Based in India, synced with your working day.</h2>
                <p className="remote-copy">
                  From IST (UTC+5:30) there&apos;s live overlap with European mornings and US West
                  Coast afternoons — enough for tight feedback loops on 2–6 week sprints.
                </p>
                <div className="remote-time-row">
                  <LocalTimeBadge />
                  <span className="remote-status-pill">
                    <span className="pulse-ping" />
                    Available for select projects — 2026
                  </span>
                </div>
              </div>
              <div className="remote-right">
                <Link href="/contact" className="remote-cta-btn">
                  <ChatCircleText size={20} weight="bold" />
                  <span>Start a Conversation</span>
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
