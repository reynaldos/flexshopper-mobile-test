"use client";

import React, { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const flexshopperUrl = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL;

export default function UseTrafficSplitter({
  children,
  productId,
}: {
  productId: string;
  children: React.ReactNode;
}) {

  useEffect(() => {
    const urls = [
      `${baseUrl}/${productId}?noRedirect=true`,
      `${baseUrl}/${productId}?noScripts=true&noRedirect=true`,
      `${flexshopperUrl}/product/${productId}`,
    ];

    const randomIndex = Math.floor(Math.random() * urls.length);
    const selectedUrl = urls[randomIndex];

    window.location.href = selectedUrl;
  }, [productId]);

  return <>{children}</>;
}
