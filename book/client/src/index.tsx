import { createElement } from "react";
import { createRoot } from "react-dom/client";

import Application from "./application";
import "./index.css";

const rootElement = document.getElementById("Root");

if (!rootElement) {
	throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(<Application />);
