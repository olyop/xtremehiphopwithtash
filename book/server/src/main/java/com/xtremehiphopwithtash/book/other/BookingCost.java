package com.xtremehiphopwithtash.book.other;

public class BookingCost {

	private int bookingCost;
	private int equipmentCost;
	private int fullCost;
	private int couponDiscountPercentage;
	private double couponDiscount;
	private double finalCost;
	private boolean isFreeFromCoupon;
	private double surcharge;
	private double transactionFee;
	private double fullSurcharge;
	private double estimatedCost;

	public int getBookingCost() {
		return bookingCost;
	}

	public void setBookingCost(int bookingCost) {
		this.bookingCost = bookingCost;
	}

	public int getEquipmentCost() {
		return equipmentCost;
	}

	public void setEquipmentCost(int equipmentCost) {
		this.equipmentCost = equipmentCost;
	}

	public int getFullCost() {
		return fullCost;
	}

	public void setFullCost(int fullCost) {
		this.fullCost = fullCost;
	}

	public int getCouponDiscountPercentage() {
		return couponDiscountPercentage;
	}

	public void setCouponDiscountPercentage(int couponDiscountPercentage) {
		this.couponDiscountPercentage = couponDiscountPercentage;
	}

	public double getCouponDiscount() {
		return couponDiscount;
	}

	public void setCouponDiscount(double couponDiscount) {
		this.couponDiscount = couponDiscount;
	}

	public double getFinalCost() {
		return finalCost;
	}

	public void setFinalCost(double finalCost) {
		this.finalCost = finalCost;
	}

	public boolean isFreeFromCoupon() {
		return isFreeFromCoupon;
	}

	public void setFreeFromCoupon(boolean isFreeFromCoupon) {
		this.isFreeFromCoupon = isFreeFromCoupon;
	}

	public double getSurcharge() {
		return surcharge;
	}

	public void setSurcharge(double surcharge) {
		this.surcharge = surcharge;
	}

	public double getTransactionFee() {
		return transactionFee;
	}

	public void setTransactionFee(double transactionFee) {
		this.transactionFee = transactionFee;
	}

	public double getFullSurcharge() {
		return fullSurcharge;
	}

	public void setFullSurcharge(double fullSurcharge) {
		this.fullSurcharge = fullSurcharge;
	}

	public double getEstimatedCost() {
		return estimatedCost;
	}

	public void setEstimatedCost(double estimatedCost) {
		this.estimatedCost = estimatedCost;
	}
}
