import { ApolloError } from "@apollo/client";
import { ApolloClient } from "@apollo/client/core/ApolloClient";

import { GetSessionsInPeriodQuery, QueryGetSessionsInPeriodArgs, Session } from "../../generated-types";
import { addOneWeek, addThreeDays, addTwoDays, minusOneWeek, minusThreeDays, minusTwoDays } from "../../helpers/date";
import { Breakpoint } from "../../hooks";
import GET_SESSIONS_IN_PERIOD from "./get-sessions-in-period.graphql";

export const determineDecrementAction = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL) {
		return minusTwoDays;
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return minusThreeDays;
	} else if (breakpoint === Breakpoint.LARGE) {
		return minusOneWeek;
	} else {
		throw new Error("Invalid breakpoint");
	}
};

export const determineIncrementAction = (breakpoint: Breakpoint) => {
	if (breakpoint === Breakpoint.TINY || breakpoint === Breakpoint.SMALL) {
		return addTwoDays;
	} else if (breakpoint === Breakpoint.MEDIUM) {
		return addThreeDays;
	} else if (breakpoint === Breakpoint.LARGE) {
		return addOneWeek;
	} else {
		throw new Error("Invalid breakpoint");
	}
};

export const getSessions =
	(apollo: ApolloClient<unknown>) =>
	async (startDate: Date, endDate: Date): Promise<Session[] | ApolloError> => {
		try {
			const { data, error } = await apollo.query<GetSessionsInPeriodQuery, QueryGetSessionsInPeriodArgs>({
				query: GET_SESSIONS_IN_PERIOD,
				fetchPolicy: "network-only",
				variables: {
					input: {
						courseID: null,
						startTime: Math.floor(startDate.getTime() / 1000),
						endTime: Math.floor(endDate.getTime() / 1000),
					},
				},
			});

			if (error) {
				return error;
			}

			return (data?.getSessionsInPeriod as Session[]) ?? [];
		} catch (error) {
			if (error instanceof ApolloError) {
				return error;
			} else {
				throw error;
			}
		}
	};

interface LocalStorageStartingTime {
	startingTime: number;
	setAt: number;
}

const ONE_DAY = 1000 * 60 * 60 * 24;

export const setStartingTime = (time: number) => {
	const item: LocalStorageStartingTime = {
		startingTime: time,
		setAt: Date.now(),
	};

	localStorage.setItem("startingTime", JSON.stringify(item));
};

export const getStartingTime = () => {
	const item = localStorage.getItem("startingTime");
	if (item) {
		const { setAt, startingTime } = JSON.parse(item) as LocalStorageStartingTime;
		if (Date.now() - setAt > ONE_DAY) {
			const newStartingTime = Date.now();
			setStartingTime(newStartingTime);
			return newStartingTime;
		} else {
			return startingTime;
		}
	} else {
		const newStartingTime = Date.now();
		setStartingTime(newStartingTime);
		return newStartingTime;
	}
};
