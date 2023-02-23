package com.xtremehiphopwithtash.book.dao.mapper;

import com.xtremehiphopwithtash.book.model.Student;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class StudentRowMapper implements RowMapper<Student> {

	@Override
	@Nullable
	public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
		Student student = new Student();

		student.setStudentID(rs.getString("student_id"));

		student.setDetailsID(MapRowUtil.mapToUUID(rs.getString("details_id")));

		student.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return student;
	}
}
