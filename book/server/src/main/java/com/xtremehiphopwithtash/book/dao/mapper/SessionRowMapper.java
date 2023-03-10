package com.xtremehiphopwithtash.book.dao.mapper;

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

		session.setSessionID(MapRowUtil.mapToUUID(rs.getString("session_id")));
		session.setTitle(rs.getString("title"));
		session.setNotes(rs.getString("notes"));
		session.setPrice(rs.getShort("price"));
		session.setStartTime(MapRowUtil.mapToInstant(rs.getInt("start_time")));
		session.setEndTime(MapRowUtil.mapToInstant(rs.getInt("end_time")));
		session.setCapacity(rs.getShort("capacity"));
		session.setEquipmentAvailable(rs.getShort("equipment_available"));
		session.setCourseID(MapRowUtil.mapToUUID(rs.getString("course_id")));
		session.setLocationID(MapRowUtil.mapToUUID(rs.getString("location_id")));
		session.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return session;
	}
}
