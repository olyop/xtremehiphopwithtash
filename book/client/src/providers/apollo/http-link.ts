import { HttpLink } from "@apollo/client/link/http/HttpLink";

export const httpLink = new HttpLink({
	uri: `${import.meta.env.VITE_API_BASE_URL}/graphql`,
	fetchOptions: {
		mode: "cors",
	},
});
