import { FC, Fragment, createElement } from "react";

import { Student as StudentType } from "../../../generated-types";
import { determinePlural } from "../../../utils";
import AdminEntity from "../entity";

const Student: FC<PropTypes> = ({ student }) => (
	<AdminEntity
		id={student.studentID}
		typeName={student.__typename}
		text={
			<Fragment>
				{student.details.firstName} {student.details.lastName}
				<span> </span>
				{student.details.nickName && <span className="text-gray-500">({student.details.nickName})</span>}
				<Fragment> - </Fragment>
				<span className="text-gray-500">{student.studentID.split("|")[0]}</span>
			</Fragment>
		}
		description={
			<Fragment>
				{student.details.mobilePhoneNumber} :{" "}
				{student.bookingsTotal ? (
					<Fragment>
						{student.bookingsTotal} booking{determinePlural(student.bookingsTotal)}
					</Fragment>
				) : (
					<span className="text-gray-500">No bookings</span>
				)}
			</Fragment>
		}
	/>
);

interface PropTypes {
	student: StudentType;
}

export default Student;
