package com.xtremehiphopwithtash.book.service.database.review;

import com.xtremehiphopwithtash.book.service.helpers.MapRowUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

@Service
class ReviewRowMapper implements RowMapper<Review> {

	private final MapRowUtil mapRowUtil;

	public ReviewRowMapper(MapRowUtil mapRowUtil) {
		this.mapRowUtil = mapRowUtil;
	}

	@Override
	public Review mapRow(ResultSet rs, int rowNum) throws SQLException {
		Review r = new Review();

		r.setReviewID(mapRowUtil.mapUUID(rs, "review_id"));

		r.setScore(mapRowUtil.mapLikertScale(rs, "score"));
		r.setComment(rs.getString("comment"));
		r.setCourseID(mapRowUtil.mapUUID(rs, "course_id"));
		r.setStudentID(mapRowUtil.mapUUID(rs, "student_id"));

		r.setCreatedAt(mapRowUtil.mapInstant(rs, "created_at"));

		return r;
	}
}
