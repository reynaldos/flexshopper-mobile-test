"use client";

import React, { useEffect } from "react";
import LogRocket from "logrocket";
import { trackUniqueVisit } from "@/utils/functions";

const logRockID = process.env.NEXT_PUBLIC_ROCKET_LOG || "";

const LogRocketInit = () => {
  useEffect(() => {
    const userId = trackUniqueVisit();

    if (logRockID) {
      LogRocket.init(logRockID);
      LogRocket.identify(userId);
    }
  }, []);

  return <></>;
};

export default LogRocketInit;
