package com.xtremehiphopwithtash.book.service.database.student;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class StudentRowMapper implements RowMapper<Student> {

	private final MapRowUtil mapRowUtil;

	public StudentRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public Student mapRow(ResultSet rs, int rowNum) throws SQLException {
		Student s = new Student();

		s.setStudentID(rs.getString("student_id"));

		s.setDetailsID(mapRowUtil.mapUUID(rs, "details_id"));
		s.setStripeCustomerID(rs.getString("stripe_customer_id"));

		s.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return s;
	}
}
