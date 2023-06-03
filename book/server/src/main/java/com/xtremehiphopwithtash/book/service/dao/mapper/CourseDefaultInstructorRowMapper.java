package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.model.CourseDefaultInstructor;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class CourseDefaultInstructorRowMapper implements RowMapper<CourseDefaultInstructor> {

	@Override
	@Nullable
	public CourseDefaultInstructor mapRow(ResultSet rs, int rowNum) throws SQLException {
		CourseDefaultInstructor courseDefaultInstructor = new CourseDefaultInstructor();

		courseDefaultInstructor.setCourseID(MapRowUtil.mapToUUID(rs.getString("course_id")));
		courseDefaultInstructor.setIndex(rs.getShort("index"));

		courseDefaultInstructor.setInstructorID(MapRowUtil.mapToUUID(rs.getString("instructor_id")));

		courseDefaultInstructor.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return courseDefaultInstructor;
	}
}
