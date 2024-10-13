"use client";

// CustomersAlsoViewed.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  store: string;
  increment: string;
}

const products: Product[] = [
  {
    id: 1,
    image:
      "https://images.flexshopper.xyz/800x800/product-beta-images/9737dec5-0a3b-4889-b7fa-f7de4fccc4e3.jpeg", // Replace with your image URLs
    name: 'HP - 17.3" Full HD Laptop - Intel Core i3 - 8GB Memory - 256GB SSD - Natural Silver',
    price: "$15.00",
    increment: "week",
    store: "Best Buy",
  },
  {
    id: 2,
    image:
      "https://images.flexshopper.xyz/800x800/product-beta-images/9737dec5-0a3b-4889-b7fa-f7de4fccc4e3.jpeg", // Replace with your image URLs
    name: 'HP - 17.3" Full HD Laptop - Intel Core i3 - ',
    price: "$15.00",
    increment: "week",
    store: "Best Buy",
  },
  // Add more products as needed
];

const ProductSwiper = () => {
  return (
    <div className="flex justify-between items-center gap-2">
      <button aria-label={`Show previous product`} className="prev">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <Swiper
        className="rounded-sm"
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation, Mousewheel, Autoplay]}
        lazyPreloadPrevNext={1}
        mousewheel={{
          forceToAxis: true,
        }}
        navigation={{
          prevEl: ".prev",
          nextEl: ".next",
        }}
        loop={true}
      >
        {products.map((product) => {
          const dollarAmt = product.price.split(".")[0];
          const centAmt = product.price.split(".")[1];

          return (
            <SwiperSlide key={product.id}>
              <div className="h-full bg-white rounded-sm p-4 flex flex-col items-center border border-gray-200">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-cover mb-4"
                />
                <h2
                  className="text-md font-semibold text-center text-gray-800 leading-6 mb-2"
                >
                  {product.name}
                </h2>

                <div className="w-full ">
                  <div className="flex">
                    <p className="text-blue-600 text-md my-2">
                      As low as<sup> 9</sup>{" "}
                      <span className="text-3xl font-normal">{dollarAmt}</span>
                    </p>
                    <aside className="flex flex-col justify-center ml-1">
                      <p className="text-blue-600 text-md leading-4">
                        {centAmt}
                      </p>
                      <p className="text-sm leading-5 uppercase text-gray-500">
                        per {product.increment}
                      </p>
                    </aside>
                  </div>
                  <p className="text-gray-500 text-xs">
                    Ships from:{" "}
                    <span className="font-semibold">{product.store} </span>
                  </p>
                  <p className="text-green-600 text-sm mt-3 font-semibold">
                    Store Pick Available
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <button aria-label={`Show next product`} className="next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 text-gray-500"
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

export default ProductSwiper;
