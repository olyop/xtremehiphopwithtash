import ArrowSmallLeftIcon from "@heroicons/react/24/outline/ArrowSmallLeftIcon";
import { FC, createElement } from "react";
import { useNavigate } from "react-router-dom";

import HeaderButton from "./header-button";

const HeaderBackButton: FC = () => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<HeaderButton
			text="Back"
			transparent
			isActive={false}
			ariaLabel="Back"
			onClick={handleBack}
			leftIcon={className => <ArrowSmallLeftIcon className={className} />}
		/>
	);
};

export default HeaderBackButton;
