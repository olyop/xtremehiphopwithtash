package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class InstructorQuery {

	private final SQLUtil sqlUtil = new SQLUtil(
		"instructor",
		SQLColumnNames.join(SQLColumnNames.INSTRUCTOR, "instructor")
	);

	public final String SELECT = sqlUtil.read("select");

	public final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	public final String INSERT = sqlUtil.read("insert");

	public final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	public final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	public final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	public final String SELECT_COURSE_DEFAULT_INSTRUCTORS = sqlUtil.read("select-course-default-instructors");

	public final String SELECT_SESSION_INSTRUCTORS = sqlUtil.read("select-session-instructors");
}
