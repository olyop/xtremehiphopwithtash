package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityDAO;
import com.xtremehiphopwithtash.book.dao.mapper.CourseRowMapper;
import com.xtremehiphopwithtash.book.dao.query.CourseQuery;
import com.xtremehiphopwithtash.book.model.Course;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CourseDAO implements EntityDAO<Course, UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final CourseQuery query;
	private final CourseRowMapper rowMapper;

	public CourseDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		CourseQuery courseQuery,
		CourseRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = courseQuery;
		this.rowMapper = rowMapper;
	}

	@Override
	public Course insert(Course course) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("name", course.getName());
		paramSource.addValue("description", course.getDescription());
		paramSource.addValue("photo", course.getPhoto().toString());
		paramSource.addValue("defaultPrice", course.getDefaultPrice());
		paramSource.addValue("defaultDuration", course.getDefaultDuration());
		paramSource.addValue("defaultCapacity", course.getDefaultCapacity());
		paramSource.addValue("defaultEquipmentAvailable", course.getDefaultEquipmentAvailable());
		paramSource.addValue("defaultLocationID", course.getDefaultLocationID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Optional<Course> selectByID(UUID courseID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("courseID", courseID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public List<Course> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public void deleteByID(UUID courseID) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("courseID", courseID);

		jdbcTemplate.update(sql, paramSource);
	}

	@Override
	public boolean existsByID(UUID courseID) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("courseID", courseID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public boolean existsByName(String name) {
		String sql = query.EXISTS_BY_NAME;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("name", name);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Course updateByID(UUID courseID, Course course) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("courseID", courseID);

		paramSource.addValue("name", course.getName());
		paramSource.addValue("description", course.getDescription());
		paramSource.addValue("photo", course.getPhoto().toString());
		paramSource.addValue("defaultPrice", course.getDefaultPrice());
		paramSource.addValue("defaultDuration", course.getDefaultDuration());
		paramSource.addValue("defaultCapacity", course.getDefaultCapacity());
		paramSource.addValue("defaultEquipmentAvailable", course.getDefaultEquipmentAvailable());
		paramSource.addValue("defaultLocationID", course.getDefaultLocationID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}
}
