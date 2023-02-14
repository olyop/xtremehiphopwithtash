package com.xtremehiphopwithtash.book.model;

import java.util.UUID;

public class CourseDefaultInstructor extends BaseModel {

	private UUID courseID;
	private Short index;
	private UUID instructorID;

	public CourseDefaultInstructor() {}

	public UUID getCourseID() {
		return courseID;
	}

	public void setCourseID(UUID courseID) {
		this.courseID = courseID;
	}

	public Short getIndex() {
		return index;
	}

	public void setIndex(Short index) {
		this.index = index;
	}

	public UUID getInstructorID() {
		return instructorID;
	}

	public void setInstructorID(UUID instructorID) {
		this.instructorID = instructorID;
	}
}
