import { HoveredText } from "+/hover-text";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { updateSignUpInfo } from "@/utils/state/actions/signUpActions";
import { createClient } from "@/utils/supabase/components";

export interface RegisterState {
  email: boolean;
  username: string;
  value: string;
  legal: string;
}
export type SetRegisterState = React.Dispatch<
  React.SetStateAction<RegisterState>
>;

export const RegisterComponent: React.FC<{
  state: RegisterState;
  setState: SetRegisterState;
  handleComponentChange: (comp: string) => void;
}> = ({ state, setState, handleComponentChange }) => {
  const dispatch = useDispatch();
  const supabase = createClient();
  // ... code for the register component
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [usernameExists, setUsernameExists] = useState(false);
  const isButtonDisabled = !state.username || state.username.length < 3;

  const handler = (button: string) => {
    setState((prevInputs: any) => ({ ...prevInputs, legal: button }));
    onOpen();
  };

  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((prevInputs: any) => ({
      ...prevInputs,
      username: e.target.value,
    }));

    if (e.target.value.length > 2) {
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("username", e.target.value); // Correct

        if (data && data.length > 0) {
          setUsernameExists(true);
          console.log(data);
        } else {
          setUsernameExists(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isUsernameInvalid = React.useMemo(() => {
    if (usernameExists === true) {
      return true;
    }
    if (state.username === "") {
      return false;
    }
  }, [state.username, usernameExists]);

  return (
    <div className="pt-10">
      <div className="flex flex-col justify-center items-center mb-12 gap-4">
        <h1 className=" text-3xl font-bold md:text-5xl">Get Twiggle</h1>
        <span className=" text-default-500">Sign up for free!</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <Input
          placeholder="username"
          value={state.username}
          isInvalid={isUsernameInvalid}
          color={
            isUsernameInvalid
              ? "danger"
              : state.username === ""
              ? "default"
              : state.username.length > 2
              ? "success"
              : "default"
          }
          errorMessage={isUsernameInvalid && "Username is already taken :("}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-base">Twgl.link/</span>
            </div>
          }
          size="lg"
          id="email-input"
          radius="md"
          onChange={handleUsernameChange}
          className="max-w-3xl md:max-w-xl"
          classNames={{
            input: "!pl-[2px] text-sm",
          }}
        />
        <Button
          radius="full"
          size="lg"
          isDisabled={isButtonDisabled || isUsernameInvalid}
          color={
            isButtonDisabled || isUsernameInvalid ? "default" : "secondary"
          }
          fullWidth
          className=" box-content px-0 max-w-3xl md:max-w-xl"
          onPress={() => {
            handleComponentChange("personal-info");
            dispatch(updateSignUpInfo({ username: state.username }));
          }}
        >
          Create account
        </Button>
      </div>
      <div className="flex justify-center">
        <div className="text-sm text-center text-default-500 pt-6 leading-5 max-w-3xl md:max-w-xl">
          By clicking <span className="font-bold">Create account</span>, you
          agree to Twiggle&apos;s{" "}
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
          </Button>
          . You may receive offers, news and updates from us.
        </div>
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
              {state.legal}
            </ModalHeader>
            <ModalBody>
              <HoveredText legal={state.legal} />
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
};
