"use client";

// ProductPage Component
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styles from "./product.module.css";

import ProductHero from "@/components/ProductHero";
import Proposition65Modal from "@/components/Proposition65Modal";
import { fetchMockProductInfo } from "@/mock/mockAPI";
import { ProductInfo } from "@/types/index";

// Dynamically import components for better performance
const DetailsAccordion = dynamic(() => import("@/components/DetailsAccordion"));
const ProductSwiper = dynamic(() => import("@/components/ProductSwiper"));

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const { productId } = params;
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
          const data = await fetchMockProductInfo();
          setProduct(data);
          return;
        }

        const response = await fetch(`/api/v1/fetchProduct/${productId}`, {
          next: { revalidate: 300 },
        });
        if (!response.ok) {
          setError(true);
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (showModal) {
      // Add class to body to prevent scrolling
      document.body.classList.add("overflow-hidden");
    } else {
      // Remove class when modal is closed
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove the class if the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showModal]);

  useEffect(() => {
    const FLEXSHOPPER_URL = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL || "";

    if (error) {
      setTimeout(() => {
        window.location.href = FLEXSHOPPER_URL;
      }, 500); // Slightly longer delay for smoother experience
    }
  }, [error]);

  return (
    <>
      <div className="flex flex-col items-center justify-start bg-white font-sans max-w-md mx-auto pt-10">
        {/* Product Details Section */}
        <section className={`${styles.hero} p-6 w-full bg-gray-100 shadow-md`}>
          {product ? (
            <h1 className="text-xl font-bold text-center text-gray-900 mb-4 px-4">
              {product.name}
            </h1>
          ) : (
            <div className="w-1/2 h-8 bg-gray-300 rounded mx-auto mb-4 animate-pulse"></div>
          )}

          <ProductHero product={product} />
        </section>

        {/* Accordion Section */}
        <section
          className={`${styles.detailsAccordion} bg-white w-full shadow-md`}
        >
          <DetailsAccordion
            product={product}
            openModal={() => {
              setShowModal(true);
            }}
          />
        </section>

        {/* Customers Also Viewed Section */}
        <section
          className={`${styles.alsoViewedSwiper} p-6 w-full bg-gray-100 shadow-md`}
        >
          <h1 className="text-xl font-bold text-center text-gray-900 mb-4 px-4">
            Customers Also Viewed
          </h1>

          {product && <ProductSwiper product={product} />}
        </section>
      </div>

      {showModal && (
        <Proposition65Modal
          closeModal={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default ProductPage;
