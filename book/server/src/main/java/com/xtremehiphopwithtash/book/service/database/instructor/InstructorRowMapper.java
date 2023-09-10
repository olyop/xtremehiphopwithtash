package com.xtremehiphopwithtash.book.service.database.instructor;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class InstructorRowMapper implements RowMapper<Instructor> {

	private final MapRowUtil mapRowUtil;

	public InstructorRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public Instructor mapRow(ResultSet rs, int rowNum) throws SQLException {
		Instructor i = new Instructor();

		i.setInstructorID(mapRowUtil.mapUUID(rs, "instructor_id"));

		i.setDetailsID(mapRowUtil.mapUUID(rs, "details_id"));
		i.setPhoto(mapRowUtil.mapURL(rs, "photo"));

		i.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return i;
	}
}
