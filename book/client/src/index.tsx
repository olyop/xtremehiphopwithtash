import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";

import Application from "./application";
import { workbox } from "./clients/workbox";
import "./index.css";

const rootElement = document.getElementById("Root");

if (!rootElement) {
	throw new Error("Root element not found");
}

const root = createRoot(rootElement);

const children =
	import.meta.env.VITE_REACT_STRICT_MODE === "false" ? (
		<Application />
	) : (
		<StrictMode>
			<Application />
		</StrictMode>
	);

root.render(children);

void workbox.register();
