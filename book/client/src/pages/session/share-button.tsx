import ArrowPathIcon from "@heroicons/react/20/solid/ArrowPathIcon";
import CheckIcon from "@heroicons/react/20/solid/CheckIcon";
import ClipboardIcon from "@heroicons/react/20/solid/ClipboardIcon";
import ExclamationTriangleIcon from "@heroicons/react/20/solid/ExclamationTriangleIcon";
import ShareIcon from "@heroicons/react/20/solid/ShareIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";
import { useShare } from "../../hooks";

const ShareButton: FC<Props> = ({ text }) => {
	const [handleShare, { hasShared, hasCopiedShared, hasError }] = useShare(text);

	return (
		<Button
			onClick={handleShare}
			textClassName="!text-xl"
			ariaLabel={`Copy '${text}' to clipboard`}
			className="!h-16 px-6 shadow-xl hover:shadow-xl rounded-xl gap-4"
			text={
				hasShared === null
					? "Share"
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
					<ShareIcon className={`${className} !h-8 !w-8`} />
				) : hasShared ? (
					hasCopiedShared ? (
						hasError ? (
							<ExclamationTriangleIcon className={`${className} !h-8 !w-8`} />
						) : (
							<ClipboardIcon className={`${className} !h-8 !w-8`} />
						)
					) : (
						<CheckIcon className={`${className} !h-8 !w-8`} />
					)
				) : (
					<ArrowPathIcon className={`${className} !h-8 !w-8`} />
				)
			}
		/>
	);
};

interface Props {
	text: string;
}

export default ShareButton;
