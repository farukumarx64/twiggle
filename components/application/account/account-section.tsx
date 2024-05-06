import { createClient } from "@/utils/supabase/components";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

interface AccountProps {
  userID: string;
}

export const AccountSection: React.FC<AccountProps> = ({ userID }) => {
  const supabase = createClient();
  const [profileTitle, setProfileTitle] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("user_id", userID); // Correct

        if (data && data.length > 0) {
          console.log(data);
          setProfileTitle(data[0].fullname || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [supabase, userID]);

  const handleProfileTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileTitle(e.target.value);
  };

  const changeInfo = async () => {
    try {
      const { error } = await supabase
        .from("users")
        .update({ fullname: profileTitle })
        .eq("user_id", userID);

      if (error) {
        console.log("Error changing username", error);
      }
    } catch (error) {
      console.log("Error changing username", error);
    }
  };
  return (
    <div className="flex gap-8 w-full md:w-2/3 box-content px-4 h-[93vh] justify-center">
      <div className="flex flex-col w-full box-content px-4 justify-start items-center mt-28">
        <div className="px-0 w-full md:max-w-xl mb-6">
          <span className="text-5xl font-bold">My account</span>
        </div>
        <div className="px-0 w-full md:max-w-xl my-7 flex flex-col gap-3">
          <span className="text-xl text-default-500">My information</span>
          <div className="shadow-md p-5 rounded-xl">
            <Input
              variant="underlined"
              label="Name"
              color="secondary"
              value={profileTitle}
              onChange={handleProfileTitleChange}
            />
          </div>
          <div>
            <Button
              color="secondary"
              size="lg"
              className="font-bold"
              onPress={changeInfo}
            >
              Save me
            </Button>
          </div>
        </div>
        <div className="px-0 w-full md:max-w-xl my-7 flex flex-col gap-3">
          <span className="text-xl text-default-500">Account actions</span>
          <div className="shadow-md p-5 rounded-xl flex flex-col gap-2">
            <span className="font-bold">Reset password</span>
            <span>
              Reset the password for this account. This will reset the password
              that you own.
            </span>
            <Button variant="ghost" color="secondary" size="lg" radius="full">
              Reset password
            </Button>
          </div>
        </div>
        <div className="px-0 w-full md:max-w-xl my-7 flex flex-col gap-3">
          <div className="shadow-md p-5 rounded-xl flex flex-col gap-2 mb-10">
            <span className="font-bold">Delete forever</span>
            <span>
              Permanently delete your account and all your Twiggle information.
            </span>
            <Button
              variant="ghost"
              color="danger"
              size="lg"
              radius="full"
              onPress={onOpen}
            >
              Delete account
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Delete your account
              </ModalHeader>
              <ModalBody>
                <div className=" border-warning border-2 rounded-xl px-3 py-4 bg-warning-200">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex gap-3">
                      <i className="ri-question-line"></i>
                      <span>Warning</span>
                    </div>
                    <i className="ri-close-large-line"></i>
                  </div>
                  <div className="px-7 mt-2">This action is permanent. Please be certain you want to delete this account.</div>
                </div>
                <span className="text-default-500 mt-5 mb-10 text-justify">If you continue, your Twiggle account, all the content you own and all your data will be permanently deleted. Visitors will no longer be able to see your Twiggle.</span>
              </ModalBody>
              <ModalFooter>
                <div className="w-full flex gap-5">
                <Button color="danger" variant="ghost" fullWidth radius="full" size="lg">
                  Delete
                </Button>
                <Button onPress={onClose} variant="ghost" fullWidth radius="full" size="lg">Cancel</Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
