// api.ts

import { ProductInfo } from "@/types/index";
import { mockProductData } from "./mockData";

export async function fetchMockProductInfo(
  productId: number
): Promise<ProductInfo> {
  const FETCH_DELAY = 500; //ms

  console.log("Fetching mock data, current proiudctId: ", productId);

  // Simulate a delay to mimic real API latency
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProductData), FETCH_DELAY);
  });
}
