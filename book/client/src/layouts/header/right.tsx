import WrenchScrewdriverIcon from "@heroicons/react/24/outline/WrenchScrewdriverIcon";
import { FC, createElement, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "../../components/button";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import AccountButton from "./account-button";

const HeaderRight: FC = () => {
	const location = useLocation();
	const { isAdministrator } = useContext(IsAdministratorContext);

	return (
		<div className="flex items-center gap-1">
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
	);
};

export default HeaderRight;
