package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityDAO;
import com.xtremehiphopwithtash.book.dao.mapper.BookingRowMapper;
import com.xtremehiphopwithtash.book.dao.query.BookingQuery;
import com.xtremehiphopwithtash.book.model.Booking;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BookingDAO implements EntityDAO<Booking, UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final BookingQuery query;
	private final BookingRowMapper rowMapper;

	public BookingDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		BookingQuery query,
		BookingRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public Optional<Booking> selectByID(UUID bookingID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("bookingID", bookingID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public void deleteByID(UUID bookingID) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("bookingID", bookingID);

		jdbcTemplate.update(sql, paramSource);
	}

	@Override
	public boolean existsByID(UUID id) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("bookingID", id);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Booking insert(Booking value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("notes", value.getNotes());
		paramSource.addValue("is_bringing_own_equipment", value.getIsBringingOwnEquipment());
		paramSource.addValue("session_id", value.getSessionID());
		paramSource.addValue("student_id", value.getStudentID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public List<Booking> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public Booking updateByID(UUID bookingID, Booking value) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("booking_id", bookingID);

		paramSource.addValue("notes", value.getNotes());
		paramSource.addValue("is_bringing_own_equipment", value.getIsBringingOwnEquipment());
		paramSource.addValue("session_id", value.getSessionID());
		paramSource.addValue("student_id", value.getStudentID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public Short selectCountBySessionID(UUID sessionID) {
		String sql = query.SELECT_COUNT_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Short.class);
	}

	public Short selectCountBySessionIDAndBringingOwnEquipment(UUID sessionID) {
		String sql = query.SELECT_COUNT_BY_SESSION_ID_AND_BRINGING_OWN_EQUIPMENT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Short.class);
	}
}
