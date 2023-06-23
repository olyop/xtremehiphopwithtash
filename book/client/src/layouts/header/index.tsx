import { FC, Fragment, createElement } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

import BackButton from "./back-button";
import HeaderLogo from "./logo";
import HeaderRight from "./right";

const Header: FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const sessionID = searchParams.get("sessionID");

	const handleBack = () => {
		navigate(-1);
	};

	const invisible = location.pathname === "/";

	return (
		<header className="flex items-stretch relative justify-between pr-4 md:pr-4 border-b h-header-height bg-white">
			{location.pathname === "/payment" && sessionID ? (
				<Link to={`/session/${sessionID}`}>
					<BackButton invisible={invisible} />
				</Link>
			) : (
				<Fragment>
					{location.pathname === "/payment-success" ? (
						<HeaderLogo />
					) : (
						<Fragment>
							{location.pathname.startsWith("/session") ? (
								<Link to="/">
									<BackButton invisible={invisible} />
								</Link>
							) : (
								<BackButton invisible={invisible} onClick={handleBack} />
							)}
							<HeaderLogo />
							<HeaderRight />
						</Fragment>
					)}
				</Fragment>
			)}
		</header>
	);
};

export default Header;
