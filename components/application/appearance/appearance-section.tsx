import { Button, Divider, useDisclosure } from "@nextui-org/react";
import { AppearanceCard } from "./appearance-card";
import { PreviewMobile } from "../preview/mobile";

interface AppearanceProps {
  userID: string;
}

export const AppearanceSection: React.FC<AppearanceProps> = ({userID}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  return (
    <div className="flex gap-8 w-full md:w-2/3 box-content px-4 h-[93vh] justify-center">
      <div className="flex flex-col w-full box-content px-4 justify-start items-center mt-28">
        <div className="px-0 w-full md:max-w-xl mb-4">
          <span className="text-2xl font-bold">Profile</span>
        </div>
        <AppearanceCard userID={userID}/>
      </div>
      <div className="hidden md:inline">
        <Divider orientation="vertical" />
      </div>
      <div className="fixed bottom-12 md:hidden">
        <Button
          radius="full"
          color="secondary"
          className="p-6"
          variant="shadow"
          startContent={<i className="ri-eye-line"></i>}
          onPress={onOpen}
        >
          <span className="font-bold">Preview</span>
        </Button>
        <PreviewMobile isOpen={isOpen} onOpenChange={onOpenChange} userID={userID} />
      </div>
    </div>
  );
};
