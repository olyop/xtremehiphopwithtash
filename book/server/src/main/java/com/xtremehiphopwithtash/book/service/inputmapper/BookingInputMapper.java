package com.xtremehiphopwithtash.book.service.inputmapper;

import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import org.springframework.stereotype.Component;

@Component
public class BookingInputMapper implements InputMapper<BookingInput, Booking> {

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
