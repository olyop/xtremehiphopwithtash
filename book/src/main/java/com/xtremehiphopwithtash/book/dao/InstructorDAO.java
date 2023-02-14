package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityBaseDAO;
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
public class InstructorDAO implements EntityBaseDAO<Instructor, UUID> {

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
	public Optional<Instructor> selectByID(UUID id) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("instructorID", id);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public List<Instructor> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public boolean deleteByID(UUID id) {
		String sql = query.DELETE_BY_ID;
		MapSqlParameterSource paramSource = new MapSqlParameterSource("instructorID", id);

		int rowsAffected = jdbcTemplate.update(sql, paramSource);

		return rowsAffected > 0;
	}

	@Override
	public boolean existsByID(UUID id) {
		return jdbcTemplate.queryForObject(
			query.EXISTS_BY_ID,
			new MapSqlParameterSource("instructorID", id),
			Boolean.class
		);
	}
}
