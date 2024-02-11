INSERT INTO booking (
	booking_id,
	notes,
	session_id,
	student_id,
	booking_quantity,
	equipment_quantity,
	payment_method,
	payment_intent_id,
	cost
) VALUES (
	:bookingID,
	:notes,
	:sessionID,
	:studentID,
	:bookingQuantity,
	:equipmentQuantity,
	:paymentMethod::booking_payment_method,
	:paymentIntentID,
	:cost
) RETURNING
	%s;