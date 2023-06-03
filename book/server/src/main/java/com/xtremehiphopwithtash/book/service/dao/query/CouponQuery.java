package com.xtremehiphopwithtash.book.service.dao.query;

import com.xtremehiphopwithtash.book.service.dao.util.SQLColumnNamesUtil;
import org.springframework.stereotype.Component;

@Component
public final class CouponQuery {

	private final String columnNames = SQLColumnNamesUtil.join(SQLColumnNamesUtil.COUPON, "coupon");

	public final String SELECT = String.format("SELECT %s FROM coupon;", columnNames);

	public final String SELECT_BY_CODE = String.format(
		"SELECT %s FROM coupon WHERE code = :code;",
		columnNames
	);

	public final String INSERT = String.format(
		"""
			INSERT INTO coupon
				(code, discount)
			VALUES
				(:code, :discount)
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String UPDATE_BY_CODE = String.format(
		"""
			UPDATE
				coupon
			SET
				used_at = :usedAt,
				used_by_student_id = :usedByStudentID,
				used_on_booking_id = :usedOnBookingID
			WHERE
				code = :code
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String EXISTS_BY_CODE = "SELECT EXISTS (SELECT 1 FROM coupon WHERE code = :code);";
}
