"use client";

import Head from "next/head";
import { ProductInfo } from "@/types/index";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import LoadingSkeleton from "./loading";

import "./styles.css";
import { getCookie, sendEvent, trackUniqueVisit } from "@/utils/functions";

const FLEXSHOPPER_SIGNIN = process.env.NEXT_PUBLIC_FLEXSHOPPER_SIGNIN_URL;

const ProductHero = ({ product }: { product: ProductInfo | null }) => {
  const [productLoaded, setProductLoaded] = useState(false);

  useEffect(() => {
    const logEvent = async () => {
      if (product) {
        const userId = trackUniqueVisit();

        await fetch("/api/v1/log-event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-auth-token":
              process.env.API_AUTH_TOKEN || "98BAF5FBCCBBD4F6",
          },
          body: JSON.stringify({
            eventType: "traffic",
            inboundUrl: getCookie("inboundUrl"),
            redirectRoute: getCookie("redirectRoute"),
            productId: product.id,
            pseudoId: userId,
          }),
        });
      }
    };
    if (product) {
      logEvent();
      setTimeout(() => setProductLoaded(true), 100);
    }
  }, [product]);

  if (!product) {
    return <LoadingSkeleton />;
  }

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default button behavior

    // Fire the Google Analytics event
    sendEvent("Button", "UnlockButton_Clicked", "Unlock My Price");

    const userId = trackUniqueVisit();

    await fetch("/api/v1/log-event", {
      method: "POST",
      headers: {
        "x-api-auth-token": process.env.API_AUTH_TOKEN || "98BAF5FBCCBBD4F6",
      },
      body: JSON.stringify({
        eventType: "button_click",
        inboundUrl: getCookie("inboundUrl"),
        redirectRoute: getCookie("redirectRoute"),
        productId: product.id,
        pseudoId: userId,
      }),
    });

    // Navigate to the external link after a short delay
    setTimeout(() => {
      window.location.href = FLEXSHOPPER_SIGNIN || "";
    }, 300); // 300ms delay to ensure the event is sent
  };

  const { markedUpPrice, salePrice, inStock } = {
    markedUpPrice:
      (product.inventories[0]?.markedUpRetailPrice ||
        product.inventories[0]?.markedUpPrice ||
        product.inventories[0]?.itemCost) / 100,
    salePrice:
      ((product.inventories[0]?.markedUpRetailPrice ||
        product.inventories[0]?.markedUpPrice ||
        product.inventories[0]?.itemCost) /
        100 /
        52) *
      2,
    inStock: product.inventories[0]?.qty > 0,
  };

  return (
    <>
      <Head>
        {product && (
          <link
            rel="preload"
            as="image"
            href={product.images[0].source || "/placeholder.png"}
          />
        )}
      </Head>

      <div className="flex-shrink flex flex-col bg-white p-4 pb-1 mb-3 rounded-sm shadow-sm">
        <div className="flex-shrink flex items-center justify-center">
          {product.images.length > 1 && (
            <button
              aria-label="Show previous product"
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

          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation={{ prevEl: ".prev", nextEl: ".next" }}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className={`w-64  mx-auto transition-opacity duration-700 ${
              productLoaded ? "opacity-100" : "opacity-0"
            }`}
            loop
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image.source || "/placeholder.png"}
                  alt={product.name}
                  width={248}
                  height={248}
                  className="w-full h-full max-h-[35svh] object-contain object-center productImg"
                  loading="eager"
                  sizes="(max-width: 430px ) 248px, 248px"
                  priority={index === 0} // Preload the first image only
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {product.images.length > 1 && (
            <button
              aria-label="Show next product"
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
          className={`block text-center ${
            inStock ? "text-green-600" : "text-red-600"
          } font-bold mt-2 mb-1 transition-opacity duration-700 ${
            productLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>

        <div
          className={`grid grid-cols-2 gap-4 mb-3 transition-opacity duration-700 ${
            productLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={() => (window.location.href = FLEXSHOPPER_SIGNIN || "")}
            className="flex flex-col items-center justify-start p-4 border border-gray-200 bg-[var(--main100)]"
          >
            <span className="text-gray-500 text-sm">
              As Low as<sup>*</sup>
            </span>
            <strong
              className={`strikeout text-3xl font-semibold text-[var(--main500)]`}
            >
              ${salePrice.toFixed(2).split(".")[0]}
              <sup>.00</sup>
            </strong>
            <span className="text-gray-500 text-sm">Per Week</span>
          </button>

          <button
            onClick={() => (window.location.href = FLEXSHOPPER_SIGNIN || "")}
            className="flex flex-col items-center justify-start p-4 border border-gray-200 bg-[var(--main100)]"
          >
            <span className="text-gray-500 text-sm">Total Price</span>
            <strong
              className={`strikeout text-3xl font-semibold text-[var(--main500)]`}
            >
              ${markedUpPrice.toFixed(2).split(".")[0]}
              <sup>.{markedUpPrice.toFixed(2).split(".")[1]}</sup>
            </strong>
          </button>
        </div>
      </div>

      <button
        onClick={handleButtonClick}
        className="unlock-my-price w-full bg-[var(--accent400)] text-white font-semibold py-3 rounded-sm"
      >
        Unlock My Price
      </button>
    </>
  );
};

export default ProductHero;
