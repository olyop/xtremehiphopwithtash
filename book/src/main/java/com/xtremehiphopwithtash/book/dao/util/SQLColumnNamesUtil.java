package com.xtremehiphopwithtash.book.dao.util;

import java.util.List;

public final class SQLColumnNamesUtil {

	private static final String CREATED_AT = "created_at";

	public static final List<String> DETAILS = List.of(
		"details_id",
		"first_name",
		"last_name",
		"nick_name",
		"gender",
		"mobile_phone_number",
		CREATED_AT
	);

	public static final List<String> INSTRUCTOR = List.of(
		"instructor_id",
		"details_id",
		"photo",
		CREATED_AT
	);

	public static final List<String> LOCATION = List.of(
		"location_id",
		"name",
		"plus_code",
		CREATED_AT
	);

	public static final List<String> COURSE = List.of(
		"course_id",
		"name",
		"description",
		"photo",
		"default_price",
		"default_duration",
		"default_capacity",
		"default_equipment_available",
		"default_location_id",
		CREATED_AT
	);

	public static final List<String> COURSE_DEFAULT_INSTRUCTOR = List.of(
		"course_id",
		"index",
		"instructor_id",
		CREATED_AT
	);

	public static final List<String> SESSION = List.of(
		"session_id",
		"title",
		"notes",
		"price",
		"start_time",
		"end_time",
		"capacity",
		"equipment_available",
		"course_id",
		"location_id",
		CREATED_AT
	);

	public static final List<String> SESSION_INSTRUCTOR = List.of(
		"course_id",
		"index",
		"instructor_id",
		CREATED_AT
	);

	public static final List<String> STUDENT = List.of("student_id", "details_id", CREATED_AT);

	public static final List<String> BOOKING = List.of(
		"booking_id",
		"notes",
		"is_bringing_own_equipment",
		"session_id",
		"student_id",
		CREATED_AT
	);

	public static final List<String> REVIEW = List.of(
		"review_id",
		"score",
		"comment",
		"course_id",
		"student_id",
		CREATED_AT
	);

	public static String join(List<String> columnNames, String tableName) {
		return tableName + "." + String.join(String.format(", %s.", tableName), columnNames);
	}
}
