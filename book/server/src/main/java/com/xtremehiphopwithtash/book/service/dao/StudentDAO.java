package com.xtremehiphopwithtash.book.service.dao;

import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityBaseDAO;
import com.xtremehiphopwithtash.book.service.dao.mapper.StudentRowMapper;
import com.xtremehiphopwithtash.book.service.dao.query.StudentQuery;
import java.util.List;
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
		paramSource.addValue("studentID", value.getStudentID());
		paramSource.addValue("detailsID", value.getDetailsID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Student selectByID(String studentID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
	}

	@Override
	public List<Student> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public boolean existsByID(String studentID) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}
}
