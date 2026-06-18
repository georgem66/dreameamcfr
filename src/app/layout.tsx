import type { Metadata, Viewport } from "next";
import { Anton, Outfit, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/content";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
const techMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-techmono",
  display: "swap",
});

const TITLE = "TUT Colour Fun Run 2026 — Run For Change, Run For All";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITLE,
    template: "%s · TUT Colour Fun Run 2026",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "TUT Colour Fun Run",
    "Tshwane University of Technology",
    "colour run Pretoria",
    "fun run 2026",
    "Run For Change",
    "5km colour run",
    "TUT events",
  ],
  authors: [{ name: "TUT Sport Management Students" }],
  creator: "TUT Sport Management Students",
  publisher: "TUT Sport Management Students",
  category: "events",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: TITLE,
    description: site.description,
    url: "/",
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#1741d6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${outfit.variable} ${techMono.variable} h-full antialiased`}
    >
      <body className="grain flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-[100] focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:rounded-xl focus:border-[3px] focus:border-ink focus:bg-yellow focus:px-4 focus:py-2 focus:font-extrabold focus:uppercase focus:text-ink"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main" className="relative z-10 flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
