"use client";

import React, { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const flexshopperUrl = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL;

export default function UseTrafficSplitter({
  productId,
}: {
  productId: string;
}) {
  useEffect(() => {
    const urls = [
      `${baseUrl}/${productId}?noRedirect=true`,
      `${baseUrl}/${productId}?noScripts=true&noRedirect=true`,
      `${flexshopperUrl}/product/${productId}`,
    ];

    // Fisher-Yates Shuffle for unbiased random selection
    const shuffledUrls = [...urls];
    for (let i = shuffledUrls.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledUrls[i], shuffledUrls[randomIndex]] = [
        shuffledUrls[randomIndex],
        shuffledUrls[i],
      ];
    }

    // Pick the first URL from the shuffled list
    const selectedUrl = shuffledUrls[0];

    // Log for debugging
    console.log("Redirecting to:", selectedUrl);

    // Redirect
    window.location.href = selectedUrl;
  }, [productId]);

  return <></>;
}