import Image from "next/image";
import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
import ribbonStudy from "@/public/images/ribbon-study-illustrated-v2.png";
import formStudy from "@/public/images/form-study-illustrated-v2.png";
import { InteractiveCd } from "@/components/portfolio/InteractiveCd";

export function CreativePlayground() {
  return (
    <section id="playground" className="creative-playground" aria-labelledby="playground-title">
      <div className="playground-heading" data-reveal>
        <p className="hand-label">Experiments / happy accidents</p>
        <h2 id="playground-title">The playground is where useful gets weird.</h2>
      </div>

      <div className="playground-grid">
        <InteractiveCd />

        <figure className="experiment-card experiment-card--sculpture">
          <div><Image src={ribbonStudy} alt="Illustrated coral and chrome ribbon study on cobalt blue" fill sizes="(max-width: 760px) 90vw, 36vw" /></div>
          <figcaption>Material studies / ink + chrome</figcaption>
        </figure>

        <figure className="experiment-card experiment-card--object">
          <div><Image src={formStudy} alt="Illustrated modular desktop sculpture in blue, cream, and coral" fill sizes="(max-width: 760px) 90vw, 28vw" /></div>
          <figcaption>Form studies / playful futures</figcaption>
        </figure>

        <div className="playground-manifesto">
          <span aria-hidden="true">✦</span>
          <p>Create.<br />Explore.<br />Impact.<br />Repeat.</p>
          <ArrowDownRight aria-hidden="true" weight="bold" />
        </div>
      </div>
    </section>
  );
}
