import { Avatar, Button } from "@nextui-org/react";
import { HeaderCardProps } from "../links/links-card";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { createClient } from "@/utils/supabase/components";
import axios from "axios";

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
          .eq("user_id", userID);

        if (error) {
          console.error("Error fetching user header:", error);
        } else {
          const fetchedContents = await Promise.all(
            data.map(async (content) => {
              let header = content.content;
              return {
                header,
                id: content.header_id,
                active: content.active,
                link: content.isLink,
              };
            })
          );
          setContents(fetchedContents);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchPreviewData();
  }, [supabase, userID]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("user_id", userID);

        if (data && data.length > 0) {
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

  const validateUrl = (url: string) => {
    const pattern = /^(https?:\/\/)/i;
    return pattern.test(url) ? url : `http://${url}`;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center w-full">
        <Avatar
          name={profileTitle[0]?.toUpperCase() || "@"}
          className="w-20 h-20 text-3xl text-white bg-black mb-2"
          src={avatarUrl}
        />
        <span className="text-default-900 font-bold">
          {profileTitle || "@username"}
        </span>
        <span className="text-xs text-default-500">{bio || "your bio"}</span>
      </div>
      {contents.map((item, index) => (
        <div key={item.id} className="my-2 w-full">
          {item.active ? (
            item.link ? (
              <NextLink href={validateUrl(item.header)} target="_blank">
                <Button radius="sm" size="lg" fullWidth color="secondary">
                  <span className="flex overflow-auto flex-wrap">
                  {item.header ? (
                      <AsyncHeaderTitle link={item.header} />
                    ) : (
                      "Loading..."
                    )}
                  </span>
                </Button>
              </NextLink>
            ) : (
              <span className="w-full flex items-center justify-center">
                {item.header}
              </span>
            )
          ) : null}
        </div>
      ))}
    </div>
  );
};

const AsyncHeaderTitle: React.FC<{ link: string }> = ({ link }) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const fetchTitle = async () => {
      const resolvedTitle = await headerTitle(link);
      setTitle(resolvedTitle);
    };

    const headerTitle = async (link: string) => {
      try {
        const response = await axios.get(
          `/api/metadata?url=${encodeURIComponent(validateUrl(link))}`
        );
        if (response.data.title) {
          return response.data.title;
        }
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
      return link;
    };

    fetchTitle();
  }, [link]);

  const validateUrl = (url: string) => {
    const pattern = /^(https?:\/\/)/i;
    return pattern.test(url) ? url : `http://${url}`;
  };

  return <>{title || link}</>;
};
