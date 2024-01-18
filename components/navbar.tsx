import {
  Button,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/react";


import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";

import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
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
              className="md:hidden"
            />
            <Image
              src={`/images/twiggle-logo-${
                theme === "dark" ? "white" : "black"
              }.png`}
              width={200}
              height={50}
              alt="twiggle logo"
              className="hidden md:inline"
            />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Button radius="sm" size="lg">
            <NextLink href="/login" target="_blank">
              Log in
            </NextLink>
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <Button color="secondary" radius="full" size="lg">
            <NextLink href="/register" target="_blank">
              Sign up free
            </NextLink>
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 gap-2" justify="end">
        <Button radius="sm" size="lg">
          <NextLink href="/login" target="_blank">
            Log in
          </NextLink>
        </Button>
        <Button color="secondary" radius="full" size="lg">
          <NextLink href="/register" target="_blank">
            Sign up free
          </NextLink>
        </Button>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <ThemeSwitch />
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
