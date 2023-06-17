import { useAuth0 } from "@auth0/auth0-react";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, createElement } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/button";
import { Breakpoint, useBreakpoint } from "../../hooks";

const className = "!shadow-xl !hover:shadow-2xl";

const AccountButton: FC = () => {
	const breakpoint = useBreakpoint();
	const { user, isAuthenticated } = useAuth0();

	const userHasImage = user?.picture !== undefined;

	return isAuthenticated ? (
		<Link to="account">
			<Button
				ariaLabel="Account Page"
				transparent={userHasImage}
				text={userHasImage || breakpoint === Breakpoint.SMALL ? undefined : "Account"}
				className={userHasImage ? `!p-0 ${className}` : className}
				leftIcon={c => (userHasImage ? undefined : <UserCircleIcon className={c} />)}
				childrenNode={
					userHasImage && <img src={user.picture} alt="User Profile" className="w-full h-full rounded-full" />
				}
			/>
		</Link>
	) : null;
};

export default AccountButton;
