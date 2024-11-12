import UseTrafficSplitter from "@/hooks/useTrafficSplitter";
import { headers } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function ProducPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const { productId } = params;

  // Extract headers to access URL with query parameters
  const headersList = headers();
  const url = headersList.get("x-forwarded-url") || headersList.get("referer") || "";

  // Parse the URL to extract search parameters
  const urlParams = new URL(url, baseUrl).searchParams;
  const noRedirect = urlParams.get("noRedirect") === "true";

  return noRedirect ? (
    <>{children}</>
  ) : (
    <UseTrafficSplitter productId={productId}>{children}</UseTrafficSplitter>
  );
}