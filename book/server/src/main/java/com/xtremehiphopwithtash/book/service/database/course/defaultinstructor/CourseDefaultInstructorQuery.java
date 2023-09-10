package com.xtremehiphopwithtash.book.service.database.course.defaultinstructor;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class CourseDefaultInstructorQuery {

	private final SQLUtil sqlUtil = new SQLUtil(
		"coursedefaultinstructor",
		SQLColumnNames.join(SQLColumnNames.COURSE_DEFAULT_INSTRUCTOR, "course_default_instructor")
	);

	final String SELECT = sqlUtil.read("select");

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String INSERT = sqlUtil.read("insert");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	final String DELETE_BY_COURSE_ID = sqlUtil.read("delete-by-course-id");

	final String SELECT_BY_COURSE_ID = sqlUtil.read("select-by-course-id");
}
