"use client";

import React, { useEffect } from "react";
import LogRocket from "logrocket";
import { usePostHog } from "posthog-js/react";

const logRockID = process.env.NEXT_PUBLIC_ROCKET_LOG || "";

const LogRocketInit = () => {
  const posthog = usePostHog();

  useEffect(() => {
    const userId = posthog.get_distinct_id();

    if (logRockID) {
      LogRocket.init(logRockID);
      LogRocket.identify(userId);
    }
  }, []);

  return <></>;
};

export default LogRocketInit;
