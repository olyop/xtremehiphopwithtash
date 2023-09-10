package com.xtremehiphopwithtash.book.service.database.instructor;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class InstructorQuery {

	private final SQLUtil sqlUtil = new SQLUtil(
		"instructor",
		SQLColumnNames.join(SQLColumnNames.INSTRUCTOR, "instructor")
	);

	final String SELECT = sqlUtil.read("select");

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String INSERT = sqlUtil.read("insert");

	final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	final String SELECT_COURSE_DEFAULT_INSTRUCTORS = sqlUtil.read("select-course-default-instructors");

	final String SELECT_SESSION_INSTRUCTORS = sqlUtil.read("select-session-instructors");
}
