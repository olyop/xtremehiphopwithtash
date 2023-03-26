import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import MinusIcon from "@heroicons/react/24/solid/MinusIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { FC, createElement } from "react";

import { Breakpoint } from "../../hooks";
import Button from "../button";

const determineForwardLabel = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.SMALL) {
		return "2 days";
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return "3 days";
	} else {
		return "1 week";
	}
};

const determineBackLabel = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.SMALL) {
		return "2 days";
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return "3 days";
	} else {
		return "1 week";
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
		<div className="flex flex-row lg:gap-3 justify-end border border-white lg:justify-between lg:flex-col">
			<Button
				ariaLabel="Reset to today"
				transparent
				text={isMobile ? "Refresh" : undefined}
				onClick={onReset}
				leftIcon={className => <ArrowPathIcon className={className} />}
			/>
			<div className="hidden w-full h-px lg:block lg:h-px bg-slate-300" />
			<div className="flex md:flex-row lg:flex-col lg:gap-0">
				<Button
					transparent
					onClick={onBackOneWeek}
					text={isMobile ? determineBackLabel(breakpoint) : undefined}
					ariaLabel={`Go back ${determineBackLabel(breakpoint)}`}
					leftIcon={className => <MinusIcon className={className} />}
				/>
				<Button
					transparent
					onClick={onForwardOneWeek}
					text={isMobile ? determineForwardLabel(breakpoint) : undefined}
					ariaLabel={`Go forward ${determineForwardLabel(breakpoint)}`}
					leftIcon={className => <PlusIcon className={className} />}
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
