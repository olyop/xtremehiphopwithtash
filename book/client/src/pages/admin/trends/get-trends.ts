import { ApolloClient } from "@apollo/client/core/ApolloClient";

import { BookingTrend, GetBookingTrendsInput, GetTrendsQuery, GetTrendsQueryVariables } from "../../../generated-types";
import GET_TRENDS from "./get-trends.graphql";

export const getTrends =
	(apollo: ApolloClient<unknown>) =>
	async ({ startTime, endTime }: GetBookingTrendsInput) => {
		const { data } = await apollo.query<Data, Vars>({
			query: GET_TRENDS,
			variables: {
				bookingTrendsInput: {
					startTime: Math.floor(startTime / 1000),
					endTime: Math.floor(endTime / 1000),
				},
			},
		});

		return data.getBookingTrends as BookingTrend[];
	};

type Data = GetTrendsQuery;
type Vars = GetTrendsQueryVariables;
