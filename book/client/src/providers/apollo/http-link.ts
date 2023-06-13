import { HttpLink } from "@apollo/client/link/http/HttpLink";

export const httpLink = new HttpLink({
	fetchOptions: {
		mode: "cors",
	},
});
