import { FC, createElement, useContext } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import PageWithHeader from "../page-with-header";
import AdminClassDescription from "./class-description";
import AdminCoupons from "./coupons";
import AdminCourses from "./courses";
import AdminInstructors from "./instructors";
import AdminLocations from "./locations";
import AdminStudents from "./students";
import AdminTrends from "./trends";

const AdminPage: FC = () => {
	const isAdministrator = useContext(IsAdministratorContext);

	if (!isAdministrator) {
		return <p className="p-4 text-lg text-gray-500">You are not an administrator.</p>;
	}

	return (
		<PageWithHeader title="Administrator" contentClassName="flex flex-col gap-8">
			<AdminClassDescription />
			<AdminInstructors />
			<AdminLocations />
			<AdminCourses />
			<AdminCoupons />
			<AdminStudents />
			<AdminTrends />
		</PageWithHeader>
	);
};

export default AdminPage;
