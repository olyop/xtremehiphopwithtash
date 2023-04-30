import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/solid/ChevronUpIcon";
import { FC, createElement } from "react";

import { Breakpoint } from "../../hooks";
import Button from "../button";

const determineForwardLabel = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.SMALL) {
		return "+2 days";
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return "+3 days";
	} else {
		return "+1 week";
	}
};

const determineBackLabel = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.SMALL) {
		return "-2 days";
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return "-3 days";
	} else {
		return "-1 week";
	}
};

const ScheduleControls: FC<PropTypes> = ({
	onReset,
	breakpoint,
	onBackOneWeek,
	onForwardOneWeek,
}) => {
	const isMobile = breakpoint === Breakpoint.SMALL || breakpoint === Breakpoint.MEDIUM;
	return (
		<div className="flex flex-row justify-between w-full gap-2 p-2 lg:pl-4 lg:p-4 lg:gap-3 lg:justify-between lg:flex-col">
			<Button
				transparent
				onClick={onReset}
				ariaLabel="Reset to today"
				leftIcon={className => <ArrowPathIcon className={className} />}
			/>
			<div className="hidden w-full h-px lg:block lg:h-px bg-slate-300" />
			<div className="grid flex-grow grid-cols-2 grid-rows-1 gap-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-2">
				<Button
					onClick={onBackOneWeek}
					transparent={breakpoint === Breakpoint.LARGE}
					text={isMobile ? determineBackLabel(breakpoint) : undefined}
					ariaLabel={`Go back ${determineBackLabel(breakpoint)}`}
					leftIcon={className => <ChevronUpIcon className={className} />}
				/>
				<Button
					onClick={onForwardOneWeek}
					transparent={breakpoint === Breakpoint.LARGE}
					text={isMobile ? determineForwardLabel(breakpoint) : undefined}
					ariaLabel={`Go forward ${determineForwardLabel(breakpoint)}`}
					leftIcon={className => <ChevronDownIcon className={className} />}
				/>
			</div>
		</div>
	);
};

interface PropTypes {
	onReset: () => void;
	breakpoint: Breakpoint;
	onBackOneWeek: () => void;
	onForwardOneWeek: () => void;
}

export default ScheduleControls;
