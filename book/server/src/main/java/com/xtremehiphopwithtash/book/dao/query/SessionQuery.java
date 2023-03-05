package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import com.xtremehiphopwithtash.book.dao.util.SQLTableNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class SessionQuery {

	private final String columnNames = SQLColumnNamesUtil.join(
		SQLColumnNamesUtil.SESSION,
		SQLTableNamesUtil.SESSION
	);

	public final String SELECT = String.format("SELECT %s FROM session;", columnNames);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM session WHERE session_id = :sessionID;",
		columnNames
	);

	public final String INSERT = String.format(
		"""
			INSERT INTO session
				(title, notes, price, start_time, end_time, capacity, equipment_available, course_id, location_id)
			VALUES
				(:title, :notes, :price, :startTime, :endTime, :capacity, :equipmentAvailable, :courseID, :locationID)
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String UPDATE_BY_ID = String.format(
		"""
			UPDATE
				session
			SET
				title = :title,
				notes = :notes,
				price = :price,
				start_time = :startTime,
				end_time = :endTime,
				capacity = :capacity,
				equipment_available = :equipmentAvailable,
				course_id = :courseID,
				location_id = :locationID
			WHERE
				session_id = :sessionID
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM session WHERE session_id = :sessionID);";

	public final String DELETE_BY_ID = "DELETE FROM session WHERE session_id = :sessionID;";

	public final String SELECT_BY_COURSE_ID = String.format(
		"""
			SELECT
				%s
			FROM
				session
			WHERE
				course_id = :courseID;
		""",
		columnNames
	);

	public final String SELECT_BY_INSTRUCTOR_ID = String.format(
		"""
			SELECT
				%s
			FROM
				session
			JOIN
				session_instructor
					ON session.session_id = session_instructor.course_id
			WHERE
				session_instructor.instructor_id = :instructorID;
		""",
		columnNames
	);

	public final String SELECT_BY_LOCATION_ID = String.format(
		"""
			SELECT
				%s
			FROM
				session
			WHERE
				location_id = :locationID;
		""",
		columnNames
	);

	public final String SELECT_SESSIONS_IN_TIME_PERIOD = String.format(
		"""
			SELECT
				%s
			FROM
				session
			WHERE
				start_time < :endTime AND
				end_time > :startTime;
		""",
		columnNames
	);

	public final String SELECT_SESSIONS_IN_TIME_PERIOD_AND_COURSE_ID = String.format(
		"""
			SELECT
				%s
			FROM
				session
			WHERE
				start_time < :endTime AND
				end_time > :startTime AND
				course_id = :courseID;
		""",
		columnNames
	);
}
