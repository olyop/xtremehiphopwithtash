UPDATE
	session
SET
	is_cancelled = TRUE WHERE
	session_id = :sessionID;