import { useQuery } from "@apollo/client";
import { FC, Fragment, createElement } from "react";

import Booking from "../../../../components/booking";
import {
	Booking as BookingType,
	GetStudentDetailsQuery,
	GetStudentDetailsQueryVariables,
	Session as SessionType,
	Student as StudentType,
} from "../../../../generated-types";
import { determinePlural } from "../../../../utils";
import AdminEntity from "../../entity";
import GET_STUDENT_DETAILS from "./get-student-details.graphql";

const Student: FC<Props> = ({ student }) => {
	const result = useQuery<GetStudentDetailsQuery, GetStudentDetailsQueryVariables>(GET_STUDENT_DETAILS, {
		variables: { studentID: student.studentID },
	});

	const handleBookingUpdated = () => {
		void result.refetch();
	};

	return (
		<AdminEntity
			id={student.studentID}
			typeName={student.__typename}
			text={
				<Fragment>
					{student.details.firstName} {student.details.lastName}
					<span> </span>
					{student.details.nickName && <span className="text-gray-500">({student.details.nickName})</span>}
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
			viewModalContent={
				<div className="flex flex-col gap-2">
					<div className="bg-white flex flex-col w-full shadow-lg">
						{result.data?.getStudentByID.bookings ? (
							result.data.getStudentByID.bookings.map(booking => (
								<Booking
									hideUpdate
									hideCheckIn
									isLeftALink
									hideCallNow
									hideCancel
									hideReceipt
									hideInstagram
									hideQuantities
									hideEquipmentFee
									hideStripePaymentLink
									key={booking.bookingID}
									booking={booking as BookingType}
									session={booking.session as SessionType}
									onBookingUpdated={handleBookingUpdated}
								/>
							))
						) : (
							<p className="text-gray-500 p-2">No booking</p>
						)}
					</div>
					{result.data?.getStudentByID.bookings && result.data.getStudentByID.bookings.length > 0 && (
						<p>
							{result.data.getStudentByID.bookings.length} booking
							{result.data.getStudentByID.bookings.length === 1 ? "" : "s"}
						</p>
					)}
				</div>
			}
		/>
	);
};

interface Props {
	student: StudentType;
}

export default Student;
