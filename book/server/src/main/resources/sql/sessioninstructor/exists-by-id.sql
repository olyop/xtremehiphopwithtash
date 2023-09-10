SELECT EXISTS (
	SELECT
		1
	FROM
		session_instructor
	WHERE
		session_id = :sessionID AND
		index = :index
);