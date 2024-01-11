import { Switch, SwitchProps } from "@nextui-org/react";
import { useTheme } from "next-themes";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";

export const ThemeSwitch = ({
}) => {

	const { theme, setTheme } = useTheme();


	const handleClick = () => {
		theme === "light" ? setTheme("dark") : setTheme("light");
	}

	return (
	<Switch
      defaultSelected
      size="lg"
      color="primary"
      startContent={<SunFilledIcon size={22}/>}
      endContent={<MoonFilledIcon size={22}/>}
			onClick={handleClick}
    >
    </Switch>
	);
};
