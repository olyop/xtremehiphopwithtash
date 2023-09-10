package com.xtremehiphopwithtash.book.service.database.booking;

import com.xtremehiphopwithtash.book.graphql.input.BookingInput;
import com.xtremehiphopwithtash.book.service.helpers.CommonTransform;
import com.xtremehiphopwithtash.book.service.helpers.InputMapper;
import org.springframework.stereotype.Component;

@Component
class BookingInputMapper implements InputMapper<BookingInput, Booking> {

	@Override
	public Booking map(BookingInput input) {
		Booking booking = new Booking();

		booking.setNotes(CommonTransform.transformText(input.notes()));
		booking.setSessionID(input.sessionID());
		booking.setBookingQuantity(input.bookingQuantity());
		booking.setEquipmentQuantity(input.equipmentQuantity().orElse(null));
		booking.setPaymentMethod(input.paymentMethod().orElse(null));

		return booking;
	}
}
