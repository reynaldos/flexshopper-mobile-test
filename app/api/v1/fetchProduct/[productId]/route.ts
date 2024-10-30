// app/api/v1/fetchProduct/[productId]/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;

  if (!productId) {
    return new NextResponse(
      JSON.stringify({ message: "Product Id required" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Fetch product data from the API
    const response = await fetch(
      `https://apis.flexshopper.com/synthetics-fmcore/marketplace/Products/${productId}/overview`,
      {
        method: "GET",
        headers: {
          Authorization: `${process.env.FMCORE_API_KEY}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 300 }, // Caching for 5 minutes at the CDN level
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(`API error: ${response.status} - ${response.statusText}`, data);
      throw new Error(`Failed to fetch product data: ${response.statusText}`);
    }
    
    if (data.error) {
      return new NextResponse(
        JSON.stringify({
          message: `Failed to fetch product data for id ${productId}`,
          errorDetails: data.error,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=300, stale-while-revalidate=60", // Cache for 5 minutes, revalidate for 1 minute
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    const errorStack = error instanceof Error ? error.stack : "No stack trace";

    console.error(errorMessage, errorStack);

    return new NextResponse(
      JSON.stringify({
        message: `Failed to fetch product data for id ${productId}`,
        errorMessage,
        errorDetails: errorStack,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
