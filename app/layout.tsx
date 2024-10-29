import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import { GoogleTagManager } from "@next/third-parties/google";

const openSans = localFont({
  src: [
    {
      path: "/fonts/OpenSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/OpenSans-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/OpenSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/OpenSans-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/OpenSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "/fonts/OpenSans-Italic.woff",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlexShopper Lease-to-Own | Top Brands & Retailers",
  description:
    "FlexShopper provides a flexible and easy way for you to lease-to-own the furniture, electronics, appliances and other popular brand name goods with affordable, weekly payments.",
  keywords:
    "flexshopper, rent to own, lease to own, weekly payments, rent, used, new, special offers, deals",
  icons: [
    { rel: "icon", url: "https://www.flexshopper.com/img/favicon.ico" },
    {
      rel: "shortcut icon",
      url: "https://www.flexshopper.com/img/favicon.ico",
    },
  ],
  openGraph: {
    type: "website",
    siteName: "FlexShopper",
    title: "FlexShopper Lease-to-Own | Top Brands & Retailers",
    description:
      "FlexShopper provides a flexible and easy way for you to lease-to-own the furniture, electronics, appliances and other popular brand name goods with affordable, weekly payments.",
    url: "https://m.flexshopper.com/",
    images: [
      {
        url: "https://cdn.flexshopper.com/marketing-images/home/rfk/OG-Tag-FlexShopper-Marketplace.jpg",
        width: 1200,
        height: 630,
        alt: "FlexShopper Image",
      },
    ],
  },
};

const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {GOOGLE_ANALYTICS_ID && <GoogleTagManager gtmId={GOOGLE_ANALYTICS_ID} />}
      <body className={openSans.className}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
