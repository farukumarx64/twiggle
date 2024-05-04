// components/AppearanceCard.tsx
import { useEffect, useState } from "react";
import { Avatar, Button, Input, Textarea } from "@nextui-org/react";
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
  const [avatar, setAvatar] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

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
  }, [dispatch, supabase, userID]);

  const handleProfileTitleChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      try {
        const extension = file.name.split(".").pop(); // Extract file extension
        const newName = profileTitle.replace(/\s+/g, "-"); // Set the new file name here
        const newFileName = `${newName}.${extension}`; // Combine new file name with original extension

        // Delete the existing file
        if (avatar) {
          const { data: deleteData, error: deleteError } =
            await supabase.storage
              .from("avatars")
              .remove([`${userID}/${avatar}`]);

          if (deleteError) {
            throw deleteError;
          }

          console.log("File deleted successfully:", deleteData);
        }

        // Upload the new file
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`${userID}/${newFileName}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.log(error);
          setAvatarUrl(""); // Set avatarUrl to empty string on error
        } else {
          console.log(data);

          // Update profile_pic_url
          await supabase
            .from("users")
            .update({ profile_pic_url: data?.fullPath })
            .eq("user_id", userID);

          // Update avatarUrl
          setAvatarUrl(
            `${process.env.NEXT_PUBLIC_SUPABASE_DB_URL}/storage/v1/object/public/${data?.fullPath}`
          );
        }
      } catch (error) {
        console.log("Error uploading avatar", error);
        setAvatarUrl(""); // Set avatarUrl to empty string on error
      }
    } else {
      console.error("No file selected.");
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      // Delete the file from storage
      console.log(userID, avatar);
      const { data, error } = await supabase.storage
        .from("avatars")
        .remove([avatar]);

      if (error) {
        throw error;
      }

      console.log("File deleted successfully:", data, error);
      setAvatarUrl("");

      // Update profile_pic_url to null or empty string in Supabase user table
      const { data: updateData, error: updateError } = await supabase
        .from("users")
        .update({ profile_pic_url: null }) // Or an empty string if needed
        .eq("user_id", userID);

      if (updateError) {
        throw updateError;
      }

      console.log("Profile pic URL updated successfully:", updateData);
    } catch (error) {
      console.error("Error removing avatar:", error);
    }
  };

  return (
    <div className="w-full md:max-w-xl p-6 border-1 flex flex-col justify-center items-center rounded-3xl gap-1">
      <div className="flex w-full justify-between items-center gap-3">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <Avatar
            name={profileTitle[0]?.toUpperCase() || "@"}
            className="w-20 h-20 text-3xl text-white bg-black mb-2"
            src={avatarUrl}
          />
          <input
            id="avatar-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </label>
        <div className="flex flex-col w-full gap-3">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <Button
              color="secondary"
              radius="full"
              className="w-full"
              onClick={() => {
                const fileInput = document.getElementById("avatar-upload");
                if (fileInput) {
                  fileInput.click();
                }
              }}
            >
              Pick an image
            </Button>
            <input
              id="avatar-upload"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
          <Button
            color="secondary"
            variant="light"
            className="shadow-md"
            radius="full"
            onPress={handleRemoveAvatar}
          >
            Remove
          </Button>
        </div>
      </div>

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
