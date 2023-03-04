package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityDAO;
import com.xtremehiphopwithtash.book.dao.mapper.SessionRowMapper;
import com.xtremehiphopwithtash.book.dao.query.SessionQuery;
import com.xtremehiphopwithtash.book.model.Session;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class SessionDAO implements EntityDAO<Session, UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final SessionQuery query;
	private final SessionRowMapper rowMapper;

	public SessionDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		SessionQuery query,
		SessionRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public Optional<Session> selectByID(UUID id) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", id);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public void deleteByID(UUID id) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", id);

		jdbcTemplate.update(sql, paramSource);
	}

	@Override
	public boolean existsByID(UUID id) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", id);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Session insert(Session value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("title", value.getTitle());
		paramSource.addValue("notes", value.getNotes());
		paramSource.addValue("price", value.getPrice());
		paramSource.addValue("startTime", value.getStartTime().getEpochSecond());
		paramSource.addValue("endTime", value.getEndTime().getEpochSecond());
		paramSource.addValue("capacity", value.getCapacity());
		paramSource.addValue("equipmentAvailable", value.getEquipmentAvailable());
		paramSource.addValue("courseID", value.getCourseID());
		paramSource.addValue("locationID", value.getLocationID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public List<Session> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public Session updateByID(UUID id, Session value) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", id);

		paramSource.addValue("title", value.getTitle());
		paramSource.addValue("notes", value.getNotes());
		paramSource.addValue("price", value.getPrice());
		paramSource.addValue("startTime", value.getStartTime().getEpochSecond());
		paramSource.addValue("endTime", value.getEndTime().getEpochSecond());
		paramSource.addValue("capacity", value.getCapacity());
		paramSource.addValue("equipmentAvailable", value.getEquipmentAvailable());
		paramSource.addValue("courseID", value.getCourseID());
		paramSource.addValue("locationID", value.getLocationID());

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

	public List<Session> selectInTimePeriodAndCourseID(
		Instant startTime,
		Instant endTime,
		UUID courseID
	) {
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
}
