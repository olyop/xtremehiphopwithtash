import ArrowSmallLeftIcon from "@heroicons/react/24/outline/ArrowSmallLeftIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";

const BackButton: FC<Props> = ({ onClick, invisible }) => (
	<Button
		transparent
		text="Back"
		onClick={onClick}
		ariaLabel="Go Back"
		leftIcon={className => <ArrowSmallLeftIcon className={className} />}
		className={`h-full items-center gap-1 rounded-none md:gap-4 ${invisible ? "invisible" : "visible"}`}
	/>
);

interface Props {
	onClick?: () => void;
	invisible: boolean;
}

export default BackButton;
