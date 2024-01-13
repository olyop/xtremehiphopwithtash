import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { ApolloError } from "@apollo/client/errors";

import { Session } from "../../generated-types";
import {
	addNineDays,
	addOneMonth,
	addSixDays,
	getEndOfDay,
	getMonday,
	getStartOfDay,
	isInPast,
	isToday,
	minusOneWeek,
	minusThreeDays,
} from "../../helpers/date";
import { determineSessionDateLabel } from "../../helpers/util";
import { Breakpoint } from "../../hooks";
import { getSessions } from "./helpers";
import { Day } from "./types";

export const determineStartAndEndDate = (
	date: Date,
	breakpoint: Breakpoint,
): [startingDate: Date, endingDate: Date] => {
	const startOfDay = getStartOfDay(date);

	let startingDate: Date;
	let endingDate: Date;

	if (breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL) {
		startingDate = startOfDay;
		endingDate = addSixDays(startOfDay);
	} else if (breakpoint === Breakpoint.MEDIUM) {
		startingDate = minusThreeDays(startOfDay);
		endingDate = addNineDays(startOfDay);
	} else {
		const mondayOfWeek = getMonday(startOfDay);
		startingDate = minusOneWeek(mondayOfWeek);
		endingDate = addOneMonth(startingDate);
	}

	return [startingDate, endingDate];
};

const determineNumberOfDays = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL) {
		return 6;
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return 12;
	} else {
		return 28;
	}
};

export const generateDays = (
	breakpoint: Breakpoint,
	startingDate: Date,
	endingDate: Date,
	sessions: Session[],
): Day[] => {
	const days: Day[] = [];

	const numberOfDays = determineNumberOfDays(breakpoint);

	for (let index = 0; index < numberOfDays; index += 1) {
		const day = new Date(startingDate);
		day.setDate(day.getDate() + index);

		const daySessions = sessions.filter(
			({ startTime, endTime }) => startTime >= day.getTime() && endTime <= getEndOfDay(day).getTime(),
		);

		days.push({
			unix: day.getTime(),
			isToday: isToday(day),
			isInPast: isInPast(day),
			sessions: daySessions.length > 0 ? daySessions : null,
			label: determineSessionDateLabel({ startTime: day.getTime() }, false, true),
		});
	}

	return days;
};

export const generateDaysWithSessions =
	(apollo: ApolloClient<unknown>) =>
	async (baseTime: number, breakpoint: Breakpoint): Promise<Day[] | ApolloError> => {
		const baseDate = new Date(baseTime);

		const [startingDate, endingDate] = determineStartAndEndDate(baseDate, breakpoint);

		const sessions = await getSessions(apollo)(startingDate, endingDate);

		if (sessions instanceof Error) {
			return sessions;
		}

		return generateDays(breakpoint, startingDate, endingDate, sessions);
	};
