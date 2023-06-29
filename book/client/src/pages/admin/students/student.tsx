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
				{student.details.mobilePhoneNumber}
				<Fragment> : </Fragment>
				{student.details.emailAddress}
				{student.details.instagramUsername && (
					<Fragment>
						<Fragment> : </Fragment>
						{student.details.instagramUsername}
					</Fragment>
				)}
				<br />
				{student.bookingsTotal ? (
					<Fragment>
						{student.bookingsTotal}
						<Fragment> booking{determinePlural(student.bookingsTotal)}</Fragment>
						{student.bookingsTotalPaymentMethodCard && (
							<Fragment>
								<Fragment>, </Fragment>
								<Fragment>{student.bookingsTotalPaymentMethodCard} card</Fragment>
							</Fragment>
						)}
						{student.bookingsTotalPaymentMethodCash && (
							<Fragment>
								<Fragment>, </Fragment>
								<Fragment>{student.bookingsTotalPaymentMethodCash} cash</Fragment>
							</Fragment>
						)}
						{student.bookingsTotalPaymentMethodFree && (
							<Fragment>
								<Fragment>, </Fragment>
								<Fragment>{student.bookingsTotalPaymentMethodFree} free</Fragment>
							</Fragment>
						)}
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
