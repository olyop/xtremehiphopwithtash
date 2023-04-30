import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import ShareIcon from "@heroicons/react/24/solid/ShareIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";
import { useShare } from "../../hooks";

const ShareButton: FC<PropTypes> = ({ url, isSessionInPast }) => {
	const [share, { hasShared, shareText }] = useShare();

	const handleClick = () => {
		void share({
			url,
		});
	};

	return isSessionInPast ? null : (
		<Button
			transparent
			onClick={handleClick}
			ariaLabel={shareText}
			className="!h-14 !w-14 items-center justify-center"
			leftIcon={className =>
				hasShared ? (
					<CheckIcon className={className} />
				) : (
					<ShareIcon className={`${className} mr-0.5 h-7 w-7`} />
				)
			}
		/>
	);
};

interface PropTypes {
	url: string;
	isSessionInPast: boolean;
}

export default ShareButton;
