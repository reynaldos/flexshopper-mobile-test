"use client";

// ProductPage Component
import React, { useEffect, useState } from "react";
import styles from "./product.module.css";

import ProductHero from "@/components/ProductHero";
import DetailsAccordion from "@/components/DetailsAccordion";
import ProductSwiper from "@/components/ProductSwiper";
import Proposition65Modal from "@/components/Proposition65Modal";

import { fetchMockProductInfo } from "@/mock/mockAPI";
import { ProductInfo } from "@/types/index";

const ProductPage = ({ params }: { params: { productId: string } }) => {
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const { productId } = params;
  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/v1/fetchProduct/${productId}`);
        if (!response.ok) {
          setError(true);
          throw new Error("Failed to fetch product");
        }

        // const data = await fetchMockProductInfo(Number(productId));

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


  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-white font-sans max-w-md mx-auto pt-14">
        Error....
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-white font-sans max-w-md mx-auto pt-14">
        Loading....
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-start bg-white font-sans max-w-md mx-auto pt-14">
        {/* Product Details Section */}
        <section className={`${styles.hero} p-6 w-full bg-gray-100 shadow-md`}>
          <h1 className="text-xl font-bold text-center text-gray-900 mb-4 px-4">
            {product.name}
          </h1>

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

          <ProductSwiper />
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
