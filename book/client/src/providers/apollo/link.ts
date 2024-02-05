import { setContext } from "@apollo/client/link/context";
import { from } from "@apollo/client/link/core/from";
import { onError } from "@apollo/client/link/error";
import { HttpLink } from "@apollo/client/link/http/HttpLink";
import { Auth0ContextInterface } from "@auth0/auth0-react";

const httpLink = new HttpLink({
	uri: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
	fetchOptions: {
		mode: "cors",
	},
});

const createAuthorizationLink = (getAccessTokenSilently: Auth0ContextInterface["getAccessTokenSilently"]) =>
	setContext(async (_, prevContext) => {
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

const unAuthorizedLink = onError(({ networkError }) => {
	if (networkError?.message.includes("401")) {
		// void logout({
		// 	logoutParams: {
		// 		returnTo: window.location.origin,
		// 	},
		// });
	}
});

export const createLink = (getAccessTokenSilently: Auth0ContextInterface["getAccessTokenSilently"]) =>
	from([createAuthorizationLink(getAccessTokenSilently), unAuthorizedLink, httpLink]);
