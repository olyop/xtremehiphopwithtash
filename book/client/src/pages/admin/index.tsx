import { FC, createElement } from "react";

import Courses from "./courses";
import Instructors from "./instructors";
import Locations from "./locations";

const Admin: FC = () => (
	<div className="flex flex-col gap-8">
		<Instructors />
		<Locations />
		<Courses />
	</div>
);

export default Admin;
