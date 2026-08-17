import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kunalkumar.design"),
  title: "Kunal Kumar — UI/UX Designer & 3D Artist",
  description:
    "Independent UI/UX designer and 3D artist creating product interfaces, visual systems, and digital objects with depth.",
  openGraph: {
    title: "Kunal Kumar — UI/UX Designer & 3D Artist",
    description: "Interface, 3D, and motion shaped into memorable digital work.",
    images: ["/images/hero-sculpture.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
