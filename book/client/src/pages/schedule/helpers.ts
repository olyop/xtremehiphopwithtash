import { ApolloClient } from "@apollo/client/core/ApolloClient";

import { GetSessionsInPeriodQuery, QueryGetSessionsInPeriodArgs, Session } from "../../generated-types";
import { Breakpoint } from "../../hooks";
import GET_SESSIONS_IN_PERIOD from "./get-sessions-in-period.graphql";

export const isToday = (date: Date): boolean => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

export const getStartOfDay = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setHours(0, 0, 0, 0);
	return newDate;
};

export const getEndOfDay = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setHours(23, 59, 59, 999);
	return newDate;
};

export const getMonday = (date: Date): Date => {
	const newDate = new Date(date);
	const day = newDate.getDay();
	const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
	return new Date(newDate.setDate(diff));
};

export const addOneWeek = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 7);
	return newDate;
};

export const minusOneWeek = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() - 7);
	return newDate;
};

export const addOneMonth = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setMonth(newDate.getMonth() + 1);
	return newDate;
};

export const addThreeDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 3);
	return newDate;
};

export const minusThreeDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() - 3);
	return newDate;
};

export const addNineDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 9);
	return newDate;
};

export const addTwoDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 2);
	return newDate;
};

export const minusTwoDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() - 2);
	return newDate;
};

export const addSixDays = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 6);
	return newDate;
};

export const addOneDay = (date: Date): Date => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + 1);
	return newDate;
};

export const isInPast = (date: Date): boolean => {
	const now = new Date();
	return date.getTime() < now.getTime();
};

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
	async (startDate: Date, endDate: Date): Promise<Session[]> => {
		const { data } = await apollo.query<GetSessionsInPeriodQuery, QueryGetSessionsInPeriodArgs>({
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

		return (data?.getSessionsInPeriod as Session[]) ?? [];
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
