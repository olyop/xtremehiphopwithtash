import { StrictMode, createElement } from "react";
import { createRoot } from "react-dom/client";
import { Workbox } from "workbox-window";

import Application from "./application";
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

try {
	root.render(children);
} catch (error) {
	const message = error instanceof Error ? error.message : "Unknown error";

	rootElement.innerHTML = message;
}

if ("serviceWorker" in navigator) {
	const workbox = new Workbox("/service-worker.js");

	void workbox.register();
}
