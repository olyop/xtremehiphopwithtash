import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/solid/ChevronUpIcon";
import { FC, createElement } from "react";

import Button from "../button";

const Buttons: FC<PropTypes> = ({ onReset, onBackOneWeek, onForwardOneWeek }) => (
	<div className="flex flex-col gap-2 justify-between border border-white">
		<Button
			ariaLabel="Reset to today"
			transparent
			onClick={onReset}
			leftIcon={className => <ArrowPathIcon className={className} />}
		/>
		<div className="bg-slate-300 h-px" />
		<Button
			ariaLabel="Go back a week"
			transparent
			onClick={onBackOneWeek}
			leftIcon={className => <ChevronUpIcon className={className} />}
		/>
		<Button
			ariaLabel="Go forward a week"
			transparent
			onClick={onForwardOneWeek}
			leftIcon={className => <ChevronDownIcon className={className} />}
		/>
	</div>
);

interface PropTypes {
	onReset: () => void;
	onBackOneWeek: () => void;
	onForwardOneWeek: () => void;
}

export default Buttons;
