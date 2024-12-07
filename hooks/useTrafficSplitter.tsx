"use client";

import React, { useCallback, useEffect, useState } from "react";

import "./useTrafficSplitter.css";
import { saveToCookies } from "@/utils/functions";
import { useFeatureFlagVariantKey, usePostHog } from "posthog-js/react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // Example: "https://m.flexshopper.com"
const flexshopperUrl = process.env.NEXT_PUBLIC_FLEXSHOPPER_URL; // Example: "https://www.flexshopper.com"

// Define URL type with weight property
type RedirectUrl = "widgets" | "no-widgets" | "legacy";

export default function UseTrafficSplitter({
  productId,
}: {
  productId: string;
}): JSX.Element {
  const posthog = usePostHog();

  const varient = useFeatureFlagVariantKey("redirect-toggle");

  if (process.env.NEXT_PUBLIC_ENV === "dev") {
    posthog.featureFlags.override({ "redirect-toggle": "no-widgets" }); // test
  }

  const varientToRedirect = (varient: any) => {
    switch (varient) {
      case "control":
        return "widgets";
      case "no-widgets":
        return "no-widgets";
      case "legacy":
        return "legacy";
      case "widgets":
        return "widgets";
      default:
        return "no-widgets";
    }
  };

  useEffect(() => {
    const redirectLogic = async (redirectRoute: RedirectUrl) => {
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
      const urls = {
        widgets: `${baseUrl}/${productId}?noRedirect=true&fbaid=${adId}&utm_source=${siteSourceName}&utm_medium=social&utm_campaign=${campaignName}&utm_term=${adsetName}&utm_content=AdJuiceMobile`,
        "no-widgets": `${baseUrl}/${productId}?noScripts=true&noRedirect=true&fbaid=${adId}&utm_source=${siteSourceName}&utm_medium=social&utm_campaign=${campaignName}&utm_term=${adsetName}&utm_content=AdJuiceMobileLite`,
        legacy: `${flexshopperUrl}/product/${productId}?fbaid=${adId}&utm_source=${siteSourceName}&utm_medium=social&utm_campaign=${campaignName}&utm_term=${adsetName}&utm_content=AdJuiceMobileRedirect`,
      };

      const selectedUrl = urls[redirectRoute];

      console.log("Redirecting to:", selectedUrl);
      saveToCookies("redirectRoute", redirectRoute);

      const userId = posthog.get_distinct_id();

      // Log event when going off-site
      if (redirectRoute === "legacy") {
        posthog.capture("$pageleave");

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
            redirectRoute: redirectRoute,
            productId,
            pseudoId: userId,
          }),
        });
      }

      // Redirect with a slight delay for tracking if necessary
      setTimeout(() => {
        try {
          window.location.href = selectedUrl;
        } catch (error) {
          console.error("Failed to redirect:", error);
        }
      }, 300);
    };

    if (varient && productId) {
      posthog.capture("$pageview");

      redirectLogic(varientToRedirect(varient));
    }
  }, [varient, productId]);

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="rounded-full animate-spin"></div>
    </div>
  );
}
