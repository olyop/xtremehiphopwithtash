package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.other.BookingCost;
import com.xtremehiphopwithtash.book.other.PaymentMethod;
import com.xtremehiphopwithtash.book.resolver.input.BookingInput;
import com.xtremehiphopwithtash.book.service.BookingCostService;
import com.xtremehiphopwithtash.book.service.CouponService;
import com.xtremehiphopwithtash.book.service.SessionService;
import com.xtremehiphopwithtash.book.service.validator.SessionValidator;
import com.xtremehiphopwithtash.book.util.CurrencyUtil;
import java.util.Optional;
import java.util.UUID;
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
	private final CurrencyUtil currencyUtil;

	public BookingCostResolver(
		BookingCostService bookingCostService,
		CouponService couponService,
		SessionValidator sessionValidator,
		SessionService sessionService,
		CurrencyUtil currencyUtil
	) {
		this.bookingCostService = bookingCostService;
		this.couponService = couponService;
		this.sessionValidator = sessionValidator;
		this.sessionService = sessionService;
		this.currencyUtil = currencyUtil;
	}

	@QueryMapping
	public BookingCost getBookingCost(@Argument BookingInput bookingInput) {
		sessionValidator.validateID(bookingInput.sessionID());

		int bookingQuantity = bookingInput.bookingQuantity();
		Optional<Integer> equipmentQuantity = bookingInput.equipmentQuantity();
		Optional<PaymentMethod> paymentMethod = bookingInput.paymentMethod();

		Session session = sessionService.retreiveByID(bookingInput.sessionID());

		Optional<Integer> price = Optional.ofNullable(session.getPrice());
		Optional<Integer> equipmentFee = Optional.ofNullable(session.getEquipmentFee());

		Optional<String> coupon = bookingInput.couponCode();
		Optional<Integer> couponDiscountPercentage = coupon.isPresent()
			? Optional.of(couponService.getDiscount(coupon.get()))
			: Optional.empty();

		return bookingCostService.getBookingCost(
			price,
			equipmentFee,
			bookingQuantity,
			equipmentQuantity,
			paymentMethod,
			coupon,
			couponDiscountPercentage
		);
	}

	@SchemaMapping(typeName = "BookingCost", field = "bookingCost")
	public int getBookingCost(BookingCost bookingCost) {
		return currencyUtil.centsToDollars(bookingCost.getBookingCost());
	}

	@SchemaMapping(typeName = "BookingCost", field = "equipmentCost")
	public int getEquipmentCost(BookingCost bookingCost) {
		return currencyUtil.centsToDollars(bookingCost.getEquipmentCost());
	}

	@SchemaMapping(typeName = "BookingCost", field = "fullCost")
	public int getFullCost(BookingCost bookingCost) {
		return currencyUtil.centsToDollars(bookingCost.getFullCost());
	}

	@SchemaMapping(typeName = "BookingCost", field = "couponDiscount")
	public int getCouponDiscount(BookingCost bookingCost) {
		return currencyUtil.centsToDollars(bookingCost.getCouponDiscount());
	}

	@SchemaMapping(typeName = "BookingCost", field = "finalCost")
	public int getFinalCost(BookingCost bookingCost) {
		return currencyUtil.centsToDollars(bookingCost.getFinalCost());
	}
}
