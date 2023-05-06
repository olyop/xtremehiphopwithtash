import { useAuth0 } from "@auth0/auth0-react";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, createElement } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/button";
import { Breakpoint, useBreakpoint } from "../../hooks";

const className = "!shadow-xl !hover:shadow-2xl";

const AccountButton: FC = () => {
	const breakpoint = useBreakpoint();
	const { user, isAuthenticated, loginWithRedirect } = useAuth0();

	const handleLogin = () => {
		void loginWithRedirect({
			authorizationParams: {
				scope: "openid sub given_name family_name nickname phone_number picture read:current_user",
			},
		});
	};

	const userHasImage = user?.picture !== undefined;

	return isAuthenticated ? (
		<Link to="account">
			<Button
				ariaLabel="Account Page"
				transparent={userHasImage}
				text={userHasImage ? undefined : "Account"}
				className={userHasImage ? `!p-0 ${className}` : className}
				leftIcon={c => (userHasImage ? undefined : <UserCircleIcon className={c} />)}
				childrenNode={
					userHasImage && (
						<img src={user.picture} alt="User Profile" className="w-full h-full rounded-full" />
					)
				}
			/>
		</Link>
	) : (
		<Button
			ariaLabel="Log In"
			onClick={handleLogin}
			className={`${className} ${breakpoint === Breakpoint.SMALL ? "!p-2 !gap-1" : ""}`}
			text={userHasImage ? undefined : "Log In"}
			leftIcon={c => <UserCircleIcon className={c} />}
		/>
	);
};

export default AccountButton;
