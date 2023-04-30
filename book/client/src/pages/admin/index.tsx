import { FC, createElement, useContext } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import Courses from "./courses";
import Instructors from "./instructors";
import Locations from "./locations";
import ReferralCodes from "./referral-codes";
import Students from "./students";

const AdminPage: FC = () => {
	const { isAdministrator } = useContext(IsAdministratorContext);

	if (!isAdministrator) {
		return <p className="text-lg text-gray-500 p-4">You are not an administrator.</p>;
	}

	return (
		<div className="flex flex-col gap-8 p-4">
			<Instructors />
			<Locations />
			<Courses />
			<ReferralCodes />
			<Students />
		</div>
	);
};

export default AdminPage;
