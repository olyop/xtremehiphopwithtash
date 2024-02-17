import Bars3Icon from "@heroicons/react/20/solid/Bars3Icon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, createElement } from "react";

import { Breakpoint, useBreakpoint } from "../../hooks";
import HeaderButton from "./header-button";

const HeaderMenuButton: FC<Props> = ({ isOpen, onToggle }) => {
	const breakpoint = useBreakpoint();

	return (
		<HeaderButton
			isActive={isOpen}
			onClick={onToggle}
			ariaLabel={isOpen ? "Close menu" : "Open menu"}
			text={breakpoint === Breakpoint.TINY ? undefined : isOpen ? "Close" : "Menu"}
			leftIcon={className => (isOpen ? <XMarkIcon className={className} /> : <Bars3Icon className={className} />)}
		/>
	);
};

interface Props {
	isOpen: boolean;
	onToggle: () => void;
}

export default HeaderMenuButton;
