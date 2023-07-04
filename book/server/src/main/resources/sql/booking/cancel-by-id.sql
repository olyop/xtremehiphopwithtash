UPDATE
	booking
SET
	has_cancelled = true,
	cancelled_at = get_now()
WHERE
	booking_id = :bookingID;