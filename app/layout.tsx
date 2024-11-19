import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";

import { headers } from "next/headers";

import "swiper/css";
import "swiper/css/navigation";

import { GoogleAnalytics } from "@next/third-parties/google";
import ClientScript from "@/components/ClientScript";

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
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Extract headers to access URL with query parameters
  const headersList = headers();
  const url =
    headersList.get("x-forwarded-url") || headersList.get("referer") || "";

  // Parse the URL to extract search parameters
  const urlParams = new URL(url, BASE_URL).searchParams;
  const noRedirect = urlParams.get("noRedirect") === "true";
  const noScript = urlParams.get("noScripts") === "true";

  return (
    <html lang="en">
      {GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />}

      {/* use client */}
      <>
        {!noScript && noRedirect && (
          <ClientScript src="https://cmp.osano.com/AzywK3Ti3o6od5H43/1ea433bc-e651-48f0-b2dd-429bf80459bf/osano.js" />
        )}
      </>

      <body className={openSans.className}>
        {children}

        {!noScript && noRedirect && (
          <script
            async={true}
            dangerouslySetInnerHTML={{
              __html: `(function(){ 
                var s = document.createElement('script'); 
                var h = document.querySelector('head') || document.body; 
                s.src = 'https://acsbapp.com/apps/app/dist/js/app.js'; 
                s.async = true; 
                s.onload = function() { 
                    acsbJS.init({ 
                        statementLink: '', 
                        footerHtml: '', 
                        hideMobile: false, 
                        hideTrigger: false, 
                        disableBgProcess: false, 
                        language: 'en', 
                        position: 'right', 
                        leadColor: '#146FF8', 
                        triggerColor: '#146FF8', 
                        triggerRadius: '50%', 
                        triggerPositionX: 'right', 
                        triggerPositionY: 'bottom', 
                        triggerIcon: 'people', 
                        triggerSize: 'bottom', 
                        triggerOffsetX: 20, 
                        triggerOffsetY: 20, 
                        mobile: { 
                            triggerSize: 'small', 
                            triggerPositionX: 'right', 
                            triggerPositionY: 'bottom', 
                            triggerOffsetX: 10, 
                            triggerOffsetY: 10, 
                            triggerRadius: '20' 
                        } 
                    }); 
                }; 
                h.appendChild(s); 
            })();`,
            }}
          />
        )}
      </body>
    </html>
  );
}
