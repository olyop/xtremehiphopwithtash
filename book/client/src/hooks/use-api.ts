import { useAuth0 } from "@auth0/auth0-react";

export const useApi = () => {
	const { getAccessTokenSilently } = useAuth0();

	const fetchAPI = async <Body, Data>(url: string, body: Body) => {
		const response = await fetch(`/api${url}`, {
			method: "POST",
			body: JSON.stringify(body),
			cache: "no-cache",
			mode: "cors",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": `Bearer ${await getAccessTokenSilently()}`,
			},
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = (await response.json()) as Data;

		return data;
	};

	return { fetchAPI };
};
