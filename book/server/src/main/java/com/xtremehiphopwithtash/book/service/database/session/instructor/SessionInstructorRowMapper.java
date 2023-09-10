package com.xtremehiphopwithtash.book.service.database.session.instructor;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class SessionInstructorRowMapper implements RowMapper<SessionInstructor> {

	private final MapRowUtil mapRowUtil;

	public SessionInstructorRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public SessionInstructor mapRow(ResultSet rs, int rowNum) throws SQLException {
		SessionInstructor si = new SessionInstructor();

		si.setSessionID(mapRowUtil.mapUUID(rs, "session_id"));
		si.setIndex(rs.getShort("index"));

		si.setInstructorID(mapRowUtil.mapUUID(rs, "instructor_id"));

		si.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return si;
	}
}
