package com.xtremehiphopwithtash.book.service.dao;

import com.xtremehiphopwithtash.book.model.CourseDefaultInstructor;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityRelationshipDAO;
import com.xtremehiphopwithtash.book.service.dao.mapper.CourseDefaultInstructorRowMapper;
import com.xtremehiphopwithtash.book.service.dao.query.CourseDefaultInstructorQuery;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CourseDefaultInstructorDAO implements EntityRelationshipDAO<CourseDefaultInstructor, UUID, Short> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final CourseDefaultInstructorQuery query;
	private final CourseDefaultInstructorRowMapper rowMapper;

	public CourseDefaultInstructorDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		CourseDefaultInstructorQuery query,
		CourseDefaultInstructorRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public CourseDefaultInstructor insert(CourseDefaultInstructor value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("courseID", value.getCourseID());
		paramSource.addValue("index", value.getIndex());
		paramSource.addValue("instructorID", value.getInstructorID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public CourseDefaultInstructor selectByID(UUID courseID, Short index) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("courseID", courseID);
		paramSource.addValue("index", index);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
	}

	@Override
	public List<CourseDefaultInstructor> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public void deleteByID(UUID courseID, Short index) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("courseID", courseID);
		paramSource.addValue("index", index);

		jdbcTemplate.update(sql, paramSource);
	}

	public List<CourseDefaultInstructor> selectByCourseID(UUID courseID) {
		String sql = query.SELECT_BY_COURSE_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("courseID", courseID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public void deleteByCourseID(UUID courseID) {
		String sql = query.DELETE_BY_COURSE_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("courseID", courseID);

		jdbcTemplate.update(sql, paramSource);
	}
}
