package com.xtremehiphopwithtash.book.dao.mapper;

import com.xtremehiphopwithtash.book.model.Location;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class LocationRowMapper implements RowMapper<Location> {

	@Override
	public Location mapRow(ResultSet rs, int rowNum) throws SQLException {
		Location location = new Location();

		location.setLocationID(MapRowUtil.mapToUUID(rs.getString("location_id")));

		location.setName(rs.getString("name"));
		location.setPlusCode(rs.getString("plus_code"));

		location.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return location;
	}
}
