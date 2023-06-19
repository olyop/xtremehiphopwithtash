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
import UPDATE_BOOKING from "./update-booking.graphql";

const SessionPageBooking: FC<PropTypes> = ({
	session,
	booking,
	onBookingUpdated,
	isEditing = false,
	hideCancel = false,
	hideUpdate = false,
	hideCallNow = false,
	hideCheckIn = false,
	hideDateLabel = false,
	hideQuantities = false,
	hideEquipmentFee = false,
	hideStripePaymentLink = false,
}) => {
	const { isAdministrator } = useContext(IsAdministratorContext);
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

	const canCancel = !booking.hasCancelled && (isAdministrator || booking.paymentMethod !== PaymentMethod.CARD);

	const handleCancelBooking = () => {
		if (canCancel && reCaptchaToken) {
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
			<Fragment> </Fragment>
			<span className="text-gray-500">on</span>
			<Fragment> </Fragment>
			{determineSessionDateLabel(session)}
		</Fragment>
	);

	return (
		<Entity
			id={booking.bookingID}
			isLeftALink={!booking.hasCancelled}
			leftLink={booking.hasCancelled ? undefined : `/session/${session.sessionID}`}
			rightClassName="p-2 pr-3 flex flex-col gap-1 !items-end"
			leftClassName="p-2 pl-3 grow hover:bg-gray-100 transition-colors"
			className={`!p-0 ${
				isSessionInPast || booking.hasCancelled
					? `bg-gray-100 opacity-60 ${hideUpdate ? "" : "pointer-events-none select-none"}`
					: ""
			}`}
			text={hideUpdate ? booking.session.title : determineDetailsFullName(booking.student.details)}
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
					{!hideCheckIn && !booking.hasCancelled && (
						<Fragment>
							<Button
								text={booking.hasCheckedIn ? "Checked In" : "Check In"}
								onClick={openCheckInModal}
								className={`!px-2 !text-xs !h-7 text-white ${
									booking.hasCheckedIn ? "!bg-green-600" : "!bg-orange-500"
								}`}
								ariaLabel={booking.hasCheckedIn ? "Un-check In" : "Check In"}
								leftIcon={className =>
									booking.hasCheckedIn ? (
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
					{!hideCancel && !isSessionInPast && (
						<Fragment>
							<Button
								transparent
								ariaLabel="Cancel"
								disabled={booking.hasCancelled}
								onClick={openCancelModal}
								text={booking.hasCancelled ? "Cancelled" : "Cancel"}
								className={`!px-2 !text-xs !h-7 ${booking.hasCancelled ? "hover:bg-transparent select-none" : ""}`}
								leftIcon={className =>
									booking.hasCancelled ? (
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
									canCancel && reCaptchaToken ? (
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
									) : null
								}
							/>
						</Fragment>
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
					{!hideCallNow && !isSessionInPast && (
						<a href={`tel:${booking.student.details.mobilePhoneNumber}`}>
							<Button
								transparent
								text="Call"
								className="!px-2 !text-xs !h-7"
								ariaLabel="Call Mobile Phone Number"
								leftIcon={className => <PhoneIcon className={`!h-4 !w-4 ${className}}`} />}
							/>
						</a>
					)}
					{hideUpdate || (
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
	hideDateLabel?: boolean;
	hideCallNow?: boolean;
	hideQuantities?: boolean;
	hideEquipmentFee?: boolean;
	hideStripePaymentLink?: boolean;
	onBookingUpdated: () => void;
}

export default SessionPageBooking;
