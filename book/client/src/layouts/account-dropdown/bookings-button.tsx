import CalendarOutlineIcon from "@heroicons/react/24/outline/CalendarIcon";
import CalendarSolidIcon from "@heroicons/react/24/solid/CalendarIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";

const AccountDropdownBookingsButton: FC<Props> = ({ isActive = false, isDisabled = false }) => (
	<Button
		text="My Bookings"
		ariaLabel="My Bookings"
		transparent={!isActive}
		disabled={isDisabled}
		textClassName="!text-md"
		leftIcon={className =>
			isActive ? (
				<CalendarSolidIcon className={`${className} w-7 h-7`} />
			) : (
				<CalendarOutlineIcon className={`${className} w-7 h-7`} />
			)
		}
		className="w-full !justify-start !rounded-none !shadow-none pl-6 !h-[3rem] disabled:opacity-50 disabled:bg-transparent"
	/>
);

interface Props {
	isActive?: boolean;
	isDisabled?: boolean;
}

export default AccountDropdownBookingsButton;
