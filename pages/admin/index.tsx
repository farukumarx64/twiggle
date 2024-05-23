import { HeaderCardProps } from "+/application/links/links-card";
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
  const [content, setContent] = useState<HeaderCardProps[]>([]);
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
          setUserID(response.data.session.id)
          const { data, error } = await supabase
          .from("users")
          .select()
          .eq("user_id", response.data.session.id);
          
          if (error) {
            console.error("Error fetching user data in links navbar", error)
          } else {
            setUserData(data?.[0])
          }
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, [supabase]); // Run once when component mounts

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchHeaderData = async () => {
      try {
        const { data, error } = await supabase
          .from("headers")
          .select()
          .eq("user_id", userID); // Correct
          console.log("header data", data)

        if (error) {
          console.error("Error fetching user header:", error);
        } else {
          data.forEach((content) => {
            setContent((prevContents) => [
              ...prevContents,
              {
                header: content.content,
                id: content.header_id,
                active: content.active,
                link: content.isLink,
              },
            ]);
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchHeaderData();
  }, [supabase, userID]);

  return (
    <div>
      <Head icon="logo-alt" title="Twiggle Admin" />
      <Navbar option="Links" userID={userID} />
      <div className="flex">
        <LinksSection userID={userID} content={content} setContentState={setContent}/>
        {isWideScreen && <Preview userID={userID} content={content} />}
      </div>
    </div>
  );
}
