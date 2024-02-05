import Bars3Icon from "@heroicons/react/20/solid/Bars3Icon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, createElement } from "react";

import HeaderButton from "./header-button";

const HeaderMenuButton: FC<Props> = ({ isMenuOpen, onMenuOpen, onMenuClose }) => {
	const handleClick = () => {
		if (isMenuOpen) {
			onMenuClose();
		} else {
			onMenuOpen();
		}
	};

	return (
		<HeaderButton
			text="Menu"
			isActive={isMenuOpen}
			onClick={handleClick}
			ariaLabel="Open Menu"
			leftIcon={className => (isMenuOpen ? <XMarkIcon className={className} /> : <Bars3Icon className={className} />)}
		/>
	);
};

interface Props {
	isMenuOpen: boolean;
	onMenuOpen: () => void;
	onMenuClose: () => void;
}

export default HeaderMenuButton;
