import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SoundToggle } from "@/components/ui/SoundToggle";

const InteractiveCd = dynamic(() =>
  import("@/components/portfolio/InteractiveCd").then((m) => ({ default: m.InteractiveCd })),
);
const SoundMatrixPad = dynamic(() =>
  import("@/components/portfolio/SoundMatrixPad").then((m) => ({ default: m.SoundMatrixPad })),
);
const TactilePhysicsSandbox = dynamic(() =>
  import("@/components/portfolio/TactilePhysicsSandbox").then((m) => ({
    default: m.TactilePhysicsSandbox,
  })),
);

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Experiments, unfinished ideas, 3D studies, audio toys and interactive prototypes by Kunal Kumar.",
  alternates: {
    canonical: "/playground",
  },
};

export default function PlaygroundPage() {
  return (
    <>
      <SiteHeader />

      <main className="subpage-main">
        <header className="subpage-hero">
          <div className="subpage-container">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <div>
                <p className="hand-label">Playground</p>
                <h1 className="subpage-title">Experiments & unfinished ideas.</h1>
              </div>
              <SoundToggle variant="hero" />
            </div>
            <p className="subpage-lead">
              3D studies, audio-visual toys and physics prototypes — made purely because they were
              interesting. This is where the experiments live.
            </p>
          </div>
        </header>

        <section className="playground-section-wrap">
          <div className="subpage-container">
            <div className="playground-grid-two-col">
              <div className="playground-module-card">
                <div className="module-header">
                  <span className="module-tag">Interactive 3D</span>
                </div>
                <h2 className="module-title">Studio Rotation CD Player</h2>
                <p className="module-desc">
                  Drag and rotate the holographic compact disc in 3D space. Click to spin.
                </p>
                <div className="module-canvas-box">
                  <InteractiveCd />
                </div>
              </div>

              <div className="playground-module-card">
                <div className="module-header">
                  <span className="module-tag">Web Audio</span>
                </div>
                <h2 className="module-title">Tactile Audio Matrix Pad</h2>
                <p className="module-desc">
                  Tap pads or paint notes across the 4x4 matrix to compose real-time melodies with
                  Web Audio oscillators.
                </p>
                <div className="module-canvas-box">
                  <SoundMatrixPad />
                </div>
              </div>
            </div>

            <div className="playground-full-module-card">
              <div className="module-header">
                <span className="module-tag">Spring Physics</span>
              </div>
              <h2 className="module-title">Tactile Design Tokens Sandbox</h2>
              <p className="module-desc">
                Physics-enabled chips and tactile cards you can drag and throw around to feel out
                collision damping.
              </p>
              <div className="module-canvas-box">
                <TactilePhysicsSandbox />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
