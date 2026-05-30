import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://rohanm.dev",
      lastModified: new Date("2026-05-30"),
    },
    {
      url: "https://rohanm.dev/work",
      lastModified: new Date("2026-05-30"),
    },
    {
      url: "https://rohanm.dev/tools",
      lastModified: new Date("2026-05-30"),
    },
  ];
}
