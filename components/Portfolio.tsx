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


export function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to portfolio
      </a>
      <ScrollProgress />
      <CustomCursor />
      <RevealOnScroll />
      <ConfettiLayer />
      <PortfolioNavigation />
      <main id="main-content">
        <IllustratedHero />
        <SignalMarquee />
     \
        <SelectedWork />
        <AboutStudio />
        <CreativePlayground />
        <DesignProcess />
      
        <FaqSection />
      </main>
      <PortfolioContact />
    </>
  );
}
