package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.model.Course;
import com.xtremehiphopwithtash.book.service.dao.util.MapRowUtil;
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

		course.setCourseID(MapRowUtil.mapUUID(rs.getString("course_id")));

		course.setName(rs.getString("name"));
		course.setDescription(rs.getString("description"));
		course.setPhoto(MapRowUtil.mapURL(rs.getString("photo")));
		course.setDefaultPrice(MapRowUtil.mapInteger(rs.getInt("default_price")));
		course.setDefaultEquipmentFee(MapRowUtil.mapInteger(rs.getInt("default_equipment_fee")));
		course.setDefaultDuration(rs.getInt("default_duration"));
		course.setDefaultCapacityAvailable(rs.getInt("default_capacity_available"));
		course.setDefaultEquipmentAvailable(
			MapRowUtil.mapInteger(rs.getInt("default_equipment_available"))
		);
		course.setDefaultLocationID(MapRowUtil.mapUUID(rs.getString("default_location_id")));

		course.setCreatedAt(MapRowUtil.mapInstant(rs.getInt("created_at")));

		return course;
	}
}
