import React from "react";
import ICON_LINKS from "./constants";

interface AppIconProps {
  icon: string;
}

export const AppIcon: React.FC<AppIconProps> = ({icon}) => {
  const iconHtml = ICON_LINKS.get(icon);
  return (
    <div
      className='w-auto h-fit'
    >
      <div dangerouslySetInnerHTML={{ __html: iconHtml }} />
    </div>
  );
};
