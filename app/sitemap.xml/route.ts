// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Static URLs
  const staticUrls = [
    { url: `${baseUrl}/`, priority: "0.1" },
  ];

  // Fetch dynamic URLs, such as product pages
  const products = await fetch(`${baseUrl}/api/v1/getProductIds`); // Replace with your actual data source
  const productData = await products.json();

  // Map product IDs to URLs
  const dynamicUrls = productData.map((productId: string) => ({
    url: `${baseUrl}/${productId}`,
    priority: "1.0",
  }));

  // Combine static and dynamic URLs
  const urls = [...staticUrls, ...dynamicUrls];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (item) => `
          <url>
            <loc>${item.url}</loc>
            <priority>${item.priority}</priority>
          </url>
        `
        )
        .join("")}
    </urlset>
  `;

  return new NextResponse(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}