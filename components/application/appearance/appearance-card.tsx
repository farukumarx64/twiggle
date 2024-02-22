import { Avatar, Button, Divider, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";

export const AppearanceCard = () => {
  return (
    <div className="w-full md:max-w-xl p-6 border-1 flex flex-col justify-center items-center rounded-3xl">
      <div className="w-full flex justify-between">
        <div className=" w-36">
          <Avatar isBordered name="User" className="w-20 h-20 text-large" />
    
        </div>
        <div className="w-full flex flex-col">
          <Button
            color="secondary"
            className="box-content px-0 w-full md:max-w-md mb-2"
            radius="full"
          >
            Pick and Image
          </Button>
          <Button
            className="box-content px-0 w-full md:max-w-md mb-2"
            radius="full"
            variant="ghost"
          >
            Remove
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3 mt-9 mb-3">
        <Input label="Profile Title" />
        <Textarea label="Bio"></Textarea>
      </div>
      <Divider orientation="horizontal" className=" my-5"/>
      <div>
        <Link href="/admin/settings" className="text-lg flex gap-1"><i className="ri-add-line text-xl"></i>Add social icons</Link>
      </div>
    </div>
  );
};
