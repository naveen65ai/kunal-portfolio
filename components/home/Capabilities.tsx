const capabilities = [
  {
    number: "01",
    title: "Product & UI/UX",
    services: [
      "Product strategy",
      "User experience",
      "Interface design",
      "Design systems",
      "Prototyping",
    ],
  },
  {
    number: "02",
    title: "Brand & Visual",
    services: [
      "Brand direction",
      "Art direction",
      "Visual identity",
      "Campaign design",
    ],
  },
  {
    number: "03",
    title: "3D Modeling & Art",
    services: [
      "3D asset modeling",
      "Texturing & lighting",
      "Spatial scene design",
      "Product visualization",
    ],
  },
  {
    number: "04",
    title: "Motion & Interaction",
    services: [
      "Micro-interactions",
      "Motion prototypes",
      "Interactive Figma variants",
      "UI & Lottie animations",
    ],
  },
];

export function Capabilities() {
  return (
    <section className="capabilities" aria-labelledby="capabilities-title">
      <div className="capabilities-inner">
        <div className="section-intro" data-reveal>
          <div className="section-intro-left">
            <p className="hand-label">✦ Capabilities</p>
            <h2 id="capabilities-title">What I can help you build.</h2>
          </div>
          <div className="section-intro-right">
            <p className="work-discription">
              One multidisciplinary designer across product, brand, 3D and motion — so strategy,
              visuals, and interactive flow never pull in different directions.
            </p>
          </div>
        </div>

        <div className="capabilities-grid" data-reveal>
          {capabilities.map((capability) => (
            <div key={capability.number} className="capability-col">
              <span className="capability-number">{capability.number}</span>
              <h3 className="capability-title">{capability.title}</h3>
              <ul className="capability-list">
                {capability.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
