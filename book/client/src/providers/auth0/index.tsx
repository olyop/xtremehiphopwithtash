import { Auth0Provider as Auth0ProviderInternal } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement } from "react";

const Auth0Provider: FC<PropsWithChildren> = ({ children }) => (
	<Auth0ProviderInternal
		useRefreshTokens
		children={children}
		cacheLocation="localstorage"
		domain={import.meta.env.VITE_AUTH0_DOMAIN}
		clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
		authorizationParams={{
			redirect_uri: window.location.origin,
			scope: import.meta.env.VITE_AUTH0_SCOPE,
			audience: import.meta.env.VITE_AUTH0_API_AUDIENCE,
		}}
	/>
);

export default Auth0Provider;
