"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, Tag, Eye } from "@phosphor-icons/react";
import cultureSignal from "@/public/images/culture-signal-illustrated-v2.png";
import matterMotion from "@/public/images/matter-motion-illustrated-v2.png";
import modularFutures from "@/public/images/modular-futures-illustrated-v2.png";
import ribbonStudy from "@/public/images/ribbon-study-illustrated-v2.png";
import formStudy from "@/public/images/form-study-illustrated-v2.png";
import processDesk from "@/public/images/process-desk-illustrated-v2.png";
import { ProjectModal, type ProjectDetail } from "./ProjectModal";
import { soundManager } from "@/components/ui/SoundEffects";

const allProjects: ProjectDetail[] = [
  {
    index: "01",
    title: "Culture After Dark",
    category: "product",
    categoryLabel: "Product & UI/UX Direction",
    tagline: "A nocturnal discovery app built around atmosphere, instant curation, and urban vibes.",
    client: "Concept Project",
    year: "2026",
    duration: "4 Weeks Sprint",
    metric: "",
    metricLabel: "",
    overview:
      "A nightlife and cultural discovery platform designed to replace cluttered maps with high-vibe, atmosphere-first micro-recommendations.",
    challenge:
      "Traditional event apps feel like spreadsheets with dates. Users struggled to find venues that matched their exact mood, sonic taste, and visual atmosphere after sunset.",
    solution:
      "Created a sensory-driven dark UI architecture utilizing tactile glass widgets, mood-spectrum navigation, real-time venue crowd pulses, and zero-friction ticket reservation flows.",
    deliverables: [
      "End-to-End iOS & Android App Design",
      "Interactive Micro-Interactions in Figma & Protopie",
      "Design System with 140+ Reusable Components",
      "Production-Ready Design Tokens & Specs",
    ],
    tools: ["Figma", "Protopie", "Cinema 4D", "Adobe Illustrator"],
    image: cultureSignal,
    alt: "Three hand-painted nightlife discovery interfaces arranged on a cobalt workbench",
    accentColor: "var(--cobalt)",
  },
  {
    index: "02",
    title: "Matter in Motion",
    category: "3d",
    categoryLabel: "3D Art & Material Systems",
    tagline: "A physical-digital material exploration where glass, chrome, color, and motion collide.",
    client: "Concept Project",
    year: "2026",
    duration: "3 Weeks",
    metric: "",
    metricLabel: "",
    overview:
      "A series of procedural 3D visual sculptures exploring how tactile materials behave when freed from physical gravity.",
    challenge:
      "Most digital 3D brands feel either hyper-sterile or overly generic. A bold, signature visual language was needed for a global spatial brand launch.",
    solution:
      "Engineered custom shader materials mimicking chromatic glass, spun chrome ribbons, and liquid iridescent plastics with raytraced lighting and dynamic loop animations.",
    deliverables: [
      "12 High-Resolution Spatial Key Visuals",
      "Seamless 60fps Motion Video Loops",
      "Web-Optimized 3D Spline & 3D Assets",
      "Art Direction & Brand Guidelines",
    ],
    tools: ["Blender", "Cinema 4D", "Redshift", "After Effects"],
    image: matterMotion,
    alt: "Illustrated coral and chrome ribbon sculpture moving through a yellow ring",
    accentColor: "var(--orange)",
  },
  {
    index: "03",
    title: "Modular Futures",
    category: "brand",
    categoryLabel: "Brand Identity & Spatial Architecture",
    tagline: "An editorial identity system designed to look as sharp in print as it does in 3D visuals.",
    client: "Concept Project",
    year: "2026",
    duration: "5 Weeks",
    metric: "",
    metricLabel: "",
    overview:
      "A comprehensive brand overhaul for an architectural collective bridging physical high-density cities with digital spatial realities.",
    challenge:
      "The brand had grown from a local boutique studio into a global multidisciplinary firm, but their identity was stuck in rigid corporate grid conventions.",
    solution:
      "Architected a dynamic, responsive identity system using modular typography, isometric spatial diagrams, warm paper substrates, and brutalist geometric layout structures.",
    deliverables: [
      "Complete Brand Identity & Typography Guidelines",
      "Interactive 3D Spatial Concepts",
      "Print Collateral, Monograph & Stationery Suite",
      "Figma System & Vector Asset Library",
    ],
    tools: ["Figma", "Adobe Illustrator", "Cinema 4D", "After Effects"],
    image: modularFutures,
    alt: "Editorial poster layout with modular typography and isometric architectural sketches",
    accentColor: "var(--green)",
  },
  {
    index: "04",
    title: "Ribbon & Resonance",
    category: "3d",
    categoryLabel: "Spatial Sound & 3D Visualizer",
    tagline: "An interactive audiovisual concept translating frequency spectrums into fluid ribbon dynamics.",
    client: "Concept Project",
    year: "2026",
    duration: "2 Weeks",
    metric: "",
    metricLabel: "",
    overview:
      "A real-time audiovisual visual concept mapping microphone input and synth tracks into undulating 3D ribbon geometries.",
    challenge:
      "Audio visualizers often look like chaotic particle noise without clear aesthetic intention or brand resonance.",
    solution:
      "Crafted procedural ribbon geometry with silk-sheen reflections, harmonic ripple curves, and kinetic lighting.",
    deliverables: [
      "3D Ribbon Motion System",
      "Spatial Audio Visual Concept",
      "High-Resolution 3D Models & Render Presets",
    ],
    tools: ["Blender", "Cinema 4D", "Octane", "After Effects"],
    image: ribbonStudy,
    alt: "Fluid ribbon sculpture twisting in 3D perspective with soft lighting",
    accentColor: "var(--cobalt)",
  },
  {
    index: "05",
    title: "Form & Void Studies",
    category: "product",
    categoryLabel: "Design System & UI Components",
    tagline: "A brutalist component library and token architecture built for high-impact product brands.",
    client: "Self-Initiated",
    year: "2025",
    duration: "3 Weeks",
    metric: "",
    metricLabel: "",
    overview:
      "A high-contrast, tactile UI library combining neo-brutalist shadows with silky smooth micro-animations and accessibility tokens.",
    challenge:
      "Design systems frequently compromise personality for compliance. The goal was extreme accessibility (WCAG AAA) without looking like another generic corporate UI kit.",
    solution:
      "Engineered a tokenized color matrix with tactile 4px offset borders, custom focus states, high-contrast badges, and fluid typography.",
    deliverables: [
      "220+ Figma Components with Auto-Layout",
      "WCAG AAA Accessibility Specification",
      "Interactive Token Documentation & Style Guide",
    ],
    tools: ["Figma", "Protopie", "Adobe Illustrator", "Photoshop"],
    image: formStudy,
    alt: "Neo-brutalist component design system with tactile cards, buttons, and tokens",
    accentColor: "var(--yellow)",
  },
  {
    index: "06",
    title: "The Maker Workbench",
    category: "brand",
    categoryLabel: "Creative Direction & Studio Brand",
    tagline: "A bespoke studio identity celebrating hand-drawn craftsmanship in the age of algorithmic monotony.",
    client: "Self-Initiated",
    year: "2026",
    duration: "Ongoing",
    metric: "",
    metricLabel: "",
    overview:
      "The visual identity and digital home of Kunal Kumar Studio — marrying tactile paper textures, hand-drawn gestures, and modern graphic craft.",
    challenge:
      "Eliminating the friction between raw creative sketches and finished, iconic brand systems.",
    solution:
      "An expressive design language connecting hand-drawn vector illustrations with precise typography and tactile 3D elements.",
    deliverables: [
      "Complete Figma Design Master System",
      "Hand-Drawn Vector Asset Library",
      "Brand Identity Guidelines & Style Guide",
    ],
    tools: ["Figma", "Blender", "Adobe Illustrator", "Photoshop"],
    image: processDesk,
    alt: "Illustrated design workbench with wireframes, color cards, and hand drawing",
    accentColor: "var(--ink)",
  },
];

