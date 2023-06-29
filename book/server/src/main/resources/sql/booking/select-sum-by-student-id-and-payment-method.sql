SELECT
	coalesce(sum(booking_quantity), 0) as booking_quantity
FROM
	booking
WHERE
	student_id = :studentID AND
	payment_method = :paymentMethod::booking_payment_method;