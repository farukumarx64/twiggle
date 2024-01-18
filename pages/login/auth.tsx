import { useTheme } from "next-themes";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { LoginComponent, LoginState } from "+/login/login-section";

interface AuthProps {
  component: string;
}

const Auth: React.FC<AuthProps> = ({ component }) => {
  const [activeComponent, setActiveComponent] = React.useState(component);
  const { theme, setTheme } = useTheme();
  const [loginState, setLoginState] = React.useState<LoginState>({
    email: false,
    password: "",
    username: "",
    legal: "",
    isVisible: false,
  });

  const handleComponentChange = (comp: string) => {
    setActiveComponent(comp);

    // Reset relevant states based on the component change
    switch (comp) {
      case "login":
        setLoginState({
          email: false,
          password: "",
          username: "",
          legal: "",
          isVisible: false,
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
        {activeComponent == "login" && (
          <LoginComponent
            state={loginState}
            setState={setLoginState}
            handleComponentChange={handleComponentChange}
          />
        )}
      </div>
    </>
  );
};
export default Auth;