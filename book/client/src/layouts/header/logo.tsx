import { FC, createElement } from "react";
import { Link } from "react-router-dom";

const HeaderLogo: FC = () => (
	<Link
		to="/"
		className="absolute top-1/2 left-1/2 h-header-height -translate-y-1/2 -translate-x-1/2 p-3 flex items-center"
	>
		<img
			src="/images/full-logo.png"
			alt="Xtreme Hip-Hop with Tash"
			title="Xtreme Hip-Hop with Tash"
			className="h-[42px] sm:h-[56px] w-[120px] sm:w-[160px]"
		/>
	</Link>
);

export default HeaderLogo;
