DELETE FROM
	coupon
WHERE
	used_by_student_id = :studentID AND
	used_on_booking_id = :bookingID;