import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, PropsWithChildren, ReactNode, createElement, useEffect } from "react";

import { useKeyPress } from "../../hooks";
import Button from "../button";

const Modal: FC<PropsWithChildren<ModalPropTypes>> = ({
	title,
	titleContent,
	subTitle,
	icon,
	isOpen,
	buttons,
	onClose,
	children,
	className,
	modalClassName,
	contentClassName,
	isBookingModal = false,
	disableCloseOnEscape = false,
}) => {
	const escapePress = useKeyPress("Escape");

	useEffect(() => {
		if (escapePress) {
			onClose();
		}
	}, [escapePress]);

	return (
		<div
			className={`inset-0 w-screen h-screen absolute z-20 transition-opacity overflow-hidden ${
				isOpen ? "opacity-100 visible" : "opacity-0 invisible"
			} ${className || ""}`}
		>
			<div
				aria-hidden
				onClick={disableCloseOnEscape ? undefined : onClose}
				className={`inset-0 cursor-pointer absolute z-30 bg-gray-900 transition-opacity ${
					isOpen ? "opacity-20 visible" : "opacity-0 invisible"
				}`}
			/>
			{isOpen && (
				<div
					className={`flex gap-4 flex-col shadow-lg rounded-md p-4 pt-3 top-1/2 left-1/2 z-40 absolute ${
						isBookingModal ? "w-booking-modal" : "w-96"
					} -translate-x-1/2 -translate-y-1/2 bg-white ${modalClassName || ""}`}
				>
					{disableCloseOnEscape || (
						<Button
							leftIcon={c => <XMarkIcon className={c} />}
							ariaLabel={`Close ${title}`}
							onClick={onClose}
							className="absolute -top-4 -right-4"
						/>
					)}
					<div
						className={`flex gap-2 ${
							subTitle === undefined ? "items-center" : "items-start"
						} pb-2 border-b border-b-gray-200`}
					>
						{icon(`h-5 w-5 ${subTitle === undefined ? "mt-0.5" : "mt-1.5"} select-none`)}
						<div className="flex gap-1 flex-col">
							<h1 className="text-2xl">{title}</h1>
							{titleContent}
							{subTitle && <h2 className="text-sm text-gray-500">{subTitle}</h2>}
						</div>
					</div>
					<div className={contentClassName}>{children}</div>
					{buttons && <div className="flex gap-2">{buttons}</div>}
				</div>
			)}
		</div>
	);
};

interface ModalPropTypes {
	isOpen: boolean;
	title: string;
	titleContent?: ReactNode;
	subTitle?: ReactNode;
	icon: (className: string) => ReactNode;
	onClose: () => void;
	buttons?: ReactNode;
	className?: string;
	modalClassName?: string;
	contentClassName?: string;
	disableCloseOnEscape?: boolean;
	isBookingModal?: boolean;
}

export default Modal;
