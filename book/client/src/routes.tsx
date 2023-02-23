import { FC, createElement } from "react";
import { RouteObject, useRoutes } from "react-router-dom";

import Admin from "./pages/admin";
import Home from "./pages/home";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "admin",
		element: <Admin />,
	},
];

const Routes: FC = () => {
	const routesElement = useRoutes(routes);
	return (
		<div className="h-content-height p-4 overflow-y-scroll overflow-x-hidden bg-stone-150">
			{routesElement}
		</div>
	);
};

export default Routes;
