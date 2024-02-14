import { useAuth0 } from "@auth0/auth0-react";
import ArrowLeftEndOnRectangle from "@heroicons/react/20/solid/ArrowLeftEndOnRectangleIcon";
import ArrowLeftStartOnRectangle from "@heroicons/react/20/solid/ArrowLeftStartOnRectangleIcon";
import { FC, Fragment, createElement } from "react";
import { NavLink } from "react-router-dom";

import Button from "../../components/button";
import Modal from "../../components/modal";
import AccountDropdownAccountButton from "./account-button";
import AccountDropdownBookingsButton from "./bookings-button";

const AccountDropdown: FC<Props> = ({ isOpen, onClose }) => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	const handleLogIn = () => {
		onClose();

		void loginWithRedirect({
			authorizationParams: {
				redirect_uri: window.location.origin,
			},
		});
	};

	const handleLogOut = () => {
		onClose();

		void logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			modalClassName="!left-auto !right-0 rounded-none !top-[5rem] !h-auto !w-[calc(100vw_-_6rem)] tiny:!w-72 !translate-x-0 !translate-y-0 !p-0"
			contentClassName="flex flex-col justify-between h-full !py-4"
			children={
				<Fragment>
					{isAuthenticated ? (
						<NavLink to="account" onClick={onClose}>
							{({ isActive }) => <AccountDropdownAccountButton isActive={isActive} />}
						</NavLink>
					) : (
						<AccountDropdownAccountButton isDisabled />
					)}
					{isAuthenticated ? (
						<NavLink to="bookings" onClick={onClose}>
							{({ isActive }) => <AccountDropdownBookingsButton isActive={isActive} />}
						</NavLink>
					) : (
						<AccountDropdownBookingsButton isDisabled />
					)}
					<Button
						transparent
						textClassName="!text-md"
						text={isAuthenticated ? "Log Out" : "Log In"}
						ariaLabel={isAuthenticated ? "Log Out" : "Log In"}
						onClick={isAuthenticated ? handleLogOut : handleLogIn}
						className="w-full !justify-start !rounded-none !shadow-none pl-6 !h-[3rem]"
						leftIcon={className =>
							isAuthenticated ? (
								<ArrowLeftStartOnRectangle className={`${className} w-7 h-7`} />
							) : (
								<ArrowLeftEndOnRectangle className={`${className} w-7 h-7`} />
							)
						}
					/>
				</Fragment>
			}
		/>
	);
};

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default AccountDropdown;
