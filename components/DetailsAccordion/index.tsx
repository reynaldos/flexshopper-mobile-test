"use client";

import { ProductInfo } from "@/types/index";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { cleanUpFeatures } from "@/utils/strings";
import styles from "./DetailsAccordion.module.css";

const DetailsAccordion = ({
  product,
  accordianItems = ["Overview", "Features", "Specs"],
  openModal,
}: {
  product: ProductInfo | null;
  accordianItems?: string[];
  openModal: () => void;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Helper function to get content for each accordion item
  const getContent = (item: string) => {
    switch (item) {
      case "Overview":
        return `<p>${product?.description}</p>`;
      case "Features":
        return cleanUpFeatures(product?.features || "");
      case "Specs":
        return product?.specs || "";
      default:
        return "Content not available";
    }
  };

  // Attach event listener to the "Click here" link inside the specs content
  useEffect(() => {
    const prop65Link = contentRef.current?.querySelector(".js-prop65PageBtn");

    // Define a click handler for the link
    const handleClick = (e: Event) => {
      e.preventDefault();
      openModal();
    };

    // Attach the event listener if the link exists
    if (prop65Link) {
      prop65Link.classList.add(
        "no-underline",
        "hover:underline",
        "text-blue-600"
      );
      prop65Link.addEventListener("click", handleClick);
    }

    // Clean up the event listener on component unmount or when dependencies change
    return () => {
      if (prop65Link) {
        prop65Link.removeEventListener("click", handleClick);
      }
    };
  }, [product, activeIndex, openModal]);

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      {accordianItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="w-full flex justify-between items-center p-4"
            onClick={() => toggleAccordion(index)}
          >
            <span className="text-gray-900 font-medium text-xl">{item}</span>
            <svg
              className={`w-6 h-6 p-1 transform transition-transform duration-300 rounded-full bg-[var(--main100)]
                ${activeIndex !== index ? "rotate-180" : ""}
              `}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7-7 7 7"
              ></path>
            </svg>
          </button>

          <div
            ref={contentRef}
            className={`${
              styles.tabContent
            } overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              activeIndex === index
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
            style={{ transitionProperty: "max-height, opacity" }}
          >
            <div className="p-4 text-gray-700">
              {index === 0 && product && (
                <Image
                  className="w-48 h-48 object-contain m-auto mb-8"
                  width={192}
                  height={192}
                  src={product.images[0]?.source || "/placeholder.png"}
                  alt={product.name}
                />
              )}
              {/* Render the content dynamically */}
              <div
                dangerouslySetInnerHTML={{
                  __html: getContent(item),
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsAccordion;
