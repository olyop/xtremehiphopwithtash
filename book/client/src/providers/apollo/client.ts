import { ApolloClient } from "@apollo/client";
import { Auth0ContextInterface } from "@auth0/auth0-react";

import { createCache } from "./cache";
import { createLink } from "./link";

export const createClient = async (getAccessTokenSilently: Auth0ContextInterface["getAccessTokenSilently"]) =>
	new ApolloClient({
		queryDeduplication: false,
		cache: await createCache(),
		link: createLink(getAccessTokenSilently),
		defaultOptions: {
			watchQuery: {
				fetchPolicy: "cache-and-network",
			},
		},
	});
