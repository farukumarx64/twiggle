import { EyeFilledIcon, EyeSlashFilledIcon, Logo } from "+/icons";
import { AppIcon } from "+/icons/Icon";
import { Head } from "@/layouts/head";
import {
  Button,
  Input,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

export default function LoginPage() {
  const [image, setImage] = React.useState(Math.ceil(Math.random() * 12));
  const [isVisible, setIsVisible] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inputs, setInputs] = React.useState({
    email: false,
    password: "",
  });
  const { theme, setTheme } = useTheme();

  const isButtonDisabled = !inputs.email || !inputs.password;

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = React.useMemo(() => {
    if (value === "") {
      return false;
    }

    return !validateEmail(value);
  }, [value]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setInputs((prevInputs) => ({
      ...prevInputs,
      email: e.target.value !== "",
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({ ...prevInputs, password: e.target.value }));
  };


  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="relative flex flex-col h-screen">
      <Head icon="logo-alt" title="Log in or Sign Up | Twiggle" />
      <main className="flex justify-center">
        <section className="flex justify-center items-between w-full h-screen">
          <div className="w-full box-border px-6 md:max-w-6xl pt-4 md:pt-8 md:pb-3">
          <div className=" md:p-2 ml-[-15px] md:ml-0 md:w-[220px] w-[120px]">
              <NextLink href="/">
              <Image
              src={`/images/twiggle-logo-purple${theme === "light" ? "" : "-w"}.png`}
              width={200}
              height={50}
              alt="twiggle logo"
              className=""
            />
              </NextLink>
            </div>
            <div className="pt-10">
              <div className="flex flex-col justify-center items-center mb-12 gap-4">
                <h1 className=" text-3xl font-bold md:text-5xl">
                  Welcome back
                </h1>
                <span className=" text-default-500">
                  Reconnect to your Twiggle
                </span>
              </div>
              <div className="flex flex-col justify-center items-center gap-3">
                <Input
                  placeholder="Email or username"
                  value={value}
                  size="sm"
                  isInvalid={isInvalid}
                  color={
                    isInvalid ? "danger" : value === "" ? "default" : "success"
                  }
                  errorMessage={
                    isInvalid && "Oops! Please enter a valid email."
                  }
                  onChange={handleEmailChange}
                  radius="md"
                  className=" max-w-3xl md:max-w-xl"
                />
                <Input
                  placeholder="Password"
                  size="sm"
                  id="email-input"
                  onChange={handlePasswordChange}
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  radius="md"
                  type={isVisible ? "text" : "password"}
                  className="max-w-3xl md:max-w-xl"
                />
                <Button
                  radius="full"
                  size="lg"
                  isDisabled={isButtonDisabled}
                  color={isButtonDisabled ? "default" : "secondary"}
                  fullWidth
                  className=" box-content px-0 max-w-3xl md:max-w-xl"
                >
                  Log in
                </Button>
              </div>
              <div className="flex justify-center my-3 text-default-500">
                OR
              </div>
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
                      Sign up with Google
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
                      Sign up with Apple
                    </span>
                  </span>
                </Button>
              </div>
              <div className="flex justify-center mt-8">
                <p className="text-default-500">
                  Don&apos;t have an account?&nbsp;
                </p>
                <NextLink href="/register" className=" text-purple-700">
                  Sign up
                </NextLink>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex">
            <Image
              src={`/twiggle-images/twiggle-tree-${image}.jpg`}
              alt=""
              width={698}
              height={843}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
