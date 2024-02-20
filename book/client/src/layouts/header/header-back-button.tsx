import ArrowSmallLeftIcon from "@heroicons/react/24/solid/ArrowSmallLeftIcon";
import { FC, createElement } from "react";
import { useNavigate } from "react-router-dom";

import HeaderButton from "./header-button";

const HeaderBackButton: FC<Props> = ({ onClick }) => {
	const navigate = useNavigate();

	const handleBack = () => {
		onClick();

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

interface Props {
	onClick: () => void;
}

export default HeaderBackButton;
