package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import com.xtremehiphopwithtash.book.dao.util.SQLTableNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class InstructorQuery {

	private final String columnNames = SQLColumnNamesUtil.join(
		SQLColumnNamesUtil.INSTRUCTOR,
		SQLTableNamesUtil.INSTRUCTOR
	);

	public final String SELECT = String.format(
		"SELECT %s FROM instructor ORDER BY instructor.created_at DESC;",
		columnNames
	);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM instructor WHERE instructor_id = :instructorID;",
		columnNames
	);

	public final String INSERT = String.format(
		"INSERT INTO instructor (details_id, photo) VALUES (:detailsID, :photo) RETURNING %s;",
		columnNames
	);

	public final String UPDATE_BY_ID = String.format(
		"UPDATE instructor SET photo = :photo WHERE instructor_id = :instructorID RETURNING %s;",
		columnNames
	);

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM instructor WHERE instructor_id = :instructorID);";

	public final String DELETE_BY_ID = "DELETE FROM instructor WHERE instructor_id = :instructorID;";

	public final String SELECT_COURSE_DEFAULT_INSTRUCTORS = String.format(
		"""
			SELECT
				%s
			FROM
				instructor
			JOIN
				course_default_instructor
			ON
				instructor.instructor_id = course_default_instructor.instructor_id
			WHERE
				course_default_instructor.course_id = :courseID;
		""",
		columnNames
	);

	public final String SELECT_SESSION_INSTRUCTORS = String.format(
		"""
			SELECT
				%s
			FROM
				instructor
			JOIN
				session_instructor
			ON
				instructor.instructor_id = session_instructor.instructor_id
			WHERE
				session_instructor.session_id = :sessionID;
		""",
		columnNames
	);
}
