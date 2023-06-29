package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class CourseQuery {

	private final SQLUtil sqlUtil = new SQLUtil("course", SQLColumnNames.join(SQLColumnNames.COURSE, "course"));

	public final String SELECT = sqlUtil.read("select");

	public final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	public final String INSERT = sqlUtil.read("insert");

	public final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	public final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	public final String EXISTS_BY_NAME = sqlUtil.read("exists-by-name");

	public final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	public final String SELECT_BY_INSTRUCTOR_ID = sqlUtil.read("select-by-instructor-id");

	public final String SELECT_BY_LOCATION_ID = sqlUtil.read("select-by-location-id");
}
