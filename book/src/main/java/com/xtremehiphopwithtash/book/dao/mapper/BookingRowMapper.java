package com.xtremehiphopwithtash.book.dao.mapper;

import com.xtremehiphopwithtash.book.model.Booking;
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
		Booking booking = new Booking();

		booking.setBookingID(MapRowUtil.mapToUUID(rs.getString("booking_id")));
		booking.setNotes(rs.getString("notes"));
		booking.setIsBringingOwnEquipment(rs.getBoolean("is_bringing_own_equipment"));
		booking.setSessionID(MapRowUtil.mapToUUID(rs.getString("session_id")));
		booking.setStudentID(rs.getString("student_id"));
		booking.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return booking;
	}
}
