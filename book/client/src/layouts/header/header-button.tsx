import { FC, createElement } from "react";

import Button, { ButtonProps } from "../../components/button";

const iconClassName = "rounded-full";
const leftIconClassName = `${iconClassName} !h-6 !w-6 tiny:!w-8 tiny:!h-8`;
const rightIconClassName = `${iconClassName} !h-4 !w-4 tiny:!w-7 tiny:!h-7`;

const HeaderButton: FC<Props> = ({ isActive, className, leftIcon, rightIcon, ...props }) => (
	<Button
		transparent
		leftIcon={() => (leftIcon ? leftIcon(leftIconClassName) : undefined)}
		rightIcon={() => (rightIcon ? rightIcon(rightIconClassName) : undefined)}
		textClassName="text-xs tiny:text-md"
		className={`tiny:py-2 tiny:pl-3 tiny:pr-4 tiny:!gap-2 !h-auto !w-auto !gap-1.5 rounded-full border py-2 pl-2 pr-2 hover:border-gray-300 ${
			isActive ? "!border-gray-300" : "border-transparent"
		} ${className}`}
		{...props}
	/>
);

interface Props extends ButtonProps {
	isActive: boolean;
}

export default HeaderButton;
