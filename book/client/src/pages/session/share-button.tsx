import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import ShareIcon from "@heroicons/react/24/solid/ShareIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";
import { useShare } from "../../hooks";

const ShareButton: FC<Props> = ({ url, isSessionInPast }) => {
	const [share, { hasShared, shareText }] = useShare();

	const handleClick = () => {
		void share({
			url,
		});
	};

	return isSessionInPast ? null : (
		<Button
			onClick={handleClick}
			ariaLabel={shareText}
			text={shareText}
			className="!h-14 items-center justify-center rounded-xl"
			leftIcon={className =>
				hasShared ? <CheckIcon className={className} /> : <ShareIcon className={`${className} mr-0.5 h-7 w-7`} />
			}
		/>
	);
};

interface Props {
	url: string;
	isSessionInPast: boolean;
}

export default ShareButton;
