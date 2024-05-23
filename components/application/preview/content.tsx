import { Avatar, Button } from "@nextui-org/react";
import { HeaderCardProps } from "../links/links-card";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { createClient } from "@/utils/supabase/components";
import axios from "axios";
import { ProfileDataProps } from "@/pages/admin";

interface PreviewProps {
  content: HeaderCardProps[];
  profileData: ProfileDataProps;
}

export const PreviewContent: React.FC<PreviewProps> = ({
  content,
  profileData,
}) => {
  const validateUrl = (url: string) => {
    const pattern = /^(https?:\/\/)/i;
    return pattern.test(url) ? url : `http://${url}`;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center w-full">
        <Avatar
          name={profileData.profileTitle[0]?.toUpperCase() || "@"}
          className="w-20 h-20 text-3xl text-white bg-black mb-2"
          src={profileData.avatarUrl}
        />
        <span className="text-default-900 font-bold">
          {profileData.profileTitle || "@username"}
        </span>
        <span className="text-xs text-default-500">
          {profileData.bio || "your bio"}
        </span>
      </div>
      {content.map((item, index) => (
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
