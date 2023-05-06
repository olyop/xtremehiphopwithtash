package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityBaseDAO;
import com.xtremehiphopwithtash.book.dao.inter.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.dao.inter.EntityUpdateDAO;
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
public class BookingDAO
	implements EntityBaseDAO<Booking, UUID>, EntityUpdateDAO<Booking, UUID>, EntityDeleteDAO<UUID> {

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
	public boolean existsByID(UUID bookingID) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("bookingID", bookingID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Booking insert(Booking value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("notes", value.getNotes());
		paramSource.addValue("isBringingOwnEquipment", value.getIsBringingOwnEquipment());
		paramSource.addValue("sessionID", value.getSessionID());
		paramSource.addValue("studentID", value.getStudentID());

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
		paramSource.addValue("bookingID", bookingID);

		paramSource.addValue("notes", value.getNotes());
		paramSource.addValue("isBringingOwnEquipment", value.getIsBringingOwnEquipment());
		paramSource.addValue("sessionID", value.getSessionID());
		paramSource.addValue("studentID", value.getStudentID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public List<Booking> selectBySessionID(UUID sessionID) {
		String sql = query.SELECT_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
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

	public short selectCapacityRemaning(UUID sessionID) {
		String sql = query.SELECT_CAPACITY_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Short.class);
	}

	public List<Booking> selectByStudentID(String studentID) {
		String sql = query.SELECT_BOOKINGS_BY_STUDENT_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public short selectCountByStudentID(String studentID) {
		String sql = query.SELECT_COUNT_BOOKINGS_BY_STUDENT_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return jdbcTemplate.queryForObject(sql, paramSource, Short.class);
	}

	public boolean existsByStudentAndSession(String studentID, UUID sessionID) {
		String sql = query.EXISTS_BY_STUDENT_AND_SESSION;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("studentID", studentID);
		paramSource.addValue("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}
}
