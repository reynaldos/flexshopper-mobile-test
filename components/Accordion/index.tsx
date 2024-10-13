"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";

const Accordion = ({
  accordianItems = ["Overview", "Features", "Specs"],
}: {
  accordianItems?: string[];
}) => {
  // Initialize activeIndex to 0 to open the first item by default
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="space-y-4 w-full max-w-lg mx-auto">
      {/* Accordion Items */}
      {accordianItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          <button
            className="w-full flex justify-between items-center p-4"
            onClick={() => toggleAccordion(index)}
          >
            {/* Accordion Header Text */}
            <span className="text-gray-900 font-medium text-xl">
              {item}
            </span>
            {/* Chevron Icon */}
            <svg
              className={`w-6 h-6 p-1 transform transition-transform duration-300 rounded-full bg-[var(--main100)]
                ${activeIndex === index ? "rotate-180" : ""}
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

          {/* Animated Accordion Content */}
          <div
            ref={contentRef}
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              activeIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ transitionProperty: "max-height, opacity" }} // Adding opacity and max-height transitions
          >
            <div className="p-4 text-gray-700">
              <Image
                className="w-48 h-48 object-cover m-auto mb-8"
                width={192}
                height={192}
                src={
                  "https://images.flexshopper.xyz/800x800/product-beta-images/6b066782-7376-435a-9602-57688e7b855d.jpeg"
                }
                alt={"Xbox Series X"}
              />
              <p className="leading-5">
                This is the content for {item}. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Porro dolore aliquam, pariatur nam
                nulla facere reiciendis, sapiente facilis in corrupti voluptate
                non quaerat corporis eius excepturi repellendus at itaque. Id.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;