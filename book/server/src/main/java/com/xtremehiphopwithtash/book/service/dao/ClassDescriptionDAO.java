package com.xtremehiphopwithtash.book.service.dao;

import com.xtremehiphopwithtash.book.service.dao.query.ClassDescriptionQuery;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ClassDescriptionDAO {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final ClassDescriptionQuery query;

	public ClassDescriptionDAO(NamedParameterJdbcTemplate jdbcTemplate, ClassDescriptionQuery query) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
	}

	public String getValue() {
		return jdbcTemplate.getJdbcTemplate().queryForObject(query.SELECT, String.class);
	}

	public void updateValue(String value) {
		String sql = query.UPDATE;

		MapSqlParameterSource params = new MapSqlParameterSource("classDescription", value);

		jdbcTemplate.update(sql, params);
	}
}
