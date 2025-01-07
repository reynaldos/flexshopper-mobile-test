"use client";

import React, { useEffect } from "react";
import "./useTrafficSplitter.css";
import { saveToCookies } from "@/utils/functions";
import { useFeatureFlagVariantKey, usePostHog } from "posthog-js/react";

// Types
type RedirectUrl = "widgets" | "no-widgets" | "legacy";

// Environment Variables
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://m.flexshopper.com";
const FLEXSHOPPER_URL =
  process.env.NEXT_PUBLIC_FLEXSHOPPER_URL || "https://www.flexshopper.com";
const API_AUTH_TOKEN = process.env.API_AUTH_TOKEN || "98BAF5FBCCBBD4F6";

export default function UseTrafficSplitter({
  productId,
}: {
  productId: string;
}): JSX.Element {
  const posthog = usePostHog();
  const variant = useFeatureFlagVariantKey("redirect-toggle") || "no-widgets";

  if (process.env.NEXT_PUBLIC_ENV === "dev") {
    posthog.featureFlags.override({ "redirect-toggle": "no-widgets" });
  }

  const variantToRedirect = (variant: string): RedirectUrl => {
    const redirects: { [key: string]: RedirectUrl } = {
      control: "widgets",
      "no-widgets": "no-widgets",
      legacy: "legacy",
      widgets: "widgets",
    };
    return redirects[variant] || "no-widgets";
  };

  const buildRedirectUrl = (
    route: RedirectUrl,
    productId: string,
    queryParams: URLSearchParams
  ): string => {
    const adId = queryParams.get("fbaid") || "defaultAdId";
    const source = queryParams.get("utm_source") || "defaultSource";
    const campaign = queryParams.get("utm_campaign") || "defaultCampaign";
    const term = queryParams.get("utm_term") || "defaultAdset";

    const appendCampaignSuffix = (campaign:string, suffix:string) =>
    campaign.includes(suffix) ? campaign : `${campaign}${suffix}`;

    const urlTemplates = {
      widgets: `${BASE_URL}/${productId}?noRedirect=true&fbaid=${adId}&utm_source=${source}&utm_medium=social&utm_campaign=${appendCampaignSuffix(
        campaign,
        "-widgets"
      )}&utm_term=${term}&utm_content=AdJuiceMobile`,
      "no-widgets": `${BASE_URL}/${productId}?noScripts=true&noRedirect=true&fbaid=${adId}&utm_source=${source}&utm_medium=social&utm_campaign=${appendCampaignSuffix(
        campaign,
        "-no-widgets"
      )}&utm_term=${term}&utm_content=AdJuiceMobileLite`,
      legacy: `${FLEXSHOPPER_URL}/product/${productId}?fbaid=${adId}&utm_source=${source}&utm_medium=social&utm_campaign=${campaign}&utm_term=${term}&utm_content=AdJuiceMobileRedirect`,
    };

    return urlTemplates[route];
  };

  useEffect(() => {
    const redirectLogic = async (redirectRoute: RedirectUrl) => {
      if (!productId || !BASE_URL || !FLEXSHOPPER_URL) {
        console.error("Missing required parameters or environment variables.");
        return;
      }

      const queryParams = new URLSearchParams(window.location.search);
      const redirectUrl = buildRedirectUrl(
        redirectRoute,
        productId,
        queryParams
      );

      console.log("Redirecting to:", redirectUrl);
      saveToCookies("redirectRoute", redirectRoute);
      saveToCookies("inboundUrl", window.location.href);

      const userId = posthog.get_distinct_id();

      if (redirectRoute === "legacy") {
        posthog.capture("$pageleave");
        try {
          await fetch("/api/v1/log-event", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-auth-token": API_AUTH_TOKEN,
            },
            body: JSON.stringify({
              eventType: "traffic",
              inboundUrl: window.location.href,
              redirectRoute,
              productId,
              pseudoId: userId,
            }),
          });
        } catch (error) {
          console.error("Error logging event:", error);
        }
      }

      setTimeout(() => {
        try {
          window.location.href = redirectUrl;
        } catch (error) {
          console.error("Failed to redirect:", error);
        }
      }, 300);
    };

    if (variant && productId) {
      redirectLogic(variantToRedirect(variant as string));
    }
  }, [variant, productId]);

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="rounded-full animate-spin"></div>
    </div>
  );
}
