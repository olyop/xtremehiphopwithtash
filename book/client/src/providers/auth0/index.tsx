import { Auth0Provider } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement } from "react";

const Auth0: FC<PropsWithChildren> = ({ children }) => (
	<Auth0Provider
		cacheLocation="localstorage"
		domain={import.meta.env.VITE_AUTH0_DOMAIN}
		clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
		authorizationParams={{
			redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URL,
		}}
	>
		{children}
	</Auth0Provider>
);

export default Auth0;