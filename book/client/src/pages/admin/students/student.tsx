import { FC, Fragment, createElement } from "react";

import Entity from "../../../components/entity";
import { Student as StudentType } from "../../../generated-types";

const Student: FC<PropTypes> = ({ student }) => (
	<Entity
		id={student.studentID}
		typeName={student.__typename}
		description={student.details.mobilePhoneNumber}
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
