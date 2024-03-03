import ExclamationCircleIcon from "@heroicons/react/24/outline/ExclamationCircleIcon";
import ArrowPathIcon from "@heroicons/react/24/solid/ArrowPathIcon";
import ChevronDoubleDownIcon from "@heroicons/react/24/solid/ChevronDoubleDownIcon";
import ChevronDoubleUpIcon from "@heroicons/react/24/solid/ChevronDoubleUpIcon";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/solid/ChevronUpIcon";
import { FC, createElement } from "react";

import Button from "../../components/button";
import { Breakpoint } from "../../hooks";

const determineForwardLabel = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL) {
		return "Future";
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return "+3 days";
	} else {
		return "+1 week";
	}
};

const determineBackLabel = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL) {
		return "Past";
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return "-3 days";
	} else {
		return "-1 week";
	}
};

const ScheduleControls: FC<Props> = ({
	isLoading,
	isOffline,
	isFirstDayToday,
	isFirstDayInPast,
	onReset,
	breakpoint,
	onBackOneWeek,
	onForwardOneWeek,
}) => {
	const isMobile = breakpoint !== Breakpoint.LARGE;

	return (
		<div className="flex w-full flex-row justify-between gap-2 p-2 lg:flex-col lg:justify-between lg:gap-3 lg:p-4 lg:pl-4">
			<Button
				transparent
				onClick={onReset}
				disabled={isOffline || isLoading}
				className="!px-2 disabled:bg-transparent"
				ariaLabel={isFirstDayToday ? "Refresh" : "Go to today"}
				text={isMobile ? (isOffline ? "Offline" : isFirstDayToday ? undefined : "Today") : undefined}
				leftIcon={className =>
					isOffline ? (
						<ExclamationCircleIcon className={className} />
					) : isLoading ? (
						<ArrowPathIcon className={`${className} animate-spin`} />
					) : isMobile ? (
						isFirstDayToday ? (
							<ArrowPathIcon className={className} />
						) : isFirstDayInPast ? (
							<ChevronDoubleDownIcon className={className} />
						) : (
							<ChevronDoubleUpIcon className={className} />
						)
					) : (
						<ArrowPathIcon className={className} />
					)
				}
			/>
			<div className="hidden h-px w-full bg-slate-300 lg:block lg:h-px" />
			<div className="grid flex-grow grid-cols-2 grid-rows-1 gap-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-2">
				<Button
					disabled={isOffline}
					className="gap-3 px-1.5"
					onClick={onBackOneWeek}
					textClassName="tracking-widest"
					transparent={breakpoint === Breakpoint.LARGE}
					text={isMobile ? determineBackLabel(breakpoint) : undefined}
					ariaLabel={`Go back ${determineBackLabel(breakpoint)}`}
					leftIcon={className => <ChevronUpIcon className={className} />}
				/>
				<Button
					disabled={isOffline}
					className="gap-3 px-1.5"
					onClick={onForwardOneWeek}
					textClassName="tracking-widest"
					transparent={breakpoint === Breakpoint.LARGE}
					text={isMobile ? determineForwardLabel(breakpoint) : undefined}
					ariaLabel={`Go forward ${determineForwardLabel(breakpoint)}`}
					leftIcon={className => <ChevronDownIcon className={className} />}
				/>
			</div>
		</div>
	);
};

interface Props {
	isLoading: boolean;
	isOffline: boolean;
	onReset: () => void;
	breakpoint: Breakpoint;
	onBackOneWeek: () => void;
	isFirstDayToday: boolean;
	isFirstDayInPast: boolean;
	onForwardOneWeek: () => void;
}

export default ScheduleControls;
