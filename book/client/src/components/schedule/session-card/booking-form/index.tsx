import ArrowLongRightIcon from "@heroicons/react/24/outline/ArrowLongRightIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { FC, Fragment, createElement, useEffect, useState } from "react";

import { BookingInput as BookingInputType, Session } from "../../../../generated-types";
import { sessionToBookingInput } from "../../../../pages/session/session-to-booking-input";
import Button from "../../../button";
import BookingInput from "../../../entity-inputs/booking-input";
import PaymentForm from "./payment-form";

const BookingForm: FC<PropTypes> = ({ session, closeModal }) => {
	const [isPaymentForm, setIsPaymentOpen] = useState(false);

	const [bookingInput, setBookingInput] = useState<BookingInputType>(
		sessionToBookingInput({ studentID: "1" }, session),
	);

	const handleOpenPaymentForm = () => {
		setIsPaymentOpen(true);
	};

	useEffect(
		() => () => {
			setIsPaymentOpen(false);
		},
		[],
	);

	return (
		<Fragment>
			{isPaymentForm ? (
				<PaymentForm />
			) : (
				<BookingInput input={bookingInput} onChange={setBookingInput} />
			)}
			<div className="flex gap-2">
				<Button
					text="Next"
					disabled={isPaymentForm}
					onClick={handleOpenPaymentForm}
					ariaLabel="Book session"
					rightIcon={className => <ArrowLongRightIcon className={className} />}
				/>
				<Button
					transparent
					text="Cancel"
					onClick={closeModal}
					ariaLabel="Cancel booking"
					leftIcon={className => <XMarkIcon className={className} />}
				/>
			</div>
		</Fragment>
	);
};

interface PropTypes {
	session: Session;
	closeModal: () => void;
}

export default BookingForm;
