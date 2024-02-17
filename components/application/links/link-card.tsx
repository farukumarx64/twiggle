import { Switch } from "@nextui-org/react";

interface HeaderCardProps {
  header: string;
  active: boolean;
}
export type SetHeaderCardProps = React.Dispatch<React.SetStateAction<HeaderCardProps>>;
export const HeaderCard: React.FC<HeaderCardProps> = ({header, active}) => {
  return (
    
      <div className="md:max-w-xl md:p-6 box-content h-20 border-1 flex justify-between items-center rounded-3xl">
          <div id="drag-icon">
            <i className="ri-draggable"></i>
          </div>
          <div>
            <span className="text-default-500">{header ? header : "Headline title"}</span>
            <i className="ri-edit-2-line"></i>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Switch isSelected={active} size="sm"/>
            <i className="ri-delete-bin-line text-lg"></i>
          </div>
    </div>
  )
}