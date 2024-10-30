import { NextResponse } from "next/server";

import productList from "@/mock/categorizedProductList";

export async function GET() {
  try {
    return NextResponse.json(productList);
  } catch (error) {
    console.error("Error fetching product ids: ", error);
    return NextResponse.json(
      { error: "Failed to process prodcut id list" },
      { status: 500 }
    );
  }
}
