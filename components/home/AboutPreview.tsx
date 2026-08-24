import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import processDesk from "@/public/images/process-desk-illustrated-v2.png";

export function AboutPreview() {
  return (
    <section className="about-preview" aria-labelledby="about-preview-title">
      <div className="about-preview-inner">
        <figure className="about-preview-figure" data-reveal>
          <div>
            <Image
              src={processDesk}
              alt="Illustrated design workbench with wireframes, color cards and a hand sketching"
              fill
              sizes="(max-width: 900px) 100vw, 26rem"
            />
          </div>
          <figcaption>The workbench — where every project starts.</figcaption>
        </figure>

        <div data-reveal>
          <p className="hand-label" style={{ color: "var(--paper)" }}>✦ About</p>
          <h2 id="about-preview-title" className="about-preview-lede">
            I work at the intersection of design and technology.
          </h2>
          <p className="about-preview-copy">
            My practice combines product thinking, visual storytelling, 3D and interaction design
            to create experiences that feel both useful and memorable — designed for real users,
            built with real engineering in mind.
          </p>
          <Link className="about-preview-cta" href="/about">
            <span>More About Me</span>
            <ArrowRight aria-hidden="true" weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
