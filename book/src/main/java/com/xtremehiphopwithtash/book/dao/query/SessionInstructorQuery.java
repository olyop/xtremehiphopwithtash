package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import com.xtremehiphopwithtash.book.dao.util.SQLTableNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class SessionInstructorQuery {

	private final String columnNames = SQLColumnNamesUtil.join(
		SQLColumnNamesUtil.SESSION_INSTRUCTOR,
		SQLTableNamesUtil.SESSION_INSTRUCTOR
	);

	public final String SELECT = String.format("SELECT %s FROM session_instructor;", columnNames);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM session_instructor WHERE session_id = :sessionID AND index = :index;",
		columnNames
	);

	public final String INSERT = String.format(
		"""
			INSERT INTO session_instructor
				(session_id, index, instructor_id)
			VALUES
				(:sessionID, :index, :instructorID)
			RETURNING
				%s
		""",
		columnNames
	);

	public final String DELETE_BY_ID =
		"DELETE FROM session_instructor WHERE session_id = :sessionID AND index = :index;";

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM session_instructor WHERE session_id = :sessionID AND index = :index);";

	public final String DELETE_BY_SESSION_ID =
		"DELETE FROM session_instructor WHERE session_id = :sessionID;";
}
