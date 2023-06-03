package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.other.BookingCost;
import com.xtremehiphopwithtash.book.other.PaymentMethod;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.BookingCostService;
import com.xtremehiphopwithtash.book.service.BookingService;
import com.xtremehiphopwithtash.book.service.SessionService;
import com.xtremehiphopwithtash.book.service.StripeService;
import com.xtremehiphopwithtash.book.service.StudentService;
import com.xtremehiphopwithtash.book.service.validator.SessionValidator;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
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
	private final BookingCostService bookingCostService;
	private final Auth0JwtService auth0JwtService;
	private final StripeService stripeService;
	private final SessionValidator sessionValidator;

	public BookingResolver(
		StudentService studentService,
		BookingService bookingService,
		SessionService sessionService,
		BookingCostService bookingCostService,
		Auth0JwtService auth0JwtService,
		StripeService stripeService,
		SessionValidator sessionValidator
	) {
		this.studentService = studentService;
		this.bookingService = bookingService;
		this.sessionService = sessionService;
		this.bookingCostService = bookingCostService;
		this.auth0JwtService = auth0JwtService;
		this.stripeService = stripeService;
		this.sessionValidator = sessionValidator;
	}

	@QueryMapping
	public List<Booking> getBookings(@AuthenticationPrincipal Jwt jwt) {
		auth0JwtService.validateAdministrator(jwt);

		return bookingService.retreiveAll();
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
	public Booking createBooking(
		@Argument BookingInput input,
		Principal principal,
		@AuthenticationPrincipal Jwt jwt
	) {
		auth0JwtService.validateAdministrator(jwt);
		String studentID = auth0JwtService.extractStudentID(principal);

		return bookingService.createBooking(input, studentID);
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

	@QueryMapping
	public BookingCost getBookingCost(@Argument UUID sessionID, @Argument BookingInput bookingInput) {
		sessionValidator.validateID(sessionID);

		short bookingQuantity = bookingInput.bookingQuantity();
		Optional<Short> equipmentQuantity = bookingInput.equipmentQuantity();
		Optional<String> coupon = bookingInput.couponCode();
		Optional<PaymentMethod> paymentMethod = bookingInput.paymentMethod();

		Session session = sessionService.retreiveByID(sessionID);
		Optional<Short> price = Optional.ofNullable(session.getPrice());
		Optional<Short> equipmentFee = Optional.ofNullable(session.getEquipmentFee());

		return bookingCostService.getBookingCost(
			price,
			equipmentFee,
			bookingQuantity,
			equipmentQuantity,
			paymentMethod,
			coupon
		);
	}

	@QueryMapping
	public String getStripeCheckoutURL() {
		return "";
		// return stripeService.createSessionURL();
	}
}
