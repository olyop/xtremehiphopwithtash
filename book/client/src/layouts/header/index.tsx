import { FC, Fragment, createElement } from "react";
import { useLocation } from "react-router-dom";

import { useModal } from "../../hooks";
import AccountDropdown from "../account-dropdown";
import Sidebar from "../sidebar";
import HeaderAccountButton from "./account-button";
import HeaderBackButton from "./header-back-button";
import HeaderLogo from "./logo";
import HeaderMenuButton from "./menu-button";

const Header: FC = () => {
	const location = useLocation();
	const [isMenuOpen, openMenu, closeMenu] = useModal(undefined, false);
	const [isAccountOpen, openAccount, closeAccount] = useModal();

	const handleReset = () => {
		closeMenu();
		closeAccount();
	};

	const handleOpenMenu = () => {
		handleReset();

		openMenu();
	};

	const handleOpenAccount = () => {
		handleReset();

		openAccount();
	};

	const { pathname } = location;

	return (
		<Fragment>
			<header
				className={`flex items-center px-2 relative justify-between border-b h-header-height bg-white ${
					isMenuOpen || isAccountOpen ? "!z-[150]" : ""
				}`}
			>
				{pathname === "/payment-success" ? null : pathname.startsWith("/session") || pathname === "/payment" ? (
					<HeaderBackButton onClick={handleReset} />
				) : (
					<HeaderMenuButton isMenuOpen={isMenuOpen} onMenuOpen={handleOpenMenu} onMenuClose={closeMenu} />
				)}
				<HeaderLogo onMenuClose={closeMenu} onAccountClose={closeAccount} />
				{pathname === "/payment" || pathname === "/payment-success" ? null : (
					<HeaderAccountButton
						isAccountOpen={isAccountOpen}
						onAccountOpen={handleOpenAccount}
						onAccountClose={closeAccount}
					/>
				)}
			</header>
			<Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
			<AccountDropdown isOpen={isAccountOpen} onClose={closeAccount} />
		</Fragment>
	);
};

export default Header;
