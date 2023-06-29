UPDATE
	booking
SET
	notes = :notes,
	booking_quantity = :bookingQuantity,
	equipment_quantity = :equipmentQuantity
WHERE
	booking_id = :bookingID AND
	has_cancelled = FALSE
RETURNING
	%s;