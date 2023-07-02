package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Details;
import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.other.BookingCost;
import com.xtremehiphopwithtash.book.other.CreatePaymentIntentResponse;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.BookingCostService;
import com.xtremehiphopwithtash.book.service.BookingService;
import com.xtremehiphopwithtash.book.service.CouponService;
import com.xtremehiphopwithtash.book.service.DetailsService;
import com.xtremehiphopwithtash.book.service.ReCaptchaService;
import com.xtremehiphopwithtash.book.service.SessionService;
import com.xtremehiphopwithtash.book.service.StripeService;
import com.xtremehiphopwithtash.book.service.StudentService;
import java.security.Principal;
import java.util.Optional;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@Controller
public class StripeResolver {

	private final StudentService studentService;
	private final DetailsService detailsService;
	private final SessionService sessionService;
	private final Auth0JwtService auth0JwtService;
	private final StripeService stripeService;
	private final ReCaptchaService reCaptchaService;
	private final BookingService bookingService;
	private final BookingCostService bookingCostService;
	private final CouponService couponService;

	public StripeResolver(
		StudentService studentService,
		DetailsService detailsService,
		SessionService sessionService,
		Auth0JwtService auth0JwtService,
		StripeService stripeService,
		ReCaptchaService reCaptchaService,
		BookingService bookingService,
		BookingCostService bookingCostService,
		CouponService couponService
	) {
		this.studentService = studentService;
		this.detailsService = detailsService;
		this.sessionService = sessionService;
		this.auth0JwtService = auth0JwtService;
		this.stripeService = stripeService;
		this.reCaptchaService = reCaptchaService;
		this.bookingService = bookingService;
		this.bookingCostService = bookingCostService;
		this.couponService = couponService;
	}

	@MutationMapping
	public CreatePaymentIntentResponse createPaymentIntent(
		@Argument BookingInput input,
		@Argument String reCaptcha,
		Principal principal
	) {
		String studentID = auth0JwtService.extractStudentID(principal);

		reCaptchaService.validateResponse(reCaptcha);
		bookingService.validateCreate(input, studentID);

		Student student = studentService.retreiveByID(studentID);
		Details details = detailsService.retreiveByID(student.getDetailsID());

		Session session = sessionService.retreiveByID(input.sessionID());

		Optional<Integer> couponDiscountPercentage = input.couponCode().isPresent()
			? Optional.of(couponService.getDiscount(input.couponCode().get()))
			: Optional.empty();

		BookingCost bookingCost = bookingCostService.calculate(
			Optional.ofNullable(session.getPrice()),
			Optional.ofNullable(session.getEquipmentFee()),
			input.bookingQuantity(),
			input.equipmentQuantity(),
			input.paymentMethod(),
			input.couponCode(),
			couponDiscountPercentage
		);

		return stripeService.createPaymentIntent(
			input,
			studentID,
			details.getEmailAddress(),
			student.getStripeCustomerID(),
			sessionService.createBookingDescription(input.sessionID()),
			bookingCost.getFinalCost()
		);
	}
}
