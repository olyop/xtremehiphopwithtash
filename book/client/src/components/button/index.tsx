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
		title={ariaLabel}
		disabled={disabled}
		aria-label={ariaLabel}
		onClick={onClick}
		className={`${
			text === undefined && (leftIcon !== undefined || rightIcon !== undefined)
				? "h-9 w-9 rounded-full p-2"
				: "h-9 px-4"
		} rounded font-bold ${
			transparent
				? "bg-transparent text-black hover:bg-gray-200"
				: disabled
					? "cursor-not-allowed bg-gray-200 text-gray-500 !shadow-none"
					: "bg-primary hover:bg-primary-dark cursor-pointer text-white"
		} flex items-center justify-center gap-2 text-sm uppercase ${transparent ? "" : "shadow-sm"} ${
			disabled ? "" : "hover:shadow-md"
		} select-none items-center transition-all ${className ?? ""}`}
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
	text?: ReactNode | undefined;
	ariaLabel: string;
	childrenNode?: ReactNode;
	rightIcon?: (className: string) => ReactNode;
	onClick?: (() => void) | undefined;
	className?: string | undefined;
	iconClassName?: string | undefined;
	textClassName?: string;
	disabled?: boolean | undefined;
}

export default Button;
