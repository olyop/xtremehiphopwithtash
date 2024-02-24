import { FC, Fragment, createElement } from "react";
import { useLocation } from "react-router-dom";

import { useModal } from "../../hooks";
import AccountDropdown from "../account-dropdown";
import Sidebar from "../sidebar";
import HeaderAccountButton from "./account-button";
import HeaderBackButton from "./header-back-button";
import HeaderLogo from "./logo";
import HeaderMenuButton from "./menu-button";

const Header: FC<Props> = ({ shouldFetchAccount }) => {
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

	const handleToggleMenu = () => {
		if (isMenuOpen) {
			closeMenu();
		} else {
			handleOpenMenu();
		}
	};

	const handleToggleAccount = () => {
		if (isAccountOpen) {
			closeAccount();
		} else {
			handleOpenAccount();
		}
	};

	const { pathname } = location;

	const isPaymentSuccessPage = pathname === "/payment-success";
	const isSessionPage = pathname.startsWith("/session");
	const isPaymentPage = pathname === "/payment";

	return (
		<Fragment>
			<header
				className={`flex items-center pl-4 tiny:pl-2 pr-2 relative justify-between border-b h-header-height bg-white ${
					isMenuOpen || isAccountOpen ? "!z-[150]" : ""
				}`}
			>
				{isPaymentSuccessPage ? null : isSessionPage || isPaymentPage ? (
					<HeaderBackButton onClick={handleReset} />
				) : (
					<HeaderMenuButton isOpen={isMenuOpen} onToggle={handleToggleMenu} />
				)}
				<HeaderLogo onMenuClose={closeMenu} onAccountClose={closeAccount} />
				{isPaymentPage || isPaymentSuccessPage ? null : (
					<HeaderAccountButton
						isOpen={isAccountOpen}
						onToggle={handleToggleAccount}
						shouldFetchAccount={shouldFetchAccount}
					/>
				)}
			</header>
			<Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
			<AccountDropdown isOpen={isAccountOpen} onClose={closeAccount} />
		</Fragment>
	);
};

interface Props {
	shouldFetchAccount: boolean;
}

export default Header;
