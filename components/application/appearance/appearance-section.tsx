import { Divider } from "@nextui-org/react";
import { AppearanceCard } from "./appearance-card";

export const AppearanceSection = () => {


  return (
    <div className="flex gap-8 w-full md:w-2/3 box-content px-4 h-[93vh] justify-center">
      <div className="flex flex-col w-full box-content px-4 justify-start items-center mt-28">
        <div className="px-0 w-full md:max-w-xl mb-4">
        <span className="text-2xl font-bold">Profile</span>
        </div>
        <AppearanceCard />
      </div>
      <div className="hidden md:inline">
        <Divider orientation="vertical" />
      </div>
    </div>
  );
};
