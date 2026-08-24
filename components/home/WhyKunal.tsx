const points = [
  {
    title: "Direct Collaboration",
    copy: "No account managers, no telephone game. You work directly with the designer doing the work, from kickoff to handoff.",
  },
  {
    title: "Multidisciplinary Thinking",
    copy: "Product, visual identity, motion and 3D are considered together — so every decision strengthens the whole experience.",
  },
  {
    title: "Built for Execution",
    copy: "Design decisions are made with real implementation in mind: tokens, components and specs your developers can actually ship.",
  },
];

export function WhyKunal() {
  return (
    <section className="why-kunal" aria-labelledby="why-title">
      <div className="why-kunal-inner">
        <div className="section-intro" data-reveal>
          <div className="section-intro-left">
            <p className="hand-label">✦ Why work with me</p>
            <h2 id="why-title">Small studio focus. Full-stack craft.</h2>
          </div>
        </div>

        <div className="why-grid" data-reveal>
          {points.map((point) => (
            <div key={point.title} className="why-item">
              <h3>{point.title}</h3>
              <p>{point.copy}</p>
            </div>
          ))}
        </div>

        <p className="why-footnote" data-reveal>
          <span aria-hidden="true">✦</span> Working worldwide from India — overlapping EU mornings
          and US afternoons.
        </p>
      </div>
    </section>
  );
}
