package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.BookingService;
import com.xtremehiphopwithtash.book.service.ReCaptchaService;
import com.xtremehiphopwithtash.book.service.SessionService;
import com.xtremehiphopwithtash.book.service.StudentService;
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

	private final StudentService studentService;
	private final BookingService bookingService;
	private final SessionService sessionService;
	private final Auth0JwtService auth0JwtService;
	private final ReCaptchaService reCaptchaService;

	public BookingResolver(
		StudentService studentService,
		BookingService bookingService,
		SessionService sessionService,
		Auth0JwtService auth0JwtService,
		ReCaptchaService reCaptchaService
	) {
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

	@SchemaMapping(typeName = "Booking", field = "session")
	public Session getSession(Booking booking) {
		return sessionService.retreiveByID(booking.getSessionID());
	}

	@SchemaMapping(typeName = "Booking", field = "student")
	public Student getStudent(Booking booking) {
		return studentService.retreiveByID(booking.getStudentID());
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

		return bookingService.create(input, studentID);
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
