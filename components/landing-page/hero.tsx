import { title, subtitle } from "@/components/primitives";
import { Button, Input, Image, Divider } from "@nextui-org/react";
import newsletter from "#/email/newsletter";
import { useState } from "react";
import { CheckIcon } from "../icons/CheckIcon";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState<any>(null);

  function isEmailValid(email: string): boolean {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return !emailRegex.test(email);
  }

  function removeSpacing(email: string) {
    const cleanedEmail = email.replace(/\s/g, "");

    return cleanedEmail;
  }
  async function handleSubmit() {
    const emailInput: HTMLInputElement | null = document.getElementById(
      "email-input"
    ) as HTMLInputElement | null;
    if (email === "") {
      setSuccess("empty");
      return;
    }
    console.log(isEmailValid(email));
    if (isEmailValid(email)) {
      setSuccess("wrong");
      return;
    }
    const isSuccessful = await newsletter(email);
    setSuccess(isSuccessful);
    console.log(isSuccessful);
    if (isSuccessful === true) {
      setEmail("");
      emailInput !== null ? (emailInput.value = "") : "";
    }
  }

  function handleChange(event: any) {
    setEmail(removeSpacing(event.target.value.toLowerCase()));
  }
  return (
    <>
      <section className="flex items-center justify-center py-8 md:py-10 gap-10 max-lg:flex-wrap">
        <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-xl text-start justify-center">
            <div className="my-3">
              <h1
                className={`${title({
                  fullWidth: true,
                  size: "lg",
                })} inline leading-normal`}
              >
                Your Personal Link{" "}
              </h1>
              <h1
                className={`${title({
                  size: "lg",
                })} text-signature inline leading-normal`}
              >
                Ecosystem&nbsp;
              </h1>
            </div>
            <p className={`${subtitle()} my-6 text-default-500`}>
              Twiggle is your digital trailblazer, simplifying the way you
              present yourself online. Create a personalized hub with Twiggle
              and effortlessly share your digital presence through a single,
              captivating link.
            </p>
          </div>

          <div className="flex items-center gap-3 justify-between self-start flex-wrap w-full">
            <Input
              placeholder="yourname"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-base">Twgl.link/</span>
                </div>
              }
              size="md"
              onChange={handleChange}
              id="email-input"
              className="w-80"
              classNames={{
                input: '!pl-[2px] text-base'
              }}
            />

            <Button
              id="subscribe"
              radius="full"
              size="lg"
              onPress={handleSubmit}
              className="max-w-40 box-border mr-14 bg-[#a1acfb]"
            >
              Craft Your Twiggle
            </Button>
          </div>
          <div className="flex items-center justify-start w-full gap-x-6 gap-y-4 flex-wrap">
            <div className="flex text-default-500">
              <CheckIcon />
              No credit card required.
            </div>
            <div className="flex text-default-500">
              <CheckIcon />
              Ease of use.
            </div>
            <div className="flex text-default-500">
              <CheckIcon />
              Free hosting.
            </div>
          </div>
          <div className="flex w-full">
            {success === true && (
              <div className=" flex flex-wrap">
                {" "}
                <p className="text-default-400 italic text-md self-start">
                  Email submitted successfully!
                </p>
              </div>
            )}
            {success === false && (
              <div className=" flex flex-wrap">
                {" "}
                <p className="italic text-md self-start text-warning-500">
                  Email has already subscribed to the newsletter!
                </p>
              </div>
            )}
            {success === "empty" && (
              <div className=" flex flex-wrap">
                {" "}
                <p className="text-red-500 italic text-md self-start">
                  Please enter an email!
                </p>
              </div>
            )}
            {success === "wrong" && (
              <div className=" flex flex-wrap">
                {" "}
                <p className="italic text-md self-start text-warning-500">
                  Please enter a valid email!
                </p>
              </div>
            )}
            {success === undefined && (
              <div className=" flex flex-wrap">
                {" "}
                <p className="italic text-md self-start text-issue-red">
                  There is an issue. Please try again!
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="object-contain flex max-w-3xl">
          <Image
            src="/images/app-pic_no-bg.png"
            alt="Product Showcase"
            width={775}
            height={500}
          />
        </div>
      </section>
      <Divider orientation="horizontal" />
    </>
  );
}
