const phrases = ["UI / UX", "Brand systems", "3D worlds", "Motion", "Web experiences"];

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
