import React from "react";

const DetailsAccordionSkeleton = ({
  accordianItems = ["Overview", "Features", "Specs"],
}: {
  accordianItems?: string[];
}) => {
  return (
    <div className="space-y-4 w-full max-w-lg mx-auto animate-pulse">
      {accordianItems.map((item, index) => (
        <div key={index} className="border-b border-gray-200">
          {/* Accordion Button Skeleton */}
          <button className="w-full flex justify-between items-center p-4">
            <span className="bg-gray-300 rounded h-6 w-32"></span>
            <span className="w-6 h-6 bg-gray-300 rounded-full"></span>
          </button>

          {/* Accordion Content Skeleton */}
          <div className="overflow-hidden max-h-0 opacity-0 transition-[max-height] duration-500 ease-in-out">
            <div className="p-4">
              {index === 0 && (
                <div className="w-48 h-48 bg-gray-300 rounded m-auto mb-8"></div>
              )}
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-300 rounded"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailsAccordionSkeleton;