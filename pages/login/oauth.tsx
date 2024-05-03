import { Head } from "@/layouts/head";
import Image from "next/image";
import React, { useEffect } from "react";
import Auth from "./auth";
import axios from "axios";
import router from "next/router";

export default function LoginPage() {
  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        console.log(code)
        const response = await axios.post("/api/login/token", {code: code});
        if (response.data.session === null) {
        } else {
          console.log(response.data.session)
          router.push("/admin");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, []); // Run once when component mounts

  return (
    <div className="relative flex flex-col h-screen">
      <Head icon="logo-alt" title="Log in or Sign Up | Twiggle" />
      
    </div>
  );
}
