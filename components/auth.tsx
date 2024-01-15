import { HoveredText } from "+/hover-text";
import { EyeFilledIcon, EyeSlashFilledIcon } from "+/icons";
import { AppIcon } from "+/icons/Icon";
import {
  Button,
  Chip,
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
  const [userName, setUserName] = React.useState("");
  const [value, setValue] = React.useState("");
  const [isVerifyPasswordInvalid, setIsVerifyPasswordInvalid] =
    React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState(component);
  const { theme, setTheme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isButtonDisabled = !inputs.email || !inputs.username;
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

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handler = (button: string) => {
    setLegal(button);
    onOpen();
  };
  return (
    <>
      <div className="w-full box-border px-6 md:max-w-6xl pt-4 md:pt-8 md:pb-3">
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
          <div className="flex flex-col justify-center items-center md:pt-10 pt-40">
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
                {userName && (
                  <div className="mt-5 flex flex-col gap-5">
                    <span className="font-bold">
                      Select one category that best describes your Linktree:
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        startContent={
                          <i className="ri-computer-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Tech"
                        size="sm"
                        radius="full"
                        className="!w-auto px-4 py-1 box-content"
                      >
                        Tech
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-palette-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Influencer & Digital Creator"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Influencer & Digital Creator
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-file-text-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Business"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Business
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-pencil-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Education"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Education
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-movie-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Entertainment"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Entertainment
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-cake-3-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Food & Beverage"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Food & Beverage
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-plane-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Travel & Tourism"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Travel & Tourism
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-heart-pulse-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Health & Wellness"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Health & Wellness
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-hand-heart-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Non-Profit"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Non-Profit
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-magic-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Fashion & Beauty"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Fashion & Beauty
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-scales-3-fill !text-xl"></i>
                        }
                        variant="bordered"
                        value="Government"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Government
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-function-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Other"
                        size="sm"
                        radius="full"
                        className="w-auto px-4 py-1 box-content"
                      >
                        Other
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center items-center gap-10">
                <Input
                  placeholder="Password"
                  size="sm"
                  id="email-input"
                  onChange={handlePasswordChange}
                  isInvalid={isPasswordInvalid}
                  color={
                    isPasswordInvalid
                      ? "danger"
                      : inputs.password === ""
                      ? "default"
                      : "success"
                  }
                  errorMessage={
                    isPasswordInvalid &&
                    "Password must be at least 8 characters"
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
