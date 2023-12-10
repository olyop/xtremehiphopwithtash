package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.graphql.input.BookingInput;
import com.xtremehiphopwithtash.book.other.CreatePaymentIntentResponse;
import com.xtremehiphopwithtash.book.service.bookingcost.BookingCost;
import com.xtremehiphopwithtash.book.service.bookingcost.BookingCostService;
import com.xtremehiphopwithtash.book.service.database.booking.BookingService;
import com.xtremehiphopwithtash.book.service.database.coupon.CouponService;
import com.xtremehiphopwithtash.book.service.database.details.Details;
import com.xtremehiphopwithtash.book.service.database.details.DetailsService;
import com.xtremehiphopwithtash.book.service.database.session.Session;
import com.xtremehiphopwithtash.book.service.database.session.SessionService;
import com.xtremehiphopwithtash.book.service.database.student.Student;
import com.xtremehiphopwithtash.book.service.database.student.StudentService;
import com.xtremehiphopwithtash.book.service.integration.auth0.Auth0JwtService;
import com.xtremehiphopwithtash.book.service.integration.recaptcha.ReCaptchaService;
import com.xtremehiphopwithtash.book.service.integration.resolvers.RemoteAddressService;
import com.xtremehiphopwithtash.book.service.integration.stripe.StripeService;
import graphql.GraphQLContext;
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
	private final RemoteAddressService remoteAddressService;
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
		RemoteAddressService remoteAddressService,
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
		this.remoteAddressService = remoteAddressService;
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
		GraphQLContext graphQlContext,
		Principal principal
	) {
		String studentID = auth0JwtService.extractStudentID(principal);
		String remoteAddress = remoteAddressService.getRemoteAddress(graphQlContext);

		reCaptchaService.validateResponse(reCaptcha, remoteAddress);
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

		return stripeService
			.paymentIntent()
			.create(
				input,
				studentID,
				details.getEmailAddress(),
				student.getStripeCustomerID(),
				sessionService.createBookingDescription(input.sessionID()),
				bookingCost.getFinalCost()
			);
	}
}
