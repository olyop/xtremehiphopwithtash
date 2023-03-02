import { isToday } from "./helpers";

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

export const generateSchedule = (baseTime: number): Schedule => {
	const days: Day[] = [];

	const startingDate = new Date(baseTime - (baseTime % MILLISECONDS_IN_DAY));
	startingDate.setDate(startingDate.getDate() - 7);

	if (startingDate.getDay() !== 0) {
		startingDate.setDate(startingDate.getDate() - startingDate.getDay() + 1);
	}

	for (let index = 0; index < NUMBER_OF_DAYS; index += 1) {
		const day = new Date(startingDate);

		day.setDate(day.getDate() + index);

		days.push({
			unix: day.getTime(),
			isToday: isToday(day),
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

export interface Day {
	unix: number;
	isToday: boolean;
	label: string;
}

export interface Schedule {
	startingTime: number;
	days: Day[];
}
