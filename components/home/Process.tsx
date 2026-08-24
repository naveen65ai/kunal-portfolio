const steps = [
  {
    name: "Discover",
    copy: "Understand the business, the audience and the problem before touching a single pixel.",
    meta: "Calls · Research · Brief",
  },
  {
    name: "Define",
    copy: "Shape the direction: structure, hierarchy and a visual strategy worth committing to.",
    meta: "Wireframes · Moodboards",
  },
  {
    name: "Design",
    copy: "Build and refine the experience through tight iteration and honest feedback loops.",
    meta: "UI · Prototype · Motion",
  },
  {
    name: "Deliver",
    copy: "Polished, organized assets with documentation — plus support through launch.",
    meta: "Handoff · Guidelines",
  },
];

export function Process() {
  return (
    <section id="process" className="process-v2" aria-labelledby="process-title">
      <div className="process-v2-inner">
        <div className="section-intro" data-reveal>
          <div className="section-intro-left">
            <p className="hand-label">✦ How I work</p>
            <h2 id="process-title">Four steps. No guesswork.</h2>
          </div>
          <div className="section-intro-right">
            <p className="work-discription">
              A simple, predictable process that keeps decisions fast and surprises on your
              invoice at zero.
            </p>
          </div>
        </div>

        <ol className="process-steps" data-reveal>
          {steps.map((step) => (
            <li key={step.name} className="process-step">
              <h3 className="process-step-name">{step.name}</h3>
              <p className="process-step-copy">{step.copy}</p>
              <span className="process-step-meta">{step.meta}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
