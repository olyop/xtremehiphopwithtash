import { ApolloClient } from "@apollo/client";

import { ViewSessionMutation, ViewSessionMutationVariables } from "../../generated-types";
import VIEW_SESSION from "./view-session.graphql";

export const viewSession = (apollo: ApolloClient<unknown>, sessionID: string) => {
	void apollo.mutate<ViewSessionMutation, ViewSessionMutationVariables>({
		mutation: VIEW_SESSION,
		variables: {
			sessionID,
		},
	});
};
