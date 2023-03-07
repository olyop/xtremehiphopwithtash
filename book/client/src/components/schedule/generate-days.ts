import { ApolloClient } from "@apollo/client";

import { Session } from "../../generated-types";
import { secondsToMilliseconds } from "../../utils";
import {
	addOneMonth,
	getEndOfDay,
	getMonday,
	getSessions,
	getStartOfDay,
	isToday,
	minusOneWeek,
} from "./helpers";
import { Day, Schedule } from "./types";

const thisYearDateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "numeric",
	month: "short",
});

const otherYearDateFormatter = new Intl.DateTimeFormat(undefined, {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
});

const now = new Date();

export const generateSchedule =
	(apollo: ApolloClient<unknown>) =>
	async (baseTime: number): Promise<Schedule> => {
		const days: Day[] = [];

		const baseDate = getStartOfDay(new Date(baseTime));
		const startOfWeek = getMonday(baseDate);

		const startingDate = minusOneWeek(startOfWeek);
		const endingDate = addOneMonth(startingDate);

		let sessions: Session[];
		try {
			sessions = await getSessions(apollo)(startingDate, endingDate);
		} catch {
			sessions = [];
		}

		for (let index = 0; index < 28; index += 1) {
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
				dayName: day.toLocaleDateString(undefined, { weekday: "long" }),
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
