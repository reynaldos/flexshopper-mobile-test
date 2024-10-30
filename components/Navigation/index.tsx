import Image from "next/image";
import React from "react";
import styles from "./Navigation.module.css";

const FLEXSHOPPER_URL = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL;

const Navigation = () => {
  return (
    <nav
      className={`${styles.nav} fixed top-0 left-1/2 -translate-x-1/2 w-full bg-main500 p-4 py-2 flex items-center justify-between shadow-md max-w-md mx-auto z-50`}
    >
      {/* Hamburger Menu */}
      <a href={FLEXSHOPPER_URL} className="h-8 w-8 flex justify-center">
        <button className="text-white font-semibold text-lg focus:outline-none">
          <img
            src="/icons/menu.svg"
            alt="Menu"
            className="h-8 w-8 text-white"
          />
        </button>
      </a>

      {/* Logo */}
      <a href={FLEXSHOPPER_URL}>
        <div className="flex-grow flex justify-center">
          <Image
            src={"/logo.svg"}
            alt={"FlexShopper Logo"}
            width={200}
            height={60}
          />
        </div>
      </a>

      {/* Search Button */}
      <a href={FLEXSHOPPER_URL} className="h-8 w-8 flex justify-center">
        <button className="text-white font-semibold text-lg focus:outline-none">
          <img
            src="/icons/search.svg"
            alt="Search"
            className="h-8 w-8  text-white"
          />
        </button>
      </a>
    </nav>
  );
};

export default Navigation;
