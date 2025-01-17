// app/products/[productId]/page.tsx

import dynamic from "next/dynamic";
import { Product } from "@/types/v2";
// import { mockProductList } from "@/mock/mockData";
import { fetchMockProductInfo, fetchMockProductList } from "@/mock/mockAPI";
import { notFound } from "next/navigation";

const ProductHero = dynamic(() => import("@/components/ProductHero"));
const DetailsAccordion = dynamic(() => import("@/components/DetailsAccordion"));
const ProductSwiper = dynamic(() => import("@/components/ProductSwiper"));

import "./styles.css";

// Fetch product data server-side
async function fetchProduct(productId: string): Promise<Product | null> {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return await fetchMockProductInfo();
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/fetchProduct/${productId}`,
    {
      next: { revalidate: 300 }, // Caching for 5 minutes at the CDN level
      method: "GET",
      headers: {
        "x-api-auth-token": process.env.API_AUTH_TOKEN || "",
      },
    }
  );

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

async function fetchRandomProducts(product: Product | null) {
  if (!product) return;

  try {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      const data = await fetchMockProductList();
      return data;
    }

    if (product.id) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/getRandomIds/${
          product.id
        }?category=${product.category || ""}`,
        {
          next: { revalidate: 300 },
          method: "GET",
          headers: {
            "x-api-auth-token": process.env.API_AUTH_TOKEN || "",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      return data.products;
    }
  } catch (error) {
    console.error("Failed to fetch products data:", error);
    return [];
  }
}

// Main Product Page Component
export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await fetchProduct(params.productId);

  // If no product data is returned, render a 404 page
  if (!product) {
    notFound();
  }

  const randomProducts = await fetchRandomProducts(product);

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
        <ProductSwiper productList={randomProducts} />
      </section>
    </div>
  );
}
