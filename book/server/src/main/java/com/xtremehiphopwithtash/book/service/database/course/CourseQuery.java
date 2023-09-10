package com.xtremehiphopwithtash.book.service.database.course;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class CourseQuery {

	private final SQLUtil sqlUtil = new SQLUtil("course", SQLColumnNames.join(SQLColumnNames.COURSE, "course"));

	final String SELECT = sqlUtil.read("select");

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String INSERT = sqlUtil.read("insert");

	final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String EXISTS_BY_NAME = sqlUtil.read("exists-by-name");

	final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	final String SELECT_BY_INSTRUCTOR_ID = sqlUtil.read("select-by-instructor-id");

	final String SELECT_BY_LOCATION_ID = sqlUtil.read("select-by-location-id");
}
