import { ApolloError } from "@apollo/client/errors";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, PropsWithChildren, ReactNode, createElement, useEffect } from "react";

import { useKeyPress } from "../../hooks";
import Button from "../button";
import FormError from "../form-error";

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const isMobile = "userAgentData" in navigator ? (navigator.userAgentData.mobile as boolean) : false;

const Modal: FC<PropsWithChildren<ModalProps>> = ({
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
	errorClassName,
	backgroundClassName,
	isLarge = false,
	hideTitle = false,
	centerTitle = false,
	hideCloseButton = false,
	disableCloseOnEscape = false,
	enableSwipeClose = false,
}) => {
	const escapePress = useKeyPress("Escape");

	const handleClose = () => {
		if (onClose && !disableCloseOnEscape) {
			onClose();
		}
	};

	const handleSwiped: EventListener = event => {
		event.stopPropagation();

		handleClose();
	};

	useEffect(() => {
		if (enableSwipeClose) {
			document.addEventListener("swiped", handleSwiped);
		}

		return () => {
			if (enableSwipeClose) {
				document.removeEventListener("swiped", handleSwiped);
			}
		};
	}, []);

	useEffect(() => {
		if (escapePress) {
			handleClose();
		}
	}, [escapePress]);

	return (
		<div
			data-test={isLarge}
			className={`fixed inset-0 z-[100] h-screen w-screen overflow-hidden transition-opacity ${
				isOpen ? "visible opacity-100" : "invisible opacity-0"
			} ${className ?? ""}`}
		>
			<div
				aria-hidden
				onClick={disableCloseOnEscape ? undefined : onClose}
				className={`absolute inset-0 z-[110] cursor-pointer bg-gray-900 transition-opacity ${
					isOpen ? "visible opacity-50" : "invisible opacity-0"
				} ${backgroundClassName ?? ""}`}
			/>
			{isOpen && (
				<div
					className={`md:w-booking-modal lg:w-booking-modal absolute left-1/2 top-8 z-[120] flex max-h-[calc(100vh_-_5rem)] w-[calc(100vw_-_3rem)] -translate-x-1/2 flex-col gap-4 rounded-md bg-white p-4 shadow-lg md:top-1/2 md:-translate-y-1/2 ${
						modalClassName ?? ""
					}`}
				>
					{!disableCloseOnEscape && !hideCloseButton && onClose && title && (
						<Button
							onClick={onClose}
							ariaLabel={`Close ${title}`}
							className="absolute -right-4 -top-4 h-auto rounded py-1 sm:py-2"
							leftIcon={c => <XMarkIcon className={c} />}
							text={
								isMobile ? (
									"Close"
								) : (
									<div className="flex items-center gap-2">
										<span>Close</span>
										<span className="rounded border px-1 py-0.5 text-xs">ESC</span>
									</div>
								)
							}
						/>
					)}
					{!hideTitle && icon && (
						<div
							className={`-mt-1 flex gap-2 ${subTitle === undefined ? "items-center" : "items-start"} ${
								centerTitle ? "justify-center" : "justify-start"
							} border-b border-b-gray-200 pb-2`}
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
					{error && (
						<div className={errorClassName}>
							<FormError error={error} />
						</div>
					)}
					{buttons && <div className={`flex gap-2 ${buttonClassName ?? ""}`}>{buttons}</div>}
				</div>
			)}
		</div>
	);
};

interface ModalProps {
	isOpen: boolean;
	title?: string;
	titleContent?: ReactNode;
	subTitle?: ReactNode;
	icon?: (className: string) => ReactNode;
	onClose?: () => void;
	error?: ApolloError | undefined;
	errorClassName?: string;
	buttons?: ReactNode;
	className?: string | undefined;
	modalClassName?: string | undefined;
	contentClassName?: string;
	buttonClassName?: string;
	backgroundClassName?: string;
	hideTitle?: boolean;
	centerTitle?: boolean;
	disableCloseOnEscape?: boolean;
	isLarge?: boolean;
	hideCloseButton?: boolean;
	enableSwipeClose?: boolean;
}

export default Modal;
