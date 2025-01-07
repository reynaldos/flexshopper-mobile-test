import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import LogRocketInit from "@/hooks/useLogRocket";
import PostHogInit from "@/hooks/usePostHog";
import UseTrafficSplitter from "@/hooks/useTrafficSplitter";
import { headers } from "next/headers";

import ClientScript from "@/components/ClientScript";

import { GoogleAnalytics } from "@next/third-parties/google";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID;

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
  const url =
    headersList.get("x-forwarded-url") || headersList.get("referer") || "";

  // Parse the URL to extract search parameters
  const urlParams = new URL(url, BASE_URL).searchParams;

  // noRedirect only true when users already passes through traffic splitter
  const noRedirect = urlParams.get("noRedirect") === "true";
  const noScript = urlParams.get("noScripts") === "true";

  return noRedirect ? (
    <>
      {GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />}

      <>
        {!noScript && (
          <ClientScript src="https://cmp.osano.com/AzywK3Ti3o6od5H43/1ea433bc-e651-48f0-b2dd-429bf80459bf/osano.js" />
        )}
      </>

      <PostHogInit>
        <LogRocketInit />
        <Navigation />
        {children}
        <Footer />

        {!noScript && (
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
      </PostHogInit>
    </>
  ) : (
    <UseTrafficSplitter productId={productId} />
  );
}
