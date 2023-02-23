import UserCircleIcon from "@heroicons/react/24/solid/UserCircleIcon";
import { FC, createElement } from "react";

import Button from "../button";

const Header: FC = () => (
	<header className="flex items-center justify-between h-header-height px-4 border-b">
		<h1>Xtreme Hip Hop with Tash</h1>
		<Button
			text="Account"
			ariaLabel="Account"
			onClick={() => {}}
			leftIcon={className => <UserCircleIcon className={className} />}
		/>
	</header>
);

export default Header;
