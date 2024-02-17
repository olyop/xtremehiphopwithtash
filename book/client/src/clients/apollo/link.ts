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

const createAuthorizationLink = ({ getAccessTokenSilently }: Auth0ContextInterface) =>
	setContext(async (_, prevContext) => {
		try {
			const accessToken = await getAccessTokenSilently();

			const prevContextHeaders = prevContext["headers"] as Record<string, unknown> | undefined;

			const headers: Record<string, unknown> = prevContextHeaders ?? {};

			return {
				headers: {
					...headers,
					Authorization: `Bearer ${accessToken}`,
				},
			};
		} catch {
			return {};
		}
	});

const unAuthorizedLink = ({ logout }: Auth0ContextInterface) =>
	onError(({ networkError }) => {
		if (networkError?.message.includes("401")) {
			void logout({
				logoutParams: {
					returnTo: window.location.origin,
				},
			});
		}
	});

export const createLink = (auth0: Auth0ContextInterface) =>
	from([createAuthorizationLink(auth0), unAuthorizedLink(auth0), httpLink]);
