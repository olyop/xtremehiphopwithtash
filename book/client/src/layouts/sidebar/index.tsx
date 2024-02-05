import ArrowPathIcon from "@heroicons/react/20/solid/ArrowPathIcon";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";
import ClipboardIcon from "@heroicons/react/20/solid/ClipboardIcon";
import ExclamationTriangleIcon from "@heroicons/react/20/solid/ExclamationTriangleIcon";
import ShareIcon from "@heroicons/react/20/solid/ShareIcon";
import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import InboxArrowDownIcon from "@heroicons/react/24/outline/InboxArrowDownIcon";
import ShoppingBagIcon from "@heroicons/react/24/outline/ShoppingBagIcon";
import WrenchScrewdriverIcon from "@heroicons/react/24/outline/WrenchScrewdriverIcon";
import { FC, Fragment, createElement, useContext } from "react";
import { NavLink } from "react-router-dom";

import Button from "../../components/button";
import Modal from "../../components/modal";
import { IsAdministratorContext } from "../../contexts/is-administrator";
import { useShare } from "../../hooks";

const Sidebar: FC<Props> = ({ isOpen, onClose }) => {
	const isAdministrator = useContext(IsAdministratorContext);

	const [share, { hasShared, hasError, hasCopiedShared }] = useShare(window.location.origin);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			modalClassName="!left-0 !top-auto bottom-0 rounded-none !h-[calc(100vh_-_5rem)] !translate-x-0 !translate-y-0 !w-[calc(100vw_-_6rem)] sm:!w-[20rem] !p-0"
			contentClassName="flex flex-col justify-between h-full !p-0"
			children={
				<Fragment>
					<nav className="flex flex-col gap-2 py-6 border-b">
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
									text="How to Install"
									ariaLabel="How to Install"
									transparent={!isActive}
									textClassName="!text-md"
									leftIcon={className => <InboxArrowDownIcon className={`${className} w-7 h-7`} />}
									className="w-full !justify-start !rounded-none px-6 gap-4 !shadow-none !h-[3rem]"
								/>
							)}
						</NavLink>
						{isAdministrator && (
							<NavLink to="admin" onClick={onClose}>
								{({ isActive }) => (
									<Button
										text="Admin"
										ariaLabel="Admin"
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
						<div className="flex items-center border-y">
							<a
								rel="noreferrer"
								target="_blank"
								onClick={onClose}
								href="https://www.instagram.com/xtremehiphopwithtash/"
							>
								<Button
									transparent
									ariaLabel="Instagram"
									textClassName="!text-md"
									className="!rounded-none !h-[5rem] !w-[5rem] !shadow-none border-r"
									leftIcon={className => (
										<img
											src="/images/instagram.png"
											className={`${className} !w-14 !h-14`}
											alt="Xtreme Hip-Hop with Tash Instagram page"
										/>
									)}
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
									ariaLabel="Facebook"
									textClassName="!text-md"
									className="!rounded-none !h-[5rem] !w-[5rem] !shadow-none border-r"
									leftIcon={className => (
										<img
											src="/images/facebook.png"
											className={`${className} !w-14 !h-14`}
											alt="Xtreme Hip-Hop with Tash Facebook page"
										/>
									)}
								/>
							</a>
							<Button
								transparent
								onClick={share}
								ariaLabel="Share"
								textClassName="!text-md"
								className="!rounded-none !h-[5rem] !w-[5rem] !shadow-none border-r"
								leftIcon={className =>
									hasShared === null ? (
										<ShareIcon className={`${className} !w-14 !h-14`} />
									) : hasShared ? (
										hasCopiedShared ? (
											hasError ? (
												<ExclamationTriangleIcon className={`${className} !w-14 !h-14`} />
											) : (
												<ClipboardIcon className={`${className} !w-14 !h-14`} />
											)
										) : (
											<CheckIcon className={`${className} !w-14 !h-14`} />
										)
									) : (
										<ArrowPathIcon className={`${className} !w-14 !h-14`} />
									)
								}
							/>
						</div>
						<p className="text-xs text-gray-500 p-4 border-b">
							Copyright © {new Date().getFullYear()} <br /> Xtreme Hip-Hop with Tash
						</p>
						<p className="text-xs p-4 text-gray-500">
							<Fragment>Web Application created by </Fragment>
							<a
								rel="noreferrer"
								target="_blank"
								onClick={onClose}
								className="hover:underline text-blue-500"
								href="https://oliverplummer.com.au/"
							>
								Oliver Plummer
							</a>
							<br />
							<Fragment>Source Code: </Fragment>
							<a
								rel="noreferrer"
								target="_blank"
								onClick={onClose}
								className="hover:underline text-blue-500"
								href="https://github.com/olyop/xtremehiphopwithtash/"
							>
								GitHub
							</a>
							<br />
							<Fragment>Techology Stack: </Fragment>
							<a className="hover:underline text-blue-500" href="#">
								View
							</a>
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
