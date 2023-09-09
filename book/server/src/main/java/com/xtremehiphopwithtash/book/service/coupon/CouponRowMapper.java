package com.xtremehiphopwithtash.book.service.coupon;

import com.xtremehiphopwithtash.book.service.dao.rowmapper.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
class CouponRowMapper implements RowMapper<Coupon> {

	@Override
	@Nullable
	public Coupon mapRow(ResultSet rs, int rowNum) throws SQLException {
		Coupon coupon = new Coupon();

		coupon.setCouponID(MapRowUtil.mapUUID(rs.getString("coupon_id")));

		coupon.setCode(rs.getString("code"));
		coupon.setDiscount(MapRowUtil.mapInteger(rs.getInt("discount")));
		coupon.setUsedAt(MapRowUtil.mapInstant(rs.getInt("used_at")));
		coupon.setUsedByStudentID(rs.getString("used_by_student_id"));
		coupon.setUsedOnBookingID(MapRowUtil.mapUUID(rs.getString("used_on_booking_id")));

		coupon.setCreatedAt(MapRowUtil.mapInstant(rs.getInt("created_at")));

		return coupon;
	}
}
