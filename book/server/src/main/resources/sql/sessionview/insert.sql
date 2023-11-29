INSERT INTO session_view (
	session_id,
	student_id
) VALUES (
	:sessionID,
	:studentID
) RETURNING
	%s;