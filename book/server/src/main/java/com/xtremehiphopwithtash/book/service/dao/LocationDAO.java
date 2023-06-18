package com.xtremehiphopwithtash.book.service.dao;

import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityBaseDAO;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityDeleteDAO;
import com.xtremehiphopwithtash.book.service.dao.inter.EntityUpdateDAO;
import com.xtremehiphopwithtash.book.service.dao.query.LocationQuery;
import com.xtremehiphopwithtash.book.service.dao.rowmapper.LocationRowMapper;
import java.util.List;
import java.util.UUID;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LocationDAO
	implements EntityBaseDAO<Location, UUID>, EntityUpdateDAO<Location, UUID>, EntityDeleteDAO<UUID> {

	private final NamedParameterJdbcTemplate jdbcTemplate;
	private final LocationQuery query;
	private final LocationRowMapper rowMapper;

	public LocationDAO(NamedParameterJdbcTemplate jdbcTemplate, LocationQuery query, LocationRowMapper locationMapper) {
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
		paramSource.addValue("address", location.getAddress());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	@Override
	public Location selectByID(UUID locationID) {
		String sql = query.SELECT_BY_ID;

		MapSqlParameterSource paramSource = new MapSqlParameterSource("locationID", locationID);

		return jdbcTemplate.query(sql, paramSource, rowMapper).stream().findFirst().get();
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
		paramSource.addValue("address", location.getAddress());

		return jdbcTemplate.queryForObject(sql, paramSource, rowMapper);
	}

	public boolean checkForDuplicate(String name, String plusCode, String address) {
		String sql = query.EXISTS_CHECK_FOR_DUPLICATE;

		MapSqlParameterSource paramSource = new MapSqlParameterSource();
		paramSource.addValue("name", name);
		paramSource.addValue("plusCode", plusCode);
		paramSource.addValue("address", address);

		return jdbcTemplate.queryForObject(sql, paramSource, Boolean.class);
	}
}
