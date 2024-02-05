import { ApolloClient } from "@apollo/client";
import { Auth0ContextInterface } from "@auth0/auth0-react";

import { createCache } from "./cache";
import { createLink } from "./link";

export const createClient = async (getAccessTokenSilently: Auth0ContextInterface["getAccessTokenSilently"]) =>
	new ApolloClient({
		link: createLink(getAccessTokenSilently),
		cache: await createCache(),
		queryDeduplication: false,
	});
