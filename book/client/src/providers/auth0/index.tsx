import { Auth0Provider, AuthorizationParams } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement } from "react";

const authorizationParams: AuthorizationParams = {
	scope: "openid profile email",
	redirect_uri: window.location.origin,
	audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
};

const Auth0: FC<PropsWithChildren> = ({ children }) => (
	<Auth0Provider
		useRefreshTokens
		children={children}
		cacheLocation="localstorage"
		domain={import.meta.env.VITE_AUTH0_DOMAIN}
		clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
		authorizationParams={authorizationParams}
	/>
);

export default Auth0;
