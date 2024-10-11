"use client";

import React, { useState } from "react";

const Accordion = ({
  accordianItems = ["Overview", "Features", "Specs"],
}: {
  accordianItems?: string[];
}) => {
  // Initialize activeIndex to 0 to open the first item by default
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
            <span className="text-gray-900 font-light text-xl">
              {item}
            </span>{" "}
            {/* Lightweight & Larger Text */}
            <svg
              className={`w-6 h-6 transform transition-transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
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
          {activeIndex === index && (
            <div className="p-4 text-gray-700">
              <p>
                This is the content for {item}. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Porro dolore aliquam, pariatur nam nulla
                facere reiciendis, sapiente facilis in corrupti voluptate non
                quaerat corporis eius excepturi repellendus at itaque. Id.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
