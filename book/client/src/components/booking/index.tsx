import { useMutation } from "@apollo/client/react/hooks/useMutation";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useContext, useEffect, useState } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
import {
	Booking,
	BookingInput,
	CheckInBookingMutation,
	CheckInBookingMutationVariables,
	DeleteBookingMutation,
	DeleteBookingMutationVariables,
	PaymentMethod,
	Session,
	UpdateBookingMutation,
	UpdateBookingMutationVariables,
} from "../../generated-types";
import { determineDetailsFullName, determineSessionDateLabel } from "../../helpers";
import { useModal } from "../../hooks";
import { currencyDollarsFormatter, dateTimeFormatter } from "../../intl";
import { centsToDollars, determinePlural } from "../../utils";
import Button from "../button";
import Entity from "../entity";
import BookingForm from "../forms/booking-form";
import Modal from "../modal";
import { bookingToInput } from "./booking-to-input";
import BOOKING_CHECK_IN from "./check-in-booking.graphql";
import DELETE_BOOKING from "./delete-booking.graphql";
import UPDATE_BOOKING from "./update-booking.graphql";

const SessionPageBooking: FC<PropTypes> = ({
	session,
	booking,
	isEditing = false,
	onBookingUpdated,
	hideDelete = false,
	hideUpdate = false,
	hideCheckIn = false,
	hideQuantities = false,
	hideEquipmentFee = false,
}) => {
	const { isAdministrator } = useContext(IsAdministratorContext);

	const [isUpdateModalOpen, openUpdateModal, closeUpdateModal] = useModal();
	const [isDeleteModalOpen, openDeleteModal, closeDeleteModal] = useModal();
	const [isCheckInModalOpen, openCheckInModal, closeCheckInModal] = useModal();

	const [updateBooking, updateBookingResult] = useMutation<UpdateData, UpdateVars>(UPDATE_BOOKING);
	const [deleteBooking, deleteBookingResult] = useMutation<DeleteData, DeleteVars>(DELETE_BOOKING);

	const [checkInBooking, checkInBookingResult] = useMutation<CheckInData, CheckInVars>(BOOKING_CHECK_IN);

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

	const handleCheckIn = () => {
		void checkInBooking({
			variables: {
				bookingID: booking.bookingID,
				value: !booking.hasCheckedIn,
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

	useEffect(() => {
		if (checkInBookingResult.data) {
			closeCheckInModal();
			onBookingUpdated();
		}
	}, [checkInBookingResult.data]);

	const paymentDescription =
		booking.paymentMethod === null && booking.cost === null
			? "Paid in full with COUPON"
			: bookingInput.paymentMethod === PaymentMethod.CASH && booking.cost
			? `Will pay ${currencyDollarsFormatter.format(centsToDollars(booking.cost))} in CASH`
			: bookingInput.paymentMethod === PaymentMethod.CARD && booking.cost
			? `Paid ${currencyDollarsFormatter.format(booking.cost / 100)} with CARD`
			: null;

	return (
		<Entity
			id={booking.bookingID}
			text={hideUpdate ? booking.session.title : determineDetailsFullName(booking.student.details)}
			description={
				<Fragment>
					{determineSessionDateLabel(session)}
					<br />
					{hideUpdate ? null : (
						<Fragment>
							{booking.student.details.mobilePhoneNumber}
							<br />
						</Fragment>
					)}
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
					{paymentDescription}
					{booking.notes && (
						<Fragment>
							<br />
							<span className="text-gray-500">Notes: {booking.notes}</span>
						</Fragment>
					)}
					{hideUpdate ? null : (
						<Fragment>
							<br />
							<span className="text-gray-500">{dateTimeFormatter.format(booking.createdAt)}</span>
						</Fragment>
					)}
				</Fragment>
			}
			rightContent={
				<Fragment>
					{!hideCheckIn && isAdministrator ? (
						<Fragment>
							<Button
								transparent
								onClick={openCheckInModal}
								ariaLabel={booking.hasCheckedIn ? "Un-check In" : "Check In"}
								leftIcon={className => (
									<CheckCircleIcon className={`${className} ${booking.hasCheckedIn ? "text-green-500" : ""}`} />
								)}
							/>
							<Modal
								title="Check In"
								isOpen={isCheckInModalOpen}
								onClose={closeCheckInModal}
								icon={className => <CheckCircleIcon className={className} />}
								contentClassName="flex flex-col gap-4"
								children={
									<Fragment>
										<p>Are you sure you want to {booking.hasCheckedIn ? "un-check in" : "check in"} this booking?</p>
										<p>
											<span className="text-gray-500">Payment Details:</span>
											<br />
											{paymentDescription}
										</p>
									</Fragment>
								}
								error={checkInBookingResult.error}
								subTitle={determineDetailsFullName(booking.student.details)}
								buttons={
									<Fragment>
										<Button
											onClick={handleCheckIn}
											text={booking.hasCheckedIn ? "Un-check In" : "Check In"}
											leftIcon={className => <CheckCircleIcon className={className} />}
											ariaLabel={booking.hasCheckedIn ? "Un-check In" : "Check In"}
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
							/>
						</Fragment>
					) : booking.hasCheckedIn ? (
						<Button
							transparent
							ariaLabel="Checked In"
							leftIcon={className => <CheckCircleIcon className={`${className} text-green-500`} />}
						/>
					) : null}
					{hideUpdate || (
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
					)}
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
type CheckInData = CheckInBookingMutation;
type CheckInVars = CheckInBookingMutationVariables;

interface PropTypes {
	session: Session;
	booking: Booking;
	hideDelete?: boolean;
	hideCheckIn?: boolean;
	hideUpdate?: boolean;
	isEditing?: boolean;
	hideQuantities?: boolean;
	hideEquipmentFee?: boolean;
	onBookingUpdated: () => void;
}

export default SessionPageBooking;
