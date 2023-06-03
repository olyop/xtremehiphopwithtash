package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.model.Booking;
import com.xtremehiphopwithtash.book.other.PaymentMethod;
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
		booking.setSessionID(MapRowUtil.mapToUUID(rs.getString("session_id")));
		booking.setStudentID(rs.getString("student_id"));
		booking.setBookingQuantity(MapRowUtil.mapToShort(rs.getShort("booking_quantity")));
		booking.setEquipmentQuantity(MapRowUtil.mapToShort(rs.getShort("equipment_quantity")));
		booking.setPaymentMethod(
			MapRowUtil.mapToEnum(PaymentMethod.class, rs.getString("payment_method"))
		);
		booking.setCost(MapRowUtil.mapToDouble(rs.getDouble("cost")));

		booking.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return booking;
	}
}
