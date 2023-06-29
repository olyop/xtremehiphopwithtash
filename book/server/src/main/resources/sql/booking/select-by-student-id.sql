SELECT
	%s
FROM
	booking
JOIN
	session
		ON session.session_id = booking.session_id
WHERE
	student_id = :studentID
ORDER BY
	session.start_time DESC,
	booking.created_at DESC
LIMIT
	50;