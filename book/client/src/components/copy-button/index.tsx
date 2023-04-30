import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import { FC, createElement, useState } from "react";

import Button from "../button";

const CopyButton: FC<PropTypes> = ({
	text,
	ariaLabel,
	className,
	buttonDimension = 6,
	iconDimension = 4,
}) => {
	const [error, setError] = useState(false);
	const [hasCopied, setHasCopied] = useState(false);

	const copyText = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setHasCopied(true);
		} catch {
			setError(true);
		} finally {
			setTimeout(() => {
				setHasCopied(false);
			}, 1000);
		}
	};

	const handleClick = () => {
		void copyText();
	};

	return (
		<Button
			transparent
			ariaLabel={ariaLabel}
			onClick={handleClick}
			className={`!w-${buttonDimension} !h-${buttonDimension} !p-0 ${className ?? ""}`}
			iconClassName={`!w-${iconDimension} !h-${iconDimension}`}
			leftIcon={iconClassName =>
				error ? (
					<ExclamationCircleIcon className={iconClassName} />
				) : hasCopied ? (
					<CheckIcon className={iconClassName} />
				) : (
					<ClipboardIcon className={iconClassName} />
				)
			}
		/>
	);
};

interface PropTypes {
	text: string;
	showText?: boolean;
	className?: string;
	ariaLabel: string;
	buttonDimension?: number;
	iconDimension?: number;
}

export default CopyButton;
