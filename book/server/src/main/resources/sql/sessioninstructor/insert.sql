INSERT INTO session_instructor
	(session_id, index, instructor_id)
VALUES
	(:sessionID, :index, :instructorID)
RETURNING
	%s;