package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class CourseDefaultInstructorQuery {

	private final SQLUtil sqlUtil = new SQLUtil(
		"course-default-instructor",
		SQLColumnNames.join(SQLColumnNames.COURSE_DEFAULT_INSTRUCTOR, "course_default_instructor")
	);

	public final String SELECT = sqlUtil.read("select");

	public final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	public final String INSERT = sqlUtil.read("insert");

	public final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	public final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	public final String DELETE_BY_COURSE_ID = sqlUtil.read("delete-by-course-id");

	public final String SELECT_BY_COURSE_ID = sqlUtil.read("select-by-course-id");
}
