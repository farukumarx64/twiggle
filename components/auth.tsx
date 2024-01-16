import { HoveredText } from "+/hover-text";
import { EyeFilledIcon, EyeSlashFilledIcon } from "+/icons";
import { AppIcon } from "+/icons/Icon";
import { categories } from "@/config/categories";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Progress,
  useDisclosure,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";

interface AuthProps {
  component: string;
}

export const Auth: React.FC<AuthProps> = ({ component }) => {
  const [inputs, setInputs] = React.useState({
    email: false,
    username: "",
    password: "",
    verifyPassword: "",
  });
  const [legal, setLegal] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("");
  const [activeSubCategory, setActiveSubCategory] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [value, setValue] = React.useState("");
  const [category, setCategory] = React.useState<string | null | undefined>("");
  const [isVerifyPasswordInvalid, setIsVerifyPasswordInvalid] =
    React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState(component);
  const { theme, setTheme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isButtonDisabled = !inputs.email || !inputs.username;
  const isPersonalInfoButtonDisabled = !userName || !activeCategory;
  const isPasswordDisabled =
    !inputs.password ||
    !inputs.verifyPassword ||
    inputs.password !== inputs.verifyPassword;

  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const validatePassword = (value: string) => {
    return value.length >= 8;
  };

  const isInvalid = React.useMemo(() => {
    if (value === "") {
      return false;
    }

    return !validateEmail(value);
  }, [value]);

  const isPasswordInvalid = React.useMemo(() => {
    if (inputs.password === "") {
      return false;
    }

    return !validatePassword(inputs.password);
  }, [inputs.password]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setInputs((prevInputs) => ({
      ...prevInputs,
      email: e.target.value !== "",
    }));
  };

  const handleComponentChange = (comp: string) => {
    setActiveComponent(comp);
    setInputs((prevInputs) => ({
      ...prevInputs,
      password: "",
      verifyPassword: "",
    }));
  };

  const handleActiveCategory = (id: string) => {
    handleCategoryChange(id);
    setActiveCategory(id);
  };

  const handleActiveSubCategory = (id: string) => {
    setActiveSubCategory(id);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevInputs) => ({ ...prevInputs, username: e.target.value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVerifyPassword = e.target.value;
    setInputs((prevInputs) => ({ ...prevInputs, password: e.target.value }));
    const isMatching =
      newVerifyPassword === inputs.verifyPassword ||
      inputs.verifyPassword === "";
    setIsVerifyPasswordInvalid(!isMatching);
  };

  const handleVerifyPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVerifyPassword = e.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      verifyPassword: e.target.value,
    }));
    const isMatching = newVerifyPassword === inputs.password;
    setIsVerifyPasswordInvalid(!isMatching);
  };

  const handleCategoryChange = (id: string) => {
    const button = document.getElementById(id);
    setCategory(button?.textContent);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handler = (button: string) => {
    setLegal(button);
    onOpen();
  };
  return (
    <>
      <div className="w-full box-border px-6 md:max-w-6xl pt-4 md:pt-8 md:pb-3 max-h-[843px] overflow-y-auto">
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
          <div className="pt-10">
            <div className="flex flex-col justify-center items-center mb-12 gap-4">
              <h1 className=" text-3xl font-bold md:text-5xl">Get Twiggle</h1>
              <span className=" text-default-500">Sign up for free!</span>
            </div>
            <div className="flex flex-col justify-center items-center gap-3">
              <Input
                label="Email"
                value={value}
                size="sm"
                isInvalid={isInvalid}
                color={
                  isInvalid ? "danger" : value === "" ? "default" : "success"
                }
                errorMessage={isInvalid && "Oops! Please enter a valid email."}
                onChange={handleEmailChange}
                radius="md"
                className=" max-w-3xl md:max-w-xl"
              />
              <Input
                placeholder="username"
                value={inputs.username}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-base">Twgl.link/</span>
                  </div>
                }
                size="sm"
                id="email-input"
                radius="md"
                onChange={handleUsernameChange}
                className="max-w-3xl md:max-w-xl"
                classNames={{
                  input: "!pl-[2px] text-base",
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
                }}
              >
                Create account
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="text-sm text-center text-default-500 pt-6 leading-5 max-w-3xl md:max-w-xl">
                By clicking <span className="font-bold">Create account</span>,
                you agree to Linktree&apos;s{" "}
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
                    {legal}
                  </ModalHeader>
                  <ModalBody>
                    <HoveredText legal={legal} />
                  </ModalBody>
                </>
              </ModalContent>
            </Modal>
          </div>
        )}
        {activeComponent == "register-password" && (
          <div className="flex flex-col justify-center items-center md:pt-10 pt-40">
            <div className="lg:w-[640px] box-border px-10">
              <div className="flex flex-col justify-center items-start mb-12 gap-4">
                <Progress
                  color="secondary"
                  aria-label="Loading..."
                  value={50}
                />
                <Button
                  onPress={() => {
                    handleComponentChange("register");
                  }}
                  className="bg-transparent font-bold text-purple-700 text-lg px-0"
                >
                  <AppIcon icon="Back" />
                  <span>Back</span>
                </Button>
                <h1 className=" text-3xl font-bold md:text-5xl">
                  Enter a password
                </h1>
                <span className=" text-default-500">
                  Choose a strong password with at least 8 characters.
                </span>
              </div>
              <div className="flex flex-col justify-center items-center gap-10">
                <Input
                  placeholder="Password"
                  size="sm"
                  id="email-input"
                  onChange={handlePasswordChange}
                  isInvalid={isPasswordInvalid}
                  color={
                    isPasswordInvalid || isVerifyPasswordInvalid
                      ? "danger"
                      : inputs.password === ""
                      ? "default"
                      : "success"
                  }
                  errorMessage={
                    isPasswordInvalid || isVerifyPasswordInvalid
                      ? "Password must be at least 8 characters"
                      : undefined
                  }
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
                <Input
                  placeholder="Verify Password"
                  size="sm"
                  id="email-input"
                  onChange={handleVerifyPasswordChange}
                  isInvalid={isVerifyPasswordInvalid}
                  color={
                    isVerifyPasswordInvalid
                      ? "danger"
                      : inputs.verifyPassword === ""
                      ? "default"
                      : "success"
                  }
                  errorMessage={
                    isVerifyPasswordInvalid && "Password must be a match"
                  }
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
                  isDisabled={isPasswordDisabled}
                  color={isPasswordDisabled ? "default" : "secondary"}
                  fullWidth
                  className=" box-content px-0 max-w-3xl md:max-w-xl"
                  onPress={() => {
                    handleComponentChange("personal-info");
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
        {activeComponent == "personal-info" && (
          <div className="flex flex-col justify-center items-center md:pt-10 pt-40 mb-20">
            <div className="lg:w-[640px] box-border px-10">
              <div className="flex flex-col justify-center items-start mb-12 gap-4">
                <Progress
                  color="secondary"
                  aria-label="Loading..."
                  value={70}
                />
                <h1 className=" text-3xl font-bold md:text-5xl">
                  Tell us about yourself
                </h1>
                <span className=" text-default-500">
                  This will personalize your Linktree experience.
                </span>
                <Input
                  labelPlacement="inside"
                  label="Tell us your name"
                  onChange={handleNameChange}
                />
                {userName.length > 2 && (
                  <div className="mt-5 flex flex-col gap-5">
                    <span className="font-bold">
                      Select one category that best describes your Linktree:
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {Object.values(categories).map((item, index) => (
                        <Button
                          startContent={
                            <i className={`${item.icon} !text-xl`}></i>
                          }
                          variant="bordered"
                          value={item.category}
                          key={item.id}
                          size="sm"
                          radius="full"
                          id={item.id}
                          className={`!w-auto px-4 py-1 box-content text-sm ${
                            activeCategory === item.id
                              ? `bg-[#a1acfb] border-[#a1acfb]`
                              : ""
                          }`}
                          onPress={() => {
                            handleActiveCategory(item.id);
                          }}
                        >
                          {item.category}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                {category && userName.length > 2 && (
                  <div className="mt-5 flex flex-col gap-5">
                    <span className="font-bold">
                      Pick your {category} category (optional):
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {categories[category].values.map((item, index) => (
                        <Button
                          variant="bordered"
                          key={item}
                          id={item}
                          size="sm"
                          radius="full"
                          className={`!w-auto px-3 py-1 text-sm ${
                            activeSubCategory === item
                              ? `bg-black border-black text-white`
                              : ""
                          }`}
                          onPress={() => {
                            handleActiveSubCategory(item);
                          }}
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center items-center gap-10">
                <Button
                  radius="full"
                  size="lg"
                  isDisabled={isPersonalInfoButtonDisabled}
                  color={isPersonalInfoButtonDisabled ? "default" : "secondary"}
                  fullWidth
                  className=" box-content px-0 max-w-3xl md:max-w-xl"
                  onClick={() => {
                    handleComponentChange("register-password");
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
