import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectEstimator } from "@/components/portfolio/ProjectEstimator";

export const metadata: Metadata = {
  title: "Project Estimator",
  description:
    "Get an instant estimate of scope, timeline and deliverables for your design project.",
  alternates: {
    canonical: "/estimate",
  },
};

export default function EstimatePage() {
  return (
    <>
      <SiteHeader />

      <main className="subpage-main">
        <header className="subpage-hero">
          <div className="subpage-container">
            <p className="hand-label">Scope & Timeline</p>
            <h1 className="subpage-title">Project Estimator</h1>
            <p className="subpage-lead">
              Pick your disciplines, depth and pace to see a realistic delivery window — then send
              it over with your inquiry.
            </p>
          </div>
        </header>

        <ProjectEstimator />
      </main>

      <SiteFooter />
    </>
  );
}
