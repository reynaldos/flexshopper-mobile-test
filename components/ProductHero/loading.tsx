import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="bg-white p-4 pb-1 mb-3 rounded-sm shadow-sm animate-pulse">
      {/* Skeleton for Image Carousel */}
      <div className="flex items-center justify-center">
        <div className="w-64 h-64 bg-gray-300 rounded-lg" />
      </div>

      {/* Skeleton for Stock Info */}
      <span className="block mt-6 bg-gray-300 h-6 w-32 mx-auto rounded mb-2"></span>

      {/* Skeleton for Pricing Section */}
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex flex-col items-center justify-start p-4 border border-gray-200">
          <span className="text-gray-500 text-sm bg-gray-300 h-4 w-16 mb-2 rounded"></span>
          <strong className="text-3xl font-semibold bg-gray-300 h-8 w-20 rounded"></strong>
          <span className="text-gray-500 text-sm bg-gray-300 h-4 w-24 mt-2 rounded"></span>
        </div>
        <div className="flex flex-col items-center justify-start p-4 border border-gray-200">
          <span className="text-gray-500 text-sm bg-gray-300 h-4 w-16 mb-2 rounded"></span>
          <strong className="text-3xl font-semibold bg-gray-300 h-8 w-20 rounded"></strong>
        </div>
      </div>

      {/* Skeleton for Unlock My Price Button */}
      <div className="w-full bg-gray-300 h-12 rounded-sm mt-4"></div>
    </div>
  );
};

export default LoadingSkeleton;