import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://rsjuris.com";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://rsjuris-backend.onrender.com/api/v1";

  // 1. Static Pages
  const routes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/practice-areas",
    "/articles",
    "/contact",
    "/management",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 2. Dynamic Article Slugs from Backend
  try {
    const res = await fetch(`${apiUrl}/articles/feed`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const articles = Array.isArray(data) ? data : data.items || [];
      const articleUrls = articles.map((art: { slug: string; updated_at?: string }) => ({
        url: `${baseUrl}/articles/${art.slug}`,
        lastModified: art.updated_at ? new Date(art.updated_at).toISOString() : new Date().toISOString(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
      routes.push(...articleUrls);
    }
  } catch (err) {
    console.warn("Could not fetch articles for sitemap generation.");
  }

  return routes;
}