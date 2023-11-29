import { FC, createElement } from "react";
import { BrowserRouter } from "react-router-dom";

import AdministratorButton from "./components/administrator-button";
import InstagramButton from "./components/instagram-button";
import { IsAdministratorProvider } from "./contexts/is-administrator";
import Header from "./layouts/header";
import { ApolloProvider } from "./providers/apollo";
import Auth0 from "./providers/auth0";
import CreateAccount from "./providers/create-account";
import ReCaptcha from "./providers/recaptcha";
import Routes from "./routes";

const Application: FC = () => (
	<BrowserRouter>
		<ReCaptcha>
			<Auth0>
				<ApolloProvider>
					<IsAdministratorProvider>
						<CreateAccount>
							<Header />
							<Routes />
							<AdministratorButton />
							<InstagramButton />
						</CreateAccount>
					</IsAdministratorProvider>
				</ApolloProvider>
			</Auth0>
		</ReCaptcha>
	</BrowserRouter>
);

export default Application;
