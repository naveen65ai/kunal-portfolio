"use client";

import {
  ArrowRight,
  EnvelopeSimple,
  Sparkle,
  LinkedinLogo,
  TwitterLogo,
  FigmaLogo,
  GithubLogo,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { CopyEmailButton } from "./CopyEmailButton";
import { LocalTimeBadge } from "./LocalTimeBadge";
import { fireConfetti } from "./Confetti";

const email = "kkunalkumar0055@gmail.com";
const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=kkunalkumar0055%40gmail.com&su=Project%20inquiry%20from%20your%20portfolio";

export function PortfolioContact() {
  return (
    <footer id="contact" className="portfolio-contact" aria-labelledby="contact-title">
      <div className="contact-star" aria-hidden="true">
        Let&apos;s
        <br />
        Make It ✦
      </div>

      <div className="contact-inner-container">
        <p className="hand-label">Ready to turn ideas into reality?</p>
        <h2 id="contact-title">Let&apos;s build something people will remember.</h2>
        <p className="contact-copy">
          Whether you need a full mobile app designed, a brand identity sprint, or bespoke 3D
          visuals that stop people from scrolling — I&apos;m available for select projects.
        </p>

        {/* Real-Time IST Clock & Availability */}
        <div className="contact-status-row">
          <LocalTimeBadge />
          <div className="availability-guarantee-pill">
            <Sparkle size={14} weight="fill" className="text-amber-500" />
            <span>Response within 24 hours guaranteed</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="contact-actions">
          <a
            className="contact-gmail"
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => fireConfetti()}
          >
            <PaperPlaneTilt size={20} weight="bold" />
            <span>Open Direct Gmail Draft</span>
            <ArrowRight aria-hidden="true" weight="bold" />
            <span className="sr-only"> to email Kunal (opens in a new tab)</span>
          </a>

          <a className="contact-email" href={`mailto:${email}`}>
            <EnvelopeSimple aria-hidden="true" weight="bold" size={20} />
            <span>{email}</span>
          </a>

          <CopyEmailButton email={email} />
        </div>

        {/* Social Links Row */}
        <div className="contact-socials-row">
          <span className="socials-label">Find me across the web:</span>
          <div className="socials-links">
            <a
              href="https://www.linkedin.com/in/kunal-kunal-kumar-"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="Kunal Kumar on LinkedIn"
            >
              <LinkedinLogo size={16} weight="bold" /> LinkedIn
            </a>
            <a
              href="https://x.com/kunalkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="Kunal Kumar on X"
            >
              <TwitterLogo size={16} weight="bold" /> X (Twitter)
            </a>
            <a
              href="https://figma.com/@kunalkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="Kunal Kumar on Figma Community"
            >
              <FigmaLogo size={16} weight="bold" /> Figma
            </a>
            <a
              href="https://github.com/kunalkumar"
              target="_blank"
              rel="noopener noreferrer"
              className="social-pill"
              aria-label="Kunal Kumar on GitHub"
            >
              <GithubLogo size={16} weight="bold" /> GitHub
            </a>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="contact-footer">
          <span>Kunal Kumar © {new Date().getFullYear()}</span>
          <span>UI/UX · 3D Art · Brand Systems · Spatial Web</span>
          <span>India / Working Worldwide 🌍</span>
        </div>
      </div>
    </footer>
  );
}
