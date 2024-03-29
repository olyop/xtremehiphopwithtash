package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.service.database.booking.BookingService;
import com.xtremehiphopwithtash.book.service.database.student.StudentService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0JwtService;
import java.security.Principal;
import java.time.Instant;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class PopupResolver {

	private final StudentService studentService;
	private final BookingService bookingService;
	private final Auth0JwtService auth0JwtService;

	private final int MINIMUM_NUMBER_OF_BOOKINGS;
	private final int MINIMUM_SECONDS_SINCE_LAST_BOOKING;

	public PopupResolver(
		@Value("${popup.install.minimum-number-of-bookings}") int minimumNumberOfBookings,
		@Value("${popup.install.minimum-hours-since-last-booking}") int minimumHoursSinceLastBooking,
		StudentService studentService,
		BookingService bookingService,
		Auth0JwtService auth0JwtService
	) {
		this.studentService = studentService;
		this.bookingService = bookingService;
		this.auth0JwtService = auth0JwtService;

		this.MINIMUM_NUMBER_OF_BOOKINGS = minimumNumberOfBookings;
		this.MINIMUM_SECONDS_SINCE_LAST_BOOKING = minimumHoursSinceLastBooking * 60 * 60;
	}

	@QueryMapping
	public boolean shouldShowInstallPopup(Principal principal) {
		String studentID = auth0JwtService.extractStudentID(principal);

		boolean studentExists = studentService.existsByID(studentID);

		if (!studentExists) {
			return false;
		}

		boolean hasViewedInstallPopup = studentService.retreiveHasViewedInstallPopup(studentID);

		if (hasViewedInstallPopup) {
			return false;
		}

		int numberOfBookings = bookingService.retreiveStudentTotal(studentID);

		if (numberOfBookings < MINIMUM_NUMBER_OF_BOOKINGS) {
			return false;
		}

		Instant now = Instant.now();
		Instant dateOfLastBooking = bookingService.retreiveStudentLastBookingDate(studentID);
		Instant dateOfLastBookingPlusMinimum = dateOfLastBooking.plusSeconds(MINIMUM_SECONDS_SINCE_LAST_BOOKING);

		if (dateOfLastBookingPlusMinimum.isBefore(now)) {
			return false;
		}

		return true;
	}

	@MutationMapping
	public boolean viewInstallPopup(Principal principal) {
		String studentID = auth0JwtService.extractStudentID(principal);

		return studentService.updateHasViewedInstallPopup(studentID);
	}
}
