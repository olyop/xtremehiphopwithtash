package com.xtremehiphopwithtash.book.dao.mapper;

import com.xtremehiphopwithtash.book.model.Review;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;

@Component
public class ReviewRowMapper implements RowMapper<Review> {

	@Override
	@Nullable
	public Review mapRow(ResultSet rs, int rowNum) throws SQLException {
		Review review = new Review();

		review.setReviewID(MapRowUtil.mapToUUID(rs.getString("review_id")));
		review.setScore(MapRowUtil.mapToLikertScale(rs.getInt("rating")));
		review.setComment(rs.getString("comment"));
		review.setCourseID(MapRowUtil.mapToUUID(rs.getString("course_id")));
		review.setStudentID(MapRowUtil.mapToUUID(rs.getString("student_id")));
		review.setCreatedAt(MapRowUtil.mapToInstant(rs.getInt("created_at")));

		return review;
	}
}
