SELECT
	(
		(
			(SELECT capacity_available FROM session WHERE session_id = :sessionID) -
			(SELECT coalesce(sum(booking_quantity), 0) FROM booking WHERE session_id = :sessionID AND has_cancelled = FALSE) -
			:bookingQuantity
		) >= 0
	) as is_capacity_remaining;