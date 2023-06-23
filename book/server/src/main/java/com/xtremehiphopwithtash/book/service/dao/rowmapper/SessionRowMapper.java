package com.xtremehiphopwithtash.book.service.dao.rowmapper;

import com.xtremehiphopwithtash.book.model.Session;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class SessionRowMapper implements RowMapper<Session> {

	@Override
	@Nullable
	public Session mapRow(ResultSet rs, int rowNum) throws SQLException {
		Session session = new Session();

		session.setSessionID(MapRowUtil.mapUUID(rs.getString("session_id")));
		session.setTitle(rs.getString("title"));
		session.setNotes(rs.getString("notes"));
		session.setPrice(MapRowUtil.mapInteger(rs.getInt("price")));
		session.setEquipmentFee(MapRowUtil.mapInteger(rs.getInt("equipment_fee")));
		session.setStartTime(MapRowUtil.mapInstant(rs.getInt("start_time")));
		session.setEndTime(MapRowUtil.mapInstant(rs.getInt("end_time")));
		session.setCapacityAvailable(rs.getInt("capacity_available"));
		session.setEquipmentAvailable(MapRowUtil.mapInteger(rs.getInt("equipment_available")));
		session.setCourseID(MapRowUtil.mapUUID(rs.getString("course_id")));
		session.setLocationID(MapRowUtil.mapUUID(rs.getString("location_id")));
		session.setCreatedAt(MapRowUtil.mapInstant(rs.getInt("created_at")));
		session.setCancelled(rs.getBoolean("is_cancelled"));

		return session;
	}
}
