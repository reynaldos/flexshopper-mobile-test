// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // Static URLs
  const staticUrls = [{ url: `${baseUrl}/`, priority: "0.1" }];
  // Fetch dynamic URLs, such as product pages
  try {
    const response = await fetch(`${baseUrl}/api/v2/getProductIds`, {
      method: "GET",
      headers: {
       'x-api-auth-token': process.env.API_AUTH_TOKEN || '',
      },
    });

    if (
      !response.ok ||
      response.headers.get("content-type") !== "application/json"
    ) {
      throw new Error("Failed to fetch product IDs or invalid response type");
    }

    const productData = await response.json();

    // Map product IDs to URLs
    const dynamicUrls = productData.map(
      (product: { id: string; category: string }) => ({
        url: `${baseUrl}/${product.id}`,
        priority: "1.0",
      })
    );

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
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new NextResponse("Error generating sitemap", { status: 500 });
  }
}
