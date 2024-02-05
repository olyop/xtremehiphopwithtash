import { FC, Fragment, createElement } from "react";

import { useModal } from "../../hooks";
import AccountDropdown from "../account-dropdown";
import Sidebar from "../sidebar";
import HeaderAccountButton from "./account-button";
import HeaderLogo from "./logo";
import HeaderMenuButton from "./menu-button";

const Header: FC = () => {
	const [isMenuOpen, openMenu, closeMenu] = useModal();
	const [isAccountOpen, openAccount, closeAccount] = useModal();

	const handleOpenMenu = () => {
		closeAccount();

		openMenu();
	};

	const handleOpenAccount = () => {
		closeMenu();

		openAccount();
	};

	return (
		<Fragment>
			<header className="flex items-center px-2 relative justify-between border-b h-header-height bg-white !z-[150]">
				<HeaderMenuButton isMenuOpen={isMenuOpen} onMenuOpen={handleOpenMenu} onMenuClose={closeMenu} />
				<HeaderLogo onMenuClose={closeMenu} onAccountClose={closeAccount} />
				<HeaderAccountButton
					isAccountOpen={isAccountOpen}
					onAccountOpen={handleOpenAccount}
					onAccountClose={closeAccount}
				/>
			</header>
			<Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
			<AccountDropdown isOpen={isAccountOpen} onClose={closeAccount} />
		</Fragment>
	);
};

export default Header;
