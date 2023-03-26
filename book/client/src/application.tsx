import { FC, createElement } from "react";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "./apollo";
import Header from "./layouts/header";
import Routes from "./routes";

const Application: FC = () => (
	<BrowserRouter>
		<ApolloProvider>
			<Header />
			<Routes />
		</ApolloProvider>
	</BrowserRouter>
);

export default Application;
