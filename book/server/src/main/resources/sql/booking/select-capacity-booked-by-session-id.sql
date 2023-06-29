SELECT
	coalesce(sum(booking_quantity), 0) AS capacity_booked
FROM
	booking
WHERE
	session_id = :sessionID AND
	has_cancelled = FALSE;