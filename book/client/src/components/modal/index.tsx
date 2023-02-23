import { FC, PropsWithChildren, ReactNode, createElement, useEffect } from "react";

import { useKeyPress } from "../../hooks";

const iconClassName = "h-6 w-6 mt-0.5 select-none";

const Modal: FC<PropsWithChildren<ModalPropTypes>> = ({
	title,
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
			className={`inset-0 w-screen h-screen absolute z-10 transition-opacity ${
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
					className={`flex gap-6 flex-col shadow-lg rounded-md p-4 overflow-hidden top-1/2 left-1/2 z-20 absolute w-96 -translate-x-1/2 -translate-y-1/2 bg-white ${
						modalClassName || ""
					}`}
				>
					<div className="flex gap-2 items-center pb-2 border-b border-b-gray-200">
						{icon(iconClassName)}
						<h1 className="text-2xl">{title}</h1>
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
	icon: (className: string) => ReactNode;
	onClose: () => void;
	buttons: ReactNode;
	className?: string;
	modalClassName?: string;
	contentClassName?: string;
}

export default Modal;
