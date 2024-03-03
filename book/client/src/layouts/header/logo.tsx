import { FC, createElement } from "react";
import { Link } from "react-router-dom";

import { Breakpoint, useBreakpoint } from "../../hooks";

const HeaderLogo: FC<Props> = ({ onMenuClose, onAccountClose }) => {
	const breakpoint = useBreakpoint();

	const handleClick = () => {
		onMenuClose();
		onAccountClose();
	};

	const isSmallLogo = breakpoint === Breakpoint.MEDIUM || breakpoint === Breakpoint.LARGE;

	return (
		<Link
			to="/"
			onClick={handleClick}
			className="h-header-height absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center p-3 transition-opacity hover:opacity-60 focus:opacity-60"
		>
			<img
				src="/images/full-logo.png"
				alt="Xtreme Hip-Hop with Tash"
				title="Xtreme Hip-Hop with Tash"
				width={isSmallLogo ? 160 : 100}
				height={isSmallLogo ? 56 : 35}
			/>
		</Link>
	);
};
interface Props {
	onMenuClose: () => void;
	onAccountClose: () => void;
}

export default HeaderLogo;
