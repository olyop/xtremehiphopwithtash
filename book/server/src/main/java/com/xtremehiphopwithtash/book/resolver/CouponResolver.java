package com.xtremehiphopwithtash.book.resolver;

import com.xtremehiphopwithtash.book.service.CouponService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
public class CouponResolver {

	private final CouponService couponService;

	public CouponResolver(CouponService couponService) {
		this.couponService = couponService;
	}

	@QueryMapping
	public String verifyCoupon(@Argument String code) {
		return couponService.canUseErrorMessage(code);
	}
}
