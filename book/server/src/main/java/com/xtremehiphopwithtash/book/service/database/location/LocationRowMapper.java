package com.xtremehiphopwithtash.book.service.database.location;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
class LocationRowMapper implements RowMapper<Location> {

	private final MapRowUtil mapRowUtil;

	public LocationRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public Location mapRow(ResultSet rs, int rowNum) throws SQLException {
		Location l = new Location();

		l.setLocationID(mapRowUtil.mapUUID(rs, "location_id"));

		l.setName(rs.getString("name"));
		l.setPlusCode(rs.getString("plus_code"));
		l.setAddress(rs.getString("address"));

		l.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return l;
	}
}
