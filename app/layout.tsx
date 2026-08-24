import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Kalam, Nunito_Sans } from "next/font/google";
import "./globals.css";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kunalkumar.design";

const display = Bricolage_Grotesque({
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kunal Kumar — UI/UX Designer & 3D Artist",
    template: "%s · Kunal Kumar",
  },
  description:
    "Independent multidisciplinary designer specializing in product design, UI/UX, branding, motion and 3D experiences.",
  keywords: [
    "UI designer",
    "UX designer",
    "3D artist",
    "brand identity designer",
    "product designer India",
    "Figma designer",
    "web designer portfolio",
  ],
  authors: [{ name: "Kunal Kumar", url: SITE_URL }],
  creator: "Kunal Kumar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kunal Kumar — UI/UX Designer & 3D Artist",
    description:
      "Good design, brighter days — bold brands, useful interfaces, and expressive 3D visuals by Kunal Kumar.",
    url: "/",
    siteName: "Kunal Kumar Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/culture-signal-illustrated-v2.png",
        width: 1200,
        height: 630,
        alt: "Illustrated nightlife discovery interfaces on a cobalt workbench",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kunal Kumar — UI/UX Designer & 3D Artist",
    description:
      "Bold brands, useful interfaces, expressive 3D visuals. Work made to be remembered.",
    images: ["/images/culture-signal-illustrated-v2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fff2df",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kunal Kumar",
  url: SITE_URL,
  email: "mailto:kkunalkumar0055@gmail.com",
  jobTitle: "UI/UX Designer & 3D Artist",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  knowsAbout: [
    "User Interface Design",
    "User Experience Design",
    "Brand Identity",
    "3D Art",
    "Motion Design",
  ],
  description:
    "Independent UI/UX designer and 3D artist helping people turn ideas into brands that actually mean something.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${handwriting.variable} ${body.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
