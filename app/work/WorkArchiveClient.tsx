"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects, type ProjectData } from "@/lib/projects";

type CategoryFilter = "all" | "product" | "3d" | "brand";

const filterOptions: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "product", label: "Product & UI/UX" },
  { id: "3d", label: "3D & Motion" },
  { id: "brand", label: "Brand Identity" },
];

export function WorkArchiveClient() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "all") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="subpage-main">
      <header className="subpage-hero">
        <div className="subpage-container">
          <p className="hand-label">Selected Work</p>
          <h1 className="subpage-title">Work & Case Studies</h1>
          <p className="subpage-lead">
            Product design, brand systems and 3D craft — every project pairs rigorous UX with a
            visual language built from scratch.
          </p>

          <div className="archive-filters-bar">
            <div
              className="filters-pill-group"
              role="group"
              aria-label="Filter projects by discipline"
            >
              {filterOptions.map((filter) => {
                const isActive = selectedCategory === filter.id;
                const count =
                  filter.id === "all"
                    ? projects.length
                    : projects.filter((p) => p.category === filter.id).length;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={isActive}
                    className={`filter-pill-btn ${isActive ? "is-active" : ""}`}
                    onClick={() => setSelectedCategory(filter.id)}
                  >
                    {filter.label} <span className="tab-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <section className="archive-grid-section">
        <div className="subpage-container">
          <div className="archive-cards-grid">
            {filteredProjects.map((project: ProjectData) => (
              <article key={project.slug} className="archive-project-card">
                <Link
                  href={`/work/${project.slug}`}
                  className="archive-card-inner"
                  data-cursor="View case study"
                  aria-label={`View the ${project.title} case study`}
                >
                  <div className="archive-card-image-shell">
                    <Image
                      src={project.heroImage}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="archive-card-badge">
                      <span>{project.year}</span>
                      <span>·</span>
                      <span>{project.client}</span>
                    </div>
                  </div>

                  <div className="archive-card-body">
                    <div className="archive-card-meta">
                      <span className="archive-card-category">{project.categoryLabel}</span>
                      <span className="archive-card-index">#{project.index}</span>
                    </div>

                    <h2 className="archive-card-title">{project.title}</h2>
                    <p className="archive-card-tagline">{project.tagline}</p>

                    <div className="archive-card-disciplines">
                      {project.disciplines.slice(0, 3).map((disc) => (
                        <span key={disc} className="discipline-tag">
                          {disc}
                        </span>
                      ))}
                    </div>

                    <div className="archive-card-footer">
                      <span className="case-study-btn">
                        <span>View Case Study</span>
                        <ArrowUpRight size={16} weight="bold" />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
