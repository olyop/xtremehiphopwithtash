package com.xtremehiphopwithtash.book.other;

public class BookingCost {

	private int bookingCost;
	private int equipmentCost;
	private int fullCost;
	private int couponDiscountPercentage;
	private int couponDiscount;
	private int finalCost;
	private boolean isFreeFromCoupon;

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

	public int getCouponDiscount() {
		return couponDiscount;
	}

	public void setCouponDiscount(int couponDiscount) {
		this.couponDiscount = couponDiscount;
	}

	public int getFinalCost() {
		return finalCost;
	}

	public void setFinalCost(int finalCost) {
		this.finalCost = finalCost;
	}

	public boolean isFreeFromCoupon() {
		return isFreeFromCoupon;
	}

	public void setFreeFromCoupon(boolean isFreeFromCoupon) {
		this.isFreeFromCoupon = isFreeFromCoupon;
	}
}
