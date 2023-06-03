package com.xtremehiphopwithtash.book.model;

import java.time.Instant;
import java.util.UUID;

public class Coupon extends Base {

	private UUID couponID;
	private String code;
	private Short discount;
	private Instant usedAt;
	private String usedByStudentID;
	private UUID usedOnBookingID;

	public Coupon() {}

	public UUID getCouponID() {
		return couponID;
	}

	public void setCouponID(UUID couponID) {
		this.couponID = couponID;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Short getDiscount() {
		return discount;
	}

	public void setDiscount(Short discount) {
		this.discount = discount;
	}

	public Instant getUsedAt() {
		return usedAt;
	}

	public void setUsedAt(Instant usedAt) {
		this.usedAt = usedAt;
	}

	public String getUsedByStudentID() {
		return usedByStudentID;
	}

	public void setUsedByStudentID(String usedByStudentID) {
		this.usedByStudentID = usedByStudentID;
	}

	public UUID getUsedOnBookingID() {
		return usedOnBookingID;
	}

	public void setUsedOnBookingID(UUID usedOnBookingID) {
		this.usedOnBookingID = usedOnBookingID;
	}
}
