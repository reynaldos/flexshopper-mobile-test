import { NextRequest, NextResponse } from "next/server";

import productList from "@/mock/productList";

function getRandomIds(excludeId: string, ids: string[]): string[] {
  const uniqueIds = new Set<string>();

  while (uniqueIds.size < 3) {
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    if (randomId !== excludeId) {
      uniqueIds.add(randomId);
    }
  }

  return Array.from(uniqueIds);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId;

  if (!productId) {
    return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
  }

  try {
    const randomIds = getRandomIds(productId, productList);

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
