SELECT
	equipment_available
FROM
	session
WHERE
	session_id = :sessionID;