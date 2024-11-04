"use client";

import React, { useEffect, useState } from "react";
import { disclaimers, footerLinks, socialLinks } from "./footerLinks";
import Image from "next/image";

import styles from "./footer.module.css";

const FLEXSHOPPER_URL = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL;

const Footer = () => {
  const [activeSection, setActiveSection] = useState("flexShopper");

  const toggleSection = (section: any) => {
    setActiveSection(activeSection === section ? null : section);
  };


  return (
    <footer className="w-full bg-main700 p-6 py-12 flex flex-col items-start gap-4 justify-between shadow-md max-w-md mx-auto text-white">
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

      {/* social links */}
      <div className="flex gap-3 justify-center footerSocialLinks">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            title={link.title}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            {link.icon}
          </a>
        ))}
      </div>

      {/* page links */}
      <div className="py-4 w-full">
        {Object.entries(footerLinks).map(([section, links], index) => (
          <div key={section} className="mb-4">
            {index > 0 && <hr className="w-100 mb-2" />}
            <button
              onClick={() => toggleSection(section)}
              className="text-xl text-left font-medium focus:outline-none w-full "
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>

            <div
              className={`transition-all ${
                activeSection === section ? "block" : "hidden"
              }`}
            >
              <ul className="mt-2 text-xs font-light space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* copyright */}
      <p className="text-xs leading-4 ">
        ©{new Date().getFullYear()} FlexShopper, LLC. All rights reserved.
      </p>

      {/* disclaimer text */}
      <div className="text-[10px] leading-4">
        {disclaimers.map((disclaimer, index) => (
          <p key={index} className="mb-4">
            <sup>{disclaimer.superscript}</sup> {disclaimer.content}
          </p>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
