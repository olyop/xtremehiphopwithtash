import { FC, ReactNode, createElement } from "react";

const iconClassName = "h-5 w-5";

const Button: FC<ButtonPropTypes> = ({
	transparent = false,
	leftIcon,
	text,
	ariaLabel,
	rightIcon,
	onClick,
	className,
	disabled,
}) => (
	<button
		type="button"
		title={text ?? ariaLabel}
		disabled={disabled}
		aria-label={ariaLabel}
		onClick={onClick}
		className={`${
			(text === undefined && leftIcon !== undefined) || rightIcon !== undefined
				? "p-2 rounded-full w-9 h-9"
				: "px-4 h-9"
		} h-10 font-bold rounded ${
			transparent
				? "text-black bg-transparent hover:bg-gray-200"
				: "text-white bg-primary hover:bg-primary-dark"
		} text-sm uppercase flex gap-2 ${
			transparent ? "" : "shadow-sm"
		} hover:shadow-md select-none transition-all items-center ${className ?? ""}`}
	>
		{leftIcon && leftIcon(iconClassName)}
		{text}
		{rightIcon && rightIcon(iconClassName)}
	</button>
);

export interface ButtonPropTypes {
	transparent?: boolean;
	leftIcon?: (className: string) => ReactNode;
	text?: string;
	ariaLabel: string;
	rightIcon?: (className: string) => ReactNode;
	onClick: () => void;
	className?: string;
	disabled?: boolean;
}

export default Button;
