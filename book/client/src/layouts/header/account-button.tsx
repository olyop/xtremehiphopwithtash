import { useAuth0 } from "@auth0/auth0-react";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";

const className = "shadow-xl hover:shadow-lg";

const AccountButton: FC = () => {
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

	const handleLogin = () => {
		void loginWithRedirect({});
	};

	const handleLogOut = () => {
		void logout({ logoutParams: { returnTo: window.location.origin } });
	};

	return isAuthenticated ? (
		<Button
			text="Account"
			ariaLabel="Log Out"
			className={className}
			onClick={handleLogOut}
			leftIcon={c => <UserCircleIcon className={c} />}
		/>
	) : (
		<Button
			text="Log In"
			ariaLabel="Log In"
			className={className}
			onClick={handleLogin}
			leftIcon={c => <UserCircleIcon className={c} />}
		/>
	);
};

export default AccountButton;
