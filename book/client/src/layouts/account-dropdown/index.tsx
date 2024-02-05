import { useAuth0 } from "@auth0/auth0-react";
import ArrowLeftStartOnRectangle from "@heroicons/react/20/solid/ArrowLeftStartOnRectangleIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, Fragment, createElement } from "react";
import { NavLink } from "react-router-dom";

import Button from "../../components/button";
import Modal from "../../components/modal";

const AccountDropdown: FC<Props> = ({ isOpen, onClose }) => {
	const { logout } = useAuth0();

	const handleLogOut = () => {
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
			modalClassName="!left-auto !top-auto !right-0 rounded-none !top-[5rem] !h-auto !w-[calc(100vw_-_6rem)] tiny:!w-72 !translate-x-0 !translate-y-0 !p-0"
			contentClassName="flex flex-col justify-between h-full !p-0"
			children={
				<Fragment>
					<NavLink to="account" onClick={onClose}>
						{({ isActive }) => (
							<Button
								text="My Account"
								ariaLabel="My Account"
								transparent={!isActive}
								textClassName="!text-md"
								leftIcon={className => <UserCircleIcon className={`${className} w-7 h-7`} />}
								className="w-full !justify-start !rounded-none !shadow-none !h-[3rem]"
							/>
						)}
					</NavLink>
					<NavLink to="bookings" onClick={onClose}>
						{({ isActive }) => (
							<Button
								text="My Bookings"
								ariaLabel="My Bookings"
								transparent={!isActive}
								textClassName="!text-md"
								leftIcon={className => <CalendarIcon className={`${className} w-7 h-7`} />}
								className="w-full !justify-start !rounded-none !shadow-none !h-[3rem]"
							/>
						)}
					</NavLink>
					<Button
						transparent
						text="Log Out"
						ariaLabel="Log Out"
						onClick={handleLogOut}
						textClassName="!text-md"
						leftIcon={className => <ArrowLeftStartOnRectangle className={`${className} w-7 h-7`} />}
						className="w-full !justify-start !rounded-none !shadow-none !h-[3rem]"
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
