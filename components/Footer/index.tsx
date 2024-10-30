import React from "react";
import { disclaimers, footerLinks, socialLinks } from "./footerLinks";

import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className="w-full bg-main700 p-6 py-12 flex flex-col items-center justify-between shadow-md  gap-8 max-w-md mx-auto text-white">
      {/* social links */}
      <div className="flex gap-4 justify-center footerSocialLinks">
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
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[#aaa] text-center text-sm px-3">
        {footerLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="hover:underline"
          >
            {link.title}
          </a>
        ))}
      </div>

      {/* copyright */}
      <p className="text-sm leading-4">
        ©2024 FlexShopper, LLC. All rights reserved.
      </p>

      {/* disclaimer text */}
      <div className="text-[10px] leading-4">
        {disclaimers.map((disclaimer, index) => (
          <p key={index} className="mt-4">
            <sup>{disclaimer.superscript}</sup> {disclaimer.content}
          </p>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
