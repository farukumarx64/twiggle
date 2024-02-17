import { Input, Switch } from "@nextui-org/react";
import { useState } from "react";

export interface HeaderCardProps {
  header: string;
  id: string;
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

  const handleHeaderClick = () => {
    setIsReadOnly(false);
    console.log(state)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      header: event.target.value,
    });
  }

  const handleActive = () => {
    setState({
      ...state,
      active: !state.active,
    })
  }

  const handleDelete = () => {
    onDelete();
  }
  return (
    <div className="md:max-w-xl md:p-6 box-content h-20 border-1 flex justify-between items-center rounded-3xl">
      <div id="drag-icon">
        <i className="ri-draggable"></i>
      </div>
      <div>
        <Input
          placeholder={state.header !== "" ? state.header : "Headline title"}
          className="text-default-500"
          classNames={{
            inputWrapper: [
              "bg-transparent hover:!bg-transparent focus-within:!bg-transparent",
              "shadow-none",
            ],
            innerWrapper: "bg-transparent",
            input: "max-w-full"
          }}
          isReadOnly={isReadOnly}
          onClick={handleHeaderClick}
          onChange={handleChange}
          endContent={isReadOnly ? <i className="ri-edit-2-line"></i> : ''}
          onFocusChange={()=>{setIsReadOnly(true)}}
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <Switch isSelected={state.active} size="sm" onClick={handleActive}/>
        <i className="ri-delete-bin-line text-lg" onClick={handleDelete}></i>
      </div>
    </div>
  );
};
