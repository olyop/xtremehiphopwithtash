import { ApolloClient } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement, useEffect, useState } from "react";

import { createClient } from "./client";

export const Apollo: FC<PropsWithChildren> = ({ children }) => {
	const { getAccessTokenSilently } = useAuth0();

	const [client, setClient] = useState<ApolloClient<unknown> | null>(null);

	const handleCreateClient = async () => {
		const newClient = await createClient(getAccessTokenSilently);

		setClient(newClient);
	};

	useEffect(() => {
		if (client === null) {
			void handleCreateClient();
		}
	}, []);

	if (client === null) {
		return null;
	}

	return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
