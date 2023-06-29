SELECT
	%s
FROM
	session_instructor
WHERE
	session_id = :sessionID AND
	index = :index;