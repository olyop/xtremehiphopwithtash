import { useLazyQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/solid/ChevronUpIcon";
import { FC, createElement, useEffect } from "react";

import { GetAccountPageQuery, GetBookingsPageQuery } from "../../generated-types";
import { Breakpoint, useBreakpoint } from "../../hooks";
import GET_ACCOUNT_PAGE from "../../pages/account/get-account-page.graphql";
import GET_BOOKINGS_PAGE from "../../pages/bookings/get-bookings-page.graphql";
import HeaderButton from "./header-button";

const HeaderAccountButton: FC<Props> = ({ isAccountOpen, onAccountOpen, onAccountClose }) => {
	const breakpoint = useBreakpoint();
	const { isAuthenticated, user } = useAuth0();

	const [getBookingsPage] = useLazyQuery<GetBookingsPageQuery>(GET_BOOKINGS_PAGE);
	const [getAccountPage, { data }] = useLazyQuery<GetAccountPageQuery>(GET_ACCOUNT_PAGE);

	const handleAccountClick = () => {
		if (isAccountOpen) {
			onAccountClose();
		} else {
			onAccountOpen();
		}
	};

	useEffect(() => {
		if (isAuthenticated && user) {
			void getBookingsPage();
			void getAccountPage();
		}
	}, [isAuthenticated, user]);

	return (
		<div className="flex items-end md:items-center justify-around flex-col-reverse md:flex-row !py-4 gap-1 lg:gap-2 h-header-height">
			<HeaderButton
				ariaLabel="Account Page"
				className="!border-gray-200 hover:!border-gray-300"
				isActive={isAccountOpen}
				onClick={handleAccountClick}
				text={
					data ? (data.getStudentByID.details.nickName ?? data.getStudentByID.details.firstName).slice(0, 8) : "Account"
				}
				leftIcon={className =>
					user ? (
						breakpoint === Breakpoint.TINY ? null : (
							<img className={className} src={user.picture} alt={user.email} />
						)
					) : (
						<UserCircleIcon className={className} />
					)
				}
				rightIcon={className =>
					breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL ? null : isAccountOpen ? (
						<ChevronUpIcon className={className} />
					) : (
						<ChevronDownIcon className={className} />
					)
				}
			/>
		</div>
	);
};

interface Props {
	isAccountOpen: boolean;
	onAccountOpen: () => void;
	onAccountClose: () => void;
}

export default HeaderAccountButton;
