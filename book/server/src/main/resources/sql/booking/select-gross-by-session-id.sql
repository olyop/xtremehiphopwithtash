SELECT
	coalesce(sum(booking.cost), 0)
FROM
	booking
WHERE
	session_id = :sessionID AND
	has_cancelled = false AND
	has_checked_in = true;