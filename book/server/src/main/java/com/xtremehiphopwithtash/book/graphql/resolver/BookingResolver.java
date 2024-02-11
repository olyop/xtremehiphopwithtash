package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.graphql.input.BookingInput;
import com.xtremehiphopwithtash.book.service.database.booking.Booking;
import com.xtremehiphopwithtash.book.service.database.booking.BookingService;
import com.xtremehiphopwithtash.book.service.database.session.Session;
import com.xtremehiphopwithtash.book.service.database.session.SessionService;
import com.xtremehiphopwithtash.book.service.database.student.Student;
import com.xtremehiphopwithtash.book.service.database.student.StudentService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.integration.recaptcha.ReCaptchaService;
import com.xtremehiphopwithtash.book.service.integration.resolvers.RemoteAddressService;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeService;
import com.xtremehiphopwithtash.book.service.validator.ResolverException;
import graphql.GraphQLContext;
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
	private final RemoteAddressService remoteAddressService;

	public BookingResolver(
		StripeService stripeService,
		StudentService studentService,
		BookingService bookingService,
		SessionService sessionService,
		Auth0JwtService auth0JwtService,
		ReCaptchaService reCaptchaService,
		RemoteAddressService remoteAddressService
	) {
		this.stripeService = stripeService;
		this.studentService = studentService;
		this.bookingService = bookingService;
		this.sessionService = sessionService;
		this.auth0JwtService = auth0JwtService;
		this.reCaptchaService = reCaptchaService;
		this.remoteAddressService = remoteAddressService;
	}

	@QueryMapping
	public Booking getBookingByID(@Argument UUID bookingID) {
		return bookingService.retreiveByID(bookingID);
	}

	@QueryMapping
	public Integer getBookingsTotal(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		int bookingTotal = bookingService.retreiveTotal();

		return bookingTotal == 0 ? null : bookingTotal;
	}

	@QueryMapping
	public Integer getGrossTotal(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		int grossRevenueTotal = bookingService.retreiveGrossTotal();

		return grossRevenueTotal == 0 ? null : grossRevenueTotal;
	}

	@SchemaMapping(typeName = "Booking", field = "session")
	public Session getSession(Booking booking) {
		return sessionService.retreiveByID(booking.getSessionID());
	}

	@SchemaMapping(typeName = "Booking", field = "student")
	public Student getStudent(Booking booking) {
		return studentService.retreiveByID(booking.getStudentID());
	}

	@SchemaMapping(typeName = "Query", field = "existsBookingByID")
	public boolean existsBookingByID(@Argument UUID bookingID) {
		return bookingService.existsByID(bookingID);
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
		@Argument String reCaptchaToken,
		@AuthenticationPrincipal Jwt jwt,
		GraphQLContext graphQlContext,
		Principal principal
	) {
		String remoteAddress = remoteAddressService.getRemoteAddress(graphQlContext);

		reCaptchaService.validate(reCaptchaToken, remoteAddress);

		String studentID = auth0JwtService.extractStudentID(principal);
		boolean isAdministrator = auth0JwtService.isAdministrator(jwt);

		return bookingService.create(input, null, studentID, null, isAdministrator);
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
		GraphQLContext graphQlContext,
		Principal principal
	) {
		String remoteAddress = remoteAddressService.getRemoteAddress(graphQlContext);

		reCaptchaService.validate(reCaptcha, remoteAddress);

		String studentID = auth0JwtService.extractStudentID(principal);
		boolean isAdministrator = auth0JwtService.isAdministrator(jwt);

		bookingService.cancelByID(bookingID, studentID, reCaptcha, isAdministrator);

		return bookingID;
	}

	@MutationMapping
	public UUID confirmBooking(@Argument UUID bookingID, @AuthenticationPrincipal Jwt jwt, Principal principal) {
		String studentID = auth0JwtService.extractStudentID(principal);

		Booking booking = bookingService.retreiveByID(bookingID);

		bookingService.validateBookingIsStudents(studentID, booking);

		bookingService.confirm(bookingID);

		return bookingID;
	}

	@MutationMapping
	public UUID checkInBooking(@Argument UUID bookingID, @Argument boolean value, @AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		bookingService.checkIn(bookingID, value);

		return bookingID;
	}
}
