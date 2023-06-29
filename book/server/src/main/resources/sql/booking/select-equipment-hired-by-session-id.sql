SELECT
	coalesce(sum(equipment_quantity), 0) AS equipment_hired
FROM
	booking
WHERE
	session_id = :sessionID AND
	has_cancelled = FALSE;