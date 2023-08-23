import { FC, createElement } from "react";
import { RouteObject, useLocation, useRoutes } from "react-router-dom";

import AccountPage from "./pages/account";
import AdminPage from "./pages/admin";
import PaymentPage from "./pages/payment";
import PaymentSuccessPage from "./pages/payment-success";
import Schedule from "./pages/schedule";
import SessionPage from "./pages/session";
import MerchPage from "./pages/merch";

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
		path: "merch",
		element: <MerchPage />,
	},
	{
		path: "payment",
		element: <PaymentPage />,
	},
	{
		path: "payment-success",
		element: <PaymentSuccessPage />,
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
