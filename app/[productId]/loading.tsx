// app/products/[productId]/page.tsx

import dynamic from "next/dynamic";

const ProductHero = dynamic(() => import("@/components/ProductHero"));
const DetailsAccordion = dynamic(() => import("@/components/DetailsAccordion"));
const ProductSwiper = dynamic(() => import("@/components/ProductSwiper"));

export default function Loading() {

  return (
    <div className="flex flex-col items-center justify-start bg-white font-sans max-w-md mx-auto pt-14">
      <section className="p-6 w-full bg-gray-100 shadow-md">
      <div className="w-1/2 h-8 bg-gray-300 rounded mx-auto mb-4 animate-pulse"></div>
        <ProductHero product={null} />
      </section>

      <section className="bg-white w-full shadow-md">
        <DetailsAccordion product={null} />
      </section>

      <section className="p-6 w-full bg-gray-100 shadow-md">
        <h1 className="text-xl font-bold text-center text-gray-900 mb-4 px-4">
          Customers Also Viewed
        </h1>
        <ProductSwiper productList={null} />
      </section>
    </div>
    // <></>
  );
}