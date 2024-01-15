import { Auth } from "+/auth";
import { Head } from "@/layouts/head";
import Image from "next/image";
import React from "react";

export default function SignUpPage() {
  const [image, setImage] = React.useState(Math.ceil(Math.random() * 12));

  return (
    <div className="relative flex flex-col h-screen">
      <Head icon="logo-alt" title="Login in or Sign Up | Twiggle" />
      <main className="flex justify-center">
        <section className="flex justify-center items-between w-full h-screen">
          <Auth component="register"/>
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
