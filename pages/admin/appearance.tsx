import { AppearanceSection } from "+/application/appearance/appearance-section";
import { Navbar } from "+/application/navbar";
import { Preview } from "+/application/preview";
import { Head } from "@/layouts/head";
import axios from "axios";
import router from "next/router";
import { useState, useEffect } from "react";
import { ProfileDataProps } from ".";
import { createClient } from "@/utils/supabase/components";
import { HeaderCardProps } from "+/application/links/links-card";

export default function Appearance() {
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileDataProps>({
    bio: "",
    avatar: "",
    avatarUrl: "",
    profileTitle: "",
    username: "",
  });
  const [content, setContent] = useState<HeaderCardProps[]>([]);
  const [userData, setUserData] = useState();
  const [userID, setUserID] = useState("");
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
          setUserID(response.data.session.id);
          setUserData(response.data.session.user_metadata);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn();
  }, []); // Run once when component mounts

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchHeaderData = async () => {
      try {
        const { data, error } = await supabase
          .from("headers")
          .select()
          .eq("user_id", userID); // Correct
        console.log("header data", data);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("user_id", userID);

        if (data && data.length > 0) {
          setProfileData((prevInputs: any) => ({
            ...prevInputs,
            bio: data[0].bio || "",
            profileTitle: data[0].fullname,
            avatar: data[0].profile_pic_url,
            username: data[0].username,
            avatarUrl:
              data[0].profile_pic_url === null
                ? ""
                : `${process.env.NEXT_PUBLIC_SUPABASE_DB_URL}/storage/v1/object/public/${data[0].profile_pic_url}`,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [supabase, userID]);
  return (
    <>
      <Head icon="logo-alt" title="Twiggle Admin" />
      <Navbar option="Appearance" userID={userID} profileData={profileData} />
      <div className="flex">
        <AppearanceSection userID={userID} />
        {isWideScreen && (
          <Preview content={content} profileData={profileData} />
        )}
      </div>
    </>
  );
}
