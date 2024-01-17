package com.xtremehiphopwithtash.book.service.database.trends;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class TrendsBookingRowMapper implements RowMapper<TrendsBooking> {

	private final MapRowUtil mapRowUtil;

	public TrendsBookingRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public TrendsBooking mapRow(ResultSet rs, int rowNum) throws SQLException {
		TrendsBooking tb = new TrendsBooking();

		tb.setBookings(mapRowUtil.mapInteger(rs, "bookings"));
		tb.setUnixDay(mapRowUtil.mapInstant(rs, "unix_day"));

		return tb;
	}
}
