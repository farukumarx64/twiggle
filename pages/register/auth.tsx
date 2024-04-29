import { useTheme } from "next-themes";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { RegisterComponent, RegisterState } from "../../components/register/register-section";
import { PasswordSetupComponent, PasswordState } from "../../components/register/password-section";
import {
  PersonalInfoComponent,
  PersonalInfoState,
} from "../../components/register/personal-info-section";
import {
  ConfirmationComponent,
  ConfirmationState,
} from "../../components/register/confirmation-section";

interface AuthProps {
  component: string;
}

const Auth: React.FC<AuthProps> = ({ component }) => {
  const [activeComponent, setActiveComponent] = React.useState(component);
  const { theme, setTheme } = useTheme();
  const [registerState, setRegisterState] = React.useState<RegisterState>({
    email: false,
    username: "",
    value: "",
    legal: "",
  });

  const [passwordState, setPasswordState] = React.useState<PasswordState>({
    password: "",
    verifyPassword: "",
    isVerifyPasswordInvalid: false,
    isVisible: false,
  });

  const [personalInfoState, setPersonalInfoState] =
    React.useState<PersonalInfoState>({
      userName: "",
      category: "",
      activeCategory: "",
      activeSubCategory: "",
    });

  const [confirmationState, setConfirmationState] =
    React.useState<ConfirmationState>({
      // State for confirmation component, if any
    });

  const handleComponentChange = (comp: string) => {
    setActiveComponent(comp);

    // Reset relevant states based on the component change
    switch (comp) {
      case "register":
        setRegisterState({ email: false, username: "", value: "", legal: "" });
        break;
      case "register-password":
        setPasswordState({
          password: "",
          verifyPassword: "",
          isVerifyPasswordInvalid: false,
          isVisible: false,
        });
        break;
      case "personal-info":
        setPersonalInfoState({
          userName: "",
          category: "",
          activeCategory: "",
          activeSubCategory: "",
        });
        break;
      case "confirmation":
        setConfirmationState({
          // Reset state for confirmation component, if any
        });
        break;
      default:
        break;
    }
  };
  console.log(registerState, passwordState, personalInfoState, )
  return (
    <>
      <div className="w-full box-border px-6 pt-4 md:pt-8 md:pb-3 max-h-[843px] overflow-y-auto lg:w-2/3">
        <div className=" md:p-2 ml-[-15px] md:ml-0 md:w-[220px] w-[120px]">
          <NextLink href="/">
            <Image
              src={`/images/twiggle-logo-purple${
                theme === "dark" ? "-w" : ""
              }.png`}
              width={200}
              height={50}
              alt="twiggle logo"
              className=""
            />
          </NextLink>
        </div>
        {activeComponent == "register" && (
          <RegisterComponent
            state={registerState}
            setState={setRegisterState}
            handleComponentChange={handleComponentChange}
          />
        )}
        {activeComponent == "register-password" && (
          <PasswordSetupComponent
            state={passwordState}
            setState={setPasswordState}
            handleComponentChange={handleComponentChange}
          />
        )}
        {activeComponent == "personal-info" && (
          <PersonalInfoComponent
            state={personalInfoState}
            setState={setPersonalInfoState}
            handleComponentChange={handleComponentChange}
          />
        )}
        {activeComponent == "confirmation" && (
          <ConfirmationComponent
            state={confirmationState}
            setState={setConfirmationState}
            handleComponentChange={handleComponentChange}
          />
        )}
      </div>
    </>
  );
};
export default Auth;