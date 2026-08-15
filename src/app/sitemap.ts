import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  {
    url: `${SITE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1.0,
  },
  {
    url: `${SITE_URL}/about`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/careers`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: `${SITE_URL}/security`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: `${SITE_URL}/login`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    url: `${SITE_URL}/signup`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return STATIC_ROUTES;
}
