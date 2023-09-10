package com.xtremehiphopwithtash.book.service.database.session.instructor;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class SessionInstructorQuery {

	private final SQLUtil sqlUtil = new SQLUtil(
		"sessioninstructor",
		SQLColumnNames.join(SQLColumnNames.SESSION_INSTRUCTOR, "session_instructor")
	);

	final String SELECT = sqlUtil.read("select");

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String INSERT = sqlUtil.read("insert");

	final String DELETE_BY_ID = sqlUtil.read("delete-by-id");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String DELETE_BY_SESSION_ID = sqlUtil.read("delete-by-session-id");
}
