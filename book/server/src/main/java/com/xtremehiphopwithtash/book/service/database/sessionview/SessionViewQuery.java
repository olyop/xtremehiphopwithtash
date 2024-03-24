package com.xtremehiphopwithtash.book.service.database.sessionview;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
public class SessionViewQuery {

	private final SQLUtil sqlUtil = new SQLUtil(
		"sessionview",
		SQLColumnNames.join(SQLColumnNames.SESSION_VIEW, "session_view")
	);

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String INSERT = sqlUtil.read("insert");

	final String SELECT_COUNT_BY_SESSION_ID = sqlUtil.read("select-count-by-session-id");

	final String SELECT_BY_SESSION_ID = sqlUtil.read("select-by-session-id");

	final String DELETE_BY_SESSION_ID = sqlUtil.read("delete-by-session-id");
}
