import type { MetadataRoute } from "next";
import { profile, SITE_URL } from "@/lib/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/v4/`, priority: 1 },
    ...profile.caseStudies.map((c) => ({ url: `${SITE_URL}/v4/work/${c.slug}/`, priority: 0.8 })),
    { url: `${SITE_URL}/v4/resume`, priority: 0.7 },
  ];
}
