SELECT EXISTS (
	SELECT
		1
	FROM
		booking
	WHERE
		session_id = :sessionID AND
		student_id = :studentID AND
		has_cancelled = FALSE
);