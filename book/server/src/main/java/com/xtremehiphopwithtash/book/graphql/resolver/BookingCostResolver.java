package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.graphql.input.BookingInput;
import com.xtremehiphopwithtash.book.service.bookingcost.BookingCost;
import com.xtremehiphopwithtash.book.service.bookingcost.BookingCostService;
import com.xtremehiphopwithtash.book.service.database.coupon.CouponService;
import com.xtremehiphopwithtash.book.service.database.session.Session;
import com.xtremehiphopwithtash.book.service.database.session.SessionService;
import com.xtremehiphopwithtash.book.service.validator.SessionValidator;
import java.util.Optional;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
public class BookingCostResolver {

	private final BookingCostService bookingCostService;
	private final CouponService couponService;
	private final SessionValidator sessionValidator;
	private final SessionService sessionService;

	public BookingCostResolver(
		BookingCostService bookingCostService,
		CouponService couponService,
		SessionValidator sessionValidator,
		SessionService sessionService
	) {
		this.bookingCostService = bookingCostService;
		this.couponService = couponService;
		this.sessionValidator = sessionValidator;
		this.sessionService = sessionService;
	}

	@SchemaMapping
	public boolean isFreeFromCoupon(BookingCost bookingCost) {
		return bookingCost.isFreeFromCoupon();
	}

	@QueryMapping
	public BookingCost getBookingCost(@Argument BookingInput bookingInput) {
		sessionValidator.validateID(bookingInput.sessionID());

		Session session = sessionService.retreiveByID(bookingInput.sessionID());

		Optional<Integer> couponDiscountPercentage = bookingInput.couponCode().isPresent()
			? Optional.of(couponService.getDiscount(bookingInput.couponCode().get()))
			: Optional.empty();

		return bookingCostService.calculate(
			Optional.ofNullable(session.getPrice()),
			Optional.ofNullable(session.getEquipmentFee()),
			bookingInput.bookingQuantity(),
			bookingInput.equipmentQuantity(),
			bookingInput.paymentMethod(),
			bookingInput.couponCode(),
			couponDiscountPercentage
		);
	}
}
