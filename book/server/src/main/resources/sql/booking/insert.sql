INSERT INTO booking (
	notes,
	session_id,
	student_id,
	booking_quantity,
	equipment_quantity,
	payment_method,
	payment_intent_id,
	cost
) VALUES (
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