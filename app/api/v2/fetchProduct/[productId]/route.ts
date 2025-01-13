// FETCH LEGACY PRODUCT DATA USING UPDATED PRODUCT ID

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;

  if (!productId) {
    return new NextResponse(
      JSON.stringify({ message: "Product ID is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // Path to the JSON file
    const JSON_PATH = path.join(
      process.cwd(),
      "public",
      "mergedProductData.json"
    );

    // Check if the file exists
    if (!fs.existsSync(JSON_PATH)) {
      throw new Error("Merged product data file not found.");
    }

    // Read and parse the JSON file
    const jsonData = fs.readFileSync(JSON_PATH, "utf-8");
    const products = JSON.parse(jsonData);

    // Find the product with the matching `mpn`
    const product = products.find(
      (item: any) =>
        item.id === productId ||
        item.legacy_id === productId ||
        item.slug === productId ||
        item.mpn === productId.slice(4)
    );

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: `Product with ID ${productId} not found.` }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return the matched product
    return new NextResponse(JSON.stringify(product), {
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
        message: `Failed to fetch product data for ID ${productId}`,
        errorMessage,
        errorDetails: errorStack,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
