"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PaperPlaneRight,
  EnvelopeSimple,
  LinkedinLogo,
  Copy,
} from "@phosphor-icons/react";
import { LocalTimeBadge } from "@/components/portfolio/LocalTimeBadge";

const projectTypes = [
  "Product / UI UX",
  "Website",
  "Brand Identity",
  "3D / Motion",
  "Creative Development",
  "Other",
];

const budgetRanges = ["< $1k", "$1k – $3k", "$3k – $7k", "$7k+", "Let's discuss"];

const timelineOptions = ["ASAP", "1–2 months", "Flexible"];

export function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [selectedBudget, setSelectedBudget] = useState(budgetRanges[4]);
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[2]);
  const [message, setMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const directEmail = "kkunalkumar0055@gmail.com";

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Project inquiry: ${selectedType}${company ? ` — ${company}` : ""}`,
    );
    const body = encodeURIComponent(
      `Hi Kunal,\n\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Company / Project: ${company || "—"}\n` +
        `Project type: ${selectedType}\n` +
        `Budget range: ${selectedBudget}\n` +
        `Timeline: ${selectedTimeline}\n\n` +
        `Project brief:\n${message || "—"}\n\nThanks,\n${name}`,
    );

    window.location.href = `mailto:${directEmail}?subject=${subject}&body=${body}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directEmail);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${directEmail}`;
    }
  };

  return (
    <main className="subpage-main">
      <header className="subpage-hero">
        <div className="subpage-container">
          <Link href="/" className="subpage-back-link">
            <ArrowLeft size={16} weight="bold" />
            <span>Back to Home</span>
          </Link>

          <p className="hand-label">Start a Project</p>
          <h1 className="subpage-title">Tell me what you&apos;re building.</h1>
          <p className="subpage-lead">
            Share a few details about your project and I&apos;ll reply with an honest take on
            scope, timeline and fit. Prefer email? Reach me directly below.
          </p>
        </div>
      </header>

      <section className="contact-form-section">
        <div className="subpage-container">
          <div className="contact-form-layout">
            {/* Form Column */}
            <div className="contact-form-main-col">
              <form onSubmit={handleFormSubmit} className="interactive-contact-form">
                <div className="form-group-row">
                  <div className="form-input-box">
                    <label htmlFor="client-name" className="form-label">
                      Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="client-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="form-text-field"
                    />
                  </div>
                  <div className="form-input-box">
                    <label htmlFor="client-email" className="form-label">
                      Email <span className="text-amber-500">*</span>
                    </label>
                    <input
                      id="client-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="form-text-field"
                    />
                  </div>
                </div>

                <div className="form-input-box">
                  <label htmlFor="client-company" className="form-label">
                    Company / Organization
                  </label>
                  <input
                    id="client-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Studio, startup or brand name"
                    className="form-text-field"
                  />
                </div>

                <fieldset className="form-input-box">
                  <legend className="form-label">Project Type</legend>
                  <div className="form-pills-wrap">
                    {projectTypes.map((type) => {
                      const isSelected = selectedType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          aria-pressed={isSelected}
                          className={`form-pill-btn ${isSelected ? "is-selected" : ""}`}
                          onClick={() => setSelectedType(type)}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="form-input-box">
                  <legend className="form-label">Budget Range</legend>
                  <div className="form-pills-wrap">
                    {budgetRanges.map((budget) => {
                      const isSelected = selectedBudget === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          aria-pressed={isSelected}
                          className={`form-pill-btn ${isSelected ? "is-selected" : ""}`}
                          onClick={() => setSelectedBudget(budget)}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="form-input-box">
                  <legend className="form-label">Timeline</legend>
                  <div className="form-pills-wrap">
                    {timelineOptions.map((time) => {
                      const isSelected = selectedTimeline === time;
                      return (
                        <button
                          key={time}
                          type="button"
                          aria-pressed={isSelected}
                          className={`form-pill-btn ${isSelected ? "is-selected" : ""}`}
                          onClick={() => setSelectedTimeline(time)}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="form-input-box">
                  <label htmlFor="client-message" className="form-label">
                    Message <span className="text-amber-500">*</span>
                  </label>
                  <textarea
                    id="client-message"
                    name="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What are you building, who is it for, and what does success look like?"
                    className="form-text-field form-textarea"
                  />
                </div>

                <button type="submit" className="form-submit-button">
                  <PaperPlaneRight size={20} weight="bold" />
                  <span>Send Message</span>
                </button>

                <p className="form-hint">
                  This opens your email app with everything pre-filled — nothing is sent until you
                  hit send.
                </p>
              </form>
            </div>

            {/* Sidebar Info Column */}
            <aside className="contact-sidebar-col">
              <div className="contact-sidebar-card">
                <h3 className="sidebar-card-title">Prefer direct email?</h3>
                <p className="sidebar-card-desc">
                  Skip the form entirely — email reaches me fastest.
                </p>

                <div className="sidebar-action-item">
                  <span className="sidebar-item-label">Email</span>
                  <a href={`mailto:${directEmail}`} className="sidebar-email-link">
                    <EnvelopeSimple size={18} weight="bold" />
                    <span>{directEmail}</span>
                  </a>
                  <button type="button" onClick={handleCopyEmail} className="sidebar-copy-btn">
                    <Copy size={15} weight="bold" />
                    <span>{isCopied ? "Copied!" : "Copy address"}</span>
                  </button>
                </div>

                <div className="sidebar-action-item">
                  <span className="sidebar-item-label">LinkedIn</span>
                  <a
                    href="https://www.linkedin.com/in/kunal-kunal-kumar-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-linkedin-btn"
                  >
                    <LinkedinLogo size={18} weight="bold" />
                    <span>Connect on LinkedIn</span>
                  </a>
                </div>

                <div className="sidebar-timezone-box">
                  <span className="sidebar-item-label">Studio time</span>
                  <LocalTimeBadge />
                  <span className="sidebar-response-tag">
                    Available for select projects — 2026
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
