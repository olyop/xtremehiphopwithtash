package com.xtremehiphopwithtash.book.graphql.resolver;

import com.xtremehiphopwithtash.book.service.database.coupon.CouponService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
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

	@MutationMapping
	public String generateCoupon(@Argument Integer discount) {
		return couponService.create(discount);
	}
}
