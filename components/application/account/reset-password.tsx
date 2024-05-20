import { EyeFilledIcon, EyeSlashFilledIcon } from "+/icons";
import { PasswordState } from "+/register/password-section";
import { createClient } from "@/utils/supabase/components";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import React from "react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}
export const ResetPasswordModal: React.FC<Props> = ({
  isOpen,
  onOpenChange,
}) => {
  const [password, setPasswordState] = useState<PasswordState>({
    password: "",
    verifyPassword: "",
    isVerifyPasswordInvalid: false,
    isVisible: false,
  });
  const supabase = createClient();

  const validatePassword = (value: string) => {
    return value.length >= 8;
  };

  const isPasswordDisabled =
    !password.password ||
    !password.verifyPassword ||
    password.password !== password.verifyPassword;
    
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVerifyPassword = e.target.value;
    setPasswordState((prevInputs) => ({
      ...prevInputs,
      password: e.target.value,
    }));
    const isMatching =
      newVerifyPassword === password.verifyPassword ||
      password.verifyPassword === "";
    setPasswordState((prevInputs) => ({
      ...prevInputs,
      isVerifyPasswordInvalid: !isMatching,
    }));
  };
  const handleVerifyPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVerifyPassword = e.target.value;
    setPasswordState((prevInputs) => ({
      ...prevInputs,
      verifyPassword: e.target.value,
    }));
    const isMatching = newVerifyPassword === password.password;
    setPasswordState((prevInputs) => ({
      ...prevInputs,
      isVerifyPasswordInvalid: !isMatching,
    }));
  };

  const handlePasswordUpdate = async() => {
    try {

      const { data, error } = await supabase.auth.updateUser({
        password: password.password,
      })
      if (error) {
        console.error("Error: error updating password", error)
      } else {
        console.log(data)
        setPasswordState((prevInputs) => ({
          ...prevInputs,
          password: '',
        }));
      }
    } catch (error) {
      console.error("Error: error updating password", error)
    }
  }

  const isPasswordInvalid = React.useMemo(() => {
    if (password.password === "") {
      return false;
    }

    return !validatePassword(password.password);
  }, [password.password]);

  const toggleVisibility = () =>
    setPasswordState((prevInputs) => ({
      ...prevInputs,
      isVisible: !password.isVisible,
    }));
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Reset your password
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
                <div className="px-7 mt-2">
                  You are about to change your password. This will result in you signing out!
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-5">
                <Input
                  placeholder="New Password"
                  size="lg"
                  id="email-input"
                  onChange={handlePasswordChange}
                  isInvalid={isPasswordInvalid}
                  color={
                    isPasswordInvalid || password.isVerifyPasswordInvalid
                      ? "danger"
                      : password.password === ""
                      ? "default"
                      : "success"
                  }
                  errorMessage={
                    isPasswordInvalid || password.isVerifyPasswordInvalid
                      ? "Password must be at least 8 characters"
                      : undefined
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {password.isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  radius="md"
                  type={password.isVisible ? "text" : "password"}
                  className="max-w-3xl md:max-w-xl"
                />
                <Input
                  placeholder="Verify Password"
                  size="lg"
                  id="email-input"
                  onChange={handleVerifyPasswordChange}
                  isInvalid={password.isVerifyPasswordInvalid}
                  color={
                    password.isVerifyPasswordInvalid
                      ? "danger"
                      : password.verifyPassword === ""
                      ? "default"
                      : "success"
                  }
                  errorMessage={
                    password.isVerifyPasswordInvalid &&
                    "Password must be a match"
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {password.isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  radius="md"
                  type={password.isVisible ? "text" : "password"}
                  className="max-w-3xl md:max-w-xl"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="w-full flex gap-5">
                <Button
                  color={isPasswordDisabled ? "default" : "success"}
                  variant="ghost"
                  isDisabled={isPasswordDisabled}
                  fullWidth
                  radius="full"
                  size="lg"
                  onPress={handlePasswordUpdate}
                >
                  Update
                </Button>
                <Button
                  onPress={onClose}
                  variant="ghost"
                  fullWidth
                  radius="full"
                  size="lg"
                >
                  Cancel
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
