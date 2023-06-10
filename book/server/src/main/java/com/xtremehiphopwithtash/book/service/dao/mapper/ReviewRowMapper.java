package com.xtremehiphopwithtash.book.service.dao.mapper;

import com.xtremehiphopwithtash.book.model.Review;
import com.xtremehiphopwithtash.book.service.dao.util.MapRowUtil;
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

		review.setReviewID(MapRowUtil.mapUUID(rs.getString("review_id")));

		review.setScore(MapRowUtil.mapLikertScale(rs.getInt("score")));
		review.setComment(rs.getString("comment"));
		review.setCourseID(MapRowUtil.mapUUID(rs.getString("course_id")));
		review.setStudentID(MapRowUtil.mapUUID(rs.getString("student_id")));

		review.setCreatedAt(MapRowUtil.mapInstant(rs.getInt("created_at")));

		return review;
	}
}
