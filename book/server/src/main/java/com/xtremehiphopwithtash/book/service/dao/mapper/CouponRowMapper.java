package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.model.Coupon;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class CouponRowMapper implements RowMapper<Coupon> {

	@Override
	@Nullable
	public Coupon mapRow(ResultSet rs, int rowNum) throws SQLException {
		Coupon coupon = new Coupon();

		coupon.setCouponID(MapRowUtil.mapToUUID(rs.getString("coupon_id")));

		coupon.setCode(rs.getString("code"));
		coupon.setDiscount(rs.getShort("discount"));
		coupon.setUsedAt(MapRowUtil.mapToInstant(rs.getInt("used_at")));
		coupon.setUsedByStudentID(rs.getString("used_by_student_id"));
		coupon.setUsedOnBookingID(MapRowUtil.mapToUUID(rs.getString("used_on_booking_id")));

		coupon.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return coupon;
	}
}
