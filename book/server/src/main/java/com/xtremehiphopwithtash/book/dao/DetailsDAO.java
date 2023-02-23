package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityDAO;
import com.xtremehiphopwithtash.book.dao.mapper.DetailsRowMapper;
import com.xtremehiphopwithtash.book.dao.query.DetailsQuery;
import com.xtremehiphopwithtash.book.model.Details;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DetailsDAO implements EntityDAO<Details, UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final DetailsQuery query;
	private final DetailsRowMapper rowMapper;

	public DetailsDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		DetailsQuery query,
		DetailsRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public Details insert(Details value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("firstName", value.getFirstName());
		paramSource.addValue("lastName", value.getLastName());
		paramSource.addValue("nickName", value.getNickName());
		paramSource.addValue("gender", value.getGender());
		paramSource.addValue("mobilePhoneNumber", value.getMobilePhoneNumber());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Optional<Details> selectByID(UUID id) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("detailsID", id);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public List<Details> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public void deleteByID(UUID id) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("detailsID", id);

		jdbcTemplate.update(sql, paramSource);
	}

	@Override
	public boolean existsByID(UUID id) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("detailsID", id);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Details updateByID(UUID id, Details value) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("detailsID", id);

		paramSource.addValue("firstName", value.getFirstName());
		paramSource.addValue("lastName", value.getLastName());
		paramSource.addValue("nickName", value.getNickName());
		paramSource.addValue("gender", value.getGender());
		paramSource.addValue("mobilePhoneNumber", value.getMobilePhoneNumber());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public boolean existsByFirstLastName(String firstName, String lastName) {
		String sql = query.EXISTS_BY_FIRST_LAST_NAME;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("firstName", firstName);
		paramSource.addValue("lastName", lastName);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public boolean existsByFirstLastNickName(String firstName, String lastName, String nickName) {
		String sql = query.EXISTS_BY_FIRST_LAST_NICK_NAME;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("firstName", firstName);
		paramSource.addValue("lastName", lastName);
		paramSource.addValue("nickName", nickName);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public List<String> selectGenders() {
		return jdbcTemplate.getJdbcTemplate().queryForList(query.SELECT_GENDERS, String.class);
	}
}
