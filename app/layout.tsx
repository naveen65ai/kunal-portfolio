import type { Metadata, Viewport } from "next";
import { DynaPuff, Kalam, Nunito_Sans } from "next/font/google";
import "./globals.css";

const display = DynaPuff({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "variable",
  display: "swap",
});

const handwriting = Kalam({
  subsets: ["latin"],
  variable: "--font-hand",
  weight: ["400", "700"],
  display: "swap",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kunalkumar.design"),
  title: "Kunal Kumar — Designer & 3D Artist",
  description:
    "Kunal Kumar turns ideas into bold brands, useful interfaces, expressive 3D visuals, and memorable digital experiences.",
  openGraph: {
    title: "Kunal Kumar — Designer & 3D Artist",
    description: "Good design, brighter days — explore Kunal Kumar's portfolio.",
    images: ["/images/culture-signal-illustrated-v2.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff2df",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${handwriting.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