type CategoryFilter = "all" | "product" | "3d" | "brand";

const filterTabs: { label: string; value: CategoryFilter }[] = [
  { label: "All", value: "all" },
  { label: "UI/UX", value: "product" },
  { label: "3D", value: "3d" },
  { label: "Branding", value: "brand" },
];

export function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);

  const handleFilterClick = (filter: CategoryFilter) => {
    soundManager.playClick();
    setActiveFilter(filter);
  };

  const handleOpenProject = (project: ProjectDetail) => {
    soundManager.playPowerUp();
    setSelectedProject(project);
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return allProjects;
    return allProjects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="work" className="selected-work" aria-labelledby="work-title">
      <div className="work-inner-container">
        <div className="section-intro" data-reveal>
          <div className="section-intro-left">
            <div className="work-header-badge-row">
              <p className="hand-label">Selected Work</p>
            </div>
            <h2 id="work-title">Work made to be remembered & to convert.</h2>
          </div>
          <div className="section-intro-right">
            <p className="work-discription">
              Every project is built on two principles: it must be exceptionally useful,
              and it must look like nothing else. Click any project for the full case study.
            </p>
          </div>
        </div>

        <div className="work-controls-bar">
          <div className="work-filter-tabs" role="tablist" aria-label="Filter projects by category" id="work-tabs">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                id={`tab-${tab.value}`}
                aria-selected={activeFilter === tab.value}
                aria-controls={`tabpanel-${tab.value}`}
                className={`filter-tab ${activeFilter === tab.value ? "is-active" : ""}`}
                onClick={() => handleFilterClick(tab.value)}
              >
                {tab.label}
                {tab.value === "all" && <span className="tab-count">{allProjects.length}</span>}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div
            className="work-layout"
            key={activeFilter}
            role="tabpanel"
            id={`tabpanel-${activeFilter}`}
            aria-labelledby={`tab-${activeFilter}`}
            aria-label={`Projects filtered by ${activeFilter === "all" ? "all categories" : activeFilter}`}
          >
            {filteredProjects.map((project) => (
              <article
                key={project.index}
                className={`illustrated-work-card work-card--interactive work-card--${
                  project.category === "product"
                    ? "feature"
                    : project.category === "3d"
                    ? "yellow"
                    : "orange"
                }`}
                data-cursor="View Case Study"
                tabIndex={0}
                role="button"
                aria-label={`Open case study for ${project.title}`}
                onClick={() => handleOpenProject(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpenProject(project);
                  }
                }}
              >
                <div className="work-card-image">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="work-card-hover-overlay">
                    <span className="hover-action-pill">
                      <Eye size={16} weight="bold" /> View Case Study
                    </span>
                  </div>
                </div>

                <div className="work-card-info">
                  <div className="work-card-body">
                    <div className="work-card-meta">
                      <span className="card-index">{project.index}</span>
                      <p className="card-type-label" title={project.categoryLabel}>
                        {project.categoryLabel}
                      </p>
                      <div className="card-arrow-badge">
                        <ArrowUpRight aria-hidden="true" weight="bold" size={14} />
                      </div>
                    </div>
                    <h3 className="card-title" title={project.title}>{project.title}</h3>
                    <p className="card-desc" title={project.tagline}>{project.tagline}</p>
                  </div>

                  <div className="card-footer-tags">
                    <div className="card-tools-row">
                      {project.tools.slice(0, 2).map((t) => (
                        <span key={t} className="tool-chip">
                          <Tag size={10} weight="bold" /> {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="work-empty-state">
            <h3 className="work-empty-title">No matching projects</h3>
            <p className="work-empty-desc">Try a different category.</p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("all");
                soundManager.playClick();
              }}
              className="work-reset-btn"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
