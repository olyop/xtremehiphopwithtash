import { FC, createElement } from "react";

import Courses from "./courses";
import Instructors from "./instructors";
import Locations from "./locations";
import Students from "./students";

const Admin: FC = () => (
	<div className="flex flex-col gap-8 p-4">
		<Instructors />
		<Locations />
		<Courses />
		<Students />
	</div>
);

export default Admin;
