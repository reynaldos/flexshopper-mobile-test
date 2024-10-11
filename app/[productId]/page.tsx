import React from "react";
import styles from "./product.module.css";
import Accordion from "@/components/Accordion";
import Image from "next/image";

// Main ProductPage Component
const ProductPage = ({}: { params: { productId: string } }) => {
  return (
    <div className="flex flex-col items-center justify-start bg-white font-sans max-w-md mx-auto pt-16">
      {/* Product Details Section */}
      <ProductDetails />

      {/* Accordion Section */}
      <section
        className={`${styles.detailsAccordion} bg-white w-full sm:shadow-md`}
      >
        <Accordion />
      </section>

      {/* Customers Also Viewed Section */}
      <CustomersAlsoViewed />
    </div>
  );
};

// ProductDetails Section
const ProductDetails = () => {
  return (
    <section className={`${styles.hero} p-6 w-full bg-gray-100 sm:shadow-md`}>
      <h1 className="text-xl font-bold text-center text-gray-900 mb-4 px-4">
        Microsoft - Xbox Series X 1TB Console - Carbon Black
      </h1>

      {/* Product Image and Stock Info */}
      <div className="bg-white p-4 pb-1 mb-3 rounded-sm shadow-sm">
        <Image
          className="w-48 h-48 object-cover m-auto" width={192} height={192}
          src={
            "https://images.flexshopper.xyz/800x800/product-beta-images/6b066782-7376-435a-9602-57688e7b855d.jpeg"
          }
          alt={"Xbox Series X"}
        />

        <span className="block mt-6 text-center text-green-600 font-bold mb-2">
          In Stock
        </span>

        {/* Pricing Section */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200">
            <span className="text-gray-500 text-sm">As Low as</span>
            <strong className="text-2xl text-gray-900">
              $21<sup>00</sup>
            </strong>
            <span className="text-gray-500 text-sm">Per Week</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border border-gray-200">
            <span className="text-gray-500 text-sm">As Low as</span>
            <strong className="text-2xl text-gray-900">
              $679<sup>99</sup>
            </strong>
          </button>
        </div>
      </div>

      {/* Unlock My Price Button */}
      <button className="w-full bg-orange-500 text-white font-semibold py-3 rounded-sm">
        Unlock My Price
      </button>
    </section>
  );
};

// CustomersAlsoViewed Section
const CustomersAlsoViewed = () => {
  return (
    <section
      className={`${styles.alsoViewedSwiper} p-6 w-full bg-gray-100 sm:shadow-md`}
    >
      <h1 className="text-xl font-bold text-center text-gray-900 mb-4 px-4">
        Customers Also Viewed
      </h1>
    </section>
  );
};

export default ProductPage;
