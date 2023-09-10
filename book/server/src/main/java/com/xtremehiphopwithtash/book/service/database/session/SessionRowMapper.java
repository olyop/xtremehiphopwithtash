package com.xtremehiphopwithtash.book.service.database.session;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class SessionRowMapper implements RowMapper<Session> {

	private final MapRowUtil mapRowUtil;

	public SessionRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public Session mapRow(ResultSet rs, int rowNum) throws SQLException {
		Session s = new Session();

		s.setSessionID(mapRowUtil.mapUUID(rs, "session_id"));

		s.setTitle(rs.getString("title"));
		s.setNotes(rs.getString("notes"));
		s.setPrice(mapRowUtil.mapInteger(rs, "price"));
		s.setEquipmentFee(mapRowUtil.mapInteger(rs, "equipment_fee"));
		s.setStartTime(mapRowUtil.mapInstant(rs, "start_time"));
		s.setEndTime(mapRowUtil.mapInstant(rs, "end_time"));
		s.setCapacityAvailable(rs.getInt("capacity_available"));
		s.setEquipmentAvailable(mapRowUtil.mapInteger(rs, "equipment_available"));
		s.setCourseID(mapRowUtil.mapUUID(rs, "course_id"));
		s.setLocationID(mapRowUtil.mapUUID(rs, "location_id"));
		s.setCancelled(rs.getBoolean("is_cancelled"));

		s.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return s;
	}
}
