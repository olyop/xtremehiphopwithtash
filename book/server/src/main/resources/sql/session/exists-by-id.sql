SELECT EXISTS (
	SELECT
		1
	FROM
		session
	WHERE
		session_id = :sessionID
);