"use client";

import { useEffect, useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import { ArrowUpRight, CheckCircle, Clock, Sparkle, X } from "@phosphor-icons/react";

export type ProjectDetail = {
  index: string;
  title: string;
  category: "product" | "3d" | "brand";
  categoryLabel: string;
  tagline: string;
  client: string;
  year: string;
  duration: string;
  metric: string;
  metricLabel: string;
  overview: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  tools: string[];
  image: StaticImageData;
  galleryImages?: StaticImageData[];
  alt: string;
  accentColor: string;
  liveUrl?: string;
};

type ProjectModalProps = {
  project: ProjectDetail | null;
  onClose: () => void;
};

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="project-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="project-modal-card" ref={modalRef}>
        {/* Header Bar */}
        <div className="project-modal-header">
          <div className="project-modal-badges">
            <span className="project-modal-index">{project.index}</span>
            <span className="project-modal-category">{project.categoryLabel}</span>
            <span className="project-modal-year">{project.year}</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="project-modal-close"
            onClick={onClose}
            aria-label="Close project details"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Content Body */}
        <div className="project-modal-body">
          {/* Title & Key Impact Stat */}
          <div className="project-modal-hero">
            <div>
              <p className="hand-label">{project.client}</p>
              <h2 id="modal-project-title" className="project-modal-title">
                {project.title}
              </h2>
              <p className="project-modal-tagline">{project.tagline}</p>
            </div>

            {project.metric && (
              <div className="project-modal-impact-badge">
                <Sparkle size={22} weight="fill" className="impact-icon" />
                <div>
                  <strong className="impact-stat">{project.metric}</strong>
                  <span className="impact-label">{project.metricLabel}</span>
                </div>
              </div>
            )}
          </div>

          {/* Primary Featured Image */}
          <div className="project-modal-media-frame">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 850px"
              className="project-modal-image"
            />
          </div>

          {/* Key Quick Facts Grid */}
          <div className="project-modal-meta-grid">
            <div className="meta-box">
              <span className="meta-heading">
                <Clock size={16} weight="bold" /> Timeline
              </span>
              <span className="meta-value">{project.duration}</span>
            </div>
            <div className="meta-box">
              <span className="meta-heading">Role & Discipline</span>
              <span className="meta-value">{project.categoryLabel}</span>
            </div>
            <div className="meta-box">
              <span className="meta-heading">Tools Used</span>
              <span className="meta-value">{project.tools.join(" · ")}</span>
            </div>
          </div>

          {/* Case Study Details */}
          <div className="project-modal-narrative">
            <div className="narrative-section">
              <h3>The Challenge</h3>
              <p>{project.challenge}</p>
            </div>

            <div className="narrative-section">
              <h3>The Solution & Design System</h3>
              <p>{project.solution}</p>
            </div>

            <div className="narrative-section">
              <h3>Key Deliverables</h3>
              <ul className="deliverables-pills">
                {project.deliverables.map((item) => (
                  <li key={item}>
                    <CheckCircle size={16} weight="fill" className="pill-check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Action CTA */}
          <div className="project-modal-actions">
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=kkunalkumar0055@gmail.com&su=Inquiry%20inspired%20by%20${encodeURIComponent(
                project.title,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pill-button modal-inquire-btn"
            >
              Start a project like this <ArrowUpRight size={18} weight="bold" />
            </a>
            <button type="button" className="modal-back-btn" onClick={onClose}>
              Back to work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
