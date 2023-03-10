import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, createElement } from "react";

import Button from "../button";

const Chip: FC<PropTypes> = ({ chip: { photo, text, onRemove }, className }) => (
	<div
		className={`flex items-center justify-center gap-2 h-8 rounded-2xl text-gray-700 p-1 ${
			onRemove ? "pr-1" : "pr-3"
		} border ${className || ""}`}
	>
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
	photo?: string;
	text: string;
	onRemove?: () => void;
}

interface PropTypes {
	chip: ChipInput;
	className?: string;
}

export default Chip;
