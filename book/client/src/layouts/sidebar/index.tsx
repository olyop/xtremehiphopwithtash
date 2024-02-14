import ArrowPathIcon from "@heroicons/react/20/solid/ArrowPathIcon";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";
import ClipboardIcon from "@heroicons/react/20/solid/ClipboardIcon";
import ShareIcon from "@heroicons/react/20/solid/ShareIcon";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/outline/ArrowTopRightOnSquareIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import ExclamationTriangleIcon from "@heroicons/react/24/outline/ExclamationTriangleIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import WrenchScrewdriverIcon from "@heroicons/react/24/outline/WrenchScrewdriverIcon";
import { FC, Fragment, createElement, useContext } from "react";
import { NavLink } from "react-router-dom";

import Button from "../../components/button";
import Modal from "../../components/modal";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import { useShare } from "../../hooks";
import Section from "./section";

const Sidebar: FC<Props> = ({ isOpen, onClose }) => {
	const isAdministrator = useContext(IsAdministratorContext);

	const [share, { hasShared, hasError, hasCopiedShared }] = useShare(window.location.origin);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			enableSwipeClose
			modalClassName="!left-0 !top-auto bottom-0 rounded-none !h-[calc(100vh_-_5rem)] !translate-x-0 !translate-y-0 !w-[calc(100vw_-_6rem)] sm:!w-[20rem] !p-0"
			contentClassName="flex flex-col justify-between h-full !p-0"
			children={
				<Fragment>
					<nav className="flex flex-col gap-8 py-6">
						<Section title="Pages">
							<NavLink to="" onClick={onClose}>
								{({ isActive }) => (
									<Button
										text="Sessions"
										ariaLabel="Sessions"
										transparent={!isActive}
										textClassName="!text-md"
										leftIcon={className => <CalendarIcon className={`${className} w-7 h-7`} />}
										className="w-full !justify-start !rounded-none px-6 gap-4 !shadow-none !h-[3rem]"
									/>
								)}
							</NavLink>
							<NavLink to="merch" onClick={onClose}>
								{({ isActive }) => (
									<Button
										text="Merch"
										ariaLabel="Merch"
										transparent={!isActive}
										textClassName="!text-md"
										leftIcon={className => <ShoppingBagIcon className={`${className} w-7 h-7`} />}
										className="w-full !justify-start !rounded-none px-6 gap-4 !shadow-none !h-[3rem]"
									/>
								)}
							</NavLink>
							<NavLink to="install" onClick={onClose}>
								{({ isActive }) => (
									<Button
										text="Install App"
										ariaLabel="Install App"
										transparent={!isActive}
										textClassName="!text-md"
										leftIcon={className => <InboxArrowDownIcon className={`${className} w-7 h-7`} />}
										className="w-full !justify-start !rounded-none px-6 gap-4 !shadow-none !h-[3rem]"
									/>
								)}
							</NavLink>
						</Section>
						<Section title="Connect">
							<Button
								transparent
								onClick={share}
								ariaLabel="Share"
								textClassName="!text-md"
								className="w-full !justify-start !rounded-none px-6 gap-4 !shadow-none !h-[3rem]"
								text={
									hasShared === null
										? "Share Website"
										: hasShared
										  ? hasCopiedShared
												? hasError
													? "Error"
													: "Copied!"
												: "Shared!"
										  : "Sharing"
								}
								leftIcon={className =>
									hasShared === null ? (
										<ShareIcon className={`${className} w-7 h-7`} />
									) : hasShared ? (
										hasCopiedShared ? (
											hasError ? (
												<ExclamationTriangleIcon className={`${className} w-7 h-7`} />
											) : (
												<ClipboardIcon className={`${className} w-7 h-7`} />
											)
										) : (
											<CheckIcon className={`${className} w-7 h-7`} />
										)
									) : (
										<ArrowPathIcon className={`${className} w-7 h-7 animate-spin`} />
									)
								}
							/>
							<a
								rel="noreferrer"
								target="_blank"
								onClick={onClose}
								href="https://www.instagram.com/xtremehiphopwithtash/"
							>
								<Button
									transparent
									text="Instagram"
									ariaLabel="Instagram"
									textClassName="!text-md"
									className="w-full !justify-start !rounded-none px-6 gap-4 !shadow-none !h-[3rem]"
									leftIcon={className => (
										<img
											src="/images/instagram.png"
											className={`${className} w-7 h-7`}
											alt="Xtreme Hip-Hop with Tash Instagram page"
										/>
									)}
									rightIcon={className => <ArrowTopRightOnSquareIcon className={className} />}
								/>
							</a>
							<a
								rel="noreferrer"
								target="_blank"
								onClick={onClose}
								href="https://www.facebook.com/profile.php?id=100071620803738"
							>
								<Button
									transparent
									text="Facebook"
									ariaLabel="Facebook"
									textClassName="!text-md"
									rightIcon={className => <ArrowTopRightOnSquareIcon className={className} />}
									className="w-full !justify-start !rounded-none px-6 gap-4 !shadow-none !h-[3rem]"
									leftIcon={className => (
										<img
											src="/images/facebook.png"
											className={`${className} w-7 h-7`}
											alt="Xtreme Hip-Hop with Tash Facebook page"
										/>
									)}
								/>
							</a>
						</Section>
						{isAdministrator && (
							<NavLink to="admin" onClick={onClose}>
								{({ isActive }) => (
									<Button
										text="Administrator"
										ariaLabel="Administrator"
										transparent={!isActive}
										textClassName="!text-md"
										leftIcon={className => <WrenchScrewdriverIcon className={`${className} w-7 h-7`} />}
										className="w-full !justify-start !rounded-none px-6 gap-4 !shadow-none !h-[3rem]"
									/>
								)}
							</NavLink>
						)}
					</nav>
					<footer className="flex flex-col">
						<p className="text-xs text-gray-500 p-4">
							Copyright © {new Date().getFullYear()} Xtreme Hip-Hop with Tash
						</p>
					</footer>
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
