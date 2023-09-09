package com.xtremehiphopwithtash.book.service.dao.query;

import java.util.List;

public final class SQLColumnNames {

	private static final String CREATED_AT = "created_at";

	public static final List<String> DETAILS = List.of(
		"details_id",
		"first_name",
		"last_name",
		"nick_name",
		"gender",
		"mobile_phone_number",
		"email_address",
		"instagram_username",
		CREATED_AT
	);

	public static final List<String> INSTRUCTOR = List.of("instructor_id", "details_id", "photo", CREATED_AT);

	public static final List<String> LOCATION = List.of("location_id", "name", "plus_code", "address", CREATED_AT);

	public static final List<String> COURSE = List.of(
		"course_id",
		"name",
		"description",
		"photo",
		"default_price",
		"default_equipment_fee",
		"default_duration",
		"default_capacity_available",
		"default_equipment_available",
		"default_location_id",
		CREATED_AT
	);

	public static final List<String> COURSE_DEFAULT_INSTRUCTOR = List.of("course_id", "index", "instructor_id", CREATED_AT);

	public static final List<String> SESSION = List.of(
		"session_id",
		"title",
		"notes",
		"price",
		"equipment_fee",
		"start_time",
		"end_time",
		"capacity_available",
		"equipment_available",
		"course_id",
		"location_id",
		"is_cancelled",
		CREATED_AT
	);

	public static final List<String> SESSION_INSTRUCTOR = List.of("session_id", "index", "instructor_id", CREATED_AT);

	public static final List<String> STUDENT = List.of("student_id", "details_id", "stripe_customer_id", CREATED_AT);

	public static final List<String> BOOKING = List.of(
		"booking_id",
		"notes",
		"session_id",
		"student_id",
		"booking_quantity",
		"equipment_quantity",
		"payment_method",
		"payment_intent_id",
		"cost",
		"has_checked_in",
		"has_cancelled",
		"cancelled_at",
		CREATED_AT
	);

	public static final List<String> COUPON = List.of(
		"coupon_id",
		"code",
		"discount",
		"used_at",
		"used_by_student_id",
		"used_on_booking_id",
		CREATED_AT
	);

	public static final List<String> REVIEW = List.of("review_id", "score", "comment", "course_id", "student_id", CREATED_AT);

	public static String join(List<String> columnNames, String tableName) {
		return tableName + "." + String.join(String.format(", %s.", tableName), columnNames);
	}
}
