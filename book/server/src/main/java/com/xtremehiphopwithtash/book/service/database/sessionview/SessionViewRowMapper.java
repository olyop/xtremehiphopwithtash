package com.xtremehiphopwithtash.book.service.database.sessionview;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class SessionViewRowMapper implements RowMapper<SessionView> {

	private final MapRowUtil mapRowUtil;

	public SessionViewRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public SessionView mapRow(ResultSet rs, int rowNum) throws SQLException {
		SessionView sv = new SessionView();

		sv.setSessionID(mapRowUtil.mapUUID(rs, "session_id"));
		sv.setStudentID(rs.getString("student_id"));

		sv.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return sv;
	}
}
