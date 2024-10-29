import React from "react";

const ProductSwiperSkeleton = () => {
  return (
    <div className="flex justify-between items-center gap-2 animate-pulse">
      {/* Previous button skeleton */}
      <button aria-label={`Show previous product`} className="prev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Skeleton for Swiper slides */}
      <div className="rounded-sm bg-white p-4 flex flex-col items-center border border-gray-200 w-full max-w-[200px] mx-auto">
        <div className="w-[150px] h-[150px] bg-gray-300 rounded mb-4"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded mb-4"></div>
        <div className="flex justify-center w-full gap-1 mb-2">
          <div className="w-8 h-4 bg-gray-300 rounded"></div>
          <div className="w-12 h-6 bg-gray-300 rounded"></div>
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-full h-4 bg-gray-300 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded mt-3"></div>
      </div>

      {/* Next button skeleton */}
      <button aria-label={`Show next product`} className="next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-300"
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

export default ProductSwiperSkeleton;