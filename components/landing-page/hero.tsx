import { title, subtitle } from "@/components/primitives";
import { Button, Input, Image, Divider } from "@nextui-org/react";
import { useState } from "react";
import { CheckIcon } from "../icons/CheckIcon";
import { useRouter } from "next/router";

export default function Hero() {
  const [username, setUsername] = useState("");
  const router = useRouter()

  function removeSpacing(text: string) {
    const cleanedUsername = text.replace(/\s/g, "");

    return cleanedUsername;
  }
  async function handleSubmit() {
    router.push(`/register?username=${username}`)
  }

  function handleChange(event: any) {
    setUsername(removeSpacing(event.target.value.toLowerCase()));
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
