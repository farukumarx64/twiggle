import { Head } from "@/layouts/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Auth from "./auth";
import { createClient } from "@/utils/supabase/components";

export default function SignUpPage() {
  const [image, setImage] = React.useState(Math.ceil(Math.random() * 12));
  const [data, setData] = useState<any>();
  const supabase = createClient();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("the response: ", user);
      setData(user);
    };
    checkLoggedIn();
  }, [supabase, supabase.auth]);

  return (
    <div className="relative flex flex-col h-screen">
      <Head icon="logo-alt" title="Log in or Sign Up | Twiggle" />
      <main className="flex justify-center">
        <section className="flex justify-center items-between w-full h-screen">
          <Auth component="register" data={data} />
          <div className="hidden lg:flex full-w">
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
