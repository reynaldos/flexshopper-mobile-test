"use client";

import React, { useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Example: "https://m.flexshopper.com"
const flexshopperUrl = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL; // Example: "https://www.flexshopper.com"
import "./useTrafficSplitter.css";
import { saveToCookies } from "@/utils/functions";

// Define URL type with weight property
type RedirectUrl = {
  link: string;
  type: "widgets" | "no-widgets" | "legacy";
  weight: number;
};

export default function UseTrafficSplitter({
  productId,
}: {
  productId: string;
}): JSX.Element {
  useEffect(() => {
    const redirectLogic = async () => {
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

      saveToCookies("inboundUrl", window.location.href);

      // Define the URLs with dynamic UTM parameters and hardcoded utm_content values
      const urls: RedirectUrl[] = [
        {
          link: `${baseUrl}/${productId}?noRedirect=true&fbaid=${adId}&utm_source=${siteSourceName}&utm_medium=social&utm_campaign=${campaignName}&utm_term=${adsetName}&utm_content=AdJuiceMobile`,
          type: "widgets",
          weight: 0.4,
        },
        {
          link: `${baseUrl}/${productId}?noScripts=true&noRedirect=true&fbaid=${adId}&utm_source=${siteSourceName}&utm_medium=social&utm_campaign=${campaignName}&utm_term=${adsetName}&utm_content=AdJuiceMobileLite`,
          type: "no-widgets",
          weight: 0.4,
        },
        {
          link: `${flexshopperUrl}/product/${productId}?fbaid=${adId}&utm_source=${siteSourceName}&utm_medium=social&utm_campaign=${campaignName}&utm_term=${adsetName}&utm_content=AdJuiceMobileRedirect`,
          type: "legacy",
          weight: 0.2,
        },
      ];

      // Weighted random selection function
      const weightedRandomSelection = (items: RedirectUrl[]): RedirectUrl => {
        const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
        const randomValue = Math.random() * totalWeight;
        let cumulativeWeight = 0;

        for (const item of items) {
          cumulativeWeight += item.weight;
          if (randomValue < cumulativeWeight) {
            return item;
          }
        }

        return items[items.length - 1]; // Fallback to the last item
      };

      const selectedUrl = weightedRandomSelection(urls);

      console.log("Redirecting to:", selectedUrl);
      saveToCookies("redirectRoute", selectedUrl.type);

      // Log event when going off-site
      if (selectedUrl.type === "legacy") {
        await fetch("/api/v1/log-event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-auth-token":
              process.env.API_AUTH_TOKEN || "98BAF5FBCCBBD4F6",
          },
          body: JSON.stringify({
            eventType: "traffic",
            inboundUrl: window.location.href,
            redirectRoute: selectedUrl.type,
            productId,
          }),
        });
      }

      // Redirect with a slight delay for tracking if necessary
      setTimeout(() => {
        try {
          window.location.href = selectedUrl.link;
        } catch (error) {
          console.error("Failed to redirect:", error);
        }
      }, 200);
    };

    redirectLogic();
  }, [productId]);

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="rounded-full animate-spin"></div>
    </div>
  );
}
