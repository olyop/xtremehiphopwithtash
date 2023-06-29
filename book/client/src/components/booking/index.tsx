import { useMutation } from "@apollo/client/react/hooks/useMutation";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import ArrowRightOnRectangleIcon from "@heroicons/react/24/solid/ArrowRightOnRectangleIcon";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import MinusIcon from "@heroicons/react/24/solid/MinusIcon";
import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useContext, useEffect, useState } from "react";

import { IsAdministratorContext } from "../../contexts/is-administrator";
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
import BookingReceipt from "./receipt";
import UPDATE_BOOKING from "./update-booking.graphql";

const SessionPageBooking: FC<PropTypes> = ({
	session,
	booking,
	onBookingUpdated,
	isEditing = false,
	hideCancel = false,
	hideUpdate = false,
	hideCallNow = false,
	hideReceipt = false,
	hideCheckIn = false,
	hideInstagram = false,
	hideDateLabel = false,
	hideQuantities = false,
	hideEquipmentFee = false,
	hideStripePaymentLink = false,
}) => {
	const { isAdministrator } = useContext(IsAdministratorContext);
	const [reCaptchaToken, setReCaptchaToken, executeReCaptcha] = useReCaptcha();

	const [updateBooking, updateBookingResult] = useMutation<UpdateData, UpdateVars>(UPDATE_BOOKING);
	const [cancelBooking, cancelBookingResult] = useMutation<CancelData, CancelVars>(CANCEL_BOOKING);
	const [checkInBooking, checkInBookingResult] = useMutation<CheckInData, CheckInVars>(CHECK_IN_BOOKING);

	const [isUpdateModalOpen, openUpdateModal, closeUpdateModal] = useModal(() => updateBookingResult.reset());
	const [isCancelModalOpen, openCancelModal, closeCancelModal] = useModal(() => cancelBookingResult.reset());
	const [isCheckInModalOpen, openCheckInModal, closeCheckInModal] = useModal(() => checkInBookingResult.reset());

	const [bookingInput, setBookingInput] = useState<BookingInput>(bookingToInput(booking));

	const handleUpdateBooking = () => {
		void updateBooking({
			variables: {
				bookingID: booking.bookingID,
				input: bookingInput,
			},
		});
	};

	const canCancel = !booking.isCancelled && (isAdministrator || booking.paymentMethod !== PaymentMethod.CARD);

	const handleCancelBooking = () => {
		if (canCancel && reCaptchaToken && !cancelBookingResult.loading) {
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
				value: !booking.isCheckedIn,
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
		if (cancelBookingResult.error?.message.includes("reCAPTCHA")) {
			void handleReCaptcha();
			cancelBookingResult.reset();
		}
	}, [cancelBookingResult.error]);

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

	const isSessionInPast = isInPast(new Date(session.endTime));

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
			<span className="text-gray-500">from </span>
			<SessionStartTime startTime={session.startTime} endTime={session.endTime} />
			<br />
			<span className="text-gray-500">on </span>
			<Fragment> </Fragment>
			{determineSessionDateLabel(session, true, true)}
		</Fragment>
	);

	return (
		<Entity
			id={booking.bookingID}
			isLeftALink={!booking.isCancelled}
			leftLink={booking.isCancelled ? undefined : `/session/${session.sessionID}`}
			rightClassName="py-2 pr-3 flex flex-col gap-1 !items-end"
			leftClassName="p-2 pl-3 grow hover:bg-gray-100 transition-colors"
			className={`!p-0 ${isSessionInPast || booking.isCancelled ? "bg-gray-100" : ""}`}
			text={
				hideUpdate
					? booking.session.title
					: `${determineDetailsFullName(booking.student.details)}${
							!hideInstagram && booking.student.details.instagramUsername
								? ` (${booking.student.details.instagramUsername})`
								: ""
					  }`
			}
			description={
				<Fragment>
					{hideDateLabel || (
						<Fragment>
							{sessionDateAndTimeLabel}
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
					{hideUpdate ? null : (
						<Fragment>
							<br />
							<span className="text-gray-500">{dateTimeFormatter.format(booking.createdAt)}</span>
						</Fragment>
					)}
					{booking.notes && (
						<Fragment>
							<br />
							<span className="text-gray-500">Notes: {booking.notes}</span>
						</Fragment>
					)}
				</Fragment>
			}
			rightContent={
				<Fragment>
					{!hideCheckIn && !booking.isCancelled && (
						<Fragment>
							<Button
								text={booking.isCheckedIn ? "Checked In" : "Check In"}
								onClick={openCheckInModal}
								className={`!px-2 !text-xs !h-7 text-white ${booking.isCheckedIn ? "!bg-green-600" : "!bg-orange-500"}`}
								ariaLabel={booking.isCheckedIn ? "Un-check In" : "Check In"}
								leftIcon={className =>
									booking.isCheckedIn ? (
										<CheckCircleIcon className={`!h-4 !w-4 text-white ${className}}`} />
									) : (
										<ArrowRightOnRectangleIcon className={`!h-4 !w-4 text-white ${className}}`} />
									)
								}
							/>
							<Modal
								title="Check In"
								isOpen={isCheckInModalOpen}
								onClose={closeCheckInModal}
								icon={className => <CheckCircleIcon className={className} />}
								contentClassName="flex flex-col gap-4"
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
							/>
						</Fragment>
					)}
					{!hideCancel && !isSessionInPast && (
						<Fragment>
							<Button
								transparent
								ariaLabel="Cancel"
								disabled={booking.isCancelled}
								onClick={openCancelModal}
								text={booking.isCancelled ? "Cancelled" : "Cancel"}
								className={`!px-2 !text-xs !h-7 ${booking.isCancelled ? "hover:bg-transparent select-none" : ""}`}
								leftIcon={className =>
									booking.isCancelled ? (
										<MinusIcon className={`!h-4 !w-4 ${className}}`} />
									) : (
										<XMarkIcon className={`!h-4 !w-4 ${className}}`} />
									)
								}
							/>
							<Modal
								title="Cancel Booking"
								isOpen={isCancelModalOpen}
								onClose={closeCancelModal}
								error={cancelBookingResult.error}
								contentClassName="flex flex-col gap-6"
								icon={className => <XMarkIcon className={className} />}
								children={
									booking.paymentMethod === PaymentMethod.CARD ? (
										<Fragment>
											<div className="p-4 border rounded bg-gray-100 flex flex-col gap-2">
												<p className="text-gray-500">Cancellation Terms - CARD</p>
												<div className="flex flex-col gap-2">
													<p>
														If cancelled at least 3 hours prior to scheduled class, you will receive a free coupon for
														your next booked class.
													</p>
													<p>
														Please contact us at{" "}
														<a href="tel:0432617673" className="text-blue-500 underline">
															0432617673
														</a>{" "}
														to cancel your booking.
													</p>
												</div>
											</div>
											{!canCancel && <p>Are you sure you want to cancel this booking?</p>}
										</Fragment>
									) : (
										<Fragment>
											<div className="p-4 border rounded bg-gray-100 flex flex-col gap-2">
												<p className="text-gray-500">Cancellation Terms - CASH</p>
												<p>You can cancel your booking within 3 hours of your scheduled class.</p>
											</div>
											<p>Are you sure you want to cancel this booking?</p>
										</Fragment>
									)
								}
								buttons={
									canCancel ? (
										<Fragment>
											<Button
												disabled={!reCaptchaToken}
												onClick={handleCancelBooking}
												ariaLabel="Yes - Cancel Booking"
												leftIcon={className => <CheckIcon className={className} />}
												text={cancelBookingResult.loading ? "Cancelling..." : "Yes"}
											/>
											<Button
												text="No"
												transparent
												ariaLabel="No"
												onClick={closeCancelModal}
												leftIcon={className => <XMarkIcon className={className} />}
											/>
										</Fragment>
									) : null
								}
							/>
						</Fragment>
					)}
					{!hideReceipt && booking.paymentMethod === PaymentMethod.CARD && <BookingReceipt booking={booking} />}
					{!hideCallNow && !isSessionInPast && (
						<a target="_blank" rel="noreferrer" href={`tel:${booking.student.details.mobilePhoneNumber}`}>
							<Button
								transparent
								text="Mobile"
								className="!px-2 !text-xs !h-7"
								ariaLabel="Call Mobile Phone Number"
								leftIcon={className => <PhoneIcon className={`!h-4 !w-4 ${className}}`} />}
							/>
						</a>
					)}
					{!hideStripePaymentLink && booking.paymentMethod === PaymentMethod.CARD && booking.paymentIntentID && (
						<a
							target="_blank"
							rel="noreferrer"
							href={`${import.meta.env.VITE_STRIPE_PAYMENT_DASHBOARD_URL}${booking.paymentIntentID}`}
						>
							<Button
								transparent
								text="Stripe"
								ariaLabel="Open In Stripe"
								className="!px-2 !text-xs !h-7"
								leftIcon={className => <CurrencyDollarIcon className={`!h-4 !w-4 ${className}}`} />}
							/>
						</a>
					)}
					{!hideUpdate && !booking.isCancelled && !isSessionInPast && (
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
	hideCancel?: boolean;
	hideCheckIn?: boolean;
	hideReceipt?: boolean;
	hideCallNow?: boolean;
	hideDateLabel?: boolean;
	hideInstagram?: boolean;
	hideQuantities?: boolean;
	hideEquipmentFee?: boolean;
	hideStripePaymentLink?: boolean;
	onBookingUpdated: () => void;
}

export default SessionPageBooking;
