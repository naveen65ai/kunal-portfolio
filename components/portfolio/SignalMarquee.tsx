const phrases = [
  "UI/UX Design",
  "Product",
  "Brand Identity",
  "3D Art",
  "Motion",
  "Creative Development",
];

export function SignalMarquee() {
  return (
    <div className="signal-marquee" aria-hidden="true">
      <div>
        {[0, 1].map((set) => (
          <span key={set}>
            {phrases.map((phrase) => (
              <b key={phrase}>{phrase}<i>✦</i></b>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
