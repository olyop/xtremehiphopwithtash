package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.other.PaymentMethod;
import com.xtremehiphopwithtash.book.service.dao.util.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class BookingRowMapper implements RowMapper<Booking> {

	@Override
	@Nullable
	public Booking mapRow(ResultSet rs, int rowNum) throws SQLException {
		Booking b = new Booking();

		b.setBookingID(MapRowUtil.mapUUID(rs.getString("booking_id")));

		b.setNotes(rs.getString("notes"));
		b.setSessionID(MapRowUtil.mapUUID(rs.getString("session_id")));
		b.setStudentID(rs.getString("student_id"));
		b.setBookingQuantity(MapRowUtil.mapInteger(rs.getInt("booking_quantity")));
		b.setEquipmentQuantity(MapRowUtil.mapInteger(rs.getInt("equipment_quantity")));
		b.setPaymentMethod(MapRowUtil.mapEnum(PaymentMethod.class, rs.getString("payment_method")));
		b.setCost(MapRowUtil.mapInteger(rs.getInt("cost")));
		b.setHasCheckedIn(rs.getBoolean("has_checked_in"));

		b.setCreatedAt(MapRowUtil.mapInstant(rs.getInt("created_at")));

		return b;
	}
}
