SELECT
	%s
FROM
	instructor
JOIN
	session_instructor
ON
	instructor.instructor_id = session_instructor.instructor_id
WHERE
	session_instructor.session_id = :sessionID;