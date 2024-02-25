import {
  Avatar,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  Navbar as NextUINavbar,
  DropdownSection,
  User,
} from "@nextui-org/react";

import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

interface NavbarProps {
  option: string;
}

export const Navbar: React.FC<NavbarProps> = ({ option }) => {
  const { theme, setTheme } = useTheme();

  return (
    <NextUINavbar maxWidth="xl" isBordered>
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
              className={`flex items-center text-default-500 gap-2 ${
                option === "Links" ? "font-bold text-default-foreground" : ""
              }`}
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
              className={`flex items-center text-default-500 gap-2 ${
                option === "Appearance"
                  ? "font-bold text-default-foreground"
                  : ""
              }`}
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
              className={`flex items-center text-default-500 gap-2 ${
                option === "Settings" ? "font-bold text-default-foreground" : ""
              }`}
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
          <Dropdown>
            <DropdownTrigger>
              <Avatar isBordered name="User" as="button" />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              className="p-5"
              disabledKeys={["user"]}
              
            >
              <DropdownItem isReadOnly key="user" className="w-80 opacity-100">
                <User
                  name="@UserName"
                  description="twgl.link/user"
                  classNames={{
                    name: "font-bold mb-1 ml-2",
                    description: "text-default-500 ml-2",
                  }}
                  avatarProps={{
                    size: "md",
                    src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                  }}
                />
              </DropdownItem>
              <DropdownSection title="Account" className="mt-4">
                <DropdownItem
                  key="my-account"
                  className="w-80"
                  startContent={<i className="ri-account-box-line text-xl"></i>}
                >
                  <span className="text-md ml-4">My account</span>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title="Support" className="mt-4">
                <DropdownItem
                  key="submit-feedback"
                  className="w-80"
                  startContent={<i className="ri-feedback-line text-xl"></i>}
                >
                  <span className="text-md ml-4">Submit feedback</span>
                </DropdownItem>
              </DropdownSection>
              <DropdownItem
                key="delete"
                className="text-danger w-80"
                color="danger"
                startContent={<i className="ri-logout-box-line text-xl"></i>}
              >
                <span className="text-md ml-4">Sign out </span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
        <Dropdown>
          <DropdownTrigger>
            <Button>
              <Avatar isBordered name="User" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          <ThemeSwitch />
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
