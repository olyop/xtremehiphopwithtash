package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.model.Instructor;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class InstructorRowMapper implements RowMapper<Instructor> {

	@Override
	@Nullable
	public Instructor mapRow(ResultSet rs, int rowNum) throws SQLException {
		Instructor instructor = new Instructor();

		instructor.setInstructorID(MapRowUtil.mapToUUID(rs.getString("instructor_id")));

		instructor.setDetailsID(MapRowUtil.mapToUUID(rs.getString("details_id")));
		instructor.setPhoto(MapRowUtil.mapToURL(rs.getString("photo")));

		instructor.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return instructor;
	}
}
