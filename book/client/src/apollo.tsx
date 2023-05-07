import { FieldReadFunction } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache";
import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { setContext } from "@apollo/client/link/context";
import { from } from "@apollo/client/link/core/from";
import { HttpLink } from "@apollo/client/link/http/HttpLink";
import { ApolloProvider as ApolloProviderBase } from "@apollo/client/react/context/ApolloProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement } from "react";

import { secondsToMilliseconds } from "./utils";

const readUnixTime: FieldReadFunction<number, number> = value => {
	if (value === undefined) {
		return value;
	}

	return secondsToMilliseconds(value);
};

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();

	const httpLink = new HttpLink();

	const addJWTToken = setContext(async () => {
		if (isAuthenticated) {
			try {
				const accessToken = await getAccessTokenSilently();

				return {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				};
			} catch {
				return {};
			}
		} else {
			return {};
		}
	});

	const link = from([addJWTToken, httpLink]);

	const cache = new InMemoryCache({
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

	const apollo = new ApolloClient({
		link,
		cache,
	});

	return <ApolloProviderBase client={apollo}>{children}</ApolloProviderBase>;
};
