import { useAuth0 } from "@auth0/auth0-react";
import { FC, Fragment, createElement, useState } from "react";
import { NavLink } from "react-router-dom";

import { cachePersistor } from "../../clients/apollo";
import Modal from "../../components/modal";
import {
	AccountDropdownAccountButton,
	AccountDropdownBookingsButton,
	AccountDropdownLogInOutButton,
	AccountDropdownResetCacheButton,
	AccountDropdownSignupButton,
} from "./buttons";
import { unregisterServiceWorkers } from "./unregister-service-workers";

const AccountDropdown: FC<Props> = ({ isOpen, onClose }) => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	const [isResettingCache, setIsResettingCache] = useState(false);

	const resetCache = async () => {
		setIsResettingCache(true);

		// sleep for 1 second to positively indicate that the cache is being reset
		await new Promise(resolve => {
			setTimeout(resolve, 1000);
		});

		await cachePersistor.purge();

		await unregisterServiceWorkers();

		setIsResettingCache(false);

		onClose();

		void logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	const handleResetCache = () => {
		void resetCache();
	};

	const handleLogInOut = () => {
		onClose();

		if (isAuthenticated) {
			void logout({
				logoutParams: {
					returnTo: window.location.origin,
				},
			});
		} else {
			void loginWithRedirect({
				authorizationParams: {
					redirect_uri: window.location.origin,
				},
			});
		}
	};

	const handleSignup = () => {
		onClose();

		void loginWithRedirect({
			authorizationParams: {
				redirect_uri: window.location.origin,
				screen_hint: "signup",
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
					<AccountDropdownResetCacheButton isResettingCache={isResettingCache} onClick={handleResetCache} />
					<AccountDropdownLogInOutButton isAuthenticated={isAuthenticated} onClick={handleLogInOut} />
					{!isAuthenticated && <AccountDropdownSignupButton onClick={handleSignup} />}
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
