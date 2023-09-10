package com.xtremehiphopwithtash.book.service.database.coupon;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class CouponRowMapper implements RowMapper<Coupon> {

	private final MapRowUtil mapRowUtil;

	public CouponRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public Coupon mapRow(ResultSet rs, int rowNum) throws SQLException {
		Coupon coupon = new Coupon();

		coupon.setCouponID(mapRowUtil.mapUUID(rs, "coupon_id"));

		coupon.setCode(rs.getString("code"));
		coupon.setDiscount(mapRowUtil.mapInteger(rs, "discount"));
		coupon.setUsedAt(mapRowUtil.mapInstant(rs, "used_at"));
		coupon.setUsedByStudentID(rs.getString("used_by_student_id"));
		coupon.setUsedOnBookingID(mapRowUtil.mapUUID(rs, "used_on_booking_id"));

		coupon.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return coupon;
	}
}
