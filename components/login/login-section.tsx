import { EyeFilledIcon, EyeSlashFilledIcon } from "+/icons";
import { AppIcon } from "+/icons/Icon";
import { Button, Input } from "@nextui-org/react";
import NextLink from "next/link";
import React from "react";

export interface LoginState {
  email: boolean;
  password: string;
  username: string;
  legal: string;
  isVisible: boolean;
}
export type SetLoginState = React.Dispatch<React.SetStateAction<LoginState>>;

export const LoginComponent: React.FC<{
  state: LoginState;
  setState: SetLoginState;
  handleComponentChange: (comp: string) => void;
}> = ({ state, setState, handleComponentChange }) => {
  const isButtonDisabled = !state.email || !state.password;
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(state.username)
    setState((prevInputs: any) => ({
      ...prevInputs,
      username: e.target.value,
      email: e.target.value !== "",
    }));
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevInputs) => ({ ...prevInputs, password: e.target.value }));
  };
  const toggleVisibility = () =>
    setState((prevInputs) => ({ ...prevInputs, isVisible: !state.isVisible }));
  return (
    <div className="pt-10">
      <div className="flex flex-col justify-center items-center mb-12 gap-4">
        <h1 className=" text-3xl font-bold md:text-5xl">Welcome back</h1>
        <span className=" text-default-500">Reconnect to your Twiggle</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-3">
        <Input
          label="Email or username"
          value={state.username}
          size="sm"
          onChange={handleEmailChange}
          radius="md"
          className=" max-w-3xl md:max-w-xl"
        />
        <Input
          placeholder="Password"
          size="lg"
          id="email-input"
          onChange={handlePasswordChange}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {state.isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          radius="md"
          type={state.isVisible ? "text" : "password"}
          className="max-w-3xl md:max-w-xl"
          classNames={{
            input: "text-sm"
          }}
        />
        <Button
          radius="full"
          size="lg"
          isDisabled={isButtonDisabled}
          color={isButtonDisabled ? "default" : "secondary"}
          fullWidth
          className=" box-content px-0 max-w-3xl md:max-w-xl"
        >
          <NextLink href="/admin" passHref>Log in</NextLink>
        </Button>
      </div>
      <div className="flex justify-center my-3 text-default-500">OR</div>
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
              Continue with Google
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
              Continue with Apple
            </span>
          </span>
        </Button>
      </div>
      <div className="flex justify-center mt-8">
        <p className="text-default-500">Don&apos;t have an account?&nbsp;</p>
        <NextLink href="/register" className=" text-purple-700">
          Sign up
        </NextLink>
      </div>
    </div>
  );
};
