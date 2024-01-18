import {
  Button,
  Progress,
} from "@nextui-org/react";
import React from "react";


export interface ConfirmationState {}

export type SetConfirmationState = React.Dispatch<
  React.SetStateAction<ConfirmationState>
>;


export const ConfirmationComponent: React.FC<{
  state: ConfirmationState;
  setState: SetConfirmationState;
  handleComponentChange: (comp: string) => void;
}> = ({ state, setState, handleComponentChange }) => {
  // ... code for the confirmation component
  return (
    <div className="flex flex-col justify-center items-center md:pt-10 pt-40 mb-20">
      <div className="lg:w-[640px] box-border px-10">
        <div className="flex flex-col justify-center items-center mb-12 gap-4">
          <Progress color="secondary" aria-label="Loading..." value={100} />
          <h1 className=" text-3xl font-bold md:text-5xl">
            Thanks for signing up
          </h1>
          <span className=" text-default-500">
            To verify your account, click on the link sent to your inbox
            (example@email.com{/*Email*/}).
          </span>
        </div>
        <div className="flex justify-center mt-8">
          <Button
            radius="full"
            size="lg"
            color="secondary"
            fullWidth
            className=" box-content px-0 max-w-3xl md:max-w-xl"
            onPress={() => {
              handleComponentChange("register");
            }}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};