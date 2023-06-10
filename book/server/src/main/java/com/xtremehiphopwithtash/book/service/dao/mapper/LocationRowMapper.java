package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.model.Location;
import com.xtremehiphopwithtash.book.service.dao.util.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

@Component
public class LocationRowMapper implements RowMapper<Location> {

	@Override
	public Location mapRow(ResultSet rs, int rowNum) throws SQLException {
		Location location = new Location();

		location.setLocationID(MapRowUtil.mapUUID(rs.getString("location_id")));

		location.setName(rs.getString("name"));
		location.setPlusCode(rs.getString("plus_code"));
		location.setAddress(rs.getString("address"));

		location.setCreatedAt(MapRowUtil.mapInstant(rs.getInt("created_at")));

		return location;
	}
}
