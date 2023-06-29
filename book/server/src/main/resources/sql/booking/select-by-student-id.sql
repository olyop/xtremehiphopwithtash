SELECT
	%s
FROM
	booking
WHERE
	student_id = :studentID
JOIN
	session
		ON session.id = booking.session_id
ORDER BY
	session.start_time DESC
LIMIT
	50;