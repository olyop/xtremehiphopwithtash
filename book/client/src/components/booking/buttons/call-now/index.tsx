import PhoneIcon from "@heroicons/react/24/solid/PhoneIcon";
import { FC, createElement } from "react";

import { Booking } from "../../../../generated-types";
import Button from "../../../button";

const BookingCallNow: FC<Props> = ({ booking }) => (
	<a target="_blank" rel="noreferrer" href={`tel:${booking.student.details.mobilePhoneNumber}`}>
		<Button
			transparent
			text="Mobile"
			className="!h-7 !px-2 !text-xs"
			ariaLabel="Call Mobile Phone Number"
			leftIcon={className => <PhoneIcon className={`!h-4 !w-4 ${className}}`} />}
		/>
	</a>
);

interface Props {
	booking: Booking;
}

export default BookingCallNow;
