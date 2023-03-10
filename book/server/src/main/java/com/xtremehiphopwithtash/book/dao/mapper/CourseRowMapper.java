package com.xtremehiphopwithtash.book.dao.mapper;

import com.xtremehiphopwithtash.book.model.Course;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class CourseRowMapper implements RowMapper<Course> {

	@Override
	@Nullable
	public Course mapRow(ResultSet rs, int rowNum) throws SQLException {
		Course course = new Course();

		course.setCourseID(MapRowUtil.mapToUUID(rs.getString("course_id")));

		course.setName(rs.getString("name"));
		course.setDescription(rs.getString("description"));
		course.setPhoto(MapRowUtil.mapToURL(rs.getString("photo")));
		course.setDefaultPrice(MapRowUtil.mapToPrice(rs.getShort("default_price")));
		course.setDefaultDuration(rs.getShort("default_duration"));
		course.setDefaultCapacity(rs.getShort("default_capacity"));
		course.setDefaultEquipmentAvailable(rs.getShort("default_equipment_available"));
		course.setDefaultLocationID(MapRowUtil.mapToUUID(rs.getString("default_location_id")));

		course.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return course;
	}
}
