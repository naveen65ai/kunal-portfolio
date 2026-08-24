import { AboutPreview } from "./home/AboutPreview";
import { Capabilities } from "./home/Capabilities";
import { Hero } from "./home/Hero";
import { Process } from "./home/Process";
import { FeaturedWork } from "./home/SelectedWork";
import { WhyKunal } from "./home/WhyKunal";
import { SiteFooter } from "./layout/SiteFooter";
import { SiteHeader } from "./layout/SiteHeader";
import { CustomCursor } from "./portfolio/CustomCursor";
import { RevealOnScroll } from "./portfolio/RevealOnScroll";
import { SignalMarquee } from "./portfolio/SignalMarquee";

export function Portfolio() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to portfolio content
      </a>
      <RevealOnScroll />
      <CustomCursor />
      <SiteHeader />

      <main id="main-content">
        <Hero />
        <SignalMarquee />
        <FeaturedWork />
        <Capabilities />
        <AboutPreview />
        <Process />
        <WhyKunal />
      </main>

      <SiteFooter />
    </>
  );
}
