import { useAuth0 } from "@auth0/auth0-react";
import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "../../components/button";

const currentPageClassName = "!bg-primary text-white";

const HeaderRight: FC = () => {
	const location = useLocation();
	const { isAuthenticated, loginWithRedirect } = useAuth0();

	const [showLoginButton, setShowLoginButton] = useState(false);

	const handleLogin = () => {
		void loginWithRedirect({
			authorizationParams: {
				redirect_uri: window.location.origin,
			},
		});
	};

	useEffect(() => {
		setTimeout(() => {
			setShowLoginButton(true);
		}, 2000);
	}, []);

	return (
		<div className="flex items-end md:items-center justify-around flex-col-reverse md:flex-row !py-4 gap-1 lg:gap-2 h-header-height pr-2 md:pr-4">
			{isAuthenticated && (
				<Fragment>
					<Link to="merch">
						<Button
							transparent
							text="Merch"
							ariaLabel="Merchandise Page"
							leftIcon={className => <ShoppingBagIcon className={className} />}
							className={`!py-2 !md:py-4 !px-2 !md:px-4 !h-7 !md:h-12 ${
								location.pathname === "/merch" ? currentPageClassName : ""
							}`}
						/>
					</Link>
					<Link to="account">
						<Button
							transparent
							text="Account"
							ariaLabel="Account Page"
							leftIcon={c => <UserCircleIcon className={c} />}
							className={`!py-2 !md:py-4 !px-2 !md:px-4 !h-7 !md:h-12 ${
								location.pathname === "/account" ? currentPageClassName : ""
							}`}
						/>
					</Link>
				</Fragment>
			)}
			{!isAuthenticated && showLoginButton && (
				<Button
					text="Login"
					onClick={handleLogin}
					ariaLabel="Login"
					className="!py-2 !md:py-4 !px-2 !md:px-4 !h-7 !md:h-12"
				/>
			)}
		</div>
	);
};

export default HeaderRight;
