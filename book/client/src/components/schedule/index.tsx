import { useApolloClient } from "@apollo/client";
import { FC, Fragment, createElement, useEffect, useRef, useState } from "react";

import Buttons from "./buttons";
import Days from "./days";
import { generateSchedule } from "./generate-days";
import { addOneWeek, minusOneWeek } from "./helpers";
import { Schedule as ScheduleType } from "./types";
import WeekDays from "./week-days";

const Schedule: FC = () => {
	const apollo = useApolloClient();

	const relativeDate = useRef(Date.now());
	const [schedule, setSchedule] = useState<ScheduleType>({ startingTime: Date.now(), days: [] });

	const getSchedule = async (date: Date) => {
		const unixTime = date.getTime();
		relativeDate.current = unixTime;
		setSchedule(await generateSchedule(apollo)(unixTime));
	};

	const handleResetClick = () => {
		const now = new Date();
		void getSchedule(now);
	};

	const handleBackOneWeekClick = () => {
		const date = minusOneWeek(new Date(relativeDate.current));
		void getSchedule(date);
	};

	const handleForwardOneWeekClick = () => {
		const date = addOneWeek(new Date(relativeDate.current));
		void getSchedule(date);
	};

	const handleSessionCreate = () => {
		const date = new Date(relativeDate.current);
		void getSchedule(date);
	};

	useEffect(() => {
		const now = new Date();
		void getSchedule(now);
	}, []);

	return (
		<div
			data-starting={schedule.startingTime}
			className="w-full h-full grid items-start gap-4 grid-cols-[auto_2.25rem]"
		>
			<div>
				{schedule.days.length > 0 ? (
					<Fragment>
						<WeekDays />
						<Days schedule={schedule} onCreateSession={handleSessionCreate} />
					</Fragment>
				) : (
					<p>Loading...</p>
				)}
			</div>
			<Buttons
				onReset={handleResetClick}
				onBackOneWeek={handleBackOneWeekClick}
				onForwardOneWeek={handleForwardOneWeekClick}
			/>
		</div>
	);
};

export default Schedule;
