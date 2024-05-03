import { Navbar } from "+/application/navbar";
import { SettingSection } from "+/application/settings/settings-section";
import { Preview } from "+/application/preview";
import { Head } from "@/layouts/head";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";

export default function Settings() {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 768);
    };
    // Set initial value on component mount
    handleResize();
    // Add event listener to update state when window is resized
    window.addEventListener("resize", handleResize);
    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Check if user is already logged in
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/api/login/check");
        if (response.data.session === null) {
          router.push("/login");
        } else {
          console.log(response.data.session)
          setUserData(response.data.session.user_metadata)
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, []); // Run once when component mounts
  return (
    <>
      <Head icon="logo-alt" title="Twiggle Admin" />
      <Navbar option="Settings" userData={userData} />
      <div className="flex">
        <SettingSection />
        {isWideScreen && <Preview />}
      </div>
    </>
  );
}
