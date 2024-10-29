import { ProductInfo } from "@/types/index";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const FLEXSHOPPER_SIGNIN = process.env.NEXT_PUBLIC_FLEXSHOPPER_SIGNIN_URL;

const ProductHero = ({ product }: { product: ProductInfo }) => {
  const salePrice = ((product.inventories[0]?.salePrice / 100 / 52) * 2)
    .toFixed(2)
    .split(".");

  const markedUpPrice = (
    (product.inventories[0]?.markedUpPrice ||
      product.inventories[0]?.markedUpRetailPrice) / 100
  )
    .toFixed(2)
    .split(".");

  const inStock = product.inventories[0]?.qty > 0;

  return (
    <>
      {/* Product Image and Stock Info */}
      <div className="bg-white p-4 pb-1 mb-3 rounded-sm shadow-sm">
        <div className="flex items-center justify-center">
          {product.images.length > 1 && (
            <button
              aria-label={`Show previous product`}
              className="prev"
              style={{ backgroundColor: "white" }}
            >
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
          )}

          {/* Swiper for Product Images */}
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation={{
              prevEl: ".prev",
              nextEl: ".next",
            }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="w-64 h-64 mx-auto mb-6"
            loop={true}
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image.source || "/placeholder.png"}
                  alt={product.name}
                  width={256}
                  height={256}
                  className="w-full h-full object-contain"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {product.images.length > 1 && (
            <button
              aria-label={`Show next product`}
              className="next"
              style={{ backgroundColor: "white" }}
            >
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
          )}
        </div>
        <span
          className={`block mt-6 text-center ${
            inStock ? "text-green-600" : "text-red-600"
          } font-bold mb-2`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>

        {/* Pricing Section */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          {/* weekly price */}
            <button className="flex flex-col items-center justify-start p-4 border border-gray-200">
              <span className="text-gray-500 text-sm">As Low as<sup> 9</sup></span>
              <strong className="text-3xl font-semibold text-gray-900">
                ${salePrice[0]}
                <sup>00</sup>
              </strong>

              <span className="text-gray-500 text-sm">Per Week</span>
            </button>

          {/* total price */}
            <button className="flex flex-col items-center justify-start p-4 border border-gray-200">
              <span className="text-gray-500 text-sm">As Low as<sup> 9</sup></span>
              <strong className="text-3xl font-semibold text-gray-900">
                ${markedUpPrice[0]}
                <sup>{markedUpPrice[1]}</sup>
              </strong>
            </button>
        </div>
      </div>

      {/* Unlock My Price Button */}
      <a href={FLEXSHOPPER_SIGNIN}>
        <button className="w-full bg-[var(--accent400)] text-white font-semibold py-3 rounded-sm">
          Unlock My Price
        </button>
      </a>
    </>
  );
};

export default ProductHero;
