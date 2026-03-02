import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shop-project-orcin-delta.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://shop-project-orcin-delta.vercel.app//about",
      lastModified: new Date(),
    },
    {
      url: "https://shop-project-orcin-delta.vercel.app//contact",
      lastModified: new Date(),
    },
    {
      url: "https://shop-project-orcin-delta.vercel.app//privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://shop-project-orcin-delta.vercel.app//terms",
      lastModified: new Date(),
    },
  ];
}