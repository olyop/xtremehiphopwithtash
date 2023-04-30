import { FC, Fragment, createElement } from "react";

import { Student as StudentType } from "../../../generated-types";
import AdminEntity from "../entity";

const Student: FC<PropTypes> = ({ student }) => (
	<AdminEntity
		id={student.studentID}
		typeName={student.__typename}
		description={
			<Fragment>
				{student.details.mobilePhoneNumber}
				<Fragment> - </Fragment>
				<span className="text-gray-500">{student.studentID.split("|")[0]}</span>
			</Fragment>
		}
		text={
			<Fragment>
				{student.details.firstName} {student.details.lastName}
				<span> </span>
				{student.details.nickName && (
					<span className="text-gray-500">({student.details.nickName})</span>
				)}
			</Fragment>
		}
	/>
);

interface PropTypes {
	student: StudentType;
}

export default Student;
