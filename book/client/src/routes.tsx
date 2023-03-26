import { FC, createElement } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import Admin from "./pages/admin";
import Home from "./pages/home";
import SessionPage from "./pages/session";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "admin",
		element: <Admin />,
	},
	{
		path: "session/:sessionID",
		element: <SessionPage />,
	},
];

const Routes: FC = () => {
	const routesElement = useRoutes(routes);
	return (
		<div className="overflow-x-hidden overflow-y-scroll h-content-height bg-stone-150">
			{routesElement}
		</div>
	);
};

export default Routes;
