import Image from "next/image";
import React from "react";
import styles from "./Navigation.module.css"

const Navigation = () => {
  return (
    <nav className={`${styles.nav} fixed top-0 left-1/2 -translate-x-1/2 w-full bg-main500 p-4 flex items-center justify-between shadow-md max-w-md mx-auto z-50`}>
      {/* Hamburger Menu */}
      <button className="text-white font-semibold text-lg focus:outline-none">
        <img src="/icons/menu.svg" alt="Menu" className="h-6 w-6 text-white" />
      </button>

      {/* Logo */}
      <div className="flex-grow flex justify-center">
        <Image
          src={"/logo.svg"}
          alt={"FlexShopper Logo"}
          width={200}
          height={60}
        />
      </div>

      {/* Search Button */}
      <button className="text-white font-semibold text-lg focus:outline-none">
        <img src="/icons/search.svg" alt="Search" className="h-6 w-6 text-white" />
      </button>
    </nav>
  );
};

export default Navigation;
