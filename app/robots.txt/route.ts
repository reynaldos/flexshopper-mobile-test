import { NextResponse } from "next/server";

export async function GET() {
  const content = `
    User-agent: *
    Disallow: /api/

    User-agent: Googlebot
    Allow: /

    Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml
  `;

  return new NextResponse(content.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}