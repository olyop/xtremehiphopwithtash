package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityBaseDAO;
import com.xtremehiphopwithtash.book.dao.mapper.StudentRowMapper;
import com.xtremehiphopwithtash.book.dao.query.StudentQuery;
import com.xtremehiphopwithtash.book.model.Student;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class StudentDAO implements EntityBaseDAO<Student, String> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final StudentQuery query;
	private final StudentRowMapper rowMapper;

	public StudentDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		StudentQuery query,
		StudentRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public Student insert(Student value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("detailsID", value.getDetailsID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Optional<Student> selectByID(String id) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", id);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public List<Student> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public boolean deleteByID(String id) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", id);

		int rowsAffected = jdbcTemplate.update(sql, paramSource);

		return rowsAffected > 0;
	}

	@Override
	public boolean existsByID(String id) {
		return jdbcTemplate.queryForObject(
			query.EXISTS_BY_ID,
			new MapSqlParameterSource("studentID", id),
			Boolean.class
		);
	}
}
