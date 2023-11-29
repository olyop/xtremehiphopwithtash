SELECT EXISTS (
	SELECT
		1
	FROM
		session_view
	WHERE
		session_id = :sessionID AND
		student_id = :studentID
);