package com.xtremehiphopwithtash.book.dao.mapper;

import com.xtremehiphopwithtash.book.model.SessionInstructor;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class SessionInstructorRowMapper implements RowMapper<SessionInstructor> {

	@Override
	@Nullable
	public SessionInstructor mapRow(ResultSet rs, int rowNum) throws SQLException {
		SessionInstructor sessionInstructor = new SessionInstructor();

		sessionInstructor.setSessionID(MapRowUtil.mapToUUID(rs.getString("session_id")));
		sessionInstructor.setIndex(rs.getShort("index"));
		sessionInstructor.setInstructorID(MapRowUtil.mapToUUID(rs.getString("instructor_id")));
		sessionInstructor.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return sessionInstructor;
	}
}
