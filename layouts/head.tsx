import React from "react";
import NextHead from "next/head";
import { siteConfig } from "../config/site";

interface HeadProps {
  icon: string;
  title: string;
}

export const Head: React.FC<HeadProps> = ({icon, title}) => {
  return (
    <NextHead>
      <title>{title === "" ? siteConfig.name : title}</title>
      <meta key="title" content={title === "" ? siteConfig.name : title} property="og:title" />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={siteConfig.description} name="description" />
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />
      <link href={icon === "" ? "/logo.ico" : `${icon}.ico`} rel="icon" />
    </NextHead>
  );
};
