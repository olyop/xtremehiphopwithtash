import { FC, createElement } from "react";
import { RouteObject, useLocation, useRoutes } from "react-router-dom";

import Schedule from "./components/schedule";
import AccountPage from "./pages/account";
import AdminPage from "./pages/admin";
import PaymentPage from "./pages/payment";
import SessionPage from "./pages/session";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Schedule />,
	},
	{
		path: "admin",
		element: <AdminPage />,
	},
	{
		path: "session/:sessionID",
		element: <SessionPage />,
	},
	{
		path: "account",
		element: <AccountPage />,
	},
	{
		path: "payment",
		element: <PaymentPage />,
	},
];

const Routes: FC = () => {
	const location = useLocation();
	const routesElement = useRoutes(routes);
	return (
		<div
			className={`h-content-height w-full bg-stone-150 ${
				location.pathname === "/" ? "overflow-hidden" : "overflow-x-hidden overflow-y-scroll"
			}`}
		>
			{routesElement}
		</div>
	);
};

export default Routes;
