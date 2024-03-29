import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache";
import { TypePolicies } from "@apollo/client/cache/inmemory/policies";
import { CachePersistor, LocalStorageWrapper } from "apollo3-cache-persist";

import { readUnixTime } from "./read-unix-time";

const typePolicies: TypePolicies = {
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
	BookingTrend: {
		keyFields: ["unixDay"],
		fields: {
			unixDay: {
				read: readUnixTime,
			},
		},
	},
};

const inMemoryCache = new InMemoryCache({
	typePolicies,
});

const storageWrapper = new LocalStorageWrapper(window.localStorage);

export const cachePersistor = new CachePersistor({
	cache: inMemoryCache,
	storage: storageWrapper,
});

export const createCache = async () => {
	await cachePersistor.restore();

	return inMemoryCache;
};
