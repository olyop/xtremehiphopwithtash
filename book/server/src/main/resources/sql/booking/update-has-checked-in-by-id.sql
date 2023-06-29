UPDATE
	booking
SET
	has_checked_in = :hasCheckedIn
WHERE
	booking_id = :bookingID;