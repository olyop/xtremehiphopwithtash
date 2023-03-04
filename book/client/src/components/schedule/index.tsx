import { useApolloClient } from "@apollo/client";
import { FC, createElement, useRef, useState } from "react";

import Buttons from "./buttons";
import Days from "./days";
import { generateSchedule } from "./generate-days";
import { Schedule as ScheduleType } from "./types";
import WeekDays from "./week-days";

const Schedule: FC = () => {
	const apollo = useApolloClient();

	const relativeNow = useRef(Date.now());
	const [schedule, setSchedule] = useState<ScheduleType>(generateSchedule(relativeNow.current, []));

	const handleResetClick = () => {
		relativeNow.current = Date.now();
		setSchedule(generateSchedule(Date.now(), []));
	};

	const handleBackOneWeekClick = () => {
		const date = new Date(relativeNow.current);

		if (date.getDay() !== 0) {
			date.setDate(date.getDate() - 7);
		}

		relativeNow.current = date.getTime();

		setSchedule(generateSchedule(date.getTime(), []));
	};

	const handleForwardOneWeekClick = () => {
		const date = new Date(relativeNow.current);

		if (date.getDay() !== 0) {
			date.setDate(date.getDate() + 7);
		}

		relativeNow.current = date.getTime();

		setSchedule(generateSchedule(date.getTime(), []));
	};

	return (
		<div
			data-starting={schedule.startingTime}
			className="w-full h-full grid items-start gap-4 grid-cols-[auto_2.25rem]"
		>
			<div>
				<WeekDays />
				<Days schedule={schedule} />
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
