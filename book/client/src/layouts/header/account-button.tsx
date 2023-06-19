import { useAuth0 } from "@auth0/auth0-react";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, createElement, useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/button";
import { Breakpoint, useBreakpoint } from "../../hooks";

const AccountButton: FC = () => {
	const breakpoint = useBreakpoint();
	const { user, isAuthenticated } = useAuth0();
	const [userHasImage, setUserHasImage] = useState(user ? user.picture !== undefined : false);

	const handleImageError = () => {
		setUserHasImage(false);
	};

	return isAuthenticated && user ? (
		<Link to="account">
			<Button
				transparent
				ariaLabel="Account Page"
				text={userHasImage || breakpoint === Breakpoint.SMALL ? undefined : "Account"}
				className={`!shadow-2xl ${userHasImage ? "!p-0 " : ""}`}
				leftIcon={c => (userHasImage ? undefined : <UserCircleIcon className={c} />)}
				childrenNode={
					userHasImage && (
						<img
							src={user.picture}
							alt="User Profile"
							className="w-full h-full rounded-full"
							onError={handleImageError}
						/>
					)
				}
			/>
		</Link>
	) : null;
};

export default AccountButton;
