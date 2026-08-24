"use client";

import { useEffect, useState } from "react";
import { AboutStudio } from "./portfolio/AboutStudio";
import { CreativePlayground } from "./portfolio/CreativePlayground";
import { CustomCursor } from "./portfolio/CustomCursor";
import { DesignProcess } from "./portfolio/DesignProcess";
import { FaqSection } from "./portfolio/FaqSection";
import { IllustratedHero } from "./portfolio/IllustratedHero";
import { ConfettiLayer } from "./portfolio/Confetti";
import { PortfolioContact } from "./portfolio/PortfolioContact";
import { PortfolioNavigation } from "./portfolio/PortfolioNavigation";
import { RevealOnScroll } from "./portfolio/RevealOnScroll";
import { ScrollProgress } from "./portfolio/ScrollProgress";
import { SelectedWork } from "./portfolio/SelectedWork";
import { SignalMarquee } from "./portfolio/SignalMarquee";

import { StudioValue } from "./portfolio/StudioValue";
import { ProjectEstimator } from "./portfolio/ProjectEstimator";

import { FloatingDock } from "./ui/FloatingDock";
import { CommandMenu } from "./ui/CommandMenu";
import { CrtScanlines } from "./ui/CrtScanlines";

export function Portfolio() {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setCommandMenuOpen((prev) => !prev);
    window.addEventListener("toggle-command-menu", handleToggle);
    return () => window.removeEventListener("toggle-command-menu", handleToggle);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to portfolio content
      </a>
      <CrtScanlines />
      <ScrollProgress />
      <CustomCursor />
      <RevealOnScroll />
      <ConfettiLayer />
      <PortfolioNavigation onOpenCommandMenu={() => setCommandMenuOpen(true)} />

      <main id="main-content">
        <IllustratedHero />
        <SignalMarquee />
        
        <SelectedWork />
        <StudioValue />
        <AboutStudio />
        <CreativePlayground />
        <DesignProcess />
        <ProjectEstimator />
        
        <FaqSection />
      </main>

      <PortfolioContact />

      {/* Magic UI / macOS Spring-Magnified Floating Dock */}
      <FloatingDock onOpenCommandMenu={() => setCommandMenuOpen(true)} />

      {/* Smooth UI / Aceternity Command Palette */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </>
  );
}
