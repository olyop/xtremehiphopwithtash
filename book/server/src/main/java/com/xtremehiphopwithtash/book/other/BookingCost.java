package com.xtremehiphopwithtash.book.other;

public class BookingCost {

	private int sessionCost;
	private int equipmentCost;
	private int bookingCost;
	private int couponDiscountPercentage;
	private int couponAmountToDiscount;
	private int couponDiscount;
	private int cost;
	private boolean isFreeFromCoupon;
	private double cardSurchargeRatio;
	private int cardFee;
	private int cardSurcharge;
	private int cardSurchargeWithoutFee;
	private int finalCost;

	public int getSessionCost() {
		return sessionCost;
	}

	public void setSessionCost(int sessionCost) {
		this.sessionCost = sessionCost;
	}

	public int getEquipmentCost() {
		return equipmentCost;
	}

	public void setEquipmentCost(int equipmentCost) {
		this.equipmentCost = equipmentCost;
	}

	public int getBookingCost() {
		return bookingCost;
	}

	public void setBookingCost(int bookingCost) {
		this.bookingCost = bookingCost;
	}

	public int getCouponDiscountPercentage() {
		return couponDiscountPercentage;
	}

	public void setCouponDiscountPercentage(int couponDiscountPercentage) {
		this.couponDiscountPercentage = couponDiscountPercentage;
	}

	public int getCouponAmountToDiscount() {
		return couponAmountToDiscount;
	}

	public void setCouponAmountToDiscount(int couponAmountToDiscount) {
		this.couponAmountToDiscount = couponAmountToDiscount;
	}

	public int getCouponDiscount() {
		return couponDiscount;
	}

	public void setCouponDiscount(int couponDiscount) {
		this.couponDiscount = couponDiscount;
	}

	public int getCost() {
		return cost;
	}

	public void setCost(int cost) {
		this.cost = cost;
	}

	public boolean isFreeFromCoupon() {
		return isFreeFromCoupon;
	}

	public void setFreeFromCoupon(boolean isFreeFromCoupon) {
		this.isFreeFromCoupon = isFreeFromCoupon;
	}

	public double getCardSurchargeRatio() {
		return cardSurchargeRatio;
	}

	public void setCardSurchargeRatio(double cardSurchargeRatio) {
		this.cardSurchargeRatio = cardSurchargeRatio;
	}

	public int getCardFee() {
		return cardFee;
	}

	public void setCardFee(int cardFee) {
		this.cardFee = cardFee;
	}

	public int getCardSurcharge() {
		return cardSurcharge;
	}

	public void setCardSurcharge(int cardSurcharge) {
		this.cardSurcharge = cardSurcharge;
	}

	public int getCardSurchargeWithoutFee() {
		return cardSurchargeWithoutFee;
	}

	public void setCardSurchargeWithoutFee(int cardSurchargeWithoutFee) {
		this.cardSurchargeWithoutFee = cardSurchargeWithoutFee;
	}

	public int getFinalCost() {
		return finalCost;
	}

	public void setFinalCost(int finalCost) {
		this.finalCost = finalCost;
	}
}
