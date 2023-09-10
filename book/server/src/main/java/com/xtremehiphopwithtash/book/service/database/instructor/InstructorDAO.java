package com.xtremehiphopwithtash.book.service.database.instructor;

import com.xtremehiphopwithtash.book.service.helpers.EntityBaseDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityUpdateDAO;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class InstructorDAO
	implements EntityBaseDAO<Instructor, UUID>, EntityUpdateDAO<Instructor, UUID>, EntityDeleteDAO<UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final InstructorQuery query;
	private final InstructorRowMapper rowMapper;

	public InstructorDAO(NamedParameterJdbcTemplate jdbcTemplate, InstructorQuery query, InstructorRowMapper rowMapper) {
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
	public Instructor selectByID(UUID instructorID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("instructorID", instructorID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
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

	public List<Instructor> selectCourseDefaultInstructors(UUID courseID) {
		String sql = query.SELECT_COURSE_DEFAULT_INSTRUCTORS;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("courseID", courseID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}

	public List<Instructor> selectsSessionInstructors(UUID sessionID) {
		String sql = query.SELECT_SESSION_INSTRUCTORS;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("sessionID", sessionID);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}
}
