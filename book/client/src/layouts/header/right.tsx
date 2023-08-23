import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import { FC, Fragment, createElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";

import Button from "../../components/button";

const currentPageClassName = "!bg-primary text-white";

const HeaderRight: FC = () => {
	const location = useLocation();
	const { isAuthenticated } = useAuth0();
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
		</div>
	);
};

export default HeaderRight;
