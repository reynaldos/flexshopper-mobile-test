"use client";

import React from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init("phc_gpnlUl9LHAZCfqMYBPDJiUL5JGsz2QnALd5UKcmy201", {
    api_host: "https://us.i.posthog.com",
    person_profiles: "identified_only",
  });
}

const PostHogInit = ({ children }: { children: any }) => {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export default PostHogInit;
