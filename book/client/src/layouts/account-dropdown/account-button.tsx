import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";

const AccountDropdownAccountButton: FC<Props> = ({ isActive = false, isDisabled = false }) => (
	<Button
		text="My Account"
		disabled={isDisabled}
		ariaLabel="My Account"
		textClassName="!text-md"
		transparent={!isActive}
		leftIcon={className => <UserCircleIcon className={`${className} w-7 h-7`} />}
		className="w-full !justify-start !rounded-none !shadow-none pl-6 !h-[3rem] disabled:opacity-50 disabled:bg-transparent"
	/>
);

interface Props {
	isActive?: boolean;
	isDisabled?: boolean;
}

export default AccountDropdownAccountButton;
