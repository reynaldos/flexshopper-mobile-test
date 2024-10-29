// app/products/[productId]/page.tsx

import dynamic from "next/dynamic";
import { ProductInfo } from "@/types/index";

import { mockProductList } from "@/mock/mockData";
import { fetchMockProductInfo } from "@/mock/mockAPI";

const ProductHero = dynamic(() => import("@/components/ProductHero"));
const DetailsAccordion = dynamic(() => import("@/components/DetailsAccordion"));
const ProductSwiper = dynamic(() => import("@/components/ProductSwiper"));

import "./styles.css"

// Fetch product data server-side
async function fetchProduct(productId: string): Promise<ProductInfo | null> {

  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    const data = await fetchMockProductInfo();
    return data
  }

  const response = await fetch(
    `https://apis.flexshopper.com/synthetics-fmcore/marketplace/Products/${productId}/overview`,
    { headers: { Authorization: process.env.FMCORE_API_KEY || "" } }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product data");
  }

  return response.json();
}

// Revalidate this page every 5 minutes
export const revalidate = 300;

export async function generateStaticParams() {
  const productIds = mockProductList; // Replace with real product IDs
  return productIds.map((id) => ({ productId: String(id) }));
}

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await fetchProduct(params.productId);

  if (!product) {
    throw new Error("Product not found");
  }
 
  return (
    <div className="flex flex-col items-center justify-start bg-white font-sans max-w-md mx-auto pt-14">
      <section className="p-6 w-full bg-gray-100 shadow-md">
        <h1 className="text-xl font-bold text-center  mb-4 px-4 leading-tight text-[var(--main500)]">
          {product.name}
        </h1>
        <ProductHero product={product} />
      </section>

      <section className="bg-white w-full shadow-md">
        <DetailsAccordion product={product} />
      </section>

      <section className="p-6 w-full bg-gray-100 shadow-md">
        <h1 className="text-xl font-bold text-center text-gray-900 mb-4 px-4">
          Customers Also Viewed
        </h1>
        <ProductSwiper product={product} />
      </section>
    </div>
  );
}
