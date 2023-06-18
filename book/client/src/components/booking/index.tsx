import { useMutation } from "@apollo/client/react/hooks/useMutation";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import {
	Booking,
	BookingInput,
	CancelBookingMutation,
	CancelBookingMutationVariables,
	CheckInBookingMutation,
	CheckInBookingMutationVariables,
	PaymentMethod,
	Session,
	UpdateBookingMutation,
	UpdateBookingMutationVariables,
} from "../../generated-types";
import { isInPast } from "../../helpers/date";
import { currencyDollarsFormatter, dateTimeFormatter } from "../../helpers/intl";
import { determineDetailsFullName, determineSessionDateLabel } from "../../helpers/util";
import { useModal, useReCaptcha } from "../../hooks";
import { centsToDollars, determinePlural } from "../../utils";
import Button from "../button";
import Entity from "../entity";
import BookingForm from "../forms/booking-form";
import Modal from "../modal";
import SessionStartTime from "../session-start-end-time";
import { bookingToInput } from "./booking-to-input";
import CANCEL_BOOKING from "./cancel-booking.graphql";
import CHECK_IN_BOOKING from "./check-in-booking.graphql";
import UPDATE_BOOKING from "./update-booking.graphql";

const SessionPageBooking: FC<PropTypes> = ({
	session,
	booking,
	onBookingUpdated,
	isEditing = false,
	hideRefund = false,
	hideUpdate = false,
	hideCheckIn = false,
	hideQuantities = false,
	hideEquipmentFee = false,
}) => {
	const [reCaptchaToken, setReCaptchaToken, executeReCaptcha] = useReCaptcha();

	const [isUpdateModalOpen, openUpdateModal, closeUpdateModal] = useModal();
	const [isCancelModalOpen, openCancelModal, closeCancelModal] = useModal();
	const [isCheckInModalOpen, openCheckInModal, closeCheckInModal] = useModal();

	const [updateBooking, updateBookingResult] = useMutation<UpdateData, UpdateVars>(UPDATE_BOOKING);
	const [cancelBooking, cancelBookingResult] = useMutation<CancelData, CancelVars>(CANCEL_BOOKING);
	const [checkInBooking, checkInBookingResult] = useMutation<CheckInData, CheckInVars>(CHECK_IN_BOOKING);

	const [bookingInput, setBookingInput] = useState<BookingInput>(bookingToInput(booking));

	const handleUpdateBooking = () => {
		void updateBooking({
			variables: {
				bookingID: booking.bookingID,
				input: bookingInput,
			},
		});
	};

	const handleCancelBooking = () => {
		if (booking.paymentMethod === PaymentMethod.CASH && reCaptchaToken) {
			void cancelBooking({
				variables: {
					reCaptcha: reCaptchaToken,
					bookingID: booking.bookingID,
				},
			});
		}
	};

	const handleCheckIn = () => {
		void checkInBooking({
			variables: {
				bookingID: booking.bookingID,
				value: !booking.hasCheckedIn,
			},
		});
	};

	const handleReCaptcha = async () => {
		setReCaptchaToken(await executeReCaptcha());
	};

	useEffect(() => {
		if (updateBookingResult.data) {
			closeUpdateModal();
			onBookingUpdated();
		}
	}, [updateBookingResult.data]);

	useEffect(() => {
		if (cancelBookingResult.data) {
			closeCancelModal();
			onBookingUpdated();
		}
	}, [cancelBookingResult.data]);

	useEffect(() => {
		if (checkInBookingResult.data) {
			closeCheckInModal();
			onBookingUpdated();
		}
	}, [checkInBookingResult.data]);

	useEffect(() => {
		if (isCancelModalOpen) {
			void handleReCaptcha();
		}
	}, [isCancelModalOpen]);

	const isSessionInPast = isInPast(new Date(session.startTime));

	const paymentDescription =
		bookingInput.paymentMethod === null
			? "FREE session"
			: booking.paymentMethod === PaymentMethod.COUPON
			? "Paid in full with COUPON"
			: bookingInput.paymentMethod === PaymentMethod.CASH && booking.cost
			? `${isSessionInPast ? "Paid" : "Will pay"} ${currencyDollarsFormatter.format(
					centsToDollars(booking.cost),
			  )} in CASH`
			: bookingInput.paymentMethod === PaymentMethod.CARD && booking.cost
			? `Paid ${currencyDollarsFormatter.format(booking.cost / 100)} with CARD`
			: null;

	const sessionDateAndTimeLabel = (
		<Fragment>
			<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
			<span className="text-gray-500"> / </span>
			{determineSessionDateLabel(session)}
		</Fragment>
	);

	return (
		<Entity
			id={booking.bookingID}
			isLeftALink
			leftLink={`/session/${session.sessionID}`}
			rightClassName="p-2 pr-3"
			leftClassName="p-2 pl-3 grow hover:bg-gray-100 transition-colors"
			className={`!p-0 ${isSessionInPast ? "bg-gray-100 opacity-60 pointer-events-none select-none" : ""}`}
			text={hideUpdate ? booking.session.title : determineDetailsFullName(booking.student.details)}
			description={
				<Fragment>
					{sessionDateAndTimeLabel}
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
					{isSessionInPast || hideRefund || (
						<Fragment>
							<Button
								transparent
								text="Cancel"
								ariaLabel="Cancel"
								className="!px-1 !text-xs !h-7"
								onClick={openCancelModal}
								leftIcon={className => <CurrencyDollarIcon className={`!h-4 !w-4 ${className}}`} />}
							/>
							<Modal
								title="Cancel Booking"
								isOpen={isCancelModalOpen}
								onClose={closeCancelModal}
								error={cancelBookingResult.error}
								subTitle={sessionDateAndTimeLabel}
								contentClassName="flex flex-col gap-2"
								icon={className => <CheckCircleIcon className={className} />}
								children={
									booking.paymentMethod === PaymentMethod.CARD ? (
										<Fragment>
											<p>Card payments cannot be cancelled.</p>
											<p>Please contact us if you need to cancel this booking.</p>
										</Fragment>
									) : (
										<Fragment>
											<p>Are you sure you want to cancel this booking?</p>
											<p>Bookings to be paid in cash can be cancelled up to 3 hours before the session starts.</p>
										</Fragment>
									)
								}
								buttons={
									booking.paymentMethod === PaymentMethod.CARD ? null : (
										<Fragment>
											<Button
												text="Confirm"
												onClick={handleCancelBooking}
												ariaLabel="Yes - Cancel Booking"
												leftIcon={className => <CheckIcon className={className} />}
											/>
											<Button
												text="Cancel"
												transparent
												ariaLabel="Cancel"
												onClick={closeCancelModal}
												leftIcon={className => <XMarkIcon className={className} />}
											/>
										</Fragment>
									)
								}
							/>
						</Fragment>
					)}
					{hideCheckIn || (
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
					)}
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
				</Fragment>
			}
		/>
	);
};

type UpdateData = UpdateBookingMutation;
type UpdateVars = UpdateBookingMutationVariables;
type CancelData = CancelBookingMutation;
type CancelVars = CancelBookingMutationVariables;
type CheckInData = CheckInBookingMutation;
type CheckInVars = CheckInBookingMutationVariables;

interface PropTypes {
	session: Session;
	booking: Booking;
	isEditing?: boolean;
	hideUpdate?: boolean;
	hideRefund?: boolean;
	hideCheckIn?: boolean;
	hideQuantities?: boolean;
	hideEquipmentFee?: boolean;
	onBookingUpdated: () => void;
}

export default SessionPageBooking;
