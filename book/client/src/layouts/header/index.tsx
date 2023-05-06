import ArrowSmallLeftIcon from "@heroicons/react/24/outline/ArrowSmallLeftIcon";
import WrenchScrewdriverIcon from "@heroicons/react/24/outline/WrenchScrewdriverIcon";
import { FC, Fragment, createElement, useContext } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import Button from "../../components/button";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import AccountButton from "./account-button";

const Header: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const { isAdministrator } = useContext(IsAdministratorContext);

	const sessionID = searchParams.get("sessionID");

	const handleBack = () => {
		navigate(-1);
	};

	const backButtonClassName = `items-center gap-1 md:gap-4 h-full rounded-none ${
		location.pathname === "/" ? "invisible" : "visible"
	}`;

	return (
		<header className="flex items-stretch relative justify-between pr-2 md:pr-4 border-b h-header-height bg-white">
			{location.pathname === "/payment" && sessionID ? (
				<Link to={`/session/${sessionID}`}>
					<Button
						transparent
						text="Back"
						className={backButtonClassName}
						ariaLabel="Go back to the home page"
						leftIcon={className => <ArrowSmallLeftIcon className={className} />}
					/>
				</Link>
			) : (
				<Fragment>
					<Button
						transparent
						text="Back"
						onClick={handleBack}
						className={backButtonClassName}
						ariaLabel="Go back to the home page"
						leftIcon={className => <ArrowSmallLeftIcon className={className} />}
					/>
					<Link
						to="/"
						className="absolute top-1/2 left-1/2 h-header-height -translate-y-1/2 -translate-x-1/2 p-3"
					>
						<img
							src="/full-logo.png"
							alt="Xtreme Hip-Hop with Tash"
							title="Xtreme Hip-Hop with Tash"
							className="h-full"
						/>
					</Link>
					<div className="flex items-center gap-2">
						{isAdministrator && location.pathname !== "/admin" && (
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
				</Fragment>
			)}
		</header>
	);
};

export default Header;
