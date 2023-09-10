package com.xtremehiphopwithtash.book.service.database.coupon;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
final class CouponQuery {

	private final SQLUtil sqlUtil = new SQLUtil("coupon", SQLColumnNames.join(SQLColumnNames.COUPON, "coupon"));

	final String SELECT = sqlUtil.read("select");

	final String SELECT_BY_CODE = sqlUtil.read("select-by-code");

	final String INSERT = sqlUtil.read("insert");

	final String UPDATE_BY_CODE = sqlUtil.read("update-by-code");

	final String SELECT_EXISTS_BY_CODE = sqlUtil.read("select-exists-by-code");

	final String DELETE_BY_STUDENT_AND_BOOKING = sqlUtil.read("delete-by-student-and-booking");
}
