// app/products/[productId]/page.tsx

import dynamic from "next/dynamic";
import { ProductInfo } from "@/types/index";
// import { mockProductList } from "@/mock/mockData";
import { fetchMockProductInfo } from "@/mock/mockAPI";
import { notFound } from "next/navigation";

const ProductHero = dynamic(() => import("@/components/ProductHero"));
const DetailsAccordion = dynamic(() => import("@/components/DetailsAccordion"));
const ProductSwiper = dynamic(() => import("@/components/ProductSwiper"));

import "./styles.css";

// Fetch product data server-side
async function fetchProduct(productId: string): Promise<ProductInfo | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return await fetchMockProductInfo();
  }

  const apiKey = process.env.FMCORE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing FMCORE_API_KEY");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/fetchProduct/${productId}`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      cache: "no-store", // Ensures fresh data for each request
    }
  );

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

// Main Product Page Component
export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await fetchProduct(params.productId);

  // If no product data is returned, render a 404 page
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-start bg-white font-sans max-w-md mx-auto pt-14">
      <section className="p-6 w-full bg-gray-100 shadow-md">
        <h1 className="text-lg font-bold text-center mb-4 px-4 leading-tight text-[var(--main500)]">
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