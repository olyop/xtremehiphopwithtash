import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";

import Application from "./application";
import "./index.css";

const rootElement = document.getElementById("Root");

if (rootElement) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<Application />
		</StrictMode>,
	);
} else {
	throw new Error("Root element not found");
}
