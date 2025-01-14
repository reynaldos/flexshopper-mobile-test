"use client";

import React, { useEffect } from "react";
import "./useTrafficSplitter.css";
import { saveToCookies } from "@/utils/functions";
import { useFeatureFlagVariantKey, usePostHog } from "posthog-js/react";
import { fetchMockProductInfo } from "@/mock/mockAPI";
import { Product } from "@/types/v2";
import { notFound } from "next/navigation";

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
  const variant = useFeatureFlagVariantKey("redirect-toggle") || "error";

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
    return redirects[variant] || "redirectError";
  };

  async function fetchProduct(productId: string): Promise<Product> {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      return await fetchMockProductInfo();
    }

    const response = await fetch(`/api/v2/fetchProduct/${productId}`, {
      next: { revalidate: 300 }, // Caching for 5 minutes at the CDN level
      method: "GET",
      headers: {
        "x-api-auth-token": process.env.API_AUTH_TOKEN || "98BAF5FBCCBBD4F6",
      },
    });

    if (!response.ok) {
      notFound();
    }

    return response.json();
  }

  const buildRedirectUrl = async (
    route: RedirectUrl,
    productId: string,
    queryParams: URLSearchParams
  ): Promise<string> => {
    const adId = queryParams.get("fbaid") || "defaultAdId";
    const source = queryParams.get("utm_source") || "defaultSource";
    const campaign = queryParams.get("utm_campaign") || "defaultCampaign";
    const term = queryParams.get("utm_term") || "defaultAdset";

    const appendCampaignSuffix = (campaign: string, suffix: string) => {
      const withoutSuffix = campaign.replace(new RegExp(`${suffix}$`), ""); // Remove suffix only from the end
      return `${withoutSuffix}${suffix}`; // Append the suffix exactly once
    };

    let productData;
    if (route === "legacy") {
      productData = await fetchProduct(productId);
    }

    const urlTemplates = {
      widgets: `${BASE_URL}/${productId}?noRedirect=true&fbaid=${adId}&utm_source=${source}&utm_medium=social&utm_campaign=${appendCampaignSuffix(
        campaign,
        "-widgets"
      )}&utm_term=${term}&utm_content=AdJuiceMobile`,
      "no-widgets": `${BASE_URL}/${productId}?noScripts=true&noRedirect=true&fbaid=${adId}&utm_source=${source}&utm_medium=social&utm_campaign=${appendCampaignSuffix(
        campaign,
        "-no-widgets"
      )}&utm_term=${term}&utm_content=AdJuiceMobileLite`,
      legacy: `${productData?.link}?fbaid=${adId}&utm_source=${source}&utm_medium=social&utm_campaign=${campaign}&utm_term=${term}&utm_content=AdJuiceMobileRedirect`,
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
      const redirectUrl = await buildRedirectUrl(
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

    if (variant !== 'error' && productId) {
        console.log("variant", variant);
      redirectLogic(variantToRedirect(variant as string));
    }
  }, [variant, productId]);

  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="rounded-full animate-spin"></div>
    </div>
  );
}
