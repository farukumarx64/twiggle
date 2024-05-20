import React, { useState } from "react";
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { socials } from "@/config/social-icons";

interface SocialIcon {
  id: string;
  icon: string;
  name: string;
  placeholder: string;
  example: string;
}

export const SocialIcons: React.FC = () => {
  const [activeIconSection, setActiveIconSection] = useState<
    "first" | "second"
  >("first");
  const [iconContent, setIconContent] = useState<SocialIcon | null>(null);
  const [modalHeader, setModalHeader] = useState<string>("Add icon");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleIconSectionChange = (
    section: "first" | "second",
    item: SocialIcon | null = null
  ) => {
    if (section === "first") {
      setIconContent(null);
      setModalHeader("Add icon");
    } else if (section === "second" && item) {
      setIconContent(item);
      setModalHeader(`Add ${item.name} icon`);
    }
    setActiveIconSection(section);
  };

  return (
    <div className="w-full md:max-w-xl p-6 border-1 flex flex-col justify-center items-start rounded-3xl">
      <span className="font-bold">Add your socials</span>
      <span className="text-default-500 mt-2 mb-8">
        Add icons linking to your social profiles, email, and more
      </span>
      <Button color="secondary" radius="full" onClick={onOpen}>
        Add icon
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="inside"
        onClose={() => handleIconSectionChange("first")}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {activeIconSection === "first" && modalHeader}
              {activeIconSection === "second" && (
                <div className="w-full flex items-center justify-start">
                  <Button
                    variant="light"
                    onClick={() => handleIconSectionChange("first")}
                    isIconOnly
                    className="px-0 h-7 self-start"
                  >
                    <i className="ri-arrow-left-wide-line"></i>
                  </Button>
                  <span>{modalHeader}</span>
                </div>
              )}
            </ModalHeader>
            <ModalBody>
              {activeIconSection === "first" && (
                <section className="flex flex-col gap-3">
                  <Input
                    classNames={{
                      base: "max-w-full h-10",
                      mainWrapper: "h-full",
                      input: "text-small",
                      inputWrapper:
                        "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                    }}
                    placeholder="Type to search..."
                    size="sm"
                    startContent={<i className="ri-search-line"></i>}
                    type="search"
                    className="w-full"
                  />
                  <div className="overflow-y-scroll h-[60vh] md:h-[35vh] flex flex-col gap-3">
                    {Object.values(socials).map((item: SocialIcon) => (
                      <Button
                        key={item.id}
                        id={item.id}
                        className="h-14 px-4 py-7"
                        variant="light"
                        radius="sm"
                        onClick={() => handleIconSectionChange("second", item)}
                        endContent={
                          <i className="ri-arrow-right-s-line text-xl text-default-500"></i>
                        }
                      >
                        <div className="flex gap-3 items-center justify-start w-full">
                          <i className={`${item.icon} text-2xl`}></i>
                          <span className="text-md font-bold">{item.name}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </section>
              )}
              {activeIconSection === "second" && iconContent && (
                <section className="flex flex-col">
                  <Input label={iconContent.placeholder} />
                  <span className="my-4 text-default-500 pl-4 text-xs">
                    Example: {iconContent.example}
                  </span>
                  <Button radius="full" color="secondary" className="my-4">
                    Add to Twiggle
                  </Button>
                </section>
              )}
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};
