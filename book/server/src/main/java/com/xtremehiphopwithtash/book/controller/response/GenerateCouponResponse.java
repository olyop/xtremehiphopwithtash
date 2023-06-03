package com.xtremehiphopwithtash.book.controller.response;

public class GenerateCouponResponse {

	private String couponCode;

	public GenerateCouponResponse(String couponCode) {
		this.couponCode = couponCode;
	}

	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}
}
