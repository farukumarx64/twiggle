import { Head } from "@/layouts/head";
import Image from "next/image";
import React from "react";
import Auth from "./auth";

export default function LoginPage() {
  const [image, setImage] = React.useState(Math.ceil(Math.random() * 12));

  return (
    <div className="relative flex flex-col h-screen">
      <Head icon="logo-alt" title="Log in or Sign Up | Twiggle" />
      <main className="flex justify-center">
        <section className="flex justify-center items-between w-full h-screen">
          <Auth component="login" />
          <div className="hidden lg:flex h-screen box-content">
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
