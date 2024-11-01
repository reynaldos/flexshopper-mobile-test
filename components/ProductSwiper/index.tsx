"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Navigation } from "swiper/modules";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductInfo } from "@/types/index";
import { fetchMockProductList } from "@/mock/mockAPI";
import ProductSwiperSkeleton from "./loading";

import "./styles.css";

const ProductSwiper = ({ product }: { product: ProductInfo | null }) => {
  const [productList, setProductList] = useState<ProductInfo[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!product) return;
      try {
        if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
          const data = await fetchMockProductList();
          setProductList(data);
          return;
        }

        if (product.id) {
          const response = await fetch(
            `/api/v1/getRandomIds/${product.id}?category=${
              product.breadcrumbs[0].slug || ""
            }`,
            {
              next: { revalidate: 300 },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch products");

          const data = await response.json();
          setProductList(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products data:", error);
        setError(true);
      }
    };

    if (product) {
      fetchProducts();
    }
  }, [product]);

  const handleClick = (productId: string | number) => {
    window.location.href =
      `${process.env.NEXT_PUBLIC_BASE_URL}/${productId}` || "";
  };

  if (error || !productList || !product) {
    return <ProductSwiperSkeleton />;
  }

  return (
    <div className="flex justify-between items-center gap-2">
      <button aria-label="Show previous product" className="prev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <Swiper
        className="rounded-sm"
        spaceBetween={10}
        slidesPerView={1}
        modules={[Navigation, Mousewheel, Autoplay]}
        lazyPreloadPrevNext={1}
        mousewheel={{ forceToAxis: true }}
        navigation={{ prevEl: ".prev", nextEl: ".next" }}
        loop
      >
        {productList.map((product) => {
          const salePrice = ((product.inventories[0]?.salePrice / 100 / 52) * 2)
            .toFixed(2)
            .split(".");

          return (
            <SwiperSlide
              key={product.id}
              onClick={() => handleClick(product.id)}
            >
              <div className="h-full bg-white rounded-sm p-4 flex flex-col items-center border border-gray-200 pointer cursor-pointer">
                <Image
                  src={product.images[0].source || "/placeholder.png"}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-contain mb-4 max-h-52 min-h-52"
                />
                <h2 className="text-md font-semibold text-center text-gray-800 leading-6 mb-2">
                  {product.name}
                </h2>
                <div className="w-full">
                  <div className="flex strikeout-product">
                    <p className="text-blue-600 text-md my-2">
                      As low as<sup> *</sup>
                      <span className="text-3xl font-normal ml-1">
                        {salePrice[0]}
                      </span>
                    </p>
                    <aside className="flex flex-col justify-center ml-1">
                      <p className="text-blue-600 text-md leading-4">00</p>
                      <p className="text-sm leading-5 uppercase text-gray-500">
                        per week
                      </p>
                    </aside>
                  </div>
                  <p className="text-gray-500 text-xs">
                    Ships from:{" "}
                    <span className="font-semibold">
                      {product.inventories[0].vendor.name}
                    </span>
                  </p>
                  <p className="text-green-600 text-sm mt-3 font-semibold">
                    Store Pick Available
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button aria-label="Show next product" className="next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProductSwiper;
