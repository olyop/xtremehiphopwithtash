package com.xtremehiphopwithtash.book.service.database.review;

import com.xtremehiphopwithtash.book.other.LikertScale;
import com.xtremehiphopwithtash.book.service.helpers.BaseModel;
import java.util.UUID;

public class Review extends BaseModel {

	private UUID reviewID;
	private LikertScale score;
	private String comment;
	private UUID courseID;
	private UUID studentID;

	public Review() {}

	public UUID getReviewID() {
		return reviewID;
	}

	public void setReviewID(UUID reviewID) {
		this.reviewID = reviewID;
	}

	public LikertScale getScore() {
		return score;
	}

	public void setScore(LikertScale score) {
		this.score = score;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public UUID getCourseID() {
		return courseID;
	}

	public void setCourseID(UUID courseID) {
		this.courseID = courseID;
	}

	public UUID getStudentID() {
		return studentID;
	}

	public void setStudentID(UUID studentID) {
		this.studentID = studentID;
	}
}
