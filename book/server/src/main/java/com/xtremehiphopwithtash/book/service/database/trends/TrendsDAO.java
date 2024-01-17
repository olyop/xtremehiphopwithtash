package com.xtremehiphopwithtash.book.service.database.trends;

import java.time.Instant;
import java.util.List;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TrendsDAO {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final TrendsQuery query;
	private final TrendsBookingRowMapper trendsBookingRowMapper;

	public TrendsDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		TrendsQuery query,
		TrendsBookingRowMapper trendsBookingRowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.trendsBookingRowMapper = trendsBookingRowMapper;
	}

	public List<TrendsBooking> selectBookingTrends(Instant startTime, Instant endTime) {
		String sql = query.SELECT_BOOKING_TRENDS;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("startTime", startTime.getEpochSecond());
		paramSource.addValue("endTime", endTime.getEpochSecond());

		return jdbcTemplate.query(sql, paramSource, trendsBookingRowMapper);
	}
}
