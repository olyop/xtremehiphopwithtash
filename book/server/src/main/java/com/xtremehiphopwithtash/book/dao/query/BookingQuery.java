package com.xtremehiphopwithtash.book.dao.query;

import com.xtremehiphopwithtash.book.dao.util.SQLColumnNamesUtil;
import org.springframework.stereotype.Component;

@Component
public class BookingQuery {

	private final String columnNames = SQLColumnNamesUtil.join(SQLColumnNamesUtil.BOOKING, "booking");

	public final String SELECT = String.format("SELECT %s FROM booking;", columnNames);

	public final String SELECT_BY_ID = String.format(
		"SELECT %s FROM booking WHERE booking_id = :bookingID;",
		columnNames
	);

	public final String INSERT = String.format(
		"""
			INSERT INTO booking
				(notes, is_bringing_own_equipment, session_id, student_id)
			VALUES
				(:notes, :isBringingOwnEquipment, :sessionID, :studentID)
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String UPDATE_BY_ID = String.format(
		"""
			UPDATE
				booking
			SET
				notes = :notes,
				is_bringing_own_equipment = :isBringingOwnEquipment,
				session_id = :sessionID,
				student_id = :studentID
			WHERE
				booking_id = :bookingID
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String EXISTS_BY_ID =
		"SELECT EXISTS (SELECT 1 FROM booking WHERE booking_id = :bookingID);";

	public final String DELETE_BY_ID = "DELETE FROM booking WHERE booking_id = :bookingID;";

	public final String SELECT_COUNT_BY_SESSION_ID = String.format(
		"SELECT count(*) FROM booking WHERE session_id = :sessionID;",
		columnNames
	);

	public final String SELECT_COUNT_BY_SESSION_ID_AND_BRINGING_OWN_EQUIPMENT =
		"""
			SELECT
				count(*)
			FROM
				booking
			WHERE
				session_id = :sessionID
				AND is_bringing_own_equipment = TRUE;
		""";

	public final String SELECT_BY_SESSION_ID = String.format(
		"""
			SELECT
				%s
			FROM
				booking
			WHERE
				session_id = :sessionID;
		""",
		columnNames
	);

	public final String SELECT_CAPACITY_BY_SESSION_ID =
		"""
			SELECT
				(SELECT capacity FROM session WHERE session_id = :sessionID) -
				(SELECT count(*) FROM booking	WHERE session_id = :sessionID) AS capacity_available
					""";

	public final String SELECT_BOOKINGS_BY_STUDENT_ID = String.format(
		"""
			SELECT
				%s
			FROM
				booking
			WHERE
				student_id = :studentID;
		""",
		columnNames
	);

	public final String EXISTS_BY_STUDENT_AND_SESSION =
		"""
			SELECT exists (
				SELECT
					1
				FROM
					booking
				WHERE
					student_id = :studentID AND
					session_id = :sessionID
			);
		""";
}
