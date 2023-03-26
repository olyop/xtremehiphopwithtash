import { ApolloClient } from "@apollo/client";

import { Session } from "../../generated-types";
import { Breakpoint } from "../../hooks";
import { secondsToMilliseconds } from "../../utils";
import {
	addNineDays,
	addOneMonth,
	addSixDays,
	getEndOfDay,
	getMonday,
	getSessions,
	getStartOfDay,
	isInPast,
	isToday,
	minusOneWeek,
	minusThreeDays,
	minusTwoDays,
} from "./helpers";
import { Day, Schedule } from "./types";

const thisYearDateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "numeric",
	month: "short",
});

const fullYearDateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
});

const determineLabel = (day: Date, now: Date) =>
	day.getFullYear() === now.getFullYear()
		? thisYearDateFormatter.format(day)
		: fullYearDateFormatter.format(day);

const determineStartAndEndDate = (startOfDay: Date, breakpoint: Breakpoint) => {
	let startingDate: Date;
	let endingDate: Date;

	if (breakpoint === Breakpoint.SMALL) {
		startingDate = minusTwoDays(startOfDay);
		endingDate = addSixDays(startOfDay);
	} else if (breakpoint === Breakpoint.MEDIUM) {
		startingDate = minusThreeDays(startOfDay);
		endingDate = addNineDays(startOfDay);
	} else if (breakpoint === Breakpoint.LARGE) {
		const mondayOfWeek = getMonday(startOfDay);
		startingDate = minusOneWeek(mondayOfWeek);
		endingDate = addOneMonth(startingDate);
	} else {
		throw new Error("Invalid breakpoint");
	}

	return { startingDate, endingDate };
};

const determineNumberOfDays = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.SMALL) {
		return 8;
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return 12;
	} else if (breakpoint === Breakpoint.LARGE) {
		return 28;
	} else {
		throw new Error("Invalid breakpoint");
	}
};

export const generateSchedule =
	(apollo: ApolloClient<unknown>) =>
	async (baseTime: number, breakpoint: Breakpoint): Promise<Schedule> => {
		const days: Day[] = [];
		const now = new Date();

		const startOfDay = getStartOfDay(new Date(baseTime));
		const { startingDate, endingDate } = determineStartAndEndDate(startOfDay, breakpoint);

		let sessions: Session[];
		try {
			sessions = await getSessions(apollo)(startingDate, endingDate);
		} catch {
			sessions = [];
		}

		const numberOfDays = determineNumberOfDays(breakpoint);

		for (let index = 0; index < numberOfDays; index += 1) {
			const day = new Date(startingDate);

			day.setDate(day.getDate() + index);

			const daySessions = sessions.filter(
				session =>
					secondsToMilliseconds(session.startTime) >= day.getTime() &&
					secondsToMilliseconds(session.endTime) <= getEndOfDay(day).getTime(),
			);

			days.push({
				unix: day.getTime(),
				isToday: isToday(day),
				isInPast: isInPast(day),
				label: determineLabel(day, now),
				dayNameShort: day.toLocaleDateString(undefined, { weekday: "short" }),
				dayNameLong: day.toLocaleDateString(undefined, { weekday: "long" }),
				sessions: daySessions.length > 0 ? daySessions : null,
			});
		}

		return {
			days,
			startingTime: startingDate.getTime(),
		};
	};
