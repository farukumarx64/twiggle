import { Divider } from "@nextui-org/react";
import { AppIcon } from "./icons/Icon";

export const Faq = () => {
  return (
    <>
      <section className="py-20 flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4">
          <span className="text-signature">FAQ</span>
          <h2 className=" md:text-4xl text-3xl font-bold">You Have Questions?</h2>
          <span className="text-default-500">Here are some FAQ&apos;s!</span>
        </div>
        <div className="flex flex-col gap-7">
          <div className=" xl:px-64">
            <div className="flex gap-3">
              <AppIcon icon="Faq" />
              <div className="flex flex-col gap-y-1">
                <h3 className="font-bold text-2xl mb-2">
                  What is Twiggle, and how does it work?
                </h3>
                <span className="flex text-default-500">
                  Twiggle is a platform that allows you to create a personalized
                  hub for your online presence. Simply sign up, customize your
                  page with links to your social media profiles, websites, or
                  other online content, and share a single Twiggle link.
                </span>
                <span className="flex text-default-500">
                  It&apos;s an easy and efficient way to present a curated
                  snapshot of your digital identity.
                </span>
              </div>
            </div>
          </div>
          <div className=" xl:px-64">
            <div className="flex gap-3">
              <AppIcon icon="Faq" />
              <div className="flex flex-col gap-y-1">
                <h3 className="font-bold text-2xl mb-2">
                  Is Twiggle free to use?
                </h3>
                <span className="flex text-default-500">
                  Yes, Twiggle offers a free version with essential features,
                  allowing users to create and customize their pages. For users
                  looking for additional customization options and advanced
                  features, Twiggle also offers premium subscription plans.
                </span>
              </div>
            </div>
          </div>
          <div className=" xl:px-64">
            <div className="flex gap-3">
              <AppIcon icon="Faq" />
              <div className="flex flex-col gap-y-1">
                <h3 className="font-bold text-2xl mb-2">
                  Can I track the performance of my Twiggle page?
                </h3>
                <span className="flex text-default-500">
                  Yes, Twiggle provides basic analytics to help you track the
                  performance of your links. You can view metrics such as the
                  number of clicks on each link, allowing you to understand your
                  audience&apos;s engagement and optimize your online strategy
                  accordingly.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Divider orientation="horizontal" />
    </>
  );
};
