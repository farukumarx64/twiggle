import { AccountSection } from "+/application/account/account-section";
import { Navbar } from "+/application/navbar";
import { Head } from "@/layouts/head";
import axios from "axios";
import router from "next/router";
import { useState, useEffect } from "react";

export default function Account() {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [userData, setUserData] = useState();
  const [userID, setUserID] = useState('');

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
          console.log(response.data.session.id)
          setUserID(response.data.session.id)
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
      <Navbar option="Appearance" userData={userData} />
      <div className="flex">
        <AccountSection userID={userID} />
      </div>
    </>
  );
}
