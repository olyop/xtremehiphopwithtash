import { ApolloClient } from "@apollo/client/core/ApolloClient";

import { ViewSessionMutation, ViewSessionMutationVariables } from "../../generated-types";
import VIEW_SESSION from "./view-session.graphql";

export const viewSession = (apollo: ApolloClient<unknown>) => async (sessionID: string) => {
	await apollo.mutate<ViewSessionMutation, ViewSessionMutationVariables>({
		mutation: VIEW_SESSION,
		variables: {
			sessionID,
		},
	});
};
