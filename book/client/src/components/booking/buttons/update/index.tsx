import { useMutation } from "@apollo/client/react/hooks/useMutation";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import {
	Booking,
	BookingInput,
	Session,
	UpdateBookingMutation,
	UpdateBookingMutationVariables,
} from "../../../../generated-types";
import { useModal } from "../../../../hooks";
import Button from "../../../button";
import BookingForm from "../../../forms/booking-form";
import Modal from "../../../modal";
import { bookingToInput } from "./booking-to-input";
import UPDATE_BOOKING from "./update-booking.graphql";

const BookingUpdate: FC<Props> = ({
	session,
	booking,
	isEditing = false,
	hideQuantities = false,
	hideEquipmentFee = false,
	onBookingUpdated,
}) => {
	const [bookingInput, setBookingInput] = useState<BookingInput>(bookingToInput(booking));

	const [updateBooking, updateBookingResult] = useMutation<UpdateData, UpdateVars>(UPDATE_BOOKING);

	const [isUpdateModalOpen, openUpdateModal, closeUpdateModal] = useModal(() => {
		updateBookingResult.reset();
	});

	const handleUpdateBooking = () => {
		void updateBooking({
			variables: {
				bookingID: booking.bookingID,
				input: bookingInput,
			},
		});
	};

	useEffect(() => {
		if (updateBookingResult.data) {
			closeUpdateModal();
			onBookingUpdated();
		}
	}, [updateBookingResult.data]);

	return (
		<Fragment>
			<Button
				transparent
				text="Edit"
				onClick={openUpdateModal}
				className="!px-2 !text-xs !h-7"
				ariaLabel="Edit booking"
				leftIcon={className => <PencilIcon className={`!h-4 !w-4 ${className}}`} />}
			/>
			<Modal
				title="Update Booking"
				isOpen={isUpdateModalOpen}
				onClose={closeUpdateModal}
				icon={className => <PencilIcon className={className} />}
				subTitle={`${booking.student.details.firstName} ${booking.student.details.lastName}`}
				contentClassName="flex flex-col gap-4"
				children={
					<BookingForm
						session={session}
						input={bookingInput}
						isEditing={isEditing}
						onChange={setBookingInput}
						hideQuantities={hideQuantities}
						hideEquipmentFee={hideEquipmentFee}
					/>
				}
				error={updateBookingResult.error}
				buttons={
					<Fragment>
						<Button
							text="Update"
							ariaLabel="Update Booking"
							onClick={handleUpdateBooking}
							leftIcon={className => <PencilIcon className={className} />}
						/>
						<Button
							text="Cancel"
							ariaLabel="Cancel"
							transparent
							onClick={closeUpdateModal}
							leftIcon={className => <XMarkIcon className={className} />}
						/>
					</Fragment>
				}
			/>
		</Fragment>
	);
};

type UpdateData = UpdateBookingMutation;
type UpdateVars = UpdateBookingMutationVariables;

interface Props {
	session: Session;
	booking: Booking;
	isEditing?: boolean;
	hideQuantities?: boolean;
	hideEquipmentFee?: boolean;
	onBookingUpdated: () => void;
}

export default BookingUpdate;
