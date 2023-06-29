UPDATE
	coupon
SET
	used_at = :usedAt,
	used_by_student_id = :usedByStudentID,
	used_on_booking_id = :usedOnBookingID
WHERE
	code = :code
RETURNING
	%s;