import { Avatar, Button } from "@nextui-org/react";
import { HeaderCardProps } from "../links/links-card";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { createClient } from "@/utils/supabase/components";

interface PreviewProps {
  userID: string;
}

export const PreviewContent: React.FC<PreviewProps> = ({ userID }) => {
  const supabase = createClient();

  const [contents, setContents] = useState<HeaderCardProps[]>([]);
  const [profileTitle, setProfileTitle] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        const { data, error } = await supabase
          .from("headers")
          .select()
          .eq("user_id", userID); // Correct

        if (error) {
          console.error("Error fetching user header:", error);
        } else {
          console.log(data);
          data.forEach((content) => {
            setContents((prevContents) => [
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
    fetchPreviewData();
  }, [supabase, userID]);

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("user_id", userID); // Correct

        if (data && data.length > 0) {
          console.log(data);
          setBio(data[0].bio || "");
          setProfileTitle(data[0].fullname || "");
          setAvatar(data[0].profile_pic_url || "");
          setAvatarUrl(
            data[0].profile_pic_url === null
              ? ""
              : `${process.env.NEXT_PUBLIC_SUPABASE_DB_URL}/storage/v1/object/public/${data[0].profile_pic_url}`
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [supabase, userID]);
  return (
    <div className="w-full">
            <div className="flex flex-col justify-center items-center w-full">
              <Avatar
                name={profileTitle[0]?.toUpperCase() || "@"}
                className="w-20 h-20 text-3xl text-white bg-black mb-2"
                src={avatarUrl}
              />
              <span className="text-black font-bold">
                {profileTitle || "@username"}
              </span>
              <span className="text-xs text-default-500">
                {bio || "your bio"}
              </span>
            </div>
            {contents.map((item, index) => (
              <div key={item.id} className="my-2 w-full">
                {item.active ? (item.link ? (
                  <Button radius="sm" size="lg" fullWidth color="secondary">
                  <NextLink href={"/login"} target="_blank">
                    {item.header}
                  </NextLink>
                </Button>
                ) : (
                  <span className="w-full flex items-center justify-center">{item.header}</span>
                )) : null}
              </div>
            ))}
          </div>
  );
};
