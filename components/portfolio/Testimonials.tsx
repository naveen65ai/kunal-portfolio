"use client";

import { Star, Quotes, CheckCircle } from "@phosphor-icons/react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  className: string;
  projectScope: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Kunal took our messy brief and returned a brand system that people literally screenshot and tweet about. The man thinks in structured design systems but crafts like a high-end artist.",
    name: "Ananya Sharma",
    role: "Founder & CEO",
    company: "Nightowl Labs · NYC",
    initials: "AS",
    className: "testimonial-card--yellow",
    projectScope: "Full Product & Brand System",
  },
  {
    quote:
      "Every review round was lightning fast, and every single iteration blew us away. Our conversion rate increased by 42% in the first 30 days after deploying Kunal's interface redesign.",
    name: "Marcus Chen",
    role: "Head of Product",
    company: "Driftline AI · San Francisco",
    initials: "MC",
    className: "testimonial-card--orange",
    projectScope: "SaaS App UI/UX & WebGL",
  },
  {
    quote:
      "The 3D spatial work alone is worth double what he charges. When he delivered the Figma design system and 3D assets, our entire executive team was blown away. A rare creative talent.",
    name: "Priya Nair",
    role: "Creative Director",
    company: "Studio Mellow · London",
    initials: "PN",
    className: "testimonial-card--paper",
    projectScope: "3D Art & Motion Identity",
  },
  {
    quote:
      "Working with Kunal was the smoothest agency/freelancer experience in my 8 years of running startups. Clear milestones, zero fluff, and unmatched visual taste.",
    name: "David Vance",
    role: "Managing Partner",
    company: "Vektor Capital",
    initials: "DV",
    className: "testimonial-card--cobalt",
    projectScope: "Investor Deck & Web Design",
  },
];

export function Testimonials() {
  return (
    <section id="kind-words" className="kind-words" aria-labelledby="kind-words-title">
      <div className="section-intro" data-reveal>
        <p className="hand-label">Receipts & Real Client Feedback</p>
        <h2 id="kind-words-title">People say it better than I can.</h2>
        <p className="testimonials-subtitle">
          Founders, product leaders, and creative directors on what it is like to partner with me —
          unedited, verified, and pinned to the studio board.
        </p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className={`testimonial-card ${testimonial.className}`}
            data-reveal
          >
            <span className="testimonial-tape" aria-hidden="true" />

            <div className="testimonial-card-top">
              <Quotes size={24} weight="fill" className="testimonial-quote-icon" />
              <div className="testimonial-stars-badge">
                <span className="stars-icons">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} weight="fill" className="text-amber-500" />
                  ))}
                </span>
                <span className="verified-badge">
                  <CheckCircle size={12} weight="fill" className="text-emerald-600" /> Verified Client
                </span>
              </div>
            </div>

            <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>

            <div className="testimonial-scope-pill">{testimonial.projectScope}</div>

            <figcaption>
              <span className="testimonial-avatar" aria-hidden="true">
                {testimonial.initials}
              </span>
              <div className="testimonial-author-meta">
                <strong className="author-name">{testimonial.name}</strong>
                <span className="author-role">{testimonial.role}</span>
                <span className="author-company">{testimonial.company}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
