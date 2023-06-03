package com.xtremehiphopwithtash.book.controller;

import com.xtremehiphopwithtash.book.controller.body.GenerateCouponBody;
import com.xtremehiphopwithtash.book.controller.response.GenerateCouponResponse;
import com.xtremehiphopwithtash.book.service.CouponService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AdministratorController {

	private final CouponService couponService;

	public AdministratorController(CouponService couponService) {
		this.couponService = couponService;
	}

	@PostMapping(
		path = "/generate-coupon",
		consumes = "application/json",
		produces = "application/json"
	)
	public GenerateCouponResponse generateCoupon(
		@Validated @RequestBody GenerateCouponBody generateCoupon
	) {
		short discount = generateCoupon.discount();
		String couponCode = couponService.create(discount);
		return new GenerateCouponResponse(couponCode);
	}
}
