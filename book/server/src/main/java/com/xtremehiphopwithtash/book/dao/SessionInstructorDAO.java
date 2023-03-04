package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityRelationshipDAO;
import com.xtremehiphopwithtash.book.dao.mapper.SessionInstructorRowMapper;
import com.xtremehiphopwithtash.book.dao.query.SessionInstructorQuery;
import com.xtremehiphopwithtash.book.model.SessionInstructor;
import java.util.List;
import java.util.Optional;
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
	public Optional<SessionInstructor> selectByID(UUID id, Short index) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", id);
		paramSource.addValue("index", index);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public List<SessionInstructor> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public void deleteByID(UUID id, Short index) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", id);
		paramSource.addValue("index", index);

		jdbcTemplate.update(sql, paramSource);
	}

	@Override
	public boolean existsByID(UUID id, Short index) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("sessionID", id);
		paramSource.addValue("index", index);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public void deleteBySessionID(UUID sessionID) {
		String sql = query.DELETE_BY_SESSION_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		jdbcTemplate.update(sql, paramSource);
	}
}
