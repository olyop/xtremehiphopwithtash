package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.model.Student;
import com.xtremehiphopwithtash.book.service.dao.util.MapRowUtil;
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

		student.setDetailsID(MapRowUtil.mapUUID(rs.getString("details_id")));
		student.setStripeCustomerID(rs.getString("stripe_customer_id"));

		student.setCreatedAt(MapRowUtil.mapInstant(rs.getInt("created_at")));

		return student;
	}
}
