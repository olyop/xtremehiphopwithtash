package com.xtremehiphopwithtash.book.service.dao;

import com.xtremehiphopwithtash.book.model.SessionInstructor;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityRelationshipDAO;
import com.xtremehiphopwithtash.book.service.dao.query.SessionInstructorQuery;
import com.xtremehiphopwithtash.book.service.dao.rowmapper.SessionInstructorRowMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class SessionInstructorDAO implements EntityRelationshipDAO<SessionInstructor, UUID, Short> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final SessionInstructorQuery query;
	private final SessionInstructorRowMapper rowMapper;

	public SessionInstructorDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		SessionInstructorQuery query,
		SessionInstructorRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public SessionInstructor insert(SessionInstructor value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", value.getSessionID());
		paramSource.addValue("index", value.getIndex());
		paramSource.addValue("instructorID", value.getInstructorID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public SessionInstructor selectByID(UUID sessionID, Short index) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);
		paramSource.addValue("index", index);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
	}

	@Override
	public List<SessionInstructor> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public void deleteByID(UUID sessionID, Short index) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", sessionID);
		paramSource.addValue("index", index);

		jdbcTemplate.update(sql, paramSource);
	}

	public void deleteBySessionID(UUID sessionID) {
		String sql = query.DELETE_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		jdbcTemplate.update(sql, paramSource);
	}
}
