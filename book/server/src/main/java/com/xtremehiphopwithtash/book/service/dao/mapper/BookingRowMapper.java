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
		Booking booking = new Booking();

		booking.setBookingID(MapRowUtil.mapUUID(rs.getString("booking_id")));

		booking.setNotes(rs.getString("notes"));
		booking.setSessionID(MapRowUtil.mapUUID(rs.getString("session_id")));
		booking.setStudentID(rs.getString("student_id"));
		booking.setBookingQuantity(MapRowUtil.mapInteger(rs.getInt("booking_quantity")));
		booking.setEquipmentQuantity(MapRowUtil.mapInteger(rs.getInt("equipment_quantity")));
		booking.setPaymentMethod(
			MapRowUtil.mapEnum(PaymentMethod.class, rs.getString("payment_method"))
		);
		booking.setCost(MapRowUtil.mapInteger(rs.getInt("cost")));

		booking.setCreatedAt(MapRowUtil.mapInstant(rs.getInt("created_at")));

		return booking;
	}
}
