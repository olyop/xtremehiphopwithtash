import { Auth0Provider } from "@auth0/auth0-react";
import { FC, PropsWithChildren, createElement } from "react";

const Auth0: FC<PropsWithChildren> = ({ children }) => (
	<Auth0Provider
		domain="xtremehiphopwithtash.au.auth0.com"
		clientId="YLgZlPPyOtSo1gsIr8fSG7seYkELf5Pg"
		authorizationParams={{
			redirect_uri: "http://localhost:5173",
		}}
	>
		{children}
	</Auth0Provider>
);

export default Auth0;
