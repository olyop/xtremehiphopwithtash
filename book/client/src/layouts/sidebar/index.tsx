import { useAuth0 } from "@auth0/auth0-react";
import { FC, Fragment, createElement, useContext } from "react";
import { NavLink } from "react-router-dom";

import Modal from "../../components/modal";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import {
	SidebarAdministratorButton,
	SidebarFacebookButton,
	SidebarInstagramButton,
	SidebarInstallButton,
	SidebarMerchButton,
	SidebarSessionsButton,
	SidebarShareButton,
} from "./buttons";
import Footer from "./footer";
import Section from "./section";

const Sidebar: FC<Props> = ({ isOpen, onClose }) => {
	const { isAuthenticated } = useAuth0();
	const isAdministrator = useContext(IsAdministratorContext);

	return (
		<Modal
			isOpen={isOpen}
			enableSwipeClose
			onClose={onClose}
			modalClassName="!left-0 !top-auto bottom-0 rounded-none !h-[calc(100vh_-_5rem)] !translate-x-0 !translate-y-0 !w-[calc(100vw_-_6rem)] sm:!w-[20rem] !p-0"
			contentClassName="flex flex-col justify-between h-full !p-0"
			children={
				<Fragment>
					<nav className="flex flex-col gap-8 py-6">
						<Section title="Pages">
							{isAuthenticated ? (
								<NavLink to="" onClick={onClose}>
									{({ isActive }) => <SidebarSessionsButton isActive={isActive} />}
								</NavLink>
							) : (
								<SidebarSessionsButton isDisabled />
							)}
							{isAuthenticated ? (
								<NavLink to="merch" onClick={onClose}>
									{({ isActive }) => <SidebarMerchButton isActive={isActive} />}
								</NavLink>
							) : (
								<SidebarMerchButton isDisabled />
							)}
							{isAuthenticated ? (
								<NavLink to="install" onClick={onClose}>
									{({ isActive }) => <SidebarInstallButton isActive={isActive} />}
								</NavLink>
							) : (
								<SidebarInstallButton isDisabled />
							)}
						</Section>
						<Section title="Connect">
							<SidebarInstagramButton onClose={onClose} />
							<SidebarFacebookButton onClose={onClose} />
							<SidebarShareButton />
						</Section>
						{isAdministrator && (
							<NavLink to="admin" onClick={onClose}>
								{({ isActive }) => <SidebarAdministratorButton isActive={isActive} />}
							</NavLink>
						)}
					</nav>
					<Footer />
				</Fragment>
			}
		/>
	);
};

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export default Sidebar;
