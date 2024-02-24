import { AppIcon } from "+/icons/Icon";
import { socials } from "@/config/social-icons";
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export const SocialIcons = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="w-full md:max-w-xl p-6 border-1 flex flex-col justify-center items-start rounded-3xl">
      <span className="font-bold">Add you socials</span>
      <span className="text-default-500 mt-2 mb-8">
        Add icons linking to your social profiles, email and more
      </span>
      <Button color="secondary" radius="full" onPress={onOpen}>
        Add icon
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">Add icon</ModalHeader>
            <ModalBody>
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
                  {Object.values(socials).map((item, index) => (
                    <Button
                      key={item.id}
                      id={item.id}
                      className="h-14 px-4 py-7"
                      variant="light"
                      radius="sm"
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
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};
