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
	public Location insert(Location location) {
		String sql = query.INSERT;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("name", location.getName());
		paramSource.addValue("plusCode", location.getPlusCode());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Optional<Location> selectByID(UUID locationID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("locationID", locationID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst();
	}

	@Override
	public List<Location> select() {
		return jdbcTemplate.query(query.SELECT, rowMapper);
	}

	@Override
	public void deleteByID(UUID locationID) {
		String sql = query.DELETE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("locationID", locationID);

		jdbcTemplate.update(sql, paramSource);
	}

	@Override
	public boolean existsByID(UUID locationID) {
		String sql = query.EXISTS_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("locationID", locationID);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	@Override
	public Location updateByID(UUID locationID, Location location) {
		String sql = query.UPDATE_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("locationID", locationID);

		paramSource.addValue("name", location.getName());
		paramSource.addValue("plusCode", location.getPlusCode());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public boolean existsByNameOrPlusCode(String name, String plusCode) {
		String sql = query.EXISTS_BY_NAME_OR_PLUS_CODE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("name", name);
		paramSource.addValue("plusCode", plusCode);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}

	public List<Location> selectLikeName(String name) {
		String sql = query.SELECT_BY_NAME;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("name", name);

		return jdbcTemplate.query(sql, paramSource, rowMapper);
	}
}
