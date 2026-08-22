type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  className: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Kunal took our messy brief and returned a brand that people screenshot and send to friends. The man thinks in systems but designs like an artist.",
    name: "Ananya Sharma",
    role: "Founder, Nightowl Labs",
    initials: "AS",
    className: "testimonial-card--yellow",
  },
  {
    quote:
      "Every review round came back faster than we expected, and every version was better than the last. Our conversion rate jumped 34% after the redesign.",
    name: "Marcus Chen",
    role: "Product Lead, Driftline",
    initials: "MC",
    className: "testimonial-card--orange",
  },
  {
    quote:
      "The 3D work alone is worth double what he charges. Handing off files so clean our developers actually said thank you. Rare.",
    name: "Priya Nair",
    role: "Creative Director, Studio Mellow",
    initials: "PN",
    className: "testimonial-card--paper",
  },
];

export function Testimonials() {
  return (
    <section id="kind-words" className="kind-words" aria-labelledby="kind-words-title">
      <div className="section-intro">
        <p className="hand-label">Receipts / real words</p>
        <h2 id="kind-words-title">People say it better.</h2>
        <p>Founders, product leads, and creative directors on what it&apos;s like to build with me — unedited, unpaid, and pinned to the studio wall.</p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className={`testimonial-card ${testimonial.className}`} data-reveal>
            <span className="testimonial-tape" aria-hidden="true" />
            <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
            <figcaption>
              <span className="testimonial-avatar" aria-hidden="true">{testimonial.initials}</span>
              <span>
                <b>{testimonial.name}</b>
                <small>{testimonial.role}</small>
              </span>
              <span className="testimonial-stars" aria-label="Five star rating">★ ★ ★ ★ ★</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
