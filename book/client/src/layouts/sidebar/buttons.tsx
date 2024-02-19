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
import { FC, createElement } from "react";

import Button, { ButtonProps } from "../../components/button";
import { useShare } from "../../hooks";

const SidebarButton: FC<ButtonProps> = ({ className, leftIcon, disabled, ...props }) => (
	<Button
		{...props}
		disabled={disabled}
		textClassName="!text-md"
		leftIcon={iconClassName => (leftIcon ? leftIcon(`${iconClassName} w-7 h-7`) : undefined)}
		className={`w-full !justify-start !rounded-none px-6 gap-4 !shadow-none !h-[3rem] disabled:opacity-50 disabled:bg-transparent ${className}`}
	/>
);

export const SidebarSessionsButton: FC<NavigationProps> = ({ isActive = false, isDisabled = false }) => (
	<SidebarButton
		text="Sessions"
		ariaLabel="Sessions"
		disabled={isDisabled}
		transparent={!isActive}
		leftIcon={className => <CalendarIcon className={className} />}
	/>
);

export const SidebarMerchButton: FC<NavigationProps> = ({ isActive = false, isDisabled = false }) => (
	<SidebarButton
		text="Merch"
		ariaLabel="Merch"
		disabled={isDisabled}
		transparent={!isActive}
		leftIcon={className => <ShoppingBagIcon className={className} />}
	/>
);

export const SidebarInstallButton: FC<NavigationProps> = ({ isActive = false, isDisabled = false }) => (
	<SidebarButton
		text="Install App"
		disabled={isDisabled}
		ariaLabel="Install App"
		transparent={!isActive}
		leftIcon={className => <InboxArrowDownIcon className={className} />}
	/>
);

export const SidebarInstagramButton: FC<SocialsProps> = ({ onClose }) => (
	<a rel="noreferrer" target="_blank" onClick={onClose} href="https://www.instagram.com/xtremehiphopwithtash/">
		<SidebarButton
			transparent
			text="Instagram"
			ariaLabel="Instagram"
			rightIcon={className => <ArrowTopRightOnSquareIcon className={className} />}
			leftIcon={className => <img src="/images/instagram.png" className={className} alt="Instagram page" />}
		/>
	</a>
);

export const SidebarFacebookButton: FC<SocialsProps> = ({ onClose }) => (
	<a rel="noreferrer" target="_blank" onClick={onClose} href="https://www.facebook.com/profile.php?id=100071620803738">
		<SidebarButton
			transparent
			text="Facebook"
			ariaLabel="Facebook"
			rightIcon={className => <ArrowTopRightOnSquareIcon className={className} />}
			leftIcon={className => <img src="/images/facebook.png" className={className} alt="Facebook page" />}
		/>
	</a>
);

export const SidebarShareButton: FC = () => {
	const [share, { hasShared, hasError, hasCopiedShared }] = useShare(window.location.origin);

	return (
		<SidebarButton
			transparent
			onClick={share}
			ariaLabel="Share"
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
					<ShareIcon className={className} />
				) : hasShared ? (
					hasCopiedShared ? (
						hasError ? (
							<ExclamationTriangleIcon className={className} />
						) : (
							<ClipboardIcon className={className} />
						)
					) : (
						<CheckIcon className={className} />
					)
				) : (
					<ArrowPathIcon className={`${className} animate-spin`} />
				)
			}
		/>
	);
};

export const SidebarAdministratorButton: FC<NavigationProps> = ({ isActive = false, isDisabled = false }) => (
	<SidebarButton
		text="Administrator"
		transparent={!isActive}
		disabled={isDisabled}
		ariaLabel="Administrator"
		leftIcon={className => <WrenchScrewdriverIcon className={className} />}
	/>
);

interface NavigationProps {
	isActive?: boolean;
	isDisabled?: boolean;
}

interface SocialsProps {
	onClose: () => void;
}
