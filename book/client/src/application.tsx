import { FC, createElement } from "react";
import { BrowserRouter as ReactRouterProvider } from "react-router-dom";

import AccountManager from "./providers/account-manager";
import { ApolloProvider } from "./providers/apollo";
import Auth0Provider from "./providers/auth0";
import ReCaptchaProvider from "./providers/recaptcha";
import Routes from "./routes";

const Application: FC = () => (
	<Auth0Provider>
		<ApolloProvider>
			<ReCaptchaProvider>
				<ReactRouterProvider>
					<AccountManager>
						<Routes />
					</AccountManager>
				</ReactRouterProvider>
			</ReCaptchaProvider>
		</ApolloProvider>
	</Auth0Provider>
);

export default Application;
