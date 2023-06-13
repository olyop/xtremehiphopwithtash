package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.other.CreatePaymentIntentResponse;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.BookingService;
import com.xtremehiphopwithtash.book.service.DetailsService;
import com.xtremehiphopwithtash.book.service.LocationService;
import com.xtremehiphopwithtash.book.service.SessionService;
import com.xtremehiphopwithtash.book.service.StripeService;
import com.xtremehiphopwithtash.book.service.StudentService;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.UUID;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Controller;

@Controller
public class BookingResolver {

	private final StudentService studentService;
	private final DetailsService detailsService;
	private final BookingService bookingService;
	private final SessionService sessionService;
	private final LocationService locationService;
	private final Auth0JwtService auth0JwtService;
	private final StripeService stripeService;

	public BookingResolver(
		StudentService studentService,
		DetailsService detailsService,
		BookingService bookingService,
		SessionService sessionService,
		LocationService locationService,
		Auth0JwtService auth0JwtService,
		StripeService stripeService
	) {
		this.studentService = studentService;
		this.detailsService = detailsService;
		this.bookingService = bookingService;
		this.sessionService = sessionService;
		this.locationService = locationService;
		this.auth0JwtService = auth0JwtService;
		this.stripeService = stripeService;
	}

	@QueryMapping
	public Booking getBookingByID(UUID bookingID) {
		return bookingService.retreiveByID(bookingID);
	}

	@MutationMapping
	public UUID deleteBookingByID(@Argument UUID bookingID, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return bookingService.deleteByID(bookingID);
	}

	@SchemaMapping(typeName = "Booking", field = "session")
	public Session getSession(Booking booking) {
		return sessionService.retreiveByID(booking.getSessionID());
	}

	@SchemaMapping(typeName = "Booking", field = "student")
	public Student getStudent(Booking booking) {
		return studentService.retreiveByID(booking.getStudentID());
	}

	@MutationMapping
	public Booking createBooking(@Argument BookingInput input, Principal principal, @AuthenticationPrincipal Jwt jwt) {
		String studentID = auth0JwtService.extractStudentID(principal);

		return bookingService.createBooking(input, studentID, null);
	}

	@MutationMapping
	public Booking updateBookingByID(
		@Argument UUID bookingID,
		@Argument BookingInput input,
		@AuthenticationPrincipal Jwt jwt
	) {
		auth0JwtService.validateAdministrator(jwt);

		return bookingService.updateBooking(bookingID, input);
	}

	@MutationMapping
	public CreatePaymentIntentResponse createPaymentIntent(@Argument BookingInput input, Principal principal) {
		String studentID = auth0JwtService.extractStudentID(principal);

		Student student = studentService.retreiveByID(studentID);
		Details details = detailsService.retreiveByID(student.getDetailsID());

		Session session = sessionService.retreiveByID(input.sessionID());
		Location location = locationService.retreiveByID(session.getLocationID());

		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		dateFormat.setTimeZone(TimeZone.getTimeZone("Australia/Sydney"));
		String date = dateFormat.format(new Date(session.getStartTime().toEpochMilli()));

		String bookingDescription = String.format(
			"Xtreme Hip-Hop with Tash: Session '%s' at %s on %s",
			session.getTitle(),
			location.getName(),
			date
		);

		return stripeService.createPaymentIntent(
			input,
			studentID,
			details.getEmailAddress(),
			student.getStripeCustomerID(),
			bookingDescription
		);
	}

	@MutationMapping
	public UUID checkInBooking(@Argument UUID bookingID, @Argument boolean value, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		bookingService.checkIn(bookingID, value);

		return bookingID;
	}
}
