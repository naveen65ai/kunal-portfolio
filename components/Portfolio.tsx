import { AboutStudio } from "./portfolio/AboutStudio";
import { CreativePlayground } from "./portfolio/CreativePlayground";
import { DesignProcess } from "./portfolio/DesignProcess";
import { IllustratedHero } from "./portfolio/IllustratedHero";
import { PortfolioContact } from "./portfolio/PortfolioContact";
import { PortfolioNavigation } from "./portfolio/PortfolioNavigation";
import { SelectedWork } from "./portfolio/SelectedWork";
import { SignalMarquee } from "./portfolio/SignalMarquee";

export function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to portfolio
      </a>
      <PortfolioNavigation />
      <main id="main-content">
        <IllustratedHero />
        <SignalMarquee />
        <SelectedWork />
        <AboutStudio />
        <CreativePlayground />
        <DesignProcess />
      </main>
      <PortfolioContact />
    </>
  );
}
