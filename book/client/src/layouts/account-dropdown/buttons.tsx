import ArrowLeftEndOnRectangle from "@heroicons/react/20/solid/ArrowLeftEndOnRectangleIcon";
import ArrowLeftStartOnRectangle from "@heroicons/react/20/solid/ArrowLeftStartOnRectangleIcon";
import ArrowPathIcon from "@heroicons/react/20/solid/ArrowPathIcon";
import CalendarOutlineIcon from "@heroicons/react/24/outline/CalendarIcon";
import UserCircleOutlineIcon from "@heroicons/react/24/outline/UserCircleIcon";
import CalendarSolidIcon from "@heroicons/react/24/solid/CalendarIcon";
import UserCircleSolidIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, createElement } from "react";

import Button, { ButtonProps } from "../../components/button";

const AccountDropdownButton: FC<ButtonProps> = ({ leftIcon, rightIcon, className, ...props }) => (
	<Button
		{...props}
		leftIcon={iconClassName => (leftIcon ? leftIcon(`${iconClassName} w-7 h-7`) : undefined)}
		className={`w-full !justify-start !rounded-none !shadow-none pl-6 !h-[3rem] disabled:opacity-50 disabled:bg-transparent ${className}`}
	/>
);

export const AccountDropdownAccountButton: FC<Props> = ({ isActive = false, isDisabled = false }) => (
	<AccountDropdownButton
		text="My Account"
		disabled={isDisabled}
		ariaLabel="My Account"
		transparent={!isActive}
		leftIcon={className =>
			isActive ? <UserCircleSolidIcon className={className} /> : <UserCircleOutlineIcon className={className} />
		}
	/>
);

export const AccountDropdownBookingsButton: FC<Props> = ({ isActive = false, isDisabled = false }) => (
	<AccountDropdownButton
		text="My Bookings"
		ariaLabel="My Bookings"
		transparent={!isActive}
		disabled={isDisabled}
		leftIcon={className =>
			isActive ? <CalendarSolidIcon className={className} /> : <CalendarOutlineIcon className={className} />
		}
	/>
);

export const AccountDropdownResetCacheButton: FC<AccountDropdownResetCacheButtonProps> = ({
	isResettingCache,
	onClick,
}) => (
	<AccountDropdownButton
		transparent
		onClick={onClick}
		text={isResettingCache ? "Resetting" : "Reset Cache"}
		ariaLabel={isResettingCache ? "Resetting" : "Reset Cache"}
		leftIcon={className => <ArrowPathIcon className={`${className} ${isResettingCache ? "animate-spin" : ""}`} />}
	/>
);

export const AccountDropdownLogInOutButton: FC<AccountDropdownLogOutButtonProps> = ({ isAuthenticated, onClick }) => (
	<AccountDropdownButton
		transparent
		onClick={onClick}
		text={isAuthenticated ? "Log Out" : "Log In"}
		ariaLabel={isAuthenticated ? "Log Out" : "Log In"}
		leftIcon={className =>
			isAuthenticated ? (
				<ArrowLeftStartOnRectangle className={className} />
			) : (
				<ArrowLeftEndOnRectangle className={className} />
			)
		}
	/>
);

export const AccountDropdownSignupButton: FC<OnClickProps> = ({ onClick }) => (
	<AccountDropdownButton
		transparent
		text="Sign Up"
		onClick={onClick}
		ariaLabel="Sign Up"
		leftIcon={className => <ArrowLeftEndOnRectangle className={className} />}
	/>
);

interface OnClickProps {
	onClick: () => void;
}

interface AccountDropdownResetCacheButtonProps extends OnClickProps {
	isResettingCache: boolean;
}

interface AccountDropdownLogOutButtonProps extends OnClickProps {
	isAuthenticated: boolean;
}

interface Props {
	isActive?: boolean;
	isDisabled?: boolean;
}
