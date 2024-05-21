import { updateUserInfo } from "@/utils/state/actions/userActions";
import { createClient } from "@/utils/supabase/components";
import { Input, Switch } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export interface HeaderCardProps {
  header: string;
  id: string;
  metadata?: string;
  active: boolean;
  link: boolean;
}
export type SetHeaderCardProps = React.Dispatch<
  React.SetStateAction<HeaderCardProps[]>
>;

export const HeaderCard: React.FC<{
  state: HeaderCardProps;
  setState: (updatedState: HeaderCardProps) => void;
  onDelete: () => void;
}> = ({ state, setState, onDelete }) => {
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const dispatch = useDispatch();
  const supabase = createClient();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      header: event.target.value,
    });
    dispatch(updateUserInfo({ header: [state] }));
    updateHeaderContent(state.id, event.target.value);
  };

  const updateHeaderContent = async (id: string, header: string) => {
    const { error } = await supabase
      .from("headers")
      .update({ content: header })
      .eq("header_id", id);

    if (error) {
      console.error("Error updating header content", error);
    } else {
      console.log("header content successfully updated");
    }
  };

  const updateHeaderActive = async (id: string, isActive: boolean) => {
    const { error } = await supabase
      .from("headers")
      .update({ active: isActive })
      .eq("header_id", id);

    if (error) {
      console.error("Error updating header active", error);
    } else {
      console.log("header active successfully updated");
    }
  };

  const handleActive = () => {
    updateHeaderActive(state.id, !state.active);
    setState({
      ...state,
      active: !state.active,
    });
  };

  const handleDelete = () => {
    onDelete();
  };
  return (
    <div className="md:max-w-xl md:p-6 box-content h-20 border-1 flex justify-between items-center rounded-3xl">
      <div id="drag-icon">
        <i className="ri-draggable"></i>
      </div>
      <div>
        {state.link === true && (
          <Input
            placeholder={state.metadata ? state.metadata : "No site info"}
            className="text-default-500"
            classNames={{
              inputWrapper: [
                "bg-transparent hover:!bg-transparent focus-within:!bg-transparent",
                "shadow-none",
              ],
              innerWrapper: "bg-transparent",
              input: "max-w-full",
            }}
            isReadOnly
          />
        )}
        <Input
          placeholder={
            state.header !== ""
              ? state.header
              : state.link === false
              ? "Headline title"
              : "link here"
          }
          value={state.header !== undefined ? state.header : undefined}
          className="text-default-500"
          classNames={{
            inputWrapper: [
              "bg-transparent hover:!bg-transparent focus-within:!bg-transparent",
              "shadow-none",
            ],
            innerWrapper: "bg-transparent",
            input: "max-w-full",
          }}
          onChange={handleChange}
          endContent={isReadOnly ? <i className="ri-edit-2-line"></i> : ""}
        />
      </div>
      <div className="flex flex-col justify-center gap-5 items-center">
        <Switch isSelected={state.active} size="sm" onClick={handleActive} />
        <i className="ri-delete-bin-line text-xl" onClick={handleDelete}></i>
      </div>
    </div>
  );
};
