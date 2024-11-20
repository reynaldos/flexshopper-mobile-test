"use client";

import React, { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Example: "https://m.flexshopper.com"
const flexshopperUrl = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL; // Example: "https://www.flexshopper.com"

export default function UseTrafficSplitter({
  productId,
}: {
  productId: string;
}) {
  useEffect(() => {
    if (!productId || !baseUrl || !flexshopperUrl) {
      console.error("Missing required parameters or environment variables.");
      return;
    }

    // Extract query parameters from the current URL
    const queryParams = new URLSearchParams(window.location.search);

    // Get dynamic values from the query parameters
    const adId = queryParams.get("fbaid") || "defaultAdId";
    const siteSourceName = queryParams.get("utm_source") || "defaultSource";
    const campaignName = queryParams.get("utm_campaign") || "defaultCampaign";
    const adsetName = queryParams.get("utm_term") || "defaultAdset";

    // Define the URLs with dynamic UTM parameters and hardcoded utm_content values
    const urls = [
      // Product page with scripts
      `${baseUrl}/${productId}?noRedirect=true&fbaid=${adId}&utm_source=${siteSourceName}&utm_medium=social&utm_campaign=${campaignName}&utm_term=${adsetName}&utm_content=AdJuiceMobile`,
      // Product page without scripts
      `${baseUrl}/${productId}?noScripts=true&noRedirect=true&fbaid=${adId}&utm_source=${siteSourceName}&utm_medium=social&utm_campaign=${campaignName}&utm_term=${adsetName}&utm_content=AdJuiceMobileLite`,
      // Legacy product page
      `${flexshopperUrl}/${productId}?fbaid=${adId}&utm_source=${siteSourceName}&utm_medium=social&utm_campaign=${campaignName}&utm_term=${adsetName}&utm_content=AdJuiceMobileRedirect`,
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

    // Select the first URL
    const selectedUrl = shuffledUrls[0];

    console.log("Redirecting to:", selectedUrl);

    // Redirect with a slight delay for tracking if necessary
    setTimeout(() => {
      try {
        window.location.href = selectedUrl;
      } catch (error) {
        console.error("Failed to redirect:", error);
      }
    }, 200);
  }, [productId]);

  return <div>Redirecting, please wait...</div>;
}
