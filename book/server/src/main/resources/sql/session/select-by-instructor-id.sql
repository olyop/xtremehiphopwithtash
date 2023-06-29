SELECT
	%s
FROM
	session
JOIN
	session_instructor
		ON session.session_id = session_instructor.session_id
WHERE
	session_instructor.instructor_id = :instructorID;