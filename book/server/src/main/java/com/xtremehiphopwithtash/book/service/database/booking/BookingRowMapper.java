package com.xtremehiphopwithtash.book.service.database.booking;

import com.xtremehiphopwithtash.book.other.PaymentMethod;
import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class BookingRowMapper implements RowMapper<Booking> {

	private final MapRowUtil mapRowUtil;

	public BookingRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public Booking mapRow(ResultSet rs, int rowNum) throws SQLException {
		Booking b = new Booking();

		b.setBookingID(mapRowUtil.mapUUID(rs, "booking_id"));

		b.setNotes(rs.getString("notes"));
		b.setSessionID(mapRowUtil.mapUUID(rs, "session_id"));
		b.setStudentID(rs.getString("student_id"));
		b.setBookingQuantity(mapRowUtil.mapInteger(rs, "booking_quantity"));
		b.setEquipmentQuantity(mapRowUtil.mapInteger(rs, "equipment_quantity"));
		b.setPaymentMethod(mapRowUtil.mapEnum(rs, "payment_method", PaymentMethod.class));
		b.setPaymentIntentID(rs.getString("payment_intent_id"));
		b.setCost(mapRowUtil.mapInteger(rs, "cost"));
		b.setIsConfirmed(rs.getBoolean("has_confirmed"));
		b.setIsCheckedIn(rs.getBoolean("has_checked_in"));
		b.setIsCancelled(rs.getBoolean("has_cancelled"));
		b.setCancelledAt(mapRowUtil.mapInstant(rs, "cancelled_at"));

		b.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return b;
	}
}
