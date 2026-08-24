"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkle, Tag, Eye, MagnifyingGlass, X, Funnel } from "@phosphor-icons/react";
import cultureSignal from "@/public/images/culture-signal-illustrated-v2.png";
import matterMotion from "@/public/images/matter-motion-illustrated-v2.png";
import modularFutures from "@/public/images/modular-futures-illustrated-v2.png";
import ribbonStudy from "@/public/images/ribbon-study-illustrated-v2.png";
import formStudy from "@/public/images/form-study-illustrated-v2.png";
import processDesk from "@/public/images/process-desk-illustrated-v2.png";
import { ProjectModal, type ProjectDetail } from "./ProjectModal";
import { Card3DTilt } from "@/components/ui/Card3DTilt";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { soundManager } from "@/components/ui/SoundEffects";

const allProjects: ProjectDetail[] = [
  {
    index: "01",
    title: "Culture After Dark",
    category: "product",
    categoryLabel: "Product & UI/UX Direction",
    tagline: "A nocturnal discovery app built around atmosphere, instant curation, and urban vibes.",
    client: "Nocturne Labs · New York",
    year: "2026",
    duration: "4 Weeks Sprint",
    metric: "+42%",
    metricLabel: "User Retention Boost",
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
    client: "Studio Hyperchroma · Berlin",
    year: "2026",
    duration: "3 Weeks",
    metric: "1.2M+",
    metricLabel: "Impressions & Awards",
    overview:
      "A series of procedural 3D visual sculptures exploring how tactile materials behave when freed from physical gravity.",
    challenge:
      "Most digital 3D brands feel either hyper-sterile or overly generic. Hyperchroma needed a bold, signature visual language for their global spatial brand launch.",
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
    client: "Nexus Arch Group · Tokyo",
    year: "2026",
    duration: "5 Weeks",
    metric: "Design Lead",
    metricLabel: "Global Rebrand",
    overview:
      "A comprehensive brand overhaul for an architectural collective bridging physical high-density cities with digital spatial realities.",
    challenge:
      "Nexus had grown from a local boutique studio into a global multidisciplinary firm, but their identity was stuck in rigid corporate grid conventions.",
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
    client: "Resonance Audio · London",
    year: "2026",
    duration: "2 Weeks",
    metric: "FWA of the Day",
    metricLabel: "Award Winner",
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
    client: "Void Craft · San Francisco",
    year: "2025",
    duration: "3 Weeks",
    metric: "100%",
    metricLabel: "Design System Score",
    overview:
      "A high-contrast, tactile UI library combining neo-brutalist shadows with silky smooth micro-animations and accessibility tokens.",
    challenge:
      "Design systems frequently compromise personality for compliance. Void Craft wanted extreme accessibility (WCAG AAA) without looking like another generic corporate UI kit.",
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
    client: "Kunal Kumar Studio · Worldwide",
    year: "2026",
    duration: "Ongoing",
    metric: "100%",
    metricLabel: "Bespoke Craftsmanship",
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

export function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    return allProjects.filter((project) => {
      const matchesCategory = activeFilter === "all" || project.category === activeFilter;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      return (
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.categoryLabel.toLowerCase().includes(q) ||
        project.client.toLowerCase().includes(q) ||
        project.tools.some((t) => t.toLowerCase().includes(q)) ||
        project.deliverables.some((d) => d.toLowerCase().includes(q))
      );
    });
  }, [activeFilter, searchQuery]);

  return (
    <section id="work" className="selected-work" aria-labelledby="work-title">
      <div className="work-inner-container">
        {/* Section Header */}
        <div className="section-intro" data-reveal>
          <div className="section-intro-left">
            <div className="work-header-badge-row">
              <p className="hand-label">✦ Selected Portfolio Projects</p>
            </div>
            <h2 id="work-title">Work made to be remembered & to convert.</h2>
          </div>
          <div className="section-intro-right">
            <p className="work-discription">
              Every project is built on two non-negotiable principles: it must be exceptionally useful,
              and it must look like nothing else on the internet. Click any project for the full case study breakdown.
            </p>
          </div>
        </div>

        {/* Filter and Search Controls Bar */}
        <div className="work-controls-bar">
          {/* Category Filter Tabs */}
          <div className="work-filter-tabs" role="tablist" aria-label="Filter projects by category">
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === "all"}
              className={`filter-tab ${activeFilter === "all" ? "is-active" : ""}`}
              onClick={() => handleFilterClick("all")}
            >
              All Projects <span className="tab-count">{allProjects.length}</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === "product"}
              className={`filter-tab filter-tab--product ${activeFilter === "product" ? "is-active" : ""}`}
              onClick={() => handleFilterClick("product")}
            >
              Product & UI/UX{" "}
              <span className="tab-count">
                {allProjects.filter((p) => p.category === "product").length}
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === "3d"}
              className={`filter-tab filter-tab--3d ${activeFilter === "3d" ? "is-active" : ""}`}
              onClick={() => handleFilterClick("3d")}
            >
              3D & Motion{" "}
              <span className="tab-count">
                {allProjects.filter((p) => p.category === "3d").length}
              </span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === "brand"}
              className={`filter-tab filter-tab--brand ${activeFilter === "brand" ? "is-active" : ""}`}
              onClick={() => handleFilterClick("brand")}
            >
              Brand Systems{" "}
              <span className="tab-count">
                {allProjects.filter((p) => p.category === "brand").length}
              </span>
            </button>
          </div>

          {/* Quick Search Input */}
          <div className="work-search-box">
            <MagnifyingGlass
              size={16}
              weight="bold"
              className="work-search-icon"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tool, title, or client..."
              className="work-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="work-search-clear"
              >
                <X size={12} weight="bold" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid with 3D Tilt & Specular Highlights */}
        {filteredProjects.length > 0 ? (
          <div className="work-layout" key={`${activeFilter}-${searchQuery}`}>
            {filteredProjects.map((project, idx) => (
              <Card3DTilt
                key={project.index}
                maxTilt={6}
                scale={1.015}
              >
                <article
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
                  {/* Magic UI Border Beam on First / Featured Project */}
                  {idx === 0 && (
                    <BorderBeam size={180} duration={10} colorFrom="#1762dc" colorTo="#ffc62f" />
                  )}

                  {/* Image Frame */}
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

                  {/* Info Content */}
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

                    {/* Tags and Metric Badges */}
                    <div className="card-footer-tags">
                      {project.metric && (
                        <span className="card-metric-pill" title={`${project.metric} ${project.metricLabel}`}>
                          <Sparkle size={12} weight="fill" />
                          <strong>{project.metric}</strong> {project.metricLabel}
                        </span>
                      )}
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
              </Card3DTilt>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="work-empty-state">
            <Funnel size={36} weight="duotone" />
            <h3 className="work-empty-title">No matching projects found</h3>
            <p className="work-empty-desc">
              Try adjusting your search query or switching to another category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
                soundManager.playClick();
              }}
              className="work-reset-btn"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Case Study Modal Sheet */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
