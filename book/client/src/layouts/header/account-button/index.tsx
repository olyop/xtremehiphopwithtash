import { useLazyQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import ArrowLeftStartOnRectangle from "@heroicons/react/20/solid/ArrowLeftStartOnRectangleIcon";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/solid/ChevronUpIcon";
import { FC, createElement, useEffect, useState } from "react";

import { GetStudentDetailsQuery } from "../../../generated-types";
import HeaderButton from "../header-button";
import GET_STUDENT_DETAILS from "./get-student-details.graphql";

const HeaderAccountButton: FC<Props> = ({ isAccountOpen, onAccountOpen, onAccountClose }) => {
	const { isAuthenticated, loginWithRedirect, user } = useAuth0();

	const [showLoginButton, setShowLoginButton] = useState(false);

	const [getStudentDetails, { data }] = useLazyQuery<GetStudentDetailsQuery>(GET_STUDENT_DETAILS);

	const handleAccountClick = () => {
		if (isAccountOpen) {
			onAccountClose();
		} else {
			onAccountOpen();
		}
	};

	const handleLogin = () => {
		void loginWithRedirect({
			authorizationParams: {
				redirect_uri: window.location.origin,
			},
		});
	};

	useEffect(() => {
		if (isAuthenticated) {
			void getStudentDetails();
		}
	}, [isAuthenticated]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!isAuthenticated && user === undefined) {
				setShowLoginButton(true);
			}
		}, 2000);

		return () => {
			clearTimeout(timeout);
		};
	}, []);

	return (
		<div className="flex items-end md:items-center justify-around flex-col-reverse md:flex-row !py-4 gap-1 lg:gap-2 h-header-height">
			{!showLoginButton && isAuthenticated && user && data && (
				<HeaderButton
					ariaLabel="Account Page"
					className="pl-2"
					isActive={isAccountOpen}
					onClick={handleAccountClick}
					text={data.getStudentByID.details.firstName.slice(0, 10)}
					leftIcon={className => <img className={className} src={user.picture} alt={user.email} />}
					rightIcon={className =>
						isAccountOpen ? <ChevronUpIcon className={className} /> : <ChevronDownIcon className={className} />
					}
				/>
			)}
			{showLoginButton && !isAuthenticated && (
				<HeaderButton
					isActive
					text="Login"
					ariaLabel="Login"
					transparent={false}
					onClick={handleLogin}
					leftIcon={className => <ArrowLeftStartOnRectangle className={className} />}
				/>
			)}
		</div>
	);
};

interface Props {
	isAccountOpen: boolean;
	onAccountOpen: () => void;
	onAccountClose: () => void;
}

export default HeaderAccountButton;
