import { useMutation } from "@apollo/client/react/hooks/useMutation";
import CheckIcon from "@heroicons/react/24/solid/CheckIcon";
import MinusIcon from "@heroicons/react/24/solid/MinusIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useContext, useEffect } from "react";

import { IsAdministratorContext } from "../../../../contexts/is-administrator";
import {
	Booking,
	CancelBookingMutation,
	CancelBookingMutationVariables,
	PaymentMethod,
	Session,
} from "../../../../generated-types";
import { isInPast } from "../../../../helpers/date";
import { useModal, useReCaptcha } from "../../../../hooks";
import Button from "../../../button";
import Modal from "../../../modal";
import CANCEL_BOOKING from "./cancel-booking.graphql";

const BookingCancel: FC<Props> = ({ session, booking, onBookingUpdated, modalClassName }) => {
	const isAdministrator = useContext(IsAdministratorContext);

	const [reCaptchaToken, reCaptchaError, getReCaptchaToken] = useReCaptcha(
		import.meta.env.VITE_GOOGLE_RECAPTCHA_ACTION,
	);

	const [cancelBooking, cancelBookingResult] = useMutation<CancelData, CancelVars>(CANCEL_BOOKING);

	const [isCancelModalOpen, openCancelModal, closeCancelModal] = useModal(() => {
		cancelBookingResult.reset();
	});

	const isSessionInPast = isInPast(new Date(session.endTime));
	const canCancel = !booking.isCancelled && (isAdministrator || !isSessionInPast);

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

	useEffect(() => {
		if (cancelBookingResult.data) {
			closeCancelModal();
			onBookingUpdated();
		}
	}, [cancelBookingResult.data]);

	useEffect(() => {
		if (cancelBookingResult.error?.message.includes("reCAPTCHA")) {
			void getReCaptchaToken();
			cancelBookingResult.reset();
		}
	}, [cancelBookingResult.error]);

	useEffect(() => {
		if (isCancelModalOpen) {
			void getReCaptchaToken();
		}
	}, [isCancelModalOpen]);

	return (
		<Fragment>
			<Button
				transparent
				ariaLabel="Cancel"
				disabled={!canCancel}
				onClick={openCancelModal}
				text={reCaptchaError ?? (booking.isCancelled ? "Cancelled" : "Cancel")}
				className={`!h-7 !px-2 !text-xs ${canCancel ? "" : "select-none hover:bg-transparent"}`}
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
				modalClassName={modalClassName}
				error={cancelBookingResult.error}
				contentClassName="flex flex-col gap-6"
				icon={className => <XMarkIcon className={className} />}
				children={
					booking.paymentMethod === PaymentMethod.CARD ? (
						<Fragment>
							<div className="flex flex-col gap-2 rounded border bg-gray-100 p-4">
								<p className="text-gray-500">Cancellation Terms - CARD</p>
								<div className="flex flex-col gap-2">
									<p>
										If cancelled at least 3 hours prior to scheduled class, you will receive a free coupon for your next
										booked class.
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
							<div className="flex flex-col gap-2 rounded border bg-gray-100 p-4">
								<p className="text-gray-500">Cancellation Terms - CASH</p>
								<p>You can cancel your booking within 3 hours of your scheduled class.</p>
							</div>
							<p>Are you sure you want to cancel this booking?</p>
						</Fragment>
					)
				}
				buttons={
					canCancel && (isAdministrator || booking.paymentMethod !== PaymentMethod.CARD) ? (
						<Fragment>
							<Button
								disabled={!reCaptchaToken || cancelBookingResult.loading}
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
	);
};

interface Props {
	session: Session;
	booking: Booking;
	onBookingUpdated: () => void;
	modalClassName?: string | undefined;
}

type CancelData = CancelBookingMutation;
type CancelVars = CancelBookingMutationVariables;

export default BookingCancel;
