import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { AppIcon } from "./icons/Icon";
import { HoveredText } from "./hover-text";
import NextLink from "next/link";

export const Footer = () => {
  const [legal, setLegal] = React.useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handler = (button: string) => {
    setLegal(button);
    onOpen();
  };
  const date = new Date();
  return (
    <>
      <section className="py-20 px-3">
        <div className=" md:px-20 flex justify-around items-center flex-wrap gap-y-8">
          <div className="flex gap-6">
            <NextLink
              href="mailto:f.umaridris.mail@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              <AppIcon icon="Email" />
            </NextLink>
            <NextLink
              href="https://twitter.com/farukumar_"
              target="_blank"
              rel="noreferrer noopener"
            >
              <AppIcon icon="Twitter" />
            </NextLink>
            <NextLink
              href="https://www.linkedin.com/in/faruk-umar-224565194/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <AppIcon icon="LinkedIn" />
            </NextLink>
          </div>
          <div className="flex justify-center items-center gap-16">
            <div>
              <Button
                className="bg-transparent"
                onPress={() => {
                  handler("Terms of Service");
                }}
              >
                <span className="text-default-500">Terms of Service</span>
              </Button>
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
            <div>
              <Button
                className="bg-transparent"
                onPress={() => {
                  handler("Privacy Policy");
                }}
              >
                <span className="text-default-500">Privacy Policy</span>
              </Button>
            </div>
          </div>
          <span className="text-default-500">
            &#169; Copyright {date.getFullYear()} Twiggle Inc.
          </span>
        </div>
      </section>
    </>
  );
};
