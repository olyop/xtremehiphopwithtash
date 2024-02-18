import { useLazyQuery } from "@apollo/client/react/hooks/useLazyQuery";
import { useAuth0 } from "@auth0/auth0-react";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/solid/ChevronUpIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, createElement, useEffect } from "react";

import { GetAccountPageQuery } from "../../generated-types";
import { Breakpoint, useBreakpoint } from "../../hooks";
import GET_ACCOUNT_PAGE from "../../pages/account/get-account-page.graphql";
import HeaderButton from "./header-button";

const HeaderAccountButton: FC<Props> = ({ isOpen, onToggle }) => {
	const breakpoint = useBreakpoint();
	const { isAuthenticated, user } = useAuth0();

	const [getAccountPage, { data }] = useLazyQuery<GetAccountPageQuery>(GET_ACCOUNT_PAGE);

	useEffect(() => {
		if (isAuthenticated && user) {
			void getAccountPage();
		}
	}, [isAuthenticated, user]);

	const text =
		isOpen && (breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL)
			? "Close"
			: data
			  ? (data.getStudentByID.details.nickName ?? data.getStudentByID.details.firstName).slice(0, 8)
			  : "Account";

	const leftIcon = (className: string) =>
		isOpen && (breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL) ? (
			<XMarkIcon className={className} />
		) : user ? (
			breakpoint === Breakpoint.TINY ? null : (
				<img className={className} src={user.picture} alt={user.email} />
			)
		) : (
			<UserCircleIcon className={className} />
		);

	const rightIcon = (className: string) =>
		breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL ? null : isOpen ? (
			<ChevronUpIcon className={className} />
		) : (
			<ChevronDownIcon className={className} />
		);

	return (
		<div className="flex items-end md:items-center justify-around flex-col-reverse md:flex-row !py-4 gap-1 lg:gap-2 h-header-height">
			<HeaderButton
				text={text}
				ariaLabel={text}
				isActive={isOpen}
				onClick={onToggle}
				leftIcon={leftIcon}
				rightIcon={rightIcon}
				className="!pl-2 pr-2 sm:pr-4 !border-gray-200"
			/>
		</div>
	);
};

interface Props {
	isOpen: boolean;
	onToggle: () => void;
}

export default HeaderAccountButton;
