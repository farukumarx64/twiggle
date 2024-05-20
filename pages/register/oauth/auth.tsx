import { useTheme } from "next-themes";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import {
  RegisterComponent,
  RegisterState,
} from "+/register/oauth/register-section";
import {
  PersonalInfoComponent,
  PersonalInfoState,
} from "+/register/oauth/personal-info-section";
import {
  ConfirmationComponent,
  ConfirmationState,
} from "+/register/oauth/confirmation-section";

interface AuthProps {
  component: string;
  data: any;
}

const Auth: React.FC<AuthProps> = ({ component, data }) => {
  const [activeComponent, setActiveComponent] = React.useState(component);
  const { theme, setTheme } = useTheme();
  const [registerState, setRegisterState] = React.useState<RegisterState>({
    email: false,
    username: "",
    value: "",
    legal: "",
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
        {activeComponent == "personal-info" && (
          <PersonalInfoComponent
            state={personalInfoState}
            setState={setPersonalInfoState}
            data={data}
            handleComponentChange={handleComponentChange}
          />
        )}
        {activeComponent == "confirmation" && (
          <ConfirmationComponent
            state={confirmationState}
            setState={setConfirmationState}
            email={data.email}
            handleComponentChange={handleComponentChange}
          />
        )}
      </div>
    </>
  );
};
export default Auth;
