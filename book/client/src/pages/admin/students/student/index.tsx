import { useQuery } from "@apollo/client/react/hooks/useQuery";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
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
					{student.hasSignedWaiver && (
						<CheckCircleIcon className="mb-2 mr-1 inline-block size-4 text-green-500" title="Has signed waiver" />
					)}
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
				result.data ? (
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<p>
								<Fragment>Email Address: </Fragment>
								<span className="text-gray-500">{result.data.getStudentByID.details.emailAddress}</span>
							</p>
							<p>
								<Fragment>Mobile Number: </Fragment>
								<span className="text-gray-500">{result.data.getStudentByID.details.mobilePhoneNumber}</span>
							</p>
							{result.data.getStudentByID.details.instagramUsername && (
								<p>
									<Fragment>Instagram Username: </Fragment>
									<span className="text-gray-500">{result.data.getStudentByID.details.instagramUsername}</span>
								</p>
							)}
							{result.data.getStudentByID.bookings && result.data.getStudentByID.bookings.length > 0 && (
								<p>
									<Fragment>Bookings Total: </Fragment>
									<span className="text-gray-500">{result.data.getStudentByID.bookings.length}</span>
								</p>
							)}
						</div>
						<div className="flex w-full flex-col bg-white shadow-lg">
							{result.data.getStudentByID.bookings ? (
								result.data.getStudentByID.bookings.map(booking => (
									<Booking
										hideUpdate
										hideCheckIn
										isLeftALink
										hideCallNow
										hideReceipt
										hideInstagram
										hideQuantities
										hideEquipmentFee
										hideStripePaymentLink
										key={booking.bookingID}
										booking={booking as BookingType}
										onBookingUpdated={handleBookingUpdated}
										session={booking.session as SessionType}
										cancelModalClassName="!w-[20rem]"
									/>
								))
							) : (
								<p className="p-2 text-gray-500">No booking</p>
							)}
						</div>
					</div>
				) : null
			}
		/>
	);
};

interface Props {
	student: StudentType;
}

export default Student;
