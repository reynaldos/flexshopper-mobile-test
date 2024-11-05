"use client";

import Script, { ScriptProps } from "next/script";
import React from "react";

const ClientScript = (props: ScriptProps) => {
  return (
    <Script
      src={props.src}
      onLoad={() => {
        setTimeout(() => {
          const box = document.querySelector(
            ".osano-cm-dialog--type_bar.osano-cm-dialog--position_bottom"
          ) as HTMLElement;
          if(box){
            box.style.bottom = "unset";
            box.style.top = "0";
          }
        
        }, 300);
      }}
    />
  );
};

export default ClientScript;
