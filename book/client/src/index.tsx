/// <reference types="vite/client" />
import { createElement } from "react";
import { createRoot } from "react-dom/client";
// import "swiped-events/src/swiped-events.js";
import { Workbox } from "workbox-window";

import Application from "./application";
import "./index.css";

const rootElement = document.getElementById("Root");

if (!rootElement) {
	throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(<Application />);

const workbox = new Workbox("/service-worker.js");

void workbox.register();
