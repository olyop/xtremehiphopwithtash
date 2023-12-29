import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { setContext } from "@apollo/client/link/context";
import { from } from "@apollo/client/link/core/from";
import { onError } from "@apollo/client/link/error";
import { ApolloProvider as ApolloProviderBase } from "@apollo/client/react/context/ApolloProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement } from "react";

import { cache } from "./cache";
import { httpLink } from "./http-link";

export const Apollo: FC<PropsWithChildren> = ({ children }) => {
	const { logout, getAccessTokenSilently } = useAuth0();

	const addJWTToken = setContext(async (_, prevContext) => {
		try {
			const headers: Record<string, unknown> = prevContext["headers"]
				? (prevContext["headers"] as Record<string, unknown>)
				: {};
			return {
				headers: {
					...headers,
					Authorization: `Bearer ${await getAccessTokenSilently()}`,
				},
			};
		} catch {
			return {};
		}
	});

	const checkExpiredToken = onError(({ networkError }) => {
		if (networkError?.message.includes("401")) {
			void logout({
				logoutParams: {
					returnTo: window.location.origin,
				},
			});
		}
	});

	const link = from([addJWTToken, checkExpiredToken, httpLink]);

	const apollo = new ApolloClient({
		link,
		cache,
		queryDeduplication: false,
	});

	return <ApolloProviderBase client={apollo}>{children}</ApolloProviderBase>;
};
