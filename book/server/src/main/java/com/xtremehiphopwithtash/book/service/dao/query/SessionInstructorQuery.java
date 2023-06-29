package com.xtremehiphopwithtash.book.service.dao.query;

import org.springframework.stereotype.Component;

@Component
public class SessionInstructorQuery {

	private final SQLUtil sqlUtil = new SQLUtil(
		"session-instructor",
		SQLColumnNames.join(SQLColumnNames.SESSION_INSTRUCTOR, "session_instructor")
	);

	public final String SELECT = sqlUtil.read("select");

	public final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	public final String INSERT = sqlUtil.read("insert");

	public final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	public final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	public final String DELETE_BY_SESSION_ID = sqlUtil.read("delete-by-session-id");
}
