package com.xtremehiphopwithtash.book.service.database.course.defaultinstructor;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class CourseDefaultInstructorRowMapper implements RowMapper<CourseDefaultInstructor> {

	private final MapRowUtil mapRowUtil;

	public CourseDefaultInstructorRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public CourseDefaultInstructor mapRow(ResultSet rs, int rowNum) throws SQLException {
		CourseDefaultInstructor cdi = new CourseDefaultInstructor();

		cdi.setCourseID(mapRowUtil.mapUUID(rs, "course_id"));
		cdi.setIndex(rs.getShort("index"));

		cdi.setInstructorID(mapRowUtil.mapUUID(rs, "instructor_id"));

		cdi.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return cdi;
	}
}
