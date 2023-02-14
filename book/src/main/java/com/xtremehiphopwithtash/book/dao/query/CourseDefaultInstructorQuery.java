package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import com.xtremehiphopwithtash.book.dao.util.SQLTableNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class CourseDefaultInstructorQuery {

	public final String SELECT = String.format(
		"SELECT %s FROM course_default_instructor;",
		SQLColumnNamesUtil.join(
			SQLColumnNamesUtil.COURSE_DEFAULT_INSTRUCTOR,
			SQLTableNamesUtil.COURSE_DEFAULT_INSTRUCTOR
		)
	);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM course_default_instructor WHERE course_id = :courseID AND index = :index;",
		SQLColumnNamesUtil.join(
			SQLColumnNamesUtil.COURSE_DEFAULT_INSTRUCTOR,
			SQLTableNamesUtil.COURSE_DEFAULT_INSTRUCTOR
		)
	);

	public final String INSERT = String.format(
		"INSERT INTO course_default_instructor (course_id, index, instructor_id) VALUES (:courseID, :index, :instructorID) RETURNING %s;",
		SQLColumnNamesUtil.join(
			SQLColumnNamesUtil.COURSE_DEFAULT_INSTRUCTOR,
			SQLTableNamesUtil.COURSE_DEFAULT_INSTRUCTOR
		)
	);

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM course_default_instructor WHERE course_id = :courseID AND index = :index);";

	public final String DELETE_BY_ID =
		"DELETE FROM course_default_instructor WHERE course_id = :courseID AND index = :index;";
}
