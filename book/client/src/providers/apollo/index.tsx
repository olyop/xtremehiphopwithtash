import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement, useEffect, useState } from "react";

import { createClient } from "./client";

export const Apollo: FC<PropsWithChildren> = ({ children }) => {
	const { getAccessTokenSilently } = useAuth0();

	const [apollo, setApollo] = useState<ApolloClient<unknown> | null>(null);

	const handleCreateApollo = async () => {
		setApollo(await createClient(getAccessTokenSilently));
	};

	useEffect(() => {
		void handleCreateApollo();
	}, []);

	if (apollo === null) {
		return null;
	}

	return <ApolloProvider client={apollo}>{children}</ApolloProvider>;
};
