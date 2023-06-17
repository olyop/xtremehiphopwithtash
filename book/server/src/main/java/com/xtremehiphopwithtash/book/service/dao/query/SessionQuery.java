package com.xtremehiphopwithtash.book.service.dao.query;

import com.xtremehiphopwithtash.book.service.dao.util.SQLColumnNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class SessionQuery {

	private final String columnNames = SQLColumnNamesUtil.join(SQLColumnNamesUtil.SESSION, "session");

	public final String SELECT = String.format("SELECT %s FROM session;", columnNames);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM session WHERE session_id = :sessionID;",
		columnNames
	);

	public final String INSERT = String.format(
		"""
		INSERT INTO session (
			title,
			notes,
			price,
			equipment_fee,
			start_time,
			end_time,
			capacity_available,
			equipment_available,
			course_id,
			location_id
		) VALUES (
			:title,
			:notes,
			:price,
			:equipmentFee,
			:startTime,
			:endTime,
			:capacityAvailable,
			:equipmentAvailable,
			:courseID,
			:locationID
		) RETURNING
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
				equipment_fee = :equipmentFee,
				start_time = :startTime,
				end_time = :endTime,
				capacity_available = :capacityAvailable,
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

	public final String EXISTS_BY_ID = "SELECT EXISTS (SELECT 1 FROM session WHERE session_id = :sessionID);";

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
					ON session.session_id = session_instructor.session_id
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
				end_time > :startTime
			ORDER BY
				start_time ASC;
		""",
		columnNames
	);

	public final String SELECT_SESSIONS_IN_TIME_PERIOD_EXCLUDE_SESSION = String.format(
		"""
			SELECT
				%s
			FROM
				session
			WHERE
				start_time < :endTime AND
				end_time > :startTime AND
				session_id != :sessionID
			ORDER BY
				start_time ASC;
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
				course_id = :courseID
			ORDER BY
				start_time ASC;
		""",
		columnNames
	);

	public final String SELECT_EQUIPMENT_LEFT_BY_SESSION_ID =
		"""
		SELECT
			equipment_available
		FROM
			session
		WHERE
			session_id = :sessionID;
	""";
}
