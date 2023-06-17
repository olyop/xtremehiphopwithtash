package com.xtremehiphopwithtash.book.service;

import com.xtremehiphopwithtash.book.other.BookingCost;
import com.xtremehiphopwithtash.book.other.PaymentMethod;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class BookingCostService {

	private final int cardFee;
	private final double cardSurchargePercentage;

	public BookingCostService(
		@Value("${stripe.card.fee}") int cardFee,
		@Value("${stripe.card.surcharge.percentage}") double cardSurchargePercentage
	) {
		this.cardFee = cardFee;
		this.cardSurchargePercentage = cardSurchargePercentage;
	}

	private int handleOptional(Optional<Integer> value) {
		return value.orElse(0);
	}

	private int calculateBookingCost(Optional<Integer> price, int bookingQuantity) {
		return handleOptional(price) * bookingQuantity;
	}

	private int calculateEquipmentHireCost(Optional<Integer> equipmentFee, Optional<Integer> equipmentQuantity) {
		return handleOptional(equipmentFee) * handleOptional(equipmentQuantity);
	}

	private int calculateFullCost(int bookingCost, int equipmentCost) {
		return bookingCost + equipmentCost;
	}

	private int calculateCouponAmountToDiscount(
		Optional<Integer> price,
		Optional<Integer> equipmentFee,
		Optional<Integer> equipmentQuantity
	) {
		boolean shouldDiscountEquipment = equipmentQuantity.isPresent() && equipmentQuantity.get() > 0;

		return shouldDiscountEquipment ? handleOptional(price) + handleOptional(equipmentFee) : handleOptional(price);
	}

	private int calculateCouponDiscount(int couponAmountToDiscount, Optional<Integer> couponDiscountPercentage) {
		double discountRatio = handleOptional(couponDiscountPercentage) / 100.0;
		double discountAmount = couponAmountToDiscount * discountRatio;

		return (int) Math.round(discountAmount);
	}

	private int calculateCost(int fullCost, int couponDiscount) {
		return fullCost - couponDiscount;
	}

	private boolean isFreeFromCoupon(int fullCost, int couponDiscount) {
		return fullCost - couponDiscount == 0;
	}

	private int calculateCardSurcharge(int cost, Optional<PaymentMethod> paymentMethod) {
		if (paymentMethod.isEmpty() || paymentMethod.get().equals(PaymentMethod.CASH)) {
			return 0;
		}

		return (int) Math.round(((cost + cardFee) / (1 - cardSurchargePercentage)) - cost);
	}

	private int calculateCardSurchargeWithoutFee(int cardSurcharge, Optional<PaymentMethod> paymentMethod) {
		if (paymentMethod.isEmpty() || paymentMethod.get().equals(PaymentMethod.CASH)) {
			return 0;
		}

		return cardSurcharge - cardFee;
	}

	private int calculateFinalCost(int cost, int cardSurchargeAmount) {
		return cost + cardSurchargeAmount;
	}

	public BookingCost getBookingCost(
		Optional<Integer> price,
		Optional<Integer> equipmentFee,
		Integer bookingQuantity,
		Optional<Integer> equipmentQuantity,
		Optional<PaymentMethod> paymentMethod,
		Optional<String> couponCode,
		Optional<Integer> couponDiscountPercentage
	) {
		int sessionCost = calculateBookingCost(price, bookingQuantity);
		int equipmentCost = calculateEquipmentHireCost(equipmentFee, equipmentQuantity);
		int fullCost = calculateFullCost(sessionCost, equipmentCost);
		int couponAmountToDiscount = calculateCouponAmountToDiscount(price, equipmentFee, equipmentQuantity);
		int couponDiscount = calculateCouponDiscount(couponAmountToDiscount, couponDiscountPercentage);
		int cost = calculateCost(fullCost, couponDiscount);
		boolean isFreeFromCoupon = isFreeFromCoupon(fullCost, couponDiscount);
		int cardSurcharge = calculateCardSurcharge(cost, paymentMethod);
		int cardSurchargeWithoutFee = calculateCardSurchargeWithoutFee(cardSurcharge, paymentMethod);
		int finalCost = calculateFinalCost(cost, cardSurcharge);

		BookingCost bc = new BookingCost();
		bc.setSessionCost(sessionCost);
		bc.setEquipmentCost(equipmentCost);
		bc.setBookingCost(fullCost);
		bc.setCouponDiscountPercentage(couponDiscountPercentage.orElse(0));
		bc.setCouponAmountToDiscount(couponAmountToDiscount);
		bc.setCouponDiscount(couponDiscount);
		bc.setCost(cost);
		bc.setFreeFromCoupon(isFreeFromCoupon);
		bc.setCardFee(cardFee);
		bc.setCardSurcharge(cardSurcharge);
		bc.setCardSurchargeRatio(cardSurchargePercentage);
		bc.setCardSurchargeWithoutFee(cardSurchargeWithoutFee);
		bc.setFinalCost(finalCost);

		return bc;
	}
}
