import {
  Button,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  Avatar,
} from "@nextui-org/react";

import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";

import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <NextUINavbar maxWidth="xl" >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image
              src={`/images/logo-alt-${
                theme === "dark" ? "white" : "black"
              }.svg`}
              width={50}
              height={50}
              alt="twiggle logo"
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Button
            radius="full"
            size="lg"
            variant="ghost"
            startContent={<i className="ri-share-line"></i>}
            className="flex items-center gap-2"
          >
            <span className="font-bold">Share</span>
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <Avatar isBordered name="User" />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 gap-4" justify="end">
          <Button
            radius="full"
            size="lg"
            variant="ghost"
            startContent={<i className="ri-share-line"></i>}
            className="flex items-center gap-2"
          >
            <span className="font-bold">Share</span>
          </Button>
          <Avatar isBordered name="User" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <ThemeSwitch />
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
