import { HoveredText } from "+/hover-text";
import { Logo } from "+/icons";
import { AppIcon } from "+/icons/Icon";
import { Head } from "@/layouts/head";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

export default function AuthPage() {
  const [legal, setLegal] = React.useState("");
  const [image, setImage] = React.useState(Math.ceil(Math.random() * 12));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handler = (button: string) => {
    setLegal(button);
    onOpen();
  };
  return (
    <div className="relative flex flex-col h-screen">
      <Head icon="logo-alt" title="Login in or Sign Up | Twiggle" />
      <main className="flex justify-center">
        <section className="flex justify-center items-between w-full h-screen">
          <div className="w-full box-border px-6 md:max-w-6xl">
            <div>
              <NextLink href="/">
                <Logo />
              </NextLink>
            </div>
            <div className="pt-10">
              <div className="flex flex-col justify-center items-center mb-12 gap-4">
                <h1 className=" text-3xl font-bold md:text-5xl">Get Twiggle</h1>
                <span className=" text-default-500">Sign up for free!</span>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <Input
                  placeholder="Your Email"
                  size="sm"
                  radius="md"
                  className=" max-w-3xl md:max-w-xl"
                />
                <Input
                  placeholder="username"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-base">Twgl.link/</span>
                    </div>
                  }
                  size="sm"
                  id="email-input"
                  radius="md"
                  className="max-w-3xl md:max-w-xl"
                  classNames={{
                    input: "!pl-[2px] text-base",
                  }}
                />
                <Button
                  radius="full"
                  size="lg"
                  isDisabled
                  fullWidth
                  className=" box-content px-0 max-w-3xl md:max-w-xl"
                >
                  Create account
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="text-sm text-center text-default-500 pt-6 leading-5 max-w-3xl md:max-w-xl">
                  By clicking <span className="font-bold">Create account</span>,
                  you agree to Linktree&apos;s{" "}
                  <Button
                    variant="flat"
                    className=" bg-transparent text-sm px-0 h-auto"
                    onPress={() => {
                      handler("Terms of Service");
                    }}
                  >
                    Terms and Conditions
                  </Button>{" "}
                  and confirm you have read our{" "}
                  <Button
                    variant="flat"
                    className=" bg-transparent text-sm px-0 h-auto"
                    onPress={() => {
                      handler("Privacy Policy");
                    }}
                  >
                    Privacy Notice
                  </Button>{" "}
                  You may receive offers, news and updates from us.
                </div>
              </div>
              <div className="flex justify-center my-3 text-default-500">
                OR
              </div>
              <div className="flex flex-col gap-3 items-center">
                <Button
                  radius="full"
                  size="lg"
                  variant="ghost"
                  fullWidth
                  className=" box-content px-0 max-w-3xl bg-white md:max-w-xl"
                >
                  <span className="flex">
                    <AppIcon icon="Google" />
                    <span className="font-bold pl-2 text-black">
                      Sign up with Google
                    </span>
                  </span>
                </Button>
                <Button
                  radius="full"
                  size="lg"
                  variant="ghost"
                  fullWidth
                  className=" box-content px-0 max-w-3xl bg-white md:max-w-xl"
                >
                  <span className="flex">
                    <AppIcon icon="Apple" />
                    <span className="font-bold pl-2 text-black">
                      Sign up with Apple
                    </span>
                  </span>
                </Button>
              </div>
              <div className="flex justify-center mt-8">
                <p className="text-default-500">
                  Already have an account?&nbsp;
                </p>
                <NextLink href="/login" className=" text-purple-700">
                  Log in
                </NextLink>
              </div>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior="inside"
                backdrop="blur"
                size="5xl"
              >
                <ModalContent>
                  <>
                    <ModalHeader className="flex flex-col gap-1 text-5xl px-3 pb-6 pt-12 text-center">
                      {legal}
                    </ModalHeader>
                    <ModalBody>
                      <HoveredText legal={legal} />
                    </ModalBody>
                  </>
                </ModalContent>
              </Modal>
            </div>
          </div>
          <div className="hidden lg:flex">
            <Image
              src={`/twiggle-images/twiggle-tree-${image}.jpg`}
              alt=""
              width={698}
							height={843}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
