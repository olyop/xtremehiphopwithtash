package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public final class CouponQuery {

	private final SQLUtil sqlUtil = new SQLUtil("coupon", SQLColumnNames.join(SQLColumnNames.COUPON, "coupon"));

	public final String SELECT = sqlUtil.read("select");

	public final String SELECT_BY_CODE = sqlUtil.read("select-by-code");

	public final String INSERT = sqlUtil.read("insert");

	public final String UPDATE_BY_CODE = sqlUtil.read("update-by-code");

	public final String SELECT_EXISTS_BY_CODE = sqlUtil.read("select-exists-by-code");

	public final String DELETE_BY_STUDENT_AND_BOOKING = sqlUtil.read("delete-by-student-and-booking");
}
