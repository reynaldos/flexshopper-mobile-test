import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Product } from "@/types/v2";

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;

  if (!productId) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }

  // Get the category from the query parameters
  const category = request.nextUrl.searchParams.get("category") || "";

  try {
    // Load and parse mergedProductData.json
    const JSON_PATH = path.join(process.cwd(), "public", "mergedProductData.json");

    if (!fs.existsSync(JSON_PATH)) {
      throw new Error("mergedProductData.json not found");
    }

    const mergedProductData = JSON.parse(fs.readFileSync(JSON_PATH, "utf-8"));

    const randomIds = getRandomIds(productId, category, mergedProductData);

    // Use Promise.all to fetch data for each ID in parallel
    const products = await Promise.all(
      randomIds.map(async (id) =>
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/fetchProduct/${id}`, {
          next: { revalidate: 300 },
          method: "GET",
          headers: {
            "x-api-auth-token": process.env.API_AUTH_TOKEN || "",
          },
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch data for ID: ${id}`);
          }

          const data = await response.json();

          return data;
        })
      )
    );

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching random products:", error);
    return NextResponse.json(
      { error: "Failed to process product ids" },
      { status: 500 }
    );
  }
}

function getRandomIds(
  productId: string,
  category: string,
  productList: Product[]
): string[] {
  console.log("productId", productId);
  console.log("category", category);

  // Filter the productList to exclude the productId and only include the given category
  const filteredProducts = productList.filter(
    (product) =>
      product.mpn !== productId.slice(4) && product.category === category
  );

  // If there are fewer than 3 products in the filtered list, return all of their IDs
  if (filteredProducts.length <= 3) {
    return filteredProducts.map((product) => product.id);
  }

  const randomIds = new Set<string>();
  while (randomIds.size < 3) {
    // Select a random product from the filtered list
    const randomProduct =
      filteredProducts[Math.floor(Math.random() * filteredProducts.length)];
    randomIds.add(randomProduct.id);
  }

  console.log("randomIds", randomIds);

  return Array.from(randomIds);
}