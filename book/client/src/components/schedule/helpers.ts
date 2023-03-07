import { ApolloClient } from "@apollo/client";

import { Query, QueryGetSessionsInPeriodArgs, Session } from "../../generated-types";
import GET_SESSIONS_IN_PERIOD from "./get-sessions-in-period.graphql";

export const timeFormatter = new Intl.DateTimeFormat(undefined, {
	hour: "numeric",
	minute: "numeric",
	hourCycle: "h12",
});

export const isBeforeMidday = (date: Date): boolean => date.getHours() < 12;
export const isAfterMidday = (date: Date): boolean => date.getHours() >= 12;

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

export const getSessions =
	(apollo: ApolloClient<unknown>) =>
	async (startTime: Date, endTime: Date): Promise<Session[]> => {
		const { data } = await apollo.query<Data, Vars>({
			query: GET_SESSIONS_IN_PERIOD,
			fetchPolicy: "network-only",
			variables: {
				input: {
					courseID: null,
					startTime: Math.floor(startTime.getTime() / 1000),
					endTime: Math.floor(endTime.getTime() / 1000),
				},
			},
		});

		return (data?.getSessionsInPeriod as Session[]) ?? [];
	};

type Data = Pick<Query, "getSessionsInPeriod">;
type Vars = QueryGetSessionsInPeriodArgs;
