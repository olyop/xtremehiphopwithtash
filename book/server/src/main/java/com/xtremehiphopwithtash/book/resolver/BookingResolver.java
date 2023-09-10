package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.graphql.input.BookingInput;
import com.xtremehiphopwithtash.book.service.auth0jwt.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.database.booking.Booking;
import com.xtremehiphopwithtash.book.service.database.booking.BookingService;
import com.xtremehiphopwithtash.book.service.database.session.Session;
import com.xtremehiphopwithtash.book.service.database.session.SessionService;
import com.xtremehiphopwithtash.book.service.database.student.Student;
import com.xtremehiphopwithtash.book.service.database.student.StudentService;
import com.xtremehiphopwithtash.book.service.recaptcha.ReCaptchaService;
import com.xtremehiphopwithtash.book.service.stripe.StripeService;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import java.net.URL;
import java.security.Principal;
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

	private final StripeService stripeService;
	private final StudentService studentService;
	private final BookingService bookingService;
	private final SessionService sessionService;
	private final Auth0JwtService auth0JwtService;
	private final ReCaptchaService reCaptchaService;

	public BookingResolver(
		StripeService stripeService,
		StudentService studentService,
		BookingService bookingService,
		SessionService sessionService,
		Auth0JwtService auth0JwtService,
		ReCaptchaService reCaptchaService
	) {
		this.stripeService = stripeService;
		this.studentService = studentService;
		this.bookingService = bookingService;
		this.sessionService = sessionService;
		this.auth0JwtService = auth0JwtService;
		this.reCaptchaService = reCaptchaService;
	}

	@QueryMapping
	public Booking getBookingByID(UUID bookingID) {
		return bookingService.retreiveByID(bookingID);
	}

	@QueryMapping
	public Integer getBookingsTotal(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		int bookingTotal = bookingService.retreiveTotal();

		return bookingTotal == 0 ? null : bookingTotal;
	}

	@SchemaMapping(typeName = "Booking", field = "session")
	public Session getSession(Booking booking) {
		return sessionService.retreiveByID(booking.getSessionID());
	}

	@SchemaMapping(typeName = "Booking", field = "student")
	public Student getStudent(Booking booking) {
		return studentService.retreiveByID(booking.getStudentID());
	}

	@SchemaMapping(typeName = "Query", field = "getBookingReceiptURL")
	public URL getReceiptURL(Principal principal, @Argument UUID bookingID) {
		String studentID = auth0JwtService.extractStudentID(principal);

		Booking booking = bookingService.retreiveByID(bookingID);

		bookingService.validateBookingIsStudents(studentID, booking);

		if (booking.getPaymentIntentID() == null) {
			throw new ResolverException("Booking was not paid with CARD.");
		}

		return stripeService.paymentIntent().retrieveChargeReceiptURL(booking.getPaymentIntentID());
	}

	@MutationMapping
	public Booking createBooking(
		@Argument BookingInput input,
		@Argument String reCaptcha,
		Principal principal,
		@AuthenticationPrincipal Jwt jwt
	) {
		reCaptchaService.validateResponse(reCaptcha);

		String studentID = auth0JwtService.extractStudentID(principal);
		boolean isAdministrator = auth0JwtService.isAdministrator(jwt);

		return bookingService.create(input, studentID, null, isAdministrator);
	}

	@MutationMapping
	public Booking updateBookingByID(
		@Argument UUID bookingID,
		@Argument BookingInput input,
		@AuthenticationPrincipal Jwt jwt
	) {
		auth0JwtService.validateAdministrator(jwt);

		return bookingService.update(bookingID, input);
	}

	@MutationMapping
	public UUID cancelBookingByID(
		@Argument UUID bookingID,
		@Argument String reCaptcha,
		@AuthenticationPrincipal Jwt jwt,
		Principal principal
	) {
		reCaptchaService.validateResponse(reCaptcha);

		String studentID = auth0JwtService.extractStudentID(principal);
		boolean isAdministrator = auth0JwtService.isAdministrator(jwt);

		bookingService.cancelByID(bookingID, studentID, reCaptcha, isAdministrator);

		return bookingID;
	}

	@MutationMapping
	public UUID checkInBooking(@Argument UUID bookingID, @Argument boolean value, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		bookingService.checkIn(bookingID, value);

		return bookingID;
	}
}
