// components/AppearanceCard.tsx
import { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "@/utils/state/actions/userActions";
import { createClient } from "@/utils/supabase/components";

interface AppearanceProps {
  userID: string;
}

export const AppearanceCard: React.FC<AppearanceProps> = ({ userID }) => {
  const dispatch = useDispatch();
  const supabase = createClient();

  const [profileTitle, setProfileTitle] = useState("");
  const [bio, setBio] = useState("");

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
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [dispatch, supabase, userID]);

  const handleProfileTitleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileTitle(e.target.value);
    dispatch(updateUserInfo({ profileTitle: e.target.value }));
    const { error } = await supabase
      .from("users")
      .update({ fullname: e.target.value })
      .eq("user_id", userID);
  };

  const handleBioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
    dispatch(updateUserInfo({ bio: e.target.value }));
    const { error } = await supabase
      .from("users")
      .update({ bio: e.target.value })
      .eq("user_id", userID);
  };

  return (
    <div className="w-full md:max-w-xl p-6 border-1 flex flex-col justify-center items-center rounded-3xl">
      {/* Avatar and buttons */}

      <div className="w-full flex flex-col gap-3 mt-9 mb-3">
        <Input
          label="Profile Title"
          value={profileTitle}
          onChange={handleProfileTitleChange}
        />
        <Textarea label="Bio" value={bio} onChange={handleBioChange} />
      </div>

      {/* Divider and social icons */}
    </div>
  );
};
