import { FC, ReactNode, createElement } from "react";

const iconClassName = "h-5 w-5";

const Button: FC<ButtonPropTypes> = ({
	id,
	transparent = false,
	leftIcon,
	text,
	ariaLabel,
	rightIcon,
	onClick,
	className,
	textClassName,
	disabled,
}) => (
	<button
		id={id}
		type="button"
		title={text ?? ariaLabel}
		disabled={disabled}
		aria-label={ariaLabel}
		onClick={onClick}
		className={`${
			text === undefined && (leftIcon !== undefined || rightIcon !== undefined)
				? "p-2 rounded-full w-9 h-9"
				: "px-4 h-9"
		} h-10 font-bold rounded ${
			transparent
				? "text-black bg-transparent hover:bg-gray-200"
				: disabled
				? "cursor-not-allowed text-gray-400 bg-gray-200"
				: "cursor-pointer text-white bg-primary hover:bg-primary-dark"
		} text-sm uppercase flex gap-2 ${transparent ? "" : "shadow-sm"} ${
			disabled ? "" : "hover:shadow-md"
		} select-none transition-all items-center ${className ?? ""}`}
	>
		{leftIcon && leftIcon(iconClassName)}
		{textClassName ? <span className={textClassName}>{text}</span> : text}
		{rightIcon && rightIcon(iconClassName)}
	</button>
);

export interface ButtonPropTypes {
	id?: string;
	transparent?: boolean;
	leftIcon?: (className: string) => ReactNode;
	text?: string | undefined;
	ariaLabel: string;
	rightIcon?: (className: string) => ReactNode;
	onClick?: () => void;
	className?: string;
	textClassName?: string;
	disabled?: boolean;
}

export default Button;
