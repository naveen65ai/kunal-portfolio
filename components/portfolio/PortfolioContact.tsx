import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

const email = "kkunalkumar0055@gmail.com";
const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=kkunalkumar0055%40gmail.com&su=Project%20inquiry%20from%20your%20portfolio";

export function PortfolioContact() {
  return (
    <footer id="contact" className="portfolio-contact" aria-labelledby="contact-title">
      <div className="contact-star" aria-hidden="true">Let&apos;s<br />make it</div>
      <p className="hand-label">Have an idea worth drawing out?</p>
      <h2 id="contact-title">Let&apos;s build something people remember.</h2>
      <p className="contact-copy">Tell me what you&apos;re making, where it&apos;s stuck, and what a great outcome looks like. I&apos;ll bring the questions, systems, and visual energy.</p>

      <div className="contact-actions">
        <a className="contact-gmail" href={gmailUrl} target="_blank" rel="noopener noreferrer">
          Open Gmail <ArrowRight aria-hidden="true" weight="bold" />
          <span className="sr-only"> to email Kunal (opens in a new tab)</span>
        </a>
        <a className="contact-email" href={`mailto:${email}`}>
          <EnvelopeSimple aria-hidden="true" weight="bold" /> {email}
        </a>
      </div>

      <div className="contact-footer">
        <span>Kunal Kumar © {new Date().getFullYear()}</span>
        <span>UI/UX · 3D · Brand · Web</span>
        <span>India / Working worldwide</span>
      </div>
    </footer>
  );
}
