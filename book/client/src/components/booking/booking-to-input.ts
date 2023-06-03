import { Booking, BookingInput } from "../../generated-types";

export const bookingToInput = ({
	notes,
	session,
	bookingQuantity,
	equipmentQuantity,
	paymentMethod,
}: Booking): BookingInput => ({
	notes,
	sessionID: session.sessionID,
	bookingQuantity,
	equipmentQuantity,
	paymentMethod,
	couponCode: "",
});
