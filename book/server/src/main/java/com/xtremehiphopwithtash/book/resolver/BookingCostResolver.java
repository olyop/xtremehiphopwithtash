package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.other.BookingCost;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.BookingCostService;
import com.xtremehiphopwithtash.book.service.CouponService;
import com.xtremehiphopwithtash.book.service.SessionService;
import com.xtremehiphopwithtash.book.service.validator.SessionValidator;
import java.util.Optional;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
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
