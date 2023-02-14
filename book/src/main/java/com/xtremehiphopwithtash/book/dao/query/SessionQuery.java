package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import com.xtremehiphopwithtash.book.dao.util.SQLTableNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class SessionQuery {

	public final String SELECT = String.format(
		"SELECT %s FROM session",
		SQLColumnNamesUtil.join(SQLColumnNamesUtil.SESSION, SQLTableNamesUtil.SESSION)
	);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM session WHERE session_id = :sessionID",
		SQLColumnNamesUtil.join(SQLColumnNamesUtil.SESSION, SQLTableNamesUtil.SESSION)
	);

	public final String INSERT = String.format(
		"""
			INSERT INTO session
				(title, notes, location_id, price, capacity, start_time, end_time, course_id, equipment_available)
			VALUES
				(:title, :notes, :locationID, :price, :capacity, :startTime, :endTime, :courseID, :equipmentAvailable)
			RETURNING
				%s;
		""",
		SQLColumnNamesUtil.join(SQLColumnNamesUtil.SESSION, SQLTableNamesUtil.SESSION)
	);

	public final String UPDATE_BY_ID = String.format(
		"""
			UPDATE
				session
			SET
				title = :title,
				notes = :notes,
				location_id = :locationID,
				price = :price,
				capacity = :capacity,
				start_time = :startTime,
				end_time = :endTime,
				course_id = :courseID,
				equipment_available = :equipmentAvailable
			WHERE
				session_id = :sessionID
			RETURNING
				%s;
		""",
		SQLColumnNamesUtil.join(SQLColumnNamesUtil.SESSION, SQLTableNamesUtil.SESSION)
	);

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM session WHERE session_id = :sessionID);";

	public final String DELETE_BY_ID = "DELETE FROM session WHERE session_id = :sessionID;";
}
