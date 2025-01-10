"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Navigation } from "swiper/modules";
import Image from "next/image";
import ProductSwiperSkeleton from "./loading";

import "./styles.css";
import { Product } from "@/types/v2";

const ProductSwiper = ({ productList }: { productList: Product[] | null }) => {
  const handleClick = (productId: string | number) => {
    window.location.href =
      `${process.env.NEXT_PUBLIC_BASE_URL}/${productId}` || "";
  };

  if (!productList || productList.length === 0) {
    return <ProductSwiperSkeleton />;
  }

  return (
    <div className="flex justify-between items-center gap-2">
      <button aria-label="Show previous product" className="prev-product">
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
        navigation={{ prevEl: ".prev-product", nextEl: ".next-product" }}
        loop
      >
        {productList.map((product) => {
          return (
            <SwiperSlide
              key={product.id}
              onClick={() => handleClick(product.id)}
            >
              <div className="h-full bg-white rounded-sm p-4 flex flex-col items-center border border-gray-200 pointer cursor-pointer">
                <Image
                  src={product.images[0] || "/placeholder.png"}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-contain mb-4 max-h-52 min-h-52"
                />
                <h2 className="text-md font-semibold text-center text-gray-800 leading-6 mb-2">
                  {product.name}
                </h2>
                <div className="w-full">
                  <div className="flex">
                    <p className="text-blue-600 text-md my-2">
                      As low as<sup> *</sup>
                      <span className="text-3xl font-normal ml-1">
                        ${product.sale_price.split(".")[0]}
                      </span>
                    </p>
                    <aside className="flex flex-col justify-center ml-0">
                      <p className="text-blue-600 text-md leading-4">
                        .{product.sale_price.split(".")[1]}
                      </p>
                      <p className="text-sm leading-5 uppercase text-gray-500 pl-4">
                        per week
                      </p>
                    </aside>
                  </div>
                  <p className="text-gray-500 text-xs">
                    Ships from:{" "}
                    <span className="font-semibold">{product.vendorName}</span>
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

      <button aria-label="Show next product" className="next-product">
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
