import { FC, createElement } from "react";
import { BrowserRouter as ReactRouter } from "react-router-dom";

import Header from "./layouts/header";
import AccountManager from "./providers/account-manager";
import { Apollo } from "./providers/apollo";
import Auth0 from "./providers/auth0";
import ReCaptcha from "./providers/recaptcha";
import Routes from "./routes";

const Application: FC = () => (
		<Auth0>
			<Apollo>
				<ReCaptcha>
					<ReactRouter>
						<AccountManager>
							<Header />
							<Routes />
						</AccountManager>
					</ReactRouter>
				</ReCaptcha>
			</Apollo>
		</Auth0>
);

export default Application;
