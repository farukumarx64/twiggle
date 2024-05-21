import { HoveredText } from "+/hover-text";
import { AppIcon } from "+/icons/Icon";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import NextLink from "next/link";
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
  const [emailExists, setEmailExists] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const isButtonDisabled = !state.email || !state.username;

  const validateEmail = (value: string) =>
    value !== undefined
      ? value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
      : "";

  const handler = (button: string) => {
    setState((prevInputs: any) => ({ ...prevInputs, legal: button }));
    onOpen();
  };
  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevInputs: any) => ({
      ...prevInputs,
      value: e.target.value.toLowerCase(),
      email: e.target.value !== "",
    }));

    if (!isInvalid) {
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("email", e.target.value.toLowerCase()); // Correct

        if (data && data.length > 0) {
          setEmailExists(true);
        } else {
          setEmailExists(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleUsernameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((prevInputs: any) => ({
      ...prevInputs,
      username: e.target.value.toLowerCase(),
    }));

    if (e.target.value.length > 2) {
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("username", e.target.value.toLowerCase()); // Correct

        if (data && data.length > 0) {
          setUsernameExists(true);
        } else {
          setUsernameExists(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const isInvalid = React.useMemo(() => {
    if (state.value === "") {
      return false;
    }
    if (emailExists === true) {
      return true;
    }

    return !validateEmail(state.value);
  }, [emailExists, state.value]);

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
          label="Email"
          value={state.value}
          size="sm"
          isInvalid={isInvalid}
          color={
            isInvalid ? "danger" : state.value === "" ? "default" : "success"
          }
          errorMessage={
            isInvalid
              ? emailExists
                ? "Account already exists"
                : "Oops! Please enter a valid email."
              : ""
          }
          onChange={handleEmailChange}
          radius="md"
          className=" max-w-3xl md:max-w-xl"
        />
        <Input
          placeholder="username"
          value={state.username}
          isInvalid={isUsernameInvalid}
          color={
            isInvalid ? "danger" : state.username === "" ? "default" : state.username.length > 2 ? "success" : "default"
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
          isDisabled={isButtonDisabled}
          color={isButtonDisabled ? "default" : "secondary"}
          fullWidth
          className=" box-content px-0 max-w-3xl md:max-w-xl"
          onPress={() => {
            handleComponentChange("register-password");
            dispatch(
              updateSignUpInfo({ email: state.value, username: state.username })
            );
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
      <div className="flex justify-center my-3 text-default-500">OR</div>
      <div className="flex gap-3 items-center justify-center">
        <Button
          radius="lg"
          size="lg"
          variant="ghost"
          fullWidth
          className=" box-content px-0 max-w-3xl bg-white md:max-w-xl"
          isIconOnly
        >
          <AppIcon icon="Google" />
        </Button>
        <Tooltip content="I'm not working yet :)">
          <Button
            radius="lg"
            size="lg"
            variant="ghost"
            fullWidth
            className=" box-content px-0 max-w-3xl bg-white md:max-w-xl"
            isIconOnly
          >
            <AppIcon icon="Facebook" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex justify-center mt-8">
        <p className="text-default-500">Already have an account?&nbsp;</p>
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
