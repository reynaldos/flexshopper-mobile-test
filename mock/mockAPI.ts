// api.ts

import { ProductInfo } from "@/types/index";
import { mockProductData, mockProductList } from "./mockData";

const FETCH_DELAY = 500; //ms


export async function fetchMockProductInfo(): Promise<ProductInfo> {

  // Simulate a delay to mimic real API latency
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProductData), FETCH_DELAY);
  });
}


export async function fetchMockProductList(): Promise<ProductInfo[]> {

  // Simulate a delay to mimic real API latency
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProductList), FETCH_DELAY);
  });
}