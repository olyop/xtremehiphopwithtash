import { useAuth0 } from "@auth0/auth0-react";
import { FC, createElement, useContext } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import Page from "../page";
import ReferralCodes from "./coupons";
import Courses from "./courses";
import Instructors from "./instructors";
import Locations from "./locations";
import Students from "./students";

const AdminPage: FC = () => {
	const { isLoading } = useAuth0();
	const { isAdministrator } = useContext(IsAdministratorContext);

	if (!isAdministrator && !isLoading) {
		return <p className="text-lg text-gray-500 p-4">You are not an administrator.</p>;
	}

	return (
		<Page className="flex flex-col gap-8 p-4">
			<Instructors />
			<Locations />
			<Courses />
			<ReferralCodes />
			<Students />
		</Page>
	);
};

export default AdminPage;
