import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache";
import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { from } from "@apollo/client/link/core/from";
import { HttpLink } from "@apollo/client/link/http/HttpLink";
import { ApolloProvider as ApolloProviderBase } from "@apollo/client/react/context/ApolloProvider";
import { FC, PropsWithChildren, createElement } from "react";

const httpLink = new HttpLink();

const link = from([httpLink]);

const cache = new InMemoryCache();

export const apollo = new ApolloClient({
	link,
	cache,
});

export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => (
	<ApolloProviderBase client={apollo}>{children}</ApolloProviderBase>
);
