import { Session } from "../../generated-types";
import { isToday } from "./helpers";
import { Day, Schedule } from "./types";

const thisYearDateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "2-digit",
	month: "2-digit",
});

const otherYearDateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
});

const NUMBER_OF_DAYS = 7 * 4;
const MILLISECONDS_IN_DAY = 86_400_000;

const now = new Date();

export const generateSchedule = (baseTime: number, sessions: Session[]): Schedule => {
	const days: Day[] = [];

	const startingDate = new Date(baseTime - (baseTime % MILLISECONDS_IN_DAY));
	startingDate.setDate(startingDate.getDate() - 7);

	if (startingDate.getDay() !== 0) {
		startingDate.setDate(startingDate.getDate() - startingDate.getDay() + 1);
	}

	for (let index = 0; index < NUMBER_OF_DAYS; index += 1) {
		const day = new Date(startingDate);

		day.setDate(day.getDate() + index);

		const daySessions = sessions.filter(
			session =>
				session.startTime >= day.getTime() &&
				session.endTime <= day.getTime() + MILLISECONDS_IN_DAY,
		);

		days.push({
			unix: day.getTime(),
			isToday: isToday(day),
			sessions: daySessions.length > 0 ? daySessions : null,
			label:
				day.getFullYear() === now.getFullYear()
					? thisYearDateFormatter.format(day)
					: otherYearDateFormatter.format(day),
		});
	}

	return {
		days,
		startingTime: startingDate.getTime(),
	};
};
