import { FC, ReactNode, createElement } from "react";

const baseIconClassName = "h-5 w-5";

const Button: FC<ButtonProps> = ({
	id,
	transparent = false,
	isSubmit = false,
	leftIcon,
	text,
	ariaLabel,
	rightIcon,
	onClick,
	className,
	iconClassName,
	textClassName,
	disabled,
	childrenNode,
}) => (
	<button
		id={id}
		type={isSubmit ? "submit" : "button"}
		title={text ?? ariaLabel}
		disabled={disabled}
		aria-label={ariaLabel}
		onClick={onClick}
		className={`${
			text === undefined && (leftIcon !== undefined || rightIcon !== undefined)
				? "p-2 rounded-full w-9 h-9"
				: "px-4 h-9"
		} font-bold rounded ${
			transparent
				? "text-black bg-transparent hover:bg-gray-200"
				: disabled
				  ? "cursor-not-allowed text-gray-500 bg-gray-200 !shadow-none"
				  : "cursor-pointer text-white bg-primary hover:bg-primary-dark"
		} text-sm uppercase flex items-center justify-center gap-2 ${transparent ? "" : "shadow-sm"} ${
			disabled ? "" : "hover:shadow-md"
		} select-none transition-all items-center ${className ?? ""}`}
	>
		{leftIcon && leftIcon(`${baseIconClassName} ${iconClassName ?? ""}`)}
		{text && <span className={textClassName}>{text}</span>}
		{rightIcon && rightIcon(`${baseIconClassName} ${iconClassName ?? ""}`)}
		{childrenNode}
	</button>
);

export interface ButtonProps {
	id?: string;
	transparent?: boolean;
	isSubmit?: boolean;
	leftIcon?: (className: string) => ReactNode;
	text?: string | undefined;
	ariaLabel: string;
	childrenNode?: ReactNode;
	rightIcon?: (className: string) => ReactNode;
	onClick?: (() => void) | undefined;
	className?: string | undefined;
	iconClassName?: string | undefined;
	textClassName?: string;
	disabled?: boolean;
}

export default Button;
