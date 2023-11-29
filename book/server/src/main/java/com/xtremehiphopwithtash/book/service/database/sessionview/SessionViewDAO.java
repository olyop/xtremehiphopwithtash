package com.xtremehiphopwithtash.book.service.database.sessionview;

import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
class SessionViewDAO {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final SessionViewQuery query;
	private final SessionViewRowMapper rowMapper;

	public SessionViewDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		SessionViewQuery query,
		SessionViewRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	public SessionView selectByID(UUID sessionID, String studentID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);
		paramSource.addValue("studentID", studentID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
	}

	public boolean existsByID(UUID sessionID, String studentID) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);
		paramSource.addValue("studentID", studentID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public SessionView insert(SessionView sessionView) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionView.getSessionID());
		paramSource.addValue("studentID", sessionView.getStudentID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public int selectCountBySessionID(UUID sessionID) {
		String sql = query.SELECT_COUNT_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);

		return jdbcTemplate.queryForObject(sql, paramSource, Integer.class);
	}

	public List<SessionView> selectBySessionID(UUID sessionID) {
		String sql = query.SELECT_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}
}
