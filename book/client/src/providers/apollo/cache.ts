import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache";

import { readUnixTime } from "./read-unix-time";

export const cache = new InMemoryCache({
	typePolicies: {
		Details: {
			keyFields: ["detailsID"],
			fields: {
				createdAt: {
					read: readUnixTime,
				},
			},
		},
		Student: {
			keyFields: ["studentID"],
			fields: {
				createdAt: {
					read: readUnixTime,
				},
			},
		},
		Instructor: {
			keyFields: ["instructorID"],
			fields: {
				createdAt: {
					read: readUnixTime,
				},
			},
		},
		Location: {
			keyFields: ["locationID"],
			fields: {
				createdAt: {
					read: readUnixTime,
				},
			},
		},
		Course: {
			keyFields: ["courseID"],
			fields: {
				createdAt: {
					read: readUnixTime,
				},
			},
		},
		Session: {
			keyFields: ["sessionID"],
			fields: {
				startTime: {
					read: readUnixTime,
				},
				endTime: {
					read: readUnixTime,
				},
				createdAt: {
					read: readUnixTime,
				},
			},
		},
		Booking: {
			keyFields: ["bookingID"],
			fields: {
				cancelledAt: {
					read: readUnixTime,
				},
				createdAt: {
					read: readUnixTime,
				},
			},
		},
		Review: {
			keyFields: ["reviewID"],
			fields: {
				createdAt: {
					read: readUnixTime,
				},
			},
		},
	},
});
