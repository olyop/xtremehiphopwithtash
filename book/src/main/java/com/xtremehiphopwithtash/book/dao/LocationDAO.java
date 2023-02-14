package com.xtremehiphopwithtash.book.dao;

import com.xtremehiphopwithtash.book.dao.inter.EntityDAO;
import com.xtremehiphopwithtash.book.dao.mapper.LocationRowMapper;
import com.xtremehiphopwithtash.book.dao.query.LocationQuery;
import com.xtremehiphopwithtash.book.model.Location;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LocationDAO implements EntityDAO<Location, UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final LocationQuery query;
	private final LocationRowMapper rowMapper;

	public LocationDAO(
		NamedParameterJdbcTemplate jdbcTemplate,
		LocationQuery query,
		LocationRowMapper locationMapper
	) {
		this.jdbcTemplate = jdbcTemplate;
		this.query = query;
		this.rowMapper = locationMapper;
	}

	@Override
	public Location insert(Location value) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("name", value.getName());
		paramSource.addValue("plusCode", value.getPlusCode());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Optional<Location> selectByID(UUID id) {
		String sql = query.SELECT_BY_ID;
		MapSqlParameterSource paramSource = new MapSqlParameterSource("locationID", id);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public List<Location> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public boolean deleteByID(UUID id) {
		String sql = query.DELETE_BY_ID;
		MapSqlParameterSource paramSource = new MapSqlParameterSource("locationID", id);

		int rowsAffected = jdbcTemplate.update(sql, paramSource);

		return rowsAffected > 0;
	}

	@Override
	public boolean existsByID(UUID id) {
		return jdbcTemplate.queryForObject(
			query.EXISTS_BY_ID,
			new MapSqlParameterSource("locationID", id),
			Boolean.class
		);
	}

	@Override
	public Location updateByID(UUID id, Location value) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("locationID", id);
		paramSource.addValue("name", value.getName());
		paramSource.addValue("plusCode", value.getPlusCode());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public boolean existsByNameAndPlusCode(String name, String plusCode) {
		String sql = query.EXISTS_BY_NAME_OR_PLUS_CODE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("name", name);
		paramSource.addValue("plusCode", plusCode);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public List<Location> selectLikeName(String name) {
		return jdbcTemplate.query(
			query.SELECT_LIKE_NAME,
			new MapSqlParameterSource("name", name),
			rowMapper
		);
	}
}
