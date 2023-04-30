package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityBaseDAO;
import com.xtremehiphopwithtash.book.dao.inter.EntityUpdateDAO;
import com.xtremehiphopwithtash.book.dao.mapper.ReferralCodeRowMapper;
import com.xtremehiphopwithtash.book.dao.query.ReferralCodeQuery;
import com.xtremehiphopwithtash.book.model.ReferralCode;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ReferralCodeDAO
	implements EntityBaseDAO<ReferralCode, String>, EntityUpdateDAO<ReferralCode, String> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final ReferralCodeQuery query;
	private final ReferralCodeRowMapper rowMapper;

	public ReferralCodeDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		ReferralCodeQuery query,
		ReferralCodeRowMapper rowMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = rowMapper;
	}

	@Override
	public ReferralCode insert(ReferralCode value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("code", value.getCode());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public List<ReferralCode> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public Optional<ReferralCode> selectByID(String code) {
		String sql = query.SELECT_BY_CODE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("code", code);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public boolean existsByID(String code) {
		String sql = query.EXISTS_BY_CODE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("code", code);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public ReferralCode updateByID(String id, ReferralCode value) {
		String sql = query.UPDATE_BY_CODE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("code", id);
		paramSource.addValue("usedAt", value.getUsedAt().getEpochSecond());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}
}
