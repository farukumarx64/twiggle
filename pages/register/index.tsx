import { Head } from "@/layouts/head";
import Image from "next/image";
import React, { useEffect } from "react";
import Auth from "./auth";
import { useRouter } from "next/router";
import axios from "axios";

export default function SignUpPage() {
  const [image, setImage] = React.useState(Math.ceil(Math.random() * 12));
  const router = useRouter();
  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/api/login/check");
        if (response.data.session) {
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, [router]); // Run once when component mounts

  return (
    <div className="relative flex flex-col h-screen">
      <Head icon="logo-alt" title="Log in or Sign Up | Twiggle" />
      <main className="flex justify-center">
        <section className="flex justify-center items-between w-full h-screen">
          <Auth component="register"/>
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
