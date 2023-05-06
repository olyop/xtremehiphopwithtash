package com.xtremehiphopwithtash.book.resolver.mapper;

import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.resolver.transform.CommonTransform;
import org.springframework.stereotype.Component;

@Component
public class BookingInputMapper implements InputMapper<BookingInput, Booking> {

	@Override
	public Booking map(BookingInput input) {
		Booking booking = new Booking();

		booking.setSessionID(input.sessionID());
		booking.setNotes(CommonTransform.transformText(input.notes()));
		booking.setIsBringingOwnEquipment(input.isBringingOwnEquipment());

		return booking;
	}
}
