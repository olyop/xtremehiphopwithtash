import { ApolloError } from "@apollo/client";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, PropsWithChildren, ReactNode, createElement, useEffect } from "react";

import { useKeyPress } from "../../hooks";
import Button from "../button";
import FormError from "../form-error";

const Modal: FC<PropsWithChildren<ModalPropTypes>> = ({
	title,
	titleContent,
	subTitle,
	icon,
	isOpen,
	error,
	buttons,
	onClose,
	children,
	className,
	modalClassName,
	contentClassName,
	buttonClassName,
	isLarge = false,
	hideTitle = false,
	centerTitle = false,
	hideCloseButton = false,
	disableCloseOnEscape = false,
}) => {
	const escapePress = useKeyPress("Escape");

	useEffect(() => {
		if (escapePress && onClose) {
			onClose();
		}
	}, [escapePress]);

	return (
		<div
			className={`inset-0 w-screen h-screen fixed z-[100] transition-opacity overflow-hidden ${
				isOpen ? "opacity-100 visible" : "opacity-0 invisible"
			} ${className || ""}`}
		>
			<div
				aria-hidden
				onClick={disableCloseOnEscape ? undefined : onClose}
				className={`inset-0 cursor-pointer absolute z-[110] bg-gray-900 transition-opacity ${
					isOpen ? "opacity-50 visible" : "opacity-0 invisible"
				}`}
			/>
			{isOpen && (
				<div
					className={`flex gap-4 flex-col shadow-lg rounded-md p-4 top-6 md:top-1/2 left-1/2 z-[120] absolute ${
						isLarge ? "md:w-booking-modal lg:w-booking-modal" : "md:w-96 lg:w-96"
					} w-[calc(100vw_-_2.5rem)] max-h-[calc(100vh_-_6rem)] -translate-x-1/2 md:-translate-y-1/2 bg-white ${
						modalClassName || ""
					}`}
				>
					{!disableCloseOnEscape && !hideCloseButton && onClose && (
						<Button
							onClick={onClose}
							ariaLabel={`Close ${title}`}
							className="absolute -top-4 -right-4"
							leftIcon={c => <XMarkIcon className={c} />}
						/>
					)}
					{hideTitle || (
						<div
							className={`flex gap-2 -mt-1 ${
								subTitle === undefined ? "items-center" : "items-start"
							} ${
								centerTitle ? "justify-center" : "justify-start"
							} pb-2 border-b border-b-gray-200`}
						>
							{icon(`h-5 w-5 ${subTitle === undefined ? "mt-0.5" : "mt-1.5"} select-none`)}
							<div className="flex flex-col gap-1">
								<h1 className="text-xl md:text-2xl">{title}</h1>
								{titleContent}
								{subTitle && <h2 className="text-sm text-gray-500">{subTitle}</h2>}
							</div>
						</div>
					)}
					<div className={`overflow-auto py-2 ${contentClassName ?? ""}`}>{children}</div>
					{error && <FormError error={error} />}
					{buttons && <div className={`flex gap-2 ${buttonClassName ?? ""}`}>{buttons}</div>}
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
	onClose?: () => void;
	error?: ApolloError | undefined;
	buttons?: ReactNode;
	className?: string;
	modalClassName?: string;
	contentClassName?: string;
	buttonClassName?: string;
	hideTitle?: boolean;
	centerTitle?: boolean;
	disableCloseOnEscape?: boolean;
	isLarge?: boolean;
	hideCloseButton?: boolean;
}

export default Modal;
