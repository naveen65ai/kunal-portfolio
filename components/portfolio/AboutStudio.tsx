import Image from "next/image";
import processDesk from "@/public/images/process-desk-illustrated-v2.png";

const capabilities = ["Product & UI design", "Brand systems", "3D direction", "Motion language"];

export function AboutStudio() {
  return (
    <section id="about" className="about-studio" aria-labelledby="about-title">
      <div className="about-heading" data-reveal>
        <p className="hand-label">Hello, I&apos;m Kunal</p>
        <h2 id="about-title">I make the useful unmissable.</h2>
      </div>

      <div className="about-collage" data-reveal>
        <figure className="about-polaroid">
          <div>
            <Image src={processDesk} alt="Illustrated design workbench with wireframes, color cards, and a hand drawing" fill sizes="(max-width: 760px) 88vw, 38vw" />
          </div>
          <figcaption>Thinking with my hands — 2026</figcaption>
        </figure>

        <div className="about-copy">
          <p className="about-lede">I&apos;m an independent UI/UX designer and 3D artist from India, working with people who want clarity without losing character.</p>
          <p>I move between flows, frames, materials, and motion until the practical answer becomes the memorable one. The result is work that feels easy to use and hard to ignore.</p>
          <ul aria-label="Capabilities">
            {capabilities.map((capability, index) => (
              <li key={capability}><span>0{index + 1}</span>{capability}</li>
            ))}
          </ul>
        </div>

        <div className="about-sticker about-sticker--yellow" aria-hidden="true">Curious<br />by default</div>
        <div className="about-sticker about-sticker--orange" aria-hidden="true">India →<br />Worldwide</div>
      </div>
    </section>
  );
}
