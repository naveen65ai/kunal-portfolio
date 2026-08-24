import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Wrench,
  ChatCircleText,
} from "@phosphor-icons/react/dist/ssr";
import { projects, getProjectBySlug } from "@/lib/projects";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.overview,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — ${project.categoryLabel}`,
      description: project.tagline,
      type: "article",
      images: [{ url: project.heroImage.src, width: 1200, height: 900, alt: project.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Kunal Kumar`,
      description: project.tagline,
      images: [project.heroImage.src],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find next project for bottom navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <SiteHeader />

      <main className="case-study-page">
        {/* Case Study Header */}
        <header className="case-study-hero">
          <div className="case-study-container">
            <div className="case-study-breadcrumbs">
              <Link href="/work" className="subpage-back-link">
                <ArrowLeft size={16} weight="bold" />
                <span>All Projects</span>
              </Link>
              <span className="breadcrumb-divider">/</span>
              <span className="breadcrumb-current">{project.categoryLabel}</span>
            </div>

            <div className="case-study-title-block">
              <div className="case-study-pill-row">
                <span className="case-study-index-pill">Project #{project.index}</span>
                <span className="case-study-category-pill">{project.categoryLabel}</span>
              </div>
              <h1 className="case-study-h1">{project.title}</h1>
              <p className="case-study-tagline-lead">{project.tagline}</p>
            </div>

            {/* Project Metadata Grid */}
            <div className="case-study-meta-grid">
              <div className="meta-card">
                <span className="meta-label">Client / Partner</span>
                <strong className="meta-value">{project.client}</strong>
              </div>
              <div className="meta-card">
                <span className="meta-label">Role</span>
                <strong className="meta-value">{project.role}</strong>
              </div>
              <div className="meta-card">
                <span className="meta-label">Timeline & Year</span>
                <strong className="meta-value">{project.duration} · {project.year}</strong>
              </div>
              <div className="meta-card">
                <span className="meta-label">Primary Disciplines</span>
                <div className="meta-tags-wrap">
                  {project.disciplines.map((d) => (
                    <span key={d} className="meta-tag">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Full-Width Showcase Visual */}
        <section className="case-study-hero-visual-section">
          <div className="case-study-container">
            <div className="case-study-media-frame">
              <Image
                src={project.heroImage}
                alt={project.alt}
                priority
                className="object-cover w-full h-auto"
                sizes="(max-width: 1440px) 100vw, 1440px"
              />
              <div className="case-study-media-caption">
                <span>✦ Visual Direction & Key Artifacts · {project.title}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Summary: Overview, Challenge, Solution */}
        <section className="case-study-executive-section">
          <div className="case-study-container">
            <div className="case-study-two-col-layout">
              {/* Left Column: Challenge & Solution */}
              <div className="case-study-left-col">
                <div className="case-study-block">
                  <span className="block-label">01 / Project Overview</span>
                  <h2 className="block-title">The Strategic Context</h2>
                  <p className="block-paragraph">{project.overview}</p>
                </div>

                <div className="case-study-block">
                  <span className="block-label">02 / The Challenge</span>
                  <h2 className="block-title">What Needed Solving</h2>
                  <p className="block-paragraph">{project.challenge}</p>
                </div>

                <div className="case-study-block">
                  <span className="block-label">03 / Strategy & Solution</span>
                  <h2 className="block-title">The Design Approach</h2>
                  <p className="block-paragraph">{project.solution}</p>
                </div>

                {/* Additional Deep Dive Sections */}
                {project.sections.map((section, idx) => (
                  <div key={section.title} className="case-study-block">
                    <span className="block-label">{String(idx + 4).padStart(2, "0")} / {section.subtitle || "Deep Dive"}</span>
                    <h2 className="block-title">{section.title}</h2>
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} className="block-paragraph">{para}</p>
                    ))}
                    {section.deliverables && (
                      <div className="case-study-deliverables-box">
                        <span className="deliverables-heading">Key Section Deliverables:</span>
                        <ul>
                          {section.deliverables.map((del) => (
                            <li key={del}>
                              <CheckCircle size={14} weight="fill" className="text-emerald-600 shrink-0" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right Column: Sticky Toolkit & Outcomes */}
              <aside className="case-study-right-col">
                <div className="case-study-sticky-card">
                  <h3 className="sticky-card-title">Production Outcomes</h3>
                  <ul className="outcomes-checklist">
                    {project.outcomes.map((outcome) => (
                      <li key={outcome}>
                        <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="sticky-tools-divider" />

                  <h4 className="sticky-tools-title">
                    <Wrench size={16} weight="bold" /> Toolchain & Execution
                  </h4>
                  <div className="sticky-tools-pills">
                    {project.tools.map((tool) => (
                      <span key={tool} className="sticky-tool-badge">
                        {tool}
                      </span>
                    ))}
                  </div>

                  <div className="sticky-cta-wrap">
                    <Link href="/contact" className="sticky-inquire-btn">
                      <ChatCircleText size={18} weight="bold" />
                      <span>Start a Similar Project</span>
                      <ArrowRight size={16} weight="bold" />
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Next Project Footer Card */}
        <section className="case-study-next-section">
          <div className="case-study-container">
            <span className="next-project-label">Next Case Study</span>
            <Link href={`/work/${nextProject.slug}`} className="next-project-card">
              <div className="next-project-left">
                <span className="next-index">#{nextProject.index} · {nextProject.categoryLabel}</span>
                <h2 className="next-title">{nextProject.title}</h2>
                <p className="next-tagline">{nextProject.tagline}</p>
              </div>
              <div className="next-project-right">
                <span className="next-cta-btn">
                  <span>Explore Project</span>
                  <ArrowRight size={20} weight="bold" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
