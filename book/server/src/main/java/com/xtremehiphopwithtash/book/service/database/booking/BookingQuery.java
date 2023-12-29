package com.xtremehiphopwithtash.book.service.database.booking;

import com.xtremehiphopwithtash.book.service.helpers.SQLColumnNames;
import com.xtremehiphopwithtash.book.service.helpers.SQLUtil;
import org.springframework.stereotype.Component;

@Component
class BookingQuery {

	private final SQLUtil sqlUtil = new SQLUtil("booking", SQLColumnNames.join(SQLColumnNames.BOOKING, "booking"));

	final String SELECT = sqlUtil.read("select");

	final String INSERT = sqlUtil.read("insert");

	final String SELECT_BY_ID = sqlUtil.read("select-by-id");

	final String UPDATE_BY_ID = sqlUtil.read("update-by-id");

	final String EXISTS_BY_ID = sqlUtil.read("exists-by-id");

	final String CANCEL_BY_ID = sqlUtil.read("cancel-by-id");

	final String SELECT_BY_SESSION_ID = sqlUtil.read("select-by-session-id");

	final String SELECT_BY_SESSION_ID_AND_NOT_CANCELLED = sqlUtil.read("select-by-session-id-and-not-cancelled");

	final String SELECT_CAPACITY_BOOKED_BY_SESSION_ID = sqlUtil.read("select-capacity-booked-by-session-id");

	final String SELECT_CAPACITY_REMAINING_BY_SESSION_ID = sqlUtil.read("select-capacity-remaining-by-session-id");

	final String SELECT_IS_CAPACITY_REMAINING_BY_SESSION_ID = sqlUtil.read("select-is-capacity-remaining-by-session-id");

	final String SELECT_EQUIPMENT_HIRED_BY_SESSION_ID = sqlUtil.read("select-equipment-hired-by-session-id");

	final String SELECT_EQUIPMENT_REMAINING_BY_SESSION_ID = sqlUtil.read("select-equipment-remaining-by-session-id");

	final String SELECT_IS_EQUIPMENT_REMAINING_BY_SESSION_ID = sqlUtil.read(
		"select-is-equipment-remaining-by-session-id"
	);

	final String SELECT_BY_STUDENT_ID = sqlUtil.read("select-by-student-id");

	final String SELECT_SUM = sqlUtil.read("select-sum");

	final String SELECT_SUM_BY_STUDENT_ID = sqlUtil.read("select-sum-by-student-id");

	final String SELECT_SUM_BY_STUDENT_ID_AND_FREE = sqlUtil.read("select-sum-by-student-id-and-free");

	final String SELECT_SUM_BY_STUDENT_ID_AND_PAYMENT_METHOD = sqlUtil.read(
		"select-sum-by-student-id-and-payment-method"
	);

	final String EXISTS_BY_SESSION_ID_AND_STUDENT_ID = sqlUtil.read("exists-by-session-id-and-student-id");

	final String EXISTS_BY_CASH_AND_FREE_AND_STUDENT_ID_AND_SESSION_ID = sqlUtil.read(
		"exists-by-cash-and-free-and-student-id-and-session-id"
	);

	final String UPDATE_HAS_CHECKED_IN_BY_ID = sqlUtil.read("update-has-checked-in-by-id");

	final String SELECT_PAYMENT_METHODS = sqlUtil.read("select-payment-methods");

	final String SELECT_GROSS_SUM = sqlUtil.read("select-gross-sum");

	final String SELECT_GROSS_BY_SESSION_ID = sqlUtil.read("select-gross-by-session-id");

	public final String EXISTS_BY_SESSION_ID_AND_STUDENT_ID_AND_CANCELLED = sqlUtil.read(
		"exists-by-session-id-and-student-id-and-cancelled"
	);
}
