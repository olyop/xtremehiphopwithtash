import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { Auth0ContextInterface } from "@auth0/auth0-react";

import { cachePersistor, createCache } from "./cache";
import { createLink } from "./link";

export const createApollo = async (auth0: Auth0ContextInterface) =>
	new ApolloClient({
		queryDeduplication: false,
		cache: await createCache(),
		link: createLink(auth0),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: "cache-and-network",
			},
		},
	});

export { cachePersistor };
