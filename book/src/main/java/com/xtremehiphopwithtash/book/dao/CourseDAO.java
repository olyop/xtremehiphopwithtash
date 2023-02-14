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
	public Course insert(Course value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("name", value.getName());
		paramSource.addValue("description", value.getDescription());
		paramSource.addValue("photo", value.getPhoto());
		paramSource.addValue("defaultPrice", value.getDefaultPrice());
		paramSource.addValue("defaultCapacity", value.getDefaultCapacity());
		paramSource.addValue("defaultDuration", value.getDefaultDuration());
		paramSource.addValue("defaultLocationID", value.getDefaultLocationID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Optional<Course> selectByID(UUID id) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("courseID", id);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public List<Course> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public boolean deleteByID(UUID id) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("courseID", id);

		int result = jdbcTemplate.update(sql, paramSource);

		return result > 0;
	}

	@Override
	public boolean existsByID(UUID id) {
		return jdbcTemplate.queryForObject(
			query.EXISTS_BY_ID,
			new MapSqlParameterSource("courseID", id),
			Boolean.class
		);
	}

	@Override
	public Course updateByID(UUID id, Course value) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("courseID", id);
		paramSource.addValue("name", value.getName());
		paramSource.addValue("description", value.getDescription());
		paramSource.addValue("photo", value.getPhoto());
		paramSource.addValue("defaultPrice", value.getDefaultPrice());
		paramSource.addValue("defaultCapacity", value.getDefaultCapacity());
		paramSource.addValue("defaultDuration", value.getDefaultDuration());
		paramSource.addValue("defaultLocationID", value.getDefaultLocationID());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}
}
