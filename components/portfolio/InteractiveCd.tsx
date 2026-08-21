"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "@phosphor-icons/react";
import compactDisc from "@/public/images/compact-disc-illustrated-v2.png";

const gmailUrl =
  "https://mail.google.com/mail/?view=cm&fs=1&to=kkunalkumar0055%40gmail.com&su=Project%20inquiry%20from%20your%20portfolio";

export function InteractiveCd() {
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const respectMotionPreference = (event: MediaQueryList | MediaQueryListEvent) => {
      if (event.matches) setSpinning(false);
    };

    respectMotionPreference(reducedMotion);
    reducedMotion.addEventListener("change", respectMotionPreference);

    return () => reducedMotion.removeEventListener("change", respectMotionPreference);
  }, []);

  return (
    <div className="cd-stage" data-spinning={spinning}>
      <button
        className="cd-motion-toggle"
        type="button"
        aria-label={spinning ? "Pause rotating compact disc" : "Play rotating compact disc"}
        aria-pressed={spinning}
        onClick={() => setSpinning((isSpinning) => !isSpinning)}
      >
        <span className="cd-disc" aria-hidden="true">
          <Image
            src={compactDisc}
            alt=""
            fill
            sizes="(max-width: 760px) 80vw, 38vw"
          />
        </span>
        <span className="cd-glint" aria-hidden="true" />
        <span className="cd-control-state">
          {spinning ? <Pause aria-hidden="true" weight="fill" /> : <Play aria-hidden="true" weight="fill" />}
          {spinning ? "Pause spin" : "Play spin"}
        </span>
      </button>

      <a
        className="cd-note"
        href={gmailUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Start a project from the compact disc; opens Gmail in a new tab"
      >
        Start a project <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
