import { NextRequest, NextResponse } from "next/server";

import productList from "@/mock/categorizedProductList";
function getRandomIds(
  productId: string,
  category: string,
  productList: {
    id: string;
    category: string;
  }[]
): string[] {
  // Filter the productList to exclude the productId and only include the given category
  const filteredProducts = productList.filter(
    (product) => product.id !== productId && product.category === category
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

  return Array.from(randomIds);
}

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
    const randomIds = getRandomIds(productId, category, productList);

    // Use Promise.all to fetch data for each ID in parallel
    const products = await Promise.all(
      randomIds.map(async (id) =>
        fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/fetchProduct/${id}`
        ).then(async (response) => {
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
