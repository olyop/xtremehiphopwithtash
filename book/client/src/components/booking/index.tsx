import { useMutation } from "@apollo/client";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import {
	Booking,
	BookingInput,
	DeleteBookingMutation,
	DeleteBookingMutationVariables,
	Session,
	UpdateBookingMutation,
	UpdateBookingMutationVariables,
} from "../../generated-types";
import { determineDetailsFullName } from "../../helpers";
import { useModal } from "../../hooks";
import { currencyFormatter, dateTimeFormatter } from "../../intl";
import { capitalizeFirstLetter, determinePlural } from "../../utils";
import AddToCalender from "../add-to-calender";
import Button from "../button";
import Entity from "../entity";
import BookingForm from "../forms/booking-form";
import Modal from "../modal";
import { bookingToInput } from "./booking-to-input";
import DELETE_BOOKING from "./delete-booking.graphql";
import UPDATE_BOOKING from "./update-booking.graphql";

const SessionPageBooking: FC<PropTypes> = ({
	session,
	booking,
	onBookingUpdated,
	hideDelete = false,
	hideEquipmentFee = false,
	hideAddToCalendar = false,
}) => {
	const [isUpdateModalOpen, openUpdateModal, closeUpdateModal] = useModal();
	const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useModal();

	const [updateBooking, updateBookingResult] = useMutation<UpdateData, UpdateVars>(UPDATE_BOOKING);
	const [deleteBooking, deleteBookingResult] = useMutation<DeleteData, DeleteVars>(DELETE_BOOKING);

	const [bookingInput, setBookingInput] = useState<BookingInput>(bookingToInput(booking));

	const handleUpdateBooking = () => {
		void updateBooking({
			variables: {
				bookingID: booking.bookingID,
				input: bookingInput,
			},
		});
	};

	const handleDeleteBooking = () => {
		void deleteBooking({
			variables: {
				bookingID: booking.bookingID,
			},
		});
	};

	useEffect(() => {
		if (updateBookingResult.data) {
			closeUpdateModal();
			onBookingUpdated();
		}
	}, [updateBookingResult.data]);

	useEffect(() => {
		if (deleteBookingResult.data) {
			closeDeleteModal();
			onBookingUpdated();
		}
	}, [deleteBookingResult.data]);

	return (
		<Entity
			id={booking.bookingID}
			text={
				<Fragment>
					<Fragment>{determineDetailsFullName(booking.student.details)}</Fragment>
					<Fragment> </Fragment>
					<span className="text-gray-500">{booking.student.details.mobilePhoneNumber}</span>
				</Fragment>
			}
			description={
				<Fragment>
					{booking.bookingQuantity} x booking{determinePlural(booking.bookingQuantity)}
					{booking.equipmentQuantity && (
						<Fragment>
							<Fragment>, </Fragment>
							{booking.equipmentQuantity} x step{determinePlural(booking.equipmentQuantity)}
							<Fragment> </Fragment>
							{booking.equipmentQuantity === 1 ? "hire" : "hired"}
						</Fragment>
					)}
					<br />
					<Fragment>
						Paid with
						<Fragment> </Fragment>
						{booking.paymentMethod
							? `${capitalizeFirstLetter(booking.paymentMethod.toLowerCase())}`
							: "Free"}
						{booking.cost && (
							<Fragment>
								<Fragment> owes </Fragment>
								{currencyFormatter.format(booking.cost)}
							</Fragment>
						)}
					</Fragment>
					<br />
					<span className="text-gray-500">
						Created: {dateTimeFormatter.format(booking.createdAt)}
					</span>
				</Fragment>
			}
			rightContent={
				<Fragment>
					<Button
						transparent
						onClick={openUpdateModal}
						ariaLabel="Edit booking"
						leftIcon={className => <PencilIcon className={className} />}
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
								onChange={setBookingInput}
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
					{hideAddToCalendar || <AddToCalender session={session} hideText />}
					{hideDelete || (
						<Fragment>
							<Button
								onClick={openDeleteModal}
								transparent
								ariaLabel="Delete booking"
								leftIcon={className => <TrashIcon className={className} />}
							/>
							<Modal
								isOpen={isDeleteModalOpen}
								onClose={closeDeleteModal}
								icon={className => <TrashIcon className={className} />}
								title="Delete Booking"
								contentClassName="flex flex-col gap-4"
								children={<p>Are you sure you want to delete this booking?</p>}
								error={deleteBookingResult.error}
								subTitle={`${booking.student.details.firstName} ${booking.student.details.lastName}`}
								buttons={
									<Fragment>
										<Button
											text="Delete"
											onClick={handleDeleteBooking}
											leftIcon={className => <TrashIcon className={className} />}
											ariaLabel="Delete booking"
										/>
										<Button
											text="Cancel"
											transparent
											onClick={closeDeleteModal}
											ariaLabel="Cancel"
											leftIcon={className => <XMarkIcon className={className} />}
										/>
									</Fragment>
								}
							/>
						</Fragment>
					)}
				</Fragment>
			}
		/>
	);
};

type UpdateData = UpdateBookingMutation;
type UpdateVars = UpdateBookingMutationVariables;
type DeleteData = DeleteBookingMutation;
type DeleteVars = DeleteBookingMutationVariables;

interface PropTypes {
	session: Session;
	booking: Booking;
	hideDelete?: boolean;
	hideEquipmentFee?: boolean;
	hideAddToCalendar?: boolean;
	onBookingUpdated: () => void;
}

export default SessionPageBooking;
