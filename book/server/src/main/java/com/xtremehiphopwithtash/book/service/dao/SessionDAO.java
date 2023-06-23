package com.xtremehiphopwithtash.book.service.dao;

import com.xtremehiphopwithtash.book.model.Session;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityBaseDAO;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityUpdateDAO;
import com.xtremehiphopwithtash.book.service.dao.query.SessionQuery;
import com.xtremehiphopwithtash.book.service.dao.rowmapper.SessionRowMapper;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class SessionDAO implements EntityBaseDAO<Session, UUID>, EntityUpdateDAO<Session, UUID>, EntityDeleteDAO<UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final SessionQuery query;
	private final SessionRowMapper rowMapper;

	public SessionDAO(NamedParameterJdbcTemplate jdbcTemplate, SessionQuery query, SessionRowMapper rowMapper) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public Session selectByID(UUID sessionID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
	}

	@Override
	public void deleteByID(UUID sessionID) {
		throw new UnsupportedOperationException();
	}

	@Override
	public boolean existsByID(UUID sessionID) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Session insert(Session session) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("title", session.getTitle());
		paramSource.addValue("notes", session.getNotes());
		paramSource.addValue("price", session.getPrice());
		paramSource.addValue("equipmentFee", session.getEquipmentFee());
		paramSource.addValue("startTime", session.getStartTime().getEpochSecond());
		paramSource.addValue("endTime", session.getEndTime().getEpochSecond());
		paramSource.addValue("capacityAvailable", session.getCapacityAvailable());
		paramSource.addValue("equipmentAvailable", session.getEquipmentAvailable());
		paramSource.addValue("courseID", session.getCourseID());
		paramSource.addValue("locationID", session.getLocationID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public List<Session> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public Session updateByID(UUID sessionID, Session session) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);

		paramSource.addValue("title", session.getTitle());
		paramSource.addValue("notes", session.getNotes());
		paramSource.addValue("price", session.getPrice());
		paramSource.addValue("equipmentFee", session.getEquipmentFee());
		paramSource.addValue("startTime", session.getStartTime().getEpochSecond());
		paramSource.addValue("endTime", session.getEndTime().getEpochSecond());
		paramSource.addValue("capacityAvailable", session.getCapacityAvailable());
		paramSource.addValue("equipmentAvailable", session.getEquipmentAvailable());
		paramSource.addValue("courseID", session.getCourseID());
		paramSource.addValue("locationID", session.getLocationID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public List<Session> selectByCourseID(UUID courseID) {
		String sql = query.SELECT_BY_COURSE_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("courseID", courseID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public List<Session> selectInTimePeriod(Instant startTime, Instant endTime) {
		String sql = query.SELECT_SESSIONS_IN_TIME_PERIOD;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("startTime", startTime.getEpochSecond());
		paramSource.addValue("endTime", endTime.getEpochSecond());

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public List<Session> selectInTimePeriodNotCancelled(Instant startTime, Instant endTime) {
		String sql = query.SELECT_SESSIONS_IN_TIME_PERIOD_NOT_CANCELLED;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("startTime", startTime.getEpochSecond());
		paramSource.addValue("endTime", endTime.getEpochSecond());

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public List<Session> selectInTimePeriodExcludeSession(Instant startTime, Instant endTime, UUID sessionID) {
		String sql = query.SELECT_SESSIONS_IN_TIME_PERIOD_EXCLUDE_SESSION;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("startTime", startTime.getEpochSecond());
		paramSource.addValue("endTime", endTime.getEpochSecond());
		paramSource.addValue("sessionID", sessionID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public List<Session> selectInTimePeriodAndCourseID(Instant startTime, Instant endTime, UUID courseID) {
		String sql = query.SELECT_SESSIONS_IN_TIME_PERIOD_AND_COURSE_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("startTime", startTime.getEpochSecond());
		paramSource.addValue("endTime", endTime.getEpochSecond());
		paramSource.addValue("courseID", courseID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public List<Session> selectByInstructorID(UUID instructorID) {
		String sql = query.SELECT_BY_INSTRUCTOR_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("instructorID", instructorID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public List<Session> selectByLocationID(UUID locationID) {
		String sql = query.SELECT_BY_LOCATION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("locationID", locationID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public void cancelByID(UUID sessionID) {
		String sql = query.CANCEL_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);

		jdbcTemplate.update(sql, paramSource);
	}
}
