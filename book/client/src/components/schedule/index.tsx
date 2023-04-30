import { useApolloClient } from "@apollo/client";
import { FC, createElement, useEffect, useRef, useState } from "react";

import { useBreakpoint, useHasMounted } from "../../hooks";
import Controls from "./controls";
import Days from "./days";
import { determineStartAndEndDate, generateDays, generateDaysWithSessions } from "./generate";
import {
	determineDecrementAction,
	determineIncrementAction,
	getStartingTime,
	setStartingTime,
} from "./helpers";
import { Day as DayType } from "./types";
import WeekDays from "./week-days";

const Schedule: FC = () => {
	const loading = useRef(false);
	const apollo = useApolloClient();
	const breakpoint = useBreakpoint();
	const hasMounted = useHasMounted();
	const relativeDate = useRef(Date.now());

	const [days, setDays] = useState<DayType[]>(() => {
		const [startingDate, endingDate] = determineStartAndEndDate(
			new Date(getStartingTime()),
			breakpoint,
		);

		return generateDays(breakpoint, startingDate, endingDate, []);
	});

	const handleSchedule = async (date: Date) => {
		loading.current = true;
		const unixTime = date.getTime();
		relativeDate.current = unixTime;
		setStartingTime(unixTime);
		const schedule = await generateDaysWithSessions(apollo)(unixTime, breakpoint);
		setDays(schedule);
		loading.current = false;
	};

	const handleResetClick = () => {
		const date = new Date();
		void handleSchedule(date);
	};

	const handleBackOneWeekClick = () => {
		const date = new Date(relativeDate.current);
		const newDate = determineDecrementAction(breakpoint)(date);
		void handleSchedule(newDate);
	};

	const handleForwardOneWeekClick = () => {
		const date = new Date(relativeDate.current);
		const newDate = determineIncrementAction(breakpoint)(date);
		void handleSchedule(newDate);
	};

	const handleSessionsUpdate = () => {
		const date = new Date(getStartingTime());
		void handleSchedule(date);
	};

	useEffect(() => {
		if (hasMounted) {
			const date = new Date(getStartingTime());
			void handleSchedule(date);
		}
	}, [breakpoint]);

	useEffect(() => {
		if (!loading.current) {
			const date = new Date(getStartingTime());
			void handleSchedule(date);
		}
	}, []);

	return (
		<div className="h-full flex flex-col-reverse lg:grid lg:grid-rows-[1fr,_3.25rem] lg:items-start lg:grid-cols-[1fr_4.2rem]">
			<div className="lg:grid lg:grid-rows-[2.25rem,_auto]">
				<WeekDays />
				<Days days={days} onSessionUpdate={handleSessionsUpdate} />
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
