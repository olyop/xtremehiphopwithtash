import { FC, createElement } from "react";
import { BrowserRouter as ReactRouter } from "react-router-dom";

import AdministratorButton from "./components/administrator-button";
import InstagramButton from "./components/instagram-button";
import { IsAdministratorProvider } from "./contexts/is-administrator";
import Header from "./layouts/header";
import { Apollo } from "./providers/apollo";
import Auth0 from "./providers/auth0";
import CreateAccount from "./providers/create-account";
import ReCaptcha from "./providers/recaptcha";
import Routes from "./routes";

const Application: FC = () => (
	<Auth0>
		<Apollo>
			<ReCaptcha>
				<ReactRouter>
					<IsAdministratorProvider>
						<CreateAccount>
							<Header />
							<Routes />
							<AdministratorButton />
						</CreateAccount>
						<InstagramButton />
					</IsAdministratorProvider>
				</ReactRouter>
			</ReCaptcha>
		</Apollo>
	</Auth0>
);

export default Application;
