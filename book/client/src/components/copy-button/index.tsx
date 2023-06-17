import CheckIcon from "@heroicons/react/24/outline/CheckIcon";
import ClipboardIcon from "@heroicons/react/24/outline/ClipboardIcon";
import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import { FC, createElement, useState } from "react";

import Button from "../button";

const CopyButton: FC<PropTypes> = ({
	text,
	buttonText,
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
			}, 1500);
		}
	};

	const handleClick = () => {
		void copyText();
	};

	return (
		<Button
			transparent={buttonText === undefined}
			text={buttonText && hasCopied ? "Copied" : buttonText}
			ariaLabel={ariaLabel}
			onClick={handleClick}
			className={`${buttonText ? "p-4" : `!w-${buttonDimension} !p-0`} !h-${buttonDimension} ${className ?? ""}`}
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
	buttonText?: string;
	showText?: boolean;
	className?: string;
	ariaLabel: string;
	buttonDimension?: number;
	iconDimension?: number;
}

export default CopyButton;
