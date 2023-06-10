package com.xtremehiphopwithtash.book.service;

import com.xtremehiphopwithtash.book.other.BookingCost;
import com.xtremehiphopwithtash.book.other.PaymentMethod;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class BookingCostService {

	private int handleNull(Optional<Integer> value) {
		return value.orElse(0);
	}

	private int calculateBookingCost(Optional<Integer> price, int bookingQuantity) {
		return price.orElse(0) * bookingQuantity;
	}

	private int calculateEquipmentHireCost(
		Optional<Integer> equipmentFee,
		Optional<Integer> equipmentQuantity
	) {
		return equipmentFee.orElse(0) * handleNull(equipmentQuantity);
	}

	private int calculateFullCost(int bookingCost, int equipmentCost) {
		return bookingCost + equipmentCost;
	}

	private int calculateCouponDiscount(
		Optional<Integer> price,
		Optional<Integer> equipmentFee,
		Optional<Integer> equipmentQuantity,
		Optional<Integer> couponDiscountPercentage
	) {
		boolean shouldDiscountEquipment = equipmentQuantity.isPresent() && equipmentQuantity.get() > 0;

		int amountToDiscount = shouldDiscountEquipment
			? price.orElse(0) + equipmentFee.orElse(0)
			: price.orElse(0);

		double discountRatio = couponDiscountPercentage.orElse(0) / 100;
		double discountAmount = amountToDiscount * discountRatio;
		double discountNegative = discountAmount * -1;

		return (int) discountNegative;
	}

	private boolean isFreeFromCoupon(int fullCost, int couponDiscount) {
		return fullCost + couponDiscount == 0;
	}

	private int calculateFinalCost(int fullCost, int couponDiscount) {
		return fullCost + couponDiscount;
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
		int bookingCost = calculateBookingCost(price, bookingQuantity);
		int equipmentCost = calculateEquipmentHireCost(equipmentFee, equipmentQuantity);
		int fullCost = calculateFullCost(bookingCost, equipmentCost);

		int couponDiscount = calculateCouponDiscount(
			price,
			equipmentFee,
			equipmentQuantity,
			couponDiscountPercentage
		);

		boolean isFreeFromCoupon = isFreeFromCoupon(fullCost, couponDiscount);

		int finalCost = calculateFinalCost(fullCost, couponDiscount);

		BookingCost bc = new BookingCost();
		bc.setBookingCost(bookingCost);
		bc.setEquipmentCost(equipmentCost);
		bc.setFullCost(fullCost);
		bc.setCouponDiscountPercentage(couponDiscountPercentage.orElse(0));
		bc.setCouponDiscount(couponDiscount);
		bc.setFinalCost(finalCost);
		bc.setFreeFromCoupon(isFreeFromCoupon);

		return bc;
	}
}
