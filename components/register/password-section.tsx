import { EyeFilledIcon, EyeSlashFilledIcon } from "+/icons";
import { AppIcon } from "+/icons/Icon";
import { updateSignUpInfo } from "@/utils/state/actions/signUpActions";
import {
  Button,
  Input,
  Progress,
} from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";

export interface PasswordState {
  password: string;
  verifyPassword: string;
  isVerifyPasswordInvalid: boolean;
  isVisible: boolean;
}
export type SetPasswordState = React.Dispatch<React.SetStateAction<PasswordState>>;

export const PasswordSetupComponent: React.FC<{
  state: PasswordState;
  setState: SetPasswordState;
  handleComponentChange: (comp: string) => void;
}> = ({ state, setState, handleComponentChange }) => {
  const dispatch = useDispatch();
  // ... code for the password setup component
  const isPasswordDisabled =
    !state.password ||
    !state.verifyPassword ||
    state.password !== state.verifyPassword;
  const validatePassword = (value: string) => {
    return value.length >= 8;
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVerifyPassword = e.target.value;
    setState((prevInputs) => ({ ...prevInputs, password: e.target.value }));
    const isMatching =
      newVerifyPassword === state.verifyPassword || state.verifyPassword === "";
    setState((prevInputs) => ({
      ...prevInputs,
      isVerifyPasswordInvalid: !isMatching,
    }));
  };
  const handleVerifyPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVerifyPassword = e.target.value;
    setState((prevInputs) => ({
      ...prevInputs,
      verifyPassword: e.target.value,
    }));
    const isMatching = newVerifyPassword === state.password;
    setState((prevInputs) => ({
      ...prevInputs,
      isVerifyPasswordInvalid: !isMatching,
    }));
  };
  const isPasswordInvalid = React.useMemo(() => {
    if (state.password === "") {
      return false;
    }

    return !validatePassword(state.password);
  }, [state.password]);
  const toggleVisibility = () =>
    setState((prevInputs) => ({ ...prevInputs, isVisible: !state.isVisible }));
  return (
    <div className="flex flex-col justify-center items-center md:pt-10 pt-40">
      <div className="lg:w-[640px] box-border px-10">
        <div className="flex flex-col justify-center items-start mb-12 gap-4">
          <Progress color="secondary" aria-label="Loading..." value={50} />
          <Button
            onPress={() => {
              handleComponentChange("register");
            }}
            className="bg-transparent font-bold text-purple-700 text-lg px-0"
          >
            <AppIcon icon="Back" />
            <span>Back</span>
          </Button>
          <h1 className=" text-3xl font-bold md:text-5xl">Enter a password</h1>
          <span className=" text-default-500">
            Choose a strong password with at least 8 characters.
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-5">
          <Input
            placeholder="Password"
            size="lg"
            id="email-input"
            onChange={handlePasswordChange}
            isInvalid={isPasswordInvalid}
            color={
              isPasswordInvalid || state.isVerifyPasswordInvalid
                ? "danger"
                : state.password === ""
                ? "default"
                : "success"
            }
            errorMessage={
              isPasswordInvalid || state.isVerifyPasswordInvalid
                ? "Password must be at least 8 characters"
                : undefined
            }
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
          />
          <Input
            placeholder="Verify Password"
            size="lg"
            id="email-input"
            onChange={handleVerifyPasswordChange}
            isInvalid={state.isVerifyPasswordInvalid}
            color={
              state.isVerifyPasswordInvalid
                ? "danger"
                : state.verifyPassword === ""
                ? "default"
                : "success"
            }
            errorMessage={
              state.isVerifyPasswordInvalid && "Password must be a match"
            }
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
          />
          <Button
            radius="full"
            size="lg"
            isDisabled={isPasswordDisabled}
            color={isPasswordDisabled ? "default" : "secondary"}
            fullWidth
            className=" box-content px-0 max-w-3xl md:max-w-xl"
            onPress={() => {
              handleComponentChange("personal-info");
              dispatch(updateSignUpInfo({password: state.password }))
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};