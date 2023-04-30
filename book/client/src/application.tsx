import { FC, StrictMode, createElement } from "react";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "./apollo";
import InstagramButton from "./components/instagram-button";
import { IsAdministratorProvider } from "./contexts/is-administrator";
import Header from "./layouts/header";
import Auth0 from "./providers/auth0";
import CreateAccount from "./providers/create-account/create-account";
import ReCaptcha from "./providers/recaptcha";
import Routes from "./routes";

const Application: FC = () => (
	<StrictMode>
		<ReCaptcha>
			<BrowserRouter>
				<IsAdministratorProvider>
					<Auth0>
						<ApolloProvider>
							<CreateAccount>
								<Header />
								<Routes />
								<InstagramButton />
							</CreateAccount>
						</ApolloProvider>
					</Auth0>
				</IsAdministratorProvider>
			</BrowserRouter>
		</ReCaptcha>
	</StrictMode>
);

export default Application;
