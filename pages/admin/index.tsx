import { LinksSection } from "+/application/links/links-section";
import { Navbar } from "+/application/navbar";
import { Preview } from "+/application/preview";
import { Head } from "@/layouts/head";
import { createClient } from "@/utils/supabase/components";
import axios from "axios";
import router from "next/router";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [userData, setUserData] = useState();
  const [userID, setUserID] = useState('');
  const supabase = createClient();

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
          console.log(response.data,response.data.session.id, typeof response.data.session.id)
          setUserID(response.data.session.id)
          const { data, error } = await supabase
          .from("users")
          .select()
          .eq("user_id", response.data.session.id);
          setUserData(data?.[0])

          if (error) {
            console.error("Error fetching user data in links navbar", error)
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, [supabase]); // Run once when component mounts

  return (
    <div>
      <Head icon="logo-alt" title="Twiggle Admin" />
      <Navbar option="Links" userID={userID} />
      <div className="flex">
        <LinksSection userID={userID} />
        {isWideScreen && <Preview />}
      </div>
    </div>
  );
}
