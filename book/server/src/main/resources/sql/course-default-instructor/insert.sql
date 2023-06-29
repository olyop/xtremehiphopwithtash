INSERT INTO course_default_instructor
	(course_id, index, instructor_id)
VALUES
	(:courseID, :index, :instructorID)
RETURNING
	%s;