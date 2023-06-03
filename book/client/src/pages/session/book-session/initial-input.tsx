import { BookingInput, Session } from "../../../generated-types";

export const initialInput = ({ sessionID, price }: Session): BookingInput => ({
	notes: null,
	bookingQuantity: 1,
	equipmentQuantity: price === null ? 1 : null,
	paymentMethod: null,
	couponCode: null,
	sessionID,
});
