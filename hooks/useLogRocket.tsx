"use client"

import React, { useEffect } from 'react';
import LogRocket from 'logrocket';

const logRockID = process.env.NEXT_PUBLIC_ROCKET_LOG || "";

const LogRocketInit = () => {

    useEffect(() => {
      if(logRockID)
        LogRocket.init(logRockID);
    }, [])
    
  return (
    <></>
  )
}

export default LogRocketInit