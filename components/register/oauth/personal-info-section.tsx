import { categories } from "@/config/categories";
import { updateSignUpInfo } from "@/utils/state/actions/signUpActions";
import { Button, Input, Progress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/utils/state/reducers/reducers";
import { createClient } from "@/utils/supabase/components";

export interface PersonalInfoState {
  userName: string;
  category: string;
  activeCategory: string;
  activeSubCategory: string;
}

export type SetPersonalInfoState = React.Dispatch<
  React.SetStateAction<PersonalInfoState>
>;

export const PersonalInfoComponent: React.FC<{
  state: PersonalInfoState;
  setState: SetPersonalInfoState;
  data: any;
  handleComponentChange: (comp: string) => void;
}> = ({ state, setState, handleComponentChange, data }) => {
  const supabase = createClient();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.signup);
  const [loading, setLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState<any>(undefined);
  // ... code for the personal information component
  const isPersonalInfoButtonDisabled = !state.userName || !state.activeCategory;

  useEffect(() => {
    const getData = () => {
    };
    getData();
  }, [data]);

  const handleCategoryChange = (id: string) => {
    const button = document.getElementById(id);
    setState((prevInputs: any) => ({
      ...prevInputs,
      category: button?.textContent,
    }));
  };
  const handleActiveCategory = (id: string) => {
    handleCategoryChange(id);
    setState((prevInputs: any) => ({ ...prevInputs, activeCategory: id }));
    dispatch(
      updateSignUpInfo({
        category: id,
      })
    );
  };
  const handleActiveSubCategory = (id: string) => {
    setState((prevInputs: any) => ({ ...prevInputs, activeSubCategory: id }));
    dispatch(
      updateSignUpInfo({
        subcategory: id,
      })
    );
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevInputs: any) => ({
      ...prevInputs,
      userName: e.target.value,
    }));
    dispatch(
      updateSignUpInfo({
        fullname: e.target.value,
      })
    );
  };

  const handleContinue = async () => {
    setLoading(true);
    try {
      // Insert user data into Supabase database
      const signUpData = {
        user_id: data.id,
        email: data.email,
        username: user.username,
        fullname: state.userName || data.user_metadata.full_name,
        profile_pic_url: "", // You can update this later
        bio: "", // You can update this later
        // Other user data
      };
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert([
          {
            ...signUpData,
          },
        ]);

      if (userError) {
        console.error("Error inserting user data:", userError);
      }

      // Navigate to the next step/component
      handleComponentChange("confirmation");
    } catch (error: any) {
      // Handle error response
      console.error("Error signing up:", error.response.data.error);
      setSignUpSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center md:pt-10 pt-40 mb-20">
      <div className="lg:w-[640px] box-border px-10">
        <div className="flex flex-col justify-center items-start mb-12 gap-4">
          <Progress color="secondary" aria-label="Loading..." value={70} />
          <h1 className=" text-3xl font-bold md:text-5xl">
            Tell us about yourself
          </h1>
          <span className=" text-default-500">
            This will personalize your Twiggle experience.
          </span>
          <Input
            labelPlacement="inside"
            label="Tell us your name"
            value={data.user_metadata.full_name}
            onChange={handleNameChange}
          />
          {state.userName.length > 2 && (
            <div className="mt-5 flex flex-col gap-5">
              <span className="font-bold">
                Select one category that best describes your Twiggle:
              </span>
              <div className="flex gap-2 flex-wrap">
                {Object.values(categories).map((item, index) => (
                  <Button
                    startContent={<i className={`${item.icon} !text-xl`}></i>}
                    variant="bordered"
                    value={item.category}
                    key={item.id}
                    size="sm"
                    radius="full"
                    id={item.id}
                    className={`!w-auto px-4 py-1 box-content text-sm ${
                      state.activeCategory === item.id
                        ? `bg-[#a1acfb] border-[#a1acfb]`
                        : ""
                    }`}
                    onPress={() => {
                      handleActiveCategory(item.id);
                    }}
                  >
                    {item.category}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {state.category && state.userName.length > 2 && (
            <div className="mt-5 flex flex-col gap-5">
              <span className="font-bold">
                Pick your {state.category} category (optional):
              </span>
              <div className="flex gap-2 flex-wrap">
                {categories[state.category].values.map((item, index) => (
                  <Button
                    variant="bordered"
                    key={item}
                    id={item}
                    size="sm"
                    radius="full"
                    className={`!w-auto px-3 py-1 text-sm ${
                      state.activeSubCategory === item
                        ? ` bg-teal-500 border-teal-500 text-white`
                        : ""
                    }`}
                    onPress={() => {
                      handleActiveSubCategory(item);
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center gap-10">
          {signUpSuccess === false && (
            <span className="text-danger-600">
              Error signing up! Please try again!
            </span>
          )}
          <Button
            radius="full"
            size="lg"
            isDisabled={isPersonalInfoButtonDisabled || loading}
            color={
              isPersonalInfoButtonDisabled || loading ? "default" : "secondary"
            }
            fullWidth
            className=" box-content px-0 max-w-3xl md:max-w-xl"
            onPress={() => {
              handleContinue();
            }}
          >
            {loading ? "Loading..." : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};
