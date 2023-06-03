import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { setContext } from "@apollo/client/link/context";
import { from } from "@apollo/client/link/core/from";
import { ApolloProvider as ApolloProviderBase } from "@apollo/client/react/context/ApolloProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, Fragment, PropsWithChildren, createElement } from "react";

import Loading from "../../components/loading";
import { cache } from "./cache";
import { httpLink } from "./http-link";

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
	const { getAccessTokenSilently, isLoading } = useAuth0();

	const addJWTToken = setContext(async () => {
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
	});

	const link = from([addJWTToken, httpLink]);

	const apollo = new ApolloClient({
		link,
		cache,
	});

	return (
		<ApolloProviderBase client={apollo}>
			{isLoading ? (
				<div className="w-screen h-screen flex items-center justify-center">
					<Loading />
				</div>
			) : (
				<Fragment>{children}</Fragment>
			)}
		</ApolloProviderBase>
	);
};
