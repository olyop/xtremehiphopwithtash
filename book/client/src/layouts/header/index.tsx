import ArrowSmallLeftIcon from "@heroicons/react/24/outline/ArrowSmallLeftIcon";
import WrenchScrewdriverIcon from "@heroicons/react/24/outline/WrenchScrewdriverIcon";
import { FC, createElement } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Button from "../../components/button";
import AccountButton from "./account-button";

const Header: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleBack = () => {
		navigate(-1);
	};

	return (
		<header className="flex items-center justify-between px-4 py-3 border-b h-header-height">
			<div className="flex items-center h-full gap-4">
				<Link to="/" className="block h-full">
					<img
						src="/full-logo.png"
						alt="Xtreme Hip Hop with Tash"
						title="Xtreme Hip Hop with Tash"
						className="h-full"
					/>
				</Link>
				{location.pathname !== "/" && (
					<Button
						transparent
						text="Back"
						ariaLabel="Go back to the home page"
						onClick={handleBack}
						leftIcon={className => <ArrowSmallLeftIcon className={className} />}
					/>
				)}
			</div>
			<div className="flex items-center h-full gap-4">
				{location.pathname !== "/admin" && (
					<Link to="admin">
						<Button
							transparent
							ariaLabel="Administrator Page"
							leftIcon={className => <WrenchScrewdriverIcon className={className} />}
						/>
					</Link>
				)}
				<AccountButton />
			</div>
		</header>
	);
};

export default Header;
