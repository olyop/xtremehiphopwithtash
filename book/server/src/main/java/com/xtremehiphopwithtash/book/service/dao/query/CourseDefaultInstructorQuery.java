package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class CourseDefaultInstructorQuery {

	private final String columnNames = SQLColumnNamesUtil.join(
		SQLColumnNamesUtil.COURSE_DEFAULT_INSTRUCTOR,
		"course_default_instructor"
	);

	public final String SELECT = String.format("SELECT %s FROM course_default_instructor;", columnNames);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM course_default_instructor WHERE course_id = :courseID AND index = :index;",
		columnNames
	);

	public final String INSERT = String.format(
		"INSERT INTO course_default_instructor (course_id, index, instructor_id) VALUES (:courseID, :index, :instructorID) RETURNING %s;",
		columnNames
	);

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM course_default_instructor WHERE course_id = :courseID AND index = :index);";

	public final String DELETE_BY_ID =
		"DELETE FROM course_default_instructor WHERE course_id = :courseID AND index = :index;";

	public final String DELETE_BY_COURSE_ID = "DELETE FROM course_default_instructor WHERE course_id = :courseID;";

	public final String SELECT_BY_COURSE_ID = String.format(
		"SELECT %s FROM course_default_instructor WHERE course_id = :courseID;",
		columnNames
	);
}
