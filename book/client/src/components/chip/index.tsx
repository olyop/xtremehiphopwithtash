import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, ReactNode, createElement } from "react";

const Chip: FC<Props> = ({ chip: { icon, photo, text, onRemove }, onClick, className }) => (
	<button
		type="button"
		onClick={onClick}
		role={onClick ? "button" : undefined}
		onKeyDown={onClick ? () => {} : undefined}
		className={`flex h-8 items-center justify-center gap-1.5 rounded-2xl p-1 text-gray-700 shadow transition-shadow hover:shadow-md ${
			photo ? "" : "pl-2"
		} ${onRemove ? "pr-1" : "pr-3"} border ${className || ""} ${
			onClick ? "cursor-pointer transition-colors hover:bg-gray-200" : ""
		}`}
	>
		{icon && icon("h-6 w-6 rounded-2xl select-none")}
		{photo && <img src={photo} alt={text} className="h-6 w-6 select-none rounded-2xl" />}
		<p className="text-sm">{text}</p>
		{onRemove && <XMarkIcon className="!size-6" />}
	</button>
);

export interface ChipInput {
	chipID: string;
	icon?: (className: string) => ReactNode;
	photo?: string;
	text: string;
	onRemove?: () => void;
}

interface Props {
	chip: ChipInput;
	onClick?: () => void;
	className?: string;
}

export default Chip;
