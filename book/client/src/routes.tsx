import { FC, createElement } from "react";
import { RouteObject, useLocation, useRoutes } from "react-router-dom";

import AccountPage from "./pages/account";
import AdminPage from "./pages/admin";
import BookingsPage from "./pages/bookings";
import InstallPage from "./pages/install";
import MerchPage from "./pages/merch";
import PaymentPage from "./pages/payment";
import PaymentSuccessPage from "./pages/payment-success";
import Schedule from "./pages/schedule";
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
		path: "bookings",
		element: <BookingsPage />,
	},
	{
		path: "merch",
		element: <MerchPage />,
	},
	{
		path: "install",
		element: <InstallPage />,
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
