import { FC, StrictMode, createElement } from "react";
import { BrowserRouter } from "react-router-dom";

import InstagramButton from "./components/instagram-button";
import { IsAdministratorProvider } from "./contexts/is-administrator";
import Header from "./layouts/header";
import { ApolloProvider } from "./providers/apollo";
import Auth0 from "./providers/auth0";
import CreateAccount from "./providers/create-account";
import ReCaptcha from "./providers/recaptcha";
import Routes from "./routes";

const Application: FC = () => (
	<StrictMode>
		<ReCaptcha>
			<BrowserRouter>
				<Auth0>
					<ApolloProvider>
						<IsAdministratorProvider>
							<CreateAccount>
								<Header />
								<Routes />
								<InstagramButton />
							</CreateAccount>
						</IsAdministratorProvider>
					</ApolloProvider>
				</Auth0>
			</BrowserRouter>
		</ReCaptcha>
	</StrictMode>
);

export default Application;
