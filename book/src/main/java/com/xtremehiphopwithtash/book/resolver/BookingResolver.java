package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.dao.BookingDAO;
import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.resolver.validator.BookingValidator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class BookingResolver {

	private final BookingDAO bookingDAO;
	private final BookingValidator bookingValidator;

	public BookingResolver(BookingDAO bookingDAO, BookingValidator bookingValidator) {
		this.bookingDAO = bookingDAO;
		this.bookingValidator = bookingValidator;
	}

	@QueryMapping
	public List<Booking> getBookings() {
		return bookingDAO.select();
	}

	@QueryMapping
	public Optional<Booking> getBookingByID(UUID bookingID) {
		return bookingDAO.selectByID(bookingID);
	}

	@MutationMapping
	public Booking createBooking(@Argument BookingInput input) {
		String notes = input.getNotes();
		Boolean isBringingOwnEquipment = input.isBringingOwnEquipment();
		UUID sessionID = input.getSessionID();
		String studentID = input.getStudentID();

		bookingValidator.validateInput(input);

		Booking booking = new Booking();
		booking.setNotes(notes);
		booking.setIsBringingOwnEquipment(isBringingOwnEquipment);
		booking.setSessionID(sessionID);
		booking.setStudentID(studentID);

		return bookingDAO.insert(booking);
	}
}
