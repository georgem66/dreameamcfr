import type { Metadata } from "next";
import { site } from "./content";

type PageMetaArgs = {
  /** Short page title — the site name is appended automatically. */
  title: string;
  description: string;
  /** Route path, e.g. "/about" (use "/" for the home page). */
  path: string;
};

/**
 * Build consistent per-page metadata: canonical URL, Open Graph and Twitter
 * cards. The site-wide OG image (app/opengraph-image.tsx) is applied automatically.
 */
export function pageMeta({ title, description, path }: PageMetaArgs): Metadata {
  const fullTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      // Keep the site OG image on sub-pages (defining openGraph here would otherwise drop it).
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
