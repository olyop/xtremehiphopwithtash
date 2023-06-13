package com.xtremehiphopwithtash.book.service.dao.query;

import com.xtremehiphopwithtash.book.service.dao.util.SQLColumnNamesUtil;
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
		INSERT INTO booking (
			notes,
			session_id,
			student_id,
			booking_quantity,
			equipment_quantity,
			payment_method,
			cost
		) VALUES (
			:notes,
			:sessionID,
			:studentID,
			:bookingQuantity,
			:equipmentQuantity,
			:paymentMethod::booking_payment_method,
			:cost
		) RETURNING
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
				booking_quantity = :bookingQuantity,
				equipment_quantity = :equipmentQuantity
			WHERE
				booking_id = :bookingID
			RETURNING
				%s;
		""",
		columnNames
	);

	public final String EXISTS_BY_ID = "SELECT EXISTS (SELECT 1 FROM booking WHERE booking_id = :bookingID);";

	public final String DELETE_BY_ID = "DELETE FROM booking WHERE booking_id = :bookingID;";

	public final String SELECT_BY_SESSION_ID = String.format(
		"SELECT %s FROM booking WHERE session_id = :sessionID ORDER BY has_checked_in ASC, created_at DESC;",
		columnNames
	);

	public final String SELECT_CAPACITY_BOOKED_BY_SESSION_ID =
		"SELECT coalesce(sum(booking_quantity), 0) AS capacity_booked FROM booking WHERE session_id = :sessionID;";

	public final String SELECT_CAPACITY_REMAINING_BY_SESSION_ID =
		"""
		SELECT
			(SELECT capacity_available FROM session WHERE session_id = :sessionID) -
			(SELECT coalesce(sum(booking_quantity), 0) FROM booking WHERE session_id = :sessionID) AS capacity_remianing;
		""";

	public final String SELECT_IS_CAPACITY_REMAINING_BY_SESSION_ID =
		"""
		SELECT
			(
				(
					(SELECT capacity_available FROM session WHERE session_id = :sessionID) -
					(SELECT coalesce(sum(booking_quantity), 0) FROM booking WHERE session_id = :sessionID) -
					:bookingQuantity
				) >= 0
			) as is_capacity_remaining;
		""";

	public final String SELECT_EQUIPMENT_HIRED_BY_SESSION_ID =
		"SELECT coalesce(sum(equipment_quantity), 0) AS equipment_hired FROM booking WHERE session_id = :sessionID;";

	public final String SELECT_EQUIPMENT_REMAINING_BY_SESSION_ID =
		"""
		SELECT
			(SELECT coalesce(equipment_available, 0) FROM session WHERE session_id = :sessionID) -
			(SELECT coalesce(sum(equipment_quantity), 0) FROM booking WHERE session_id = :sessionID) AS equipment_remianing;
		""";

	public final String SELECT_IS_EQUIPMENT_REMAINING_BY_SESSION_ID =
		"""
		SELECT
			(
				(
					(SELECT coalesce(equipment_available, 0) FROM session WHERE session_id = :sessionID) -
					(SELECT coalesce(sum(equipment_quantity), 0) FROM booking WHERE session_id = :sessionID) -
					:equipmentQuantity
				) >= 0
			) as is_equipment_remaining;
	""";

	public final String SELECT_BY_STUDENT_ID = String.format(
		"""
			SELECT
				%s
			FROM
				booking
			WHERE
				student_id = :studentID
			ORDER BY
				created_at DESC
			LIMIT
				30;
		""",
		columnNames
	);

	public final String SELECT_SUM_BOOKINGS_BY_STUDENT_ID = String.format(
		"""
			SELECT
				sum(booking_quantity) as booking_quantity
			FROM
				booking
			WHERE
				student_id = :studentID;
		""",
		columnNames
	);

	public final String SELECT_PAYMENT_METHODS = "SELECT UNNEST(ENUM_RANGE(NULL::payment_methods)) AS payment_methods;";

	public final String SELECT_EXISTS_BY_STUDENT_ID_AND_SESSION_ID =
		"SELECT EXISTS (SELECT 1 FROM booking WHERE student_id = :studentID AND session_id = :sessionID AND payment_method = 'CASH');";

	public final String UPDATE_HAS_CHECKED_IN_BY_ID =
		"UPDATE booking SET has_checked_in = :hasCheckedIn WHERE booking_id = :bookingID;";
}
