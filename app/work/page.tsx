import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WorkArchiveClient } from "./WorkArchiveClient";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "Explore selected product design, UI/UX, brand identity and 3D case studies by Kunal Kumar.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Work & Case Studies · Kunal Kumar",
    description:
      "Product design, UI/UX, brand identity and 3D case studies by Kunal Kumar.",
  },
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <WorkArchiveClient />
      <SiteFooter />
    </>
  );
}
