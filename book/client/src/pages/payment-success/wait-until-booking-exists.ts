import { ApolloClient } from "@apollo/client";

import { ExistsBookingQuery } from "../../generated-types";
import EXISTS_BOOKING from "./exists-booking.graphql";

const TIME_BETWEEN_CHECKS = 250;
const MAX_CHECKS = 10;

export const waitUntilBookingExists = (apollo: ApolloClient<unknown>) => async (bookingID: string) => {
	let checks = 0;
	let bookingExists = false;

	while (checks < MAX_CHECKS && !bookingExists) {
		const { data } = await apollo.query<ExistsBookingQuery>({ query: EXISTS_BOOKING, variables: { bookingID } });

		bookingExists = data.existsBookingByID;

		if (!bookingExists) {
			await new Promise(resolve => {
				setTimeout(resolve, TIME_BETWEEN_CHECKS);
			});
		}

		checks += 1;
	}

	return bookingExists;
};
