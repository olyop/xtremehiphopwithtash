import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import { FC, createElement } from "react";

import { Booking } from "../../../../generated-types";
import Button from "../../../button";

const BookingStripe: FC<Props> = ({ booking }) => (
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
);

interface Props {
	booking: Booking;
}

export default BookingStripe;
