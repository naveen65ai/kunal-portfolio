import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ContactClient } from "./ContactClient";
import { FaqSection } from "@/components/portfolio/FaqSection";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Tell Kunal about your product, brand, 3D or motion project. Direct email and a short inquiry form.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Kunal Kumar",
    description:
      "Start a project in product design, brand identity, 3D or motion. Direct email and inquiry form.",
  },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <ContactClient />
      <FaqSection />
      <SiteFooter />
    </>
  );
}
