package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityDAO;
import com.xtremehiphopwithtash.book.dao.mapper.InstructorRowMapper;
import com.xtremehiphopwithtash.book.dao.query.InstructorQuery;
import com.xtremehiphopwithtash.book.model.Instructor;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class InstructorDAO implements EntityDAO<Instructor, UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final InstructorQuery query;
	private final InstructorRowMapper rowMapper;

	public InstructorDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		InstructorQuery query,
		InstructorRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public Instructor insert(Instructor value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("detailsID", value.getDetailsID());
		paramSource.addValue("photo", value.getPhoto().toString());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Optional<Instructor> selectByID(UUID instructorID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("instructorID", instructorID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public List<Instructor> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public void deleteByID(UUID instructorID) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("instructorID", instructorID);

		jdbcTemplate.update(sql, paramSource);
	}

	@Override
	public boolean existsByID(UUID instructorID) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("instructorID", instructorID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Instructor updateByID(UUID instructorID, Instructor instructor) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("instructorID", instructorID);

		paramSource.addValue("photo", instructor.getPhoto().toString());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}
}
