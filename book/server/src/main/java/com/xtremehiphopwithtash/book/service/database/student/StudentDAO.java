package com.xtremehiphopwithtash.book.service.database.student;

import com.xtremehiphopwithtash.book.service.helpers.EntityBaseDAO;
import java.util.List;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class StudentDAO implements EntityBaseDAO<Student, String> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final StudentQuery query;
	private final StudentRowMapper rowMapper;

	public StudentDAO(NamedParameterJdbcTemplate jdbcTemplate, StudentQuery query, StudentRowMapper rowMapper) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	public int count() {
		String sql = query.SELECT_COUNT;

		return jdbcTemplate.getJdbcTemplate().queryForObject(sql, Integer.class);
	}

	@Override
	public Student insert(Student value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("studentID", value.getStudentID());
		paramSource.addValue("detailsID", value.getDetailsID());
		paramSource.addValue("stripeCustomerID", value.getStripeCustomerID());

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

	public boolean selectHasViewedInstallPopup(String studentID) {
		String sql = query.SELECT_HAS_VIEWED_INSTALL_POPUP;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public boolean updateHasViewedInstallPopup(String studentID) {
		String sql = query.UPDATE_HAS_VIEWED_INSTALL_POPUP;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return jdbcTemplate.update(sql, paramSource) == 1;
	}

	public boolean selectHasSignedWaiver(String studentID) {
		String sql = query.SELECT_HAS_SIGNED_WAIVER;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public void updateHasSignedWaiver(String studentID) {
		String sql = query.UPDATE_HAS_SIGNED_WAIVER;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("studentID", studentID);

		jdbcTemplate.update(sql, paramSource);
	}
}
