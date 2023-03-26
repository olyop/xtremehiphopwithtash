import { useApolloClient } from "@apollo/client";
import { FC, Fragment, createElement, useEffect, useRef, useState } from "react";

import { useBreakpoint } from "../../hooks";
import Controls from "./controls";
import Days from "./days";
import { generateSchedule } from "./generate-days";
import {
	determineDecrementAction,
	determineIncrementAction,
	getStartingTime,
	setStartingTime,
} from "./helpers";
import { Schedule as ScheduleType } from "./types";
import WeekDays from "./week-days";

const Schedule: FC = () => {
	const apollo = useApolloClient();

	const breakpoint = useBreakpoint();
	const relativeDate = useRef(Date.now());

	const [schedule, setSchedule] = useState<ScheduleType>({
		startingTime: getStartingTime(),
		days: [],
	});

	const getSchedule = async (date: Date) => {
		const unixTime = date.getTime();
		relativeDate.current = unixTime;
		setStartingTime(unixTime);
		setSchedule(await generateSchedule(apollo)(unixTime, breakpoint));
	};

	const handleResetClick = () => {
		const now = new Date();

		setStartingTime(now.getTime());

		void getSchedule(now);
	};

	const handleBackOneWeekClick = () => {
		const date = determineDecrementAction(breakpoint)(new Date(relativeDate.current));
		void getSchedule(date);
	};

	const handleForwardOneWeekClick = () => {
		const date = determineIncrementAction(breakpoint)(new Date(relativeDate.current));
		void getSchedule(date);
	};

	const handleSessionsUpdate = () => {
		const date = new Date(relativeDate.current);
		void getSchedule(date);
	};

	useEffect(() => {
		void getSchedule(new Date(getStartingTime()));
	}, [breakpoint]);

	return (
		<div
			data-starting={schedule.startingTime}
			className="w-full h-full flex flex-col-reverse justify-end gap-4 lg:grid lg:items-start lg:gap-4 lg:grid-cols-[1fr_2.25rem] grid-rows-[100%]"
		>
			<div className="h-full grid lg:grid-rows-[2.25rem,_auto]">
				{schedule.days.length > 0 ? (
					<Fragment>
						<WeekDays />
						<Days
							schedule={schedule}
							breakpoint={breakpoint}
							onSessionUpdate={handleSessionsUpdate}
						/>
					</Fragment>
				) : (
					<p>Loading...</p>
				)}
			</div>
			<Controls
				breakpoint={breakpoint}
				onReset={handleResetClick}
				onBackOneWeek={handleBackOneWeekClick}
				onForwardOneWeek={handleForwardOneWeekClick}
			/>
		</div>
	);
};

export default Schedule;
