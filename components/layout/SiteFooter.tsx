import Link from "next/link";
import {
  ArrowRight,
  EnvelopeSimple,
  LinkedinLogo,
  TwitterLogo,
  FigmaLogo,
  GithubLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CopyEmailButton } from "@/components/portfolio/CopyEmailButton";
import { LocalTimeBadge } from "@/components/portfolio/LocalTimeBadge";

const EMAIL = "kkunalkumar0055@gmail.com";

export function SiteFooter() {
  return (
    <footer id="contact" className="portfolio-contact" aria-labelledby="contact-title">
      <div className="contact-star" aria-hidden="true">
        Let&apos;s
        <br />
        Make It ✦
      </div>

      <div className="contact-inner-container">
        <p className="hand-label">Ready when you are</p>
        <h2 id="contact-title">Have something interesting in mind? Let&apos;s build it.</h2>
        <p className="contact-copy">
          Product design, brand identity, motion or 3D — tell me what you are working on and I will
          come back with an honest plan.
        </p>

        <div className="contact-status-row">
          <LocalTimeBadge />
          <span className="availability-guarantee-pill">Available for select projects — 2026</span>
        </div>

        <div className="contact-actions">
          <Link className="contact-gmail" href="/contact">
            Start a Project
            <ArrowRight aria-hidden="true" weight="bold" />
            <span className="sr-only"> — go to the project inquiry form</span>
          </Link>

          <a className="contact-email" href={`mailto:${EMAIL}?subject=Project%20inquiry%20for%20Kunal`}>
            <EnvelopeSimple aria-hidden="true" weight="bold" size={20} />
            <span>{EMAIL}</span>
          </a>

          <CopyEmailButton email={EMAIL} />
        </div>

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

        <div className="contact-footer">
          <span>Kunal Kumar © {new Date().getFullYear()}</span>
          <span>UI/UX · Brand Systems · 3D Art · Motion</span>
          <span>India / Working Worldwide</span>
        </div>
      </div>
    </footer>
  );
}
