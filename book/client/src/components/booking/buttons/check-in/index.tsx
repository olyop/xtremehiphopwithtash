import { useMutation } from "@apollo/client/react/hooks/useMutation";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect } from "react";

import { Booking, CheckInBookingMutation, CheckInBookingMutationVariables } from "../../../../generated-types";
import { determineDetailsFullName } from "../../../../helpers/util";
import { useModal } from "../../../../hooks";
import Button from "../../../button";
import Modal from "../../../modal";
import CHECK_IN_BOOKING from "./check-in-booking.graphql";

const BookingCheckIn: FC<Props> = ({ booking, paymentDescription, onBookingUpdated }) => {
	const [checkInBooking, checkInBookingResult] = useMutation<CheckInData, CheckInVars>(CHECK_IN_BOOKING);

	const [isCheckInModalOpen, openCheckInModal, closeCheckInModal] = useModal(() => {
		checkInBookingResult.reset();
	});

	const handleCheckIn = () => {
		void checkInBooking({
			variables: {
				bookingID: booking.bookingID,
				value: !booking.isCheckedIn,
			},
		});
	};

	useEffect(() => {
		if (checkInBookingResult.data) {
			closeCheckInModal();
			onBookingUpdated();
		}
	}, [checkInBookingResult.data]);

	return (
		<Fragment>
			<Button
				onClick={openCheckInModal}
				text={booking.isCheckedIn ? "Checked In" : "Check In"}
				className={`!h-7 whitespace-nowrap !px-2 !text-xs text-white ${
					booking.isCheckedIn ? "!bg-green-600" : "!bg-orange-500"
				}`}
				ariaLabel={booking.isCheckedIn ? "Un-check In" : "Check In"}
				leftIcon={className => <CheckCircleIcon className={`!h-4 !w-4 text-white ${className}}`} />}
			/>
			<Modal
				title="Check In"
				isOpen={isCheckInModalOpen}
				onClose={closeCheckInModal}
				icon={className => <CheckCircleIcon className={className} />}
				contentClassName="flex flex-col gap-4"
				error={checkInBookingResult.error}
				subTitle={determineDetailsFullName(booking.student.details)}
				buttons={
					<Fragment>
						<Button
							onClick={handleCheckIn}
							text={booking.isCheckedIn ? "Un-check In" : "Check In"}
							leftIcon={className => <CheckCircleIcon className={className} />}
							ariaLabel={booking.isCheckedIn ? "Un-check In" : "Check In"}
						/>
						<Button
							text="Cancel"
							transparent
							onClick={closeCheckInModal}
							ariaLabel="Cancel"
							leftIcon={className => <XMarkIcon className={className} />}
						/>
					</Fragment>
				}
				children={
					<Fragment>
						<p>Are you sure you want to {booking.isCheckedIn ? "un-check in" : "check in"} this booking?</p>
						<p>
							<span className="text-gray-500">Payment Details:</span>
							<br />
							{paymentDescription}
						</p>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

type CheckInData = CheckInBookingMutation;
type CheckInVars = CheckInBookingMutationVariables;

interface Props {
	booking: Booking;
	paymentDescription: string;
	onBookingUpdated: () => void;
}

export default BookingCheckIn;
