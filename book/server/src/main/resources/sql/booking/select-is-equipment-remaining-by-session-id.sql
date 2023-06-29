SELECT
	(
		(
			(SELECT coalesce(equipment_available, 0) FROM session WHERE session_id = :sessionID) -
			(SELECT coalesce(sum(equipment_quantity), 0) FROM booking WHERE session_id = :sessionID AND has_cancelled = FALSE) -
			:equipmentQuantity
		) >= 0
	) as is_equipment_remaining;