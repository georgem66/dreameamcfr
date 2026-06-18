import type { MetadataRoute } from "next";
import { site, navLinks } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return navLinks.map((l) => ({
    url: `${site.url}${l.href === "/" ? "" : l.href}`,
    lastModified,
    changeFrequency: l.href === "/" ? "weekly" : "monthly",
    priority: l.href === "/" ? 1 : 0.7,
  }));
}
