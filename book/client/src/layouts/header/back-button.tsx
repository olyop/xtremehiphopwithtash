import ArrowSmallLeftIcon from "@heroicons/react/24/outline/ArrowSmallLeftIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";

const BackButton: FC<PropTypes> = ({ onClick, invisible }) => (
	<Button
		transparent
		text="Back"
		onClick={onClick}
		ariaLabel="Go Back"
		leftIcon={className => <ArrowSmallLeftIcon className={className} />}
		className={`items-center gap-1 md:gap-4 h-full rounded-none ${invisible ? "invisible" : "visible"}`}
	/>
);

interface PropTypes {
	onClick?: () => void;
	invisible: boolean;
}

export default BackButton;
