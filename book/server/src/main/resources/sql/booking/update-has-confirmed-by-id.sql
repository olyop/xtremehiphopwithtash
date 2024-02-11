UPDATE
	booking
SET
	has_confirmed = :hasConfirmed
WHERE
	booking_id = :bookingID;