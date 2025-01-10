// api.ts

import { mockProductData2, mockProductList2 } from "./mockData";
import { Product } from "@/types/v2";

const FETCH_DELAY = 500; //ms

export async function fetchMockProductInfo(): Promise<Product> {
  // Simulate a delay to mimic real API latency
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProductData2), FETCH_DELAY);
  });
}

export async function fetchMockProductList(): Promise<Product[]> {
  // Simulate a delay to mimic real API latency
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProductList2), FETCH_DELAY);
  });
}
