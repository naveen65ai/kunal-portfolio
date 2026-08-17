"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, FolderOpen } from "@phosphor-icons/react";
import { ScrollReveal } from "./ScrollReveal";

const projects = [
  {
    id: "01",
    title: "Fintech onboarding",
    discipline: "Mobile UX",
    year: "2026",
    brief: "A first-session journey for a finance app, focused on trust, identity checks, and calm progression.",
    tone: "blue",
    points: ["Journey map", "Prototype", "Design system"],
  },
  {
    id: "02",
    title: "Spatial product viewer",
    discipline: "3D Web",
    year: "2026",
    brief: "A product visualization study that uses 3D form, lighting, and interface controls as one experience.",
    tone: "olive",
    points: ["Hard surface model", "Render passes", "Configurator UI"],
  },
  {
    id: "03",
    title: "Creator dashboard",
    discipline: "Product design",
    year: "2025",
    brief: "A compact workspace for creators to plan drops, track assets, and review publishing states.",
    tone: "rose",
    points: ["Information architecture", "Components", "States"],
  },
  {
    id: "04",
    title: "Brand motion kit",
    discipline: "Motion system",
    year: "2025",
    brief: "A lightweight visual system with animated folders, reveal masks, and reusable transition rules.",
    tone: "orange",
    points: ["Interaction spec", "Motion tokens", "Presentation"],
  },
];

type Project = (typeof projects)[number];

function ProjectVisual({ tone }: { tone: Project["tone"] }) {
  const accent =
    tone === "blue"
      ? "var(--blue)"
      : tone === "olive"
        ? "var(--olive)"
        : tone === "rose"
          ? "var(--rose)"
          : "var(--accent)";

  if (tone === "olive") {
    return (
      <div className="project-visual mock-grid" style={{ backgroundColor: "var(--cream)" }}>
        <div className="render-object" />
        <div className="absolute bottom-[14%] left-[10%] h-16 w-40 border border-[var(--ink)]/15 bg-white/30" />
      </div>
    );
  }

  return (
    <div className="project-visual mock-grid" style={{ backgroundColor: "var(--cream)" }}>
      <div className="phone-frame p-4">
        <div className="mb-4 h-8 rounded bg-[var(--ink)]" />
        <div className="grid gap-2">
          <span className="h-16 rounded" style={{ backgroundColor: accent }} />
          <span className="h-6 rounded bg-[var(--ink)]/15" />
          <span className="h-6 w-2/3 rounded bg-[var(--ink)]/15" />
          <span className="mt-5 h-20 rounded border border-[var(--ink)]/15" />
        </div>
      </div>
      <div className="panel-stack">
        <div className="panel-line" style={{ backgroundColor: accent, opacity: 0.78 }} />
        <div className="panel-line" />
        <div className="panel-line w-3/4" />
      </div>
    </div>
  );
}

function FolderCard({
  project,
  isOpen,
  onOpen,
}: {
  project: Project;
  isOpen: boolean;
  onOpen: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout
      className={`relative ${isOpen ? "lg:col-span-2" : ""}`}
      transition={{ layout: { duration: reduce ? 0 : 0.55, ease: [0.19, 1, 0.22, 1] } }}
    >
      <button
        type="button"
        onClick={onOpen}
        data-cursor={isOpen ? "Open" : "Folder"}
        className="group relative block w-full text-left"
        aria-expanded={isOpen}
      >
        <motion.div
          className="absolute left-6 top-0 h-10 w-36 border border-[var(--ink)]/14 bg-[var(--paper-deep)]"
          animate={{ y: isOpen ? -16 : 0, rotateX: isOpen ? -18 : 0 }}
          transition={{ duration: reduce ? 0 : 0.55, ease: [0.19, 1, 0.22, 1] }}
        />
        <motion.div
          className="relative mt-8 min-h-[220px] border border-[var(--ink)]/14 bg-[var(--paper-deep)] p-6 shadow-[16px_18px_0_rgba(22,22,19,0.08)]"
          animate={{ y: isOpen ? -4 : 0 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: [0.19, 1, 0.22, 1] }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-[var(--font-mono)] text-xs text-[var(--muted)]">
                {project.id} / {project.discipline}
              </p>
              <h3 className="display-type mt-4 max-w-[12ch] text-[clamp(2.3rem,5vw,5rem)]">
                {project.title}
              </h3>
            </div>
            <FolderOpen className="mt-1 text-[var(--accent-deep)]" size={28} weight="bold" />
          </div>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            layout
            className="relative z-10 -mt-4 overflow-hidden border border-[var(--ink)]/14 bg-[var(--cream)] shadow-[22px_26px_0_rgba(22,22,19,0.08)]"
            initial={reduce ? false : { opacity: 0, y: -30, rotateX: -12 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: reduce ? 0 : 0.55, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <ProjectVisual tone={project.tone} />

              <div className="flex min-h-[300px] flex-col justify-between p-7 md:p-10">
                <div>
                  <div className="mb-8 flex items-center justify-between border-b border-[var(--faint)] pb-4 font-[var(--font-mono)] text-xs text-[var(--muted)]">
                    <span>{project.year}</span>
                    <span>Case sheet</span>
                  </div>
                  <p className="body-copy">{project.brief}</p>
                </div>

                <div className="mt-10 grid gap-3">
                  {project.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center justify-between border-t border-[var(--faint)] pt-3 font-[var(--font-mono)] text-xs"
                    >
                      <span>{point}</span>
                      <ArrowUpRight size={13} weight="bold" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function FolderProjects() {
  const [openId, setOpenId] = useState(projects[0].id);
  const openProject = useMemo(() => projects.find((project) => project.id === openId), [openId]);

  return (
    <section id="work" className="section-pad">
      <div className="container-wide">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <ScrollReveal>
            <div>
              <p className="section-kicker mb-8">Selected folders</p>
              <h2 className="display-type max-w-[820px] text-[clamp(3.4rem,8vw,8.6rem)]">
                Open the work.
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="body-copy lg:justify-self-end">
              Each folder opens into a project sheet, borrowing the physical reveal and layered motion from your reference while keeping the portfolio easy to scan.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <FolderCard
              key={project.id}
              project={project}
              isOpen={openProject?.id === project.id}
              onOpen={() => setOpenId(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
