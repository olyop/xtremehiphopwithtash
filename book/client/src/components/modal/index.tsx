import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, PropsWithChildren, ReactNode, createElement, useEffect } from "react";

import { useKeyPress } from "../../hooks";
import Button from "../button";

const Modal: FC<PropsWithChildren<ModalPropTypes>> = ({
	title,
	subTitle,
	icon,
	isOpen,
	buttons,
	onClose,
	children,
	className,
	modalClassName,
	contentClassName,
}) => {
	const escapePress = useKeyPress("Escape");

	useEffect(() => {
		if (escapePress) {
			onClose();
		}
	}, [escapePress]);

	return (
		<div
			className={`inset-0 w-screen h-screen absolute z-10 transition-opacity overflow-hidden ${
				isOpen ? "opacity-100 visible" : "opacity-0 invisible"
			} ${className || ""}`}
		>
			<div
				aria-hidden
				onClick={onClose}
				className={`inset-0 cursor-pointer absolute bg-gray-900 transition-opacity ${
					isOpen ? "opacity-20 visible" : "opacity-0 invisible"
				}`}
			/>
			{isOpen && (
				<div
					className={`flex gap-4 flex-col shadow-lg rounded-md p-4 top-1/2 left-1/2 z-20 absolute w-96 -translate-x-1/2 -translate-y-1/2 bg-white ${
						modalClassName || ""
					}`}
				>
					<Button
						leftIcon={c => <XMarkIcon className={c} />}
						ariaLabel={`Close ${title}`}
						onClick={onClose}
						className="absolute -top-4 -right-4"
					/>
					<div
						className={`flex gap-2 ${
							subTitle === undefined ? "items-center" : "items-start"
						} pb-2 border-b border-b-gray-200`}
					>
						{icon(`h-5 w-5 ${subTitle === undefined ? "mt-0.5" : "mt-1.5"} select-none`)}
						<div>
							<h1 className="text-2xl">{title}</h1>
							{subTitle && <h2 className="text-sm text-gray-500">{subTitle}</h2>}
						</div>
					</div>
					<div className={contentClassName}>{children}</div>
					<div className="flex gap-2">{buttons}</div>
				</div>
			)}
		</div>
	);
};

interface ModalPropTypes {
	isOpen: boolean;
	title: string;
	subTitle?: ReactNode;
	icon: (className: string) => ReactNode;
	onClose: () => void;
	buttons: ReactNode;
	className?: string;
	modalClassName?: string;
	contentClassName?: string;
}

export default Modal;
