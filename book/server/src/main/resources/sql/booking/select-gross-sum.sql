SELECT
	coalesce(sum(booking.cost), 0)
FROM
	booking
WHERE
	has_cancelled = false AND
	has_checked_in = true;