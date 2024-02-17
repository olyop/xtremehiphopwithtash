import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { ApolloProvider as ApolloProviderInternal } from "@apollo/client/react/context/ApolloProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement, useEffect, useState } from "react";

import { createApollo } from "../../clients/apollo";

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
	const auth0 = useAuth0();

	const [apollo, setApollo] = useState<ApolloClient<unknown> | null>(null);

	const handleCreate = async () => {
		setApollo(await createApollo(auth0));
	};

	useEffect(() => {
		if (apollo === null) {
			void handleCreate();
		}
	}, []);

	if (apollo === null) {
		return null;
	}

	return <ApolloProviderInternal client={apollo}>{children}</ApolloProviderInternal>;
};
