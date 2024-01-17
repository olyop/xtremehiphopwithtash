import { useAuth0 } from "@auth0/auth0-react";
import { FC, createElement, useContext } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import Page from "../page";
import AdminClassDescription from "./class-description";
import AdminCoupons from "./coupons";
import AdminCourses from "./courses";
import AdminInstructors from "./instructors";
import AdminLocations from "./locations";
import AdminStudents from "./students";
import AdminTrends from "./trends";

const AdminPage: FC = () => {
	const { isLoading } = useAuth0();
	const { isAdministrator } = useContext(IsAdministratorContext);

	if (isLoading) {
		return <p className="text-lg text-gray-500 p-4">Loading...</p>;
	}

	if (!isAdministrator) {
		return <p className="text-lg text-gray-500 p-4">You are not an administrator.</p>;
	}

	return (
		<Page className="flex flex-col gap-8 p-4">
			<AdminClassDescription />
			<AdminInstructors />
			<AdminLocations />
			<AdminCourses />
			<AdminCoupons />
			<AdminStudents />
			<AdminTrends />
		</Page>
	);
};

export default AdminPage;
