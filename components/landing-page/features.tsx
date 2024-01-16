import { Divider } from "@nextui-org/react";
import React from "react";
import { FeatureIcon } from "../icons/FeatureIcon";
import { AppIcon } from "../icons/Icon";

export const Features = () => {
  return (
    <>
      <section className="flex flex-row-reverse justify-around items-center py-20 px-12 flex-wrap gap-y-32">
        <div className="flex flex-col gap-5 gap-y-12">
          <div className="flex flex-col items-center justify-center flex-wrap">
            <p className="text-signature">Awesome Features</p>
            <h3 className="text-3xl">About Us</h3>
            <span className="flex text-default-500 w-80 lg:w-96 max-h-32 ">
              Welcome to Twiggle, where we believe in the power of simplifying
              and enhancing your online presence. Born out of the idea that
              everyone deserves an effortless way to share their story, Twiggle
              is your digital canvas to create a personalized hub
            </span>
          </div>
          <div className="flex flex-wrap gap-y-12">
            <div className="flex gap-2">
              <AppIcon icon="Hub" />
              <div className="flex flex-col items-start">
                <span className="flex text-2xl mb-3">Personalized Hub</span>
                <span className="flex text-default-500 w-72 ">
                  Easily create a personalized hub with links to social media,
                  websites, and online content. Customize the hub&apos;s
                  appearance to match your individual or brand identity.
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <AppIcon icon="Link" />
              <div className="flex flex-col items-start justify-center">
                <span className="flex text-2xl mb-3">Single Twiggle</span>
                <span className="flex text-default-500 w-72 ">
                  Users receive a single, easy-to-share Twiggle link that
                  consolidates all their online presence. This link serves as a
                  centralized entry point for their audience to discover and
                  connect with them across various platforms.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <FeatureIcon />
        </div>
      </section>

      <Divider orientation="horizontal" />
    </>
  );
};
