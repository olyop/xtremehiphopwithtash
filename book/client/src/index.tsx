import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";

import Application from "./application";
import "./index.css";
import Auth0 from "./providers/auth0";

const rootElement = document.getElementById("Root");

if (rootElement) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<Auth0>
				<Application />
			</Auth0>
		</StrictMode>,
	);
} else {
	throw new Error("Root element not found");
}
