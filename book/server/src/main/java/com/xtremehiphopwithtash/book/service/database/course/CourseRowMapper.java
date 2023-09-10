package com.xtremehiphopwithtash.book.service.database.course;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class CourseRowMapper implements RowMapper<Course> {

	private final MapRowUtil mapRowUtil;

	public CourseRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public Course mapRow(ResultSet rs, int rowNum) throws SQLException {
		Course course = new Course();

		course.setCourseID(mapRowUtil.mapUUID(rs, "course_id"));

		course.setName(rs.getString("name"));
		course.setDescription(rs.getString("description"));
		course.setPhoto(mapRowUtil.mapURL(rs, "photo"));
		course.setDefaultPrice(mapRowUtil.mapInteger(rs, "default_price"));
		course.setDefaultEquipmentFee(mapRowUtil.mapInteger(rs, "default_equipment_fee"));
		course.setDefaultDuration(rs.getInt("default_duration"));
		course.setDefaultCapacityAvailable(rs.getInt("default_capacity_available"));
		course.setDefaultEquipmentAvailable(mapRowUtil.mapInteger(rs, "default_equipment_available"));
		course.setDefaultLocationID(mapRowUtil.mapUUID(rs, "default_location_id"));

		course.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return course;
	}
}
