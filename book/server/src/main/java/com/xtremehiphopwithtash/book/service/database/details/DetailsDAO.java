package com.xtremehiphopwithtash.book.service.database.details;

import com.xtremehiphopwithtash.book.service.helpers.EntityBaseDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.service.helpers.EntityUpdateDAO;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DetailsDAO implements EntityBaseDAO<Details, UUID>, EntityUpdateDAO<Details, UUID>, EntityDeleteDAO<UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final DetailsQuery query;
	private final DetailsRowMapper rowMapper;

	public DetailsDAO(NamedParameterJdbcTemplate jdbcTemplate, DetailsQuery query, DetailsRowMapper rowMapper) {
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
		paramSource.addValue("emailAddress", value.getEmailAddress());
		paramSource.addValue("instagramUsername", value.getInstagramUsername());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Details selectByID(UUID detailsID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("detailsID", detailsID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
	}

	@Override
	public List<Details> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public void deleteByID(UUID detailsID) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("detailsID", detailsID);

		jdbcTemplate.update(sql, paramSource);
	}

	@Override
	public boolean existsByID(UUID detailsID) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("detailsID", detailsID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Details updateByID(UUID detailsID, Details value) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("detailsID", detailsID);

		paramSource.addValue("firstName", value.getFirstName());
		paramSource.addValue("lastName", value.getLastName());
		paramSource.addValue("nickName", value.getNickName());
		paramSource.addValue("gender", value.getGender());
		paramSource.addValue("mobilePhoneNumber", value.getMobilePhoneNumber());
		paramSource.addValue("emailAddress", value.getEmailAddress());
		paramSource.addValue("instagramUsername", value.getInstagramUsername());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public List<String> selectGenders() {
		String sql = query.SELECT_GENDERS;

		return jdbcTemplate.getJdbcTemplate().queryForList(sql, String.class);
	}

	public Details selectByEmailAddress(String emailAddress) {
		String sql = query.SELECT_BY_EMAIL_ADDRESS;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("emailAddress", emailAddress);

		List<Details> details = jdbcTemplate.query(sql, paramSource, rowMapper);

		return details.isEmpty() ? null : details.stream().findFirst().get();
	}

	public boolean existsByEmailAddress(String emailAddress) {
		String sql = query.EXISTS_BY_EMAIL_ADDRESS;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("emailAddress", emailAddress);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}
}
