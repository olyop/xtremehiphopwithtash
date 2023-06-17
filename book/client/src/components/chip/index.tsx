import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, ReactNode, createElement } from "react";

import Button from "../button";

const Chip: FC<PropTypes> = ({ chip: { icon, photo, text, onRemove }, onClick, className }) => (
	<div
		onClick={onClick}
		role={onClick ? "button" : undefined}
		onKeyDown={onClick ? () => {} : undefined}
		className={`flex items-center justify-center gap-1.5 h-8 rounded-2xl text-gray-700 p-1 ${photo ? "" : "pl-2"} ${
			onRemove ? "pr-1" : "pr-3"
		} border ${className || ""} ${onClick ? "cursor-pointer transition-colors hover:bg-gray-200" : ""}`}
	>
		{icon && icon("h-6 w-6 rounded-2xl select-none")}
		{photo && <img src={photo} alt={text} className="h-6 w-6 rounded-2xl select-none" />}
		<p className="text-sm">{text}</p>
		{onRemove && (
			<Button
				transparent
				ariaLabel="Remove"
				onClick={onRemove}
				className="!w-6 !h-6 mt-[-2px]"
				leftIcon={iconClassName => <XMarkIcon className={iconClassName} />}
			/>
		)}
	</div>
);

export interface ChipInput {
	chipID: string;
	icon?: (className: string) => ReactNode;
	photo?: string;
	text: string;
	onRemove?: () => void;
}

interface PropTypes {
	chip: ChipInput;
	onClick?: () => void;
	className?: string;
}

export default Chip;
