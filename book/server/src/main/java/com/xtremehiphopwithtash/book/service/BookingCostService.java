package com.xtremehiphopwithtash.book.service;

import com.xtremehiphopwithtash.book.other.BookingCost;
import com.xtremehiphopwithtash.book.other.PaymentMethod;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;
import org.springframework.stereotype.Component;

@Component
public class BookingCostService {

	private final double surcharge = 0.0175;
	private final double transactionFee = 30;

	private final CouponService couponService;

	private BookingCostService(CouponService couponService) {
		this.couponService = couponService;
	}

	private double round(double value) {
		BigDecimal bd = BigDecimal.valueOf(value);
		bd = bd.setScale(2, RoundingMode.HALF_UP);
		return bd.doubleValue();
	}

	private int handleNull(Optional<Short> value) {
		return value.orElse((short) 0);
	}

	private int dollarsToCents(Optional<Short> price) {
		return handleNull(price) * 100;
	}

	private int calculateBookingCost(Optional<Short> price, short bookingQuantity) {
		return dollarsToCents(price) * bookingQuantity;
	}

	private int calculateEquipmentHireCost(
		Optional<Short> equipmentFee,
		Optional<Short> equipmentQuantity
	) {
		return dollarsToCents(equipmentFee) * handleNull(equipmentQuantity);
	}

	private int calculateFullCost(int bookingCost, int equipmentCost) {
		return bookingCost + equipmentCost;
	}

	private int getCouponDiscountPercentage(Optional<String> coupon) {
		return coupon.isPresent() ? couponService.getDiscount(coupon.get()) : 0;
	}

	private double calculateCouponDiscount(
		int couponDiscountPercentage,
		Optional<Short> price,
		Optional<Short> equipmentFee,
		Optional<Short> equipmentQuantity
	) {
		boolean shouldDiscountEquipment = equipmentQuantity.isPresent() && equipmentQuantity.get() > 0;

		int amountToDiscount = shouldDiscountEquipment
			? dollarsToCents(price) + dollarsToCents(equipmentFee)
			: (price.orElse((short) 0) * 100);

		double discountRatio = couponDiscountPercentage / 100.0;
		double discountAmount = amountToDiscount * discountRatio;
		double discountNegative = discountAmount * -1;

		return discountNegative;
	}

	private boolean isFreeFromCoupon(int fullCost, double couponDiscount) {
		return (double) fullCost + couponDiscount == 0;
	}

	private double calculateFinalCost(int fullCost, double couponDiscount) {
		return (double) fullCost + couponDiscount;
	}

	private double calculateFullSurcharge(double finalCost, Optional<PaymentMethod> paymentMethod) {
		if (paymentMethod.isEmpty()) {
			return 0;
		}

		if (paymentMethod.get() == PaymentMethod.CASH) {
			return 0;
		}

		if (finalCost == 0) {
			return 0;
		}

		return round(finalCost * surcharge + transactionFee);
	}

	private double calculateEstimatedCost(double finalCost, double fullSurcharge) {
		return round(finalCost + fullSurcharge);
	}

	public BookingCost getBookingCost(
		Optional<Short> price,
		Optional<Short> equipmentFee,
		Short bookingQuantity,
		Optional<Short> equipmentQuantity,
		Optional<PaymentMethod> paymentMethod,
		Optional<String> coupon
	) {
		int bookingCost = calculateBookingCost(price, bookingQuantity);
		int equipmentCost = calculateEquipmentHireCost(equipmentFee, equipmentQuantity);
		int fullCost = calculateFullCost(bookingCost, equipmentCost);
		int couponDiscountPercentage = getCouponDiscountPercentage(coupon);
		double couponDiscount = calculateCouponDiscount(
			couponDiscountPercentage,
			price,
			equipmentFee,
			equipmentQuantity
		);
		boolean isFreeFromCoupon = isFreeFromCoupon(fullCost, couponDiscount);
		double finalCost = calculateFinalCost(fullCost, couponDiscount);
		double fullSurcharge = calculateFullSurcharge(finalCost, paymentMethod);
		double estimatedCost = calculateEstimatedCost(finalCost, fullSurcharge);

		BookingCost bc = new BookingCost();
		bc.setBookingCost(bookingCost);
		bc.setEquipmentCost(equipmentCost);
		bc.setFullCost(fullCost);
		bc.setCouponDiscountPercentage(couponDiscountPercentage);
		bc.setCouponDiscount(couponDiscount);
		bc.setFreeFromCoupon(isFreeFromCoupon);
		bc.setFinalCost(finalCost);
		bc.setSurcharge(surcharge);
		bc.setTransactionFee(transactionFee);
		bc.setFullSurcharge(fullSurcharge);
		bc.setEstimatedCost(estimatedCost);

		return bc;
	}
}
