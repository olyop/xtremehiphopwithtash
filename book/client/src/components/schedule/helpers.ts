import { ApolloClient } from "@apollo/client";

import { Query, QueryGetSessionsInPeriodArgs, Session } from "../../generated-types";
import GET_SESSIONS_IN_PERIOD from "./get-sessions-in-period.graphql";

export const isToday = (date: Date): boolean => {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
};

export const getSessions =
	(apollo: ApolloClient<unknown>) =>
	async (startTime: number, endTime: number): Promise<readonly Session[]> => {
		const { data } = await apollo.query<Data, Vars>({
			query: GET_SESSIONS_IN_PERIOD,
			variables: {
				input: {
					courseID: null,
					startTime: Math.floor(startTime / 1000),
					endTime: Math.floor(endTime / 1000),
				},
			},
		});

		return data?.getSessionsInPeriod ?? [];
	};

type Data = Pick<Query, "getSessionsInPeriod">;
type Vars = QueryGetSessionsInPeriodArgs;
