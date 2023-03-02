import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import ChevronDownIcon from "@heroicons/react/24/solid/ChevronDownIcon";
import ChevronUpIcon from "@heroicons/react/24/solid/ChevronUpIcon";
import { FC, createElement, useRef, useState } from "react";

import Button from "../button";
import { Schedule as ScheduleType, generateSchedule } from "./generate-days";
import "./index.scss";

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Schedule: FC = () => {
	const relativeNow = useRef(Date.now());
	const [schedule, setSchedule] = useState<ScheduleType>(generateSchedule(relativeNow.current));

	const handleResetClick = () => {
		relativeNow.current = Date.now();
		setSchedule(generateSchedule(Date.now()));
	};

	const handleBackOneWeekClick = () => {
		const date = new Date(relativeNow.current);

		if (date.getDay() !== 0) {
			date.setDate(date.getDate() - 7);
		}

		relativeNow.current = date.getTime();

		setSchedule(generateSchedule(date.getTime()));
	};

	const handleForwardOneWeekClick = () => {
		const date = new Date(relativeNow.current);

		if (date.getDay() !== 0) {
			date.setDate(date.getDate() + 7);
		}

		relativeNow.current = date.getTime();

		setSchedule(generateSchedule(date.getTime()));
	};

	return (
		<div data-starting={schedule.startingTime} className="w-full h-full Schedule">
			<div className="border border-gray-300 bg-gray-300 Schedule__calendar">
				{dayNames.map(day => (
					<p key={day} className="p-2 text-sm font-bold text-center uppercase">
						{day}
					</p>
				))}
				{schedule.days.map(({ unix, isToday, label }) => (
					<div
						key={unix}
						data-unix={unix}
						className={`bg-white p-1 cursor-pointer transition-colors hover:bg-gray-100 ${
							isToday ? "!bg-gray-200 hover:!bg-gray-300" : ""
						}`}
					>
						<p className="text-sm text-center select-none">{label}</p>
					</div>
				))}
			</div>
			<div className="flex flex-col gap-2 justify-between border border-white">
				<Button
					ariaLabel="Reset to today"
					transparent
					onClick={handleResetClick}
					leftIcon={className => <ArrowPathIcon className={className} />}
				/>
				<div className="bg-slate-300 h-px" />
				<Button
					ariaLabel="Go back a week"
					transparent
					onClick={handleBackOneWeekClick}
					leftIcon={className => <ChevronUpIcon className={className} />}
				/>
				<Button
					ariaLabel="Go forward a week"
					transparent
					onClick={handleForwardOneWeekClick}
					leftIcon={className => <ChevronDownIcon className={className} />}
				/>
			</div>
		</div>
	);
};

export default Schedule;
