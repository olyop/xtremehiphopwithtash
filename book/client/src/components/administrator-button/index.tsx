import WrenchScrewdriverIcon from "@heroicons/react/24/outline/WrenchScrewdriverIcon";
import { FC, createElement, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import Button from "../button";

const AdministratorButton: FC = () => {
	const location = useLocation();
	const { isAdministrator } = useContext(IsAdministratorContext);
	return isAdministrator && location.pathname !== "/admin" ? (
		<Link
			to="admin"
			className="fixed right-0 block bg-white bottom-[136px] w-[70px] h-[60px] shadow-[grey_0_0_5px] rounded-l-[3px] z-[9999]"
		>
			<Button
				transparent
				ariaLabel="Administrator Page"
				className="w-full h-full rounded-none"
				leftIcon={className => <WrenchScrewdriverIcon className={className} />}
			/>
		</Link>
	) : null;
};

export default AdministratorButton;
