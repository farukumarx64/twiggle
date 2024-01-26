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
import React, { useState } from "react";

interface NavbarProps {
  option: string;
}

export const Navbar: React.FC<NavbarProps> = ({option}) => {
  const { theme, setTheme } = useTheme();
  const [currentOption, setCurrentOption] = useState(option)

  return (
    <NextUINavbar maxWidth="xl">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/admin"
          >
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
        <NavbarItem>
          <NextLink href="/admin">
          <Button
            radius="full"
            size="lg"
            variant="light"
            startContent={<i className="ri-stacked-view"></i>}
            className={`flex items-center text-default-500 gap-2 ${option === 'Links' ? 'font-bold text-default-foreground' : ''}`}
          >
            <span className="">Links</span>
          </Button>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href="/admin/appearance">
          <Button
            radius="full"
            size="lg"
            variant="light"
            startContent={<i className="ri-shapes-line"></i>}
            className={`flex items-center text-default-500 gap-2 ${option === 'Appearance' ? 'font-bold text-default-foreground' : ''}`}
          >
            <span className="">Appearance</span>
          </Button>
          </NextLink>
        </NavbarItem>
        <NavbarItem>
          <NextLink href="/admin/settings">
          <Button
            radius="full"
            size="lg"
            variant="light"
            startContent={<i className="ri-settings-line"></i>}
            className={`flex items-center text-default-500 gap-2 ${option === 'Settings' ? 'font-bold text-default-foreground' : ''}`}
          >
            <span className="">Settings</span>
          </Button>
          </NextLink>
        </NavbarItem>
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
